import type { AstroIntegration } from "astro";
import {
  defaultSanityImageComponentDefaults,
  type SanityImageComponentDefaults,
} from "@sanity-image-component/lib";

export function sanityImageComponentIntegration(
  defaults?: SanityImageComponentDefaults,
): AstroIntegration {
  const resolvedDefaults = defaults ?? defaultSanityImageComponentDefaults;
  return {
    name: "@sanity-image-component/astro/integration",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        injectScript(
          "page-ssr",
          `
          import $_sic_urlBuilder from "@sanity/image-url";
          import { sanityClient as $_sic_sanityClient } from "sanity:client";
          import { setSanityImageComponentDefaults as $_sic_setSanityImageComponentDefaults } from "@sanity-image-component/astro";
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
