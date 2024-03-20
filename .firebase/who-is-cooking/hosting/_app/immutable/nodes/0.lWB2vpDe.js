import {
	s as Q,
	e as v,
	t as z,
	a as $,
	c as p,
	b,
	d as G,
	f as m,
	g as N,
	v as re,
	o as c,
	y as ne,
	i as P,
	h as u,
	w as ye,
	j as J,
	n as K,
	k as H,
	H as oe,
	O as Ee,
	J as ie,
	m as Ie,
	u as De,
	p as $e,
	q as Ne
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as W,
	i as X,
	g as ve,
	e as pe,
	t as L,
	a as M,
	k as fe,
	c as ge,
	b as be,
	m as we,
	d as ke
} from '../chunks/index.BqBZE8_s.js';
import { g as Ce, t as Le, f as Ve, u as qe } from '../chunks/firebase.BXW4q-2E.js';
import { g as Me } from '../chunks/entry.vAAbogbC.js';
import { p as Te } from '../chunks/stores.BBkUZuCL.js';
import { f as Oe, a as Pe, c as Re, b as Se } from '../chunks/index.ChZz6XMy.js';
import { e as ce, u as Ue, f as Be } from '../chunks/each.DLoRWcad.js';
import { f as ue } from '../chunks/index.D-koMqGf.js';
import { n as He } from '../chunks/notifications.DHR35Uvq.js';
function je(o) {
	let t,
		e,
		l,
		n = o[0] ? 'Post new meal' : 'Feed',
		f,
		r,
		i,
		s,
		a,
		d = o[1] ? 'Post New Meal' : 'Cooking Rota',
		k,
		_,
		g,
		h,
		E,
		V,
		D,
		R,
		j,
		I,
		q,
		Y = '<a href="/profile" class="justify-between">Profile</a>',
		A,
		T,
		C,
		Z = 'Logout',
		F,
		x;
	return {
		c() {
			(t = v('div')),
				(e = v('div')),
				(l = v('a')),
				(f = z(n)),
				(i = $()),
				(s = v('div')),
				(a = v('a')),
				(k = z(d)),
				(g = $()),
				(h = v('div')),
				(E = v('div')),
				(V = v('div')),
				(D = v('img')),
				(j = $()),
				(I = v('ul')),
				(q = v('li')),
				(q.innerHTML = Y),
				(A = $()),
				(T = v('li')),
				(C = v('button')),
				(C.textContent = Z),
				this.h();
		},
		l(w) {
			t = p(w, 'DIV', { class: !0 });
			var y = b(t);
			e = p(y, 'DIV', { class: !0 });
			var O = b(e);
			l = p(O, 'A', { href: !0, class: !0 });
			var ee = b(l);
			(f = G(ee, n)), ee.forEach(m), O.forEach(m), (i = N(y)), (s = p(y, 'DIV', { class: !0 }));
			var S = b(s);
			a = p(S, 'A', { href: !0, class: !0 });
			var te = b(a);
			(k = G(te, d)), te.forEach(m), (g = N(S)), (h = p(S, 'DIV', { class: !0 }));
			var U = b(h);
			E = p(U, 'DIV', { tabindex: !0, role: !0, class: !0 });
			var ae = b(E);
			V = p(ae, 'DIV', { class: !0 });
			var se = b(V);
			(D = p(se, 'IMG', { alt: !0, src: !0 })),
				se.forEach(m),
				ae.forEach(m),
				(j = N(U)),
				(I = p(U, 'UL', { tabindex: !0, class: !0 }));
			var B = b(I);
			(q = p(B, 'LI', { 'data-svelte-h': !0 })),
				re(q) !== 'svelte-p3sohh' && (q.innerHTML = Y),
				(A = N(B)),
				(T = p(B, 'LI', {}));
			var le = b(T);
			(C = p(le, 'BUTTON', { 'data-svelte-h': !0 })),
				re(C) !== 'svelte-ktsy4a' && (C.textContent = Z),
				le.forEach(m),
				B.forEach(m),
				U.forEach(m),
				S.forEach(m),
				y.forEach(m),
				this.h();
		},
		h() {
			var w;
			c(l, 'href', (r = o[0] ? '/new-meal' : '/feed')),
				c(l, 'class', 'btn btn-secondary'),
				c(e, 'class', 'flex-1'),
				c(a, 'href', (_ = o[1] ? '/new-meal' : '/')),
				c(a, 'class', 'btn btn-primary'),
				c(D, 'alt', 'Tailwind CSS Navbar component'),
				ne(D.src, (R = (w = o[2]) == null ? void 0 : w.photoURL)) || c(D, 'src', R),
				c(V, 'class', 'w-10 rounded-full'),
				c(E, 'tabindex', '0'),
				c(E, 'role', 'button'),
				c(E, 'class', 'avatar btn btn-circle btn-ghost'),
				c(I, 'tabindex', '0'),
				c(
					I,
					'class',
					'menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
				),
				c(h, 'class', 'dropdown dropdown-end'),
				c(s, 'class', 'flex flex-row gap-4'),
				c(t, 'class', 'navbar bg-base-100');
		},
		m(w, y) {
			P(w, t, y),
				u(t, e),
				u(e, l),
				u(l, f),
				u(t, i),
				u(t, s),
				u(s, a),
				u(a, k),
				u(s, g),
				u(s, h),
				u(h, E),
				u(E, V),
				u(V, D),
				u(h, j),
				u(h, I),
				u(I, q),
				u(I, A),
				u(I, T),
				u(T, C),
				F || ((x = ye(C, 'click', o[3])), (F = !0));
		},
		p(w, [y]) {
			var O;
			y & 1 && n !== (n = w[0] ? 'Post new meal' : 'Feed') && J(f, n),
				y & 1 && r !== (r = w[0] ? '/new-meal' : '/feed') && c(l, 'href', r),
				y & 2 && d !== (d = w[1] ? 'Post New Meal' : 'Cooking Rota') && J(k, d),
				y & 2 && _ !== (_ = w[1] ? '/new-meal' : '/') && c(a, 'href', _),
				y & 4 && !ne(D.src, (R = (O = w[2]) == null ? void 0 : O.photoURL)) && c(D, 'src', R);
		},
		i: K,
		o: K,
		d(w) {
			w && m(t), (F = !1), x();
		}
	};
}
function Ae(o, t, e) {
	let l, n, f, r;
	H(o, Te, (a) => e(5, (f = a))), H(o, Ce, (a) => e(2, (r = a)));
	let { siteName: i = 'placeholder' } = t;
	const s = () => {
		Le(Ve), Me('/');
	};
	return (
		(o.$$set = (a) => {
			'siteName' in a && e(4, (i = a.siteName));
		}),
		(o.$$.update = () => {
			o.$$.dirty & 32 && e(1, (l = f.route.id === '/')),
				o.$$.dirty & 32 && e(0, (n = f.route.id === '/feed'));
		}),
		[n, l, r, s, i, f]
	);
}
class Fe extends W {
	constructor(t) {
		super(), X(this, t, Ae, je, Q, { siteName: 4 });
	}
}
function de(o, t, e) {
	const l = o.slice();
	return (l[2] = t[e]), l;
}
function _e(o) {
	let t, e;
	return {
		c() {
			(t = v('i')), this.h();
		},
		l(l) {
			(t = p(l, 'I', { class: !0 })), b(t).forEach(m), this.h();
		},
		h() {
			c(t, 'class', (e = ie(o[2].icon) + ' svelte-1qswa34'));
		},
		m(l, n) {
			P(l, t, n);
		},
		p(l, n) {
			n & 2 && e !== (e = ie(l[2].icon) + ' svelte-1qswa34') && c(t, 'class', e);
		},
		d(l) {
			l && m(t);
		}
	};
}
function he(o, t) {
	let e,
		l,
		n = t[2].message + '',
		f,
		r,
		i,
		s,
		a,
		d = K,
		k,
		_ = t[2].icon && _e(t);
	return {
		key: o,
		first: null,
		c() {
			(e = v('div')), (l = v('div')), (f = z(n)), (r = $()), _ && _.c(), (i = $()), this.h();
		},
		l(g) {
			e = p(g, 'DIV', { class: !0, style: !0 });
			var h = b(e);
			l = p(h, 'DIV', { class: !0 });
			var E = b(l);
			(f = G(E, n)), E.forEach(m), (r = N(h)), _ && _.l(h), (i = N(h)), h.forEach(m), this.h();
		},
		h() {
			c(l, 'class', 'content svelte-1qswa34'),
				c(e, 'class', 'toast svelte-1qswa34'),
				oe(e, 'background', t[0][t[2].type]),
				(this.first = e);
		},
		m(g, h) {
			P(g, e, h), u(e, l), u(l, f), u(e, r), _ && _.m(e, null), u(e, i), (k = !0);
		},
		p(g, h) {
			(t = g),
				(!k || h & 2) && n !== (n = t[2].message + '') && J(f, n),
				t[2].icon ? (_ ? _.p(t, h) : ((_ = _e(t)), _.c(), _.m(e, i))) : _ && (_.d(1), (_ = null)),
				(!k || h & 3) && oe(e, 'background', t[0][t[2].type]);
		},
		r() {
			a = e.getBoundingClientRect();
		},
		f() {
			Oe(e), d(), Pe(e, a);
		},
		a() {
			d(), (d = Re(e, a, Se, {}));
		},
		i(g) {
			k ||
				(g &&
					Ee(() => {
						k && (s || (s = fe(e, ue, { y: 30 }, !0)), s.run(1));
					}),
				(k = !0));
		},
		o(g) {
			g && (s || (s = fe(e, ue, { y: 30 }, !1)), s.run(0)), (k = !1);
		},
		d(g) {
			g && m(e), _ && _.d(), g && s && s.end();
		}
	};
}
function ze(o) {
	let t,
		e = [],
		l = new Map(),
		n,
		f = ce(o[1]);
	const r = (i) => i[2].id;
	for (let i = 0; i < f.length; i += 1) {
		let s = de(o, f, i),
			a = r(s);
		l.set(a, (e[i] = he(a, s)));
	}
	return {
		c() {
			t = v('div');
			for (let i = 0; i < e.length; i += 1) e[i].c();
			this.h();
		},
		l(i) {
			t = p(i, 'DIV', { class: !0 });
			var s = b(t);
			for (let a = 0; a < e.length; a += 1) e[a].l(s);
			s.forEach(m), this.h();
		},
		h() {
			c(t, 'class', 'notifications svelte-1qswa34');
		},
		m(i, s) {
			P(i, t, s);
			for (let a = 0; a < e.length; a += 1) e[a] && e[a].m(t, null);
			n = !0;
		},
		p(i, [s]) {
			if (s & 3) {
				(f = ce(i[1])), ve();
				for (let a = 0; a < e.length; a += 1) e[a].r();
				e = Ue(e, s, r, 1, i, f, l, t, Be, he, null, de);
				for (let a = 0; a < e.length; a += 1) e[a].a();
				pe();
			}
		},
		i(i) {
			if (!n) {
				for (let s = 0; s < f.length; s += 1) L(e[s]);
				n = !0;
			}
		},
		o(i) {
			for (let s = 0; s < e.length; s += 1) M(e[s]);
			n = !1;
		},
		d(i) {
			i && m(t);
			for (let s = 0; s < e.length; s += 1) e[s].d();
		}
	};
}
function Ge(o, t, e) {
	let l;
	H(o, He, (f) => e(1, (l = f)));
	let {
		themes: n = {
			danger: '#E26D69',
			success: '#84C991',
			warning: '#f0ad4e',
			info: '#5bc0de',
			default: '#aaaaaa'
		}
	} = t;
	return (
		(o.$$set = (f) => {
			'themes' in f && e(0, (n = f.themes));
		}),
		[n, l]
	);
}
class Je extends W {
	constructor(t) {
		super(), X(this, t, Ge, ze, Q, { themes: 0 });
	}
}
function me(o) {
	let t, e;
	return (
		(t = new Fe({ props: { siteName: 'Cooking Order' } })),
		{
			c() {
				ge(t.$$.fragment);
			},
			l(l) {
				be(t.$$.fragment, l);
			},
			m(l, n) {
				we(t, l, n), (e = !0);
			},
			i(l) {
				e || (L(t.$$.fragment, l), (e = !0));
			},
			o(l) {
				M(t.$$.fragment, l), (e = !1);
			},
			d(l) {
				ke(t, l);
			}
		}
	);
}
function Ke(o) {
	let t,
		e,
		l,
		n,
		f,
		r = o[0] && me();
	const i = o[2].default,
		s = Ie(i, o, o[1], null);
	return (
		(n = new Je({})),
		{
			c() {
				(t = v('div')), r && r.c(), (e = $()), s && s.c(), (l = $()), ge(n.$$.fragment), this.h();
			},
			l(a) {
				t = p(a, 'DIV', { class: !0 });
				var d = b(t);
				r && r.l(d),
					(e = N(d)),
					s && s.l(d),
					(l = N(d)),
					be(n.$$.fragment, d),
					d.forEach(m),
					this.h();
			},
			h() {
				c(t, 'class', 'flex h-screen flex-col overflow-y-scroll');
			},
			m(a, d) {
				P(a, t, d),
					r && r.m(t, null),
					u(t, e),
					s && s.m(t, null),
					u(t, l),
					we(n, t, null),
					(f = !0);
			},
			p(a, [d]) {
				a[0]
					? r
						? d & 1 && L(r, 1)
						: ((r = me()), r.c(), L(r, 1), r.m(t, e))
					: r &&
						(ve(),
						M(r, 1, 1, () => {
							r = null;
						}),
						pe()),
					s && s.p && (!f || d & 2) && De(s, i, a, a[1], f ? Ne(i, a[1], d, null) : $e(a[1]), null);
			},
			i(a) {
				f || (L(r), L(s, a), L(n.$$.fragment, a), (f = !0));
			},
			o(a) {
				M(r), M(s, a), M(n.$$.fragment, a), (f = !1);
			},
			d(a) {
				a && m(t), r && r.d(), s && s.d(a), ke(n);
			}
		}
	);
}
function Qe(o, t, e) {
	let l;
	H(o, qe, (r) => e(0, (l = r)));
	let { $$slots: n = {}, $$scope: f } = t;
	return (
		(o.$$set = (r) => {
			'$$scope' in r && e(1, (f = r.$$scope));
		}),
		[l, f, n]
	);
}
class lt extends W {
	constructor(t) {
		super(), X(this, t, Qe, Ke, Q, {});
	}
}
export { lt as component };
