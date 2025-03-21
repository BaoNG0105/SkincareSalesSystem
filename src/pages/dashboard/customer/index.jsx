/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import api from "../../../config/axios";
import { deleteUserByUserId } from "../../../services/api.user";
import { toast } from "react-toastify";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapStatus = (status) => {
    return status ? "Active" : "Inactive";
  };

  const mapGender = (gender) => {
    return gender === "Male" ? "Male" : "Female";
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      console.log("Raw API Response:", response.data);
      if (response.data) {
        const customerData = response.data.filter(
          (user) => user.role === "Customer"
        );
        const mappedCustomers = customerData.map((customer) => ({
          ...customer,
          key: customer.id.toString(),
          status: mapStatus(customer.status),
          gender: mapGender(customer.gender),
        }));
        console.log("Mapped Customers:", mappedCustomers);
        setCustomers(mappedCustomers);
      }
    } catch (err) {
      console.error("Error loading customer list:", err);
      setError("Unable to load customer list");
      toast.error("Unable to load customer list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUserByUserId(id);
      if (response) {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== id)
        );
        toast.success("Delete customer successfully");
      }
    } catch (err) {
      console.error("Error deleting customer:", err);
      toast.error("Cannot delete customer");
    }
  };

  const TableHeader = () => (
    <tr>
      {/* <th className="px-4 py-2">Avatar</th> */}
      <th className="px-4 py-2">Full Name</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Phone</th>
      <th className="px-4 py-2">Address</th>
      <th className="px-4 py-2">Gender</th>
      <th className="px-4 py-2">Date of Birth</th>
      <th className="px-4 py-2">Balance</th>
      <th className="px-4 py-2">Created Date</th>
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  );

  const formatDate = (date) => {
    if (!date) return "Not updated";
    try {
      return new Date(date).toLocaleDateString("en-US");
    } catch (error) {
      console.error("Error parsing date:", error);
      return date;
    }
  };

  if (loading) return <div className="flex justify-center items-center py-8">Loading...</div>;
  if (error) return <div className="flex justify-center items-center py-8 text-red-600">{error}</div>;

  return (
    <div className="w-full h-full p-6">
      <div className="bg-white rounded-lg shadow-lg w-full">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50">
              <TableHeader />
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  {/* <td className="px-4 py-2">
                    <img
                      src={customer.profileImage}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td> */}
                  <td className="px-4 py-2 truncate">{customer.userName || "Not updated"}</td>
                  <td className="px-4 py-2 truncate">{customer.email}</td>
                  <td className="px-4 py-2 truncate">{customer.phoneNumber}</td>
                  <td className="px-4 py-2 truncate">{customer.address}</td>
                  <td className="px-4 py-2 truncate">{customer.gender}</td>
                  <td className="px-4 py-2 truncate">{formatDate(customer.dateOfBirth)}</td>
                  <td className="px-4 py-2 truncate">{customer.money?.toLocaleString("vi-VN")} ₫</td>
                  <td className="px-4 py-2 truncate">{formatDate(customer.createdAt)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold
                        ${customer.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        if (customer.role === "Manager") {
                          toast.warning("Cannot delete Manager account");
                          return;
                        }
                        handleDelete(customer.id);
                      }}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
