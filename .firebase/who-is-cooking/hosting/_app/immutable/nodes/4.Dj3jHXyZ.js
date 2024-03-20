import {
	d as R,
	k as re,
	a as T,
	j as se,
	v as oe,
	u as le,
	x as J
} from '../chunks/firebase.BXW4q-2E.js';
import { H as ie } from '../chunks/control.CYgJF_JY.js';
import {
	s as q,
	x as K,
	i as O,
	f as p,
	Q as ce,
	e as b,
	c as v,
	v as j,
	o as _,
	n as N,
	b as y,
	m as ue,
	a as E,
	g as L,
	z as W,
	h as k,
	w as D,
	B as X,
	u as fe,
	p as de,
	q as he,
	r as _e,
	t as me,
	d as ge,
	j as pe,
	k as Y
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as z,
	i as H,
	g as M,
	a as S,
	e as Q,
	t as w,
	c as I,
	b as V,
	m as B,
	d as U
} from '../chunks/index.BqBZE8_s.js';
import { A as ke } from '../chunks/AuthCheck.CwOMPwgQ.js';
import { f as be, c as ve, b as xe } from '../chunks/index.ChZz6XMy.js';
import { e as Z, u as Ce, f as we } from '../chunks/each.DLoRWcad.js';
import { C as Se } from '../chunks/Confetti.wDXda6tx.js';
function ye(r, e) {
	throw new ie(r, e);
}
new TextEncoder();
const Oe = async () => {
		var t;
		const r = R(T, 'rotor', '267rotor'),
			e = await re(r);
		if (!e.exists()) throw ye(404, 'that user does not exist!');
		return { array: (t = e.data()) == null ? void 0 : t.Order };
	},
	We = Object.freeze(
		Object.defineProperty({ __proto__: null, load: Oe }, Symbol.toStringTag, { value: 'Module' })
	);
function ee(r, e, t) {
	const n = r.slice();
	return (n[9] = e[t]), (n[11] = t), n;
}
const $e = (r) => ({ item: r & 1, index: r & 1 }),
	te = (r) => ({ item: r[9], index: r[11] });
