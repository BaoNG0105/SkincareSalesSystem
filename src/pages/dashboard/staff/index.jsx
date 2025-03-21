/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getUsers,
  deleteUserByUserId,
  createStaff,
} from "../../../services/api.user";

function StaffPage() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    passwordHash: "123456",
    userName: "",
    gender: "Male",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    profileImage: "",
  });

  useEffect(() => {
    fetchStaffs();
  }, []);

  const mapStatus = (status) => {
    return status ? "Active" : "Inactive";
  };

  const mapGender = (gender) => {
    return gender === "Male" ? "Male" : "Female";
  };

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      if (response) {
        const staffData = response.filter((user) => user.role === "Staff");
        const mappedStaffs = staffData.map((staff) => ({
          ...staff,
          key: staff.id.toString(),
          status: mapStatus(staff.status),
          gender: mapGender(staff.gender),
        }));
        setStaffs(mappedStaffs);
      }
    } catch (err) {
      console.error("Error loading staff list:", err);
      setError("Unable to load staff list");
      toast.error("Unable to load staff list");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        const response = await deleteUserByUserId(userId);
        if (response) {
          setStaffs((prevStaffs) =>
            prevStaffs.filter((staff) => staff.id !== userId)
          );
          toast.success("Delete staff successfully");
        }
      } catch (err) {
        console.error("Error when deleting staff:", err);
        toast.error("Cannot delete staff");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createStaff(formData);
      if (response) {
        toast.success("Staff created successfully");
        setIsModalOpen(false);
        setFormData({
          email: "",
          passwordHash: "123456",
          userName: "",
          gender: "Male",
          dateOfBirth: "",
          address: "",
          phoneNumber: "",
          profileImage: "",
        });
        fetchStaffs();
      }
    } catch (error) {
      console.error("Error creating staff:", error);
      toast.error("Failed to create staff");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not updated";
    try {
      return new Date(date).toLocaleDateString("en-US");
    } catch (error) {
      console.error("Error when formatting date:", error);
      return date;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-8">Loading...</div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center py-8 text-red-600">
        {error}
      </div>
    );

  return (
    <div className="w-full h-full p-6">
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add New Staff
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg w-full">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Date of Birth</th>
                <th className="px-4 py-2">Created Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffs.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 truncate">
                    {staff.userName || "Not updated"}
                  </td>
                  <td className="px-4 py-2 truncate">{staff.email}</td>
                  <td className="px-4 py-2 truncate">{staff.phoneNumber}</td>
                  <td className="px-4 py-2 truncate">{staff.address}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-semibold ${
                        staff.role === "Manager"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 truncate">{staff.gender}</td>
                  <td className="px-4 py-2 truncate">
                    {formatDate(staff.dateOfBirth)}
                  </td>
                  <td className="px-4 py-2 truncate">
                    {formatDate(staff.createdAt)}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold
                      ${
                        staff.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        if (staff.role === "Manager") {
                          toast.warning("Cannot delete Manager account");
                          return;
                        }
                        handleDelete(staff.id);
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Staff</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Image URL
                  </label>
                  <input
                    type="text"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Create Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffPage;
