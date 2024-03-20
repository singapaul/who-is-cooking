import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component, b as each } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formattedDate;
  let { dish } = $$props;
  let { chef } = $$props;
  let { photoURL } = $$props;
  let { cost } = $$props;
  let { createdAt } = $$props;
  let { link } = $$props;
  if ($$props.dish === void 0 && $$bindings.dish && dish !== void 0)
    $$bindings.dish(dish);
  if ($$props.chef === void 0 && $$bindings.chef && chef !== void 0)
    $$bindings.chef(chef);
  if ($$props.photoURL === void 0 && $$bindings.photoURL && photoURL !== void 0)
    $$bindings.photoURL(photoURL);
  if ($$props.cost === void 0 && $$bindings.cost && cost !== void 0)
    $$bindings.cost(cost);
  if ($$props.createdAt === void 0 && $$bindings.createdAt && createdAt !== void 0)
    $$bindings.createdAt(createdAt);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  formattedDate = new Date(createdAt.seconds * 1e3).toDateString();
  return `<div class="card h-96 w-96 border-2 border-white bg-base-100 shadow-xl"><figure class=""><img${add_attribute("src", photoURL, 0)}${add_attribute("alt", dish, 0)} class="object-fill"></figure> <div class="card-body"><h2 class="card-title">${escape(dish)}</h2> <p>${escape(formattedDate)}</p> <div class="card-actions flex items-center justify-between"><div><div class="badge badge-outline">${escape(chef)}</div> <div class="badge badge-outline">£${escape(cost)}</div></div> <button class="btn btn-primary" data-svelte-h="svelte-gh4vsz">See dish</button></div></div></div>`;
});
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="mx-auto mb-5 mt-10 grid w-fit grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-20 md:grid-cols-2 lg:grid-cols-3">${slots.default ? slots.default({}) : ``}</main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
    default: () => {
      return `${each(data.typed, (item) => {
        return `${validate_component(Card, "Card").$$render(
          $$result,
          {
            createdAt: item.createdAt,
            chef: item.chef,
            cost: item.cost,
            dish: item.dish,
            photoURL: item.photoURL,
            link: item.id
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}`;
});
export {
  Page as default
};
