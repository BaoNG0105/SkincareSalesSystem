import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../services/api.product";

const ProductSearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProduct();
        const filteredProducts = allProducts.filter(product =>
          product.productName.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
            Search Results for &quot;{query}&quot;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Product Cards */}
            {currentProducts.map((product) => (
              <div
                key={product.productId}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                onClick={() => {
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
                  {product.status === "out_of_stock" && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="text-gray-800 font-medium text-lg leading-tight min-h-[50px]">
                    {product.productName}
                  </h3>
                  <div className="text-xl font-bold text-[#C91F50]">
                    {product.price.toLocaleString()}đ
                  </div>
                  {/* Buttons */}
                  <div className="space-y-2">
                    <button className="w-full bg-white border-2 border-[#C91F50] text-[#C91F50] py-2 rounded-md font-medium hover:bg-[#C91F50] hover:text-white transition-colors duration-300">
                      Add to Cart
                    </button>
                    <button className="w-full bg-[#C91F50] text-white py-2 rounded-md font-medium hover:bg-[#A41841] transition-colors duration-300">
                      Buy Now
                    </button>
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
                    ? "bg-[#C91F50] text-white"
                    : "bg-white border border-[#C91F50] text-[#C91F50] hover:bg-[#C91F50] hover:text-white"
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

export default ProductSearchPage;
