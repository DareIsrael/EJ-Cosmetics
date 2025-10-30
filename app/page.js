// 'use client';
// import { useEffect, useState } from 'react';
// import { productAPI } from '@/services/api';
// import ProductCard from '@/components/ProductCard';
// import toast from 'react-hot-toast';

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [categories, setCategories] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Hero slider images
//   const heroSlides = [
//     {
//       id: 1,
//       image: '/images/hero-1.jpg',
//       title: 'Premium Beauty Collection',
//       subtitle: 'Discover Luxury Cosmetics'
//     },
//     {
//       id: 2,
//       image: '/images/hero-2.jpg',
//       title: 'Summer Special',
//       subtitle: 'Up to 50% Off Selected Items'
//     },
//     {
//       id: 3,
//       image: '/images/hero-3.jpg',
//       title: 'New Arrivals',
//       subtitle: 'Fresh Products Every Week'
//     }
//   ];

//   useEffect(() => {
//     fetchProducts();
    
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);

//     return () => clearInterval(slideInterval);
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await productAPI.getAll();
//       const productsData = response.data || [];
//       setProducts(productsData);
//       setFilteredProducts(productsData);
      
//       const uniqueCategories = [...new Set(productsData.map(product => product.category))];
//       setCategories(uniqueCategories);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError('Failed to load products');
//       toast.error('Failed to load products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     filterProducts();
//   }, [searchTerm, selectedCategory, products]);

//   const filterProducts = () => {
//     let filtered = [...products];

//     if (searchTerm) {
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(product =>
//         product.category === selectedCategory
//       );
//     }

//     setFilteredProducts(filtered);
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedCategory('all');
//   };

//   const getFeaturedProducts = () => {
//     return products.filter(product => product.featured);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500 text-xl">{error}</div>
//       </div>
//     );
//   }
//   const featuredProducts = getFeaturedProducts();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Slider Section */}
//       <section className="relative h-80 md:h-96 lg:h-[500px] bg-gray-900 overflow-hidden">
//         {heroSlides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-500 ${
//               index === currentSlide ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <div className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
//               <div className="text-center text-white">
//                 <h1 className="text-4xl md:text-6xl font-bold mb-4">EJ Cosmetic</h1>
//                 <p className="text-xl md:text-2xl opacity-90">{slide.subtitle}</p>
//               </div>
//             </div>
//           </div>
//         ))}
        
//         {/* Slider Controls */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
//         >
//           ‹
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
//         >
//           ›
//         </button>
        
//         {/* Slider Indicators */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 index === currentSlide ? 'bg-white' : 'bg-white/50'
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Rest of your existing component remains the same */}
//       {/* Search Section */}
//       <section className="py-8 bg-white border-b">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex flex-col md:flex-row gap-3 items-center">
//               <div className="flex-1 w-full">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   />
//                 </div>
//               </div>

