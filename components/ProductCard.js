'use client';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';


export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success('Product added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/products/${product._id}`}>
        <div className="relative w-full">
          {/* Responsive image container */}
          <div className="aspect-square w-full overflow-hidden">
            <img
              src={product.image || '/placeholder-image.jpg'}
              alt={product.name}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
              }}
            />
          </div>
          {product.featured && (
            <span className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded text-xs">
              Featured
            </span>
          )}
        </div>
      </Link>
      
      {/* Compact content area */}
      <div className="p-3 flex flex-col flex-grow space-y-0"> {/* Reduced padding and spacing */}
        <Link href={`/products/${product._id}`}>
          <h3 className="text-sm font-semibold cursor-pointer hover:text-pink-600 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-pink-600">
            ₦{product.price?.toLocaleString() || '0'}
          </span>
          <span className="text-xs text-gray-500">
            {product.stock || 0} left
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.stock || product.stock === 0}
          className={`w-full py-2 rounded transition-colors text-sm ${
            !product.stock || product.stock === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
              : 'bg-pink-500 hover:bg-pink-600 text-white'
          }`}
        >
          {!product.stock || product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>

        {product.stock > 0 && product.stock < 10 && (
          <p className="text-xs text-orange-500 text-center">
            Only {product.stock} left!
          </p>
        )}
      </div>
    </div>
  );
}