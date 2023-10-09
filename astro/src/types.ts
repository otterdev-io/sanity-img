/// <reference types="astro/astro-jsx" />

import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type {
  ImageUrlBuilderOptionsWithAliases,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import type { AutoWidths } from "@sanity-image-tag/common/types";
/**
 * Type for our component's props
 */
export type SanityImageProps = {
  /**
   * An instance of sanity image url builder to use. If default is set, may be omitted
   */
  imageUrlBuilder?: ImageUrlBuilder;
  /**
   * The image to display, as a property from a `groq` query
   */
  src: SanityImageSource;
  /**
   * Specifies how to calculate widths for `<source />` elements. You may either specify a list of widths to use, or a an `AutoWidths` type which declares how to automatically determine the widths.
   */
  widths?: number[] | AutoWidths /**
   * Additional image builder options
   */;
  options?: Partial<ImageUrlBuilderOptionsWithAliases>;
  /**
   * Whether to add .auto('format') to image builder, automatically converting to webp when available
   */
  autoFormat?: boolean;
} & ImgAttributes;

export type ImgAttributes = astroHTML.JSX.DefinedIntrinsicElements["img"];
