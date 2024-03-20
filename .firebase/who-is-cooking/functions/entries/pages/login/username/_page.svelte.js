import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, e as escape, a as add_attribute } from "../../../../chunks/ssr.js";
import { n as navProgress } from "../../../../chunks/nav.js";
import { A as AuthCheck } from "../../../../chunks/AuthCheck.js";
import { a as user, u as userData } from "../../../../chunks/firebase.js";
import "firebase/firestore";
const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isValid;
  let isTouched;
  let isTaken;
  let $$unsubscribe_user;
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  navProgress.set(66);
  let username = "";
  let loading = false;
  let isAvailable = false;
  isValid = username?.length > 2 && username.length < 16 && re.test(username);
  isTouched = username.length > 0;
  isTaken = isValid && !isAvailable && !loading;
  $$unsubscribe_user();
  $$unsubscribe_userData();
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `${$userData?.username ? `<p>Your username is <span>@${escape($userData.username)}</span></p> <p data-svelte-h="svelte-jxf608">(usernames cannot be changed)</p> <a href="/login/photo" data-svelte-h="svelte-3oiklz">Upload Profile</a>` : `<form class="w-2/5"><input type="text" placeholder="Username" class="${[
        "input w-full",
        (!isValid && isTouched ? "input-error" : "") + " " + (isTaken ? "input-warning" : "") + " "
      ].join(" ").trim()}"${add_attribute("value", username, 0)}> <div class="my-4 min-h-16 w-full px-8">${``} ${!isValid && isTouched ? `<p class="text-sm text-error" data-svelte-h="svelte-md31px">must be 3-16 characters long, alphanumeric only</p>` : ``} ${isValid && !isAvailable && !loading ? `<p class="text-sm text-warning">@${escape(username)} is not available</p>` : ``} ${``}</div></form>`}`;
    }
  })}`;
});
export {
  Page as default
};
