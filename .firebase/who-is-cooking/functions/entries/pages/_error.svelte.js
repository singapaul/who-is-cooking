import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component, e as escape, a as add_attribute } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<main class="w-screen h-screen flex flex-col items-center justify-center gap-4"><h1 class="text-2xl">BOSH YOU&#39;VE HIT A ${escape($page.status)}: ${escape($page.error?.message)}</h1> <img class="max-w-48"${add_attribute("src", "/bosh-big-john.gif", 0)}></main>`;
});
export {
  Error as default
};
