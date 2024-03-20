import * as universal from '../entries/pages/feed/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/feed/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/feed/+page.ts";
export const imports = ["_app/immutable/nodes/5.DbNDR-XN.js","_app/immutable/chunks/firebase.BXW4q-2E.js","_app/immutable/chunks/index.Drio3CKC.js","_app/immutable/chunks/scheduler.CxO4csHG.js","_app/immutable/chunks/index.BqBZE8_s.js","_app/immutable/chunks/each.DLoRWcad.js","_app/immutable/chunks/entry.vAAbogbC.js","_app/immutable/chunks/control.CYgJF_JY.js"];
export const stylesheets = [];
export const fonts = [];
