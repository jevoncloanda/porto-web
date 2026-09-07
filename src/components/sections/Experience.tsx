import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isPlaceholder } from "@/lib/placeholder";
import { experience } from "@content/experience";

export function Experience() {
  if (experience.length === 0) return null;

  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="Where I have worked" />

      <ol className="mt-14 border-t border-border">
        {experience.map((entry, index) => (
          <li key={`${entry.company}-${index}`} className="border-b border-border">
            <Reveal>
              <article className="grid gap-5 py-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3">
                  <p className="text-label tracking-[0.18em] text-accent uppercase">
                    {entry.period}
                  </p>
                  {entry.location ? (
                    <p className="mt-2 text-sm text-subtle">{entry.location}</p>
                  ) : null}
                </div>

                <div className="lg:col-span-9">
                  <h3 className="text-h3 font-medium text-fg">
                    {entry.role}
                    <span className="text-subtle"> — </span>
                    {entry.url && !isPlaceholder(entry.url) ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-accent underline-offset-4 hover:underline"
                      >
                        {entry.company}
                      </a>
                    ) : (
                      <span className="text-accent">{entry.company}</span>
                    )}
                  </h3>

                  {entry.description ? (
                    <p className="mt-4 max-w-reading text-muted">{entry.description}</p>
                  ) : null}

                  {entry.achievements && entry.achievements.length > 0 ? (
                    <ul className="mt-5 max-w-reading space-y-2.5">
                      {entry.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex gap-3 text-sm text-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 h-px w-4 shrink-0 bg-accent"
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {entry.technologies && entry.technologies.length > 0 ? (
                    <p className="mt-5 text-sm text-subtle">
                      {entry.technologies.join("  ·  ")}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
