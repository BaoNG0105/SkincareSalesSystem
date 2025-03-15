import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product with ID:', id);
        const response = await api.get(`/products/${id}`);
        console.log('API Response:', response.data);
        
        if (response.data) {
          setProduct(response.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
          {/* Product Image with Zoom Effect */}
          <div className="flex justify-center">
            <div className="relative group w-[450px] h-[450px] overflow-hidden cursor-zoom-in">
              {/* Hint Text */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Hover to zoom
              </div>
              
              {/* Product Image */}
              <img 
                src={product.image} 
                alt={product.productName}
                className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-150"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>
            <p className="text-2xl font-bold text-[#C91F50]">
              {product.price.toLocaleString()} VND
            </p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.status ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Stock Quantity */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Available:</span>
              <span>{product.stockQuantity} items</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                className="w-full bg-white border-2 border-[#C91F50] text-[#C91F50] py-3 rounded-md font-medium hover:bg-[#C91F50] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                disabled={!product.status}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              
              <button 
                className="w-full bg-[#C91F50] text-white py-3 rounded-md font-medium hover:bg-[#A41841] transition-colors duration-300"
                disabled={!product.status}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
