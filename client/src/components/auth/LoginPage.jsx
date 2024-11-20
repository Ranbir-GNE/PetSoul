import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../dashboard/LoadingButton";
// import authContext from "../Context/authContext";
import image from "../../assets/pet1.jpg";
import { Input } from "../ui/input";

const LoginRegister = () => {
  const [isLoading, setIsLoading] = useState();
  // const authData = useContext(authContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("key");
    if (token) {
      //   navigate("/home");
    }
  }, []);

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
      if (!response) {
        toast.error("Login failed. Please try again.");
        return;
      }
      const token = response.data.token;
      localStorage.setItem("key", token);
      // authData.setAuth(true);
      toast.success("Login Success");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
        }
      );
      if (!response) {
        toast.error("Registration failed. Please try again.");
        return;
      }
      toast.success("Registration Success");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl p-4 bg-black border-2 border-slate-900 rounded-lg shadow-lg flex flex-col lg:flex-row mx-2 items-center">
        {/* Left Side - Form Section */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex justify-around mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setErrorMessage("");
              }}
              className={`${
                isLogin
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-500"
              } font-bold text-lg pb-2`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrorMessage("");
              }}
              className={`${
                !isLogin
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-500"
              } font-bold text-lg pb-2`}
            >
              Register
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-white">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={(e) => handleInputChange(e, "login")}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-white">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) => handleInputChange(e, "login")}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold disabled:brightness-50 hover:bg-green-600 transition duration-300"
              >
                Login
              </LoadingButton>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-white">
                  Username
                </label>
                <Input
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={(e) => handleInputChange(e, "register")}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-white">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={(e) => handleInputChange(e, "register")}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-white">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={(e) => handleInputChange(e, "register")}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-white">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={(e) => handleInputChange(e, "register")}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Register
              </LoadingButton>
            </form>
          )}
        </div>

        {/* Right Side - Image Section */}
        <div className="hidden lg:flex w-1/2 p-6 bg-black items-center justify-center">
          <img
            src={image}
            alt="diary"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
