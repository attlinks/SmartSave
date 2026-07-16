import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { footerNavLinks, navGroups } from "@/components/app-shared";
import { NavUser } from "@/components/nav-user";
import { useLocation } from "react-router-dom";

function isItemActive(pathname, item) {
  if (item.end) {
    return pathname === item.url;
  }
  return pathname === item.url || pathname.startsWith(`${item.url}/`);
}

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar
      className="static min-h-full *:data-[slot=sidebar-inner]:bg-background"
      collapsible="offcanvas"
      variant="sidebar"
    >
      <SidebarHeader className="relative h-14 justify-center px-2 py-0">
        <Link
          className="flex h-10 w-max items-center justify-center rounded-lg px-3 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted dark:hover:bg-muted/50"
          to="/dashboard"
        >
          <Logo className="[&_svg]:size-7 [&_span]:text-sm" />
          <span className="sr-only">Smart Save</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group, index) => (
          <SidebarGroup key={`sidebar-group-${index}`}>
            {group.label ? (
              <SidebarGroupLabel className="font-normal">
                {group.label}
              </SidebarGroupLabel>
            ) : null}
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isItemActive(pathname, item)}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0 p-0">
        <SidebarMenu className="border-t p-2">
          {footerNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-muted-foreground"
                isActive={isItemActive(pathname, item)}
                size="sm"
              >
                <Link to={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
