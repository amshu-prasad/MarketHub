import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary shadow-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
      <div className="text-white">
        <Link to="/" className="text-2xl font-bold">MartX</Link>
      </div>
      
      <button 
        className="md:hidden flex flex-col gap-1 bg-transparent border-none cursor-pointer p-1"
        onClick={toggleMenu}
      >
        <span className="w-6 h-0.5 bg-white transition-all"></span>
        <span className="w-6 h-0.5 bg-white transition-all"></span>
        <span className="w-6 h-0.5 bg-white transition-all"></span>
      </button>

      <div className={`md:flex items-center gap-8 ${isOpen ? 'flex' : 'hidden'} absolute md:relative top-full left-0 right-0 md:top-auto bg-primary md:bg-transparent flex-col md:flex-row p-4 md:p-0`}>
        <Link to="/" onClick={toggleMenu} className="text-white font-medium hover:text-gray-200 transition-colors py-2 md:py-0">Home</Link>
        <Link to="/products" onClick={toggleMenu} className="text-white font-medium hover:text-gray-200 transition-colors py-2 md:py-0">Products</Link>
        <Link to="/cart" onClick={toggleMenu} className="text-white font-medium hover:text-gray-200 transition-colors py-2 md:py-0 relative">
          Cart
          <span className="absolute -top-2 -right-3 bg-secondary text-white rounded-full px-2 py-0.5 text-xs">{getCartItemsCount()}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;