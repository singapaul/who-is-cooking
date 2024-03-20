import {
	s as le,
	e as E,
	t as Y,
	a as z,
	c as N,
	b as I,
	d as Q,
	f as T,
	g as G,
	o as d,
	i as W,
	h as v,
	A as w,
	w as Z,
	D as fe,
	j as x,
	n as K,
	r as ae,
	P as Fe,
	v as J,
	O as Ie,
	a3 as de,
	a4 as ke,
	J as he,
	F as Le,
	I as we
} from './scheduler.CxO4csHG.js';
import { S as ie, i as se } from './index.BqBZE8_s.js';
import { w as $, d as ne } from './index.Drio3CKC.js';
function me(e) {
	let t, n;
	return {
		c() {
			(t = E('small')), (n = Y(e[3]));
		},
		l(l) {
			t = N(l, 'SMALL', {});
			var o = I(t);
			(n = Q(o, e[3])), o.forEach(T);
		},
		m(l, o) {
			W(l, t, o), v(t, n);
		},
		p(l, o) {
			o & 8 && x(n, l[3]);
		},
		d(l) {
			l && T(t);
		}
	};
}
function Ue(e) {
	let t,
		n,
		l,
		o,
		r,
		a,
		g,
		s,
		u,
		p,
		f = e[3] && me(e);
	return {
		c() {
			(t = E('label')),
				(n = E('div')),
				(l = E('span')),
				(o = Y(e[4])),
				(r = z()),
				(a = E('span')),
				f && f.c(),
				(g = z()),
				(s = E('input')),
				this.h();
		},
		l(A) {
			t = N(A, 'LABEL', { class: !0, for: !0 });
			var _ = I(t);
			n = N(_, 'DIV', { class: !0 });
			var c = I(n);
			l = N(c, 'SPAN', { class: !0 });
			var h = I(l);
			(o = Q(h, e[4])), h.forEach(T), (r = G(c)), (a = N(c, 'SPAN', { class: !0 }));
			var D = I(a);
			f && f.l(D),
				D.forEach(T),
				c.forEach(T),
				(g = G(_)),
				(s = N(_, 'INPUT', { type: !0, placeholder: !0, class: !0, id: !0 })),
				_.forEach(T),
				this.h();
		},
		h() {
			d(l, 'class', 'font-bold'),
				d(a, 'class', 'label-text'),
				d(n, 'class', 'label'),
				d(s, 'type', 'text'),
				d(s, 'placeholder', 'Dish name...'),
				d(s, 'class', 'input input-bordered w-full'),
				d(s, 'id', e[1]),
				d(t, 'class', 'form-control'),
				d(t, 'for', e[1]);
		},
		m(A, _) {
			W(A, t, _),
				v(t, n),
				v(n, l),
				v(l, o),
				v(n, r),
				v(n, a),
				f && f.m(a, null),
				v(t, g),
				v(t, s),
				w(s, e[0]),
				u ||
					((p = [
						Z(s, 'change', function () {
							fe(e[2]) && e[2].apply(this, arguments);
						}),
						Z(s, 'input', e[5])
					]),
					(u = !0));
		},
		p(A, [_]) {
			(e = A),
				_ & 16 && x(o, e[4]),
				e[3] ? (f ? f.p(e, _) : ((f = me(e)), f.c(), f.m(a, null))) : f && (f.d(1), (f = null)),
				_ & 2 && d(s, 'id', e[1]),
				_ & 1 && s.value !== e[0] && w(s, e[0]),
				_ & 2 && d(t, 'for', e[1]);
		},
		i: K,
		o: K,
		d(A) {
			A && T(t), f && f.d(), (u = !1), ae(p);
		}
	};
}
function Re(e, t, n) {
	let { fieldName: l = 'fieldName' } = t,
		{ handleChange: o = () => console.log('pressed') } = t,
		{ errors: r } = t,
		{ bindValue: a } = t,
		{ label: g } = t;
	function s() {
		(a = this.value), n(0, a);
	}
	return (
		(e.$$set = (u) => {
			'fieldName' in u && n(1, (l = u.fieldName)),
				'handleChange' in u && n(2, (o = u.handleChange)),
				'errors' in u && n(3, (r = u.errors)),
				'bindValue' in u && n(0, (a = u.bindValue)),
				'label' in u && n(4, (g = u.label));
		}),
		[a, l, o, r, g, s]
	);
}
class st extends ie {
	constructor(t) {
		super(),
			se(this, t, Re, Ue, le, { fieldName: 1, handleChange: 2, errors: 3, bindValue: 0, label: 4 });
	}
}
var _e = Object.prototype.hasOwnProperty;
function re(e, t) {
	var n, l;
	if (e === t) return !0;
	if (e && t && (n = e.constructor) === t.constructor) {
		if (n === Date) return e.getTime() === t.getTime();
		if (n === RegExp) return e.toString() === t.toString();
		if (n === Array) {
			if ((l = e.length) === t.length) for (; l-- && re(e[l], t[l]); );
			return l === -1;
		}
		if (!n || typeof e == 'object') {
			l = 0;
			for (n in e)
				if ((_e.call(e, n) && ++l && !_e.call(t, n)) || !(n in t) || !re(e[n], t[n])) return !1;
			return Object.keys(t).length === l;
		}
	}
	return e !== e && t !== t;
}
function Me(e) {
	return new Promise((t) => {
		e.subscribe(t)();
	});
}
function qe(e, t, n) {
	e.update((l) => (Oe(l, t, n), l));
}
function Ze(e) {
	return JSON.parse(JSON.stringify(e));
}
function ce(e) {
	return e == null;
}
function De(e) {
	return ce(e) || Object.keys(e).length <= 0;
}
function Te(e) {
	let t = [];
	for (const [, n] of Object.entries(e)) {
		const l = typeof n == 'object' ? Te(n) : [n];
		t = [...t, ...l];
	}
	return t;
}
function ue(e, t, n = {}) {
	for (const l in t)
		switch (!0) {
			case t[l].type === 'object' && !De(t[l].fields): {
				n[l] = ue(e[l], t[l].fields, { ...n[l] });
				break;
			}
			case t[l].type === 'array': {
				const o = e && e[l] ? e[l] : [];
				n[l] = o.map((r) => {
					const a = ue(r, t[l].innerType.fields, { ...n[l] });
					return Object.keys(a).length > 0 ? a : '';
				});
				break;
			}
			default:
				n[l] = '';
		}
	return n;
}
const je = re;
function oe(e, t) {
	if (Array.isArray(e)) return e.map((l) => oe(l, t));
	const n = {};
	for (const l in e) n[l] = typeof e[l] == 'object' && !ce(e[l]) ? oe(e[l], t) : t;
	return n;
}
function Oe(e, t, n) {
	if (new Object(e) !== e) return e;
	Array.isArray(t) || (t = t.toString().match(/[^.[\]]+/g) || []);
	const l = t
		.slice(0, -1)
		.reduce(
			(o, r, a) =>
				new Object(o[r]) === o[r]
					? o[r]
					: (o[r] = Math.trunc(Math.abs(t[a + 1])) === +t[a + 1] ? [] : {}),
			e
		);
	return (l[t[t.length - 1]] = n), e;
}
const F = {
		assignDeep: oe,
		cloneDeep: Ze,
		deepEqual: je,
		getErrorsFromSchema: ue,
		getValues: Te,
		isEmpty: De,
		isNullish: ce,
		set: Oe,
		subscribeOnce: Me,
		update: qe
	},
	ge = '',
	Be = !0;
