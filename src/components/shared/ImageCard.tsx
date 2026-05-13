import { cn } from "../../lib/cn";
import type { ImageAsset } from "../../data/images";

type ImageCardProps = {
  image: ImageAsset;
  className?: string;
  imageClassName?: string;
  overlay?: boolean;
  caption?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
};

export function ImageCard({
  image,
  className,
  imageClassName,
  overlay = true,
  caption,
  loading = "lazy",
  fetchPriority = "auto",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ImageCardProps) {
  const priorityAttribute =
    fetchPriority === "auto"
      ? {}
      : ({ fetchpriority: fetchPriority } as Record<string, string>);

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[1.35rem] border border-borderblue bg-white shadow-soft",
        className,
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        className={cn("h-full w-full object-cover", imageClassName)}
        loading={loading}
        decoding="async"
        {...priorityAttribute}
        sizes={sizes}
      />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-white/10" />
      )}
      {caption && (
        <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/50 bg-white/90 px-4 py-3 text-sm font-medium text-navy shadow-sm backdrop-blur">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
