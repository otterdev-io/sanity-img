import { defineConfig } from "astro/config";
import sanityIntegration from "@sanity/astro";
import svelte from "@astrojs/svelte";
import { sanityImageComponent } from "@sanity-image-component/astro/integration";
// https://astro.build/config

export default defineConfig({
  integrations: [
    svelte(),
    sanityIntegration({
      //Otterdev site project
      projectId: "vfvqs8md",
      dataset: "production",
      useCdn: true,
    }),
    sanityImageComponent({}),
  ],
});
