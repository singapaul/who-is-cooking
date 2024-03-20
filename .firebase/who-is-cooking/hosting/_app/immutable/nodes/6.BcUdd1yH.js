import {
	d as J,
	a as R,
	k as Se,
	u as Me,
	w as Ue,
	l as Ve,
	b as Le
} from '../chunks/firebase.BXW4q-2E.js';
import {
	s as Ne,
	e as h,
	a as y,
	t as z,
	c as _,
	b as g,
	f,
	g as E,
	d as F,
	v as we,
	y as je,
	o as u,
	i as K,
	h as s,
	w as me,
	j as H,
	r as xe,
	k as ve,
	D as ze
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as Fe,
	i as Pe,
	t as P,
	a as Q,
	e as qe,
	c as he,
	b as _e,
	m as pe,
	d as be,
	g as Ae
} from '../chunks/index.BqBZE8_s.js';
import { w as Ge } from '../chunks/index.Drio3CKC.js';
import { g as Oe } from '../chunks/entry.vAAbogbC.js';
import { p as He } from '../chunks/stores.BBkUZuCL.js';
import { C as ge } from '../chunks/Confetti.wDXda6tx.js';
import { n as Je } from '../chunks/notifications.DHR35Uvq.js';
const Ke = async ({ params: t }) => {
		let l;
		const o = J(R, 'meals', t.dish),
			p = await Se(o);
		p.exists() ? (l = p.data()) : console.log('No such document!'), console.log(l);
		const {
			chef: a,
			cost: r,
			createdAt: m,
			dish: b,
			likedBy: i,
			photoURL: n,
			postedById: e,
			recipe: v
		} = l;
		return {
			chef: a,
			cost: r,
			createdAt: m,
			dish: b,
			likedBy: i,
			photoURL: n,
			postedById: e,
			recipe: v
		};
	},
	it = Object.freeze(
		Object.defineProperty({ __proto__: null, load: Ke }, Symbol.toStringTag, { value: 'Module' })
	);
