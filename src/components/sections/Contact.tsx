import { ArrowUpRight } from "lucide-react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSocialEntries } from "@/lib/social";

export function Contact() {
  const entries = getSocialEntries();
  const email = entries.find((entry) => entry.kind === "email");
  const profiles = entries.filter((entry) => entry.kind !== "email");

  return (
    <Section id="contact" tone="alt">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="accent-rule mt-6 text-h2 font-semibold text-fg">
              Any type of query
              <br />&amp; discussion.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="max-w-reading text-lead text-muted">
              The quickest way to reach me is by email. I read everything and reply
              to anything concrete.
            </p>

            {email?.href ? (
              <a
                href={email.href}
                className="group mt-8 inline-flex items-baseline gap-3 text-h2 font-semibold text-accent"
              >
                <span className="border-b-2 border-accent/40 transition-colors group-hover:border-accent">
                  {email.value}
                </span>
                <ArrowUpRight
                  size={22}
                  aria-hidden
                  className="shrink-0 self-center"
                />
              </a>
            ) : (
              <p
                className="mt-8 text-h2 font-semibold text-subtle"
                title="Not set yet — update content/profile.ts"
              >
                {email?.value ?? "[ADD EMAIL]"}
              </p>
            )}

            <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
              {profiles.map((entry) => (
                <li key={entry.kind}>
                  <span className="block text-label tracking-[0.18em] text-subtle uppercase">
                    {entry.label}
                  </span>
                  {entry.href ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm break-all text-fg underline-offset-4 hover:text-accent hover:underline"
                    >
                      {entry.value}
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  ) : (
                    <span
                      className="mt-2 block text-sm text-subtle"
                      title="Not set yet — update content/profile.ts"
                    >
                      {entry.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
