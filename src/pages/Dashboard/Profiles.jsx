import { useMemo } from "react";
import { FiUser, FiMail, FiSmile } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const profileItems = [
  { label: "Name", icon: FiUser, key: "displayName" },
  { label: "Email", icon: FiMail, key: "email" },
  { label: "Status", icon: FiSmile, value: "Active account" },
];

const Profiles = () => {
  const { user } = useAuth();
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
    <section className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your account details and view profile information.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {profileData.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon className="text-xl" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Quick profile actions</h2>
          <p className="mt-3 text-sm text-slate-500">
            Your profile page is ready. You can later add edit fields, change your profile picture, or configure account preferences here.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Edit profile
            </button>
            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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
