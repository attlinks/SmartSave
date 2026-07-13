import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  setGoalsStorageUser,
  syncGoalsFromFirestore,
} from "../utils/goalsStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setGoalsStorageUser(currentUser?.uid);

      if (currentUser) {
        try {
          await syncGoalsFromFirestore(currentUser.uid);
        } catch (error) {
          console.error("Failed to sync goals from Firestore:", error);
        }
      }

      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    return userCredential;
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setGoalsStorageUser();
  };

  const updateUserProfile = async (data) => {
    if (!auth.currentUser) throw new Error("No authenticated user");
    await updateProfile(auth.currentUser, data);
    setUser({ ...auth.currentUser });
  };

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, updateUserProfile }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
