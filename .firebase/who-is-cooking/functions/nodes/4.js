import * as universal from '../entries/pages/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/4.BCuNEZc1.js","_app/immutable/chunks/firebase.BUt1Xfaa.js","_app/immutable/chunks/index.BVPszMDO.js","_app/immutable/chunks/scheduler.BNDlRAw_.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/index.DcAR09LG.js","_app/immutable/chunks/AuthCheck.D8zVI9l6.js","_app/immutable/chunks/index.DxcZJrZ4.js","_app/immutable/chunks/index.CvmYViMX.js","_app/immutable/chunks/each.DgYVpzoy.js","_app/immutable/chunks/Confetti.DCjyToyd.js"];
export const stylesheets = ["_app/immutable/assets/4.C4Zo4Wac.css","_app/immutable/assets/Confetti.U9jond_5.css"];
export const fonts = [];
