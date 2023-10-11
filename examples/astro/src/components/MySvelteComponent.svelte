<script lang="ts">
  import SanityImg from "@sanity-image-component/svelte";
  import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
  export let imageSrc: SanityImageSource;
</script>

<div>
  <h2>My Svelte component</h2>
  <SanityImg src={imageSrc} sizes="(min-width: 1024px) 500w, 200w" />
</div>
