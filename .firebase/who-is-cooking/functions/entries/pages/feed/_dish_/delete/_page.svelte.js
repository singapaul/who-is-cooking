import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "firebase/firestore";
import { a as user } from "../../../../../chunks/firebase.js";
import "firebase/storage";
import "../../../../../chunks/client.js";
import { A as AuthCheck } from "../../../../../chunks/AuthCheck.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $$unsubscribe_user;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_page();
  $$unsubscribe_user();
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<section class="flex h-full w-full max-w-80 flex-col justify-center gap-10 self-center"><h1 class="text-center text-2xl font-bold" data-svelte-h="svelte-18g0lvl">Are you sure you want to delete this delicious dinner?</h1> <div class="flex flex-col justify-center gap-4"><button class="btn btn-primary" data-svelte-h="svelte-yrmgyy">Yes</button> <button class="btn btn-secondary" data-svelte-h="svelte-bsa1xz">No</button></div></section>`;
    }
  })}`;
});
export {
  Page as default
};
