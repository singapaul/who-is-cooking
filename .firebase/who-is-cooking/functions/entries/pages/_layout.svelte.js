import { s as subscribe, n as null_to_empty } from "../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, e as escape, b as each, v as validate_component } from "../../chunks/ssr.js";
import { u as userData, a as user } from "../../chunks/firebase.js";
import "firebase/auth";
import "../../chunks/client.js";
import { p as page } from "../../chunks/stores.js";
import { n as notifications } from "../../chunks/notifications.js";
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let homeNav;
  let feedNav;
  let $page, $$unsubscribe_page;
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  let { siteName = "placeholder" } = $$props;
  if ($$props.siteName === void 0 && $$bindings.siteName && siteName !== void 0)
    $$bindings.siteName(siteName);
  homeNav = $page.route.id === "/";
  feedNav = $page.route.id === "/feed";
  $$unsubscribe_page();
  $$unsubscribe_userData();
  return `<div class="navbar bg-base-100"><div class="flex-1"><a${add_attribute("href", feedNav ? "/new-meal" : "/feed", 0)} class="btn btn-secondary">${escape(feedNav ? "Post new meal" : "Feed")}</a></div> <div class="flex flex-row gap-4"><a${add_attribute("href", homeNav ? "/new-meal" : "/", 0)} class="btn btn-primary">${escape(homeNav ? "Post New Meal" : "Cooking Rota")}</a> <div class="dropdown dropdown-end"><div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost"><div class="w-10 rounded-full"><img alt="Tailwind CSS Navbar component"${add_attribute("src", $userData?.photoURL, 0)}></div></div>  <ul tabindex="0" class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"><li data-svelte-h="svelte-p3sohh"> <a href="/profile" class="justify-between">Profile</a></li>  <li><button data-svelte-h="svelte-ktsy4a">Logout</button></li></ul></div></div></div>`;
});
const css = {
  code: ".notifications.svelte-1qswa34{position:absolute;top:50px;bottom:0px;left:0;right:0;margin:0 auto;padding:0;z-index:9999;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;pointer-events:none}.toast.svelte-1qswa34{flex:0 0 auto;margin-bottom:10px}.content.svelte-1qswa34{padding:10px;display:block;color:white;font-weight:500}",
  map: null
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  let { themes = {
    danger: "#E26D69",
    success: "#84C991",
    warning: "#f0ad4e",
    info: "#5bc0de",
    default: "#aaaaaa"
  } } = $$props;
  if ($$props.themes === void 0 && $$bindings.themes && themes !== void 0)
    $$bindings.themes(themes);
  $$result.css.add(css);
  $$unsubscribe_notifications();
  return `<div class="notifications svelte-1qswa34">${each($notifications, (notification) => {
    return `<div class="toast svelte-1qswa34" style="${"background: " + escape(themes[notification.type], true) + ";"}"><div class="content svelte-1qswa34">${escape(notification.message)}</div> ${notification.icon ? `<i class="${escape(null_to_empty(notification.icon), true) + " svelte-1qswa34"}"></i>` : ``} </div>`;
  })} </div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `<div class="flex h-screen flex-col overflow-y-scroll">${$user ? `${validate_component(NavBar, "NavBar").$$render($$result, { siteName: "Cooking Order" }, {}, {})}` : ``} ${slots.default ? slots.default({}) : ``} ${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
