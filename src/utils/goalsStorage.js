import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const GOALS_STORAGE_KEY = "smartsave_goals";
const GOALS_STORAGE_ACTIVE_USER_KEY = "smartsave_goals_active_user";
const GOALS_STORAGE_GUEST_ID = "guest";

const getActiveGoalsStorageUser = () =>
  localStorage.getItem(GOALS_STORAGE_ACTIVE_USER_KEY) || GOALS_STORAGE_GUEST_ID;

const getGoalsStorageKey = (userId) =>
  `${GOALS_STORAGE_KEY}_${userId || getActiveGoalsStorageUser()}`;

const getStoredRawGoals = (userId) => {
  const scopedKey = getGoalsStorageKey(userId);
  const scopedRaw = localStorage.getItem(scopedKey);

  if (scopedRaw !== null) {
    return { storageKey: scopedKey, raw: scopedRaw };
  }

  const legacyRaw = localStorage.getItem(GOALS_STORAGE_KEY);
  if (legacyRaw !== null) {
    // One-time migration path from legacy shared key into scoped key.
    localStorage.setItem(scopedKey, legacyRaw);
    localStorage.removeItem(GOALS_STORAGE_KEY);
    return { storageKey: scopedKey, raw: legacyRaw };
  }

  return { storageKey: scopedKey, raw: null };
};

const setStoredGoals = (goals, userId) => {
  const scopedKey = getGoalsStorageKey(userId);
  localStorage.setItem(scopedKey, JSON.stringify(goals));
};

const emitGoalsUpdated = () => {
  window.dispatchEvent(new Event("smartsave-goals-updated"));
};

export const setGoalsStorageUser = (userId) => {
  localStorage.setItem(
    GOALS_STORAGE_ACTIVE_USER_KEY,
    userId || GOALS_STORAGE_GUEST_ID,
  );
  emitGoalsUpdated();
};

export const clearStoredGoals = (userId) => {
  setStoredGoals([], userId);
  emitGoalsUpdated();
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
  const id =
    goal.id || crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
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

const deleteGoalFromFirestore = async (goalId, userId) => {
  if (!userId) return;
  const goalRef = doc(getGoalsCollection(userId), goalId);
  await deleteDoc(goalRef);
};

export const getStoredGoals = (userId) => {
  try {
    const { storageKey, raw } = getStoredRawGoals(userId);
    const storedGoals = JSON.parse(raw);
    if (!Array.isArray(storedGoals)) return [];

    const normalizedGoals = storedGoals.map((goal) => normalizeGoal(goal));
    localStorage.setItem(storageKey, JSON.stringify(normalizedGoals));
    return normalizedGoals;
  } catch {
    return [];
  }
};

export const saveGoal = (
  { goalName, targetAmount, deadline, note },
  userId,
) => {
  setGoalsStorageUser(userId);

  const title = String(goalName || "").trim();
  const amount = Number(targetAmount);
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
    note: String(note || "").trim(),
    progress: 0,
    percent: 0,
    status: "Active",
    createdAt: new Date().toISOString(),
  };

  const goals = [newGoal, ...getStoredGoals(userId)];
  setStoredGoals(goals, userId);
  emitGoalsUpdated();

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
  return snapshot.docs.map((docSnap) =>
    normalizeGoal({ id: docSnap.id, ...docSnap.data() }),
  );
};

export const syncGoalsFromFirestore = async (userId) => {
  if (!userId) return [];

  setGoalsStorageUser(userId);

  const localGoals = getStoredGoals(userId);
  const dbGoals = await getUserGoals(userId);

  if (dbGoals.length === 0 && localGoals.length > 0) {
    await Promise.all(
      localGoals.map((goal) => saveGoalToFirestore(goal, userId)),
    );
    return localGoals;
  }

  const dbGoalIds = new Set(dbGoals.map((goal) => goal.id));
  const localOnlyGoals = localGoals.filter((goal) => !dbGoalIds.has(goal.id));
  const mergedGoals = [...dbGoals, ...localOnlyGoals];

  if (localOnlyGoals.length > 0) {
    await Promise.all(
      localOnlyGoals.map((goal) => saveGoalToFirestore(goal, userId)),
    );
  }

  setStoredGoals(mergedGoals, userId);
  emitGoalsUpdated();
  return mergedGoals;
};

export const updateStoredGoal = async (updatedGoal, userId) => {
  setGoalsStorageUser(userId);
  const goals = getStoredGoals(userId);
  const revisedGoals = goals.map((goal) =>
    goal.id === updatedGoal.id ? { ...goal, ...updatedGoal } : goal,
  );
  setStoredGoals(revisedGoals, userId);
  emitGoalsUpdated();

  if (userId) {
    try {
      await updateGoalInFirestore(updatedGoal, userId);
    } catch (error) {
      console.error("Unable to update goal in Firestore:", error);
    }
  }

  return revisedGoals;
};

export const deleteStoredGoal = async (goalId, userId) => {
  setGoalsStorageUser(userId);
  const goals = getStoredGoals(userId);
  const revisedGoals = goals.filter((goal) => goal.id !== goalId);
  setStoredGoals(revisedGoals, userId);
  emitGoalsUpdated();

  if (userId) {
    try {
      await deleteGoalFromFirestore(goalId, userId);
    } catch (error) {
      console.error("Unable to delete goal in Firestore:", error);
    }
  }

  return revisedGoals;
};
