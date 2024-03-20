function D() {}
const V = (t) => t;
function P(t, e) {
	for (const n in e) t[n] = e[n];
	return t;
}
function B(t) {
	return t();
}
function X() {
	return Object.create(null);
}
function I(t) {
	t.forEach(B);
}
function Y(t) {
	return typeof t == 'function';
}
function Z(t, e) {
	return t != t ? e == e : t !== e || (t && typeof t == 'object') || typeof t == 'function';
}
let h;
function $(t, e) {
	return t === e ? !0 : (h || (h = document.createElement('a')), (h.href = e), t === h.href);
}
function tt(t) {
	return Object.keys(t).length === 0;
}
function N(t, ...e) {
	if (t == null) {
		for (const i of e) i(void 0);
		return D;
	}
	const n = t.subscribe(...e);
	return n.unsubscribe ? () => n.unsubscribe() : n;
}
function et(t) {
	let e;
	return N(t, (n) => (e = n))(), e;
}
function nt(t, e, n) {
	t.$$.on_destroy.push(N(e, n));
}
function it(t, e, n, i) {
	if (t) {
		const r = A(t, e, n, i);
		return t[0](r);
	}
}
function A(t, e, n, i) {
	return t[1] && i ? P(n.ctx.slice(), t[1](i(e))) : n.ctx;
}
function rt(t, e, n, i) {
	if (t[2] && i) {
		const r = t[2](i(n));
		if (e.dirty === void 0) return r;
		if (typeof r == 'object') {
			const u = [],
				c = Math.max(e.dirty.length, r.length);
			for (let s = 0; s < c; s += 1) u[s] = e.dirty[s] | r[s];
			return u;
		}
		return e.dirty | r;
	}
	return e.dirty;
}
function ct(t, e, n, i, r, u) {
	if (r) {
		const c = A(e, n, i, u);
		t.p(c, r);
	}
}
function lt(t) {
	if (t.ctx.length > 32) {
		const e = [],
			n = t.ctx.length / 32;
		for (let i = 0; i < n; i++) e[i] = -1;
		return e;
	}
	return -1;
}
function st(t) {
	return t ?? '';
}
function ut(t) {
	const e = typeof t == 'string' && t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return e ? [parseFloat(e[1]), e[2] || 'px'] : [t, 'px'];
}
let m = !1;
function ot() {
	m = !0;
}
function at() {
	m = !1;
}
function L(t, e, n, i) {
	for (; t < e; ) {
		const r = t + ((e - t) >> 1);
		n(r) <= i ? (t = r + 1) : (e = r);
	}
	return t;
}
function M(t) {
	if (t.hydrate_init) return;
	t.hydrate_init = !0;
	let e = t.childNodes;
	if (t.nodeName === 'HEAD') {
		const l = [];
		for (let o = 0; o < e.length; o++) {
			const a = e[o];
			a.claim_order !== void 0 && l.push(a);
		}
		e = l;
	}
	const n = new Int32Array(e.length + 1),
		i = new Int32Array(e.length);
	n[0] = -1;
	let r = 0;
	for (let l = 0; l < e.length; l++) {
		const o = e[l].claim_order,
			a = (r > 0 && e[n[r]].claim_order <= o ? r + 1 : L(1, r, (q) => e[n[q]].claim_order, o)) - 1;
		i[l] = n[a] + 1;
		const w = a + 1;
		(n[w] = l), (r = Math.max(w, r));
	}
	const u = [],
		c = [];
	let s = e.length - 1;
	for (let l = n[r] + 1; l != 0; l = i[l - 1]) {
		for (u.push(e[l - 1]); s >= l; s--) c.push(e[s]);
		s--;
	}
	for (; s >= 0; s--) c.push(e[s]);
	u.reverse(), c.sort((l, o) => l.claim_order - o.claim_order);
	for (let l = 0, o = 0; l < c.length; l++) {
		for (; o < u.length && c[l].claim_order >= u[o].claim_order; ) o++;
		const a = o < u.length ? u[o] : null;
		t.insertBefore(c[l], a);
	}
}
function O(t, e) {
	t.appendChild(e);
}
function T(t) {
	if (!t) return document;
	const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
	return e && e.host ? e : t.ownerDocument;
}
function ft(t) {
	const e = j('style');
	return (e.textContent = '/* empty */'), F(T(t), e), e.sheet;
}
function F(t, e) {
	return O(t.head || t, e), e.sheet;
}
function H(t, e) {
	if (m) {
		for (
			M(t),
				(t.actual_end_child === void 0 ||
					(t.actual_end_child !== null && t.actual_end_child.parentNode !== t)) &&
					(t.actual_end_child = t.firstChild);
			t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

		)
			t.actual_end_child = t.actual_end_child.nextSibling;
		e !== t.actual_end_child
			? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child)
			: (t.actual_end_child = e.nextSibling);
	} else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function _t(t, e, n) {
	m && !n ? H(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null);
}
function dt(t) {
	t.parentNode && t.parentNode.removeChild(t);
}
function ht(t, e) {
	for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function j(t) {
	return document.createElement(t);
}
function v(t) {
	return document.createTextNode(t);
}
function pt() {
	return v(' ');
}
function mt() {
	return v('');
}
function yt(t, e, n, i) {
	return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function bt(t) {
	return function (e) {
		return e.preventDefault(), t.call(this, e);
	};
}
function gt(t, e, n) {
	n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function xt(t) {
	return t.dataset.svelteH;
}
function vt(t) {
	return Array.from(t.childNodes);
}
function R(t) {
	t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function C(t, e, n, i, r = !1) {
	R(t);
	const u = (() => {
		for (let c = t.claim_info.last_index; c < t.length; c++) {
			const s = t[c];
			if (e(s)) {
				const l = n(s);
				return l === void 0 ? t.splice(c, 1) : (t[c] = l), r || (t.claim_info.last_index = c), s;
			}
		}
		for (let c = t.claim_info.last_index - 1; c >= 0; c--) {
			const s = t[c];
			if (e(s)) {
				const l = n(s);
				return (
					l === void 0 ? t.splice(c, 1) : (t[c] = l),
					r ? l === void 0 && t.claim_info.last_index-- : (t.claim_info.last_index = c),
					s
				);
			}
		}
		return i();
	})();
	return (u.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), u;
}
function z(t, e, n, i) {
	return C(
		t,
		(r) => r.nodeName === e,
		(r) => {
			const u = [];
			for (let c = 0; c < r.attributes.length; c++) {
				const s = r.attributes[c];
				n[s.name] || u.push(s.name);
			}
			u.forEach((c) => r.removeAttribute(c));
		},
		() => i(e)
	);
}
function kt(t, e, n) {
	return z(t, e, n, j);
}
function U(t, e) {
	return C(
		t,
		(n) => n.nodeType === 3,
		(n) => {
			const i = '' + e;
			if (n.data.startsWith(i)) {
				if (n.data.length !== i.length) return n.splitText(i.length);
			} else n.data = i;
		},
		() => v(e),
		!0
	);
}
function wt(t) {
	return U(t, ' ');
}
function Et(t, e) {
	(e = '' + e), t.data !== e && (t.data = e);
}
function Nt(t, e) {
	t.value = e ?? '';
}
function At(t, e, n, i) {
	n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, i ? 'important' : '');
}
function jt(t, e, n) {
	for (let i = 0; i < t.options.length; i += 1) {
		const r = t.options[i];
		if (r.__value === e) {
			r.selected = !0;
			return;
		}
	}
	(!n || e !== void 0) && (t.selectedIndex = -1);
}
function Ct(t) {
	const e = t.querySelector(':checked');
	return e && e.__value;
}
function St(t, e, n) {
	t.classList.toggle(e, !!n);
}
function W(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) {
	return new CustomEvent(t, { detail: e, bubbles: n, cancelable: i });
}
function qt(t, e) {
	return new t(e);
}
let p;
function y(t) {
	p = t;
}
function k() {
	if (!p) throw new Error('Function called outside component initialization');
	return p;
}
function Dt(t) {
	k().$$.on_mount.push(t);
}
function Pt(t) {
	k().$$.after_update.push(t);
}
function Bt() {
	const t = k();
	return (e, n, { cancelable: i = !1 } = {}) => {
		const r = t.$$.callbacks[e];
		if (r) {
			const u = W(e, n, { cancelable: i });
			return (
				r.slice().forEach((c) => {
					c.call(t, u);
				}),
				!u.defaultPrevented
			);
		}
		return !0;
	};
}
const d = [],
	E = [];
let _ = [];
const g = [],
	S = Promise.resolve();
let x = !1;
function G() {
	x || ((x = !0), S.then(K));
}
function It() {
	return G(), S;
}
function J(t) {
	_.push(t);
}
function Lt(t) {
	g.push(t);
}
const b = new Set();
let f = 0;
function K() {
	if (f !== 0) return;
	const t = p;
	do {
		try {
			for (; f < d.length; ) {
				const e = d[f];
				f++, y(e), Q(e.$$);
			}
		} catch (e) {
			throw ((d.length = 0), (f = 0), e);
		}
		for (y(null), d.length = 0, f = 0; E.length; ) E.pop()();
		for (let e = 0; e < _.length; e += 1) {
			const n = _[e];
			b.has(n) || (b.add(n), n());
		}
		_.length = 0;
	} while (d.length);
	for (; g.length; ) g.pop()();
	(x = !1), b.clear(), y(t);
}
function Q(t) {
	if (t.fragment !== null) {
		t.update(), I(t.before_update);
		const e = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(J);
	}
}
function Mt(t) {
	const e = [],
		n = [];
	_.forEach((i) => (t.indexOf(i) === -1 ? e.push(i) : n.push(i))), n.forEach((i) => i()), (_ = e);
}
export {
	d as $,
	Nt as A,
	bt as B,
	N as C,
	Y as D,
	V as E,
	Dt as F,
	ht as G,
	At as H,
	E as I,
	st as J,
	Lt as K,
	Pt as L,
	qt as M,
	It as N,
	J as O,
	et as P,
	Bt as Q,
	T as R,
	ft as S,
	W as T,
	X as U,
	K as V,
	tt as W,
	Mt as X,
	p as Y,
	y as Z,
	B as _,
	pt as a,
	G as a0,
	ot as a1,
	at as a2,
	jt as a3,
	Ct as a4,
	vt as b,
	kt as c,
	U as d,
	j as e,
	dt as f,
	wt as g,
	H as h,
	_t as i,
	Et as j,
	nt as k,
	ut as l,
	it as m,
	D as n,
	gt as o,
	lt as p,
	rt as q,
	I as r,
	Z as s,
	v as t,
	ct as u,
	xt as v,
	yt as w,
	mt as x,
	$ as y,
	St as z
};