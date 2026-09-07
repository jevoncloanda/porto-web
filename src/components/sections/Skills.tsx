import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isPlaceholder } from "@/lib/placeholder";
import { skills } from "@content/skills";

export function Skills() {
  if (skills.length === 0) return null;

  return (
    <Section id="skills" tone="alt">
      <SectionHeading
        eyebrow="Stack"
        title="Tools I work with"
        description="Only the technologies listed in the content configuration are shown here."
      />

      <div className="mt-14 border-t border-border">
        {skills.map((category) => (
          <Reveal key={category.title}>
            <div className="grid gap-4 border-b border-border py-7 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <h3 className="text-h3 font-medium text-fg">{category.title}</h3>
                {category.description ? (
                  <p className="mt-1.5 text-sm text-subtle">{category.description}</p>
                ) : null}
              </div>

              {category.items.length > 0 ? (
                <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-8 lg:justify-end">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className={
                        isPlaceholder(item)
                          ? "text-sm text-subtle italic"
                          : "text-sm text-muted"
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
