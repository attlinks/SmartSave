import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredGoals } from "../../utils/goalsStorage";

const Goals = () => {
  const [filter, setFilter] = useState("all");
  const [goals, setGoals] = useState(() => getStoredGoals());

  useEffect(() => {
    const refreshGoals = () => {
      setGoals(getStoredGoals());
    };

    window.addEventListener("smartsave-goals-updated", refreshGoals);
    return () => {
      window.removeEventListener("smartsave-goals-updated", refreshGoals);
    };
  }, []);

  const completedGoals = goals.filter((goal) => goal.status === "Completed");
  const activeGoals = goals.filter((goal) => goal.status === "Active");
  const visibleGoals =
    filter === "completed"
      ? completedGoals
      : filter === "active"
        ? activeGoals
        : goals;

  return (
    <section className="min-h-screen bg-(--surface-muted) px-1 py-1 text-(--text-primary)">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-normal">My Goals</h1>
          <p className="mt-3 text-xl text-slate-400">
            Track and manage your savings goals
          </p>
        </div>

        <Link
          to="/dashboard/creategoal"
          className="flex items-center gap-2 rounded-xl bg-[#00d492] px-3 py-3 text-xl font-medium text-white transition hover:bg-[#007a55]"
        >
          <FiPlus />
          Create New Goal
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-2 text-xl font-semibold text-(--text-primary)">
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
          <div className="flex min-h-64 w-full items-center justify-center rounded-2xl border border-dashed border-(--border) bg-(--surface)">
            <p className="text-lg font-medium text-(--text-muted)">
              No goals found.
            </p>
          </div>
        ) : (
          visibleGoals.map((goal) => (
            <article
              key={goal.id}
              data-status={goal.status.toLowerCase()}
              className="flex w-full flex-col overflow-hidden rounded-xl border border-(--border) bg-(--surface) md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
            >
              <div className="flex items-center justify-between bg-slate-950 p-4 text-white">
                <h2 className="text-lg font-bold">{goal.title}</h2>
                <span
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                    goal.status === "Completed"
                      ? "bg-[#00d492]"
                      : "bg-orange-600"
                  }`}
                >
                  {goal.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-xl font-bold">{goal.title}</h2>
                <p className="mt-1 text-base text-(--text-muted)">
                  Target: {goal.target}
                </p>
                {goal.note && (
                  <p className="mt-2 line-clamp-1 text-sm font-medium text-(--text-muted)">
                    {goal.note}
                  </p>
                )}

                <div className="mt-4">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-emerald-600"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-sm font-medium">
                    {goal.progress}%
                  </p>
                </div>

                <div className="mt-4 flex items-end justify-between gap-6">
                  <div>
                    <p className="text-base text-(--text-muted)">Saved</p>
                    <p className="mt-1 text-base font-medium text-[#009966]">
                      {goal.saved}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-base text-(--text-muted)">Deadline</p>
                    <p className="mt-1 text-base font-medium">
                      {goal.formattedDeadline}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/dashboard/goal/${goal.id}`}
                    className="inline-flex rounded-xl border border-[#bfe9d7] bg-[#ecfdf5] px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-[#d9fbe8] dark:border-[#2f5d4a] dark:bg-[#143227] dark:text-emerald-300 dark:hover:bg-[#1d3b2f]"
                  >
                    View details
                  </Link>
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
