import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component, d as createEventDispatcher, b as each, a as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { A as AuthCheck } from "../../chunks/AuthCheck.js";
import { r as rotor, a as user } from "../../chunks/firebase.js";
import "firebase/firestore";
import { C as Confetti } from "../../chunks/Confetti.js";
const css = {
  code: ".over.svelte-16x08xz{--tw-scale-x:1.05;--tw-scale-y:1.05;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;border-color:rgb(156 163 175 / var(--tw-border-opacity))\n}",
  map: null
};
const SortableList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { list } = $$props;
  let isOver = false;
  createEventDispatcher();
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  $$result.css.add(css);
  return `${list?.length ? `<ul class="flex list-none flex-col items-center p-0">${each(list, (item, index) => {
    return `<li class="${[
      "w-full max-w-md border-2 border-dashed border-transparent p-2 transition-all svelte-16x08xz",
      item.id === isOver ? "over" : ""
    ].join(" ").trim()}"${add_attribute("data-index", index, 0)}${add_attribute("data-id", item.id, 0)} draggable="true">${slots.default ? slots.default({ item, index }) : ``} </li>`;
  })}</ul>` : `<p class="my-12 text-center text-lg font-bold" data-svelte-h="svelte-1ideuqf">No items</p>`}`;
});
const ChefLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sparkles;
  let { name = "placeholder" } = $$props;
  let { index } = $$props;
  let { handleCheck } = $$props;
  let { checkedStatus } = $$props;
  let { id } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.handleCheck === void 0 && $$bindings.handleCheck && handleCheck !== void 0)
    $$bindings.handleCheck(handleCheck);
  if ($$props.checkedStatus === void 0 && $$bindings.checkedStatus && checkedStatus !== void 0)
    $$bindings.checkedStatus(checkedStatus);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  sparkles = checkedStatus;
  return ` <a${add_attribute("class", `not-prose stack flex w-full min-w-80 max-w-md items-center justify-center rounded-lg bg-base-300 p-4 text-center no-underline border ${checkedStatus ? "border-green-500" : "border-white"}`, 0)}><p class="text-2xl font-bold">${escape(name)}</p> <div class="form-control"><label class="label cursor-pointer"><span class="label-text" data-svelte-h="svelte-1hpt7xr">Cooked/ Unavailable</span> <input type="checkbox" ${checkedStatus ? "checked" : ""} class="checkbox-primary checkbox"> ${sparkles ? `${validate_component(Confetti, "Confetti").$$render($$result, {}, {}, {})}` : ``}</label></div></a>`;
});
async function handleStatus(event, id) {
  console.log(event, id);
  console.log(id);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $rotor, $$unsubscribe_rotor;
  let $$unsubscribe_user;
  $$unsubscribe_rotor = subscribe(rotor, (value) => $rotor = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_rotor();
  $$unsubscribe_user();
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `<main class="m-auto mx-auto flex max-w-xl flex-col items-center gap-6 py-9"><h1 class="text-2xl font-bold" data-svelte-h="svelte-1y66r94">Cooking Rota</h1> ${validate_component(SortableList, "SortableList").$$render($$result, { list: $rotor.Order }, {}, {
        default: ({ item, index }) => {
          return `<div class="group relative"> ${validate_component(ChefLink, "ChefLink").$$render(
            $$result,
            {
              id: item.id,
              name: item.name,
              index: index + 1,
              checkedStatus: item.cooked,
              handleCheck: handleStatus
            },
            {},
            {}
          )}</div>`;
        }
      })}  <button class="btn btn-accent w-full" data-svelte-h="svelte-1spidb8">Re-order rota</button></main>`;
    }
  })}`;
});
export {
  Page as default
};
