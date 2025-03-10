import  { useState } from "react"; //Import the useState
import { FaEye, FaEyeSlash } from "react-icons/fa"; //Import the icons
import { Link } from "react-router-dom"; //Import the Link
import { FcGoogle } from "react-icons/fc"; //Import the Google icon
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"; //Import the signInWithPopup and GoogleAuthProvider
import { auth } from "../../config/firebase"; //Import the auth
import api from "../../config/axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    privacyPolicy: false,
    confirmPassword: ""
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

  //Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
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
      case "email":
        { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break; }

      //Password Validation
      case "password":
        if (validatePassword(value) < 5) {
          newErrors.password = "Password must contain at least 8 characters, including uppercase, lowercase, number and special character";
        } else {
          delete newErrors.password;
        }
        break;

      //Confirm Password Validation
      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      //Privacy Policy Validation
      case "privacyPolicy":
        if (!value) {
          newErrors.privacyPolicy = "You must accept the privacy policy";
        } else {
          delete newErrors.privacyPolicy;
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
    const requiredFields = ['email', 'password', 'userName'];
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (Object.keys(errors).length === 0) {
      try {
        // Remove confirmPassword and privacyPolicy and restructure data
        const {password, ...otherData } = formData;
        
        // Create submitData with correct field names
        const submitData = {
          ...otherData,
          passwordHash: password, // Rename password to passwordHash
          profileImage: "" // Add default empty profileImage
        };
        
        // Log the data being sent to check its structure
        console.log("Sending data:", submitData);
        
        const response = await api.post('/auth/register', submitData);
        console.log("Registration successful:", response.data);
      } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        setErrors(prev => ({
          ...prev,
          submit: error.response?.data?.message || "Registration failed"
        }));
      }
    }
  };

  //Get Password Strength
  const getPasswordStrength = () => {
    const strength = validatePassword(formData.password);
    if (strength === 0) return "";
    if (strength < 3) return "weak";
    if (strength < 5) return "medium";
    return "strong";
  };

  //Handle Register with Google
  const handleRegisterGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Registration successful:", result.user);
        // TODO: Add your post-registration logic here
      })
      .catch((error) => {
        console.error("Registration failed:", error.message);
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2">
        <div className="w-full bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3')" }}>
          <div className="w-full h-full bg-opacity-20 flex items-center justify-center">
          </div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8"> {/*căn chỉnh form nằm giữa*/}
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-5 border border-pink-200"> {/*tạo khung form*/}
          <div className="text-center"> 
            <h2 className="text-3xl font-bold text-pink-600">Create Your Account</h2>
            <p className="mt-2 text-gray-600">Welcome to SKINNE - World of Skincare</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            {/* User Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name*</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your full name"
                />
                {errors.userName && <p className="mt-1 text-sm text-red-600">{errors.userName}</p>}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
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
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <div className="mt-2 space-x-4 flex">
                {["Male", "Female" , "Others"].map((option) => (
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
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your address"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
                {formData.password && (
                  <div className="mt-2">
                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getPasswordStrength() === "weak" ? "w-1/3 bg-red-500" : getPasswordStrength() === "medium" ? "w-2/3 bg-yellow-500" : "w-full bg-green-500"}`}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Password strength: {getPasswordStrength()}
                    </p>
                  </div>
                )}
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-pink-600 hover:text-pink-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.privacyPolicy && <p className="mt-1 text-sm text-red-600">{errors.privacyPolicy}</p>}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || !Object.values(formData).every(x => x !== "")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Create Account
            </button>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Google Register Button */}
            <button
              type="button"
              onClick={handleRegisterGoogle}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Login with Google
            </button>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-pink-600 hover:text-pink-500 font-medium">
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