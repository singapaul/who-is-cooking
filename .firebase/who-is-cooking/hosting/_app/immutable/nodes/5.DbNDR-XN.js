import { q as ce, n as fe, p as de, a as ue } from '../chunks/firebase.BXW4q-2E.js';
import {
	s as F,
	e as m,
	a as I,
	t as R,
	c as g,
	b as v,
	f as h,
	g as q,
	d as L,
	v as he,
	y as x,
	o as d,
	i as H,
	h as c,
	w as _e,
	j as M,
	n as ee,
	m as me,
	u as ge,
	p as pe,
	q as ve,
	x as te,
	G as be
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as J,
	i as K,
	t as A,
	a as S,
	c as le,
	b as re,
	m as oe,
	d as ie,
	g as ke,
	e as ye
} from '../chunks/index.BqBZE8_s.js';
import { e as ae } from '../chunks/each.DLoRWcad.js';
import { g as Ee } from '../chunks/entry.vAAbogbC.js';
const we = async () => {
		const l = ce(fe(ue, 'meals'));
		return { typed: (await de(l)).docs.map((e) => ({ id: e.id, ...e.data(), ref: e.ref.path })) };
	},
	Oe = Object.freeze(
		Object.defineProperty({ __proto__: null, load: we }, Symbol.toStringTag, { value: 'Module' })
	);
