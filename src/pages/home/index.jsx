import { Link } from 'react-router-dom'; // import Link
// import { useState } from 'react'; // import useState
// import { FaSearch, FaUser, FaShoppingCart, FaMapMarkerAlt } from 'react-icons/fa'; // import icons
import { Swiper, SwiperSlide } from 'swiper/react'; // import Swiper
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // import Modules
import 'swiper/css'; // import CSS
import 'swiper/css/pagination'; // import Pagination
import 'swiper/css/navigation'; // import Navigation

const HomePage = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[550px]">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3000, // Thời gian chuyển slide 3s
            disableOnInteraction: false, // Cho phép tự động chuyển slide khi người dùng tương tác
          }}
          pagination={{
            clickable: true, // Cho phép người dùng nhấp vào các điểm trên thanh phân trang
          }}
          navigation={true} // Cho phép người dùng chuyển slide bằng các nút bên cạnh
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1576426863848-c21f53c60b19')",
                }}
              >
                <div className="absolute inset-0 bg-pink-40/90 backdrop-blur-sm"></div>
              </div>
              <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-pink-800 mb-6">
                    Discover Your Perfect Skincare Routine
                  </h1>
                  <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                    Take our skin type test and get personalized product recommendations
                  </p>
                  <Link 
                    to="/skin-test" 
                    className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Find my Skin Type
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1570554886111-e80fcca6a029')",
                }}
              >
                <div className="absolute inset-0 bg-pink-40/90 backdrop-blur-sm"></div>
              </div>
              <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-pink-800 mb-6">
                    Natural Beauty Products
                  </h1>
                  <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                    Discover our collection of natural and organic skincare products
                  </p>
                  <Link 
                    to="/products" 
                    className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1598440947619-2c35fc9aa908')",
                }}
              >
                <div className="absolute inset-0 bg-pink-40/90 backdrop-blur-sm"></div>
              </div>
              <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-pink-800 mb-6">
                    Special Offers
                  </h1>
                  <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                    Get up to 30% off on selected skincare products
                  </p>
                  <Link 
                    to="/special-offers" 
                    className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    View Offers
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Product Cards */}
            {/* Add your product components here */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-pink-800 mb-4">Personalized Routine</h3>
              <p className="text-gray-600">Get a customized skincare routine based on your skin type</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-pink-800 mb-4">Natural Ingredients</h3>
              <p className="text-gray-600">Products made with carefully selected natural ingredients</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-pink-800 mb-4">Expert Advice</h3>
              <p className="text-gray-600">Get skincare tips from our beauty experts</p>
            </div>
          </div>
        </div>
      </section>
 
    </div>
  );
};

export default HomePage;
