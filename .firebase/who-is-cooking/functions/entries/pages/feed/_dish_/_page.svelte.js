import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import "firebase/firestore";
import { a as user } from "../../../../chunks/firebase.js";
import { w as writable } from "../../../../chunks/index2.js";
import "../../../../chunks/client.js";
import { p as page } from "../../../../chunks/stores.js";
import { C as Confetti } from "../../../../chunks/Confetti.js";
import "../../../../chunks/notifications.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let meal;
  let $user, $$unsubscribe_user;
  let $$unsubscribe_page;
  let $subscribeToLikes, $$unsubscribe_subscribeToLikes;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  const subscribeToLikes = writable([]);
  $$unsubscribe_subscribeToLikes = subscribe(subscribeToLikes, (value) => $subscribeToLikes = value);
  let userLikesMeal = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  meal = data;
  {
    if (data && data.likedBy) {
      subscribeToLikes.set(data.likedBy);
    }
  }
  userLikesMeal = $subscribeToLikes.includes($user?.uid);
  $$unsubscribe_user();
  $$unsubscribe_page();
  $$unsubscribe_subscribeToLikes();
  return `<section class="m-auto flex h-full w-full"><div class="card m-auto max-h-[700px] max-w-96 border-4 border-indigo-600 bg-base-100 shadow-xl sm:max-w-[700px] sm:flex-row"><figure class="sm:w-1/2"><img${add_attribute("src", meal.photoURL, 0)}${add_attribute("alt", meal.dish, 0)}></figure> <div><div class="card-body"><div class="flex flex-col justify-between"><h2 class="card-title">${escape(meal.dish)}</h2></div> <p>${escape(meal.recipe)}</p> <div class="card-actions justify-between">${userLikesMeal ? `<div class="badge" data-svelte-h="svelte-1awhxb7">❤️</div> ${validate_component(Confetti, "Confetti").$$render($$result, {}, {}, {})} ${validate_component(Confetti, "Confetti").$$render($$result, {}, {}, {})} ${validate_component(Confetti, "Confetti").$$render($$result, {}, {}, {})}` : ``} <div class="ml-auto"><div class="badge badge-outline">${escape(meal.chef)}</div> <div class="badge badge-outline">£${escape(meal.cost)}</div></div></div></div> <div class="card-body flex w-full flex-col justify-evenly gap-4"><button class="btn btn-accent w-full">${escape(userLikesMeal ? "Un-favourite" : "Favourite")}</button> <button class="btn btn-secondary w-full" data-svelte-h="svelte-pk2ezz">Edit</button> <button class="btn btn-warning w-full" data-svelte-h="svelte-froue5">Delete</button></div></div></div></section>`;
});
export {
  Page as default
};
