# sanity-image-component
An set of js framework components for rendering responsive `<img>` elements for images fetched from [Sanity](https://www.sanity.io). They will generate the elements with a srcset optimised for a range of resolutions and formats, using sanity's image API to serve the optimised images. Then you provide the `sizes` attribute, to ensure the browser delivers the ideal source. Refer to [Responsive images - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for information on providing responsive images.

Then usage can be as simple as:

```astro
---
import SanityImg from "@sanity-image-component/astro"
---
   <SanityImg
    src={myImage}
    sizes="(min-width:768px) 50vw, 100vw"
  /> 
```

Refer to the readme file in each package for specific usage instructions in the relevant framework:
- [Astro](https://github.com/otterdev-io/sanity-image-component/tree/main/astro#readme)
- [Svelte](https://github.com/otterdev-io/sanity-image-component/tree/main/svelte#readme)

There is a sample project demonstrating its use in astro, with astro and svelte components, in the `examples/astro` directory.

# General Usage

## Fetching the image with groq
The component will work with images fetched with a simple `groq`  query without fetching any image metadata, eg

```ts
const query = groq`*[_id == 'homePage'][0] {
     ...etc,
     myBackgroundImage,
     ...etc,
  }`
```

However the tag is able to optimise itself more when the image metadata is fetched. To assist with this, you can use the `image` function, exported from the component package, or from `@sanity-image-component/lib`:

```ts
import { image } from '@sanity-image-component/lib'

const query = groq`*[_id == 'homePage'][0] {
  ...etc,
  ${image('myBackgroundImage')},
  ...etc
}`
```
