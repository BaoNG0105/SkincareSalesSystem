import { Link } from "react-router-dom";
import { useState } from 'react'
import { FaMapMarkerAlt, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
  const [showAuthOptions, setShowAuthOptions] = useState(false); // State để control dropdown

  return (
    <header className="bg-pink-50 fixed top-0 left-0 w-full z-50"> {/*tạo header cố định*/}
<div className="container mx-auto px-4">
  {/* Top Bar */}
  <div className="flex justify-between items-center py-6">
    <div className="flex space-x-4">
      <Link to="/" className="text-4xl font-bold text-pink-600 tracking-wider">
        SKINNE
      </Link>
    </div>
    <div className="flex items-center space-x-8">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-80 px-6 py-3 rounded-full border border-pink-200 focus:outline-none focus:border-pink-400 text-base"
        />
        <FaSearch className="absolute right-6 top-4 text-gray-400 text-lg" />
      </div>
      
      {/* Navigation Icons */}
      <div className="flex items-center space-x-6">
        <Link to="/location" className="hover:text-pink-700 transition-colors">
          <FaMapMarkerAlt className="text-pink-600 text-2xl" />
        </Link>
        
        {/* Login Icon with Dropdown */}
        <div 
          className="relative group"
          onMouseEnter={() => setShowAuthOptions(true)}
          onMouseLeave={() => setShowAuthOptions(false)}
        >
          <button className="hover:text-pink-700 transition-colors p-2">
            <FaUser className="text-pink-600 text-2xl" />
          </button>
          {/* Dropdown Menu */}
          {showAuthOptions && (
            <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-pink-100">
              <div className="h-3"></div>
              <div className="py-2">
                <Link 
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="hover:text-pink-700 transition-colors">
          <FaShoppingCart className="text-pink-600 text-2xl" />
        </Link>
      </div>
    </div>
  </div>

  {/* Main Navigation */}
  <nav className="py-4">
    <ul className="flex justify-center space-x-8">
      <li><Link to="/moisturizer" className="text-gray-700 hover:text-pink-600">MOISTURIZER</Link></li>
      <li><Link to="/serum" className="text-gray-700 hover:text-pink-600">SERUM</Link></li>
      <li><Link to="/cleanser" className="text-gray-700 hover:text-pink-600">CLEANSER</Link></li>
      <li><Link to="/sunscreen" className="text-gray-700 hover:text-pink-600">SUN SCREEN</Link></li>
      <li><Link to="/face-mask" className="text-gray-700 hover:text-pink-600">FACE MASK</Link></li>
      <li><Link to="/special-offers" className="text-gray-700 hover:text-pink-600">SPECIAL OFFERS</Link></li>
      <li><Link to="/skin-test" className="text-gray-700 hover:text-pink-600">SKIN TEST</Link></li>
      <li><Link to="/about" className="text-gray-700 hover:text-pink-600">ABOUT US</Link></li>
    </ul>
  </nav>
</div>
</header>
  )
}

export default Header
