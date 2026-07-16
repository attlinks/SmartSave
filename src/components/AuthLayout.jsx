import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";

const AuthLayout = ({ children }) => {
  return (
    <div className="grid min-h-[100dvh] bg-background lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:flex-col">
        <img
          src="/auth-panel.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-70 motion-safe:animate-auth-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/25" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-zinc-50">
          <Link
            to="/"
            className="inline-flex w-fit rounded-lg outline-none transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-80 focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            aria-label="Smart Save home"
          >
            <Logo inverted />
          </Link>

          <div className="max-w-md motion-safe:animate-auth-copy">
            <h1 className="text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
              Save with purpose. Reach goals with calm focus.
            </h1>
            <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-zinc-300">
              Track targets, build habits, and watch progress compound without
              the noise.
            </p>
          </div>

          <p className="text-sm text-zinc-400">
            Built for people who want clarity, not clutter.
          </p>
        </div>
      </aside>

      <main className="relative flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="mb-8 lg:hidden">
          <Link
            to="/"
            className="inline-flex w-fit rounded-lg outline-none transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-80 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            aria-label="Smart Save home"
          >
            <Logo />
          </Link>
        </div>

        <div className="mx-auto w-full max-w-md motion-safe:animate-auth-form">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
