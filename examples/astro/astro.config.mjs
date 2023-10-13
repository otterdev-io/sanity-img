import { defineConfig } from "astro/config";
import sanityIntegration from "@sanity/astro";
import svelte from "@astrojs/svelte";
import { sanityImgIntegration } from "@otterstack/sanity-img-astro/integration";
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
    sanityImgIntegration({ options: { auto: "format" } }),
  ],
});
