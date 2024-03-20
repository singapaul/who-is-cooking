import { s as subscribe, g as get_store_value } from "../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores.js";
import { w as writable, r as readable } from "../../../chunks/index2.js";
import { n as navProgress } from "../../../chunks/nav.js";
const AnimatedRoute = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
const stores = {};
function localStorageStore(key, initialValue, options) {
  options?.serializer ?? JSON;
  options?.storage ?? "local";
  if (!stores[key]) {
    const store = writable(initialValue, (set2) => {
    });
    const { subscribe: subscribe2, set } = store;
    stores[key] = {
      set(value) {
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        set(value);
      },
      subscribe: subscribe2
    };
  }
  return stores[key];
}
localStorageStore("modeOsPrefers", false);
localStorageStore("modeUserPrefers", void 0);
localStorageStore("modeCurrent", false);
function prefersReducedMotion() {
  return false;
}
readable(prefersReducedMotion(), (set) => {
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navProgress, $$unsubscribe_navProgress;
  $$unsubscribe_navProgress = subscribe(navProgress, (value) => $navProgress = value);
  $$unsubscribe_navProgress();
  return `<div class="flex min-h-screen flex-col"> <progress class="progress w-full"${add_attribute("value", $navProgress, 0)} max="99"></progress> ${validate_component(AnimatedRoute, "AnimatedRoute").$$render($$result, {}, {}, {
    default: () => {
      return `<main class="card mx-auto w-4/6 bg-neutral text-neutral-content"><div class="card-body items-center text-center">${slots.default ? slots.default({}) : ``}</div></main>`;
    }
  })}</div>`;
});
export {
  Layout as default
};
