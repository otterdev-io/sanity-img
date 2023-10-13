import type { AstroIntegration } from "astro";
import {
  defaultSanityImageComponentDefaults,
  type SanityImageComponentDefaults,
} from "@otterstack/sanity-img-lib";

export function sanityImageComponentIntegration(
  defaults?: SanityImageComponentDefaults,
): AstroIntegration {
  const resolvedDefaults = defaults ?? defaultSanityImageComponentDefaults;
  return {
    name: "@otterstack/sanity-img-astro/integration",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        injectScript(
          "page-ssr",
          `
          import $_sic_urlBuilder from "@sanity/image-url";
          import { sanityClient as $_sic_sanityClient } from "sanity:client";
          import { setSanityImageComponentDefaults as $_sic_setSanityImageComponentDefaults } from "@otterstack/sanity-img-astro";
          {
            const imageUrlBuilder = $_sic_urlBuilder($_sic_sanityClient);
            $_sic_setSanityImageComponentDefaults({...${JSON.stringify(
              resolvedDefaults,
            )}, imageUrlBuilder });
          }
        `,
        );
      },
    },
  };
}
