<script lang="ts">
  import {
    defaultSanityImgDefaults,
    componentProps,
    type SanityImageProps,
    type ComponentProps,
  } from "@otterstack/sanity-img-lib";

  import type { HTMLImgAttributes } from "svelte/elements";

  type $$Props = SanityImageProps & Omit<HTMLImgAttributes, "src">;

  //Max default allows for 1920px width @ 2x
  const defaults = (globalThis.sanityImgDefaults ??= defaultSanityImgDefaults);

  export let imageUrlBuilder: SanityImageProps["imageUrlBuilder"] =
    defaults.imageUrlBuilder;

  export let src: SanityImageProps["src"];
  export let widths: NonNullable<SanityImageProps["widths"]> = defaults.widths;
  export let options: NonNullable<SanityImageProps["options"]> =
    defaults.options;

  let props: ComponentProps;
  let imgProps: Omit<HTMLImgAttributes, "src" | "width" | "height">;

  $: {
    if (!imageUrlBuilder) {
      throw new Error("No image url builder specified, and no default set!");
    }

    const { width, height, ...rest } = $$restProps;
    imgProps = rest;

    props = componentProps({
      imageUrlBuilder,
      widths,
      width,
      height,
      src,
      options,
    });
  }
</script>

<!-- alt tag will come from restprops -->
<!-- svelte-ignore a11y-missing-attribute -->
<img
  srcset={props.srcset}
  src={props.src}
  width={props.width}
  height={props.height}
  {...imgProps}
/>
