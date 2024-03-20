import { s as subscribe } from "./utils.js";
import { c as create_ssr_component } from "./ssr.js";
import { a as user } from "./firebase.js";
const AuthCheck = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `${$user ? `${slots.default ? slots.default({}) : ``}` : `<main class="flex h-screen w-full flex-col items-center justify-center gap-4 self-center" data-svelte-h="svelte-rjc12x"><h1>You must be signed in to view this page</h1> <a class="btn btn-primary" href="/login">Sign in</a></main>`}`;
});
export {
  AuthCheck as A
};
