import { useMemo, useState } from "react";
import { FiUser, FiMail, FiSmile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const profileItems = [
  { label: "Name", icon: FiUser, key: "displayName" },
  { label: "Email", icon: FiMail, key: "email" },
  { label: "Status", icon: FiSmile, value: "Active account" },
];

const Profiles = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const profileData = useMemo(
    () =>
      profileItems.map((item) => ({
        ...item,
        value:
          item.value ||
          user?.[item.key] ||
          (item.key === "displayName" ? "New user" : "Not available"),
      })),
    [user],
  );

  return (
    <section className="min-h-screen bg-(--surface-muted) p-4 text-(--text-primary) md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-(--text-primary)">Profile</h1>
          <p className="mt-2 text-sm text-(--text-muted)">
            Manage your account details and view profile information.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {profileData.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <Icon className="text-xl" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-(--text-primary)">
                      {item.value}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {editing && (
          <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
            <h2 className="text-lg font-bold text-(--text-primary)">
              Edit Profile
            </h2>
            <div className="mt-4">
              <label className="block text-sm text-(--text-muted)">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-(--border) bg-(--surface-muted) px-3 py-2 text-(--text-primary)"
              />
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await updateUserProfile({ displayName: name });
                      setEditing(false);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="rounded-2xl bg-emerald-600 px-4 py-2 text-white"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-2xl border border-(--border) bg-(--surface) px-4 py-2 text-(--text-primary) hover:bg-(--surface-muted)"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
          <h2 className="text-xl font-bold text-(--text-primary)">
            Quick profile actions
          </h2>
          <p className="mt-3 text-sm text-(--text-muted)">
            Your profile page is ready. You can later add edit fields, change
            your profile picture, or configure account preferences here.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              onClick={() => {
                setName(user?.displayName || "");
                setEditing(true);
              }}
            >
              Edit profile
            </button>
            <button
              type="button"
              className="rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm font-semibold text-(--text-primary) transition hover:bg-(--surface-muted)"
              onClick={() =>
                navigate("/dashboard/settings", {
                  state: { section: "security" },
                })
              }
            >
              View account security
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profiles;
