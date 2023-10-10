import { SvelteComponent } from "svelte";
import type { SanityImageProps } from "@sanity-image-component/lib/dist/types";
import type { HTMLImgAttributes } from "svelte/elements";

//Tweaked version of the automatic build output, with props done up nicely
//since I couldn't figure out how to add typed restprops automatically
declare const __propDef: {
  props: {
    [x: string]: any;
  } & SanityImageProps &
    Omit<HTMLImgAttributes, "src">;
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<
  ComponentProps,
  ComponentEvents,
  ComponentSlots
> {}
export {};
