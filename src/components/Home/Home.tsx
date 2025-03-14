import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "John Jr 200",
      price: 19.99,
      image:"https://files.oaiusercontent.com/file-3m6k6XuRM9rKRTC2z1GQWf?se=2025-03-12T12%3A26%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd60eca02-3a54-48ca-aaf2-f64aff123fd2.webp&sig=2smt4vlfRENhGUgGBlWGPbhDVJ4uCT8Lg%2BuHaO5Ez6s%3D"
    },
    {
      id: 2,
      name: "BOSTON- Oversized T-Shirt, L",
      price: 39.99,
      image: "https://www.botnia.in/cdn/shop/files/5_41b6d8fa-fa23-4550-97f2-5161b85abcbd.png?v=1695274048"
    },
    {
      id: 3,
      name: "Believe Sentence Design t-shirt - TenStickers",
      price: 49.99,
      image: "https://www.tenstickers.in/webp/t-shirts/large/believe-sentence-design-custom-t-shirt-73492.webp"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="h-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center text-center text-white p-8 relative">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="max-w-3xl relative z-10">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Welcome to MartX</h1>
          <p className="text-xl mb-8 drop-shadow-md">
            Smart Choices, Infinite Possibilities!
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white no-underline rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Shop Now
          </Link>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]"></div>
      </section>

      <section className="py-16 px-8">
        <h2 className="text-3xl text-center mb-12 text-blue-500">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg p-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl text-blue-500 mb-2">{product.name}</h3>
              <p className="text-xl font-bold text-blue-500 mb-4">${product.price}</p>
              <Link to={`/product/${product.id}`} className="mt-auto w-full py-3 px-4 bg-blue-500 text-white rounded hover:bg-blue-500/90 transition-colors text-center">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl text-center mb-12 text-blue-500">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg p-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="h-48 bg-cover bg-center rounded-md mb-4" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')" }}></div>
            <h3 className="text-xl text-blue-500 mb-4">Electronics</h3>
            <Link to="/products" className="block w-full py-3 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-500/90 transition-colors">Browse Electronics</Link>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="h-48 bg-cover bg-center rounded-md mb-4" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')" }}></div>
            <h3 className="text-xl text-blue-500 mb-4">Accessories</h3>
            <Link to="/products" className="block w-full py-3 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-500/90 transition-colors">Browse Accessories</Link>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="h-48 bg-cover bg-center rounded-md mb-4" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')" }}></div>
            <h3 className="text-xl text-blue-500 mb-4">Wearables</h3>
            <Link to="/products" className="block w-full py-3 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-500/90 transition-colors">Browse Wearables</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;