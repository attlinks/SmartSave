import {
  FiCreditCard,
  FiDownload,
  FiEye,
  FiEyeOff,
  FiMoreVertical,
  FiPlusCircle,
  FiSend,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { deleteStoredGoal, getStoredGoals } from "@/utils/goalsStorage";

const stats = [
  {
    title: "Total Balance",
    value: "₦0.00",
    note: "0% from last month",
    icon: FiCreditCard,
    bg: "bg-emerald-500/10",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Active Goals",
    value: "0",
    note: "No goals yet",
    icon: FiTarget,
    bg: "bg-emerald-500/10",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Total Saved",
    value: "₦0.00",
    note: "0% from last month",
    icon: FiTrendingUp,
    bg: "bg-muted",
    color: "text-foreground",
  },
];

const actions = [
  {
    label: "Add Money",
    icon: FiPlusCircle,
    bg: "bg-emerald-500/10",
    to: "/dashboard/goals",
  },
  {
    label: "Create Goal",
    icon: FiTarget,
    bg: "bg-emerald-500/10",
    to: "/dashboard/creategoal",
  },
  { label: "Transfer", icon: FiSend, bg: "bg-muted" },
  { label: "Withdraw", icon: FiDownload, bg: "bg-muted" },
];

const goalImageRules = [
  {
    image: "/images/goal1.jpg",
    keywords: ["house", "home", "property"],
  },
  {
    image: "/images/goal2.jpg",
    keywords: ["car", "vehicle", "auto"],
  },
  {
    image: "/images/goal3.jpg",
    keywords: ["laptop"],
  },
  {
    image: "/images/goal4.jpg",
    keywords: ["vacation", "holiday", "travel", "trip"],
  },
];

const getGoalImage = (goalName) => {
  const normalizedName = String(goalName || "").toLowerCase();
  const matchedRule = goalImageRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedName.includes(keyword)),
  );

  return matchedRule?.image || "/images/goal1.jpg";
};

const Summary = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [goals, setGoals] = useState(() => getStoredGoals());
  const [openGoalMenuId, setOpenGoalMenuId] = useState(null);

  useEffect(() => {
    const refreshGoals = () => {
      setGoals(getStoredGoals(user?.uid));
    };

    refreshGoals();
    window.addEventListener("smartsave-goals-updated", refreshGoals);
    return () => {
      window.removeEventListener("smartsave-goals-updated", refreshGoals);
    };
  }, [user?.uid]);

  const handleDeleteGoal = async (goal) => {
    const shouldDelete = window.confirm(
      `Delete "${goal.name || goal.title || "this goal"}"? This cannot be undone.`,
    );
    if (!shouldDelete) return;

    const revisedGoals = await deleteStoredGoal(goal.id, user?.uid);
    setGoals(revisedGoals);
    setOpenGoalMenuId(null);
  };

  const activeGoals = goals.filter((goal) => goal.status === "Active");
  const totalSaved = goals.reduce(
    (total, goal) => total + (Number(goal.savedAmount) || 0),
    0,
  );
  const summaryStats = stats.map((item) => {
    if (item.title === "Total Balance") {
      return { ...item, value: showBalance ? "NGN 0.00" : "****" };
    }

    if (item.title === "Active Goals") {
      return {
        ...item,
        value: String(activeGoals.length),
        note: activeGoals.length === 0 ? "No goals yet" : "Keep saving",
      };
    }

    if (item.title === "Total Saved") {
      return {
        ...item,
        value: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(totalSaved),
      };
    }

    return item;
  });

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
      <section className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {summaryStats.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-xl border border-border bg-card p-3.5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium text-muted-foreground">
                        {item.title}
                      </p>
                      {item.title === "Total Balance" ? (
                        <button
                          type="button"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          onClick={() => setShowBalance((prev) => !prev)}
                          aria-label={
                            showBalance ? "Hide balance" : "Show balance"
                          }
                        >
                          {showBalance ? <FiEyeOff /> : <FiEye />}
                        </button>
                      ) : null}
                    </div>
                    <h2 className="mt-1.5 truncate text-sm font-semibold text-card-foreground">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`grid size-9 shrink-0 place-items-center rounded-lg ${item.bg}`}
                  >
                    <Icon className={`text-base ${item.color}`} />
                  </div>
                </div>

                <p className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {item.note}
                </p>
              </article>
            );
          })}
        </div>

        <article className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-card-foreground">
              Your goals
            </h2>
            <Link
              to="/dashboard/goals"
              className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-border">
            {goals.length === 0 ? (
              <p className="py-5 text-sm text-muted-foreground">
                No goals yet.
              </p>
            ) : (
              goals.map((goal) => (
                <div
                  key={goal.id}
                  className="grid gap-3 py-3 sm:grid-cols-[1fr_120px_24px] sm:items-center"
                >
                  <div className="flex gap-3">
                    <img
                      src={getGoalImage(goal.name)}
                      alt=""
                      className="size-10 rounded-lg object-cover"
                      onError={(event) => {
                        event.currentTarget.src = "/images/goal1.jpg";
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-card-foreground">
                        {goal.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Target: {goal.target}
                      </p>
                      <div className="mt-2 h-1 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${goal.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium text-card-foreground">
                      {goal.saved}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {goal.percent}%
                    </p>
                  </div>

                  <div className="relative justify-self-end">
                    <button
                      type="button"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`More options for ${goal.name || goal.title || "goal"}`}
                      aria-expanded={openGoalMenuId === goal.id}
                      onClick={() =>
                        setOpenGoalMenuId((prev) =>
                          prev === goal.id ? null : goal.id,
                        )
                      }
                    >
                      <FiMoreVertical />
                    </button>

                    {openGoalMenuId === goal.id ? (
                      <div className="absolute right-0 top-7 z-20 min-w-32 rounded-lg border border-border bg-popover p-1 shadow-lg">
                        <button
                          type="button"
                          className="w-full rounded-md px-2.5 py-1.5 text-left text-xs font-medium text-destructive transition hover:bg-destructive/10"
                          onClick={() => handleDeleteGoal(goal)}
                        >
                          Delete goal
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      <aside className="flex flex-col gap-4">
        <article className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-card-foreground">
            Quick actions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {actions.map((action) => {
              const Icon = action.icon;
              const actionClassName = `rounded-lg ${action.bg} p-3 text-center transition-colors hover:bg-muted`;

              if (action.to) {
                return (
                  <Link
                    key={action.label}
                    to={action.to}
                    className={actionClassName}
                  >
                    <Icon className="mx-auto text-lg text-emerald-600 dark:text-emerald-400" />
                    <span className="mt-2 block text-xs font-medium text-foreground">
                      {action.label}
                    </span>
                  </Link>
                );
              }

              return (
                <button
                  key={action.label}
                  className={actionClassName}
                  type="button"
                  onClick={() =>
                    setActionMessage(
                      action.label === "Transfer"
                        ? "Transfer is coming soon."
                        : "Withdrawal is coming soon.",
                    )
                  }
                >
                  <Icon className="mx-auto text-lg text-emerald-600 dark:text-emerald-400" />
                  <span className="mt-2 block text-xs font-medium text-foreground">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </article>

        {actionMessage ? (
          <article className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-foreground">
            {actionMessage}
          </article>
        ) : null}

        <article className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-card-foreground">
              Recent activity
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="grid size-8 place-items-center rounded-full bg-muted text-muted-foreground">
                <FiDownload />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium">Goal created</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  No recent updates yet
                </p>
              </div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                +0.00
              </p>
            </div>
          </div>
        </article>
      </aside>
    </div>
  );
};

export default Summary;
