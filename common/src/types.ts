import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type {
  ImageUrlBuilderOptionsWithAliases,
  SanityImageDimensions,
  SanityImageSource,
  SanityImageWithAssetStub,
} from "@sanity/image-url/lib/types/types";

/**
 * Default properties for all components in the app
 */
export interface SanityImageComponentDefaults {
  autoWidths: AutoWidths;
  imageUrlBuilder?: ImageUrlBuilder;
  options: Partial<ImageUrlBuilderOptionsWithAliases>;
}

/**
 * Settings for auto-generating the widths of our element
 */
export interface AutoWidths {
  //The highest width image to generate when dimensions are not provided
  maxWidth: number;
  //The width to jump by each source, unless we would exceed maxDivisions
  step: number;
}

/**
 * An image asset from sanity which has fetched dimension metadata
 */
export type SanityDimensionedImage = SanityImageWithAssetStub & {
  asset: {
    metadata: { dimensions: SanityImageDimensions };
  };
};

declare global {
  var sanityImageComponentDefaults: SanityImageComponentDefaults;
}

/**
 * Base type for our component's props
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
  widths?: number[] | AutoWidths;
  /**
   * Additional image builder options
   */
  options?: Partial<ImageUrlBuilderOptionsWithAliases>;
  /**
   * Whether to add .auto('format') to image builder, automatically converting to webp when available
   */
  autoFormat?: boolean;
};
