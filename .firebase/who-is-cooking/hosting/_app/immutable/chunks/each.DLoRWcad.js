import { t as z, a as B } from './index.BqBZE8_s.js';
import { r as C } from './scheduler.CxO4csHG.js';
function G(n) {
	return (n == null ? void 0 : n.length) !== void 0 ? n : Array.from(n);
}
function D(n, d) {
	B(n, 1, 1, () => {
		d.delete(n.key);
	});
}
function H(n, d) {
	n.f(), D(n, d);
}
function I(n, d, x, S, A, g, h, j, p, k, u, q) {
	let i = n.length,
		c = g.length,
		f = i;
	const w = {};
	for (; f--; ) w[n[f].key] = f;
	const o = [],
		a = new Map(),
		m = new Map(),
		_ = [];
	for (f = c; f--; ) {
		const e = q(A, g, f),
			s = x(e);
		let t = h.get(s);
		t ? S && _.push(() => t.p(e, d)) : ((t = k(s, e)), t.c()),
			a.set(s, (o[f] = t)),
			s in w && m.set(s, Math.abs(f - w[s]));
	}
	const M = new Set(),
		v = new Set();
	function y(e) {
		z(e, 1), e.m(j, u), h.set(e.key, e), (u = e.first), c--;
	}
	for (; i && c; ) {
		const e = o[c - 1],
			s = n[i - 1],
			t = e.key,
			l = s.key;
		e === s
			? ((u = e.first), i--, c--)
			: a.has(l)
				? !h.has(t) || M.has(t)
					? y(e)
					: v.has(l)
						? i--
						: m.get(t) > m.get(l)
							? (v.add(t), y(e))
							: (M.add(l), i--)
				: (p(s, h), i--);
	}
	for (; i--; ) {
		const e = n[i];
		a.has(e.key) || p(e, h);
	}
	for (; c; ) y(o[c - 1]);
	return C(_), o;
}
export { G as e, H as f, I as u };
