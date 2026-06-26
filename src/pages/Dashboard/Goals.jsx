import { FiPlus } from "react-icons/fi";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredGoals } from "../../utils/goalsStorage";

const Goals = () => {
  const [filter, setFilter] = useState("all");
  const goals = useMemo(() => getStoredGoals(), []);
  const completedGoals = goals.filter((goal) => goal.status === "Completed");
  const activeGoals = goals.filter((goal) => goal.status === "Active");
  const visibleGoals =
    filter === "completed"
      ? completedGoals
      : filter === "active"
        ? activeGoals
        : goals;

  return (
    <section className="min-h-screen bg-[#f5f6f8] px-1 py-1 text-black">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-normal">My Goals</h1>
          <p className="mt-3 text-xl text-slate-400">
            Track and manage your savings goals
          </p>
        </div>

        <Link
          to="/dashboardlayout/creategoal"
          className="flex items-center gap-2 rounded-xl bg-[#00d492] px-3 py-3 text-xl font-medium text-white transition hover:bg-[#007a55]"
        >
          <FiPlus />
          Create New Goal
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-2 text-xl font-semibold">
        <button
          type="button"
          data-filter="all"
          onClick={() => setFilter("all")}
          className={`transition hover:text-[#007a55] ${
            filter === "all" ? "text-[#007a55]" : ""
          }`}
        >
          All Goals ({goals.length})
        </button>
        <span>|</span>
        <button
          type="button"
          data-filter="completed"
          onClick={() => setFilter("completed")}
          className={`transition hover:text-[#007a55] ${
            filter === "completed" ? "text-[#007a55]" : ""
          }`}
        >
          Completed ({completedGoals.length})
        </button>
        <span>|</span>
        <button
          type="button"
          data-filter="active"
          onClick={() => setFilter("active")}
          className={`transition hover:text-[#007a55] ${
            filter === "active" ? "text-[#007a55]" : ""
          }`}
        >
          Active ({activeGoals.length})
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {visibleGoals.length === 0 ? (
          <div className="flex min-h-64 w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <p className="text-lg font-medium text-slate-400">
              No goals found.
            </p>
          </div>
        ) : (
          visibleGoals.map((goal) => (
            <article
              key={goal.id}
              data-status={goal.status.toLowerCase()}
              className="flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
            >
              <div className="relative h-40 overflow-hidden bg-black">
                <img
                  src={goal.image}
                  alt={goal.title}
                  className="h-full w-full object-cover"
                />
                <span
                  className={`absolute right-3 top-3 rounded-md px-3 py-1.5 text-sm font-medium text-white ${
                    goal.status === "Completed"
                      ? "bg-green-500"
                      : "bg-orange-600"
                  }`}
                >
                  {goal.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-xl font-bold">{goal.title}</h2>
                <p className="mt-1 text-base text-slate-400">
                  Target: {goal.target}
                </p>
                {goal.note && (
                  <p className="mt-2 line-clamp-1 text-sm font-medium text-slate-500">
                    {goal.note}
                  </p>
                )}

                <div className="mt-4">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-black"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-sm font-medium">
                    {goal.progress}%
                  </p>
                </div>

                <div className="mt-4 flex items-end justify-between gap-6">
                  <div>
                    <p className="text-base text-slate-400">Saved</p>
                    <p className="mt-1 text-base font-medium text-orange-600">
                      {goal.saved}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-base text-slate-400">Deadline</p>
                    <p className="mt-1 text-base font-medium">
                      {goal.formattedDeadline}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Goals;