//               <div className="w-full md:w-48">
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {(searchTerm || selectedCategory !== 'all') && (
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>

//             <div className="text-center mt-3 text-sm text-gray-600">
//               <span>
//                 {filteredProducts.length} of {products.length} products
//                 {(searchTerm || selectedCategory !== 'all') && ' (filtered)'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       {featuredProducts.length > 0 && (
//         <section className="py-8 bg-white">
//           <div className="container mx-auto px-4">
//             <h2 className="text-2xl font-bold text-center mb-6">Featured Products</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//               {featuredProducts.slice(0, 6).map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* All Products */}
//       <section className="py-8 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-bold text-center mb-6">
//             {featuredProducts.length > 0 ? 'All Products' : 'Our Products'}
//           </h2>
          
//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//               {filteredProducts.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">
//                 <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
//               <p className="text-gray-600 mb-6">
//                 {products.length === 0 
//                   ? "No products available at the moment."
//                   : "No products match your search criteria."
//                 }
//               </p>
//               {products.length > 0 && (
//                 <button
//                   onClick={clearFilters}
//                   className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }



// 'use client';
// import { useEffect, useState } from 'react';
// import { productAPI } from '@/services/api';
// import ProductCard from '@/components/ProductCard';
// import toast from 'react-hot-toast';

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [categories, setCategories] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Hero slider images
//   const heroSlides = [
//     {
//       id: 1,
//       image: '/images/hero-1.jpg',
//       title: 'Premium Beauty Collection',
//       subtitle: 'Discover Luxury Cosmetics'
//     },
//     {
//       id: 2,
//       image: '/images/hero-2.jpg',
//       title: 'Summer Special',
//       subtitle: 'Up to 50% Off Selected Items'
//     },
//     {
//       id: 3,
//       image: '/images/hero-3.jpg',
//       title: 'New Arrivals',
//       subtitle: 'Fresh Products Every Week'
//     }
//   ];

//   useEffect(() => {
//     fetchProducts();
    
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 5000);

//     return () => clearInterval(slideInterval);
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await productAPI.getAll();
//       const productsData = response.data || [];
//       setProducts(productsData);
//       setFilteredProducts(productsData);
      
//       const uniqueCategories = [...new Set(productsData.map(product => product.category))];
//       setCategories(uniqueCategories);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError('Failed to load products');
//       toast.error('Failed to load products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     filterProducts();
//   }, [searchTerm, selectedCategory, products]);

//   const filterProducts = () => {
//     let filtered = [...products];

//     if (searchTerm) {
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(product =>
//         product.category === selectedCategory
//       );
//     }

//     setFilteredProducts(filtered);
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedCategory('all');
//   };

//   const getFeaturedProducts = () => {
//     return products.filter(product => product.featured);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500 text-xl">{error}</div>
//       </div>
//     );
//   }
//   const featuredProducts = getFeaturedProducts();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Slider Section */}
//       <section className="relative h-80 md:h-96 lg:h-[500px] bg-gray-900 overflow-hidden">
//         {heroSlides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-500 ${
//               index === currentSlide ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <div className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
//               <div className="text-center text-white">
//                 <h1 className="text-4xl md:text-6xl font-bold mb-4">EJ Cosmetic</h1>
//                 <p className="text-xl md:text-2xl opacity-90">{slide.subtitle}</p>
//               </div>
//             </div>
//           </div>
//         ))}
        
//         {/* Slider Controls */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
//         >
//           ‹
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
//         >
//           ›
//         </button>
        
//         {/* Slider Indicators */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 index === currentSlide ? 'bg-white' : 'bg-white/50'
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Search Section - COMPACT */}
//       <section className="py-4 bg-white border-b"> {/* Reduced from py-8 to py-4 */}
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             {/* Compact search row */}
//             <div className="flex flex-col md:flex-row gap-2 items-center"> {/* Reduced gap from 3 to 2 */}
//               {/* Search Bar - Compact */}
//               <div className="flex-1 w-full">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Smaller icon */}
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500" // Reduced padding and smaller text
//                   />
//                 </div>
//               </div>

//               {/* Category Filter - Compact */}
//               <div className="w-full md:w-40"> {/* Slightly narrower */}
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500" // Reduced padding and smaller text
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Clear Filters - Compact */}
//               {(searchTerm || selectedCategory !== 'all') && (
//                 <button
//                   onClick={clearFilters}
//                   className="px-3 py-2 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap" // Reduced padding and smaller text
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>

//             {/* Results Info - Compact */}
//             <div className="text-center mt-2 text-xs text-gray-600"> {/* Reduced margin and smaller text */}
//               <span>
//                 {filteredProducts.length} of {products.length} products
//                 {(searchTerm || selectedCategory !== 'all') && ' (filtered)'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products - Reduced Gap */}
//       {featuredProducts.length > 0 && (
//         <section className="py-6 bg-white"> {/* Reduced from py-8 to py-6 */}
//           <div className="container mx-auto px-4">
//             <h2 className="text-xl font-bold text-center mb-4">Featured Products</h2> {/* Smaller text and margin */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"> {/* Reduced gap from 3 to 2 */}
//               {featuredProducts.slice(0, 6).map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* All Products - Reduced Gap */}
//       <section className="py-6 bg-gray-50"> {/* Reduced from py-8 to py-6 */}
//         <div className="container mx-auto px-4">
//           <h2 className="text-xl font-bold text-center mb-4"> {/* Smaller text and margin */}
//             {featuredProducts.length > 0 ? 'All Products' : 'Our Products'}
//           </h2>
          
