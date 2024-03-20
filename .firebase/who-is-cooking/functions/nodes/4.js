import * as universal from '../entries/pages/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/4.CkU_rDd3.js","_app/immutable/chunks/firebase.Bwij6Kdv.js","_app/immutable/chunks/index.Drio3CKC.js","_app/immutable/chunks/scheduler.CxO4csHG.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/index.BqBZE8_s.js","_app/immutable/chunks/AuthCheck.hDg632WA.js","_app/immutable/chunks/index.ChZz6XMy.js","_app/immutable/chunks/index.CvmYViMX.js","_app/immutable/chunks/each.DLoRWcad.js","_app/immutable/chunks/Confetti.wDXda6tx.js"];
export const stylesheets = ["_app/immutable/assets/4.C4Zo4Wac.css","_app/immutable/assets/Confetti.U9jond_5.css"];
export const fonts = [];
