import { FiArrowLeft, FiCalendar, FiDollarSign } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { saveGoal } from "../../utils/goalsStorage";

const SmartSaveLogo = ({ className = "h-10 w-40" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 320 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Smart Save"
      role="img"
    >
      <circle cx="40" cy="40" r="28" fill="#00D492" />

      <path
        d="M28 46L40 34L49 43L58 24"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M52 24H60V32"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      <text
        x="85"
        y="38"
        fontSize="18"
        fontFamily="Inter, Arial"
        fontWeight="500"
        fill="#64748B"
      >
        Smart
      </text>

      <text
        x="85"
        y="58"
        fontSize="30"
        fontFamily="Inter, Arial"
        fontWeight="800"
        fill="#0F172A"
      >
        Save
      </text>
    </svg>
  );
};

const Creategoal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    saveGoal(
      {
        goalName: formData.get("goalName"),
        targetAmount: formData.get("targetAmount"),
        deadline: formData.get("deadline"),
        note: formData.get("note"),
      },
      user?.uid,
    );

    navigate("/dashboard/goals");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 md:p-6">
      <div className="mx-auto max-w-3xl">
        <Link to="/dashboard">
          <FiArrowLeft />
          Back to dashboard
        </Link>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-7">
            <div className="mb-4 inline-grid h-14 w-40 place-items-center rounded-2xl bg-[#ecfdf5] dark:bg-[#143227]">
              <SmartSaveLogo className="h-10 w-36" />
            </div>
            <h1 className="text-2xl font-black text-slate-950">Create Goal</h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Add your goal details, target amount, and deadline.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="goalName"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Goal name
              </label>
              <input
                id="goalName"
                name="goalName"
                type="text"
                placeholder="Example: Buy a laptop"
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="targetAmount"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Target amount
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="targetAmount"
                    name="targetAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Deadline
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="note"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Note
              </label>
              <textarea
                id="note"
                name="note"
                rows="4"
                placeholder="Write a short note about this goal"
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <Link
                to="/dashboard"
                className="rounded-lg border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-emerald-100 transition hover:bg-emerald-700"
              >
                Create Goal
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Creategoal;
