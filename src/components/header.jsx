import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { getProduct } from "../services/api.product";

function Header() {
  const [showAuthOptions, setShowAuthOptions] = useState(false); // State để control dropdown
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [suggestions, setSuggestions] = useState([]); // State để lưu trữ gợi ý sản phẩm
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const products = await getProduct(); // Gọi getProduct để lấy product
      const filteredSuggestions = products.filter(
        (
          product //lọc product theo tên
        ) => product.productName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : [{ productName: "Product not found" }]
      ); // Cập nhật gợi ý sản phẩm
    } else {
      setSuggestions([{ productName: "Product not found" }]); // Nếu không có từ khóa, hiển thị từ không tìm thấy
    }
  };

  const handleSearchSubmit = () => {
    if (searchTerm) {
      navigate(`/product-search?query=${encodeURIComponent(searchTerm)}`); // Điều hướng đến trang tìm kiếm
    }
  };

  const handleClickOutside = () => {
    setSuggestions([]); // Đặt lại gợi ý khi nhấp chuột ra ngoài
  };

  useEffect(() => {
    // Thêm sự kiện click cho toàn bộ tài liệu
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Xóa sự kiện khi component bị hủy
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-pink-50 fixed top-0 left-0 w-full z-50">
      {" "}
      {/*tạo header cố định*/}
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-6">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-4xl font-bold text-pink-600 tracking-wider"
            >
              SKINNE
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-80 px-6 py-3 rounded-full border border-pink-200 focus:outline-none focus:border-pink-400 text-base"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
              <FaSearch className="absolute right-6 top-4 text-gray-400 text-lg" onClick={handleSearchSubmit} />
              {suggestions.length > 0 && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                  {suggestions.map((product) => (
                    <Link
                      key={product.productId}
                      to={
                        product.productName === "Product not found"
                          ? "#"
                          : `/product-detail/${product.productId}`
                      }
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        {product.productName === "Product not found" ? (
                          <div className="text-center text-red-500">
                            Product not found
                          </div>
                        ) : (
                          <>
                            <img
                              src={product.image}
                              alt={product.productName}
                              className="w-10 h-10 rounded-full"
                            />
                            <span>{product.productName}</span>
                            <span className="text-red-500">
                              {product.price}đ
                            </span>
                          </>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-6">
              <Link
                to="/location"
                className="hover:text-pink-700 transition-colors"
              >
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

              <Link
                to="/cart"
                className="hover:text-pink-700 transition-colors"
              >
                <FaShoppingCart className="text-pink-600 text-2xl" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="py-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link
                to="/moisturizer"
                className="text-gray-700 hover:text-pink-600"
              >
                MOISTURIZER
              </Link>
            </li>
            <li>
              <Link to="/serum" className="text-gray-700 hover:text-pink-600">
                SERUM
              </Link>
            </li>
            <li>
              <Link
                to="/cleanser"
                className="text-gray-700 hover:text-pink-600"
              >
                CLEANSER
              </Link>
            </li>
            <li>
              <Link
                to="/sunscreen"
                className="text-gray-700 hover:text-pink-600"
              >
                SUN SCREEN
              </Link>
            </li>
            <li>
              <Link
                to="/face-mask"
                className="text-gray-700 hover:text-pink-600"
              >
                FACE MASK
              </Link>
            </li>
            <li>
              <Link
                to="/promotion"
                className="text-gray-700 hover:text-pink-600"
              >
                SPECIAL OFFERS
              </Link>
            </li>
            <li>
              <Link
                to="/skin-test"
                className="text-gray-700 hover:text-pink-600"
              >
                SKIN TEST
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-pink-600">
                ABOUT US
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
