import * as universal from '../entries/pages/feed/_dish_/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/feed/_dish_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/feed/[dish]/+page.ts";
export const imports = ["_app/immutable/nodes/6.BtFXZIAo.js","_app/immutable/chunks/firebase.BUt1Xfaa.js","_app/immutable/chunks/index.BVPszMDO.js","_app/immutable/chunks/scheduler.BNDlRAw_.js","_app/immutable/chunks/index.DcAR09LG.js","_app/immutable/chunks/entry.CsvIKO-1.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/stores.pdfddIk7.js","_app/immutable/chunks/Confetti.DCjyToyd.js","_app/immutable/chunks/each.DgYVpzoy.js","_app/immutable/chunks/notifications.oe9fYpEa.js"];
export const stylesheets = ["_app/immutable/assets/Confetti.U9jond_5.css"];
export const fonts = [];
