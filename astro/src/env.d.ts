/// <reference types="@sanity/astro/module" />

import type { SanityImageComponentDefaults } from "../../lib/dist/defaults";

declare global {
  var sanityImageComponentDefaults: SanityImageComponentDefaults;
}
