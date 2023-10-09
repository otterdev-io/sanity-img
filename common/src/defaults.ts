import type { SanityImageTagDefaults } from "./types";
/**
 * The default values for sanityImageDefaults
 * The width has been picked to full-width images for up to 1920px @2x screens
 */
export const defaultSanityImageTagDefaults: SanityImageTagDefaults = {
  autoWidths: {
    maxWidth: 3840,
    step: 320,
  },
  options: { auto: "format" },
};

export function setSanityImageTagDefaults(
  defaults: Partial<SanityImageTagDefaults>,
) {
  if (!globalThis.sanityImageTagDefaults) {
    globalThis.sanityImageTagDefaults = defaultSanityImageTagDefaults;
  }
  Object.entries(defaults).forEach(([k, v]) => {
    //@ts-expect-error keys don't match up
    globalThis.sanityImageTagDefaults[k] = v;
  });
}
