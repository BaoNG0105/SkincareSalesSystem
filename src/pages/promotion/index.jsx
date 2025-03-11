import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  
  useEffect(() => {
    // TODO: Fetch promotions from API
    // Temporary mock data
    setPromotions([
      {
        id: 1,
        title: "Summer Sale",
        description: "Get 30% off on all sunscreen products",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
        validUntil: "2024-06-30",
        discount: "30%",
        code: "SUMMER30"
      },
      {
        id: 2,
        title: "New Customer Special",
        description: "15% off on your first purchase",
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af",
        validUntil: "2024-12-31",
        discount: "15%",
        code: "WELCOME15"
      },
      // Add more mock promotions as needed
    ]);
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <div 
                key={promo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="relative h-48">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-full">
                    {promo.discount} OFF
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {promo.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="bg-pink-50 px-4 py-2 rounded-full">
                      <span className="text-pink-800 font-semibold">Code: {promo.code}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Valid until {new Date(promo.validUntil).toLocaleDateString()}
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
