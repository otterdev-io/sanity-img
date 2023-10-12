import type { SanityImageSource } from "@sanity/image-url/lib/types/types.js";
import type {
  AutoWidths,
  SanityDimensionedImage,
  SanityImageProps,
} from "./types.js";

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
 * Calculate optimal width and height values for an image, where either or both may have already been specified
 * If image metadata was fetched, will scale missing values to keep aspect ratio
 * @param src image src from sanity
 * @param width optionally manually specified width
 * @param height optionally manually specified height
 * @returns width and height tuple
 */
function getImageDimensions(
  src: SanityImageSource,
  width: number | undefined,
  height: number | undefined,
): [width: number | undefined, height: number | undefined] {
  return [
    width ?? inferredWidth(src, height),
    height ?? inferredHeight(src, width),
  ];
}

function inferredWidth(src: SanityImageSource, height: number | undefined) {
  if (isSanityDimensionedImage(src)) {
    return height != null
      ? height * src.asset.metadata.dimensions.aspectRatio
      : src.asset.metadata.dimensions.width;
  }
  return undefined;
}

function inferredHeight(src: SanityImageSource, width: number | undefined) {
  if (isSanityDimensionedImage(src)) {
    return width != null
      ? width / src.asset.metadata.dimensions.aspectRatio
      : src.asset.metadata.dimensions.height;
  }
  return undefined;
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

export interface ComponentProps {
  width: number | undefined;
  height: number | undefined;
  srcset: string;
  src: string;
}

export function componentProps({
  imageUrlBuilder,
  widths,
  width,
  height,
  src,
  options,
}: Required<
  Pick<SanityImageProps, "widths" | "src" | "options" | "imageUrlBuilder">
> & {
  width: string | number | null | undefined;
  height: string | number | null | undefined;
}): ComponentProps {
  const determinedWidths = Array.isArray(widths)
    ? widths
    : generateWidths(widths, src);

  const [w, h] = getImageDimensions(
    src,
    width != null ? Number(width) : undefined,
    height != null ? Number(height) : undefined,
  );

  const builder = imageUrlBuilder.withOptions(options).image(src);

  const srcset = determinedWidths
    .map((w: number) => `${builder.width(w).url()} ${w}w`)
    .join(", ");

  return { width: w, height: h, srcset, src: builder.url() };
}
