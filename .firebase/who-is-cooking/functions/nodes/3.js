export const index = 3;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/new-meal/_layout.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/3.DNN-SSjk.js',
	'_app/immutable/chunks/scheduler.CxO4csHG.js',
	'_app/immutable/chunks/index.BqBZE8_s.js'
];
export const stylesheets = [];
export const fonts = [];
