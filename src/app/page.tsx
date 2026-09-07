import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { getFeaturedProjects, toProjectMeta } from "@/lib/projects";

export default async function HomePage() {
  const featured = (await getFeaturedProjects(4)).map(toProjectMeta);

  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects projects={featured} />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
