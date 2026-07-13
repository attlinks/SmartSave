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
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { deleteStoredGoal, getStoredGoals } from "../../utils/goalsStorage";

const stats = [
  {
    title: "Total Balance",
    value: "₦0.00",
    note: "0% from last month",
    icon: FiCreditCard,
    bg: "bg-[#d9fbe8] dark:bg-[#22473b]",
    color: "text-emerald-700",
  },
  {
    title: "Active Goals",
    value: "0",
    note: "No goals yet",
    icon: FiTarget,
    bg: "bg-[#ecfdf5] dark:bg-[#1f3a33]",
    color: "text-emerald-600",
  },
  {
    title: "Total Saved",
    value: "₦0.00",
    note: "0% from last month",
    icon: FiTrendingUp,
    bg: "bg-[#f1f5f9] dark:bg-[#233042]",
    color: "text-slate-900",
  },
];

const actions = [
  {
    label: "Add Money",
    icon: FiPlusCircle,
    bg: "bg-[#ecfdf5] dark:bg-[#1f3a33]",
    to: "/dashboard/goals",
  },
  {
    label: "Create Goal",
    icon: FiTarget,
    bg: "bg-[#eff6ff] dark:bg-[#1d334a]",
    to: "/dashboard/creategoal",
  },
  { label: "Transfer", icon: FiSend, bg: "bg-[#f5f3ff] dark:bg-[#2f2550]" },
  { label: "Withdraw", icon: FiDownload, bg: "bg-[#fff7ed] dark:bg-[#4d2c1e]" },
];

const transactions = [];

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
      setGoals(getStoredGoals());
    };

    window.addEventListener("smartsave-goals-updated", refreshGoals);
    return () => {
      window.removeEventListener("smartsave-goals-updated", refreshGoals);
    };
  }, []);

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
    <div className="min-h-screen bg-(--surface-muted) p-4 text-(--text-primary) md:p-6">
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            {summaryStats.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-(--text-primary)">
                          {item.title}
                        </p>
                        {item.title === "Total Balance" && (
                          <button
                            type="button"
                            className="text-slate-400"
                            onClick={() => setShowBalance((prev) => !prev)}
                            aria-label={
                              showBalance ? "Hide balance" : "Show balance"
                            }
                          >
                            {showBalance ? <FiEyeOff /> : <FiEye />}
                          </button>
                        )}
                      </div>
                      <h2
                        className={`mt-3 font-bold text-(--text-primary) ${
                          item.title === "Total Saved"
                            ? "text-sm"
                            : "text-[15px]"
                        }`}
                      >
                        {item.value}
                      </h2>
                    </div>

                    <div
                      className={`grid h-14 w-14 place-items-center rounded-2xl ${item.bg}`}
                    >
                      <Icon className={`text-3xl ${item.color}`} />
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-medium text-emerald-600">
                    ↑ {item.note}
                  </p>
                </article>
              );
            })}
          </div>

          <article className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Goals</h2>
              <Link
                to="/dashboard/goals"
                className="text-sm font-bold text-emerald-700"
              >
                View All Goals
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {goals.length === 0 ? (
                <p className="py-6 text-sm font-medium text-slate-500">
                  No goals yet.
                </p>
              ) : (
                goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="grid gap-4 py-4 md:grid-cols-[1fr_150px_24px]"
                  >
                    <div className="flex gap-4">
                      <img
                        src={getGoalImage(goal.name)}
                        alt={`${goal.name || "Goal"} icon`}
                        className="h-14 w-14 rounded-lg object-cover"
                        onError={(event) => {
                          event.currentTarget.src = "/images/goal1.jpg";
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-(--text-primary)">
                          {goal.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Target: {goal.target}
                        </p>
                        <div className="mt-3 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700">
                          <div
                            className="h-full rounded-full bg-emerald-600"
                            style={{ width: `${goal.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="font-bold text-(--text-primary)">
                        {goal.saved}
                      </p>
                      <p className="mt-1 text-sm font-bold text-emerald-600">
                        {goal.percent}%
                      </p>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        className="text-slate-500"
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

                      {openGoalMenuId === goal.id && (
                        <div className="absolute right-0 top-7 z-20 min-w-36 rounded-lg border border-(--border) bg-(--surface) p-1 shadow-lg">
                          <button
                            type="button"
                            className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                            onClick={() => handleDeleteGoal(goal)}
                          >
                            Delete Goal
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>
        </section>

        <aside className="space-y-5">
          <article className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm">
            <h2 className="mb-5 text-lg font-bold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {actions.map((action) => {
                const Icon = action.icon;
                const actionClassName = `rounded-lg ${action.bg} p-4 text-center transition hover:scale-[1.02]`;

                if (action.to) {
                  return (
                    <Link
                      key={action.label}
                      to={action.to}
                      className={actionClassName}
                    >
                      <Icon className="mx-auto text-3xl text-emerald-700" />
                      <span className="mt-3 block text-sm font-bold">
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
                          ? "Transfer is coming soon — check your goals to move funds between them."
                          : "Withdrawal is coming soon — keep an eye on your balance and savings progress.",
                      )
                    }
                  >
                    <Icon className="mx-auto text-3xl text-emerald-700" />
                    <span className="mt-3 block text-sm font-bold">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </article>

          {actionMessage && (
            <article className="rounded-lg border border-[#c7f0df] bg-[#ecfdf5] p-4 text-sm text-slate-900 dark:border-[#2f5d4a] dark:bg-[#143227] dark:text-slate-100">
              {actionMessage}
            </article>
          )}

          <article className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Transactions</h2>
              <button className="text-sm font-bold text-emerald-700">
                View All
              </button>
            </div>

            <div className="space-y-5">
              {transactions.length === 0 ? (
                <p className="text-sm font-medium text-slate-500">
                  No transactions yet.
                </p>
              ) : (
                transactions.map((item) => (
                  <div key={item.title + item.date} className="flex gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#fff7ed] text-orange-600 dark:bg-[#4d2c1e] dark:text-orange-300">
                      <FiDownload />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.date}</p>
                    </div>
                    <p
                      className={`font-bold ${
                        item.green ? "text-emerald-700" : "text-red-600"
                      }`}
                    >
                      {item.amount}
                    </p>
                  </div>
                ))
              )}
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
};

export default Summary;
