import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ChartColumnIncreasingIcon,
  CrosshairIcon,
  TargetIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const principles = [
  {
    title: "One goal at a time",
    body: "Pick a target, set the amount, and keep every session pointed at that outcome.",
    icon: TargetIcon,
  },
  {
    title: "Quiet progress",
    body: "See how far you have come without dashboards drowning out the next step.",
    icon: ChartColumnIncreasingIcon,
  },
  {
    title: "Stay focused",
    body: "Fewer distractions, clearer habits, and a calmer path from intention to done.",
    icon: CrosshairIcon,
  },
];

const Smartinfo = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);
  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
          <Link
            to="/"
            className="inline-flex rounded-lg outline-none transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-80 focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            aria-label="Smart Save home"
          >
            <Logo inverted className="[&_svg]:size-8" />
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hover:text-white active:scale-[0.97] motion-safe:transition-transform motion-safe:duration-150"
            >
              <Link to="/login">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-emerald-400 text-zinc-950 hover:bg-emerald-300 active:scale-[0.97] motion-safe:transition-[transform,background-color] motion-safe:duration-150"
            >
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
        <img
          src="/landing-hero.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover motion-safe:animate-landing-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/35" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-28 sm:px-8 sm:pb-20 lg:pb-24">
          <div className="max-w-2xl motion-safe:animate-landing-copy">
            <p
              data-aos="fade-up"
              className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Smart Save
            </p>
            <h1
              data-aos="fade-up"
              className="max-w-[14ch] text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Save with purpose. Reach goals with calm focus.
            </h1>
            <p
              data-aos="fade-right"
              className="mt-5 max-w-[42ch] text-base leading-relaxed text-zinc-300 sm:text-lg"
            >
              Turn one financial goal into steady progress you can actually
              finish.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-11 bg-emerald-400 px-5 text-zinc-950 hover:bg-emerald-300 active:scale-[0.97] motion-safe:transition-[transform,background-color] motion-safe:duration-150"
              >
                <Link to="/signup">
                  Start saving
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 border-white/20 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white active:scale-[0.97] motion-safe:transition-[transform,background-color] motion-safe:duration-150"
              >
                <Link to="/login">I already have an account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
          <div className="max-w-md">
            <h2
              data-aos="fade-right"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Built for people who want clarity, not clutter.
            </h2>
            <p
              data-aos="fade-right"
              className="mt-4 text-base leading-relaxed text-muted-foreground"
            >
              Smart Save keeps the path short: choose a goal, track what you put
              aside, and stay close to the finish line.
            </p>
          </div>

          <ul data-aos="fade-left" className="grid gap-8 sm:grid-cols-1">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="grid gap-3 border-t border-border pt-6 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr] sm:gap-5"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-zinc-950 text-zinc-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Ready when you are.
            </p>
            <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-zinc-400">
              Create an account in a minute and put your next goal on a clear
              track.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-11 w-fit bg-emerald-400 px-5 text-zinc-950 hover:bg-emerald-300 active:scale-[0.97] motion-safe:transition-[transform,background-color] motion-safe:duration-150"
          >
            <Link to="/signup">
              Create account
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Logo className="[&_svg]:size-7 [&_span]:text-sm" />
          <p>Save with purpose. Finish what you start.</p>
        </div>
      </footer>
    </main>
  );
};

export default Smartinfo;
