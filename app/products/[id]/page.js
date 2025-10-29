/* eslint react/no-unescaped-entities: "off" */

'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productAPI } from '@/services/api';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';


export default function ProductDetail() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} item(s) added to cart!`);
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-1">
              <img
                src={product.image || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                }}
              />
            </div>
            <div className="md:flex-1 p-8">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-pink-600">
                  ₦{product.price?.toLocaleString() || '0'}
                </span>
              </div>

              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 0 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 10 
                    ? 'In Stock' 
                    : product.stock > 0 
                    ? `Only ${product.stock} Left` 
                    : 'Out of Stock'
                  }
                </span>
              </div>

              {product.stock > 0 && (
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  >
                    {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock === 0}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  !product.stock || product.stock === 0
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-pink-600 hover:bg-pink-700 text-white'
                }`}
              >
                {!product.stock || product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Product Details</h3>
                <p className="text-sm text-gray-600">
                  <strong>Category:</strong> {product.category}
                </p>
                {product.featured && (
                  <p className="text-sm text-pink-600 mt-1">
                    ⭐ Featured Product
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}