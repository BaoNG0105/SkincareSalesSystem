import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import { postLogin } from "../../services/api.login";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Giải mã token
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { postRegister } from "../../services/api.register";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isRememberMe, setIsRememberMe] = useState(false);

  const [errors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeRememberMe = (e) => {
    setIsRememberMe(e.target.checked);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setIsRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.keys(errors).length === 0 &&
      Object.values(formData).every((x) => x !== "")
    ) {
      console.log("Submitting login with:", formData);
      try {
        const data = await postLogin(formData);
        console.log("Login response:", data);

        if (typeof data === "string") {
          // Kiểm tra nếu data là string
          const token = data;
          localStorage.setItem("token", token);
          if (isRememberMe) {
            localStorage.setItem("email", formData.email);
          } else {
            localStorage.removeItem("email");
          }
          toast.success("Login successful!");
          const decodedToken = jwtDecode(token);
          const role = decodedToken.role;
          if (role === "Customer") {
            navigate("/");
          } else if (role === "Staff" || role === "Manager") {
            navigate("/dashboard");
          }
        } else if (data && data.token) {
          // Kiểm tra nếu data có token
          const token = data.token;
          localStorage.setItem("token", token);
          if (isRememberMe) {
            localStorage.setItem("email", formData.email);
          } else {
            localStorage.removeItem("email");
          }
          toast.success("Login successful!");
          const decodedToken = jwtDecode(token);
          const role = decodedToken.role;
          if (role === "Customer") {
            navigate("/");
          } else if (role === "Staff" || role === "Manager") {
            navigate("/dashboard");
          }
        } else {
          // Kiểm tra nếu data không có token
          console.error("Login failed: No token received");
          toast.error("Login failed: Invalid credentials.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed: " + error.message);
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user info:", decoded);

      // Thử đăng nhập trước với email từ Google
      const loginData = {
        email: decoded.email,
        password: decoded.sub, // Sử dụng sub như password
      };

      try {
        // Thử đăng nhập trước
        const loginResponse = await postLogin(loginData);
        if (loginResponse) {
          // Nếu đăng nhập thành công
          localStorage.setItem('token', credentialResponse.credential);
          const role = decoded.role || "Customer";
          if (role === "Customer") {
            navigate("/");
          } else if (role === "Staff" || role === "Manager") {
            navigate("/dashboard");
          }
          toast.success("Login with Google successful!");
          return; // Thoát khỏi hàm nếu đăng nhập thành công
        }
      } catch (loginError) {
        console.log("Login attempt failed:", loginError);
        if (loginError.response) {
          console.log("Error response:", loginError.response.data);
        }
        // Không hiển thị toast error ở đây vì chúng ta sẽ thử register
      }

      // Nếu đăng nhập thất bại, tiến hành đăng ký
      const googleUserData = {
        email: decoded.email,
        userName: decoded.name,
        passwordHash: decoded.sub,
        gender: decoded.gender,
        dateOfBirth:
          decoded.birthdate || new Date().toISOString().split("T")[0],
        address: decoded.address,
        phoneNumber: decoded.phoneNumber,
        profileImage: decoded.picture || "",
      };

      // Thử đăng ký tài khoản mới
      const registerResponse = await postRegister(googleUserData);

      if (registerResponse) {
        localStorage.setItem("token", credentialResponse.credential);
        const role = decoded.role || "Customer";
        if (role === "Customer") {
          navigate("/");
        } else if (role === "Staff" || role === "Manager") {
          navigate("/dashboard");
        }
        toast.success("Account created and logged in successfully!");
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error(
        "Authentication failed: " + (error.response?.data || error.message)
      );
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

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {" "}
        {/*căn chỉnh form nằm giữa*/}
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-5 border border-pink-200">
          {" "}
          {/*tạo khung form*/}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-600">
              Sign in to your account
            </h2>
            <p className="mt-2 text-gray-600">
              Welcome to SKINNE - World of Skincare
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
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

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your password"
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isRememberMe}
                  onChange={handleChangeRememberMe}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Sign in
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

            {/* Google Login Button */}
            <div className="mt-4">
              <GoogleOAuthProvider clientId="320408738074-vfl63gh4tcus7pp6f8i0s870kqhlkgmu.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.log("Login Failed");
                    toast.error("Google login failed");
                  }}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                />
              </GoogleOAuthProvider>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-gray-600">Do not have an account? </span>
              <Link
                to="/register"
                className="text-pink-600 hover:text-pink-500 font-medium"
              >
                Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
