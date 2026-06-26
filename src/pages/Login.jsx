import React from "react";
import LoginInfo from "../components/Logininfo";

const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-3/5 bg-black flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-emerald-400">
          Smart Save
        </h1>

        <p className="text-gray-300 mt-4 text-lg">
          Save With Purpose, Achieve With Confidence
        </p>
      </div>

      {/* Right Section */}
      <div className="w-2/5 bg-gray-50 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Sign in to continue
          </p>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-gray-100 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full p-4 rounded-xl bg-gray-100 outline-none pr-12"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      size={20}
                    />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex justify-between">
              <label>
                <input type="checkbox" />
                <span className="ml-2">
                  Remember me
                </span>
              </label>

              <button className="text-emerald-500">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-emerald-500 text-white py-4 rounded-xl hover:bg-emerald-600 transition"
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-500">
              Don't have an account?

              <Link
                to="/signup"
                className="text-emerald-500 ml-2 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInfo;