import { defineConfig } from "astro/config";
import sanityIntegration from "@sanity/astro";
// https://astro.build/config

export default defineConfig({
  integrations: [
    sanityIntegration({
      //Otterdev site project
      projectId: "vfvqs8md",
      dataset: "production",
      useCdn: true,
    }),
  ],
});
