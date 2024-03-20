import {
	s as r,
	e as c,
	c as i,
	v as l,
	o as f,
	i as m,
	n as u,
	f as p
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as h,
	i as _,
	c as d,
	b as $,
	m as g,
	t as x,
	a as v,
	d as b
} from '../chunks/index.BqBZE8_s.js';
import { A as k } from '../chunks/AuthCheck.CwOMPwgQ.js';
function w(s) {
	let t,
		a = '<a href="/login/photo" class="btn btn-accent max-w-56">Update profile picture</a>';
	return {
		c() {
			(t = c('main')), (t.innerHTML = a), this.h();
		},
		l(e) {
			(t = i(e, 'MAIN', { class: !0, 'data-svelte-h': !0 })),
				l(t) !== 'svelte-ywzxcf' && (t.innerHTML = a),
				this.h();
		},
		h() {
			f(t, 'class', 'flex h-full flex-col justify-center self-center');
		},
		m(e, n) {
			m(e, t, n);
		},
		p: u,
		d(e) {
			e && p(t);
		}
	};
}
function y(s) {
	let t, a;
	return (
		(t = new k({ props: { $$slots: { default: [w] }, $$scope: { ctx: s } } })),
		{
			c() {
				d(t.$$.fragment);
			},
			l(e) {
				$(t.$$.fragment, e);
			},
			m(e, n) {
				g(t, e, n), (a = !0);
			},
			p(e, [n]) {
				const o = {};
				n & 2 && (o.$$scope = { dirty: n, ctx: e }), t.$set(o);
			},
			i(e) {
				a || (x(t.$$.fragment, e), (a = !0));
			},
			o(e) {
				v(t.$$.fragment, e), (a = !1);
			},
			d(e) {
				b(t, e);
			}
		}
	);
}
function A(s, t, a) {
	let { data: e } = t;
	return (
		(s.$$set = (n) => {
			'data' in n && a(0, (e = n.data));
		}),
		[e]
	);
}
class L extends h {
	constructor(t) {
		super(), _(this, t, A, y, r, { data: 0 });
	}
}
export { L as component };