function De(l) {
	let a,
		n,
		t,
		e,
		r,
		s,
		i,
		o,
		p,
		y,
		f,
		N,
		b,
		E,
		D,
		j,
		O,
		w,
		P,
		C,
		T,
		k,
		Q = 'See dish',
		z,
		W;
	return {
		c() {
			(a = m('div')),
				(n = m('figure')),
				(t = m('img')),
				(r = I()),
				(s = m('div')),
				(i = m('h2')),
				(o = R(l[0])),
				(p = I()),
				(y = m('p')),
				(f = R(l[4])),
				(N = I()),
				(b = m('div')),
				(E = m('div')),
				(D = m('div')),
				(j = R(l[1])),
				(O = I()),
				(w = m('div')),
				(P = R('£')),
				(C = R(l[3])),
				(T = I()),
				(k = m('button')),
				(k.textContent = Q),
				this.h();
		},
		l(_) {
			a = g(_, 'DIV', { class: !0 });
			var u = v(a);
			n = g(u, 'FIGURE', { class: !0 });
			var X = v(n);
			(t = g(X, 'IMG', { src: !0, alt: !0, class: !0 })),
				X.forEach(h),
				(r = q(u)),
				(s = g(u, 'DIV', { class: !0 }));
			var U = v(s);
			i = g(U, 'H2', { class: !0 });
			var Y = v(i);
			(o = L(Y, l[0])), Y.forEach(h), (p = q(U)), (y = g(U, 'P', {}));
			var Z = v(y);
			(f = L(Z, l[4])), Z.forEach(h), (N = q(U)), (b = g(U, 'DIV', { class: !0 }));
			var V = v(b);
			E = g(V, 'DIV', {});
			var G = v(E);
			D = g(G, 'DIV', { class: !0 });
			var $ = v(D);
			(j = L($, l[1])), $.forEach(h), (O = q(G)), (w = g(G, 'DIV', { class: !0 }));
			var B = v(w);
			(P = L(B, '£')),
				(C = L(B, l[3])),
				B.forEach(h),
				G.forEach(h),
				(T = q(V)),
				(k = g(V, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
				he(k) !== 'svelte-gh4vsz' && (k.textContent = Q),
				V.forEach(h),
				U.forEach(h),
				u.forEach(h),
				this.h();
		},
		h() {
			x(t.src, (e = l[2])) || d(t, 'src', e),
				d(t, 'alt', l[0]),
				d(t, 'class', 'object-fill'),
				d(n, 'class', ''),
				d(i, 'class', 'card-title'),
				d(D, 'class', 'badge badge-outline'),
				d(w, 'class', 'badge badge-outline'),
				d(k, 'class', 'btn btn-primary'),
				d(b, 'class', 'card-actions flex items-center justify-between'),
				d(s, 'class', 'card-body'),
				d(a, 'class', 'card h-96 w-96 border-2 border-white bg-base-100 shadow-xl');
		},
		m(_, u) {
			H(_, a, u),
				c(a, n),
				c(n, t),
				c(a, r),
				c(a, s),
				c(s, i),
				c(i, o),
				c(s, p),
				c(s, y),
				c(y, f),
				c(s, N),
				c(s, b),
				c(b, E),
				c(E, D),
				c(D, j),
				c(E, O),
				c(E, w),
				c(w, P),
				c(w, C),
				c(b, T),
				c(b, k),
				z || ((W = _e(k, 'click', l[5])), (z = !0));
		},
		p(_, [u]) {
			u & 4 && !x(t.src, (e = _[2])) && d(t, 'src', e),
				u & 1 && d(t, 'alt', _[0]),
				u & 1 && M(o, _[0]),
				u & 16 && M(f, _[4]),
				u & 2 && M(j, _[1]),
				u & 8 && M(C, _[3]);
		},
		i: ee,
		o: ee,
		d(_) {
			_ && h(a), (z = !1), W();
		}
	};
}
function Ue(l, a, n) {
	let t,
		{ dish: e } = a,
		{ chef: r } = a,
		{ photoURL: s } = a,
		{ cost: i } = a,
		{ createdAt: o } = a,
		{ link: p } = a;
	function y() {
		Ee(`/feed/${p}`);
	}
	return (
		(l.$$set = (f) => {
			'dish' in f && n(0, (e = f.dish)),
				'chef' in f && n(1, (r = f.chef)),
				'photoURL' in f && n(2, (s = f.photoURL)),
				'cost' in f && n(3, (i = f.cost)),
				'createdAt' in f && n(6, (o = f.createdAt)),
				'link' in f && n(7, (p = f.link));
		}),
		(l.$$.update = () => {
			l.$$.dirty & 64 && n(4, (t = new Date(o.seconds * 1e3).toDateString()));
		}),
		[e, r, s, i, t, y, o, p]
	);
}
class Ae extends J {
	constructor(a) {
		super(),
			K(this, a, Ue, De, F, { dish: 0, chef: 1, photoURL: 2, cost: 3, createdAt: 6, link: 7 });
	}
}
function Ie(l) {
	let a, n;
	const t = l[1].default,
		e = me(t, l, l[0], null);
	return {
		c() {
			(a = m('main')), e && e.c(), this.h();
		},
		l(r) {
			a = g(r, 'MAIN', { class: !0 });
			var s = v(a);
			e && e.l(s), s.forEach(h), this.h();
		},
		h() {
			d(
				a,
				'class',
				'mx-auto mb-5 mt-10 grid w-fit grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-20 md:grid-cols-2 lg:grid-cols-3'
			);
		},
		m(r, s) {
			H(r, a, s), e && e.m(a, null), (n = !0);
		},
		p(r, [s]) {
			e && e.p && (!n || s & 1) && ge(e, t, r, r[0], n ? ve(t, r[0], s, null) : pe(r[0]), null);
		},
		i(r) {
			n || (A(e, r), (n = !0));
		},
		o(r) {
			S(e, r), (n = !1);
		},
		d(r) {
			r && h(a), e && e.d(r);
		}
	};
}
function Re(l, a, n) {
	let { $$slots: t = {}, $$scope: e } = a;
	return (
		(l.$$set = (r) => {
			'$$scope' in r && n(0, (e = r.$$scope));
		}),
		[e, t]
	);
}
class qe extends J {
	constructor(a) {
		super(), K(this, a, Re, Ie, F, {});
	}
}
function se(l, a, n) {
	const t = l.slice();
	return (t[1] = a[n]), t;
}
function ne(l) {
	let a, n;
	return (
		(a = new Ae({
			props: {
				createdAt: l[1].createdAt,
				chef: l[1].chef,
				cost: l[1].cost,
				dish: l[1].dish,
				photoURL: l[1].photoURL,
				link: l[1].id
			}
		})),
		{
			c() {
				le(a.$$.fragment);
			},
			l(t) {
				re(a.$$.fragment, t);
			},
			m(t, e) {
				oe(a, t, e), (n = !0);
			},
			p(t, e) {
				const r = {};
				e & 1 && (r.createdAt = t[1].createdAt),
					e & 1 && (r.chef = t[1].chef),
					e & 1 && (r.cost = t[1].cost),
					e & 1 && (r.dish = t[1].dish),
					e & 1 && (r.photoURL = t[1].photoURL),
					e & 1 && (r.link = t[1].id),
					a.$set(r);
			},
			i(t) {
				n || (A(a.$$.fragment, t), (n = !0));
			},
			o(t) {
				S(a.$$.fragment, t), (n = !1);
			},
			d(t) {
				ie(a, t);
			}
		}
	);
}
function Le(l) {
	let a,
		n,
		t = ae(l[0].typed),
		e = [];
	for (let s = 0; s < t.length; s += 1) e[s] = ne(se(l, t, s));
	const r = (s) =>
		S(e[s], 1, 1, () => {
			e[s] = null;
		});
	return {
		c() {
			for (let s = 0; s < e.length; s += 1) e[s].c();
			a = te();
		},
		l(s) {
			for (let i = 0; i < e.length; i += 1) e[i].l(s);
			a = te();
		},
		m(s, i) {
			for (let o = 0; o < e.length; o += 1) e[o] && e[o].m(s, i);
			H(s, a, i), (n = !0);
		},
		p(s, i) {
			if (i & 1) {
				t = ae(s[0].typed);
				let o;
				for (o = 0; o < t.length; o += 1) {
					const p = se(s, t, o);
					e[o]
						? (e[o].p(p, i), A(e[o], 1))
						: ((e[o] = ne(p)), e[o].c(), A(e[o], 1), e[o].m(a.parentNode, a));
				}
				for (ke(), o = t.length; o < e.length; o += 1) r(o);
				ye();
			}
		},
		i(s) {
			if (!n) {
				for (let i = 0; i < t.length; i += 1) A(e[i]);
				n = !0;
			}
		},
		o(s) {
			e = e.filter(Boolean);
			for (let i = 0; i < e.length; i += 1) S(e[i]);
			n = !1;
		},
		d(s) {
			s && h(a), be(e, s);
		}
	};
}
function Se(l) {
	let a, n;
	return (
		(a = new qe({ props: { $$slots: { default: [Le] }, $$scope: { ctx: l } } })),
		{
			c() {
				le(a.$$.fragment);
			},
			l(t) {
				re(a.$$.fragment, t);
			},
			m(t, e) {
				oe(a, t, e), (n = !0);
			},
			p(t, [e]) {
				const r = {};
				e & 17 && (r.$$scope = { dirty: e, ctx: t }), a.$set(r);
			},
			i(t) {
				n || (A(a.$$.fragment, t), (n = !0));
			},
			o(t) {
				S(a.$$.fragment, t), (n = !1);
			},
			d(t) {
				ie(a, t);
			}
		}
	);
}
function je(l, a, n) {
	let { data: t } = a;
	return (
		(l.$$set = (e) => {
			'data' in e && n(0, (t = e.data));
		}),
		[t]
	);
}
class Pe extends J {
	constructor(a) {
		super(), K(this, a, je, Se, F, { data: 0 });
	}
}
export { Pe as component, Oe as universal };
