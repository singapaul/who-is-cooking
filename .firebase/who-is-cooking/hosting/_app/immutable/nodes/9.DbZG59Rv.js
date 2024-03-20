import {
	s as S,
	e as d,
	a as b,
	x as k,
	c as x,
	v,
	g as C,
	o as _,
	i as f,
	n as y,
	f as c,
	k as w,
	w as A,
	t as g,
	b as G,
	d as N,
	h as P,
	j as W
} from '../chunks/scheduler.CxO4csHG.js';
import { S as q, i as E } from '../chunks/index.BqBZE8_s.js';
import { u as $, G as j, e as H, f as I } from '../chunks/firebase.BXW4q-2E.js';
import { n as T } from '../chunks/nav.BSPGET2L.js';
function U(h) {
	let e,
		u = 'Sign in with Google',
		n,
		l;
	return {
		c() {
			(e = d('button')), (e.textContent = u), this.h();
		},
		l(a) {
			(e = x(a, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
				v(e) !== 'svelte-12721gk' && (e.textContent = u),
				this.h();
		},
		h() {
			_(e, 'class', 'btn btn-primary');
		},
		m(a, i) {
			f(a, e, i), n || ((l = A(e, 'click', h[1])), (n = !0));
		},
		p: y,
		d(a) {
			a && c(e), (n = !1), l();
		}
	};
}
function B(h) {
	let e,
		u,
		n = h[0].displayName + '',
		l,
		a,
		i,
		p = 'You are logged in',
		m,
		o,
		r = 'Setup username';
	return {
		c() {
			(e = d('h2')),
				(u = g('Welcome, ')),
				(l = g(n)),
				(a = b()),
				(i = d('p')),
				(i.textContent = p),
				(m = b()),
				(o = d('a')),
				(o.textContent = r),
				this.h();
		},
		l(t) {
			e = x(t, 'H2', { class: !0 });
			var s = G(e);
			(u = N(s, 'Welcome, ')),
				(l = N(s, n)),
				s.forEach(c),
				(a = C(t)),
				(i = x(t, 'P', { class: !0, 'data-svelte-h': !0 })),
				v(i) !== 'svelte-1958qcl' && (i.textContent = p),
				(m = C(t)),
				(o = x(t, 'A', { class: !0, href: !0, 'data-svelte-h': !0 })),
				v(o) !== 'svelte-15sj5y' && (o.textContent = r),
				this.h();
		},
		h() {
			_(e, 'class', 'card-title'),
				_(i, 'class', 'text-center text-success'),
				_(o, 'class', 'btn btn-primary'),
				_(o, 'href', '/login/username');
		},
		m(t, s) {
			f(t, e, s), P(e, u), P(e, l), f(t, a, s), f(t, i, s), f(t, m, s), f(t, o, s);
		},
		p(t, s) {
			s & 1 && n !== (n = t[0].displayName + '') && W(l, n);
		},
		d(t) {
			t && (c(e), c(a), c(i), c(m), c(o));
		}
	};
}
function L(h) {
	let e,
		u = 'USERNAME',
		n,
		l,
		a = 'Login',
		i,
		p;
	function m(t, s) {
		return t[0] ? B : U;
	}
	let o = m(h),
		r = o(h);
	return {
		c() {
			(e = d('a')),
				(e.textContent = u),
				(n = b()),
				(l = d('h2')),
				(l.textContent = a),
				(i = b()),
				r.c(),
				(p = k()),
				this.h();
		},
		l(t) {
			(e = x(t, 'A', { href: !0, 'data-svelte-h': !0 })),
				v(e) !== 'svelte-1vahqrx' && (e.textContent = u),
				(n = C(t)),
				(l = x(t, 'H2', { 'data-svelte-h': !0 })),
				v(l) !== 'svelte-bhb3ah' && (l.textContent = a),
				(i = C(t)),
				r.l(t),
				(p = k()),
				this.h();
		},
		h() {
			_(e, 'href', '/login/username');
		},
		m(t, s) {
			f(t, e, s), f(t, n, s), f(t, l, s), f(t, i, s), r.m(t, s), f(t, p, s);
		},
		p(t, [s]) {
			o === (o = m(t)) && r ? r.p(t, s) : (r.d(1), (r = o(t)), r && (r.c(), r.m(p.parentNode, p)));
		},
		i: y,
		o: y,
		d(t) {
			t && (c(e), c(n), c(l), c(i), c(p)), r.d(t);
		}
	};
}
function M(h, e, u) {
	let n;
	w(h, $, (a) => u(0, (n = a)));
	async function l() {
		const a = new j(),
			i = await H(I, a);
		console.log(i);
	}
	return T.set(33), [n, l];
}
class D extends q {
	constructor(e) {
		super(), E(this, e, M, L, S, {});
	}
}
export { D as component };