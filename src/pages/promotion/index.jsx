import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPromotion } from '../../services/api.promotion';

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-pink-50">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-pink-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-pink-800 mb-4">
              Special Offers & Promotions
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover amazing deals on your favorite skincare products
            </p>
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <div 
                key={promo.promotionId}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
              >
                <div className="relative flex-grow">
                  <div className="absolute top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-full">
                    {promo.discountPercentage}% OFF
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {promo.code}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {promo.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="bg-pink-50 px-4 py-2 rounded-full">
                      <span className="text-pink-800 font-semibold">Code: {promo.code}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Valid until {new Date(promo.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Link 
                    to={`/products?promo=${promo.code}`}
                    className="mt-4 inline-block w-full text-center bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition duration-300"
                  >
                    Shop Now
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
