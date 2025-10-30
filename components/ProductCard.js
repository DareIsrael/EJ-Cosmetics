// 'use client';
// import Link from 'next/link';
// import { useCart } from '@/contexts/CartContext';
// import toast from 'react-hot-toast';
// import Image from 'next/image';


// export default function ProductCard({ product }) {
//   const { addToCart } = useCart();

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart(product);
//     // toast.success('Product added to cart!');
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
//       <Link href={`/products/${product._id}`}>
//         <div className="relative w-full">
//           {/* Responsive image container */}
//           <div className="aspect-square w-full overflow-hidden">
//             <img
//               src={product.image || '/placeholder-image.jpg'}
//               alt={product.name}
//               className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
//               onError={(e) => {
//                 e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
//               }}
//             />
//           </div>
//           {product.featured && (
//             <span className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded text-xs">
//               Featured
//             </span>
//           )}
//         </div>
//       </Link>
      
//       {/* Compact content area */}
//       <div className="p-3 flex flex-col flex-grow space-y-0"> {/* Reduced padding and spacing */}
//         <Link href={`/products/${product._id}`}>
//           <h3 className="text-sm font-semibold cursor-pointer hover:text-pink-600 transition-colors line-clamp-2 leading-tight">
//             {product.name}
//           </h3>
//         </Link>
        
//         <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed flex-grow">
//           {product.description}
//         </p>
        
//         <div className="flex items-center justify-between">
//           <span className="text-base font-bold text-pink-600">
//             ₦{product.price?.toLocaleString() || '0'}
//           </span>
//           <span className="text-xs text-gray-500">
//             {product.stock || 0} left
//           </span>
//         </div>
        
//         <button
//           onClick={handleAddToCart}
//           disabled={!product.stock || product.stock === 0}
//           className={`w-full py-2 rounded transition-colors text-sm ${
//             !product.stock || product.stock === 0
//               ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
//               : 'bg-pink-500 hover:bg-pink-600 text-white'
//           }`}
//         >
//           {!product.stock || product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//         </button>

//         {product.stock > 0 && product.stock < 10 && (
//           <p className="text-xs text-orange-500 text-center">
//             Only {product.stock} left!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


// 'use client';
// import Link from 'next/link';
// import { useCart } from '@/contexts/CartContext';

// export default function ProductCard({ product }) {
//   const { addToCart } = useCart();

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart(product);
//   };

//   return (
//     <div className="bg-white rounded-md border border-gray-200 overflow-hidden hover:border-pink-300 transition-all duration-200 flex flex-col h-full">
//       <Link href={`/products/${product._id}`}>
//         <div className="relative w-full">
//           {/* Ultra-compact image container */}
//           <div className="aspect-square w-full overflow-hidden">
//             <img
//               src={product.image || '/placeholder-image.jpg'}
//               alt={product.name}
//               className="w-full h-full object-cover cursor-pointer"
//               onError={(e) => {
//                 e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
//               }}
//             />
//           </div>
//           {product.featured && (
//             <span className="absolute top-1 left-1 bg-pink-500 text-white px-1 py-0.5 rounded text-[10px] font-medium">
//               Featured
//             </span>
//           )}
//         </div>
//       </Link>
      
//       {/* Ultra-compact content - NO SPACING */}
//       <div className="p-1.5 flex flex-col flex-grow">
//         <Link href={`/products/${product._id}`}>
//           <h3 className="text-xs font-medium cursor-pointer hover:text-pink-600 transition-colors line-clamp-2 leading-tight mb-0.5">
//             {product.name}
//           </h3>
//         </Link>
        
//         {/* Price and stock in one tight line */}
//         <div className="flex items-center justify-between mb-0.5">
//           <span className="text-xs font-bold text-pink-600">
//             ₦{product.price?.toLocaleString() || '0'}
//           </span>
//           <span className="text-[10px] text-gray-500">
//             {product.stock || 0} left
//           </span>
//         </div>
        
//         {/* Ultra-compact button */}
//         <button
//           onClick={handleAddToCart}
//           disabled={!product.stock || product.stock === 0}
//           className={`w-full py-1 rounded text-xs font-medium ${
//             !product.stock || product.stock === 0
//               ? 'bg-gray-100 cursor-not-allowed text-gray-400' 
//               : 'bg-pink-500 hover:bg-pink-600 text-white'
//           }`}
//         >
//           {!product.stock || product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//         </button>

//         {/* Only show low stock warning for very low stock */}
//         {product.stock > 0 && product.stock < 3 && (
//           <p className="text-[10px] text-orange-500 text-center mt-0.5">
//             Only {product.stock} left
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


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
          <h3 className="text-[15px] sm:text-xs font-medium leading-tight text-gray-700 line-clamp-2 hover:text-pink-600 transition-colors mb-0.5">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-1">
          <span className="text-[12px] sm:text-xs font-bold text-pink-600">
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
