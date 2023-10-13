import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import svelte from "@astrojs/svelte";
import sanityImg from "@otterstack/sanity-img-astro/integration";
// https://astro.build/config

export default defineConfig({
  integrations: [
    svelte(),
    sanity({
      //Otterdev site project
      projectId: "vfvqs8md",
      dataset: "production",
      useCdn: true,
    }),
    sanityImg({ options: { auto: "format" } }),
  ],
});
