import { d as a, w as c } from './index.Drio3CKC.js';
function d(m) {
	const r = c([]);
	function e(t, n = 'default', o) {
		r.update((i) => [...i, { id: f(), type: n, message: t, timeout: o }]);
	}
	const u = a(r, (t, n) => {
			if ((n(t), t.length > 0)) {
				const o = setTimeout(() => {
					r.update((i) => (i.shift(), i));
				}, t[0].timeout);
				return () => {
					clearTimeout(o);
				};
			}
		}),
		{ subscribe: s } = u;
	return {
		subscribe: s,
		send: e,
		default: (t, n) => e(t, 'default', n),
		danger: (t, n) => e(t, 'danger', n),
		warning: (t, n) => e(t, 'warning', n),
		info: (t, n) => e(t, 'info', n),
		success: (t, n) => e(t, 'success', n)
	};
}
function f() {
	return '_' + Math.random().toString(36).substr(2, 9);
}
const l = d();
export { l as n };
