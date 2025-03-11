// import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
           <footer className="bg-pink-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Customer Service Column */}
            <div>
              <h4 className="font-semibold text-pink-800 mb-4">Customer Service</h4>
              <ul className="space-y-2">
                {/* <li><Link to="/rewards" className="text-gray-600 hover:text-pink-600">Earn Rewards</Link></li> */}
                <li><Link to="/shipping-policy" className="text-gray-600 hover:text-pink-600">Shipping Policy</Link></li>
                <li><Link to="/return-policy" className="text-gray-600 hover:text-pink-600">Return Policy</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-600 hover:text-pink-600">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="text-gray-600 hover:text-pink-600">Terms and Conditions</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-pink-600">Contact Us</Link></li>
                <li><Link to="/faqs" className="text-gray-600 hover:text-pink-600">FAQs</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-semibold text-pink-800 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-pink-600">About Us</Link></li>
                <li><Link to="/category" className="text-gray-600 hover:text-pink-600">Skin Care Library</Link></li>
                <li><Link to="/skin-test" className="text-gray-600 hover:text-pink-600">Skin Test</Link></li>
                <li><Link to="/dashboard" className="text-gray-600 hover:text-pink-600">Dash board</Link></li>
              </ul>
            </div>

            {/* Company Info Column */}
            <div>
              <Link to="/" className="block mb-4">
                <span className="text-2xl font-bold text-pink-600">SKINNE</span>
              </Link>
              <p className="text-gray-600 mb-4">AUTHORIZED RETAILER OF ALL BRANDS- 100% PRODUCT AUTHENTICITY GUARANTEED</p>
              <p className="text-gray-600 mb-6">
                SKINNE does not provide medical advice. Information on this website is provided for educational purposes and 
                does not create a doctor-patient relationship. SKINNE Concierge powered by AI does not provide medical advice.
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Phone: </span>
                  <a href="tel:091-103-1534" className="hover:text-pink-600">091-103-1534</a>
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email: </span>
                  <a href="mailto:skinne@gmail.com" className="hover:text-pink-600">skinne@gmail.com</a>
                </p>
              </div>
              <div className="mt-6">
                <p className="text-gray-600">Copyright © SKINNE Solutions 2025</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
