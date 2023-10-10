import type { Plugin } from "vite";

const virtualModuleId = "sanity-image-component:builder";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

export function vitePluginSanityImageComponentBuilder(): Plugin {
  return {
    name: "sanity-image-component:builder",
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      //Try to leverage the sanityClient set by astro-sanity integration if it exists, to create our url builder
      if (id === resolvedVirtualModuleId) {
        return `
          import urlBuilder from "@sanity/image-url";
          let imageUrlBuilder
          try {
            const { sanityClient } = await import("sanity:client");
            imageUrlBuilder = urlBuilder(sanityClient);
          } catch (e) {
            console.error('unable to load sanity client', e);
          }
         export { imageUrlBuilder }; 
        `;
      }
    },
  };
}