function De(r) {
	let e,
		t = 'No items';
	return {
		c() {
			(e = b('p')), (e.textContent = t), this.h();
		},
		l(n) {
			(e = v(n, 'P', { class: !0, 'data-svelte-h': !0 })),
				j(e) !== 'svelte-1ideuqf' && (e.textContent = t),
				this.h();
		},
		h() {
			_(e, 'class', 'my-12 text-center text-lg font-bold');
		},
		m(n, l) {
			O(n, e, l);
		},
		p: N,
		i: N,
		o: N,
		d(n) {
			n && p(e);
		}
	};
}
function Ee(r) {
	let e,
		t = [],
		n = new Map(),
		l,
		c = Z(r[0]);
	const i = (o) => o[9].id;
	for (let o = 0; o < c.length; o += 1) {
		let a = ee(r, c, o),
			f = i(a);
		n.set(f, (t[o] = ne(f, a)));
	}
	return {
		c() {
			e = b('ul');
			for (let o = 0; o < t.length; o += 1) t[o].c();
			this.h();
		},
		l(o) {
			e = v(o, 'UL', { class: !0 });
			var a = y(e);
			for (let f = 0; f < t.length; f += 1) t[f].l(a);
			a.forEach(p), this.h();
		},
		h() {
			_(e, 'class', 'flex list-none flex-col items-center p-0');
		},
		m(o, a) {
			O(o, e, a);
			for (let f = 0; f < t.length; f += 1) t[f] && t[f].m(e, null);
			l = !0;
		},
		p(o, a) {
			if (a & 63) {
				(c = Z(o[0])), M();
				for (let f = 0; f < t.length; f += 1) t[f].r();
				t = Ce(t, a, i, 1, o, c, n, e, we, ne, null, ee);
				for (let f = 0; f < t.length; f += 1) t[f].a();
				Q();
			}
		},
		i(o) {
			if (!l) {
				for (let a = 0; a < c.length; a += 1) w(t[a]);
				l = !0;
			}
		},
		o(o) {
			for (let a = 0; a < t.length; a += 1) S(t[a]);
			l = !1;
		},
		d(o) {
			o && p(e);
			for (let a = 0; a < t.length; a += 1) t[a].d();
		}
	};
}
function ne(r, e) {
	let t,
		n,
		l,
		c,
		i,
		o = N,
		a,
		f,
		d;
	const g = e[6].default,
		s = ue(g, e, e[5], te);
	return {
		key: r,
		first: null,
		c() {
			(t = b('li')), s && s.c(), (n = E()), this.h();
		},
		l(u) {
			t = v(u, 'LI', { class: !0, 'data-index': !0, 'data-id': !0, draggable: !0 });
			var h = y(t);
			s && s.l(h), (n = L(h)), h.forEach(p), this.h();
		},
		h() {
			_(
				t,
				'class',
				'w-full max-w-md border-2 border-dashed border-transparent p-2 transition-all svelte-16x08xz'
			),
				_(t, 'data-index', (l = e[11])),
				_(t, 'data-id', (c = e[9].id)),
				_(t, 'draggable', 'true'),
				W(t, 'over', e[9].id === e[1]),
				(this.first = t);
		},
		m(u, h) {
			O(u, t, h),
				s && s.m(t, null),
				k(t, n),
				(a = !0),
				f ||
					((d = [
						D(t, 'dragstart', Pe),
						D(t, 'dragover', X(e[2])),
						D(t, 'dragleave', e[3]),
						D(t, 'drop', X(e[4]))
					]),
					(f = !0));
		},
		p(u, h) {
			(e = u),
				s && s.p && (!a || h & 33) && fe(s, g, e, e[5], a ? he(g, e[5], h, $e) : de(e[5]), te),
				(!a || (h & 1 && l !== (l = e[11]))) && _(t, 'data-index', l),
				(!a || (h & 1 && c !== (c = e[9].id))) && _(t, 'data-id', c),
				(!a || h & 3) && W(t, 'over', e[9].id === e[1]);
		},
		r() {
			i = t.getBoundingClientRect();
		},
		f() {
			be(t), o();
		},
		a() {
			o(), (o = ve(t, i, xe, { duration: 300 }));
		},
		i(u) {
			a || (w(s, u), (a = !0));
		},
		o(u) {
			S(s, u), (a = !1);
		},
		d(u) {
			u && p(t), s && s.d(u), (f = !1), _e(d);
		}
	};
}
function Le(r) {
	let e, t, n, l;
	const c = [Ee, De],
		i = [];
	function o(a, f) {
		var d;
		return (d = a[0]) != null && d.length ? 0 : 1;
	}
	return (
		(e = o(r)),
		(t = i[e] = c[e](r)),
		{
			c() {
				t.c(), (n = K());
			},
			l(a) {
				t.l(a), (n = K());
			},
			m(a, f) {
				i[e].m(a, f), O(a, n, f), (l = !0);
			},
			p(a, [f]) {
				let d = e;
				(e = o(a)),
					e === d
						? i[e].p(a, f)
						: (M(),
							S(i[d], 1, 1, () => {
								i[d] = null;
							}),
							Q(),
							(t = i[e]),
							t ? t.p(a, f) : ((t = i[e] = c[e](a)), t.c()),
							w(t, 1),
							t.m(n.parentNode, n));
			},
			i(a) {
				l || (w(t), (l = !0));
			},
			o(a) {
				S(t), (l = !1);
			},
			d(a) {
				a && p(n), i[e].d(a);
			}
		}
	);
}
function P(r) {
	return r.dataset.index ? { ...r.dataset } : P(r.parentNode);
}
function Pe(r) {
	var t;
	const e = P(r.target);
	(t = r.dataTransfer) == null || t.setData('source', e == null ? void 0 : e.index.toString());
}
function Ae(r, e, t) {
	let { $$slots: n = {}, $$scope: l } = e,
		{ list: c } = e,
		i = !1;
	const o = ce();
	function a(s) {
		var h;
		(h = s.target.dataset) == null || h.id;
		const u = P(s.target);
		t(1, (i = (u == null ? void 0 : u.id) ?? !1));
	}
	function f(s) {
		const u = P(s.target);
		i === u.id && t(1, (i = !1));
	}
	function d(s) {
		var h;
		t(1, (i = !1));
		const u = P(s.target);
		g({ from: (h = s.dataTransfer) == null ? void 0 : h.getData('source'), to: u.index });
	}
	const g = ({ from: s, to: u }) => {
		const h = [...c];
		(h[s] = [h[u], (h[u] = h[s])][0]), o('sorty', h);
	};
	return (
		(r.$$set = (s) => {
			'list' in s && t(0, (c = s.list)), '$$scope' in s && t(5, (l = s.$$scope));
		}),
		[c, i, a, f, d, l, n]
	);
}
class Ne extends z {
	constructor(e) {
		super(), H(this, e, Ae, Le, q, { list: 0 });
	}
}
function ae(r) {
	let e, t;
	return (
		(e = new Se({})),
		{
			c() {
				I(e.$$.fragment);
			},
			l(n) {
				V(e.$$.fragment, n);
			},
			m(n, l) {
				B(e, n, l), (t = !0);
			},
			i(n) {
				t || (w(e.$$.fragment, n), (t = !0));
			},
			o(n) {
				S(e.$$.fragment, n), (t = !1);
			},
			d(n) {
				U(e, n);
			}
		}
	);
}
function Re(r) {
	let e,
		t,
		n,
		l,
		c,
		i,
		o,
		a = 'Cooked/ Unavailable',
		f,
		d,
		g,
		s,
		u,
		h,
		A,
		m = r[2] && ae();
	return {
		c() {
			(e = b('a')),
				(t = b('p')),
				(n = me(r[0])),
				(l = E()),
				(c = b('div')),
				(i = b('label')),
				(o = b('span')),
				(o.textContent = a),
				(f = E()),
				(d = b('input')),
				(g = E()),
				m && m.c(),
				this.h();
		},
		l(x) {
			e = v(x, 'A', { class: !0 });
			var C = y(e);
			t = v(C, 'P', { class: !0 });
			var F = y(t);
			(n = ge(F, r[0])), F.forEach(p), (l = L(C)), (c = v(C, 'DIV', { class: !0 }));
			var G = y(c);
			i = v(G, 'LABEL', { class: !0 });
			var $ = y(i);
			(o = v($, 'SPAN', { class: !0, 'data-svelte-h': !0 })),
				j(o) !== 'svelte-1hpt7xr' && (o.textContent = a),
				(f = L($)),
				(d = v($, 'INPUT', { type: !0, class: !0 })),
				(g = L($)),
				m && m.l($),
				$.forEach(p),
				G.forEach(p),
				C.forEach(p),
				this.h();
		},
		h() {
			_(t, 'class', 'text-2xl font-bold'),
				_(o, 'class', 'label-text'),
				_(d, 'type', 'checkbox'),
				(d.checked = r[1]),
				_(d, 'class', 'checkbox-primary checkbox'),
				_(i, 'class', 'label cursor-pointer'),
				_(c, 'class', 'form-control'),
				_(
					e,
					'class',
					(s = `not-prose stack flex w-full min-w-80 max-w-md items-center justify-center rounded-lg bg-base-300 p-4 text-center no-underline border ${r[1] ? 'border-green-500' : 'border-white'}`)
				);
		},
		m(x, C) {
			O(x, e, C),
				k(e, t),
				k(t, n),
				k(e, l),
				k(e, c),
				k(c, i),
				k(i, o),
				k(i, f),
				k(i, d),
				k(i, g),
				m && m.m(i, null),
				(u = !0),
				h || ((A = D(d, 'click', r[3])), (h = !0));
		},
		p(x, [C]) {
			(!u || C & 1) && pe(n, x[0]),
				(!u || C & 2) && (d.checked = x[1]),
				x[2]
					? m
						? C & 4 && w(m, 1)
						: ((m = ae()), m.c(), w(m, 1), m.m(i, null))
					: m &&
						(M(),
						S(m, 1, 1, () => {
							m = null;
						}),
						Q()),
				(!u ||
					(C & 2 &&
						s !==
							(s = `not-prose stack flex w-full min-w-80 max-w-md items-center justify-center rounded-lg bg-base-300 p-4 text-center no-underline border ${x[1] ? 'border-green-500' : 'border-white'}`))) &&
					_(e, 'class', s);
		},
		i(x) {
			u || (w(m), (u = !0));
		},
		o(x) {
			S(m), (u = !1);
		},
		d(x) {
			x && p(e), m && m.d(), (h = !1), A();
		}
	};
}
function Te(r, e, t) {
	let n,
		{ name: l = 'placeholder' } = e,
		{ index: c } = e,
		{ handleCheck: i } = e,
		{ checkedStatus: o } = e,
		{ id: a } = e;
	async function f() {
		const d = R(T, 'rotor', '267rotor'),
			g = await re(d);
		if (g.exists()) {
			const s = g.data().Order,
				u = s.findIndex((h) => h.id === a);
			if (u !== -1) {
				const A = !s[u].cooked;
				(s[u].cooked = A), await se(d, { Order: s });
			}
		}
	}
	return (
		(r.$$set = (d) => {
			'name' in d && t(0, (l = d.name)),
				'index' in d && t(4, (c = d.index)),
				'handleCheck' in d && t(5, (i = d.handleCheck)),
				'checkedStatus' in d && t(1, (o = d.checkedStatus)),
				'id' in d && t(6, (a = d.id));
		}),
		(r.$$.update = () => {
			r.$$.dirty & 2 && t(2, (n = o));
		}),
		[l, o, n, f, c, i, a]
	);
}
class je extends z {
	constructor(e) {
		super(), H(this, e, Te, Re, q, { name: 0, index: 4, handleCheck: 5, checkedStatus: 1, id: 6 });
	}
}
function Ie(r) {
	let e, t, n;
	return (
		(t = new je({
			props: {
				id: r[5].id,
				name: r[5].name,
				index: r[6] + 1,
				checkedStatus: r[5].cooked,
				handleCheck: Ue
			}
		})),
		{
			c() {
				(e = b('div')), I(t.$$.fragment), this.h();
			},
			l(l) {
				e = v(l, 'DIV', { class: !0 });
				var c = y(e);
				V(t.$$.fragment, c), c.forEach(p), this.h();
			},
			h() {
				_(e, 'class', 'group relative');
			},
			m(l, c) {
				O(l, e, c), B(t, e, null), (n = !0);
			},
			p(l, c) {
				const i = {};
				c & 32 && (i.id = l[5].id),
					c & 32 && (i.name = l[5].name),
					c & 64 && (i.index = l[6] + 1),
					c & 32 && (i.checkedStatus = l[5].cooked),
					t.$set(i);
			},
			i(l) {
				n || (w(t.$$.fragment, l), (n = !0));
			},
			o(l) {
				S(t.$$.fragment, l), (n = !1);
			},
			d(l) {
				l && p(e), U(t);
			}
		}
	);
}
function Ve(r) {
	let e,
		t,
		n = 'Cooking Rota',
		l,
		c,
		i,
		o,
		a = 'Re-order rota',
		f,
		d,
		g;
	return (
		(c = new Ne({
			props: {
				list: r[0].Order,
				$$slots: {
					default: [
						Ie,
						({ item: s, index: u }) => ({ 5: s, 6: u }),
						({ item: s, index: u }) => (s ? 32 : 0) | (u ? 64 : 0)
					]
				},
				$$scope: { ctx: r }
			}
		})),
		c.$on('sorty', r[1]),
		{
			c() {
				(e = b('main')),
					(t = b('h1')),
					(t.textContent = n),
					(l = E()),
					I(c.$$.fragment),
					(i = E()),
					(o = b('button')),
					(o.textContent = a),
					this.h();
			},
			l(s) {
				e = v(s, 'MAIN', { class: !0 });
				var u = y(e);
				(t = v(u, 'H1', { class: !0, 'data-svelte-h': !0 })),
					j(t) !== 'svelte-1y66r94' && (t.textContent = n),
					(l = L(u)),
					V(c.$$.fragment, u),
					(i = L(u)),
					(o = v(u, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
					j(o) !== 'svelte-1spidb8' && (o.textContent = a),
					u.forEach(p),
					this.h();
			},
			h() {
				_(t, 'class', 'text-2xl font-bold'),
					_(o, 'class', 'btn btn-accent w-full'),
					_(e, 'class', 'm-auto mx-auto flex max-w-xl flex-col items-center gap-6 py-9');
			},
			m(s, u) {
				O(s, e, u),
					k(e, t),
					k(e, l),
					B(c, e, null),
					k(e, i),
					k(e, o),
					(f = !0),
					d || ((g = D(o, 'click', r[2])), (d = !0));
			},
			p(s, u) {
				const h = {};
				u & 1 && (h.list = s[0].Order), u & 224 && (h.$$scope = { dirty: u, ctx: s }), c.$set(h);
			},
			i(s) {
				f || (w(c.$$.fragment, s), (f = !0));
			},
			o(s) {
				S(c.$$.fragment, s), (f = !1);
			},
			d(s) {
				s && p(e), U(c), (d = !1), g();
			}
		}
	);
}
function Be(r) {
	let e, t;
	return (
		(e = new ke({ props: { $$slots: { default: [Ve] }, $$scope: { ctx: r } } })),
		{
			c() {
				I(e.$$.fragment);
			},
			l(n) {
				V(e.$$.fragment, n);
			},
			m(n, l) {
				B(e, n, l), (t = !0);
			},
			p(n, [l]) {
				const c = {};
				l & 129 && (c.$$scope = { dirty: l, ctx: n }), e.$set(c);
			},
			i(n) {
				t || (w(e.$$.fragment, n), (t = !0));
			},
			o(n) {
				S(e.$$.fragment, n), (t = !1);
			},
			d(n) {
				U(e, n);
			}
		}
	);
}
async function Ue(r, e) {
	console.log(r, e), console.log(e);
}
function qe(r, e, t) {
	let n;
	Y(r, oe, (i) => t(0, (n = i))), Y(r, le, (i) => t(3, i));
	function l(i) {
		const o = i.detail,
			a = R(T, 'rotor', '267rotor');
		J(a, { Order: o }, { merge: !0 });
	}
	function c() {
		const i = n.Order.sort((a, f) => a.defaultPosition - f.defaultPosition),
			o = R(T, 'rotor', '267rotor');
		J(o, { Order: i }, { merge: !0 });
	}
	return [n, l, c];
}
class Xe extends z {
	constructor(e) {
		super(), H(this, e, qe, Be, q, {});
	}
}
export { Xe as component, We as universal };
