var q = Object.defineProperty;
var G = (t, e, n) =>
	e in t ? q(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (t[e] = n);
var z = (t, e, n) => (G(t, typeof e != 'symbol' ? e + '' : e, n), n);
import {
	n as v,
	R as H,
	f as V,
	S as J,
	r as O,
	D as P,
	O as k,
	T as K,
	E as B,
	U as N,
	b as Q,
	V as tt,
	W as et,
	X as nt,
	Y as st,
	Z as U,
	_ as it,
	$ as rt,
	a0 as at,
	a1 as ot,
	a2 as ft
} from './scheduler.CxO4csHG.js';
const F = typeof window < 'u';
let L = F ? () => window.performance.now() : () => Date.now(),
	I = F ? (t) => requestAnimationFrame(t) : v;
const x = new Set();
function T(t) {
	x.forEach((e) => {
		e.c(t) || (x.delete(e), e.f());
	}),
		x.size !== 0 && I(T);
}
function W(t) {
	let e;
	return (
		x.size === 0 && I(T),
		{
			promise: new Promise((n) => {
				x.add((e = { c: t, f: n }));
			}),
			abort() {
				x.delete(e);
			}
		}
	);
}
const C = new Map();
let M = 0;
function ut(t) {
	let e = 5381,
		n = t.length;
	for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
	return e >>> 0;
}
function lt(t, e) {
	const n = { stylesheet: J(e), rules: {} };
	return C.set(t, n), n;
}
function A(t, e, n, s, l, o, u, i = 0) {
	const c = 16.666 / s;
	let r = `{
`;
	for (let _ = 0; _ <= 1; _ += c) {
		const g = e + (n - e) * o(_);
		r +=
			_ * 100 +
			`%{${u(g, 1 - g)}}
`;
	}
	const $ =
			r +
			`100% {${u(n, 1 - n)}}
}`,
		f = `__svelte_${ut($)}_${i}`,
		m = H(t),
		{ stylesheet: h, rules: a } = C.get(m) || lt(m, t);
	a[f] || ((a[f] = !0), h.insertRule(`@keyframes ${f} ${$}`, h.cssRules.length));
	const d = t.style.animation || '';
	return (t.style.animation = `${d ? `${d}, ` : ''}${f} ${s}ms linear ${l}ms 1 both`), (M += 1), f;
}
function D(t, e) {
	const n = (t.style.animation || '').split(', '),
		s = n.filter(e ? (o) => o.indexOf(e) < 0 : (o) => o.indexOf('__svelte') === -1),
		l = n.length - s.length;
	l && ((t.style.animation = s.join(', ')), (M -= l), M || ct());
}
function ct() {
	I(() => {
		M ||
			(C.forEach((t) => {
				const { ownerNode: e } = t.stylesheet;
				e && V(e);
			}),
			C.clear());
	});
}
let E;
function X() {
	return (
		E ||
			((E = Promise.resolve()),
			E.then(() => {
				E = null;
			})),
		E
	);
}
function S(t, e, n) {
	t.dispatchEvent(K(`${e ? 'intro' : 'outro'}${n}`));
}
const j = new Set();
let p;
function yt() {
	p = { r: 0, c: [], p };
}
function wt() {
	p.r || O(p.c), (p = p.p);
}
function dt(t, e) {
	t && t.i && (j.delete(t), t.i(e));
}
function xt(t, e, n, s) {
	if (t && t.o) {
		if (j.has(t)) return;
		j.add(t),
			p.c.push(() => {
				j.delete(t), s && (n && t.d(1), s());
			}),
			t.o(e);
	} else s && s();
}
const Y = { duration: 0 };
function vt(t, e, n) {
	const s = { direction: 'in' };
	let l = e(t, n, s),
		o = !1,
		u,
		i,
		c = 0;
	function r() {
		u && D(t, u);
	}
	function $() {
		const { delay: m = 0, duration: h = 300, easing: a = B, tick: d = v, css: _ } = l || Y;
		_ && (u = A(t, 0, 1, h, m, a, _, c++)), d(0, 1);
		const g = L() + m,
			b = g + h;
		i && i.abort(),
			(o = !0),
			k(() => S(t, !0, 'start')),
			(i = W((y) => {
				if (o) {
					if (y >= b) return d(1, 0), S(t, !0, 'end'), r(), (o = !1);
					if (y >= g) {
						const w = a((y - g) / h);
						d(w, 1 - w);
					}
				}
				return o;
			}));
	}
	let f = !1;
	return {
		start() {
			f || ((f = !0), D(t), P(l) ? ((l = l(s)), X().then($)) : $());
		},
		invalidate() {
			f = !1;
		},
		end() {
			o && (r(), (o = !1));
		}
	};
}
function bt(t, e, n, s) {
	let o = e(t, n, { direction: 'both' }),
		u = s ? 0 : 1,
		i = null,
		c = null,
		r = null,
		$;
	function f() {
		r && D(t, r);
	}
	function m(a, d) {
		const _ = a.b - u;
		return (
			(d *= Math.abs(_)),
			{ a: u, b: a.b, d: _, duration: d, start: a.start, end: a.start + d, group: a.group }
		);
	}
	function h(a) {
		const { delay: d = 0, duration: _ = 300, easing: g = B, tick: b = v, css: y } = o || Y,
			w = { start: L() + d, b: a };
		a || ((w.group = p), (p.r += 1)),
			'inert' in t && (a ? $ !== void 0 && (t.inert = $) : (($ = t.inert), (t.inert = !0))),
			i || c
				? (c = w)
				: (y && (f(), (r = A(t, u, a, _, d, g, y))),
					a && b(0, 1),
					(i = m(w, _)),
					k(() => S(t, a, 'start')),
					W((R) => {
						if (
							(c &&
								R > c.start &&
								((i = m(c, _)),
								(c = null),
								S(t, i.b, 'start'),
								y && (f(), (r = A(t, u, i.b, i.duration, 0, g, o.css)))),
							i)
						) {
							if (R >= i.end)
								b((u = i.b), 1 - u),
									S(t, i.b, 'end'),
									c || (i.b ? f() : --i.group.r || O(i.group.c)),
									(i = null);
							else if (R >= i.start) {
								const Z = R - i.start;
								(u = i.a + i.d * g(Z / i.duration)), b(u, 1 - u);
							}
						}
						return !!(i || c);
					}));
	}
	return {
		run(a) {
			P(o)
				? X().then(() => {
						(o = o({ direction: a ? 'in' : 'out' })), h(a);
					})
				: h(a);
		},
		end() {
			f(), (i = c = null);
		}
	};
}
function Et(t, e, n) {
	const s = t.$$.props[e];
	s !== void 0 && ((t.$$.bound[s] = n), n(t.$$.ctx[s]));
}
function St(t) {
	t && t.c();
}
function Ot(t, e) {
	t && t.l(e);
}
function _t(t, e, n) {
	const { fragment: s, after_update: l } = t.$$;
	s && s.m(e, n),
		k(() => {
			const o = t.$$.on_mount.map(it).filter(P);
			t.$$.on_destroy ? t.$$.on_destroy.push(...o) : O(o), (t.$$.on_mount = []);
		}),
		l.forEach(k);
}
function $t(t, e) {
	const n = t.$$;
	n.fragment !== null &&
		(nt(n.after_update),
		O(n.on_destroy),
		n.fragment && n.fragment.d(e),
		(n.on_destroy = n.fragment = null),
		(n.ctx = []));
}
function ht(t, e) {
	t.$$.dirty[0] === -1 && (rt.push(t), at(), t.$$.dirty.fill(0)),
		(t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Rt(t, e, n, s, l, o, u = null, i = [-1]) {
	const c = st;
	U(t);
	const r = (t.$$ = {
		fragment: null,
		ctx: [],
		props: o,
		update: v,
		not_equal: l,
		bound: N(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(e.context || (c ? c.$$.context : [])),
		callbacks: N(),
		dirty: i,
		skip_bound: !1,
		root: e.target || c.$$.root
	});
	u && u(r.root);
	let $ = !1;
	if (
		((r.ctx = n
			? n(t, e.props || {}, (f, m, ...h) => {
					const a = h.length ? h[0] : m;
					return (
						r.ctx &&
							l(r.ctx[f], (r.ctx[f] = a)) &&
							(!r.skip_bound && r.bound[f] && r.bound[f](a), $ && ht(t, f)),
						m
					);
				})
			: []),
		r.update(),
		($ = !0),
		O(r.before_update),
		(r.fragment = s ? s(r.ctx) : !1),
		e.target)
	) {
		if (e.hydrate) {
			ot();
			const f = Q(e.target);
			r.fragment && r.fragment.l(f), f.forEach(V);
		} else r.fragment && r.fragment.c();
		e.intro && dt(t.$$.fragment), _t(t, e.target, e.anchor), ft(), tt();
	}
	U(c);
}
class jt {
	constructor() {
		z(this, '$$');
		z(this, '$$set');
	}
	$destroy() {
		$t(this, 1), (this.$destroy = v);
	}
	$on(e, n) {
		if (!P(n)) return v;
		const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
		return (
			s.push(n),
			() => {
				const l = s.indexOf(n);
				l !== -1 && s.splice(l, 1);
			}
		);
	}
	$set(e) {
		this.$$set && !et(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
	}
}
const mt = '4';
typeof window < 'u' && (window.__svelte || (window.__svelte = { v: new Set() })).v.add(mt);
export {
	jt as S,
	xt as a,
	Ot as b,
	St as c,
	$t as d,
	wt as e,
	A as f,
	yt as g,
	D as h,
	Rt as i,
	Et as j,
	bt as k,
	W as l,
	_t as m,
	L as n,
	vt as o,
	dt as t
};
