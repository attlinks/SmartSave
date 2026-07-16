import {
  BellIcon,
  HelpCircleIcon,
  HomeIcon,
  PlusIcon,
  SettingsIcon,
  TargetIcon,
  UserIcon,
} from "lucide-react";

export const navGroups = [
  {
    label: "Workspace",
    items: [
      {
        title: "Summary",
        url: "/dashboard",
        icon: <HomeIcon />,
        end: true,
      },
      {
        title: "Goals",
        url: "/dashboard/goals",
        icon: <TargetIcon />,
      },
      {
        title: "Create goal",
        url: "/dashboard/creategoal",
        icon: <PlusIcon />,
      },
      {
        title: "Profiles",
        url: "/dashboard/profiles",
        icon: <UserIcon />,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: <BellIcon />,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: <SettingsIcon />,
      },
    ],
  },
];

export const footerNavLinks = [
  {
    title: "Help",
    url: "/dashboard/settings",
    icon: <HelpCircleIcon />,
  },
];

export const navLinks = [
  ...navGroups.flatMap((group) => group.items),
  ...footerNavLinks,
];
