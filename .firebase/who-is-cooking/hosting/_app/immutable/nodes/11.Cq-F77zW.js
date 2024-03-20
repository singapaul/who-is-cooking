import {
	s as F,
	k as L,
	x as R,
	i as b,
	f as h,
	e as k,
	a as E,
	c as g,
	b as T,
	g as U,
	o as P,
	z as A,
	h as _,
	A as S,
	w as z,
	B as M,
	r as W,
	t as v,
	d as y,
	v as I,
	j as N
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as Z,
	i as G,
	c as H,
	b as J,
	m as K,
	t as Q,
	a as X,
	d as $
} from '../chunks/index.BqBZE8_s.js';
import { n as x } from '../chunks/nav.BSPGET2L.js';
import { A as ee } from '../chunks/AuthCheck.CwOMPwgQ.js';
import { u as te, g as se, d as B, a as D, k as le, w as ne } from '../chunks/firebase.BXW4q-2E.js';
function ae(a) {
	let e,
		s,
		n,
		t,
		l,
		i,
		d,
		f,
		C,
		c = a[1] && j(a),
		p = !a[3] && a[5] && O(),
		m = a[3] && !a[2] && !a[1] && V(a),
		r = a[2] && Y(a);
	return {
		c() {
			(e = k('form')),
				(s = k('input')),
				(n = E()),
				(t = k('div')),
				c && c.c(),
				(l = E()),
				p && p.c(),
				(i = E()),
				m && m.c(),
				(d = E()),
				r && r.c(),
				this.h();
		},
		l(o) {
			e = g(o, 'FORM', { class: !0 });
			var u = T(e);
			(s = g(u, 'INPUT', { type: !0, placeholder: !0, class: !0 })),
				(n = U(u)),
				(t = g(u, 'DIV', { class: !0 }));
			var w = T(t);
			c && c.l(w),
				(l = U(w)),
				p && p.l(w),
				(i = U(w)),
				m && m.l(w),
				(d = U(w)),
				r && r.l(w),
				w.forEach(h),
				u.forEach(h),
				this.h();
		},
		h() {
			P(s, 'type', 'text'),
				P(s, 'placeholder', 'Username'),
				P(s, 'class', 'input w-full'),
				A(s, 'input-error', !a[3] && a[5]),
				A(s, 'input-warning', a[4]),
				A(s, 'input-success', a[2] && a[3] && !a[1]),
				P(t, 'class', 'my-4 min-h-16 w-full px-8'),
				P(e, 'class', 'w-2/5');
		},
		m(o, u) {
			b(o, e, u),
				_(e, s),
				S(s, a[0]),
				_(e, n),
				_(e, t),
				c && c.m(t, null),
				_(t, l),
				p && p.m(t, null),
				_(t, i),
				m && m.m(t, null),
				_(t, d),
				r && r.m(t, null),
				f || ((C = [z(s, 'input', a[9]), z(s, 'input', a[7]), z(e, 'submit', M(a[8]))]), (f = !0));
		},
		p(o, u) {
			u & 1 && s.value !== o[0] && S(s, o[0]),
				u & 40 && A(s, 'input-error', !o[3] && o[5]),
				u & 16 && A(s, 'input-warning', o[4]),
				u & 14 && A(s, 'input-success', o[2] && o[3] && !o[1]),
				o[1] ? (c ? c.p(o, u) : ((c = j(o)), c.c(), c.m(t, l))) : c && (c.d(1), (c = null)),
				!o[3] && o[5] ? p || ((p = O()), p.c(), p.m(t, i)) : p && (p.d(1), (p = null)),
				o[3] && !o[2] && !o[1]
					? m
						? m.p(o, u)
						: ((m = V(o)), m.c(), m.m(t, d))
					: m && (m.d(1), (m = null)),
				o[2] ? (r ? r.p(o, u) : ((r = Y(o)), r.c(), r.m(t, null))) : r && (r.d(1), (r = null));
		},
		d(o) {
			o && h(e), c && c.d(), p && p.d(), m && m.d(), r && r.d(), (f = !1), W(C);
		}
	};
}
function ie(a) {
	let e,
		s,
		n,
		t,
		l = a[6].username + '',
		i,
		d,
		f,
		C = '(usernames cannot be changed)',
		c,
		p,
		m = 'Upload Profile';
	return {
		c() {
			(e = k('p')),
				(s = v('Your username is ')),
				(n = k('span')),
				(t = v('@')),
				(i = v(l)),
				(d = E()),
				(f = k('p')),
				(f.textContent = C),
				(c = E()),
				(p = k('a')),
				(p.textContent = m),
				this.h();
		},
		l(r) {
			e = g(r, 'P', {});
			var o = T(e);
			(s = y(o, 'Your username is ')), (n = g(o, 'SPAN', {}));
			var u = T(n);
			(t = y(u, '@')),
				(i = y(u, l)),
				u.forEach(h),
				o.forEach(h),
				(d = U(r)),
				(f = g(r, 'P', { 'data-svelte-h': !0 })),
				I(f) !== 'svelte-jxf608' && (f.textContent = C),
				(c = U(r)),
				(p = g(r, 'A', { href: !0, 'data-svelte-h': !0 })),
				I(p) !== 'svelte-3oiklz' && (p.textContent = m),
				this.h();
		},
		h() {
			P(p, 'href', '/login/photo');
		},
		m(r, o) {
			b(r, e, o),
				_(e, s),
				_(e, n),
				_(n, t),
				_(n, i),
				b(r, d, o),
				b(r, f, o),
				b(r, c, o),
				b(r, p, o);
		},
		p(r, o) {
			o & 64 && l !== (l = r[6].username + '') && N(i, l);
		},
		d(r) {
			r && (h(e), h(d), h(f), h(c), h(p));
		}
	};
}
function j(a) {
	let e, s, n, t;
	return {
		c() {
			(e = k('p')), (s = v('Checking availability of @')), (n = v(a[0])), (t = v('...')), this.h();
		},
		l(l) {
			e = g(l, 'P', { class: !0 });
			var i = T(e);
			(s = y(i, 'Checking availability of @')),
				(n = y(i, a[0])),
				(t = y(i, '...')),
				i.forEach(h),
				this.h();
		},
		h() {
			P(e, 'class', 'text-secondary');
		},
		m(l, i) {
			b(l, e, i), _(e, s), _(e, n), _(e, t);
		},
		p(l, i) {
			i & 1 && N(n, l[0]);
		},
		d(l) {
			l && h(e);
		}
	};
}
function O(a) {
	let e,
		s = 'must be 3-16 characters long, alphanumeric only';
	return {
		c() {
			(e = k('p')), (e.textContent = s), this.h();
		},
		l(n) {
			(e = g(n, 'P', { class: !0, 'data-svelte-h': !0 })),
				I(e) !== 'svelte-md31px' && (e.textContent = s),
				this.h();
		},
		h() {
			P(e, 'class', 'text-sm text-error');
		},
		m(n, t) {
			b(n, e, t);
		},
		d(n) {
			n && h(e);
		}
	};
}
function V(a) {
	let e, s, n, t;
	return {
		c() {
			(e = k('p')), (s = v('@')), (n = v(a[0])), (t = v(' is not available')), this.h();
		},
		l(l) {
			e = g(l, 'P', { class: !0 });
			var i = T(e);
			(s = y(i, '@')), (n = y(i, a[0])), (t = y(i, ' is not available')), i.forEach(h), this.h();
		},
		h() {
			P(e, 'class', 'text-sm text-warning');
		},
		m(l, i) {
			b(l, e, i), _(e, s), _(e, n), _(e, t);
		},
		p(l, i) {
			i & 1 && N(n, l[0]);
		},
		d(l) {
			l && h(e);
		}
	};
}
function Y(a) {
	let e, s, n;
	return {
		c() {
			(e = k('button')), (s = v('Confirm username @')), (n = v(a[0])), this.h();
		},
		l(t) {
			e = g(t, 'BUTTON', { class: !0 });
			var l = T(e);
			(s = y(l, 'Confirm username @')), (n = y(l, a[0])), l.forEach(h), this.h();
		},
		h() {
			P(e, 'class', 'btn btn-success');
		},
		m(t, l) {
			b(t, e, l), _(e, s), _(e, n);
		},
		p(t, l) {
			l & 1 && N(n, t[0]);
		},
		d(t) {
			t && h(e);
		}
	};
}
function oe(a) {
	let e;
	function s(l, i) {
		var d;
		return (d = l[6]) != null && d.username ? ie : ae;
	}
	let n = s(a),
		t = n(a);
	return {
		c() {
			t.c(), (e = R());
		},
		l(l) {
			t.l(l), (e = R());
		},
		m(l, i) {
			t.m(l, i), b(l, e, i);
		},
		p(l, i) {
			n === (n = s(l)) && t ? t.p(l, i) : (t.d(1), (t = n(l)), t && (t.c(), t.m(e.parentNode, e)));
		},
		d(l) {
			l && h(e), t.d(l);
		}
	};
}
function re(a) {
	let e, s;
	return (
		(e = new ee({ props: { $$slots: { default: [oe] }, $$scope: { ctx: a } } })),
		{
			c() {
				H(e.$$.fragment);
			},
			l(n) {
				J(e.$$.fragment, n);
			},
			m(n, t) {
				K(e, n, t), (s = !0);
			},
			p(n, [t]) {
				const l = {};
				t & 4223 && (l.$$scope = { dirty: t, ctx: n }), e.$set(l);
			},
			i(n) {
				s || (Q(e.$$.fragment, n), (s = !0));
			},
			o(n) {
				X(e.$$.fragment, n), (s = !1);
			},
			d(n) {
				$(e, n);
			}
		}
	);
}
const ue = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
function fe(a, e, s) {
	let n, t, l, i, d;
	L(a, te, (u) => s(11, (i = u))), L(a, se, (u) => s(6, (d = u))), x.set(66);
	let f = '',
		C = !1,
		c = !1,
		p;
	async function m() {
		s(2, (c = !1)),
			clearTimeout(p),
			s(1, (C = !0)),
			(p = setTimeout(async () => {
				console.log('checking availability of', f);
				const u = B(D, 'usernames', f),
					w = await le(u).then((q) => q.exists());
				s(2, (c = !w)), s(1, (C = !1));
			}, 500));
	}
	async function r() {
		console.log('confirming username', f);
		const u = ne(D);
		u.set(B(D, 'usernames', f), { uid: i == null ? void 0 : i.uid }),
			u.set(B(D, 'users', i.uid), {
				username: f,
				photoURL: (i == null ? void 0 : i.photoURL) ?? null,
				published: !0,
				bio: 'I am the Walrus',
				links: [{ title: 'Test Link', url: 'https://kung.foo', icon: 'custom' }]
			}),
			await u.commit(),
			s(0, (f = '')),
			s(2, (c = !1));
	}
	function o() {
		(f = this.value), s(0, f);
	}
	return (
		(a.$$.update = () => {
			a.$$.dirty & 1 &&
				s(3, (n = (f == null ? void 0 : f.length) > 2 && f.length < 16 && ue.test(f))),
				a.$$.dirty & 1 && s(5, (t = f.length > 0)),
				a.$$.dirty & 14 && s(4, (l = n && !c && !C));
		}),
		[f, C, c, n, l, t, d, m, r, o]
	);
}
class de extends Z {
	constructor(e) {
		super(), G(this, e, fe, re, F, {});
	}
}
export { de as component };
