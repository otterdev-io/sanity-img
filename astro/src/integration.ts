import type { AstroIntegration } from "astro";
import {
  defaultSanityImgDefaults,
  type SanityImgDefaults,
} from "@otterstack/sanity-img-lib";

export default function sanityImg(
  defaults?: SanityImgDefaults,
): AstroIntegration {
  const resolvedDefaults = defaults ?? defaultSanityImgDefaults;
  const loadImageBuilder = `
          import $_sic_urlBuilder from "@sanity/image-url";
          import { sanityClient as $_sic_sanityClient } from "sanity:client";
          import { setSanityImgDefaults as $_sic_setSanityImgDefaults } from "@otterstack/sanity-img-astro";
          {
            const imageUrlBuilder = $_sic_urlBuilder($_sic_sanityClient);
            $_sic_setSanityImgDefaults({...${JSON.stringify(
              resolvedDefaults,
            )}, imageUrlBuilder });
          }
        `;
  return {
    name: "@otterstack/sanity-img-astro/integration",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        //For ssr rendering
        injectScript("page-ssr", loadImageBuilder);
        //For client side components (svelte)
        injectScript("before-hydration", loadImageBuilder);
      },
    },
  };
}
