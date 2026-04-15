
'use client';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="
      bg-white rounded-md border border-gray-200 overflow-hidden
      hover:border-pink-300 transition-all duration-200
      flex flex-col
      w-full
    ">
      <Link href={`/products/${product._id}`}>
        <div className="relative w-full aspect-[5/4] sm:aspect-square overflow-hidden">
          <img
            src={product.image || '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
          {product.featured && (
            <span className="absolute top-1 left-1 bg-pink-500 text-white px-1 py-0.5 rounded text-[9px] sm:text-[10px] font-medium">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="p-1.5 sm:p-2 flex flex-col flex-grow justify-between">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-[15px]  sm:text-xs  leading-tight  line-clamp-2 hover:text-pink-600 text-gray-900 font-light transition-colors mb-0.5">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-1">
          <span className="text-[14px] sm:text-xs font-light text-pink-600">
            ₦{product.price?.toLocaleString() || '0'}
          </span>
          <span className="text-[9px] text-gray-500">
            {product.stock || 0} left
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.stock || product.stock === 0}
          className={`w-full py-1.5 sm:py-2 rounded text-[12px] sm:text-xs font-medium ${
            !product.stock || product.stock === 0
              ? 'bg-gray-100 cursor-not-allowed text-gray-400'
              : 'bg-pink-500 hover:bg-pink-600 text-white'
          }`}
        >
          {!product.stock || product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
