import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type {
  AutoWidths,
  SanityDimensionedImage,
  SanityImageProps,
} from "./types";

/**
 * Perform a shallow (non-recursive) merge of multiple objects
 * Equivalent to {...a, ...b, ...etc}, just a bit more terse
 * @param items objects to merge
 * @returns merged object
 */
export function shallowMerge<T extends Record<string, any>>(...items: T[]): T {
  let merged = {} as T;
  items.forEach((item) => {
    Object.entries(item).forEach(([k, v]) => {
      merged[k as keyof T] = v;
    });
  });
  return merged;
}

/**
 * Single-level recursive merge
 * @param items objects to merge
 * @returns merged object
 */
export function mergeSingleRecursive<T extends Record<string, any>>(
  ...items: T[]
): T {
  let merged = {} as T;
  items.forEach((item) => {
    Object.entries(item).forEach(([k, v]) => {
      merged[k as keyof T] =
        merged[k] && v && typeof v === "object"
          ? shallowMerge(merged[k], v)
          : v;
    });
  });
  return merged;
}

/**
 * Guard whether our provided image has dimensions
 * @param image
 */
export function isSanityDimensionedImage(
  image: SanityImageSource,
): image is SanityDimensionedImage {
  return (
    typeof image == "object" &&
    "asset" in image &&
    "metadata" in image.asset &&
    "dimensions" in image.asset.metadata
  );
}

/**
 * Calculate automatically determined widths for an image
 * If image dimensions are not available, maximum width is bounded by autoWidths.maxWidth
 * Incrementing by autoWidths.step px
 * @param autoWidths autowidths settings to use
 * @param image image to calculate off of
 * @returns array of widths
 */
export function generateWidths(
  autoWidths: AutoWidths,
  image: SanityImageSource,
): number[] {
  const maxWidth = isSanityDimensionedImage(image)
    ? image.asset.metadata.dimensions.width
    : autoWidths.maxWidth;
  const divisions = Math.ceil(maxWidth / autoWidths.step);
  return Array.from({ length: divisions }, (_, i) =>
    Math.min(Math.floor(autoWidths.step * (i + 1)), maxWidth),
  );
}

export function componentProps({
  imageUrlBuilder,
  widths,
  src,
  options,
}: Required<
  Pick<SanityImageProps, "widths" | "src" | "options" | "imageUrlBuilder">
>): { width: number | undefined; height: number | undefined; srcset: string } {
  const determinedWidths = Array.isArray(widths)
    ? widths
    : generateWidths(widths, src);

  const [width, height] = isSanityDimensionedImage(src)
    ? [
        src.asset.metadata.dimensions.width,
        src.asset.metadata.dimensions.height,
      ]
    : [undefined, undefined];

  const srcset = determinedWidths
    .map(
      (w: number) =>
        `${imageUrlBuilder
          .width(w)
          .withOptions(options ?? {})
          .url()} ${w}w`,
    )
    .join(", ");

  return { width, height, srcset };
}
