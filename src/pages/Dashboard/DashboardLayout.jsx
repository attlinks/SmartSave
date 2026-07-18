import { Outlet, useLocation } from "react-router-dom";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/context/AuthContext";

const greetingHour = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
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
    <AppShell>
      <div className="mb-1">
        <p className="text-[11px] text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="text-base font-semibold tracking-tight text-foreground">
          {getHeaderGreeting()}
        </h1>
      </div>
      <Outlet />
    </AppShell>
  );
};

export default DashboardLayout;
