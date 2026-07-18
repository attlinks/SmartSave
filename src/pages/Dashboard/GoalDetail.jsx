import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LockIcon, MinusIcon, PlusIcon, UnlockIcon } from "lucide-react";
import {
  getGoalById,
  computeGoalProgress,
} from "@/utils/goalHelpers";
import { updateStoredGoal } from "@/utils/goalsStorage";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

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
  };

  const handleAmount = async (type) => {
    if (locked) return;

    if (type === "Add Money") {
      const targetAmount = Number(goal.targetAmount) || 0;
      const currentSaved = Number(goal.savedAmount) || 0;

      if (currentSaved >= targetAmount) {
        window.alert(
          "You have already reached your target goal. You can no longer add money.",
        );
        return;
      }
    }

    const userInput = window.prompt(
      `Enter amount to ${type.toLowerCase()} for ${goal.title}`,
    );
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
        window.alert(
          "You have already reached your target goal. You can no longer add money.",
        );
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
    <div className="mx-auto w-full max-w-4xl">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mb-3 -ml-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/dashboard/goals")}
      >
        Back to goals
      </Button>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <h1 className="text-xl font-semibold tracking-tight text-card-foreground">
            {goal.title}
          </h1>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Target", value: goal.target },
              { label: "Saved", value: goal.saved, accent: true },
              { label: "Progress", value: `${goal.percent}%` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-muted/40 p-3"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p
                  className={`mt-1.5 text-sm font-semibold ${
                    item.accent
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-foreground"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Note</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              {goal.note || "No note added."}
            </p>
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Controls</p>
                <h2 className="mt-0.5 text-sm font-semibold text-card-foreground">
                  Manage this goal
                </h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={toggleLocked}
              >
                {locked ? (
                  <LockIcon data-icon="inline-start" />
                ) : (
                  <UnlockIcon data-icon="inline-start" />
                )}
                {locked ? "Locked" : "Unlocked"}
              </Button>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Button
                type="button"
                size="sm"
                disabled={locked}
                className="justify-between bg-emerald-500 text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 dark:bg-emerald-400 dark:hover:bg-emerald-300"
                onClick={() => handleAmount("Add Money")}
              >
                Add money
                <PlusIcon data-icon="inline-end" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                disabled={locked}
                className="justify-between"
                onClick={() => handleAmount("Remove Money")}
              >
                Remove money
                <MinusIcon data-icon="inline-end" />
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Status</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-card-foreground">
                {goal.status}
              </p>
              <span className="size-2.5 rounded-full bg-emerald-500" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default GoalDetail;
