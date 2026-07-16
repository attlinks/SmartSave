import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredGoals } from "@/utils/goalsStorage";
import { Button } from "@/components/ui/button";

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

  const filters = [
    { id: "all", label: `All (${goals.length})` },
    { id: "active", label: `Active (${activeGoals.length})` },
    { id: "completed", label: `Completed (${completedGoals.length})` },
  ];

  return (
    <section className="w-full">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Goals
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Track and manage your savings targets
          </p>
        </div>

        <Button
          asChild
          size="sm"
          className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300"
        >
          <Link to="/dashboard/creategoal">
            <PlusIcon data-icon="inline-start" />
            New goal
          </Link>
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 ${
              filter === item.id
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visibleGoals.length === 0 ? (
          <div className="col-span-full flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border bg-card">
            <p className="text-sm text-muted-foreground">No goals found.</p>
          </div>
        ) : (
          visibleGoals.map((goal) => (
            <article
              key={goal.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-2.5">
                <h2 className="truncate text-sm font-semibold text-foreground">
                  {goal.title}
                </h2>
                <span
                  className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                    goal.status === "Completed"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {goal.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-3">
                <p className="text-xs text-muted-foreground">
                  Target: {goal.target}
                </p>
                {goal.note ? (
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {goal.note}
                  </p>
                ) : null}

                <div className="mt-3">
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-xs font-medium text-foreground">
                    {goal.progress}%
                  </p>
                </div>

                <div className="mt-3 flex items-end justify-between gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Saved</p>
                    <p className="mt-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                      {goal.saved}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Deadline</p>
                    <p className="mt-0.5 font-medium text-foreground">
                      {goal.formattedDeadline}
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full"
                >
                  <Link to={`/dashboard/goal/${goal.id}`}>View details</Link>
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Goals;
