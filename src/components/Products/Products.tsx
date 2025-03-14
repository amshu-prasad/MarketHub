import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
type Product = {
  product_name: string;
  category: string;
  price: number;
  image_url: string; // Corrected the image field
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/v2/pages/19/");
        // const res = await fetch("http://127.0.0.1:8000/api/v2/pages/?type=products.ProductsPage");
        const data = await res.json();

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

    fetchProducts();
  }, []);


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
        {filterProducts().map((product, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col">
            <img
              src={product.image_url} // Corrected image field reference
              alt={product.product_name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl text-primary mb-2">{product.product_name}</h3>
            <p className="text-xl font-bold text-secondary mb-4">${product.price}</p>

            <div className="mt-auto flex gap-2 flex-wrap">
              {/* <Link href={`/product/${index}`} passHref>
  <span className="flex-1 py-3 px-4 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-center cursor-pointer">
    View Details
  </span>
</Link> */}

              <button
                onClick={() => addToCart(product)}
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
