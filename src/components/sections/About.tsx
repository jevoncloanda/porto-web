import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getSocialEntries } from "@/lib/social";
import { profile } from "@content/profile";

interface Fact {
  label: string;
  value: string;
}

export function About() {
  const email = getSocialEntries().find((entry) => entry.kind === "email");

  const facts: Fact[] = [
    profile.location ? { label: "Based in", value: profile.location } : null,
    { label: "Role", value: profile.title },
    profile.availability ? { label: "Status", value: profile.availability } : null,
    email ? { label: "Email", value: email.value } : null,
  ].filter((fact): fact is Fact => fact !== null);

  return (
    <Section id="about" tone="alt">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="accent-rule mt-6 text-h2 font-semibold text-fg">
              A short introduction
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="max-w-reading space-y-6 text-lead text-muted">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {facts.length > 0 ? (
            <Reveal>
              <dl className="mt-12 border-t border-border">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <dt className="text-label tracking-[0.18em] text-subtle uppercase sm:w-32 sm:shrink-0">
                      {fact.label}
                    </dt>
                    <dd className="text-sm break-words text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
