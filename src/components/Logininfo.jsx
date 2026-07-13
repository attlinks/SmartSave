import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const LoginInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard", { state: { greetingType: "welcomeBack" } });
    } catch (authError) {
      setError(authError.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-(--surface-muted) text-(--text-primary)">
      {/* Left Section */}
      <div className="w-3/5 bg-black flex flex-col justify-center items-center">
        <h1 data-aos="zoom-in" className="text-6xl font-bold text-emerald-400">
          Smart Save
        </h1>

        <p data-aos="fade-up" className="text-gray-300 mt-4 text-lg">
          Save With Purpose, Achieve With Confidence
        </p>
      </div>

      {/* Right Section */}
      <div className="w-2/5 bg-(--surface) flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-(--text-primary)">
            Welcome Back
          </h1>

          <p className="text-(--text-muted) mt-2 mb-8">Sign in to continue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 text-(--text-primary)">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-(--surface-muted) text-(--text-primary) outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-(--text-primary)">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-xl bg-(--surface-muted) text-(--text-primary) outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-(--text-muted) hover:text-(--text-primary) focus:outline-none"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-between">
              <label className="text-(--text-primary)">
                <input type="checkbox" />
                <span className="ml-2">Remember me</span>
              </label>

              <button className="text-emerald-500" type="button">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-white py-4 rounded-xl hover:bg-emerald-600 disabled:bg-gray-400"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center text-(--text-muted)">
              Don't have an account?
              <Link to="/signup" className="text-emerald-500 ml-2 font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginInfo;
