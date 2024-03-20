import * as universal from '../entries/pages/feed/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/feed/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/feed/+page.ts";
export const imports = ["_app/immutable/nodes/5.BTvxSQ5V.js","_app/immutable/chunks/firebase.BUt1Xfaa.js","_app/immutable/chunks/index.BVPszMDO.js","_app/immutable/chunks/scheduler.BNDlRAw_.js","_app/immutable/chunks/index.DcAR09LG.js","_app/immutable/chunks/each.DgYVpzoy.js","_app/immutable/chunks/entry.CsvIKO-1.js","_app/immutable/chunks/control.CYgJF_JY.js"];
export const stylesheets = [];
export const fonts = [];
