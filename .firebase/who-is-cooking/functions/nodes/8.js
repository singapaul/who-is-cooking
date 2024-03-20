import * as universal from '../entries/pages/feed/_dish_/edit/_page.ts.js';

export const index = 8;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/feed/_dish_/edit/_page.svelte.js')).default);
export { universal };
export const universal_id = 'src/routes/feed/[dish]/edit/+page.ts';
export const imports = [
	'_app/immutable/nodes/8.DsfeqcOL.js',
	'_app/immutable/chunks/firebase.BXW4q-2E.js',
	'_app/immutable/chunks/index.Drio3CKC.js',
	'_app/immutable/chunks/scheduler.CxO4csHG.js',
	'_app/immutable/chunks/index.BqBZE8_s.js',
	'_app/immutable/chunks/CurrencyInput.DRDzj19Z.js',
	'_app/immutable/chunks/AuthCheck.CwOMPwgQ.js',
	'_app/immutable/chunks/stores.BBkUZuCL.js',
	'_app/immutable/chunks/entry.vAAbogbC.js',
	'_app/immutable/chunks/control.CYgJF_JY.js'
];
export const stylesheets = [
	'_app/immutable/assets/12.Q73fWxTQ.css',
	'_app/immutable/assets/CurrencyInput.CIDFhpU1.css'
];
export const fonts = [];
