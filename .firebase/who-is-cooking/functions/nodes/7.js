export const index = 7;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/feed/_dish_/delete/_page.svelte.js'))
		.default);
export const imports = [
	'_app/immutable/nodes/7.BaQZJd8r.js',
	'_app/immutable/chunks/scheduler.CxO4csHG.js',
	'_app/immutable/chunks/index.BqBZE8_s.js',
	'_app/immutable/chunks/stores.BBkUZuCL.js',
	'_app/immutable/chunks/entry.vAAbogbC.js',
	'_app/immutable/chunks/index.Drio3CKC.js',
	'_app/immutable/chunks/control.CYgJF_JY.js',
	'_app/immutable/chunks/firebase.BXW4q-2E.js',
	'_app/immutable/chunks/AuthCheck.CwOMPwgQ.js'
];
export const stylesheets = [];
export const fonts = [];
