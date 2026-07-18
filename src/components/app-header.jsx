import { Link, useLocation, useNavigate } from "react-router-dom";
import { BellIcon, PlusIcon, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { navLinks } from "@/components/app-shared";
import ThemeToggle from "@/components/ThemeToggle";

function resolveActivePage(pathname) {
  const exact = navLinks.find((item) => item.end && pathname === item.url);
  if (exact) return exact;

  return (
    navLinks.find(
      (item) =>
        !item.end &&
        (pathname === item.url || pathname.startsWith(`${item.url}/`)),
    ) ?? navLinks[0]
  );
}

export function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeItem = resolveActivePage(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 bg-background px-4 md:px-6",
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Separator
          className="mr-2 data-[orientation=vertical]:h-4 md:hidden"
          orientation="vertical"
        />
        <AppBreadcrumbs page={activeItem} />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          aria-label="Search"
          size="icon"
          variant="ghost"
          className="active:scale-[0.97] motion-safe:transition-transform motion-safe:duration-150"
        >
          <SearchIcon />
        </Button>
        <Button
          aria-label="Notifications"
          size="icon"
          variant="ghost"
          className="active:scale-[0.97] motion-safe:transition-transform motion-safe:duration-150"
          asChild
        >
          <Link to="/dashboard/notifications">
            <BellIcon />
          </Link>
        </Button>
        <Button
          size="sm"
          className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.97] motion-safe:transition-[transform,background-color] motion-safe:duration-150 dark:bg-emerald-400 dark:hover:bg-emerald-300"
          onClick={() => navigate("/dashboard/creategoal")}
        >
          <PlusIcon data-icon="inline-start" />
          New goal
        </Button>
      </div>
    </header>
  );
}
