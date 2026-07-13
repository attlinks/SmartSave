import {
  FiBell,
  FiHome,
  FiPlus,
  FiSettings,
  FiTarget,
  FiUser,
} from "react-icons/fi";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../../components/ThemeToggle";

const SmartSaveLogo = ({ className = "h-10 w-40" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 320 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Smart Save"
      role="img"
    >
      <circle cx="40" cy="40" r="28" fill="#00D492" />

      <path
        d="M28 46L40 34L49 43L58 24"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M52 24H60V32"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      <text
        x="85"
        y="38"
        fontSize="18"
        fontFamily="Inter, Arial"
        fontWeight="500"
        fill="#64748B"
      >
        Smart
      </text>

      <text
        x="85"
        y="58"
        fontSize="30"
        fontFamily="Inter, Arial"
        fontWeight="800"
        fill="#0F172A"
      >
        Save
      </text>
    </svg>
  );
};

const navItems = [
  { to: "/dashboard", label: "Summary", icon: FiHome, end: true },
  { to: "/dashboard/goals", label: "Goals", icon: FiTarget },
  { to: "/dashboard/profiles", label: "Profiles", icon: FiUser },
  {
    to: "/dashboard/notifications",
    label: "Notifications",
    icon: FiBell,
  },
  { to: "/dashboard/settings", label: "Settings", icon: FiSettings },
];

const greetingHour = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0]?.replace(/\W+/g, " ") ||
    "You";

  const getHeaderGreeting = () => {
    const type = location.state?.greetingType;
    if (type === "hello") return `Hello ${displayName}`;
    if (type === "welcomeBack") return `Welcome back ${displayName}`;
    return `${greetingHour()}, ${displayName}`;
  };

  return (
    <div className="flex min-h-screen bg-(--surface-muted) text-(--text-primary)">
      <aside className="hidden w-56 flex-col border-r border-(--border) bg-(--surface) shadow-sm md:flex">
        <div className="px-5 py-5">
          <button
            onClick={() => navigate("/")}
            className="grid h-14 w-40 place-items-center rounded-2xl bg-[#ecfdf5] transition hover:bg-[#d9fbe8] dark:bg-[#143227] dark:hover:bg-[#1d3b2f]"
            aria-label="Go to Smart Save home"
          >
            <SmartSaveLogo className="h-10 w-36" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#00d492] text-slate-950 shadow-sm"
                      : "text-(--text-muted) hover:bg-(--surface-muted) hover:text-(--text-primary)"
                  }`
                }
              >
                <Icon className="text-base" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-(--border) px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-[#00d492] to-[#007a55] text-xs font-bold text-white shadow-sm">
              <FiUser />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-(--text-primary)">
                {displayName}
              </p>
              <p className="truncate text-xs text-(--text-muted)">
                {user?.email || "Signed in user"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-(--border) bg-(--surface) px-4 py-4 shadow-sm md:px-8">
          <div>
            <p className="text-xs text-(--text-muted)">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-lg font-bold leading-tight text-(--text-primary)">
              {getHeaderGreeting()}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => navigate("/dashboard/creategoal")}
              className="flex items-center gap-2 rounded-xl bg-[#00d492] px-4 py-2 text-sm font-semibold text-black shadow-sm shadow-orange-200 transition-colors hover:bg-[#007a55]"
            >
              <FiPlus />
              New
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-(--border) bg-(--surface) px-4 py-2 text-sm font-semibold text-(--text-primary) transition hover:bg-(--surface-muted)"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-(--surface-muted) p-4 md:p-8">
          <Outlet />
        </main>
        {/* Mobile bottom navigation */}
        <nav className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
          <div className="mx-auto flex max-w-lg justify-between rounded-2xl border border-(--border) bg-(--surface) px-2 py-2 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium transition-all ${
                      isActive ? "text-emerald-600" : "text-(--text-muted)"
                    }`
                  }
                >
                  <Icon className="text-lg" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
