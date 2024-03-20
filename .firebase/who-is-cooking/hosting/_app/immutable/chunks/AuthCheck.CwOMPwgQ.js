import {
	s as b,
	x as m,
	i as h,
	f as d,
	k,
	e as g,
	c as v,
	v as y,
	o as $,
	n as u,
	m as A,
	u as C,
	p as M,
	q as S
} from './scheduler.CxO4csHG.js';
import { S as j, i as q, g as w, a as f, e as H, t as _ } from './index.BqBZE8_s.js';
import { u as L } from './firebase.BXW4q-2E.js';
function N(r) {
	let e,
		n =
			'<h1>You must be signed in to view this page</h1> <a class="btn btn-primary" href="/login">Sign in</a>';
	return {
		c() {
			(e = g('main')), (e.innerHTML = n), this.h();
		},
		l(t) {
			(e = v(t, 'MAIN', { class: !0, 'data-svelte-h': !0 })),
				y(e) !== 'svelte-rjc12x' && (e.innerHTML = n),
				this.h();
		},
		h() {
			$(e, 'class', 'flex h-screen w-full flex-col items-center justify-center gap-4 self-center');
		},
		m(t, s) {
			h(t, e, s);
		},
		p: u,
		i: u,
		o: u,
		d(t) {
			t && d(e);
		}
	};
}
function T(r) {
	let e;
	const n = r[2].default,
		t = A(n, r, r[1], null);
	return {
		c() {
			t && t.c();
		},
		l(s) {
			t && t.l(s);
		},
		m(s, i) {
			t && t.m(s, i), (e = !0);
		},
		p(s, i) {
			t && t.p && (!e || i & 2) && C(t, n, s, s[1], e ? S(n, s[1], i, null) : M(s[1]), null);
		},
		i(s) {
			e || (_(t, s), (e = !0));
		},
		o(s) {
			f(t, s), (e = !1);
		},
		d(s) {
			t && t.d(s);
		}
	};
}
function x(r) {
	let e, n, t, s;
	const i = [T, N],
		o = [];
	function p(l, a) {
		return l[0] ? 0 : 1;
	}
	return (
		(e = p(r)),
		(n = o[e] = i[e](r)),
		{
			c() {
				n.c(), (t = m());
			},
			l(l) {
				n.l(l), (t = m());
			},
			m(l, a) {
				o[e].m(l, a), h(l, t, a), (s = !0);
			},
			p(l, [a]) {
				let c = e;
				(e = p(l)),
					e === c
						? o[e].p(l, a)
						: (w(),
							f(o[c], 1, 1, () => {
								o[c] = null;
							}),
							H(),
							(n = o[e]),
							n ? n.p(l, a) : ((n = o[e] = i[e](l)), n.c()),
							_(n, 1),
							n.m(t.parentNode, t));
			},
			i(l) {
				s || (_(n), (s = !0));
			},
			o(l) {
				f(n), (s = !1);
			},
			d(l) {
				l && d(t), o[e].d(l);
			}
		}
	);
}
function I(r, e, n) {
	let t;
	k(r, L, (o) => n(0, (t = o)));
	let { $$slots: s = {}, $$scope: i } = e;
	return (
		(r.$$set = (o) => {
			'$$scope' in o && n(1, (i = o.$$scope));
		}),
		[t, i, s]
	);
}
class D extends j {
	constructor(e) {
		super(), q(this, e, I, x, b, {});
	}
}
export { D as A };
