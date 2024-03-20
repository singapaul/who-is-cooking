import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<main class="flex h-full flex-col justify-center self-center" data-svelte-h="svelte-ywzxcf"><a href="/login/photo" class="btn btn-accent max-w-56">Update profile picture</a></main>`;
    }
  })}`;
});
export {
  Page as default
};
