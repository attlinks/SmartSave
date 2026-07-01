import { getStoredGoals } from "./goalsStorage";

const GOALS_STORAGE_KEY = "smartsave_goals";

export const updateStoredGoal = (updatedGoal) => {
  const goals = getStoredGoals();
  const revisedGoals = goals.map((goal) =>
    goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal,
  );
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(revisedGoals));
  return revisedGoals;
};

export const getGoalById = (goalId) =>
  getStoredGoals().find((goal) => goal.id === goalId);

export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};

export const computeGoalProgress = (goal) => {
  const savedAmount = Number(goal.savedAmount) || 0;
  const targetAmount = Number(goal.targetAmount) || 1;
  const percent = Math.min(Math.round((savedAmount / targetAmount) * 100), 100);

  return {
    ...goal,
    savedAmount,
    saved: formatCurrency(savedAmount),
    percent,
    progress: percent,
    status: savedAmount >= targetAmount ? "Completed" : "Active",
  };
};
