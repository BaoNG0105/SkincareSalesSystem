import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  getOrderIdAndStatusByUserId,
  updateOrderItemsByOrderId,
  deleteOrderItemsByOrderItemId,
  updateOrderStatusByOrderId,
} from "../../services/api.order";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { getUserById } from "../../services/api.user";
import { updateUserById } from "../../services/api.user";

function CartPage() {
  const [orders, setOrders] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
  });

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
          const filteredOrders = orderData.map((order) => ({
            ...order,
            orderItems: order.orderItems.filter((item) => !item.deleted),
            // Tính lại tổng giá chỉ với các item chưa bị xóa
            totalPrice: order.orderItems
              .filter((item) => !item.deleted)
              .reduce(
                (total, item) => total + item.quantity * item.product.price,
                0
              ),
          }));

          // Kiểm tra xem còn item nào không
          const hasItems = filteredOrders.some(
            (order) => order.orderItems.length > 0
          );

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      try {
        const userData = await getUserById(userId);
        setUserInfo(userData);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  //Hàm update quantity
  const handleUpdateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateOrderItemsByOrderId(item.orderItemId, {
        orderId: item.orderId,
        productId: item.product.productId,
        quantity: newQuantity,
        unitPrice: item.product.price,
        discountAmount: 0,
      });

      //Hàm cập nhật lại order
      setOrders(
        orders.map((order) => ({
          ...order,
          orderItems: order.orderItems.map((orderItem) => {
            if (orderItem.orderItemId === item.orderItemId) {
              return {
                ...orderItem,
                quantity: newQuantity,
                totalPrice: newQuantity * item.product.price,
              };
            }
            return orderItem;
          }),
          totalPrice: order.orderItems.reduce((total, orderItem) => {
            if (orderItem.orderItemId === item.orderItemId) {
              return total + newQuantity * item.product.price;
            }
            return total + orderItem.quantity * orderItem.product.price;
          }, 0),
        }))
      );
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
        const filteredOrders = orderData.map((order) => ({
          ...order,
          orderItems: order.orderItems.filter((item) => !item.deleted),
          totalPrice: order.orderItems
            .filter((item) => !item.deleted)
            .reduce(
              (total, item) => total + item.quantity * item.product.price,
              0
            ),
        }));

        // Kiểm tra xem còn item nào không
        const hasItems = filteredOrders.some(
          (order) => order.orderItems.length > 0
        );

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

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      // 1. Lấy thông tin user hiện tại
      const currentUser = await getUserById(userId);

      // 2. Cập nhật thông tin user với dữ liệu mới kết hợp dữ liệu cũ
      const updatedUserData = {
        gender: currentUser.gender,
        dateOfBirth: formData.dateOfBirth || currentUser.dateOfBirth,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        profileImage: currentUser.profileImage,
        money: currentUser.money,
      };
      const userResponse = await updateUserById(userId, updatedUserData);

      // 3. Cập nhật trạng thái đơn hàng
      const orderUpdatePromises = orders.map((order) =>
        updateOrderStatusByOrderId(order.orderId, "PROCESSING")
      );

      await Promise.all(orderUpdatePromises);

      if (userResponse) {
        setUserInfo(userResponse);
        toast.success("Order placed successfully!");
        setIsCheckoutModalOpen(false);
        // Redirect to order status or clear cart
        window.location.href = `/order-status/${userInfo.id}`; // Add this if you want to redirect
      }
    } catch (error) {
      console.error("Error processing checkout:", error);
      toast.error("Failed to process checkout");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Replace editProfileModal with checkoutModal
  const checkoutModal = isCheckoutModalOpen && (
    <div className="fixed inset-0 bg-pink-100 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl text-center text-pink-600 font-semibold mb-4">
          Checkout Information
        </h2>
        <form onSubmit={handleEditProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              readOnly
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promotion Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your coupon code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
              <button
                type="button"
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                OK
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="cod" className="text-pink-600">
                  Cash on Delivery (COD)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="online"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="online" className="text-pink-600">
                  Online Payment
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!paymentMethod}
              className={`px-4 py-2 text-white rounded-md ${
                paymentMethod
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );

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
                            onClick={() =>
                              handleUpdateQuantity(item, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-4">{item.quantity}</span>
                          <button
                            className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-200"
                            onClick={() =>
                              handleUpdateQuantity(item, item.quantity + 1)
                            }
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
                <h2 className="text-lg text-center font-semibold mb-4">
                  Order Summary
                </h2>

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

                <button
                  onClick={() => {
                    setFormData({
                      userName: userInfo?.userName || "",
                      phoneNumber: userInfo?.phoneNumber || "",
                      address: userInfo?.address || "",
                    });
                    setIsCheckoutModalOpen(true);
                  }}
                  className="w-full mt-6 bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition duration-300"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {checkoutModal}
    </div>
  );
}

export default CartPage;
