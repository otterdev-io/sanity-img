<script lang="ts">
  import {
    defaultSanityImageComponentDefaults,
    componentProps,
    type SanityImageProps,
  } from "@sanity-image-component/lib";

  import type { HTMLImgAttributes } from "svelte/elements";

  type $$Props = SanityImageProps & Omit<HTMLImgAttributes, "src">;

  //Max default allows for 1920px width @ 2x
  const defaults = (globalThis.sanityImageComponentDefaults ??=
    defaultSanityImageComponentDefaults);

  export let imageUrlBuilder: SanityImageProps["imageUrlBuilder"] =
    defaults.imageUrlBuilder;

  export let src: SanityImageProps["src"];
  export let widths: NonNullable<SanityImageProps["widths"]> =
    defaults.autoWidths;
  export let options: NonNullable<SanityImageProps["options"]> =
    defaults.options;

  //Weird forcing it at the end, but magic svelte syntax prevents the undefined from disappearing naturally
  $: builder = imageUrlBuilder?.image(src).withOptions(options)!;

  $: if (!builder) {
    throw new Error("No image url builder specified, and no default set!");
  }

  $: props = componentProps({
    imageUrlBuilder: builder,
    widths,
    src,
    options,
  });
</script>

<!-- alt tag will come from restprops -->
<!-- svelte-ignore a11y-missing-attribute -->
<img
  srcset={props.srcset}
  src={builder.url()}
  width={props.width}
  height={props.height}
  {...$$restProps}
/>
