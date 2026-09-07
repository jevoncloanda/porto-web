import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@content/profile";

export function Hero() {
  const { photo } = profile;

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-40">
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Name block — left, as in the reference */}
          <div className="lg:col-span-5">
            <Reveal mode="mount">
              <h1 className="text-display font-semibold break-words text-fg">
                {profile.name}
                <span className="text-accent">.</span>
              </h1>
            </Reveal>

            <Reveal mode="mount" delay={0.05}>
              <div aria-hidden className="mt-7 h-[3px] w-12 bg-accent" />
            </Reveal>

            <Reveal mode="mount" delay={0.1}>
              <SocialLinks className="mt-8" />
            </Reveal>

            {profile.location ? (
              <Reveal mode="mount" delay={0.15}>
                <p className="mt-8 flex items-center gap-2 text-xs tracking-[0.08em] text-subtle uppercase">
                  <MapPin size={13} aria-hidden />
                  {profile.location}
                </p>
              </Reveal>
            ) : null}
          </div>

          {/* Portrait — centre column */}
          {photo ? (
            <Reveal mode="mount" delay={0.05} className="lg:col-span-3">
              <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  priority
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 20rem, 80vw"
                  className="aspect-4/5 h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          ) : null}

          {/* Introduction — right */}
          <div className="lg:col-span-4">
            <Reveal mode="mount" delay={0.1}>
              <Eyebrow>Introduction</Eyebrow>
            </Reveal>

            <Reveal mode="mount" delay={0.15}>
              <p className="mt-6 text-h3 font-medium text-fg">{profile.title}</p>
            </Reveal>

            <Reveal mode="mount" delay={0.2}>
              <p className="mt-5 text-lead text-muted">{profile.shortBio}</p>
            </Reveal>

            <Reveal mode="mount" delay={0.25}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="/projects">
                  My work
                  <ArrowRight size={16} aria-hidden />
                </Button>
                <Button href="/resume" variant="ghost">
                  Resume
                  <ArrowRight size={16} aria-hidden />
                </Button>
              </div>
            </Reveal>

            {profile.availability ? (
              <Reveal mode="mount" delay={0.3}>
                <p className="mt-8 flex items-center gap-2.5 text-xs tracking-[0.08em] text-subtle uppercase">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
                  {profile.availability}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
