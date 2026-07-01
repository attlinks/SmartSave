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
    <section className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="mt-2 text-sm text-slate-500">
            Control which notifications you receive and how you receive them.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                <FiMail className="text-xl" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-500">Email alerts</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {settings.email ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                <FiBell className="text-xl" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-500">Push notifications</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {settings.push ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <FiPhoneCall className="text-xl" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-500">Reminder alerts</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {settings.reminders ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Notification preferences</h2>
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
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-slate-300"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {settings[item.key] ? "On" : "Off"}
                  </p>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
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
