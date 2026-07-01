import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiLock, FiMinus, FiPlus, FiUnlock } from "react-icons/fi";
import { getGoalById, computeGoalProgress, formatCurrency } from "../../utils/goalHelpers";
import { updateStoredGoal } from "../../utils/goalsStorage";
import { sendGoalTransactionEmail } from "../../utils/notifications";
import { useAuth } from "../../context/AuthContext";

const GoalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [goal, setGoal] = useState(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const found = getGoalById(id);
    if (!found) {
      navigate("/dashboard/goals");
      return;
    }
    setGoal(computeGoalProgress(found));
    setLocked(found.locked ?? false);
  }, [id, navigate]);

  const updateGoal = async (values) => {
    const updated = computeGoalProgress({ ...goal, ...values });
    await updateStoredGoal(updated, user?.uid);
    setGoal(updated);

    if (values.savedAmount !== undefined) {
      const rawDelta = values.savedAmount - Number(goal.savedAmount || 0);
      const action = rawDelta > 0 ? "Added Money" : "Removed Money";
      const amount = formatCurrency(Math.abs(rawDelta));

      try {
        await sendGoalTransactionEmail({
          recipientEmail: user?.email,
          goalTitle: goal.title,
          action,
          amount,
          savedAmount: updated.saved,
        });
      } catch (emailError) {
        console.warn("Email notification failed:", emailError);
      }
    }
  };

  const handleAmount = async (type) => {
    if (locked) return;

    if (type === "Add Money") {
      const targetAmount = Number(goal.targetAmount) || 0;
      const currentSaved = Number(goal.savedAmount) || 0;

      if (currentSaved >= targetAmount) {
        window.alert("You have already reached your target goal. You can no longer add money.");
        return;
      }
    }

    const userInput = window.prompt(`Enter amount to ${type.toLowerCase()} for ${goal.title}`);
    if (userInput === null) return;

    const amount = Number(userInput.replace(/,/g, ""));
    if (!amount || amount <= 0) {
      window.alert("Please enter a valid positive amount.");
      return;
    }

    const nextSaved =
      type === "Add Money"
        ? Number(goal.savedAmount) + amount
        : Number(goal.savedAmount) - amount;

    if (nextSaved < 0) {
      window.alert("Saved amount cannot go below 0.");
      return;
    }

    if (type === "Add Money") {
      const targetAmount = Number(goal.targetAmount) || 0;
      if (nextSaved > targetAmount) {
        window.alert("You have already reached your target goal. You can no longer add money.");
        return;
      }
    }

    await updateGoal({ savedAmount: nextSaved });
  };

  const toggleLocked = async () => {
    const nextLocked = !locked;
    setLocked(nextLocked);
    const updated = { ...goal, locked: nextLocked };
    await updateStoredGoal(updated, user?.uid);
    setGoal(updated);
  };

  if (!goal) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-950">
      <div className="mx-auto max-w-4xl space-y-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard/goals")}
          className="text-sm font-semibold text-emerald-700"
        >
          ← Back to Goals
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                  {goal.categoryLabel}
                </p>
                <h1 className="mt-3 text-3xl font-bold text-slate-950">
                  {goal.title}
                </h1>
              </div>
              <img
                src={goal.image}
                alt={goal.title}
                className="h-28 w-28 rounded-3xl object-cover"
              />
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-100 p-5">
                <p className="text-sm text-slate-500">Target</p>
                <p className="mt-3 text-xl font-bold text-slate-950">{goal.target}</p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-5">
                <p className="text-sm text-slate-500">Saved</p>
                <p className="mt-3 text-xl font-bold text-emerald-700">{goal.saved}</p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-5">
                <p className="text-sm text-slate-500">Progress</p>
                <p className="mt-3 text-xl font-bold text-slate-950">{goal.percent}%</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Goal note</p>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                {goal.note || "No note added."}
              </p>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Goal controls</p>
                  <h2 className="mt-2 text-lg font-bold text-slate-950">Manage this goal</h2>
                </div>
                <button
                  type="button"
                  onClick={toggleLocked}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  {locked ? <FiLock /> : <FiUnlock />}
                  {locked ? "Locked" : "Unlocked"}
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <button
                  type="button"
                  onClick={() => handleAmount("Add Money")}
                  disabled={locked}
                  className="rounded-3xl bg-emerald-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span>Add Money</span>
                    <FiPlus />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleAmount("Remove Money")}
                  disabled={locked}
                  className="rounded-3xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span>Remove Money</span>
                    <FiMinus />
                  </div>
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Status</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-lg font-bold text-slate-950">{goal.status}</p>
                <div className="h-3.5 w-3.5 rounded-full bg-emerald-600" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail;
