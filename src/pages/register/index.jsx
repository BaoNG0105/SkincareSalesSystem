import { useState } from "react"; //Import the useState
import { FaEye, FaEyeSlash } from "react-icons/fa"; //Import the icons
import { Link, useNavigate } from "react-router-dom"; //Import the Link and useNavigate
import { postRegister } from "../../services/api.register"; // Import postRegister
import { toast } from "react-toastify"; // Import toast

const RegisterPage = () => {
  const navigate = useNavigate(); // Khởi tạo navigate
  const [formData, setFormData] = useState({
    email: "",
    passwordHash: "",
    userName: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
  });

  //Show Password
  const [showPassword, setShowPassword] = useState(false);

  //Errors
  const [errors, setErrors] = useState({});

  //Validate Password
  const validatePassword = (password) => {
    const strengthChecks = {
      length: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*]/.test(password),
    };
    return Object.values(strengthChecks).filter(Boolean).length;
  };

  //Get Password Strength
  const getPasswordStrength = () => {
    const strength = validatePassword(formData.passwordHash);
    if (strength === 0) return "";
    if (strength < 3) return "weak";
    if (strength < 5) return "medium";
    return "strong";
  };

  //Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    validateField(name, type === "checkbox" ? checked : value);
  };

  //Validate Field
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    //Full Name Validation
    switch (name) {
      case "fullName":
        if (!value || value.length < 2) {
          newErrors[name] = "Full name must be at least 2 characters";
        } else {
          delete newErrors[name];
        }
        break;

      //Phone Number Validation
      case "phoneNumber": {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      }

      //Email Validation
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      }

      //Password Validation
      case "passwordHash":
        if (validatePassword(value) < 5) {
          newErrors.passwordHash =
            "Password must contain at least 8 characters, including uppercase, lowercase, number and special character";
        } else {
          delete newErrors.passwordHash;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  //Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all required fields
    const requiredFields = [
      "email",
      "passwordHash",
      "userName",
      "gender",
      "dateOfBirth",
      "phoneNumber",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (Object.keys(errors).length === 0) {
      try {
        // Remove confirmPassword and restructure data
        const { passwordHash, ...otherData } = formData;

        // Ensure all values are strings
        const submitData = {
          ...otherData,
          passwordHash: passwordHash.toString(),
          profileImage: "",
        };

        // Log the data being sent to check its structure
        console.log("Sending data:", submitData);
        // Call postRegister from api.register
        const response = await postRegister(submitData); // Pass submitData to postRegister
        console.log("Registration successful:", response);

        // Show success toast notification
        toast.success("Registration successful!");

        // Chuyển hướng đến trang đăng nhập ngay lập tức
        navigate("/login");
      } catch (error) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
        setErrors((prev) => ({
          ...prev,
          submit: error.response?.data?.message || "Registration failed",
        }));
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2">
        <div
          className="w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3')",
          }}
        >
          <div className="w-full h-full bg-opacity-20 flex items-center justify-center"></div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {" "}
        {/*căn chỉnh form nằm giữa*/}
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-5 border border-pink-200">
          {" "}
          {/*tạo khung form*/}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-600">
              Create Your Account
            </h2>
            <p className="mt-2 text-gray-600">
              Welcome to SKINNE - World of Skincare
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* User Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name*
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your full name"
                />
                {errors.userName && (
                  <p className="mt-1 text-sm text-red-600">{errors.userName}</p>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-2 space-x-4 flex">
                {["Male", "Female", "Others"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwordHash"
                  value={formData.passwordHash}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
                {formData.passwordHash && (
                  <div className="mt-2">
                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          getPasswordStrength() === "weak"
                            ? "w-1/3 bg-red-500"
                            : getPasswordStrength() === "medium"
                            ? "w-2/3 bg-yellow-500"
                            : "w-full bg-green-500"
                        }`}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Password strength: {getPasswordStrength()}
                    </p>
                  </div>
                )}
                {errors.passwordHash && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.passwordHash}
                  </p>
                )}
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={
                Object.keys(errors).length > 0 ||
                !Object.values(formData).every((x) => x !== "")
              }
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="text-pink-600 hover:text-pink-500 font-medium"
              >
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
