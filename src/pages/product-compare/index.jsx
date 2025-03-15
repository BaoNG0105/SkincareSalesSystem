import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

const ProductComparePage = () => {
  const navigate = useNavigate();
  const [compareProducts, setCompareProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("compareProducts");
    if (saved) {
      setCompareProducts(JSON.parse(saved));
    }
  }, []);

  const removeProduct = (productId) => {
    const newProducts = compareProducts.filter(
      (p) => p.productId !== productId
    );
    setCompareProducts(newProducts);
    localStorage.setItem("compareProducts", JSON.stringify(newProducts));
  };

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-pink-600 mb-4">
            There are no products to compare
          </h3>
          <button
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft className="text-lg" />
            <span>Back to shopping</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Product Comparison
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="w-1/5 border border-gray-200 bg-gray-50 p-4">
                Product Details
              </th>
              {compareProducts.map((product) => (
                <th
                  key={product.productId}
                  className={`w-[${
                    80 / compareProducts.length
                  }%] border border-gray-200 p-4`}
                >
                  <div className="text-center">
                    <div className="mb-4">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-48 h-48 object-contain mx-auto"
                      />
                    </div>
                    <h5 className="text-lg font-semibold line-clamp-2 mb-2">
                      {product.productName}
                    </h5>
                    <p className="text-xl font-bold text-red-600 mb-3">
                      {product.price.toLocaleString()} VND
                    </p>
                    <button
                      onClick={() => removeProduct(product.productId)}
                      className="flex items-center gap-2 mx-auto px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 p-4 font-semibold">
                Description
              </td>
              {compareProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-200 p-4"
                >
                  <p className="line-clamp-4">{product.description}</p>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-semibold">
                Status
              </td>
              {compareProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-200 p-4"
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      product.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-200 p-4 font-semibold">
                Stock Quantity
              </td>
              {compareProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-200 p-4"
                >
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {product.stockQuantity} products
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductComparePage;
