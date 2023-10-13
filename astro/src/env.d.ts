/// <reference types="@sanity/astro/module" />

import type { SanityImgDefaults } from "@otterstack/sanity-img-lib";

declare global {
  var sanityImgDefaults: SanityImgDefaults;
}
