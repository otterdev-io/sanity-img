import type { SanityImgDefaults } from "./types.js";
/**
 * The default values for sanityImageDefaults
 * The width has been picked to full-width images for up to 1920px @2x screens
 */
export const defaultSanityImgDefaults: SanityImgDefaults = {
  widths: {
    maxWidth: 3840,
    step: 320,
  },
  options: {},
};

export function setSanityImgDefaults(defaults: Partial<SanityImgDefaults>) {
  if (!globalThis.sanityImgDefaults) {
    globalThis.sanityImgDefaults = defaultSanityImgDefaults;
  }
  Object.entries(defaults).forEach(([k, v]) => {
    //@ts-expect-error keys don't match up
    globalThis.sanityImgDefaults[k] = v;
  });
}
