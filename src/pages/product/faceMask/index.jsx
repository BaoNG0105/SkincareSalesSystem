import { useState, useEffect } from 'react';
import api from '../../../config/axios';

const FaceMaskPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products');
        console.log('API Response:', response);
        console.log('Response data:', response.data);

        if (response.data) {
          // setProducts(response.data); //sẽ show ra tất cả product
          const facemaskProducts = response.data.filter(product => 
            product.category.toLowerCase() === 'facemask'
          );
          setProducts(facemaskProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  const productsList = Array.isArray(products) ? products : [];
  
  // Tính toán các sản phẩm cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productsList.length / productsPerPage);

  // Hàm xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[300px] bg-cover bg-center" style={{
        backgroundImage: `url('https://res.cloudinary.com/dygipvoal/image/upload/v1741617662/ftnmjjh3acwkgkqlsvdk.webp')`
      }}>
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-center text-white pt-32">
            Face Mask Collection
          </h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">Our Face Mask Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Product Cards */}
            {/* Các sản phẩm sẽ được thêm vào đây sau khi lấy từ API */}
            {currentProducts.map((product) => (
              <div 
                key={product.productId} 
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                onClick={() => {
                  console.log('Clicked product:', product);
                  window.location.href = `/product-detail/${product.productId}`;
                }}
              >
                {/* Product Image */}
                <div className="relative mb-4 flex justify-center">
                  <img 
                    src={product.image} 
                    alt={product.productName} 
                    className="h-48 object-contain"
                  />
                  {product.status === 'out_of_stock' && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  {/* Product Name */}
                  <h3 className="text-gray-800 font-medium text-lg leading-tight min-h-[50px]">
                    {product.productName}
                  </h3>

                  {/* Price */}
                  <div className="text-xl font-bold text-[#C91F50]">
                    {product.price.toLocaleString()}đ
                  </div>

                  {/* Buttons */}
                  <div className="space-y-2">
                    {/* Add to Cart Button */}
                    <button 
                      className="w-full bg-white border-2 border-[#C91F50] text-[#C91F50] py-2 rounded-md font-medium hover:bg-[#C91F50] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                      onClick={() => {
                        // Add your cart logic here
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>

                    {/* Buy Now Button */}
                    <button 
                      className="w-full bg-[#C91F50] text-white py-2 rounded-md font-medium hover:bg-[#A41841] transition-colors duration-300"
                      onClick={() => {
                        // Add your checkout logic here
                        window.location.href = '/checkout';
                      }}
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Additional Info (hidden by default) */}
                  <div className="hidden">
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Stock: {product.stock_quantity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-[#C91F50] text-white'
                    : 'bg-white border border-[#C91F50] text-[#C91F50] hover:bg-[#C91F50] hover:text-white'
                } transition-colors duration-300`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default FaceMaskPage;
  