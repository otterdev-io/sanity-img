import type { SanityImageComponentDefaults } from "./types.js";
/**
 * The default values for sanityImageDefaults
 * The width has been picked to full-width images for up to 1920px @2x screens
 */
export const defaultSanityImageComponentDefaults: SanityImageComponentDefaults =
  {
    autoWidths: {
      maxWidth: 3840,
      step: 320,
    },
    options: { auto: "format" },
  };

export function setSanityImageComponentDefaults(
  defaults: Partial<SanityImageComponentDefaults>,
) {
  if (!globalThis.sanityImageComponentDefaults) {
    globalThis.sanityImageComponentDefaults =
      defaultSanityImageComponentDefaults;
  }
  Object.entries(defaults).forEach(([k, v]) => {
    //@ts-expect-error keys don't match up
    globalThis.sanityImageComponentDefaults[k] = v;
  });
}
