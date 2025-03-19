import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

type Product = {
  id: string;
  product_name: string;
  category: string;
  price: number;
  image_url: string; // Corrected the image field
  brand: string;
  color: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v2/pages/19/");
      const data = await response.json();

      console.log("API Response:", data); // Debug API response

      // If related_products exist in the response, update state
      if (data.related_products) {
        setProducts(data.related_products);
      } else {
        console.error("No related_products found in API response.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = () => {
    return products.filter(product => {
      const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPriceRange =
        priceRange === 'all' ||
        (priceRange === '0-100' && product.price <= 100) ||
        (priceRange === '101-200' && product.price > 100 && product.price <= 200) ||
        (priceRange === '201-300' && product.price > 200 && product.price <= 300) ||
        (priceRange === '301+' && product.price > 300);

      return matchesSearch && matchesCategory && matchesPriceRange;
    });
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
          <option value="tshirt">T-Shirts</option>
          <option value="shirt">Shirts</option>
          <option value="denim">Denim</option>
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

        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col">
              <img
                src={product.image_url ? `http://127.0.0.1:8000${product.image_url}` : "/fallback-image.jpg"}
                alt={product.product_name || "Product Image"}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              <h3 className="text-xl text-primary mb-2">{product.product_name} | {product.brand}</h3>
              <h3 className="text-xl text-primary mb-2">{product.color}</h3>
              <p className="text-xl font-bold text-secondary mb-4">${product.price}</p>

              <div className="mt-auto flex gap-2">
                <a href={`/product/${product.id}`} className="flex-1">
                  <span className="block py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-center cursor-pointer">
                    View Details
                  </span>
                </a>
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition-colors text-center"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))
        ) : (
          <p className="text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;
