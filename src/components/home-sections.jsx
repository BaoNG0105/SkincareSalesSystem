import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react"; // import Swiper
import { Autoplay, Navigation } from "swiper/modules"; // import Modules
import "swiper/css"; // import CSS
import "swiper/css/navigation"; // import Navigation
import { getProduct } from '../services/api.product';
import PropTypes from 'prop-types'; // Import PropTypes
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa"; // Add this import

const ProductSection = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        const filteredProducts = response.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredProducts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {category.charAt(0).toUpperCase() + category.slice(1)} Collection
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          navigation={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay, Navigation]}
        >
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : (
            products.map((product) => (
              <SwiperSlide key={product.productId}>
                <div 
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => {
                    window.location.href = `/product-detail/${product.productId}`;
                  }}
                >
                  <div className="relative mb-4 flex justify-center group">
                    <img 
                      src={product.image} 
                      alt={product.productName} 
                      className="h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    {product.status === 'out_of_stock' && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <h3 className="text-gray-800 font-semibold text-lg leading-tight min-h-[50px] mb-2">
                    {product.productName}
                  </h3>
                  <div className="text-xl font-bold text-[#C91F50] mb-4">
                    {product.price.toLocaleString()}đ
                  </div>
                  <div className="space-y-3">
                    <button 
                      className="w-full py-2.5 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={product.status === 'out_of_stock'}
                    >
                      <FaShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button 
                      className="w-full bg-[#C91F50] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#A41841] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        window.location.href = '/checkout';
                      }}
                      disabled={product.status === 'out_of_stock'}
                    >
                      <FaMoneyBillWave className="w-5 h-5" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

// Add prop type validation
ProductSection.propTypes = {
  category: PropTypes.string.isRequired, // Validate that category is a required string
};

export default ProductSection;
