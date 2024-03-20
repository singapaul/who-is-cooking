import * as universal from '../entries/pages/feed/_dish_/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/feed/_dish_/_page.svelte.js')).default);
export { universal };
export const universal_id = 'src/routes/feed/[dish]/+page.ts';
export const imports = [
	'_app/immutable/nodes/6.BcUdd1yH.js',
	'_app/immutable/chunks/firebase.BXW4q-2E.js',
	'_app/immutable/chunks/index.Drio3CKC.js',
	'_app/immutable/chunks/scheduler.CxO4csHG.js',
	'_app/immutable/chunks/index.BqBZE8_s.js',
	'_app/immutable/chunks/entry.vAAbogbC.js',
	'_app/immutable/chunks/control.CYgJF_JY.js',
	'_app/immutable/chunks/stores.BBkUZuCL.js',
	'_app/immutable/chunks/Confetti.wDXda6tx.js',
	'_app/immutable/chunks/each.DLoRWcad.js',
	'_app/immutable/chunks/notifications.DHR35Uvq.js'
];
export const stylesheets = ['_app/immutable/assets/Confetti.U9jond_5.css'];
export const fonts = [];
