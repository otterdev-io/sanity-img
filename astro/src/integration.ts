import type { AstroIntegration } from "astro";
import { defaultSanityImageComponentDefaults } from "../../lib/dist/defaults";
import { vitePluginSanityImageComponentBuilder } from "./vite-plugin";
import type { SanityImageComponentDefaults } from "../../lib/dist/types";

export function sanityImageComponent(
  defaults?: SanityImageComponentDefaults,
): AstroIntegration {
  const resolvedDefaults = defaults ?? defaultSanityImageComponentDefaults;
  return {
    name: "@sanity-image-component/astro/integration",
    hooks: {
      "astro:config:setup": ({ injectScript, updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [vitePluginSanityImageComponentBuilder()],
          },
        });
        injectScript(
          "page-ssr",
          `
        import { imageUrlBuilder } from "sanity-image-component:builder";
        globalThis.sanityImageComponentDefaults = {...${JSON.stringify(
          resolvedDefaults,
        )}, imageUrlBuilder };
        `,
        );
      },
    },
  };
}
