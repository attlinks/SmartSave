import { useEffect, useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const leftSectionImages = ["/images/focus3.png", "/images/focus4.jpg"];

const SignupInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
  }

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setActiveImageIndex((currentIndex) =>
        currentIndex === leftSectionImages.length - 1 ? 0 : currentIndex + 1,
      );
    }, 3000);

    return () => clearInterval(imageTimer);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div
        className="relative flex w-3/5 flex-col items-center justify-center overflow-hidden bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${leftSectionImages[activeImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <h1 className="relative text-6xl font-bold text-emerald-400">
          {/* Smart Save */}
        </h1>

        <p className="relative mt-4 text-lg text-gray-100">
          {/* Save With Purpose, Achieve With Confidence */}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex w-2/5 items-center justify-center bg-white px-12">
        <div className="w-full max-w-lg">
          <h1 className="text-4xl font-bold text-slate-900">Create Account</h1>

          <p className="mb-6 mt-2 text-gray-500">
            Start your Smart Save journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-slate-700">Full Name</label>

              <div className="relative">
                <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl bg-gray-100 py-4 pl-14 pr-4 text-lg outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-slate-700">Email Address</label>

              <div className="relative">
                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full rounded-xl bg-gray-100 py-4 pl-14 pr-4 text-lg outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-slate-700">Password</label>

              <div className="relative">
                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-xl bg-gray-100 py-4 pl-14 pr-14 text-lg outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-5 flex items-center justify-center text-xl text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
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

            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 py-4 text-white transition hover:bg-emerald-600"
            >
              Create Account
            </button>

            <p className="text-center text-gray-500">
              Already have an account?
              <Link to="/login" className="text-emerald-500 ml-2 font-medium">
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
