import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getRoutinesByTestResult,
  getRecommendedProducts,
} from "../../services/api.skinTest";
import { toast } from "react-toastify";

import { FaSpinner } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdFace } from "react-icons/md";

const Routine = () => {
  const [routineData, setRoutineData] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { skinTypeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routineData, productsData] = await Promise.all([
          getRoutinesByTestResult(skinTypeId),
          getRecommendedProducts(skinTypeId),
        ]);
        setRoutineData(routineData);
        setRecommendedProducts(productsData);
      } catch (error) {
        toast.error("Can not load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [skinTypeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-pink-600">
          <FaSpinner className="animate-spin text-2xl" />
          <span className="font-medium">Loading your routine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-center flex items-center justify-center gap-2">
            <MdFace className="text-4xl" />
            Your Personalized Skincare Routine
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {routineData ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            {routineData.map((step) => (
              <div
                key={`routine-${step.routineId}`}
                className="mb-12 last:mb-0"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.stepNumber}
                  </div>
                  <h2 className="ml-4 text-2xl font-semibold text-gray-800">
                    Step {step.stepNumber}
                  </h2>
                </div>
                <div className="ml-16">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  {step.products && step.products.length > 0 && (
                    <div>
                      <h3 className="font-medium text-pink-600 mb-4 flex items-center gap-2">
                        <BsCheckCircleFill />
                        Recommended Products:
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {step.products.map((product) => (
                          <div
                            key={`routine-product-${step.routineId}-${product.productId}`}
                            className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                          >
                            {product.image && (
                              <div className="relative overflow-hidden rounded-lg">
                                <img
                                  src={product.image}
                                  alt={product.productName}
                                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <h4 className="font-medium text-gray-800 mt-4 group-hover:text-pink-600 transition-colors">
                              {product.productName}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {product.brand}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <MdFace className="text-6xl mx-auto text-pink-600 mb-4" />
            <p className="text-xl">
              No routine data available for your skin type.
            </p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4">
        <div className="border-b border-gray-200 my-8"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {recommendedProducts && recommendedProducts.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BsCheckCircleFill className="text-pink-600" />
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Sản phẩm được đề xuất cho loại da{" "}
                {recommendedProducts[0]?.skinType?.skinType}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((recommendation) => (
                <div
                  key={`recommended-product-${recommendation.recommendationId}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {recommendation.product.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={recommendation.product.image}
                        alt={recommendation.product.productName}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-medium text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[48px]">
                      {recommendation.product.productName}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {recommendation.product.category}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {recommendation.recommendationReason}
                    </p>
                    {recommendation.product.price && (
                      <p className="text-pink-600 font-semibold mt-2 text-lg">
                        {recommendation.product.price.toLocaleString()}đ
                      </p>
                    )}
                    <button
                      onClick={() =>
                        (window.location.href = `/product-detail/${recommendation.product.productId}`)
                      }
                      className="mt-4 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Routine;
