import { useMemo, useState } from "react";
import { FiMail, FiSmile, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

const profileItems = [
  { label: "Name", icon: FiUser, key: "displayName" },
  { label: "Email", icon: FiMail, key: "email" },
  { label: "Status", icon: FiSmile, value: "Active account" },
];

const Profiles = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const profileData = useMemo(
    () =>
      profileItems.map((item) => ({
        ...item,
        value:
          item.value ||
          user?.[item.key] ||
          (item.key === "displayName" ? "New user" : "Not available"),
      })),
    [user],
  );

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-4">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Profile
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Account details and profile information
        </p>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        {profileData.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="rounded-xl border border-border bg-card p-3.5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Icon className="text-base" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-card-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {editing ? (
        <div className="mb-4 rounded-xl border border-border bg-card p-3.5 shadow-sm">
          <h2 className="text-sm font-semibold text-card-foreground">
            Edit profile
          </h2>
          <div className="mt-3 max-w-sm">
            <Field>
              <FieldLabel htmlFor="profile-name">Name</FieldLabel>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9"
              />
            </Field>
            <div className="mt-3 flex gap-2">
              <Button
                type="button"
                size="sm"
                className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300"
                onClick={async () => {
                  try {
                    await updateUserProfile({ displayName: name });
                    setEditing(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
        <h2 className="text-sm font-semibold text-card-foreground">
          Quick actions
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Update your name or review account security.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300"
            onClick={() => {
              setName(user?.displayName || "");
              setEditing(true);
            }}
          >
            Edit profile
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              navigate("/dashboard/settings", {
                state: { section: "security" },
              })
            }
          >
            Account security
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Profiles;
