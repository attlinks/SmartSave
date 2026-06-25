import { Link } from "react-router-dom";

const LoginInfo = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-3/5 bg-black flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-emerald-400">Smart Save</h1>

        <p className="text-gray-300 mt-4 text-lg">
          Save With Purpose, Achieve With Confidence
        </p>
      </div>

      {/* Right Section */}
      <div className="w-2/5 bg-gray-50 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-slate-900">Welcome Back</h1>

          <p className="text-gray-500 mt-2 mb-8">Sign in to continue</p>

          <div className="space-y-5">
            <div>
              <label className="block mb-2">Email Address</label>

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full p-4 rounded-xl bg-gray-100 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-xl bg-gray-100 outline-none"
              />
            </div>

            <div className="flex justify-between">
              <label>
                <input type="checkbox" />
                <span className="ml-2">Remember me</span>
              </label>

              <button className="text-emerald-500">Forgot password?</button>
            </div>
            <Link to="/dashboardlayout">
              <button className="w-full bg-emerald-500 text-white py-4 rounded-xl">
                Sign In
              </button>
            </Link>
            <p className="text-center text-gray-500">
              Don't have an account?
              <Link to="/signup" className="text-emerald-500 ml-2 font-medium">
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
