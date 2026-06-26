import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignupInfo = () =>
  
  {
  const [showPassword, setShowPassword] = useState(false);
const [form, setForm] = useState({ name: "", email: "", password: "" });
const navigate = useNavigate();
const [error, setError] = useState("");
function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

 async function handleSubmit(e) {
  e.preventDefault();

  if (!form.name || !form.email || !form.password) {
    setError("Please fill in all fields");
    return;
  }

  if (form.password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  alert("Account created successfully!");
  navigate("/dashboard");
}




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
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Start your Smart Save journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-4 rounded-xl bg-gray-100 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-4 rounded-xl bg-gray-100 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full p-4 rounded-xl bg-gray-100 outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-600 hover:text-gray-900"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M3.53 5.47a.75.75 0 011.06 0l16.88 16.88a.75.75 0 11-1.06 1.06L3.53 6.53a.75.75 0 010-1.06z" />
                      <path d="M17.74 14.43a3 3 0 00-3.66-3.66l-2.12-2.12a7.5 7.5 0 019.22 6.39c-.02 1.19-.32 2.34-.9 3.36l-1.66-1.67a5.5 5.5 0 00-1.88-2.3z" opacity=".4" />
                      <path d="M9.06 8.77l1.5 1.5a3 3 0 014.17 4.17l1.5 1.5a5.5 5.5 0 00-7.17-7.17z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M1.5 12a12.2 12.2 0 011.43-3.22 12.07 12.07 0 014.43-4.12A12.01 12.01 0 0112 4.5c3.42 0 6.6 1.44 8.93 3.78a12.07 12.07 0 014.43 4.12A12.2 12.2 0 0122.5 12c-1.64 4.23-5.9 7.5-10.5 7.5S3.14 16.23 1.5 12z" opacity=".4" />
                      <path d="M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.5a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* <div>
              <label className="block mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full p-4 rounded-xl bg-gray-100 outline-none"
              />
            </div> */}

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <button type="submit" className="w-full bg-emerald-500 text-white py-4 rounded-xl">
              Create Account
            </button>

            <p className="text-center text-gray-500">
              Already have an account?
              <Link
                to="/login"
                className="text-emerald-500 ml-2 font-medium"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupInfo;