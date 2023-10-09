import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type {
  ImageUrlBuilderOptionsWithAliases,
  SanityImageDimensions,
  SanityImageWithAssetStub,
} from "@sanity/image-url/lib/types/types.js";

/**
 * Default properties for all components in the app
 */
export interface SanityImageTagDefaults {
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
  var sanityImageTagDefaults: SanityImageTagDefaults;
}
