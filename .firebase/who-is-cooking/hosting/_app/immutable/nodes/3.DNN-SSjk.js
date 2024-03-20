import {
	s as r,
	m as f,
	e as u,
	c,
	b as _,
	f as i,
	o as m,
	i as p,
	u as d,
	p as h,
	q as $
} from '../chunks/scheduler.CxO4csHG.js';
import { S as g, i as y, t as b, a as q } from '../chunks/index.BqBZE8_s.js';
function v(n) {
	let s, a;
	const o = n[1].default,
		t = f(o, n, n[0], null);
	return {
		c() {
			(s = u('main')), t && t.c(), this.h();
		},
		l(e) {
			s = c(e, 'MAIN', { class: !0 });
			var l = _(s);
			t && t.l(l), l.forEach(i), this.h();
		},
		h() {
			m(s, 'class', 'flex w-full flex-col justify-center self-center');
		},
		m(e, l) {
			p(e, s, l), t && t.m(s, null), (a = !0);
		},
		p(e, [l]) {
			t && t.p && (!a || l & 1) && d(t, o, e, e[0], a ? $(o, e[0], l, null) : h(e[0]), null);
		},
		i(e) {
			a || (b(t, e), (a = !0));
		},
		o(e) {
			q(t, e), (a = !1);
		},
		d(e) {
			e && i(s), t && t.d(e);
		}
	};
}
function S(n, s, a) {
	let { $$slots: o = {}, $$scope: t } = s;
	return (
		(n.$$set = (e) => {
			'$$scope' in e && a(0, (t = e.$$scope));
		}),
		[t, o]
	);
}
class A extends g {
	constructor(s) {
		super(), y(this, s, S, v, r, {});
	}
}
export { A as component };
