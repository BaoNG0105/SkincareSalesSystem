import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserById, updateUserById } from "../../services/api.user";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendar,
  FaVenusMars,
} from "react-icons/fa";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    // passwordHash: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    profileImage: "",
  });
//   const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const userData = await getUserById(userId);
        setUser(userData);
        // Pre-populate form data with existing user data
        setFormData({
        //   passwordHash: "",
          gender: userData.gender || "",
          dateOfBirth: userData.dateOfBirth
            ? userData.dateOfBirth.split("T")[0]
            : "",
          address: userData.address || "",
          phoneNumber: userData.phoneNumber || "",
          profileImage: userData.profileImage || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEditProfile = async (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   toast.error("Please fill in all required fields correctly");
    //   return;
    // }

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const response = await updateUserById(userId, formData);
      if (response) {
        toast.success("Profile updated successfully!");
        setUser({ ...user, ...response });
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.passwordHash.trim()) {
//       newErrors.passwordHash = "Password is required";
//     } else if (formData.passwordHash.length < 8) {
//       newErrors.passwordHash = "Password must be at least 8 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  const editButton = (
    <button
      onClick={() => setIsEditModalOpen(true)}
      className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 
        transition-colors duration-200 inline-flex items-center"
    >
      Edit Profile
    </button>
  );

  // Edit Profile Modal
  const editProfileModal = isEditModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleEditProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder="Enter your address"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder="Enter your phone number"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder="Enter image URL"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="passwordHash"
              value={formData.passwordHash}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm 
                ${
                  errors.passwordHash
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                }`}
              placeholder="Enter your password"
              required
            />
            {errors.passwordHash && (
              <p className="mt-1 text-sm text-red-500">{errors.passwordHash}</p>
            )}
          </div> */}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Profile */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-10">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-pink-600">
                  {user?.userName?.charAt(0) || user?.email?.charAt(0)}
                </span>
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white">
                  {user?.userName}
                </h1>
                <p className="text-pink-100 mt-1">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-pink-500 w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">User name</p>
                      <p className="text-gray-800 font-medium">
                        {user?.userName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-pink-500 w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800 font-medium">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-pink-500 w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800 font-medium">
                        {user?.phoneNumber || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-pink-500 w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800 font-medium">
                        {user?.address || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaCalendar className="text-pink-500 w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-800 font-medium">
                        {user?.dateOfBirth || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaVenusMars className="text-pink-500 w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-gray-800 font-medium">
                        {user?.gender || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {editButton}
              </div>

              {/* Account Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Account Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="text-pink-600 font-semibold text-2xl">
                      {user?.money || 0}
                    </p>
                    <p className="text-gray-600">Balance (VND)</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="text-pink-600 font-semibold">
                      {user?.createdAt}
                    </p>
                    <p className="text-gray-600">Member Since</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editProfileModal}
    </div>
  );
}

export default ProfilePage;
