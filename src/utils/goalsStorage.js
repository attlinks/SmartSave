const GOALS_STORAGE_KEY = "smartsave_goals";

const categoryStyles = {
  laptop: {
    label: "Laptop",
    image: "/images/goal1.jpg",
  },
  travel: {
    label: "Travel",
    image: "/images/goal2.jpg",
  },
  home: {
    label: "Home",
    image: "/images/goal3.jpg",
  },
  vacation: {
    label: "Vacation",
    image: "/images/goal4.jpg",
  },
};

const formatCurrency = (amount) => {
  const value = Number(amount) || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};

const formatDate = (date) => {
  if (!date) return "No deadline";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

export const getStoredGoals = () => {
  try {
    const storedGoals = JSON.parse(localStorage.getItem(GOALS_STORAGE_KEY));
    if (!Array.isArray(storedGoals)) return [];

    return storedGoals.map((goal) => {
      const goalCategory = goal.category || "laptop";

      return {
        ...goal,
        target: formatCurrency(goal.targetAmount),
        saved: formatCurrency(goal.savedAmount),
        image: categoryStyles[goalCategory]?.image || categoryStyles.laptop.image,
      };
    });
  } catch {
    return [];
  }
};

export const saveGoal = ({ goalName, targetAmount, deadline, category, note }) => {
  const title = String(goalName || "").trim();
  const amount = Number(targetAmount);
  const goalCategory = String(category || "laptop");
  const newGoal = {
    id: crypto.randomUUID(),
    title,
    name: title,
    targetAmount: amount,
    target: formatCurrency(amount),
    savedAmount: 0,
    saved: formatCurrency(0),
    deadline: String(deadline || ""),
    formattedDeadline: formatDate(deadline),
    category: goalCategory,
    categoryLabel: categoryStyles[goalCategory]?.label || "Goal",
    note: String(note || "").trim(),
    progress: 0,
    percent: 0,
    status: "Active",
    image: categoryStyles[goalCategory]?.image || categoryStyles.laptop.image,
    createdAt: new Date().toISOString(),
  };

  const goals = [newGoal, ...getStoredGoals()];
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  return newGoal;
};
