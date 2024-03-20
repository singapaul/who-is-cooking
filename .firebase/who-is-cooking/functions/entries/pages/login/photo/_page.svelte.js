import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, a as add_attribute } from "../../../../chunks/ssr.js";
import { n as navProgress } from "../../../../chunks/nav.js";
import { A as AuthCheck } from "../../../../chunks/AuthCheck.js";
import { a as user, u as userData } from "../../../../chunks/firebase.js";
import "firebase/firestore";
import "firebase/storage";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let href;
  let $$unsubscribe_user;
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  navProgress.set(99);
  href = `/`;
  $$unsubscribe_user();
  $$unsubscribe_userData();
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<h2 class="card-title" data-svelte-h="svelte-1whglfv">Upload a Profile Photo</h2> <form class="w-full max-w-screen-md"><div class="form-control mx-auto my-10 w-full max-w-xs text-center"><img${add_attribute("src", $userData?.photoURL ?? "/user.png", 0)} alt="photoURL" width="256" height="256" class="mx-auto"> <label for="photoURL" class="label" data-svelte-h="svelte-qouqa7"><span class="label-text">Pick a file</span></label> <input name="photoURL" type="file" class="file-input file-input-bordered w-full max-w-xs" accept="image/png, image/jpeg, image/gif, image/webp"> ${``}</div></form> <a${add_attribute("href", href, 0)} class="btn btn-primary">Finish</a>`;
    }
  })}`;
});
export {
  Page as default
};
