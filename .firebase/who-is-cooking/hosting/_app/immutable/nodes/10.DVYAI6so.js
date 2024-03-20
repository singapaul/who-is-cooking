import {
	s as F,
	k as M,
	e as g,
	a as x,
	t as H,
	c as _,
	v as D,
	g as L,
	b as $,
	f,
	d as I,
	o as l,
	y as S,
	i as v,
	h as w,
	w as O
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as T,
	i as B,
	c as G,
	b as N,
	m as V,
	t as z,
	a as J,
	d as K
} from '../chunks/index.BqBZE8_s.js';
import { n as Q } from '../chunks/nav.BSPGET2L.js';
import { A as W } from '../chunks/AuthCheck.CwOMPwgQ.js';
import {
	u as X,
	g as Y,
	r as Z,
	s as ee,
	h as te,
	i as se,
	j as ae,
	d as re,
	a as le
} from '../chunks/firebase.BXW4q-2E.js';
function j(u) {
	let t,
		n = 'Uploading...',
		s,
		a;
	return {
		c() {
			(t = g('p')), (t.textContent = n), (s = x()), (a = g('progress')), this.h();
		},
		l(e) {
			(t = _(e, 'P', { 'data-svelte-h': !0 })),
				D(t) !== 'svelte-be0b5h' && (t.textContent = n),
				(s = L(e)),
				(a = _(e, 'PROGRESS', { class: !0 })),
				$(a).forEach(f),
				this.h();
		},
		h() {
			l(a, 'class', 'progress progress-info mt-6 w-56');
		},
		m(e, o) {
			v(e, t, o), v(e, s, o), v(e, a, o);
		},
		d(e) {
			e && (f(t), f(s), f(a));
		}
	};
}
function oe(u) {
	let t,
		n = 'Upload a Profile Photo',
		s,
		a,
		e,
		o,
		b,
		R,
		c,
		U = '<span class="label-text">Pick a file</span>',
		C,
		h,
		y,
		P,
		d,
		k,
		E,
		q,
		i = u[1] && j();
	return {
		c() {
			(t = g('h2')),
				(t.textContent = n),
				(s = x()),
				(a = g('form')),
				(e = g('div')),
				(o = g('img')),
				(R = x()),
				(c = g('label')),
				(c.innerHTML = U),
				(C = x()),
				(h = g('input')),
				(y = x()),
				i && i.c(),
				(P = x()),
				(d = g('a')),
				(k = H('Finish')),
				this.h();
		},
		l(r) {
			(t = _(r, 'H2', { class: !0, 'data-svelte-h': !0 })),
				D(t) !== 'svelte-1whglfv' && (t.textContent = n),
				(s = L(r)),
				(a = _(r, 'FORM', { class: !0 }));
			var p = $(a);
			e = _(p, 'DIV', { class: !0 });
			var m = $(e);
			(o = _(m, 'IMG', { src: !0, alt: !0, width: !0, height: !0, class: !0 })),
				(R = L(m)),
				(c = _(m, 'LABEL', { for: !0, class: !0, 'data-svelte-h': !0 })),
				D(c) !== 'svelte-qouqa7' && (c.innerHTML = U),
				(C = L(m)),
				(h = _(m, 'INPUT', { name: !0, type: !0, class: !0, accept: !0 })),
				(y = L(m)),
				i && i.l(m),
				m.forEach(f),
				p.forEach(f),
				(P = L(r)),
				(d = _(r, 'A', { href: !0, class: !0 }));
			var A = $(d);
			(k = I(A, 'Finish')), A.forEach(f), this.h();
		},
		h() {
			var r;
			l(t, 'class', 'card-title'),
				S(o.src, (b = u[0] ?? ((r = u[3]) == null ? void 0 : r.photoURL) ?? '/user.png')) ||
					l(o, 'src', b),
				l(o, 'alt', 'photoURL'),
				l(o, 'width', '256'),
				l(o, 'height', '256'),
				l(o, 'class', 'mx-auto'),
				l(c, 'for', 'photoURL'),
				l(c, 'class', 'label'),
				l(h, 'name', 'photoURL'),
				l(h, 'type', 'file'),
				l(h, 'class', 'file-input file-input-bordered w-full max-w-xs'),
				l(h, 'accept', 'image/png, image/jpeg, image/gif, image/webp'),
				l(e, 'class', 'form-control mx-auto my-10 w-full max-w-xs text-center'),
				l(a, 'class', 'w-full max-w-screen-md'),
				l(d, 'href', u[2]),
				l(d, 'class', 'btn btn-primary');
		},
		m(r, p) {
			v(r, t, p),
				v(r, s, p),
				v(r, a, p),
				w(a, e),
				w(e, o),
				w(e, R),
				w(e, c),
				w(e, C),
				w(e, h),
				w(e, y),
				i && i.m(e, null),
				v(r, P, p),
				v(r, d, p),
				w(d, k),
				E || ((q = O(h, 'change', u[4])), (E = !0));
		},
		p(r, p) {
			var m;
			p & 9 &&
				!S(o.src, (b = r[0] ?? ((m = r[3]) == null ? void 0 : m.photoURL) ?? '/user.png')) &&
				l(o, 'src', b),
				r[1] ? i || ((i = j()), i.c(), i.m(e, null)) : i && (i.d(1), (i = null)),
				p & 4 && l(d, 'href', r[2]);
		},
		d(r) {
			r && (f(t), f(s), f(a), f(P), f(d)), i && i.d(), (E = !1), q();
		}
	};
}
function ne(u) {
	let t, n;
	return (
		(t = new W({ props: { $$slots: { default: [oe] }, $$scope: { ctx: u } } })),
		{
			c() {
				G(t.$$.fragment);
			},
			l(s) {
				N(t.$$.fragment, s);
			},
			m(s, a) {
				V(t, s, a), (n = !0);
			},
			p(s, [a]) {
				const e = {};
				a & 79 && (e.$$scope = { dirty: a, ctx: s }), t.$set(e);
			},
			i(s) {
				n || (z(t.$$.fragment, s), (n = !0));
			},
			o(s) {
				J(t.$$.fragment, s), (n = !1);
			},
			d(s) {
				K(t, s);
			}
		}
	);
}
function ie(u, t, n) {
	let s, a, e;
	M(u, X, (c) => n(5, (a = c))), M(u, Y, (c) => n(3, (e = c))), Q.set(99);
	let o,
		b = !1;
	async function R(c) {
		n(1, (b = !0));
		const U = c.target.files[0];
		n(0, (o = URL.createObjectURL(U)));
		const C = Z(ee, `users/${a.uid}/profile.png`),
			h = await te(C, U),
			y = await se(h.ref);
		await ae(re(le, 'users', a.uid), { photoURL: y }), n(1, (b = !1));
	}
	return n(2, (s = '/')), [o, b, s, e, R];
}
class he extends T {
	constructor(t) {
		super(), B(this, t, ie, ne, F, {});
	}
}
export { he as component };
