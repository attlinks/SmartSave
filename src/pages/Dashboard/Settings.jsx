import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiShield, FiMoon, FiUser, FiZap } from "react-icons/fi";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
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
      secureRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(() => setHighlightSecure(false), 3000);
      return () => clearTimeout(t);
    }
  }, [location]);

  return (
    <section className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="mt-2 text-sm text-slate-500">
            Update your preferences, security options, and app behavior here.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { key: "darkMode", label: "Dark mode", icon: FiMoon },
            { key: "autoSave", label: "Auto save goals", icon: FiZap },
            { key: "secureLogin", label: "Secure login", icon: FiShield },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.key}
                ref={item.key === 'secureLogin' ? secureRef : undefined}
                className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${item.key === 'secureLogin' && highlightSecure ? 'ring-2 ring-emerald-300' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="text-xl" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {settings[item.key] ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Preferences</h2>
              <p className="mt-2 text-sm text-slate-500">
                Quickly toggle your most-used options.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {[
              {
                key: "darkMode",
                label: "Use dark theme",
                description: "Switch between light and dark mode.",
              },
              {
                key: "autoSave",
                label: "Save progress automatically",
                description: "Keep goal updates saved without manual steps.",
              },
              {
                key: "secureLogin",
                label: "Require enhanced login",
                description: "Add extra protection to your account.",
              },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => toggle(item.key)}
                className="flex w-full flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:border-slate-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                    {settings[item.key] ? "On" : "Off"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
