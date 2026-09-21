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
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:min-h-[760px] lg:pt-24 lg:pb-20"
    >
      <Container>
        {/* Top metadata */}
        <Reveal mode="mount">
          <div className="relative z-30 flex items-center justify-between gap-6">
            <Eyebrow>{profile.title}</Eyebrow>

            {profile.location ? (
              <p className="hidden items-center gap-2 text-xs tracking-[0.08em] text-subtle uppercase sm:flex">
                <MapPin size={13} aria-hidden />
                {profile.location}
              </p>
            ) : null}
          </div>
        </Reveal>

        {/* Main hero composition */}
        <div className="relative mt-14 lg:mt-10 lg:min-h-[610px]">
          {/* Portrait
              Desktop: large, centered-left, behind the name.
              Mobile: normal image in the flow. */}
          {photo ? (
            <Reveal
              mode="mount"
              delay={0.05}
              className="
                relative z-10 mx-auto w-[78%] max-w-sm
                sm:w-[55%]
                lg:absolute lg:top-[-80px] lg:left-[24%]
                lg:w-[46%] lg:max-w-none
              "
            >
              <div className="relative">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  priority
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 55vw, 78vw"
                  className="h-auto w-full object-contain"
                />

                {/* Softly blend the bottom of the portrait into the hero */}
                <div
                  aria-hidden
                  className="
                    pointer-events-none absolute right-0 bottom-0 left-0
                    h-[22%]
                    bg-linear-to-b from-transparent to-bg
                  "
                />
              </div>
            </Reveal>
          ) : null}

          {/* Giant name */}
          <Reveal
            mode="mount"
            delay={0.08}
            className="
              relative z-20 mt-[-2rem]
              sm:mt-[-4rem]
              lg:absolute lg:top-[105px] lg:left-0 lg:mt-0
              lg:w-[67%]
            "
          >
            <h1
              className="
                text-[clamp(4rem,9.2vw,8.5rem)]
                font-semibold
                leading-[0.9]
                tracking-[-0.065em]
                text-fg
              "
            >
              {profile.name}
              <span className="text-accent">.</span>
            </h1>
          </Reveal>

          {/* Introduction — stays safely on the right */}
          <div
            className="
              relative z-30 mt-12
              sm:mt-16
              lg:absolute lg:top-[175px] lg:right-0 lg:mt-0
              lg:w-[31%]
            "
          >
            <Reveal mode="mount" delay={0.15}>
              <Eyebrow>Introduction</Eyebrow>
            </Reveal>

            <Reveal mode="mount" delay={0.2}>
              <p className="mt-6 text-lead text-muted">
                {profile.shortBio}
              </p>
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
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  {profile.availability}
                </p>
              </Reveal>
            ) : null}
          </div>

          {/* Socials — bottom left */}
          <Reveal
            mode="mount"
            delay={0.2}
            className="
              relative z-30 mt-12
              lg:absolute lg:bottom-[25px] lg:left-0 lg:mt-0
            "
          >
            <div aria-hidden className="h-[3px] w-12 bg-accent" />
            <SocialLinks className="mt-7" />

            {profile.location ? (
              <p className="mt-7 flex items-center gap-2 text-xs tracking-[0.08em] text-subtle uppercase sm:hidden">
                <MapPin size={13} aria-hidden />
                {profile.location}
              </p>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}