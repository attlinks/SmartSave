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

  const cards = [
    {
      key: "email",
      label: "Email alerts",
      icon: FiMail,
      tone: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    },
    {
      key: "push",
      label: "Push notifications",
      icon: FiBell,
      tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    },
    {
      key: "reminders",
      label: "Reminder alerts",
      icon: FiPhoneCall,
      tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-4">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Notifications
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Choose what you hear about and how you hear it
        </p>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.key}
              className="rounded-xl border border-border bg-card p-3.5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid size-9 place-items-center rounded-lg ${item.tone}`}
                >
                  <Icon className="text-base" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-card-foreground">
                    {settings[item.key] ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
        <h2 className="text-sm font-semibold text-card-foreground">
          Preferences
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          {[
            { key: "email", label: "Email notifications" },
            { key: "push", label: "Push notifications" },
            { key: "reminders", label: "Savings reminders" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => toggle(item.key)}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-left transition-colors hover:bg-muted/60"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {settings[item.key] ? "On" : "Off"}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  settings[item.key]
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {settings[item.key] ? "On" : "Off"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notifications;
