import { useState } from "react";
import { FiBell, FiMail, FiPhoneCall } from "react-icons/fi";

const Notifications = () => {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    reminders: true,
  });

  const toggle = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <section className="min-h-screen bg-(--surface-muted) p-4 text-(--text-primary) md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-(--text-primary)">
            Notifications
          </h1>
          <p className="mt-2 text-sm text-(--text-muted)">
            Control which notifications you receive and how you receive them.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <FiMail className="text-xl" />
              </span>
              <div>
                <p className="text-sm font-semibold text-(--text-muted)">
                  Email alerts
                </p>
                <p className="mt-2 text-lg font-semibold text-(--text-primary)">
                  {settings.email ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                <FiBell className="text-xl" />
              </span>
              <div>
                <p className="text-sm font-semibold text-(--text-muted)">
                  Push notifications
                </p>
                <p className="mt-2 text-lg font-semibold text-(--text-primary)">
                  {settings.push ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <FiPhoneCall className="text-xl" />
              </span>
              <div>
                <p className="text-sm font-semibold text-(--text-muted)">
                  Reminder alerts
                </p>
                <p className="mt-2 text-lg font-semibold text-(--text-primary)">
                  {settings.reminders ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-sm">
          <h2 className="text-xl font-bold text-(--text-primary)">
            Notification preferences
          </h2>
          <div className="mt-5 space-y-4">
            {[
              { key: "email", label: "Email notifications" },
              { key: "push", label: "Push notifications" },
              { key: "reminders", label: "Savings reminders" },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => toggle(item.key)}
                className="flex w-full items-center justify-between rounded-2xl border border-(--border) bg-(--surface-muted) px-5 py-4 text-left transition hover:bg-(--surface)"
              >
                <div>
                  <p className="font-semibold text-(--text-primary)">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-(--text-muted)">
                    {settings[item.key] ? "On" : "Off"}
                  </p>
                </div>
                <span className="rounded-full bg-(--surface) px-4 py-2 text-sm font-semibold text-(--text-primary) shadow-sm">
                  {settings[item.key] ? "On" : "Off"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
