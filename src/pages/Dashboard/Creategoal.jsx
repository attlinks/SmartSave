import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CalendarIcon, DollarSignIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { saveGoal } from "@/utils/goalsStorage";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Creategoal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    saveGoal(
      {
        goalName: formData.get("goalName"),
        targetAmount: formData.get("targetAmount"),
        deadline: formData.get("deadline"),
        note: formData.get("note"),
      },
      user?.uid,
    );

    navigate("/dashboard/goals");
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="mb-3 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <Link to="/dashboard">
          <ArrowLeftIcon data-icon="inline-start" />
          Back
        </Link>
      </Button>

      <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="mb-5">
          <h1 className="text-xl font-semibold tracking-tight text-card-foreground">
            Create goal
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Set a name, target amount, and deadline.
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="goalName">Goal name</FieldLabel>
              <Input
                id="goalName"
                name="goalName"
                type="text"
                placeholder="Example: Buy a laptop"
                required
                className="h-9"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="targetAmount">Target amount</FieldLabel>
                <InputGroup className="h-9">
                  <InputGroupAddon>
                    <DollarSignIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="targetAmount"
                    name="targetAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    required
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
                <InputGroup className="h-9">
                  <InputGroupAddon>
                    <CalendarIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="deadline"
                    name="deadline"
                    type="date"
                    required
                  />
                </InputGroup>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="note">Note</FieldLabel>
              <Textarea
                id="note"
                name="note"
                rows={3}
                placeholder="Optional note about this goal"
                className="min-h-20 resize-none"
              />
            </Field>
          </FieldGroup>

          <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <Button asChild variant="outline" size="sm">
              <Link to="/dashboard">Cancel</Link>
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300"
            >
              Create goal
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Creategoal;