function Re(t) {
	let l,
		o = '❤️',
		p,
		a,
		r,
		m,
		b,
		i,
		n;
	return (
		(a = new ge({})),
		(m = new ge({})),
		(i = new ge({})),
		{
			c() {
				(l = h('div')),
					(l.textContent = o),
					(p = y()),
					he(a.$$.fragment),
					(r = y()),
					he(m.$$.fragment),
					(b = y()),
					he(i.$$.fragment),
					this.h();
			},
			l(e) {
				(l = _(e, 'DIV', { class: !0, 'data-svelte-h': !0 })),
					we(l) !== 'svelte-1awhxb7' && (l.textContent = o),
					(p = E(e)),
					_e(a.$$.fragment, e),
					(r = E(e)),
					_e(m.$$.fragment, e),
					(b = E(e)),
					_e(i.$$.fragment, e),
					this.h();
			},
			h() {
				u(l, 'class', 'badge');
			},
			m(e, v) {
				K(e, l, v),
					K(e, p, v),
					pe(a, e, v),
					K(e, r, v),
					pe(m, e, v),
					K(e, b, v),
					pe(i, e, v),
					(n = !0);
			},
			i(e) {
				n || (P(a.$$.fragment, e), P(m.$$.fragment, e), P(i.$$.fragment, e), (n = !0));
			},
			o(e) {
				Q(a.$$.fragment, e), Q(m.$$.fragment, e), Q(i.$$.fragment, e), (n = !1);
			},
			d(e) {
				e && (f(l), f(p), f(r), f(b)), be(a, e), be(m, e), be(i, e);
			}
		}
	);
}
function Qe(t) {
	let l,
		o,
		p,
		a,
		r,
		m,
		b,
		i,
		n,
		e,
		v,
		V = t[1].dish + '',
		S,
		c,
		I,
		L = t[1].recipe + '',
		W,
		ie,
		C,
		X,
		B,
		M,
		q = t[1].chef + '',
		Y,
		oe,
		j,
		re,
		A = t[1].cost + '',
		Z,
		ne,
		D,
		O,
		G = t[0] ? 'Un-favourite' : 'Favourite',
		ee,
		ce,
		T,
		ke = 'Edit',
		de,
		U,
		ye = 'Delete',
		k,
		ue,
		Ee,
		d = t[0] && Re();
	return {
		c() {
			(l = h('section')),
				(o = h('div')),
				(p = h('figure')),
				(a = h('img')),
				(b = y()),
				(i = h('div')),
				(n = h('div')),
				(e = h('div')),
				(v = h('h2')),
				(S = z(V)),
				(c = y()),
				(I = h('p')),
				(W = z(L)),
				(ie = y()),
				(C = h('div')),
				d && d.c(),
				(X = y()),
				(B = h('div')),
				(M = h('div')),
				(Y = z(q)),
				(oe = y()),
				(j = h('div')),
				(re = z('£')),
				(Z = z(A)),
				(ne = y()),
				(D = h('div')),
				(O = h('button')),
				(ee = z(G)),
				(ce = y()),
				(T = h('button')),
				(T.textContent = ke),
				(de = y()),
				(U = h('button')),
				(U.textContent = ye),
				this.h();
		},
		l($) {
			l = _($, 'SECTION', { class: !0 });
			var w = g(l);
			o = _(w, 'DIV', { class: !0 });
			var te = g(o);
			p = _(te, 'FIGURE', { class: !0 });
			var De = g(p);
			(a = _(De, 'IMG', { src: !0, alt: !0 })), De.forEach(f), (b = E(te)), (i = _(te, 'DIV', {}));
			var ae = g(i);
			n = _(ae, 'DIV', { class: !0 });
			var N = g(n);
			e = _(N, 'DIV', { class: !0 });
			var Ie = g(e);
			v = _(Ie, 'H2', { class: !0 });
			var Ce = g(v);
			(S = F(Ce, V)), Ce.forEach(f), Ie.forEach(f), (c = E(N)), (I = _(N, 'P', {}));
			var $e = g(I);
			(W = F($e, L)), $e.forEach(f), (ie = E(N)), (C = _(N, 'DIV', { class: !0 }));
			var se = g(C);
			d && d.l(se), (X = E(se)), (B = _(se, 'DIV', { class: !0 }));
			var le = g(B);
			M = _(le, 'DIV', { class: !0 });
			var Be = g(M);
			(Y = F(Be, q)), Be.forEach(f), (oe = E(le)), (j = _(le, 'DIV', { class: !0 }));
			var fe = g(j);
			(re = F(fe, '£')),
				(Z = F(fe, A)),
				fe.forEach(f),
				le.forEach(f),
				se.forEach(f),
				N.forEach(f),
				(ne = E(ae)),
				(D = _(ae, 'DIV', { class: !0 }));
			var x = g(D);
			O = _(x, 'BUTTON', { class: !0 });
			var Te = g(O);
			(ee = F(Te, G)),
				Te.forEach(f),
				(ce = E(x)),
				(T = _(x, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
				we(T) !== 'svelte-pk2ezz' && (T.textContent = ke),
				(de = E(x)),
				(U = _(x, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
				we(U) !== 'svelte-froue5' && (U.textContent = ye),
				x.forEach(f),
				ae.forEach(f),
				te.forEach(f),
				w.forEach(f),
				this.h();
		},
		h() {
			je(a.src, (r = t[1].photoURL)) || u(a, 'src', r),
				u(a, 'alt', (m = t[1].dish)),
				u(p, 'class', 'sm:w-1/2'),
				u(v, 'class', 'card-title'),
				u(e, 'class', 'flex flex-col justify-between'),
				u(M, 'class', 'badge badge-outline'),
				u(j, 'class', 'badge badge-outline'),
				u(B, 'class', 'ml-auto'),
				u(C, 'class', 'card-actions justify-between'),
				u(n, 'class', 'card-body'),
				u(O, 'class', 'btn btn-accent w-full'),
				u(T, 'class', 'btn btn-secondary w-full'),
				u(U, 'class', 'btn btn-warning w-full'),
				u(D, 'class', 'card-body flex w-full flex-col justify-evenly gap-4'),
				u(
					o,
					'class',
					'card m-auto max-h-[700px] max-w-96 border-4 border-indigo-600 bg-base-100 shadow-xl sm:max-w-[700px] sm:flex-row'
				),
				u(l, 'class', 'm-auto flex h-full w-full');
		},
		m($, w) {
			K($, l, w),
				s(l, o),
				s(o, p),
				s(p, a),
				s(o, b),
				s(o, i),
				s(i, n),
				s(n, e),
				s(e, v),
				s(v, S),
				s(n, c),
				s(n, I),
				s(I, W),
				s(n, ie),
				s(n, C),
				d && d.m(C, null),
				s(C, X),
				s(C, B),
				s(B, M),
				s(M, Y),
				s(B, oe),
				s(B, j),
				s(j, re),
				s(j, Z),
				s(i, ne),
				s(i, D),
				s(D, O),
				s(O, ee),
				s(D, ce),
				s(D, T),
				s(D, de),
				s(D, U),
				(k = !0),
				ue ||
					((Ee = [
						me(O, 'click', function () {
							ze(t[0] ? t[5] : t[4]) && (t[0] ? t[5] : t[4]).apply(this, arguments);
						}),
						me(T, 'click', t[9]),
						me(U, 'click', t[10])
					]),
					(ue = !0));
		},
		p($, [w]) {
			(t = $),
				(!k || (w & 2 && !je(a.src, (r = t[1].photoURL)))) && u(a, 'src', r),
				(!k || (w & 2 && m !== (m = t[1].dish))) && u(a, 'alt', m),
				(!k || w & 2) && V !== (V = t[1].dish + '') && H(S, V),
				(!k || w & 2) && L !== (L = t[1].recipe + '') && H(W, L),
				t[0]
					? d
						? w & 1 && P(d, 1)
						: ((d = Re()), d.c(), P(d, 1), d.m(C, X))
					: d &&
						(Ae(),
						Q(d, 1, 1, () => {
							d = null;
						}),
						qe()),
				(!k || w & 2) && q !== (q = t[1].chef + '') && H(Y, q),
				(!k || w & 2) && A !== (A = t[1].cost + '') && H(Z, A),
				(!k || w & 1) && G !== (G = t[0] ? 'Un-favourite' : 'Favourite') && H(ee, G);
		},
		i($) {
			k || (P(d), (k = !0));
		},
		o($) {
			Q(d), (k = !1);
		},
		d($) {
			$ && f(l), d && d.d(), (ue = !1), xe(Ee);
		}
	};
}
function We(t, l, o) {
	let p, a, r, m;
	ve(t, Me, (c) => o(7, (a = c))), ve(t, He, (c) => o(2, (r = c)));
	let { data: b } = l;
	const i = Ge([]);
	ve(t, i, (c) => o(8, (m = c)));
	let n = !1;
	const e = async () => {
			const c = Ue(R);
			c.update(J(R, 'users', a.uid), { likedMeals: Ve(r.params.dish) }),
				c.update(J(R, 'meals', r.params.dish), { likedBy: Ve(a.uid) }),
				await c.commit(),
				i.update((I) => [...I, a.uid]),
				Je.success('Added to favourites', 3e3);
		},
		v = async () => {
			const c = Ue(R);
			c.update(J(R, 'users', a.uid), { likedMeals: Le(r.params.dish) }),
				c.update(J(R, 'meals', r.params.dish), { likedBy: Le(a.uid) }),
				await c.commit(),
				i.update((I) => I.filter((L) => L !== a.uid));
		},
		V = () => Oe(`/feed/${r.params.dish}/edit`),
		S = () => Oe(`/feed/${r.params.dish}/delete`);
	return (
		(t.$$set = (c) => {
			'data' in c && o(6, (b = c.data));
		}),
		(t.$$.update = () => {
			t.$$.dirty & 64 && o(1, (p = b)),
				t.$$.dirty & 64 && b && b.likedBy && i.set(b.likedBy),
				t.$$.dirty & 384 && o(0, (n = m.includes(a == null ? void 0 : a.uid)));
		}),
		[n, p, r, i, e, v, b, a, m, V, S]
	);
}
class ot extends Fe {
	constructor(l) {
		super(), Pe(this, l, We, Qe, Ne, { data: 6 });
	}
}
export { ot as component, it as universal };