//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"> {/* Reduced gap from 3 to 2 */}
//               {filteredProducts.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8"> {/* Reduced padding */}
//               <div className="text-gray-400 mb-3"> {/* Reduced margin */}
//                 <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Smaller icon */}
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                 </svg>
//               </div>
//               <h3 className="text-base font-semibold text-gray-900 mb-2">No Products Found</h3> {/* Smaller text */}
//               <p className="text-gray-600 mb-4 text-sm"> {/* Smaller text */}
//                 {products.length === 0 
//                   ? "No products available at the moment."
//                   : "No products match your search criteria."
//                 }
//               </p>
//               {products.length > 0 && (
//                 <button
//                   onClick={clearFilters}
//                   className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors text-sm" // Smaller button
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { productAPI } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import toast from 'react-hot-toast';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Updated Hero Slider with cosmetic models and pink backgrounds
  const heroSlides = [
    {
      id: 1,
      image: '/images/slide1.png',
      title: 'Discover Your Beauty',
      subtitle: 'Premium Cosmetics Collection',
      description: 'Enhance your natural beauty with our carefully curated luxury products',
      cta: 'Shop Now',
      bgGradient: 'from-pink-300 to-pink-500'
    },
    {
      id: 2,
      image: '/images/slide2.png',
      title: 'Summer Glow',
      subtitle: 'Up to 50% Off',
      description: 'Get ready for summer with our special offers on skincare and makeup',
      cta: 'View Deals',
      bgGradient: 'from-pink-300 to-rose-500'
    },
    {
      id: 3,
      image: '/images/slide3.png',
      title: 'New Arrivals',
      subtitle: 'Fresh & Trending',
      description: 'Explore the latest beauty trends and innovative products',
      cta: 'Discover',
      bgGradient: 'from-rose-300 to-pink-500'
    }
  ];

  useEffect(() => {
    fetchProducts();
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      const productsData = response.data || [];
      setProducts(productsData);
      setFilteredProducts(productsData);
      
      const uniqueCategories = [...new Set(productsData.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Hero Slider Section - Mobile Responsive */}
      <section className="relative h-64 md:h-80 lg:h-[450px] xl:h-[700px] bg-gray-900 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Main container with background image */}
            <div 
              className="w-full h-full flex flex-col md:flex-row relative"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                backgroundPosition: '60% 30%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Gradient overlay for better text readability */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-80 md:opacity-70`}></div>
              
              {/* Content container - Stack on mobile, side by side on desktop */}
              <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
                {/* Text Content - Full width on mobile, left side on desktop */}
                <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center md:justify-start p-4 md:pl-8 lg:pl-12">
                  <div className="text-white max-w-md text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-pink-100">
                      {slide.subtitle}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-white/90 leading-relaxed">
                      {slide.description}
                    </p>
                    <button className="bg-white text-pink-600 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base">
                      {slide.cta}
                    </button>
                  </div>
                </div>

                {/* Right side - Hidden on mobile, visible on desktop */}
                <div className="hidden md:block w-1/2 lg:w-3/5 relative">
                  {/* Additional gradient overlay for the right side */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-pink-500/30"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls - Smaller on mobile */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-all z-20 shadow-lg"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-all z-20 shadow-lg"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Slider Indicators - Smaller on mobile */}
        <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-110 md:scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Brand Logo - Smaller on mobile */}
        <div className="absolute top-3 md:top-6 left-3 md:left-8 z-20">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-pink-600 font-bold text-sm md:text-lg">EJ</span>
            </div>
            <span className="text-white font-bold text-lg md:text-xl hidden sm:block">EJ Cosmetic</span>
          </div>
        </div>
      </section>

      {/* Search Section - COMPACT */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Compact search row */}
            <div className="flex flex-col md:flex-row gap-2 items-center">
              {/* Search Bar - Compact */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-gray-900 font-light  pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Category Filter - Compact */}
              <div className="w-full md:w-40">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-gray-900 font-light  px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters - Compact */}
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Info - Compact */}
            <div className="text-center mt-2 text-xs text-gray-600">
              <span>
                {filteredProducts.length} of {products.length} products
                {(searchTerm || selectedCategory !== 'all') && ' (filtered)'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Reduced Gap */}
      {featuredProducts.length > 0 && (
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">

          <h2 className="text-1xl text-center mb-4 text-gray-900 font-light tracking-widest uppercase border-b-2 border-pink-400 pb-2 inline-block">
  Featured Products
</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products - Reduced Gap */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-1xl text-center mb-4 text-gray-900 font-light tracking-widest uppercase border-b-2 border-pink-400 pb-2 inline-block">
            {featuredProducts.length > 0 ? 'All Products' : 'Our Products'}
          </h2>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-4 text-sm">
                {products.length === 0 
                  ? "No products available at the moment."
                  : "No products match your search criteria."
                }
              </p>
              {products.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}