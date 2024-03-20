import {
	s as A,
	k as y,
	e as f,
	a as w,
	c as p,
	b as k,
	v as x,
	g as T,
	f as b,
	o as h,
	i as B,
	h as m,
	w as N,
	n as D,
	r as E
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S,
	i as I,
	c as R,
	b as U,
	m as q,
	t as z,
	a as H,
	d as M
} from '../chunks/index.BqBZE8_s.js';
import { p as P } from '../chunks/stores.BBkUZuCL.js';
import {
	u as V,
	r as Y,
	s as F,
	w as G,
	d as O,
	a as $,
	b as J,
	c as K
} from '../chunks/firebase.BXW4q-2E.js';
import { g as j } from '../chunks/entry.vAAbogbC.js';
import { A as L } from '../chunks/AuthCheck.CwOMPwgQ.js';
function Q(l) {
	let t,
		s,
		e = 'Are you sure you want to delete this delicious dinner?',
		n,
		a,
		o,
		r = 'Yes',
		i,
		c,
		v = 'No',
		g,
		C;
	return {
		c() {
			(t = f('section')),
				(s = f('h1')),
				(s.textContent = e),
				(n = w()),
				(a = f('div')),
				(o = f('button')),
				(o.textContent = r),
				(i = w()),
				(c = f('button')),
				(c.textContent = v),
				this.h();
		},
		l(d) {
			t = p(d, 'SECTION', { class: !0 });
			var u = k(t);
			(s = p(u, 'H1', { class: !0, 'data-svelte-h': !0 })),
				x(s) !== 'svelte-18g0lvl' && (s.textContent = e),
				(n = T(u)),
				(a = p(u, 'DIV', { class: !0 }));
			var _ = k(a);
			(o = p(_, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
				x(o) !== 'svelte-yrmgyy' && (o.textContent = r),
				(i = T(_)),
				(c = p(_, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
				x(c) !== 'svelte-bsa1xz' && (c.textContent = v),
				_.forEach(b),
				u.forEach(b),
				this.h();
		},
		h() {
			h(s, 'class', 'text-center text-2xl font-bold'),
				h(o, 'class', 'btn btn-primary'),
				h(c, 'class', 'btn btn-secondary'),
				h(a, 'class', 'flex flex-col justify-center gap-4'),
				h(t, 'class', 'flex h-full w-full max-w-80 flex-col justify-center gap-10 self-center');
		},
		m(d, u) {
			B(d, t, u),
				m(t, s),
				m(t, n),
				m(t, a),
				m(a, o),
				m(a, i),
				m(a, c),
				g || ((C = [N(o, 'click', l[0]), N(c, 'click', l[1])]), (g = !0));
		},
		p: D,
		d(d) {
			d && b(t), (g = !1), E(C);
		}
	};
}
function W(l) {
	let t, s;
	return (
		(t = new L({ props: { $$slots: { default: [Q] }, $$scope: { ctx: l } } })),
		{
			c() {
				R(t.$$.fragment);
			},
			l(e) {
				U(t.$$.fragment, e);
			},
			m(e, n) {
				q(t, e, n), (s = !0);
			},
			p(e, [n]) {
				const a = {};
				n & 16 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				s || (z(t.$$.fragment, e), (s = !0));
			},
			o(e) {
				H(t.$$.fragment, e), (s = !1);
			},
			d(e) {
				M(t, e);
			}
		}
	);
}
function X(l, t, s) {
	let e, n;
	return (
		y(l, P, (r) => s(2, (e = r))),
		y(l, V, (r) => s(3, (n = r))),
		[
			async () => {
				const r = Y(F, `meals/${e.params.dish}.png`),
					i = G($);
				i.update(O($, 'users', n.uid), { likedMeals: J(e.params.dish) }),
					i.delete(O($, 'meals', e.params.dish)),
					await i.commit(),
					await K(r),
					j('/');
			},
			() => {
				j('/feed');
			}
		]
	);
}
class ot extends S {
	constructor(t) {
		super(), I(this, t, X, W, A, {});
	}
}
export { ot as component };
