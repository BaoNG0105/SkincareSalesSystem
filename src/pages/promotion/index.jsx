import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPromotion } from '../../services/api.promotion';
import { FaPercent, FaTag, FaClock, FaShoppingBag } from 'react-icons/fa';

const PromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  
  useEffect(() => {
    const fetchPromotions = async () => {
      const data = await getPromotion();
      setPromotions(data);
    };
    fetchPromotions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-pink-100 via-pink-50 to-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-extrabold text-pink-800 mb-4 tracking-tight">
              Special Offers & Promotions
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Discover amazing deals and exclusive discounts on your favorite skincare products
            </p>
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <div 
                key={promo.promotionId}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-gray-100"
              >
                <div className="relative p-6 flex-grow">
                  <div className="absolute top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                    <FaPercent className="text-sm" />
                    <span>{promo.discountPercentage}% OFF</span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                      <FaTag className="text-pink-600" />
                      <span>{promo.code}</span>
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                      {promo.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="bg-pink-50 px-4 py-2 rounded-full flex items-center space-x-2">
                        <span className="text-pink-800 font-semibold">Code: {promo.code}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <FaClock className="text-pink-600" />
                        <span>Valid until {new Date(promo.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={`/category`}
                    className="mt-6 group flex items-center justify-center w-full bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition duration-300"
                  >
                    <span className="mr-2">Shop Now</span>
                    <FaShoppingBag className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromotionPage;
