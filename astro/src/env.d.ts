/// <reference types="@sanity/astro/module" />

import type { SanityImageComponentDefaults } from "@otterstack/sanity-img-lib";

declare global {
  var sanityImageComponentDefaults: SanityImageComponentDefaults;
}
