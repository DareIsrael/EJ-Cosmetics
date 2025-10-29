import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';

export async function getAllProducts() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 });
    return { success: true, data: products };
  } catch (error) {
    console.error('Get products error:', error);
    return { success: false, message: 'Failed to fetch products', status: 500 };
  }
}

export async function getProductById(id) {
  try {
    await dbConnect();
    const product = await Product.findById(id);
    
    if (!product) {
      return { success: false, message: 'Product not found', status: 404 };
    }

    return { success: true, data: product };
  } catch (error) {
    console.error('Get product error:', error);
    return { success: false, message: 'Failed to fetch product', status: 500 };
  }
}

export async function createProduct(productData, user) {
  try {
    if (!user || user.role !== 'admin') {
      return { success: false, message: 'Unauthorized', status: 401 };
    }

    await dbConnect();
    
    // If image is a file (base64 or buffer), upload to Cloudinary
    if (productData.image && typeof productData.image !== 'string') {
      const uploadResult = await cloudinary.uploader.upload(productData.image, {
        folder: 'ej-cosmetic/products',
        resource_type: 'image'
      });
      productData.image = uploadResult.secure_url;
    }

    const product = await Product.create(productData);
    return { success: true, data: product };
  } catch (error) {
    console.error('Create product error:', error);
    return { success: false, message: 'Failed to create product', status: 500 };
  }
}

export async function updateProduct(id, productData, user) {
  try {
    if (!user || user.role !== 'admin') {
      return { success: false, message: 'Unauthorized', status: 401 };
    }

    await dbConnect();

    // If new image is provided, upload to Cloudinary
    if (productData.image && typeof productData.image !== 'string') {
      const uploadResult = await cloudinary.uploader.upload(productData.image, {
        folder: 'ej-cosmetic/products',
        resource_type: 'image'
      });
      productData.image = uploadResult.secure_url;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return { success: false, message: 'Product not found', status: 404 };
    }

    return { success: true, data: product };
  } catch (error) {
    console.error('Update product error:', error);
    return { success: false, message: 'Failed to update product', status: 500 };
  }
}

export async function deleteProduct(id, user) {
  try {
    if (!user || user.role !== 'admin') {
      return { success: false, message: 'Unauthorized', status: 401 };
    }

    await dbConnect();
    
    // Get product first to delete image from Cloudinary
    const product = await Product.findById(id);
    if (!product) {
      return { success: false, message: 'Product not found', status: 404 };
    }

    // Delete image from Cloudinary if it's a Cloudinary URL
    if (product.image && product.image.includes('cloudinary.com')) {
      const publicId = product.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`ej-cosmetic/products/${publicId}`);
    }

    await Product.findByIdAndDelete(id);

    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Delete product error:', error);
    return { success: false, message: 'Failed to delete product', status: 500 };
  }
}

// Utility function for direct image upload
export async function uploadProductImage(imageFile) {
  try {
    const uploadResult = await cloudinary.uploader.upload(imageFile, {
      folder: 'ej-cosmetic/products',
      resource_type: 'image'
    });
    
    return { 
      success: true, 
      data: { 
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id
      } 
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return { success: false, message: 'Failed to upload image', status: 500 };
  }
}