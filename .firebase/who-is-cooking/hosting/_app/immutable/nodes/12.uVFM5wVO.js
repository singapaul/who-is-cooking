import {
	s as Ue,
	k as ae,
	I as ke,
	e as d,
	a as w,
	t as ce,
	c as _,
	b as U,
	g as y,
	d as ue,
	f as p,
	v as ie,
	o as u,
	J as ge,
	y as be,
	i as H,
	h as f,
	w as oe,
	B as Ce,
	K as Ee,
	r as Ie,
	j as ye
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as Pe,
	i as Se,
	c as W,
	b as X,
	m as Y,
	t as Z,
	a as x,
	d as ee,
	j as Ae
} from '../chunks/index.BqBZE8_s.js';
import { c as Te, F as Ve, a as qe, T as Be, C as Ne } from '../chunks/CurrencyInput.DRDzj19Z.js';
import { g as De } from '../chunks/entry.vAAbogbC.js';
import { A as Me } from '../chunks/AuthCheck.CwOMPwgQ.js';
import {
	u as je,
	g as Fe,
	m as Oe,
	n as Ge,
	a as ve,
	o as He,
	r as Je,
	s as Ke,
	h as ze,
	i as Qe,
	j as We,
	d as Xe
} from '../chunks/firebase.BXW4q-2E.js';
function $e(s) {
	let e,
		r = s[3].cost + '',
		l;
	return {
		c() {
			(e = d('small')), (l = ce(r));
		},
		l(t) {
			e = _(t, 'SMALL', {});
			var n = U(e);
			(l = ue(n, r)), n.forEach(p);
		},
		m(t, n) {
			H(t, e, n), f(e, l);
		},
		p(t, n) {
			n & 8 && r !== (r = t[3].cost + '') && ye(l, r);
		},
		d(t) {
			t && p(e);
		}
	};
}
function Le(s) {
	let e,
		r = s[3].photoURL + '',
		l;
	return {
		c() {
			(e = d('small')), (l = ce(r));
		},
		l(t) {
			e = _(t, 'SMALL', {});
			var n = U(e);
			(l = ue(n, r)), n.forEach(p);
		},
		m(t, n) {
			H(t, e, n), f(e, l);
		},
		p(t, n) {
			n & 8 && r !== (r = t[3].photoURL + '') && ye(l, r);
		},
		d(t) {
			t && p(e);
		}
	};
}
function we(s) {
	let e,
		r = 'Uploading...',
		l,
		t;
	return {
		c() {
			(e = d('p')), (e.textContent = r), (l = w()), (t = d('progress')), this.h();
		},
		l(n) {
			(e = _(n, 'P', { 'data-svelte-h': !0 })),
				ie(e) !== 'svelte-be0b5h' && (e.textContent = r),
				(l = y(n)),
				(t = _(n, 'PROGRESS', { class: !0 })),
				U(t).forEach(p),
				this.h();
		},
		h() {
			u(t, 'class', 'progress progress-info mt-6 w-56');
		},
		m(n, g) {
			H(n, e, g), H(n, l, g), H(n, t, g);
		},
		d(n) {
			n && (p(e), p(l), p(t));
		}
	};
}
function Ye(s) {
	let e,
		r,
		l,
		t,
		n,
		g,
		M,
		v,
		R,
		P,
		te = 'Meal cost (£)',
		S,
		j,
		A,
		N,
		C,
		$,
		J,
		F,
		K,
		a,
		c,
		T,
		D,
		E,
		z,
		L,
		fe = '<span class="label-text">Pick a file</span>',
		se,
		I,
		le,
		re,
		V,
		pe = 'submit',
		O,
		ne,
		me;
	(r = new Ve({
		props: {
			fieldName: 'dish',
			label: 'Dish name',
			bindValue: s[2].dish,
			handleChange: s[7],
			errors: s[3].dish
		}
	})),
		(t = new qe({
			props: {
				fieldName: 'chef',
				label: 'Chef',
				bindValue: s[2].chef,
				handleChange: s[7],
				errors: s[3].chef
			}
		})),
		(g = new Be({
			props: {
				fieldName: 'recipe',
				label: 'Recipe',
				bindValue: s[2].recipe,
				handleChange: s[7],
				errors: s[3].recipe
			}
		}));
	let m = s[3].cost && $e(s);
	function Re(o) {
		s[10](o);
	}
	let he = { currency: 'GBP', name: 'cost' };
	s[2].cost !== void 0 && (he.value = s[2].cost),
		($ = new Ne({ props: he })),
		ke.push(() => Ae($, 'value', Re)),
		$.$on('change', s[7]);
	let h = s[3].photoURL && Le(s),
		b = s[1] && we();
	return {
		c() {
			(e = d('form')),
				W(r.$$.fragment),
				(l = w()),
				W(t.$$.fragment),
				(n = w()),
				W(g.$$.fragment),
				(M = w()),
				(v = d('label')),
				(R = d('div')),
				(P = d('span')),
				(S = ce(te)),
				(j = w()),
				(A = d('span')),
				m && m.c(),
				(N = w()),
				(C = d('div')),
				W($.$$.fragment),
				(K = w()),
				(a = d('div')),
				(c = d('img')),
				(D = w()),
				(E = d('span')),
				h && h.c(),
				(z = w()),
				(L = d('label')),
				(L.innerHTML = fe),
				(se = w()),
				(I = d('input')),
				(le = w()),
				b && b.c(),
				(re = w()),
				(V = d('button')),
				(V.textContent = pe),
				this.h();
		},
		l(o) {
			e = _(o, 'FORM', { class: !0 });
			var i = U(e);
			X(r.$$.fragment, i),
				(l = y(i)),
				X(t.$$.fragment, i),
				(n = y(i)),
				X(g.$$.fragment, i),
				(M = y(i)),
				(v = _(i, 'LABEL', { class: !0, for: !0 }));
			var q = U(v);
			R = _(q, 'DIV', { class: !0 });
			var B = U(R);
			P = _(B, 'SPAN', { class: !0 });
			var G = U(P);
			(S = ue(G, te)), G.forEach(p), (j = y(B)), (A = _(B, 'SPAN', { class: !0 }));
			var Q = U(A);
			m && m.l(Q), Q.forEach(p), B.forEach(p), (N = y(q)), (C = _(q, 'DIV', { class: !0 }));
			var de = U(C);
			X($.$$.fragment, de),
				de.forEach(p),
				q.forEach(p),
				(K = y(i)),
				(a = _(i, 'DIV', { class: !0 }));
			var k = U(a);
			(c = _(k, 'IMG', { src: !0, alt: !0, width: !0, height: !0, class: !0 })),
				(D = y(k)),
				(E = _(k, 'SPAN', { class: !0 }));
			var _e = U(E);
			h && h.l(_e),
				_e.forEach(p),
				(z = y(k)),
				(L = _(k, 'LABEL', { for: !0, class: !0, 'data-svelte-h': !0 })),
				ie(L) !== 'svelte-qouqa7' && (L.innerHTML = fe),
				(se = y(k)),
				(I = _(k, 'INPUT', { name: !0, type: !0, class: !0, accept: !0 })),
				(le = y(k)),
				b && b.l(k),
				k.forEach(p),
				(re = y(i)),
				(V = _(i, 'BUTTON', { type: !0, class: !0, 'data-svelte-h': !0 })),
				ie(V) !== 'svelte-5uxpl7' && (V.textContent = pe),
				i.forEach(p),
				this.h();
		},
		h() {
			u(P, 'class', 'font-bold'),
				u(A, 'class', 'label-text'),
				u(R, 'class', 'label'),
				u(
					C,
					'class',
					(F = ge(`my-currency-input ${s[3].cost && 'my-currency-input-error'}`) + ' svelte-kqxn9h')
				),
				u(v, 'class', 'form-control'),
				u(v, 'for', 'cost'),
				be(c.src, (T = s[0] ?? '/default-meal.webp')) || u(c, 'src', T),
				u(c, 'alt', 'photoURL'),
				u(c, 'width', '256'),
				u(c, 'height', '256'),
				u(c, 'class', 'mx-auto max-h-52 object-scale-down'),
				u(E, 'class', 'label-text'),
				u(L, 'for', 'photoURL'),
				u(L, 'class', 'label'),
				u(I, 'name', 'photoURL'),
				u(I, 'type', 'file'),
				u(I, 'class', 'file-input file-input-bordered w-full max-w-xs'),
				u(I, 'accept', 'image/png, image/jpeg, image/gif, image/webp'),
				u(a, 'class', 'form-control mx-auto my-10 w-full max-w-xs text-center'),
				u(V, 'type', 'submit'),
				u(V, 'class', 'btn btn-primary'),
				u(e, 'class', 'm-auto flex max-w-96 flex-col py-9');
		},
		m(o, i) {
			H(o, e, i),
				Y(r, e, null),
				f(e, l),
				Y(t, e, null),
				f(e, n),
				Y(g, e, null),
				f(e, M),
				f(e, v),
				f(v, R),
				f(R, P),
				f(P, S),
				f(R, j),
				f(R, A),
				m && m.m(A, null),
				f(v, N),
				f(v, C),
				Y($, C, null),
				f(e, K),
				f(e, a),
				f(a, c),
				f(a, D),
				f(a, E),
				h && h.m(E, null),
				f(a, z),
				f(a, L),
				f(a, se),
				f(a, I),
				f(a, le),
				b && b.m(a, null),
				f(e, re),
				f(e, V),
				(O = !0),
				ne ||
					((me = [oe(I, 'change', s[4]), oe(I, 'change', s[11]), oe(e, 'submit', Ce(s[8]))]),
					(ne = !0));
		},
		p(o, i) {
			const q = {};
			i & 4 && (q.bindValue = o[2].dish), i & 8 && (q.errors = o[3].dish), r.$set(q);
			const B = {};
			i & 4 && (B.bindValue = o[2].chef), i & 8 && (B.errors = o[3].chef), t.$set(B);
			const G = {};
			i & 4 && (G.bindValue = o[2].recipe),
				i & 8 && (G.errors = o[3].recipe),
				g.$set(G),
				o[3].cost
					? m
						? m.p(o, i)
						: ((m = $e(o)), m.c(), m.m(A, null))
					: m && (m.d(1), (m = null));
			const Q = {};
			!J && i & 4 && ((J = !0), (Q.value = o[2].cost), Ee(() => (J = !1))),
				$.$set(Q),
				(!O ||
					(i & 8 &&
						F !==
							(F =
								ge(`my-currency-input ${o[3].cost && 'my-currency-input-error'}`) +
								' svelte-kqxn9h'))) &&
					u(C, 'class', F),
				(!O || (i & 1 && !be(c.src, (T = o[0] ?? '/default-meal.webp')))) && u(c, 'src', T),
				o[3].photoURL
					? h
						? h.p(o, i)
						: ((h = Le(o)), h.c(), h.m(E, null))
					: h && (h.d(1), (h = null)),
				o[1] ? b || ((b = we()), b.c(), b.m(a, null)) : b && (b.d(1), (b = null));
		},
		i(o) {
			O ||
				(Z(r.$$.fragment, o),
				Z(t.$$.fragment, o),
				Z(g.$$.fragment, o),
				Z($.$$.fragment, o),
				(O = !0));
		},
		o(o) {
			x(r.$$.fragment, o), x(t.$$.fragment, o), x(g.$$.fragment, o), x($.$$.fragment, o), (O = !1);
		},
		d(o) {
			o && p(e), ee(r), ee(t), ee(g), m && m.d(), ee($), h && h.d(), b && b.d(), (ne = !1), Ie(me);
		}
	};
}
function Ze(s) {
	let e, r;
	return (
		(e = new Me({ props: { $$slots: { default: [Ye] }, $$scope: { ctx: s } } })),
		{
			c() {
				W(e.$$.fragment);
			},
			l(l) {
				X(e.$$.fragment, l);
			},
			m(l, t) {
				Y(e, l, t), (r = !0);
			},
			p(l, [t]) {
				const n = {};
				t & 524303 && (n.$$scope = { dirty: t, ctx: l }), e.$set(n);
			},
			i(l) {
				r || (Z(e.$$.fragment, l), (r = !0));
			},
			o(l) {
				x(e.$$.fragment, l), (r = !1);
			},
			d(l) {
				ee(e, l);
			}
		}
	);
}
function xe(s, e, r) {
	let l, t, n, g;
	ae(s, je, (a) => r(14, (l = a))),
		ae(s, Fe, (a) => r(9, (n = a))),
		console.log(l == null ? void 0 : l.email);
	let M,
		v = !1,
		R;
	async function P(a) {
		N(a), te(a);
	}
	async function te(a) {
		N(a);
		const c = a.target.files[0];
		r(0, (M = URL.createObjectURL(c))), (R = c);
	}
	const {
		form: S,
		errors: j,
		state: A,
		handleChange: N,
		handleSubmit: C
	} = Te({
		initialValues: { dish: '', chef: '', cost: 0, recipe: '', photoURL: null },
		validate: (a) => {
			let c = {};
			return (
				a.dish === '' && (c.dish = 'dish is required'),
				a.chef === '' && (c.chef = 'chef is required'),
				a.recipe === '' && (c.recipe = 'Please enter a recipe or link'),
				(a.cost <= 9 || a.cost >= 99) && (c.cost = 'Please enter a valid price'),
				a.photoURL || (c.photoURL = 'Please attach a photo'),
				c
			);
		},
		onSubmit: (a) => {
			$(t);
		}
	});
	ae(s, S, (a) => r(2, (t = a))), ae(s, j, (a) => r(3, (g = a)));
	async function $(a) {
		const { chef: c, cost: T, dish: D, photoURL: E, recipe: z } = a;
		try {
			const L = await Oe(Ge(ve, 'meals'), {
				chef: c,
				cost: T,
				dish: D,
				photoURL: E,
				recipe: z,
				postedById: l == null ? void 0 : l.uid,
				createdAt: He(),
				likedBy: []
			});
			J({ docRef: L.id }).then(() => De('/'));
		} catch (L) {
			console.error('Error adding document: ', L);
		}
	}
	async function J({ docRef: a }) {
		r(1, (v = !0));
		const c = Je(Ke, `meals/${a}.png`),
			T = await ze(c, R),
			D = await Qe(T.ref);
		await We(Xe(ve, 'meals', a), { photoURL: D }), r(1, (v = !1));
	}
	function F(a) {
		s.$$.not_equal(t.cost, a) && ((t.cost = a), S.set(t));
	}
	function K() {
		(t.photoURL = this.value), S.set(t);
	}
	return (
		(s.$$.update = () => {
			s.$$.dirty & 512 && `${n == null ? void 0 : n.username}`;
		}),
		[M, v, t, g, P, S, j, N, C, n, F, K]
	);
}
class nt extends Pe {
	constructor(e) {
		super(), Se(this, e, xe, Ze, Ue, {});
	}
}
export { nt as component };