function He(e) {
	return e.getAttribute && e.getAttribute('type') === 'checkbox';
}
function Je(e) {
	return e.getAttribute && e.getAttribute('type') === 'file';
}
function Ke(e) {
	return Je(e) ? e.files : He(e) ? e.checked : e.value;
}
const rt = (e) => {
	let t = e.initialValues || {};
	const n = e.validationSchema,
		l = e.validate,
		o = e.onSubmit,
		r = {
			values: () => F.cloneDeep(t),
			errors: () => (n ? F.getErrorsFromSchema(t, n.fields) : F.assignDeep(t, ge)),
			touched: () => F.assignDeep(t, !Be)
		},
		a = $(r.values()),
		g = $(r.errors()),
		s = $(r.touched()),
		u = $(!1),
		p = $(!1),
		f = ne(g, (m) => F.getValues(m).every((y) => y === ge)),
		A = ne(a, (m) => {
			const b = F.assignDeep(m, !1);
			for (let y in m) b[y] = !F.deepEqual(m[y], t[y]);
			return b;
		}),
		_ = ne(A, (m) => F.getValues(m).includes(!0));
	function c(m) {
		return F.subscribeOnce(a).then((b) => h(m, b[m]));
	}
	function h(m, b) {
		return (
			B(m, !0),
			n
				? (p.set(!0),
					n
						.validateAt(m, Fe(a))
						.then(() => F.update(g, m, ''))
						.catch((y) => F.update(g, m, y.message))
						.finally(() => {
							p.set(!1);
						}))
				: l
					? (p.set(!0),
						Promise.resolve()
							.then(() => l({ [m]: b }))
							.then((y) => F.update(g, m, F.isNullish(y) ? '' : y[m]))
							.finally(() => {
								p.set(!1);
							}))
					: Promise.resolve()
		);
	}
	function D(m, b) {
		return k(m, b), h(m, b);
	}
	function V(m) {
		const b = m.target,
			y = b.name || b.id,
			R = Ke(b);
		return D(y, R);
	}
	function U(m) {
		return (
			m && m.preventDefault && m.preventDefault(),
			u.set(!0),
			F.subscribeOnce(a).then((b) =>
				typeof l == 'function'
					? (p.set(!0),
						Promise.resolve()
							.then(() => l(b))
							.then((y) => {
								if (F.isNullish(y) || F.getValues(y).length === 0) return M(b);
								g.set(y), u.set(!1);
							})
							.finally(() => p.set(!1)))
					: n
						? (p.set(!0),
							n
								.validate(b, { abortEarly: !1 })
								.then(() => M(b))
								.catch((y) => {
									if (y && y.inner) {
										const R = r.errors();
										y.inner.map((S) => F.set(R, S.path, S.message)), g.set(R);
									}
									u.set(!1);
								})
								.finally(() => p.set(!1)))
						: M(b)
			)
		);
	}
	function O() {
		a.set(r.values()), g.set(r.errors()), s.set(r.touched());
	}
	function M(m) {
		return Promise.resolve()
			.then(() => g.set(r.errors()))
			.then(() => o(m, a, g))
			.finally(() => u.set(!1));
	}
	function k(m, b) {
		F.update(a, m, b);
	}
	function B(m, b) {
		F.update(s, m, b);
	}
	function P(m) {
		(t = m), O();
	}
	return {
		form: a,
		errors: g,
		touched: s,
		modified: A,
		isValid: f,
		isSubmitting: u,
		isValidating: p,
		isModified: _,
		handleChange: V,
		handleSubmit: U,
		handleReset: O,
		updateField: k,
		updateValidateField: D,
		updateTouched: B,
		validateField: c,
		updateInitialValues: P,
		state: ne([a, g, s, A, f, p, u, _], ([m, b, y, R, S, q, C, H]) => ({
			form: m,
			errors: b,
			touched: y,
			modified: R,
			isValid: S,
			isSubmitting: C,
			isValidating: q,
			isModified: H
		}))
	};
};
function be(e) {
	let t, n;
	return {
		c() {
			(t = E('small')), (n = Y(e[3]));
		},
		l(l) {
			t = N(l, 'SMALL', {});
			var o = I(t);
			(n = Q(o, e[3])), o.forEach(T);
		},
		m(l, o) {
			W(l, t, o), v(t, n);
		},
		p(l, o) {
			o & 8 && x(n, l[3]);
		},
		d(l) {
			l && T(t);
		}
	};
}
function ze(e) {
	let t,
		n,
		l,
		o,
		r,
		a,
		g,
		s,
		u,
		p = 'Pick one',
		f,
		A = 'Hugo',
		_,
		c = 'James',
		h,
		D = 'Matt',
		V,
		U = 'Rob',
		O,
		M = 'Henry',
		k,
		B = 'Pelayo',
		P,
		m = 'Paul',
		b,
		y,
		R,
		S = e[3] && be(e);
	return {
		c() {
			(t = E('label')),
				(n = E('div')),
				(l = E('span')),
				(o = Y(e[4])),
				(r = z()),
				(a = E('span')),
				S && S.c(),
				(g = z()),
				(s = E('select')),
				(u = E('option')),
				(u.textContent = p),
				(f = E('option')),
				(f.textContent = A),
				(_ = E('option')),
				(_.textContent = c),
				(h = E('option')),
				(h.textContent = D),
				(V = E('option')),
				(V.textContent = U),
				(O = E('option')),
				(O.textContent = M),
				(k = E('option')),
				(k.textContent = B),
				(P = E('option')),
				(P.textContent = m),
				this.h();
		},
		l(q) {
			t = N(q, 'LABEL', { for: !0, class: !0 });
			var C = I(t);
			n = N(C, 'DIV', { class: !0 });
			var H = I(n);
			l = N(H, 'SPAN', { class: !0 });
			var ee = I(l);
			(o = Q(ee, e[4])), ee.forEach(T), (r = G(H)), (a = N(H, 'SPAN', { class: !0 }));
			var te = I(a);
			S && S.l(te),
				te.forEach(T),
				H.forEach(T),
				(g = G(C)),
				(s = N(C, 'SELECT', { class: !0, id: !0 }));
			var i = I(s);
			(u = N(i, 'OPTION', { 'data-svelte-h': !0 })),
				J(u) !== 'svelte-8xjvh6' && (u.textContent = p),
				(f = N(i, 'OPTION', { 'data-svelte-h': !0 })),
				J(f) !== 'svelte-3xqa46' && (f.textContent = A),
				(_ = N(i, 'OPTION', { 'data-svelte-h': !0 })),
				J(_) !== 'svelte-niwdpi' && (_.textContent = c),
				(h = N(i, 'OPTION', { 'data-svelte-h': !0 })),
				J(h) !== 'svelte-13n45z6' && (h.textContent = D),
				(V = N(i, 'OPTION', { 'data-svelte-h': !0 })),
				J(V) !== 'svelte-t6hlj8' && (V.textContent = U),
				(O = N(i, 'OPTION', { 'data-svelte-h': !0 })),
				J(O) !== 'svelte-1wv4ek6' && (O.textContent = M),
				(k = N(i, 'OPTION', { 'data-svelte-h': !0 })),
				J(k) !== 'svelte-1b3szsm' && (k.textContent = B),
				(P = N(i, 'OPTION', { 'data-svelte-h': !0 })),
				J(P) !== 'svelte-14bpqh6' && (P.textContent = m),
				i.forEach(T),
				C.forEach(T),
				this.h();
		},
		h() {
			d(l, 'class', 'font-bold'),
				d(a, 'class', 'label-text'),
				d(n, 'class', 'label'),
				(u.disabled = !0),
				(u.selected = !0),
				(u.__value = 'Pick one'),
				w(u, u.__value),
				(f.__value = 'Hugo'),
				w(f, f.__value),
				(_.__value = 'James'),
				w(_, _.__value),
				(h.__value = 'Matt'),
				w(h, h.__value),
				(V.__value = 'Rob'),
				w(V, V.__value),
				(O.__value = 'Henry'),
				w(O, O.__value),
				(k.__value = 'Pelayo'),
				w(k, k.__value),
				(P.__value = 'Paul'),
				w(P, P.__value),
				d(s, 'class', (b = `select select-bordered ${e[3] && 'select-error'}`)),
				d(s, 'id', e[1]),
				e[0] === void 0 && Ie(() => e[5].call(s)),
				d(t, 'for', e[1]),
				d(t, 'class', 'form-control w-full');
		},
		m(q, C) {
			W(q, t, C),
				v(t, n),
				v(n, l),
				v(l, o),
				v(n, r),
				v(n, a),
				S && S.m(a, null),
				v(t, g),
				v(t, s),
				v(s, u),
				v(s, f),
				v(s, _),
				v(s, h),
				v(s, V),
				v(s, O),
				v(s, k),
				v(s, P),
				de(s, e[0], !0),
				y ||
					((R = [
						Z(s, 'change', function () {
							fe(e[2]) && e[2].apply(this, arguments);
						}),
						Z(s, 'change', e[5])
					]),
					(y = !0));
		},
		p(q, [C]) {
			(e = q),
				C & 16 && x(o, e[4]),
				e[3] ? (S ? S.p(e, C) : ((S = be(e)), S.c(), S.m(a, null))) : S && (S.d(1), (S = null)),
				C & 8 && b !== (b = `select select-bordered ${e[3] && 'select-error'}`) && d(s, 'class', b),
				C & 2 && d(s, 'id', e[1]),
				C & 1 && de(s, e[0]),
				C & 2 && d(t, 'for', e[1]);
		},
		i: K,
		o: K,
		d(q) {
			q && T(t), S && S.d(), (y = !1), ae(R);
		}
	};
}
function Ge(e, t, n) {
	let { fieldName: l = 'fieldName' } = t,
		{ handleChange: o = () => console.log('pressed') } = t,
		{ errors: r } = t,
		{ bindValue: a } = t,
		{ label: g } = t;
	function s() {
		(a = ke(this)), n(0, a);
	}
	return (
		(e.$$set = (u) => {
			'fieldName' in u && n(1, (l = u.fieldName)),
				'handleChange' in u && n(2, (o = u.handleChange)),
				'errors' in u && n(3, (r = u.errors)),
				'bindValue' in u && n(0, (a = u.bindValue)),
				'label' in u && n(4, (g = u.label));
		}),
		[a, l, o, r, g, s]
	);
}
class ut extends ie {
	constructor(t) {
		super(),
			se(this, t, Ge, ze, le, { fieldName: 1, handleChange: 2, errors: 3, bindValue: 0, label: 4 });
	}
}
function ve(e) {
	let t, n;
	return {
		c() {
			(t = E('small')), (n = Y(e[3]));
		},
		l(l) {
			t = N(l, 'SMALL', {});
			var o = I(t);
			(n = Q(o, e[3])), o.forEach(T);
		},
		m(l, o) {
			W(l, t, o), v(t, n);
		},
		p(l, o) {
			o & 8 && x(n, l[3]);
		},
		d(l) {
			l && T(t);
		}
	};
}
function We(e) {
	let t,
		n,
		l,
		o,
		r,
		a,
		g,
		s,
		u,
		p,
		f = e[3] && ve(e);
	return {
		c() {
			(t = E('label')),
				(n = E('div')),
				(l = E('span')),
				(o = Y(e[4])),
				(r = z()),
				(a = E('span')),
				f && f.c(),
				(g = z()),
				(s = E('textarea')),
				this.h();
		},
		l(A) {
			t = N(A, 'LABEL', { class: !0 });
			var _ = I(t);
			n = N(_, 'DIV', { class: !0 });
			var c = I(n);
			l = N(c, 'SPAN', { class: !0 });
			var h = I(l);
			(o = Q(h, e[4])), h.forEach(T), (r = G(c)), (a = N(c, 'SPAN', { class: !0 }));
			var D = I(a);
			f && f.l(D),
				D.forEach(T),
				c.forEach(T),
				(g = G(_)),
				(s = N(_, 'TEXTAREA', { class: !0, placeholder: !0, id: !0 })),
				I(s).forEach(T),
				_.forEach(T),
				this.h();
		},
		h() {
			d(l, 'class', 'font-bold'),
				d(a, 'class', 'label-text'),
				d(n, 'class', 'label'),
				d(s, 'class', 'textarea textarea-bordered h-24'),
				d(
					s,
					'placeholder',
					'Please enter a short description of the recipe or a link to the recipe used'
				),
				d(s, 'id', e[1]),
				d(t, 'class', 'form-control');
		},
		m(A, _) {
			W(A, t, _),
				v(t, n),
				v(n, l),
				v(l, o),
				v(n, r),
				v(n, a),
				f && f.m(a, null),
				v(t, g),
				v(t, s),
				w(s, e[0]),
				u ||
					((p = [
						Z(s, 'change', function () {
							fe(e[2]) && e[2].apply(this, arguments);
						}),
						Z(s, 'input', e[5])
					]),
					(u = !0));
		},
		p(A, [_]) {
			(e = A),
				_ & 16 && x(o, e[4]),
				e[3] ? (f ? f.p(e, _) : ((f = ve(e)), f.c(), f.m(a, null))) : f && (f.d(1), (f = null)),
				_ & 2 && d(s, 'id', e[1]),
				_ & 1 && w(s, e[0]);
		},
		i: K,
		o: K,
		d(A) {
			A && T(t), f && f.d(), (u = !1), ae(p);
		}
	};
}
function Xe(e, t, n) {
	let { fieldName: l = 'fieldName' } = t,
		{ handleChange: o = () => console.log('pressed') } = t,
		{ errors: r } = t,
		{ bindValue: a } = t,
		{ label: g } = t;
	function s() {
		(a = this.value), n(0, a);
	}
	return (
		(e.$$set = (u) => {
			'fieldName' in u && n(1, (l = u.fieldName)),
				'handleChange' in u && n(2, (o = u.handleChange)),
				'errors' in u && n(3, (r = u.errors)),
				'bindValue' in u && n(0, (a = u.bindValue)),
				'label' in u && n(4, (g = u.label));
		}),
		[a, l, o, r, g, s]
	);
}
class ot extends ie {
	constructor(t) {
		super(),
			se(this, t, Xe, We, le, { fieldName: 1, handleChange: 2, errors: 3, bindValue: 0, label: 4 });
	}
}
function Ye(e) {
	let t, n, l, o, r, a, g, s, u, p, f, A, _;
	return {
		c() {
			(t = E('div')), (n = E('input')), (o = z()), (r = E('input')), this.h();
		},
		l(c) {
			t = N(c, 'DIV', { class: !0 });
			var h = I(t);
			(n = N(h, 'INPUT', { class: !0, type: !0, name: !0 })),
				(o = G(h)),
				(r = N(h, 'INPUT', {
					class: !0,
					type: !0,
					inputmode: !0,
					name: !0,
					placeholder: !0,
					autocomplete: !0
				})),
				h.forEach(T),
				this.h();
		},
		h() {
			var c, h, D, V, U, O;
			d(
				n,
				'class',
				(l = he(((c = e[8]) == null ? void 0 : c.unformatted) ?? ye) + ' svelte-n0twf6')
			),
				d(n, 'type', 'hidden'),
				d(n, 'name', e[1]),
				(n.disabled = e[3]),
				d(
					r,
					'class',
					(a =
						'' +
						(((h = e[8]) == null ? void 0 : h.formatted) ?? Ee) +
						' ' +
						(e[6] && !e[12] && !e[9]
							? ((D = e[8]) == null ? void 0 : D.formattedPositive) ?? Ne
							: '') +
						' ' +
						(e[12] ? ((V = e[8]) == null ? void 0 : V.formattedZero) ?? Se : '') +
						' ' +
						(e[6] && e[9] ? ((U = e[8]) == null ? void 0 : U.formattedNegative) ?? pe : '') +
						' svelte-n0twf6')
				),
				d(r, 'type', 'text'),
				d(r, 'inputmode', (g = e[7] > 0 ? 'decimal' : 'numeric')),
				d(r, 'name', (s = `formatted-${e[1]}`)),
				(r.required = u = e[2] && !e[12]),
				d(r, 'placeholder', (p = e[16](e[4]))),
				d(r, 'autocomplete', e[5]),
				(r.disabled = e[3]),
				d(t, 'class', (f = ((O = e[8]) == null ? void 0 : O.wrapper) ?? Ae));
		},
		m(c, h) {
			W(c, t, h),
				v(t, n),
				w(n, e[0]),
				v(t, o),
				v(t, r),
				e[23](r),
				w(r, e[11]),
				A ||
					((_ = [
						Z(n, 'input', e[22]),
						Z(r, 'input', e[24]),
						Z(r, 'keydown', e[13]),
						Z(r, 'keyup', e[15]),
						Z(r, 'blur', e[14])
					]),
					(A = !0));
		},
		p(c, h) {
			var D, V, U, O, M, k;
			h[0] & 256 &&
				l !== (l = he(((D = c[8]) == null ? void 0 : D.unformatted) ?? ye) + ' svelte-n0twf6') &&
				d(n, 'class', l),
				h[0] & 2 && d(n, 'name', c[1]),
				h[0] & 8 && (n.disabled = c[3]),
				h[0] & 1 && w(n, c[0]),
				h[0] & 4928 &&
					a !==
						(a =
							'' +
							(((V = c[8]) == null ? void 0 : V.formatted) ?? Ee) +
							' ' +
							(c[6] && !c[12] && !c[9]
								? ((U = c[8]) == null ? void 0 : U.formattedPositive) ?? Ne
								: '') +
							' ' +
							(c[12] ? ((O = c[8]) == null ? void 0 : O.formattedZero) ?? Se : '') +
							' ' +
							(c[6] && c[9] ? ((M = c[8]) == null ? void 0 : M.formattedNegative) ?? pe : '') +
							' svelte-n0twf6') &&
					d(r, 'class', a),
				h[0] & 128 && g !== (g = c[7] > 0 ? 'decimal' : 'numeric') && d(r, 'inputmode', g),
				h[0] & 2 && s !== (s = `formatted-${c[1]}`) && d(r, 'name', s),
				h[0] & 4100 && u !== (u = c[2] && !c[12]) && (r.required = u),
				h[0] & 16 && p !== (p = c[16](c[4])) && d(r, 'placeholder', p),
				h[0] & 32 && d(r, 'autocomplete', c[5]),
				h[0] & 8 && (r.disabled = c[3]),
				h[0] & 2048 && r.value !== c[11] && w(r, c[11]),
				h[0] & 256 &&
					f !== (f = ((k = c[8]) == null ? void 0 : k.wrapper) ?? Ae) &&
					d(t, 'class', f);
		},
		i: K,
		o: K,
		d(c) {
			c && T(t), e[23](null), (A = !1), ae(_);
		}
	};
}
const Qe = 'en-US',
	xe = 'USD',
	$e = 'total',
	Ce = 0,
	et = 2,
	Ae = 'currencyInput',
	ye = 'currencyInput__unformatted',
	Ee = 'currencyInput__formatted',
	Ne = 'currencyInput__formatted--positive',
	pe = 'currencyInput__formatted--negative',
	Se = 'currencyInput__formatted--zero';
