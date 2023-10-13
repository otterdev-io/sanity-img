# @otterstack/sanity-img-astro

Successor to astro-sanity-picture.

An astro framework component for rendering responsive `<img>` elements for images fetched from [Sanity](https://www.sanity.io). It will generate the elements with a srcset optimised for a range of resolutions and formats, using sanity's image API to serve the optimised images. Then you provide the `sizes` attribute, to ensure the browser delivers the ideal source. Refer to [Responsive images - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for information on providing responsive images.

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

# Setup
Using the astro integration is optional. If used though, it will link it to the @sanity/astro addon so that you no longer need to specify an imageUrlBuilder, and also allow you to override default options.

First import it:
```ts
import { sanityImageComponent } from "@otterstack/sanity-img-astro/integration";
```

and add it to `astro.config.mjs` after the sanity integration:

```ts
import { defineConfig } from "astro/config";
import sanityIntegration from "@sanity/astro";
import svelte from "@astrojs/svelte";
import { sanityImageComponent } from "@otterstack/sanity-img-astro/integration";
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
    sanityImageComponent({auto: 'format'}),
  ],
});
``` 

# Usage
The key properties to provide for responsive images are:
  - `src`: Image from sanity data
  - `sizes`: Sizes string to allow browser to select ideal image from automatically generated srcset
  
```astro
---
import SanityImg from "@otterstack/sanity-img-astro"
---
   <SanityImg
    src={myImage}
    sizes="(min-width:768px) 50vw, 100vw"
  /> 
```

Additional properties are:
 - `imageUrlBuilder`: A Sanity Image url builder to use for this element. Only necessary if sanity integration is not used, and default is not set otherwise. Refer to `setting defaults` for how to set default.
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

However the tag is able to optimise itself more when the image metadata is fetched. To assist with this, you can use the `image` function.

```ts
import { image } from '@otterstack/sanity-img-astro'

const query = groq`*[_id == 'homePage'][0] {
  ...etc,
  ${image('myBackgroundImage')},
  ...etc
}`
```

# Setting defaults for all components
As noted before, defaults can be provided with the astro integration, otherwise the function `setSanityImageComponentDefaults` can be used. Defaults will be set across all components across all `@otterstack` packages: 

```ts
---
import { setSanityImageComponentDefaults } from "@otterstack/sanity-img-astro";

setSanityImageComponentDefaults({ imageUrlBuilder: myImageUrlBuilder, options: {auto: "format" } })
---
```
