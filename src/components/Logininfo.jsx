import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const LoginInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard", { state: { greetingType: "welcomeBack" } });
    } catch (authError) {
      setError(authError.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="login">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Sign in to continue toward your goals.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <FieldGroup>
            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error) || undefined}
                required
                className="h-10"
              />
            </Field>

            <Field data-invalid={Boolean(error) || undefined}>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <button
                  type="button"
                  className="text-xs font-medium text-emerald-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-emerald-500 dark:text-emerald-400"
                >
                  Forgot password?
                </button>
              </div>
              <InputGroup className="h-10">
                <InputGroupInput
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
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
              {error ? <FieldError>{error}</FieldError> : null}
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="remember-me"
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked === true)}
              />
              <FieldLabel htmlFor="remember-me" className="font-normal">
                Remember me
              </FieldLabel>
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-10 w-full bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.97] motion-safe:transition-[transform,background-color] motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-emerald-400 dark:hover:bg-emerald-300"
          >
            {loading ? <Spinner data-icon="inline-start" /> : null}
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-emerald-600 underline-offset-4 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-emerald-500 hover:underline dark:text-emerald-400"
            >
              Sign up
            </Link>
          </FieldDescription>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginInfo;
