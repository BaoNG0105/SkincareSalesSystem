import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../../services/api.product";
import { toast } from "react-toastify";
import { FaExchangeAlt, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { MdCompare } from "react-icons/md";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compareProducts, setCompareProducts] = useState(() => {
    const saved = localStorage.getItem("compareProducts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("compareProducts", JSON.stringify(compareProducts));
  }, [compareProducts]);

  const handleCompareToggle = (product) => {
    setCompareProducts((prev) => {
      const isProductInCompare = prev.some(
        (p) => p.productId === product.productId
      );
      if (isProductInCompare) {
        return prev.filter((p) => p.productId !== product.productId);
      }
      if (prev.length >= 2) {
        toast.warning("Only 2 products can be compared!");
        return prev;
      }
      return [...prev, product];
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        if (productData) {
          setProduct(productData);
          const related = await getRelatedProducts(productData.category, id);
          setRelatedProducts(related.slice(0, 3));
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error details:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </h3>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative h-[450px] group">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-150"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.productName}</h1>
            <p className="text-2xl font-bold text-red-600">
              {product.price.toLocaleString()} VND
            </p>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <span>Status:</span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  product.status
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.status ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>Available:</span>
              <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                {product.stockQuantity} items
              </span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleCompareToggle(product)}
                className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 ${
                  compareProducts.some((p) => p.productId === product.productId)
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
              >
                <MdCompare className="w-5 h-5" />
                {compareProducts.some((p) => p.productId === product.productId)
                  ? "Added to compare"
                  : "Add to compare"}
              </button>

              {compareProducts.length > 0 && (
                <button
                  onClick={() => navigate("/product-compare")}
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <FaExchangeAlt className="w-5 h-5" />
                  Compare ({compareProducts.length} products)
                </button>
              )}

              <button
                disabled={!product.status}
                className="w-full py-2.5 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                disabled={!product.status}
                className="w-full py-2.5 px-4 rounded-lg bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaMoneyBillWave className="w-5 h-5" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.productId}
              onClick={() =>
                navigate(`/product-detail/${relatedProduct.productId}`)
              }
              className="bg-white rounded-lg light-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="p-4">
                <img
                  alt={relatedProduct.productName}
                  src={relatedProduct.image}
                  className="h-48 w-full object-contain"
                />
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">
                    {relatedProduct.productName}
                  </h3>
                  <p className="text-red-600 font-bold mt-2">
                    {relatedProduct.price.toLocaleString()} VND
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
