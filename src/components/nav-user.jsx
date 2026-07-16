import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BellIcon,
  ChevronsUpDownIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0]?.replace(/\W+/g, " ") ||
    "You";
  const email = user?.email || "Signed in";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <SidebarMenu className="border-t p-2">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="text-muted-foreground">
              <Avatar className="size-5">
                <AvatarImage alt={displayName} src={user?.photoURL || undefined} />
                <AvatarFallback>{initials || "S"}</AvatarFallback>
              </Avatar>
              <span className="truncate text-sm font-medium">
                {displayName.split(" ")[0]}
              </span>
              <ChevronsUpDownIcon className="ml-auto size-3!" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-48"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <div className="px-2 py-1.5">
              <p className="truncate text-sm font-medium">{displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profiles">
                  <UserIcon />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/notifications">
                  <BellIcon />
                  Notifications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">
                  <SettingsIcon />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
