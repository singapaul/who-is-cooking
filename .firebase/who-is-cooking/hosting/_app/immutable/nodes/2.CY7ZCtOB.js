import {
	s as S,
	x as I,
	i as $,
	n as z,
	f as i,
	k as P,
	m as k,
	e as m,
	c as _,
	b as p,
	u as R,
	p as V,
	q as O,
	O as A,
	P as C,
	a as Q,
	g as j,
	o as d,
	h as w
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as D,
	i as N,
	g as G,
	a as g,
	e as J,
	t as h,
	o as T,
	c as U,
	b as B,
	m as F,
	d as H
} from '../chunks/index.BqBZE8_s.js';
import '../chunks/entry.vAAbogbC.js';
import { f as K } from '../chunks/index.D-koMqGf.js';
import { p as W } from '../chunks/stores.BBkUZuCL.js';
import { w as X, r as Y } from '../chunks/index.Drio3CKC.js';
import { n as Z } from '../chunks/nav.BSPGET2L.js';
function L(o) {
	let r, s, n;
	const a = o[2].default,
		t = k(a, o, o[1], null);
	return {
		c() {
			(r = m('div')), t && t.c();
		},
		l(e) {
			r = _(e, 'DIV', {});
			var l = p(r);
			t && t.l(l), l.forEach(i);
		},
		m(e, l) {
			$(e, r, l), t && t.m(r, null), (n = !0);
		},
		p(e, l) {
			t && t.p && (!n || l & 2) && R(t, a, e, e[1], n ? O(a, e[1], l, null) : V(e[1]), null);
		},
		i(e) {
			n ||
				(h(t, e),
				e &&
					(s ||
						A(() => {
							(s = T(r, K, { x: '-100%', duration: 500 })), s.start();
						})),
				(n = !0));
		},
		o(e) {
			g(t, e), (n = !1);
		},
		d(e) {
			e && i(r), t && t.d(e);
		}
	};
}
function x(o) {
	let r = o[0].url,
		s,
		n,
		a = L(o);
	return {
		c() {
			a.c(), (s = I());
		},
		l(t) {
			a.l(t), (s = I());
		},
		m(t, e) {
			a.m(t, e), $(t, s, e), (n = !0);
		},
		p(t, [e]) {
			e & 1 && S(r, (r = t[0].url))
				? (G(), g(a, 1, 1, z), J(), (a = L(t)), a.c(), h(a, 1), a.m(s.parentNode, s))
				: a.p(t, e);
		},
		i(t) {
			n || (h(a), (n = !0));
		},
		o(t) {
			g(a), (n = !1);
		},
		d(t) {
			t && i(s), a.d(t);
		}
	};
}
function ee(o, r, s) {
	let n;
	P(o, W, (e) => s(0, (n = e)));
	let { $$slots: a = {}, $$scope: t } = r;
	return (
		(o.$$set = (e) => {
			'$$scope' in e && s(1, (t = e.$$scope));
		}),
		[n, t, a]
	);
}
class te extends D {
	constructor(r) {
		super(), N(this, r, ee, x, S, {});
	}
}
const b = {};
function M(o) {
	return o === 'local' ? localStorage : sessionStorage;
}
function E(o, r, s) {
	const n = (s == null ? void 0 : s.serializer) ?? JSON,
		a = (s == null ? void 0 : s.storage) ?? 'local';
	function t(e, l) {
		M(a).setItem(e, n.stringify(l));
	}
	if (!b[o]) {
		const e = X(r, (u) => {
				const f = M(a).getItem(o);
				f && u(n.parse(f));
				{
					const y = (v) => {
						v.key === o && u(v.newValue ? n.parse(v.newValue) : null);
					};
					return (
						window.addEventListener('storage', y), () => window.removeEventListener('storage', y)
					);
				}
			}),
			{ subscribe: l, set: c } = e;
		b[o] = {
			set(u) {
				t(o, u), c(u);
			},
			update(u) {
				const f = u(C(e));
				t(o, f), c(f);
			},
			subscribe: l
		};
	}
	return b[o];
}
E('modeOsPrefers', !1);
E('modeUserPrefers', void 0);
E('modeCurrent', !1);
const q = '(prefers-reduced-motion: reduce)';
function se() {
	return window.matchMedia(q).matches;
}
Y(se(), (o) => {
	{
		const r = (n) => {
				o(n.matches);
			},
			s = window.matchMedia(q);
		return (
			s.addEventListener('change', r),
			() => {
				s.removeEventListener('change', r);
			}
		);
	}
});
function re(o) {
	let r, s, n;
	const a = o[1].default,
		t = k(a, o, o[2], null);
	return {
		c() {
			(r = m('main')), (s = m('div')), t && t.c(), this.h();
		},
		l(e) {
			r = _(e, 'MAIN', { class: !0 });
			var l = p(r);
			s = _(l, 'DIV', { class: !0 });
			var c = p(s);
			t && t.l(c), c.forEach(i), l.forEach(i), this.h();
		},
		h() {
			d(s, 'class', 'card-body items-center text-center'),
				d(r, 'class', 'card mx-auto w-4/6 bg-neutral text-neutral-content');
		},
		m(e, l) {
			$(e, r, l), w(r, s), t && t.m(s, null), (n = !0);
		},
		p(e, l) {
			t && t.p && (!n || l & 4) && R(t, a, e, e[2], n ? O(a, e[2], l, null) : V(e[2]), null);
		},
		i(e) {
			n || (h(t, e), (n = !0));
		},
		o(e) {
			g(t, e), (n = !1);
		},
		d(e) {
			e && i(r), t && t.d(e);
		}
	};
}
function ae(o) {
	let r, s, n, a, t;
	return (
		(a = new te({ props: { $$slots: { default: [re] }, $$scope: { ctx: o } } })),
		{
			c() {
				(r = m('div')), (s = m('progress')), (n = Q()), U(a.$$.fragment), this.h();
			},
			l(e) {
				r = _(e, 'DIV', { class: !0 });
				var l = p(r);
				(s = _(l, 'PROGRESS', { class: !0, max: !0 })),
					p(s).forEach(i),
					(n = j(l)),
					B(a.$$.fragment, l),
					l.forEach(i),
					this.h();
			},
			h() {
				d(s, 'class', 'progress w-full'),
					(s.value = o[0]),
					d(s, 'max', '99'),
					d(r, 'class', 'flex min-h-screen flex-col');
			},
			m(e, l) {
				$(e, r, l), w(r, s), w(r, n), F(a, r, null), (t = !0);
			},
			p(e, [l]) {
				(!t || l & 1) && (s.value = e[0]);
				const c = {};
				l & 4 && (c.$$scope = { dirty: l, ctx: e }), a.$set(c);
			},
			i(e) {
				t || (h(a.$$.fragment, e), (t = !0));
			},
			o(e) {
				g(a.$$.fragment, e), (t = !1);
			},
			d(e) {
				e && i(r), H(a);
			}
		}
	);
}
function ne(o, r, s) {
	let n;
	P(o, Z, (e) => s(0, (n = e)));
	let { $$slots: a = {}, $$scope: t } = r;
	return (
		(o.$$set = (e) => {
			'$$scope' in e && s(2, (t = e.$$scope));
		}),
		[n, a, t]
	);
}
class me extends D {
	constructor(r) {
		super(), N(this, r, ne, ae, S, {});
	}
}
export { me as component };
