import { c as create_ssr_component } from '../../../chunks/ssr.js';
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<main class="flex w-full flex-col justify-center self-center">${slots.default ? slots.default({}) : ``}</main>`;
});
export { Layout as default };
