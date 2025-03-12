import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart } = useCart();

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      category: "wearables",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Wireless Speaker",
      price: 149.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Fitness Tracker",
      price: 89.99,
      category: "wearables",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      price: 159.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Wireless Earbuds",
      price: 159.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      name: "Phone Case",
      price: 29.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filterProducts = () => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPriceRange = priceRange === 'all' || 
        (priceRange === '0-100' && product.price <= 100) ||
        (priceRange === '101-200' && product.price > 100 && product.price <= 200) ||
        (priceRange === '201-300' && product.price > 200 && product.price <= 300) ||
        (priceRange === '301+' && product.price > 300);

      return matchesSearch && matchesCategory && matchesPriceRange;
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[300px] p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="min-w-[200px] p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="wearables">Wearables</option>
          <option value="accessories">Accessories</option>
        </select>
        
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="min-w-[200px] p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Prices</option>
          <option value="0-100">$0 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201-300">$201 - $300</option>
          <option value="301+">Over $300</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filterProducts().map(product => (
          <div key={product.id} className="bg-white rounded-lg p-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl text-primary mb-2">{product.name}</h3>
            <p className="text-xl font-bold text-secondary mb-4">${product.price}</p>
            
            <div className="mt-auto flex gap-2 flex-wrap">
              <Link 
                to={`/product/${product.id}`}
                className="flex-1 py-3 px-4 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-center"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 py-3 px-4 bg-secondary text-white rounded hover:bg-secondary/90 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;