function tt(e, t, n) {
	let l,
		o,
		r,
		{ value: a = Ce } = t,
		{ locale: g = Qe } = t,
		{ currency: s = xe } = t,
		{ name: u = $e } = t,
		{ required: p = !1 } = t,
		{ disabled: f = !1 } = t,
		{ placeholder: A = Ce } = t,
		{ autocomplete: _ = void 0 } = t,
		{ isNegativeAllowed: c = !0 } = t,
		{ isZeroNullish: h = !1 } = t,
		{ fractionDigits: D = et } = t,
		{ inputClasses: V = null } = t,
		{ onValueChange: U = () => {} } = t;
	const O = (i, L, j) =>
			new Intl.NumberFormat(g, {
				currency: s,
				style: 'currency',
				maximumFractionDigits: L || 0,
				minimumFractionDigits: j || 0
			}).format(i),
		M = (i) => {
			const L = i.key === 'Backspace' || i.key === 'Delete',
				j = i.metaKey || i.altKey || i.ctrlKey,
				X = i.key === 'ArrowLeft' || i.key === 'ArrowRight',
				Pe = i.key === 'Tab',
				Ve = !/^\d|,|\.|-$/g.test(i.key);
			((i.key !== ',' && i.key !== '.'
				? !1
				: b
					? C.split(',').length >= 2
					: b
						? !1
						: C.split('.').length >= 2) ||
				(!L && !j && !X && Ve && !Pe)) &&
				i.preventDefault();
		},
		k = () => S();
	let B, P;
	Le(() => {
		(B = document), S();
	});
	const m = new Intl.NumberFormat(g).format(1.1).charAt(1),
		b = m === ',',
		y = O(0, 0)
			.replace('0', '')
			.replace(/\u00A0/, ''),
		R = (i) => {
			if (i) {
				if (i.key === m) return;
				b && i.key === '.' && n(11, (C = C.replace(/\.([^.]*)$/, m + '$1'))),
					!b && i.key === ',' && n(11, (C = C.replace(/\,([^,]*)$/, m + '$1')));
				const j = [y, `-${y}`, '-'],
					X = C.replace(' ', '');
				if (j.includes(X)) return;
				i.target, c && i.key === '-' && n(0, (a = a * -1));
			}
			let L = c ? C.replace(/[^0-9,.-]/g, '') : C.replace(/[^0-9,.]/g, '');
			if (Number.isNaN(parseFloat(L))) n(0, (a = 0));
			else {
				(L = L.replace(b ? /\./g : /\,/g, '')), b && (L = L.replace(',', '.'));
				const j = a;
				n(0, (a = parseFloat(L))),
					i && j === a && L.includes('.') && L.split('.')[1].length > D && S();
			}
		},
		S = () => {
			if (!B) return;
			const i = (P == null ? void 0 : P.selectionStart) || 0,
				L = C.length;
			n(11, (C = r && !h ? '' : O(a, D, B.activeElement === P ? 0 : D))), R();
			let j = 0;
			for (; L === C.length && j < 10; ) j++;
			if (L !== C.length) {
				const X = i + C.length - L;
				P == null || P.setSelectionRange(X, X);
			}
			U(a);
		},
		q = (i) => (typeof i == 'number' ? O(i, D, D) : i === null ? '' : i);
	let C = '';
	function H() {
		(a = this.value), n(0, a);
	}
	function ee(i) {
		we[i ? 'unshift' : 'push'](() => {
			(P = i), n(10, P);
		});
	}
	function te() {
		(C = this.value), n(11, C);
	}
	return (
		(e.$$set = (i) => {
			'value' in i && n(0, (a = i.value)),
				'locale' in i && n(17, (g = i.locale)),
				'currency' in i && n(18, (s = i.currency)),
				'name' in i && n(1, (u = i.name)),
				'required' in i && n(2, (p = i.required)),
				'disabled' in i && n(3, (f = i.disabled)),
				'placeholder' in i && n(4, (A = i.placeholder)),
				'autocomplete' in i && n(5, (_ = i.autocomplete)),
				'isNegativeAllowed' in i && n(6, (c = i.isNegativeAllowed)),
				'isZeroNullish' in i && n(19, (h = i.isZeroNullish)),
				'fractionDigits' in i && n(7, (D = i.fractionDigits)),
				'inputClasses' in i && n(8, (V = i.inputClasses)),
				'onValueChange' in i && n(20, (U = i.onValueChange));
		}),
		(e.$$.update = () => {
			e.$$.dirty[0] & 1 && n(9, (l = a < 0)),
				e.$$.dirty[0] & 1 && n(21, (o = a > 0)),
				e.$$.dirty[0] & 2097664 && n(12, (r = !l && !o)),
				e.$$.dirty[0] & 1 && S();
		}),
		[a, u, p, f, A, _, c, D, V, l, P, C, r, M, k, R, q, g, s, h, U, o, H, ee, te]
	);
}
class ft extends ie {
	constructor(t) {
		super(),
			se(
				this,
				t,
				tt,
				Ye,
				le,
				{
					value: 0,
					locale: 17,
					currency: 18,
					name: 1,
					required: 2,
					disabled: 3,
					placeholder: 4,
					autocomplete: 5,
					isNegativeAllowed: 6,
					isZeroNullish: 19,
					fractionDigits: 7,
					inputClasses: 8,
					onValueChange: 20
				},
				null,
				[-1, -1]
			);
	}
}
export { ft as C, st as F, ot as T, ut as a, rt as c };