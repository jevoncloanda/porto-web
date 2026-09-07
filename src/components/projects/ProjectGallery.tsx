import Image from "next/image";

import type { ProjectImage } from "@/lib/types";

interface ProjectGalleryProps {
  images: ProjectImage[];
  title?: string;
}

export function ProjectGallery({ images, title = "Gallery" }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section aria-labelledby="project-gallery" className="mt-20">
      <h2
        id="project-gallery"
        className="text-label tracking-[0.18em] text-subtle uppercase"
      >
        {title}
      </h2>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {images.map((image) => (
          <figure key={image.src}>
            <div className="relative aspect-16/10 overflow-hidden bg-surface">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 34rem, 100vw"
                className="object-cover"
              />
            </div>
            {image.caption ? (
              <figcaption className="mt-3 text-sm text-subtle">{image.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
