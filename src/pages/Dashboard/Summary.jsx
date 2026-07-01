import {
  FiCreditCard,
  FiDownload,
  FiEyeOff,
  FiMoreVertical,
  FiPlusCircle,
  FiSend,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getStoredGoals } from "../../utils/goalsStorage";

const stats = [
  {
    title: "Total Balance",
    value: "₦0.00",
    note: "0% from last month",
    icon: FiCreditCard,
    bg: "bg-emerald-100",
    color: "text-emerald-700",
  },
  {
    title: "Active Goals",
    value: "0",
    note: "No goals yet",
    icon: FiTarget,
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
  {
    title: "Total Saved",
    value: "₦0.00",
    note: "0% from last month",
    icon: FiTrendingUp,
    bg: "bg-slate-100",
    color: "text-slate-900",
  },
];

const actions = [
  {
    label: "Add Money",
    icon: FiPlusCircle,
    bg: "bg-emerald-50",
    to: "/dashboard/goals",
  },
  {
    label: "Create Goal",
    icon: FiTarget,
    bg: "bg-blue-50",
    to: "/dashboard/creategoal",
  },
  { label: "Transfer", icon: FiSend, bg: "bg-violet-50" },
  { label: "Withdraw", icon: FiDownload, bg: "bg-orange-50" },
];

const transactions = [];

const Summary = () => {
  const goals = useMemo(() => getStoredGoals(), []);
  const activeGoals = goals.filter((goal) => goal.status === "Active");
  const totalSaved = goals.reduce(
    (total, goal) => total + (Number(goal.savedAmount) || 0),
    0,
  );
  const summaryStats = stats.map((item) => {
    if (item.title === "Total Balance") {
      return { ...item, value: "NGN 0.00" };
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
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950 md:p-6">
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            {summaryStats.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-700">
                          {item.title}
                        </p>
                        {item.title === "Total Balance" && (
                          <FiEyeOff className="text-slate-400" />
                        )}
                      </div>
                      <h2 className="mt-3 text-2xl font-bold text-slate-950">
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

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Goals</h2>
              <Link
                to="/dashboard/goals"
                className="text-sm font-bold text-emerald-700"
              >
                View All Goals
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {goals.length === 0 ? (
                <p className="py-6 text-sm font-medium text-slate-500">
                  No goals yet.
                </p>
              ) : (
                goals.map((goal) => (
                  <div
                    key={goal.name}
                    className="grid gap-4 py-4 md:grid-cols-[1fr_150px_24px]"
                  >
                    <div className="flex gap-4">
                      <img
                        src={goal.image}
                        alt={goal.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-slate-950">
                          {goal.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Target: {goal.target}
                        </p>
                        <div className="mt-3 h-1.5 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-600"
                            style={{ width: `${goal.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="font-bold text-slate-950">{goal.saved}</p>
                      <p className="mt-1 text-sm font-bold text-emerald-600">
                        {goal.percent}%
                      </p>
                    </div>

                    <button className="text-slate-500">
                      <FiMoreVertical />
                    </button>
                  </div>
                ))
              )}
            </div>
          </article>
        </section>

        <aside className="space-y-5">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-orange-50 text-orange-600">
                        <FiDownload />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.date}
                      </p>
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
