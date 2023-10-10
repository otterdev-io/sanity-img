import type { SanityImageComponentDefaults } from "@sanity-image-component/common/defaults";

declare global {
  var sanityImageComponentDefaults: SanityImageComponentDefaults;
}

//From the vite plugin
declare module "sanity:client" {
  export const sanityClient: import("@sanity/client").SanityClient;
}
