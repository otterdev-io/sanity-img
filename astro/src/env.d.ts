/// <reference types="@sanity/astro/module" />

import type { SanityImageComponentDefaults } from "@sanity-image-component/lib";

declare global {
  var sanityImageComponentDefaults: SanityImageComponentDefaults;
}
