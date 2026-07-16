import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiMoon, FiShield, FiZap } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    autoSave: true,
    secureLogin: true,
  });

  const toggle = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const location = useLocation();
  const secureRef = useRef(null);
  const [highlightSecure, setHighlightSecure] = useState(false);

  useEffect(() => {
    if (location?.state?.section === "security") {
      setHighlightSecure(true);
      secureRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      const t = setTimeout(() => setHighlightSecure(false), 3000);
      return () => clearTimeout(t);
    }
  }, [location]);

  const preferenceRows = [
    {
      key: "darkMode",
      label: "Dark theme",
      description: "Switch between light and dark mode.",
      enabled: theme === "dark",
      onToggle: toggleTheme,
    },
    {
      key: "autoSave",
      label: "Auto-save goals",
      description: "Keep goal updates saved without extra steps.",
      enabled: settings.autoSave,
      onToggle: () => toggle("autoSave"),
    },
    {
      key: "secureLogin",
      label: "Enhanced login",
      description: "Add extra protection to your account.",
      enabled: settings.secureLogin,
      onToggle: () => toggle("secureLogin"),
    },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-4">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Preferences, security, and app behavior
        </p>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        {[
          { key: "darkMode", label: "Dark mode", icon: FiMoon, enabled: theme === "dark" },
          { key: "autoSave", label: "Auto save", icon: FiZap, enabled: settings.autoSave },
          {
            key: "secureLogin",
            label: "Secure login",
            icon: FiShield,
            enabled: settings.secureLogin,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.key}
              ref={item.key === "secureLogin" ? secureRef : undefined}
              className={`rounded-xl border border-border bg-card p-3.5 shadow-sm ${
                item.key === "secureLogin" && highlightSecure
                  ? "ring-2 ring-emerald-500/40"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-muted text-foreground">
                  <Icon className="text-base" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-card-foreground">
                    {item.enabled ? "Enabled" : "Disabled"}
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
        <p className="mt-0.5 text-xs text-muted-foreground">
          Toggle your most-used options
        </p>

        <div className="mt-3 flex flex-col gap-2">
          {preferenceRows.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onToggle}
              className="flex w-full items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-left transition-colors hover:bg-muted/60"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  item.enabled
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {item.enabled ? "On" : "Off"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Settings;
