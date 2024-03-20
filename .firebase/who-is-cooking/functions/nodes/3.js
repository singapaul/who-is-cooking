

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/new-meal/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.C11oPSEt.js","_app/immutable/chunks/scheduler.BNDlRAw_.js","_app/immutable/chunks/index.DcAR09LG.js"];
export const stylesheets = [];
export const fonts = [];
