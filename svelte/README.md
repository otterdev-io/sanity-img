# @otterstack/sanity-img-svelte

A svelte framework components for rendering responsive `<img>` elements for images fetched from [Sanity](https://www.sanity.io). It will generate the elements with a srcset optimised for a range of resolutions and formats, using sanity's image API to serve the optimised images. Then you provide the `sizes` attribute, to ensure the browser delivers the ideal source. Refer to [Responsive images - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for information on providing responsive images.

Then usage can be as simple as:

```svelte
<script>
  import SanityImg from "@otterstack/sanity-img-svelte"
</script>
---
   <SanityImg
    src={myImage}
    sizes="(min-width:768px) 50vw, 100vw"
  /> 
```

# Setup 

# Settings defaults
You will likely want to provide a default configuration for all your components, at least to provide an image url builder from your sanity client. For this, the function `setSanityImgDefaults` can be used. Defaults will be set across all components across all `@otterstack` packages: 

```ts
---
import { setSanityImgDefaults } from "@otterstack/sanity-img-svelte";

setSanityImgDefaults({ imageUrlBuilder: myImageUrlBuilder, options: {auto: "format" } })
---
``` 
## In astro
If using the svelte component in astro, you likely will want to set up the integration in `@otterstack/sanity-img-astro`. This will set a default image builder and other options, making using the component simpler. Refer to the README in that package for instructions.

# Usage
The key properties to provide for responsive images are:
  - `src`: Image from sanity data
  - `sizes`: Sizes string to allow browser to select ideal image from automatically generated srcset
  
```svelte
<script>
import SanityImg from "@otterstack/sanity-img-svelte"
</script>

   <SanityImg
    src={myImage}
    sizes="(min-width:768px) 50vw, 100vw"
  /> 
```

Additional properties are:
 - `imageUrlBuilder`: A Sanity Image url builder to use for this element. Only necessary if default is not set. Refer to `setting defaults` for how to set default.
 - `widths`: An array of widths to generate for srcset, or an autowidths struct `{ maxWidth: number; step: number; }` to inform the component how to generate sources up to the image's original size
 - `options`: Additional options to pass to image builder

Additionally, the component extends the `img` element, and can accept any other props that `img` does, eg `alt`:

```astro
   <SanityImg
    src={myImage}
    sizes="(min-width:768px) 50vw, 100vw"
    alt="My Image"
  /> 
```

# Fetching the image with groq
The component will work with images fetched with a simple `groq`  query without fetching any image metadata, eg

```ts
const query = groq`*[_id == 'homePage'][0] {
     ...etc,
     myBackgroundImage,
     ...etc,
  }`
```

However the tag is able to optimise itself more, such as setting width and height attributes to lower LCP, when the image metadata is fetched. To assist with this, you can use the `image` function:

```ts
import { image } from '@otterstack/sanity-img-svelte'

const query = groq`*[_id == 'homePage'][0] {
  ...etc,
  ${image('myBackgroundImage')},
  ...etc
}`
```
