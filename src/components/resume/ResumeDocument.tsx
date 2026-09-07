import { ResumeSection } from "@/components/resume/ResumeSection";
import { getSocialEntries } from "@/lib/social";
import { experience } from "@content/experience";
import { profile } from "@content/profile";
import { certifications, education, organizations } from "@content/resume";
import { skills } from "@content/skills";

interface ContactItem {
  key: string;
  label: string;
  href?: string;
}

/** Contact details: location gets its own line; links share a second line. */
function ContactLine() {
  const entries = getSocialEntries();
  const items: ContactItem[] = entries.map((entry) => ({
    key: entry.kind,
    label: entry.value,
    href: entry.href,
  }));

  return (
    <div className="mt-4 text-[0.8125rem] text-neutral-600">
      {profile.location ? <p>{profile.location}</p> : null}
      <ul className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {items.map((item, index) => (
          <li key={item.key} className="flex items-center gap-4">
            {index > 0 ? "|" : null}
            {item.href ? (
              <a href={item.href} className="underline-offset-2 hover:underline">
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ResumeDocument() {
  const summary = profile.bio[0] ?? profile.shortBio;

  return (
    <article className="resume-sheet rounded-card border border-neutral-200 shadow-card">
      <header className="resume-block">
        <h1 className="text-[1.75rem] leading-tight font-semibold tracking-tight text-neutral-900">
          {profile.name}
        </h1>
        <p className="mt-1 text-[0.9375rem] text-neutral-600">{profile.title}</p>
        <ContactLine />
      </header>

      {summary ? (
        <ResumeSection title="Summary">
          <p className="text-[0.875rem] leading-[1.6] text-neutral-700">{summary}</p>
        </ResumeSection>
      ) : null}

      {experience.length > 0 ? (
        <ResumeSection title="Experience">
          <ol className="space-y-6">
            {experience.map((entry, index) => (
              <li key={`${entry.company}-${index}`} className="resume-block">
                <div className="resume-entry-heading">
                  <h3 className="text-[0.9375rem] font-semibold text-neutral-900">
                    {entry.company}
                    {entry.location ? (
                      <span className="font-normal text-neutral-500">
                        {` · ${entry.location}`}
                      </span>
                    ) : null}
                  </h3>
                  <p className="resume-entry-date text-[0.6875rem] tracking-wide text-neutral-500">
                    {entry.period}
                  </p>
                </div>

                <p className="mt-1 text-[0.875rem] font-medium italic text-neutral-700">
                  {entry.role}
                </p>

                {entry.description ? (
                  <p className="mt-2 text-[0.875rem] leading-[1.6] text-neutral-700">
                    {entry.description}
                  </p>
                ) : null}

                {entry.achievements && entry.achievements.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.875rem] leading-[1.55] text-neutral-700 marker:text-neutral-400">
                    {entry.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                ) : null}

                {entry.technologies && entry.technologies.length > 0 ? (
                  <p className="mt-2 text-[0.6875rem] text-neutral-500">
                    {entry.technologies.join(" · ")}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </ResumeSection>
      ) : null}

      {skills.length > 0 ? (
        <ResumeSection title="Skills">
          <dl className="space-y-2.5">
            {skills.map((category) => (
              <div
                key={category.title}
                className="resume-block flex flex-col gap-0.5 sm:flex-row sm:gap-4"
              >
                <dt className="text-[0.875rem] font-medium text-neutral-900 sm:w-32 sm:shrink-0">
                  {category.title}
                </dt>
                <dd className="text-[0.875rem] text-neutral-700">
                  {category.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </ResumeSection>
      ) : null}

      {education.length > 0 ? (
        <ResumeSection title="Education">
          <ol className="space-y-4">
            {education.map((entry, index) => (
              <li key={`${entry.institution}-${index}`} className="resume-block">
                <div className="resume-entry-heading">
                  <h3 className="text-[0.9375rem] font-semibold text-neutral-900">
                    {entry.institution}
                    {entry.location ? (
                      <span className="font-normal text-neutral-500">
                        {` · ${entry.location}`}
                      </span>
                    ) : null}
                  </h3>
                  <p className="resume-entry-date text-[0.6875rem] tracking-wide text-neutral-500">
                    {entry.period}
                  </p>
                </div>
                <p className="mt-1 text-[0.875rem] font-medium italic text-neutral-700">
                  {entry.qualification}
                  {entry.description ? `, ${entry.description}` : ""}
                </p>
              </li>
            ))}
          </ol>
        </ResumeSection>
      ) : null}

      {organizations.length > 0 ? (
        <ResumeSection title="Organizational Experience">
          <ol className="space-y-6">
            {organizations.map((entry, index) => (
              <li key={`${entry.company}-${index}`} className="resume-block">
                <div className="resume-entry-heading">
                  <h3 className="text-[0.9375rem] font-semibold text-neutral-900">
                    {entry.company}
                    {entry.location ? (
                      <span className="font-normal text-neutral-500">
                        {` · ${entry.location}`}
                      </span>
                    ) : null}
                  </h3>
                  <p className="resume-entry-date text-[0.6875rem] tracking-wide text-neutral-500">
                    {entry.period}
                  </p>
                </div>

                <p className="mt-1 text-[0.875rem] font-medium italic text-neutral-700">
                  {entry.role}
                </p>

                {entry.description ? (
                  <p className="mt-2 text-[0.875rem] leading-[1.6] text-neutral-700">
                    {entry.description}
                  </p>
                ) : null}

                {entry.achievements && entry.achievements.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.875rem] leading-[1.55] text-neutral-700 marker:text-neutral-400">
                    {entry.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </ResumeSection>
      ) : null}

      {certifications.length > 0 ? (
        <ResumeSection title="Certifications">
          <ul className="space-y-1.5">
            {certifications.map((certification, index) => (
              <li
                key={`${certification.name}-${index}`}
                className="resume-block text-[0.875rem] text-neutral-700"
              >
                <span className="font-medium text-neutral-900">{certification.name}</span>
                {certification.issuer ? ` · ${certification.issuer}` : ""}
                {certification.year ? ` (${certification.year})` : ""}
              </li>
            ))}
          </ul>
        </ResumeSection>
      ) : null}
    </article>
  );
}
