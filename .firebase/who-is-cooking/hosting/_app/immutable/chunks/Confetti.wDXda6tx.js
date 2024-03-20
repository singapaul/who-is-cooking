import {
	s as H,
	x as A,
	i as C,
	n as O,
	f as h,
	F as N,
	e as I,
	c as V,
	b as q,
	o as B,
	z as c,
	G as T,
	H as o
} from './scheduler.CxO4csHG.js';
import { e as R } from './each.DLoRWcad.js';
import { S as j, i as J } from './index.BqBZE8_s.js';
function v(t, e, n) {
	const i = t.slice();
	return (i[18] = e[n]), i;
}
function w(t) {
	let e,
		n = R({ length: t[6] }),
		i = [];
	for (let a = 0; a < n.length; a += 1) i[a] = E(v(t, n, a));
	return {
		c() {
			e = I('div');
			for (let a = 0; a < i.length; a += 1) i[a].c();
			this.h();
		},
		l(a) {
			e = V(a, 'DIV', { class: !0 });
			var u = q(e);
			for (let f = 0; f < i.length; f += 1) i[f].l(u);
			u.forEach(h), this.h();
		},
		h() {
			B(e, 'class', 'confetti-holder svelte-io58ff'),
				c(e, 'rounded', t[9]),
				c(e, 'cone', t[10]),
				c(e, 'no-gravity', t[11]);
		},
		m(a, u) {
			C(a, e, u);
			for (let f = 0; f < i.length; f += 1) i[f] && i[f].m(e, null);
		},
		p(a, u) {
			if (u & 20991) {
				n = R({ length: a[6] });
				let f;
				for (f = 0; f < n.length; f += 1) {
					const s = v(a, n, f);
					i[f] ? i[f].p(s, u) : ((i[f] = E(s)), i[f].c(), i[f].m(e, null));
				}
				for (; f < i.length; f += 1) i[f].d(1);
				i.length = n.length;
			}
			u & 512 && c(e, 'rounded', a[9]),
				u & 1024 && c(e, 'cone', a[10]),
				u & 2048 && c(e, 'no-gravity', a[11]);
		},
		d(a) {
			a && h(e), T(i, a);
		}
	};
}
function E(t) {
	let e;
	return {
		c() {
			(e = I('div')), this.h();
		},
		l(n) {
			(e = V(n, 'DIV', { class: !0, style: !0 })), q(e).forEach(h), this.h();
		},
		h() {
			B(e, 'class', 'confetti svelte-io58ff'),
				o(e, '--fall-distance', t[8]),
				o(e, '--size', t[0] + 'px'),
				o(e, '--color', t[14]()),
				o(e, '--skew', r(-45, 45) + 'deg,' + r(-45, 45) + 'deg'),
				o(e, '--rotation-xyz', r(-10, 10) + ', ' + r(-10, 10) + ', ' + r(-10, 10)),
				o(e, '--rotation-deg', r(0, 360) + 'deg'),
				o(e, '--translate-y-multiplier', r(t[2][0], t[2][1])),
				o(e, '--translate-x-multiplier', r(t[1][0], t[1][1])),
				o(e, '--scale', 0.1 * r(2, 10)),
				o(e, '--transition-duration', t[4] ? `calc(${t[3]}ms * var(--scale))` : `${t[3]}ms`),
				o(e, '--transition-delay', r(t[5][0], t[5][1]) + 'ms'),
				o(e, '--transition-iteration-count', t[4] ? 'infinite' : t[7]),
				o(e, '--x-spread', 1 - t[12]);
		},
		m(n, i) {
			C(n, e, i);
		},
		p(n, i) {
			i & 256 && o(e, '--fall-distance', n[8]),
				i & 1 && o(e, '--size', n[0] + 'px'),
				i & 4 && o(e, '--translate-y-multiplier', r(n[2][0], n[2][1])),
				i & 2 && o(e, '--translate-x-multiplier', r(n[1][0], n[1][1])),
				i & 24 &&
					o(e, '--transition-duration', n[4] ? `calc(${n[3]}ms * var(--scale))` : `${n[3]}ms`),
				i & 32 && o(e, '--transition-delay', r(n[5][0], n[5][1]) + 'ms'),
				i & 144 && o(e, '--transition-iteration-count', n[4] ? 'infinite' : n[7]),
				i & 4096 && o(e, '--x-spread', 1 - n[12]);
		},
		d(n) {
			n && h(e);
		}
	};
}
function K(t) {
	let e,
		n = !t[13] && w(t);
	return {
		c() {
			n && n.c(), (e = A());
		},
		l(i) {
			n && n.l(i), (e = A());
		},
		m(i, a) {
			n && n.m(i, a), C(i, e, a);
		},
		p(i, [a]) {
			i[13] ? n && (n.d(1), (n = null)) : n ? n.p(i, a) : ((n = w(i)), n.c(), n.m(e.parentNode, e));
		},
		i: O,
		o: O,
		d(i) {
			i && h(e), n && n.d(i);
		}
	};
}
function r(t, e) {
	return Math.random() * (e - t) + t;
}
function L(t, e, n) {
	let { size: i = 10 } = e,
		{ x: a = [-0.5, 0.5] } = e,
		{ y: u = [0.25, 1] } = e,
		{ duration: f = 2e3 } = e,
		{ infinite: s = !1 } = e,
		{ delay: _ = [0, 50] } = e,
		{ colorRange: d = [0, 360] } = e,
		{ colorArray: m = [] } = e,
		{ amount: z = 50 } = e,
		{ iterationCount: g = 1 } = e,
		{ fallDistance: k = '100px' } = e,
		{ rounded: b = !1 } = e,
		{ cone: D = !1 } = e,
		{ noGravity: S = !1 } = e,
		{ xSpread: G = 0.15 } = e,
		{ destroyOnComplete: y = !0 } = e,
		M = !1;
	N(() => {
		!y || s || g == 'infinite' || setTimeout(() => n(13, (M = !0)), (f + _[1]) * g);
	});
	function F() {
		return m.length
			? m[Math.round(Math.random() * (m.length - 1))]
			: `hsl(${Math.round(r(d[0], d[1]))}, 75%, 50%)`;
	}
	return (
		(t.$$set = (l) => {
			'size' in l && n(0, (i = l.size)),
				'x' in l && n(1, (a = l.x)),
				'y' in l && n(2, (u = l.y)),
				'duration' in l && n(3, (f = l.duration)),
				'infinite' in l && n(4, (s = l.infinite)),
				'delay' in l && n(5, (_ = l.delay)),
				'colorRange' in l && n(15, (d = l.colorRange)),
				'colorArray' in l && n(16, (m = l.colorArray)),
				'amount' in l && n(6, (z = l.amount)),
				'iterationCount' in l && n(7, (g = l.iterationCount)),
				'fallDistance' in l && n(8, (k = l.fallDistance)),
				'rounded' in l && n(9, (b = l.rounded)),
				'cone' in l && n(10, (D = l.cone)),
				'noGravity' in l && n(11, (S = l.noGravity)),
				'xSpread' in l && n(12, (G = l.xSpread)),
				'destroyOnComplete' in l && n(17, (y = l.destroyOnComplete));
		}),
		[i, a, u, f, s, _, z, g, k, b, D, S, G, M, F, d, m, y]
	);
}
class W extends j {
	constructor(e) {
		super(),
			J(this, e, L, K, H, {
				size: 0,
				x: 1,
				y: 2,
				duration: 3,
				infinite: 4,
				delay: 5,
				colorRange: 15,
				colorArray: 16,
				amount: 6,
				iterationCount: 7,
				fallDistance: 8,
				rounded: 9,
				cone: 10,
				noGravity: 11,
				xSpread: 12,
				destroyOnComplete: 17
			});
	}
}
export { W as C };
