# otterstack - sanity-img
An set of js framework components for rendering responsive `<img>` elements for images fetched from [Sanity](https://www.sanity.io). They will generate the elements with a srcset optimised for a range of resolutions and formats, using sanity's image API to serve the optimised images. Then you provide the `sizes` attribute, to ensure the browser delivers the ideal source. Refer to [Responsive images - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for information on providing responsive images.

Then usage can be as simple as:

```astro
---
import SanityImg from "@otterstack/sanity-img-astro"
---
   <SanityImg
    src={myImage}
    sizes="(min-width:768px) 50vw, 100vw"
  /> 
```

Refer to the readme file in each package for specific usage instructions in the relevant framework:
- [Astro](https://github.com/otterdev-io/otterstack/tree/main/astro#readme)
- [Svelte](https://github.com/otterdev-io/otterstack/tree/main/svelte#readme)

There is a sample project demonstrating its use in astro, with astro and svelte components, in the `examples/astro` directory.
