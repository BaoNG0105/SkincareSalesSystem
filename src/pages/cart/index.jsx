import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getOrderIdAndStatusByUserId, updateOrderItems, deleteOrderItemsByOrderItemId } from "../../services/api.order";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function CartPage() {
  const [orders, setOrders] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    //Hàm lấy order
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      try {
        const orderData = await getOrderIdAndStatusByUserId(userId);
        if (orderData && orderData.length > 0) {
          // Lọc ra các order có orderItems chưa bị xóa (deleted: false)
          const filteredOrders = orderData.map(order => ({
            ...order,
            orderItems: order.orderItems.filter(item => !item.deleted),
            // Tính lại tổng giá chỉ với các item chưa bị xóa
            totalPrice: order.orderItems
              .filter(item => !item.deleted)
              .reduce((total, item) => total + (item.quantity * item.product.price), 0)
          }));

          // Kiểm tra xem còn item nào không
          const hasItems = filteredOrders.some(order => order.orderItems.length > 0);
          
          setOrders(filteredOrders);
          setIsCartEmpty(!hasItems);
        } else {
          setIsCartEmpty(true);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  //Hàm update quantity
  const handleUpdateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateOrderItems(item.orderItemId, {
        orderId: item.orderId,
        productId: item.product.productId,
        quantity: newQuantity,
        unitPrice: item.product.price,
        discountAmount: 0
      });

      //Hàm cập nhật lại order
      setOrders(orders.map(order => ({
        ...order,
        orderItems: order.orderItems.map(orderItem => {
          if (orderItem.orderItemId === item.orderItemId) {
            return {
              ...orderItem,
              quantity: newQuantity,
              totalPrice: newQuantity * item.product.price
            };
          }
          return orderItem;
        }),
        totalPrice: order.orderItems.reduce((total, orderItem) => {
          if (orderItem.orderItemId === item.orderItemId) {
            return total + (newQuantity * item.product.price);
          }
          return total + (orderItem.quantity * orderItem.product.price);
        }, 0)
      })));

    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Error updating quantity:", error);
    }
  };

  //Hàm xóa item
  const handleDeleteItem = async (item) => {
    try {
      // Gọi API để xóa order item
      await deleteOrderItemsByOrderItemId(item.orderItemId);

      // Lấy token và userId
      const token = localStorage.getItem("token");
      if (!token) return;
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      // Fetch lại danh sách orders sau khi xóa
      const orderData = await getOrderIdAndStatusByUserId(userId);
      if (orderData && orderData.length > 0) {
        // Lọc ra các order có orderItems chưa bị xóa (deleted: false)
        const filteredOrders = orderData.map(order => ({
          ...order,
          orderItems: order.orderItems.filter(item => !item.deleted),
          totalPrice: order.orderItems
            .filter(item => !item.deleted)
            .reduce((total, item) => total + (item.quantity * item.product.price), 0)
        }));

        // Kiểm tra xem còn item nào không
        const hasItems = filteredOrders.some(order => order.orderItems.length > 0);
        
        setOrders(filteredOrders);
        setIsCartEmpty(!hasItems);
      } else {
        setIsCartEmpty(true);
      }

      toast.success("Item removed from cart successfully");
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-center font-bold text-pink-600 mb-8">
          MY CART
        </h1>

        {isCartEmpty ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <img
              src="https://res.cloudinary.com/dygipvoal/image/upload/v1742286511/en211bux0cmue2ydku7t.png"
              alt="Empty Cart"
              className="mx-auto w-48 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you have not added anything to your cart yet
            </p>
            <Link
              to="/category"
              className="bg-pink-500 text-white px-6 py-3 rounded-full 
                hover:bg-pink-600 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                {orders.map((order) =>
                  order.orderItems.map((item) => (
                    <div
                      key={item.orderItemId}
                      className="flex items-center border-b border-gray-200 pb-4 mb-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.productName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 ml-4">
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.product.productName}
                        </h3>
                        <div className="flex items-center mt-2">
                          <button 
                            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-200"
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-4">{item.quantity}</span>
                          <button 
                            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-200"
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-pink-600">
                          {item.unitPrice.toLocaleString()}₫
                        </p>
                        <button 
                          onClick={() => handleDeleteItem(item)}
                          className="text-gray-500 hover:text-red-500 mt-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg text-center font-semibold mb-4">Order Summary</h2>

                {/* Promotion Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promotion Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter your coupon code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
                      OK
                    </button>
                  </div>
                </div>

                {/* Loyalty points */}
                {/* <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Loyalty points
                  </h3>
                  <p className="text-gray-600">Number of point: 0</p>
                </div> */}

                {/* Subtotal & Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      {orders
                        .reduce((total, order) => total + order.totalPrice, 0)
                        .toLocaleString()}
                      ₫
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-pink-600">
                      {orders
                        .reduce((total, order) => total + order.totalPrice, 0)
                        .toLocaleString()}
                      ₫
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full mt-6 bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition duration-300">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
