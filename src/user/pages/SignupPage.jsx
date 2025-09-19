import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ChefHat } from "lucide-react";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showError, setShowError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        toast.error("Please fill in all fields");
      } else if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        await signup(name, email, password);
      }
    } catch (e) {
      setShowError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Branding */}
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-10 flex flex-col justify-center items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Bitezzo</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Culinary Excellence</h2>
          <p className="text-blue-100 text-center leading-relaxed text-sm">
            Join us and start your journey with the finest dishes crafted by our expert chefs.
          </p>
          <img
            src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
            alt="Food"
            className="rounded-lg shadow-lg mt-6 w-52 md:w-64"
          />
        </div>

        {/* Right Signup Form */}
        <div className="md:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
              <p className="text-gray-500 text-sm">
                Fill in your details to register and get started
              </p>
            </div>

            <form onSubmit={handleFormData} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-11 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-11 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-11 pr-11 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-11 pr-11 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {showError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm text-center">{showError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold text-base shadow-md transition disabled:opacity-60"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
