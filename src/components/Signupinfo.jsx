import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { clearStoredGoals } from "@/utils/goalsStorage";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const SignupInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      await signup(form.email, form.password, form.name);
      clearStoredGoals();
      navigate("/dashboard", { state: { greetingType: "hello" } });
    } catch (authError) {
      setError(authError.message || "Unable to create an account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout mode="signup">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Create your account
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Start tracking goals and saving with intention.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="signup-name">Full name</FieldLabel>
              <Input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Rivera"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(error) || undefined}
                required
                className="h-10"
              />
            </Field>

            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="signup-email">Email</FieldLabel>
              <Input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(error) || undefined}
                required
                className="h-10"
              />
            </Field>

            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="signup-password">Password</FieldLabel>
              <InputGroup className="h-10">
                <InputGroupInput
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(error) || undefined}
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    size="icon-xs"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Use 8 or more characters for a stronger password.
              </FieldDescription>
              {error ? <FieldError>{error}</FieldError> : null}
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-10 w-full bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.97] motion-safe:transition-[transform,background-color] motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-emerald-400 dark:hover:bg-emerald-300"
          >
            {loading ? <Spinner data-icon="inline-start" /> : null}
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-600 underline-offset-4 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-emerald-500 hover:underline dark:text-emerald-400"
            >
              Sign in
            </Link>
          </FieldDescription>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignupInfo;
