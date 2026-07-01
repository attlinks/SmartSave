import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

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

const normalizeGoal = (goal) => {
  const goalCategory = goal.category || "laptop";
  const id = goal.id || crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
  const title = goal.title || goal.name || String(goal.goalName || "").trim();
  const targetAmount = Number(goal.targetAmount) || 0;
  const savedAmount = Number(goal.savedAmount) || 0;
  const deadline = String(goal.deadline || "");
  const percent = Math.min(
    Math.round((savedAmount / (targetAmount || 1)) * 100),
    100,
  );

  return {
    ...goal,
    id,
    title,
    name: title,
    targetAmount,
    savedAmount,
    target: formatCurrency(targetAmount),
    saved: formatCurrency(savedAmount),
    deadline,
    formattedDeadline: formatDate(deadline),
    category: goalCategory,
    categoryLabel:
      goal.categoryLabel || categoryStyles[goalCategory]?.label || "Goal",
    image: categoryStyles[goalCategory]?.image || categoryStyles.laptop.image,
    progress: goal.progress ?? percent,
    percent: goal.percent ?? percent,
    status:
      goal.status || (savedAmount >= targetAmount ? "Completed" : "Active"),
    createdAt: goal.createdAt || new Date().toISOString(),
  };
};

const getGoalsCollection = (userId) => collection(db, "users", userId, "goals");

const saveGoalToFirestore = async (goal, userId) => {
  if (!userId) return;
  const goalRef = doc(getGoalsCollection(userId), goal.id);
  await setDoc(goalRef, goal, { merge: true });
};

const updateGoalInFirestore = async (goal, userId) => {
  if (!userId) return;
  const goalRef = doc(getGoalsCollection(userId), goal.id);
  await setDoc(goalRef, goal, { merge: true });
};

export const getStoredGoals = () => {
  try {
    const storedGoals = JSON.parse(localStorage.getItem(GOALS_STORAGE_KEY));
    if (!Array.isArray(storedGoals)) return [];

    const normalizedGoals = storedGoals.map((goal) => normalizeGoal(goal));
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(normalizedGoals));
    return normalizedGoals;
  } catch {
    return [];
  }
};

export const saveGoal = (
  { goalName, targetAmount, deadline, category, note },
  userId,
) => {
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

  if (userId) {
    void saveGoalToFirestore(newGoal, userId).catch((error) => {
      console.error("Unable to save goal to Firestore:", error);
    });
  }

  return newGoal;
};

export const getUserGoals = async (userId) => {
  if (!userId) return [];
  const snapshot = await getDocs(getGoalsCollection(userId));
  return snapshot.docs.map((docSnap) => normalizeGoal({ id: docSnap.id, ...docSnap.data() }));
};

export const syncGoalsFromFirestore = async (userId) => {
  if (!userId) return [];

  const localGoals = getStoredGoals();
  const dbGoals = await getUserGoals(userId);

  if (dbGoals.length === 0 && localGoals.length > 0) {
    await Promise.all(localGoals.map((goal) => saveGoalToFirestore(goal, userId)));
    return localGoals;
  }

  const dbGoalIds = new Set(dbGoals.map((goal) => goal.id));
  const localOnlyGoals = localGoals.filter((goal) => !dbGoalIds.has(goal.id));
  const mergedGoals = [...dbGoals, ...localOnlyGoals];

  if (localOnlyGoals.length > 0) {
    await Promise.all(localOnlyGoals.map((goal) => saveGoalToFirestore(goal, userId)));
  }

  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(mergedGoals));
  return mergedGoals;
};

export const updateStoredGoal = async (updatedGoal, userId) => {
  const goals = getStoredGoals();
  const revisedGoals = goals.map((goal) =>
    goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal,
  );
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(revisedGoals));

  if (userId) {
    try {
      await updateGoalInFirestore(updatedGoal, userId);
    } catch (error) {
      console.error("Unable to update goal in Firestore:", error);
    }
  }

  return revisedGoals;
};
