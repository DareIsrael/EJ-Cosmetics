'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About EJ Cosmetic</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in beauty and cosmetics since 2020
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                EJ Cosmetic was born from a passion for helping people discover their unique beauty. 
                What started as a small local store has grown into a trusted online destination for 
                premium beauty products.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that everyone deserves access to high-quality cosmetics that enhance 
                natural beauty while being kind to your skin and the environment.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">10K+</div>
                  <div className="text-sm text-gray-500">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">500+</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">5</div>
                  <div className="text-sm text-gray-500">Years</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg h-64 lg:h-80 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💄</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality & Trust</h3>
                <p className="text-white/90">Our commitment to excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To provide high-quality, affordable beauty products that empower individuals to 
              express their unique style and boost their confidence through safe, effective, 
              and cruelty-free cosmetics.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">👁️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become the leading beauty destination in Nigeria, known for innovation, 
              quality, and exceptional customer experience while promoting sustainable 
              beauty practices.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                We source only the best ingredients and products from trusted suppliers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">
                Building lasting relationships with our customers through transparency.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Committed to eco-friendly practices and cruelty-free products.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link 
            href="/products"
            className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors inline-block"
          >
            Shop Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}