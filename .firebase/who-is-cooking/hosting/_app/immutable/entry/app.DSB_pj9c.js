function __vite__mapDeps(indexes) {
	if (!__vite__mapDeps.viteFileDeps) {
		__vite__mapDeps.viteFileDeps = [
			'../nodes/0.lWB2vpDe.js',
			'../chunks/scheduler.CxO4csHG.js',
			'../chunks/index.BqBZE8_s.js',
			'../chunks/firebase.BXW4q-2E.js',
			'../chunks/index.Drio3CKC.js',
			'../chunks/entry.vAAbogbC.js',
			'../chunks/control.CYgJF_JY.js',
			'../chunks/stores.BBkUZuCL.js',
			'../chunks/index.ChZz6XMy.js',
			'../chunks/index.CvmYViMX.js',
			'../chunks/each.DLoRWcad.js',
			'../chunks/index.D-koMqGf.js',
			'../chunks/notifications.DHR35Uvq.js',
			'../assets/0.CQ6iOz4Y.css',
			'../nodes/1.D_x9EG1g.js',
			'../nodes/2.CY7ZCtOB.js',
			'../chunks/nav.BSPGET2L.js',
			'../assets/2.Cirlo5Z8.css',
			'../nodes/3.DNN-SSjk.js',
			'../nodes/4.Dj3jHXyZ.js',
			'../chunks/AuthCheck.CwOMPwgQ.js',
			'../chunks/Confetti.wDXda6tx.js',
			'../assets/Confetti.U9jond_5.css',
			'../assets/4.C4Zo4Wac.css',
			'../nodes/5.DbNDR-XN.js',
			'../nodes/6.BcUdd1yH.js',
			'../nodes/7.BaQZJd8r.js',
			'../nodes/8.DsfeqcOL.js',
			'../chunks/CurrencyInput.DRDzj19Z.js',
			'../assets/CurrencyInput.CIDFhpU1.css',
			'../assets/12.Q73fWxTQ.css',
			'../nodes/9.DbZG59Rv.js',
			'../nodes/10.DVYAI6so.js',
			'../nodes/11.Cq-F77zW.js',
			'../nodes/12.uVFM5wVO.js',
			'../nodes/13.BntTOBLy.js'
		];
	}
	return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
import {
	s as q,
	a as M,
	x as p,
	g as j,
	i as b,
	f as g,
	L as F,
	F as H,
	e as W,
	c as z,
	b as G,
	o as T,
	H as L,
	t as J,
	d as K,
	j as Q,
	I as D,
	M as E,
	N as X
} from '../chunks/scheduler.CxO4csHG.js';
import {
	S as Y,
	i as Z,
	a as d,
	e as P,
	t as h,
	g as I,
	c as k,
	b as O,
	m as v,
	d as R
} from '../chunks/index.BqBZE8_s.js';
const x = 'modulepreload',
	ee = function (l, e) {
		return new URL(l, e).href;
	},
	A = {},
	m = function (e, n, o) {
		let i = Promise.resolve();
		if (n && n.length > 0) {
			const _ = document.getElementsByTagName('link');
			i = Promise.all(
				n.map((t) => {
					if (((t = ee(t, o)), t in A)) return;
					A[t] = !0;
					const s = t.endsWith('.css'),
						r = s ? '[rel="stylesheet"]' : '';
					if (!!o)
						for (let u = _.length - 1; u >= 0; u--) {
							const w = _[u];
							if (w.href === t && (!s || w.rel === 'stylesheet')) return;
						}
					else if (document.querySelector(`link[href="${t}"]${r}`)) return;
					const f = document.createElement('link');
					if (
						((f.rel = s ? 'stylesheet' : x),
						s || ((f.as = 'script'), (f.crossOrigin = '')),
						(f.href = t),
						document.head.appendChild(f),
						s)
					)
						return new Promise((u, w) => {
							f.addEventListener('load', u),
								f.addEventListener('error', () => w(new Error(`Unable to preload CSS for ${t}`)));
						});
				})
			);
		}
		return i
			.then(() => e())
			.catch((_) => {
				const t = new Event('vite:preloadError', { cancelable: !0 });
				if (((t.payload = _), window.dispatchEvent(t), !t.defaultPrevented)) throw _;
			});
	},
	ce = {};
function te(l) {
	let e, n, o;
	var i = l[1][0];
	function _(t, s) {
		return { props: { data: t[3], form: t[2] } };
	}
	return (
		i && ((e = E(i, _(l))), l[15](e)),
		{
			c() {
				e && k(e.$$.fragment), (n = p());
			},
			l(t) {
				e && O(e.$$.fragment, t), (n = p());
			},
			m(t, s) {
				e && v(e, t, s), b(t, n, s), (o = !0);
			},
			p(t, s) {
				if (s & 2 && i !== (i = t[1][0])) {
					if (e) {
						I();
						const r = e;
						d(r.$$.fragment, 1, 0, () => {
							R(r, 1);
						}),
							P();
					}
					i
						? ((e = E(i, _(t))),
							t[15](e),
							k(e.$$.fragment),
							h(e.$$.fragment, 1),
							v(e, n.parentNode, n))
						: (e = null);
				} else if (i) {
					const r = {};
					s & 8 && (r.data = t[3]), s & 4 && (r.form = t[2]), e.$set(r);
				}
			},
			i(t) {
				o || (e && h(e.$$.fragment, t), (o = !0));
			},
			o(t) {
				e && d(e.$$.fragment, t), (o = !1);
			},
			d(t) {
				t && g(n), l[15](null), e && R(e, t);
			}
		}
	);
}
function ne(l) {
	let e, n, o;
	var i = l[1][0];
	function _(t, s) {
		return { props: { data: t[3], $$slots: { default: [oe] }, $$scope: { ctx: t } } };
	}
	return (
		i && ((e = E(i, _(l))), l[14](e)),
		{
			c() {
				e && k(e.$$.fragment), (n = p());
			},
			l(t) {
				e && O(e.$$.fragment, t), (n = p());
			},
			m(t, s) {
				e && v(e, t, s), b(t, n, s), (o = !0);
			},
			p(t, s) {
				if (s & 2 && i !== (i = t[1][0])) {
					if (e) {
						I();
						const r = e;
						d(r.$$.fragment, 1, 0, () => {
							R(r, 1);
						}),
							P();
					}
					i
						? ((e = E(i, _(t))),
							t[14](e),
							k(e.$$.fragment),
							h(e.$$.fragment, 1),
							v(e, n.parentNode, n))
						: (e = null);
				} else if (i) {
					const r = {};
					s & 8 && (r.data = t[3]), s & 65591 && (r.$$scope = { dirty: s, ctx: t }), e.$set(r);
				}
			},
			i(t) {
				o || (e && h(e.$$.fragment, t), (o = !0));
			},
			o(t) {
				e && d(e.$$.fragment, t), (o = !1);
			},
			d(t) {
				t && g(n), l[14](null), e && R(e, t);
			}
		}
	);
}
function ie(l) {
	let e, n, o;
	var i = l[1][1];
	function _(t, s) {
		return { props: { data: t[4], form: t[2] } };
	}
	return (
		i && ((e = E(i, _(l))), l[13](e)),
		{
			c() {
				e && k(e.$$.fragment), (n = p());
			},
			l(t) {
				e && O(e.$$.fragment, t), (n = p());
			},
			m(t, s) {
				e && v(e, t, s), b(t, n, s), (o = !0);
			},
			p(t, s) {
				if (s & 2 && i !== (i = t[1][1])) {
					if (e) {
						I();
						const r = e;
						d(r.$$.fragment, 1, 0, () => {
							R(r, 1);
						}),
							P();
					}
					i
						? ((e = E(i, _(t))),
							t[13](e),
							k(e.$$.fragment),
							h(e.$$.fragment, 1),
							v(e, n.parentNode, n))
						: (e = null);
				} else if (i) {
					const r = {};
					s & 16 && (r.data = t[4]), s & 4 && (r.form = t[2]), e.$set(r);
				}
			},
			i(t) {
				o || (e && h(e.$$.fragment, t), (o = !0));
			},
			o(t) {
				e && d(e.$$.fragment, t), (o = !1);
			},
			d(t) {
				t && g(n), l[13](null), e && R(e, t);
			}
		}
	);
}
function re(l) {
	let e, n, o;
	var i = l[1][1];
	function _(t, s) {
		return { props: { data: t[4], $$slots: { default: [se] }, $$scope: { ctx: t } } };
	}
	return (
		i && ((e = E(i, _(l))), l[12](e)),
		{
			c() {
				e && k(e.$$.fragment), (n = p());
			},
			l(t) {
				e && O(e.$$.fragment, t), (n = p());
			},
			m(t, s) {
				e && v(e, t, s), b(t, n, s), (o = !0);
			},
			p(t, s) {
				if (s & 2 && i !== (i = t[1][1])) {
					if (e) {
						I();
						const r = e;
						d(r.$$.fragment, 1, 0, () => {
							R(r, 1);
						}),
							P();
					}
					i
						? ((e = E(i, _(t))),
							t[12](e),
							k(e.$$.fragment),
							h(e.$$.fragment, 1),
							v(e, n.parentNode, n))
						: (e = null);
				} else if (i) {
					const r = {};
					s & 16 && (r.data = t[4]), s & 65575 && (r.$$scope = { dirty: s, ctx: t }), e.$set(r);
				}
			},
			i(t) {
				o || (e && h(e.$$.fragment, t), (o = !0));
			},
			o(t) {
				e && d(e.$$.fragment, t), (o = !1);
			},
			d(t) {
				t && g(n), l[12](null), e && R(e, t);
			}
		}
	);
}
function se(l) {
	let e, n, o;
	var i = l[1][2];
	function _(t, s) {
		return { props: { data: t[5], form: t[2] } };
	}
	return (
		i && ((e = E(i, _(l))), l[11](e)),
		{
			c() {
				e && k(e.$$.fragment), (n = p());
			},
			l(t) {
				e && O(e.$$.fragment, t), (n = p());
			},
			m(t, s) {
				e && v(e, t, s), b(t, n, s), (o = !0);
			},
			p(t, s) {
				if (s & 2 && i !== (i = t[1][2])) {
					if (e) {
						I();
						const r = e;
						d(r.$$.fragment, 1, 0, () => {
							R(r, 1);
						}),
							P();
					}
					i
						? ((e = E(i, _(t))),
							t[11](e),
							k(e.$$.fragment),
							h(e.$$.fragment, 1),
							v(e, n.parentNode, n))
						: (e = null);
				} else if (i) {
					const r = {};
					s & 32 && (r.data = t[5]), s & 4 && (r.form = t[2]), e.$set(r);
				}
			},
			i(t) {
				o || (e && h(e.$$.fragment, t), (o = !0));
			},
			o(t) {
				e && d(e.$$.fragment, t), (o = !1);
			},
			d(t) {
				t && g(n), l[11](null), e && R(e, t);
			}
		}
	);
}
function oe(l) {
	let e, n, o, i;
	const _ = [re, ie],
		t = [];
	function s(r, c) {
		return r[1][2] ? 0 : 1;
	}
	return (
		(e = s(l)),
		(n = t[e] = _[e](l)),
		{
			c() {
				n.c(), (o = p());
			},
			l(r) {
				n.l(r), (o = p());
			},
			m(r, c) {
				t[e].m(r, c), b(r, o, c), (i = !0);
			},
			p(r, c) {
				let f = e;
				(e = s(r)),
					e === f
						? t[e].p(r, c)
						: (I(),
							d(t[f], 1, 1, () => {
								t[f] = null;
							}),
							P(),
							(n = t[e]),
							n ? n.p(r, c) : ((n = t[e] = _[e](r)), n.c()),
							h(n, 1),
							n.m(o.parentNode, o));
			},
			i(r) {
				i || (h(n), (i = !0));
			},
			o(r) {
				d(n), (i = !1);
			},
			d(r) {
				r && g(o), t[e].d(r);
			}
		}
	);
}
function y(l) {
	let e,
		n = l[7] && N(l);
	return {
		c() {
			(e = W('div')), n && n.c(), this.h();
		},
		l(o) {
			e = z(o, 'DIV', { id: !0, 'aria-live': !0, 'aria-atomic': !0, style: !0 });
			var i = G(e);
			n && n.l(i), i.forEach(g), this.h();
		},
		h() {
			T(e, 'id', 'svelte-announcer'),
				T(e, 'aria-live', 'assertive'),
				T(e, 'aria-atomic', 'true'),
				L(e, 'position', 'absolute'),
				L(e, 'left', '0'),
				L(e, 'top', '0'),
				L(e, 'clip', 'rect(0 0 0 0)'),
				L(e, 'clip-path', 'inset(50%)'),
				L(e, 'overflow', 'hidden'),
				L(e, 'white-space', 'nowrap'),
				L(e, 'width', '1px'),
				L(e, 'height', '1px');
		},
		m(o, i) {
			b(o, e, i), n && n.m(e, null);
		},
		p(o, i) {
			o[7] ? (n ? n.p(o, i) : ((n = N(o)), n.c(), n.m(e, null))) : n && (n.d(1), (n = null));
		},
		d(o) {
			o && g(e), n && n.d();
		}
	};
}
function N(l) {
	let e;
	return {
		c() {
			e = J(l[8]);
		},
		l(n) {
			e = K(n, l[8]);
		},
		m(n, o) {
			b(n, e, o);
		},
		p(n, o) {
			o & 256 && Q(e, n[8]);
		},
		d(n) {
			n && g(e);
		}
	};
}
function le(l) {
	let e, n, o, i, _;
	const t = [ne, te],
		s = [];
	function r(f, u) {
		return f[1][1] ? 0 : 1;
	}
	(e = r(l)), (n = s[e] = t[e](l));
	let c = l[6] && y(l);
	return {
		c() {
			n.c(), (o = M()), c && c.c(), (i = p());
		},
		l(f) {
			n.l(f), (o = j(f)), c && c.l(f), (i = p());
		},
		m(f, u) {
			s[e].m(f, u), b(f, o, u), c && c.m(f, u), b(f, i, u), (_ = !0);
		},
		p(f, [u]) {
			let w = e;
			(e = r(f)),
				e === w
					? s[e].p(f, u)
					: (I(),
						d(s[w], 1, 1, () => {
							s[w] = null;
						}),
						P(),
						(n = s[e]),
						n ? n.p(f, u) : ((n = s[e] = t[e](f)), n.c()),
						h(n, 1),
						n.m(o.parentNode, o)),
				f[6]
					? c
						? c.p(f, u)
						: ((c = y(f)), c.c(), c.m(i.parentNode, i))
					: c && (c.d(1), (c = null));
		},
		i(f) {
			_ || (h(n), (_ = !0));
		},
		o(f) {
			d(n), (_ = !1);
		},
		d(f) {
			f && (g(o), g(i)), s[e].d(f), c && c.d(f);
		}
	};
}
function fe(l, e, n) {
	let { stores: o } = e,
		{ page: i } = e,
		{ constructors: _ } = e,
		{ components: t = [] } = e,
		{ form: s } = e,
		{ data_0: r = null } = e,
		{ data_1: c = null } = e,
		{ data_2: f = null } = e;
	F(o.page.notify);
	let u = !1,
		w = !1,
		V = null;
	H(() => {
		const a = o.page.subscribe(() => {
			u &&
				(n(7, (w = !0)),
				X().then(() => {
					n(8, (V = document.title || 'untitled page'));
				}));
		});
		return n(6, (u = !0)), a;
	});
	function $(a) {
		D[a ? 'unshift' : 'push'](() => {
			(t[2] = a), n(0, t);
		});
	}
	function S(a) {
		D[a ? 'unshift' : 'push'](() => {
			(t[1] = a), n(0, t);
		});
	}
	function C(a) {
		D[a ? 'unshift' : 'push'](() => {
			(t[1] = a), n(0, t);
		});
	}
	function B(a) {
		D[a ? 'unshift' : 'push'](() => {
			(t[0] = a), n(0, t);
		});
	}
	function U(a) {
		D[a ? 'unshift' : 'push'](() => {
			(t[0] = a), n(0, t);
		});
	}
	return (
		(l.$$set = (a) => {
			'stores' in a && n(9, (o = a.stores)),
				'page' in a && n(10, (i = a.page)),
				'constructors' in a && n(1, (_ = a.constructors)),
				'components' in a && n(0, (t = a.components)),
				'form' in a && n(2, (s = a.form)),
				'data_0' in a && n(3, (r = a.data_0)),
				'data_1' in a && n(4, (c = a.data_1)),
				'data_2' in a && n(5, (f = a.data_2));
		}),
		(l.$$.update = () => {
			l.$$.dirty & 1536 && o.page.set(i);
		}),
		[t, _, s, r, c, f, u, w, V, o, i, $, S, C, B, U]
	);
}
class ue extends Y {
	constructor(e) {
		super(),
			Z(this, e, fe, le, q, {
				stores: 9,
				page: 10,
				constructors: 1,
				components: 0,
				form: 2,
				data_0: 3,
				data_1: 4,
				data_2: 5
			});
	}
}
const me = [
		() =>
			m(
				() => import('../nodes/0.lWB2vpDe.js'),
				__vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/1.D_x9EG1g.js'),
				__vite__mapDeps([14, 1, 2, 7, 5, 4, 6]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/2.CY7ZCtOB.js'),
				__vite__mapDeps([15, 1, 2, 5, 4, 6, 11, 9, 7, 16, 17]),
				import.meta.url
			),
		() => m(() => import('../nodes/3.DNN-SSjk.js'), __vite__mapDeps([18, 1, 2]), import.meta.url),
		() =>
			m(
				() => import('../nodes/4.Dj3jHXyZ.js'),
				__vite__mapDeps([19, 3, 4, 1, 6, 2, 20, 8, 9, 10, 21, 22, 23]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/5.DbNDR-XN.js'),
				__vite__mapDeps([24, 3, 4, 1, 2, 10, 5, 6]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/6.BcUdd1yH.js'),
				__vite__mapDeps([25, 3, 4, 1, 2, 5, 6, 7, 21, 10, 22, 12]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/7.BaQZJd8r.js'),
				__vite__mapDeps([26, 1, 2, 7, 5, 4, 6, 3, 20]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/8.DsfeqcOL.js'),
				__vite__mapDeps([27, 3, 4, 1, 2, 28, 29, 20, 7, 5, 6, 30]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/9.DbZG59Rv.js'),
				__vite__mapDeps([31, 1, 2, 3, 4, 16]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/10.DVYAI6so.js'),
				__vite__mapDeps([32, 1, 2, 16, 4, 20, 3]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/11.Cq-F77zW.js'),
				__vite__mapDeps([33, 1, 2, 16, 4, 20, 3]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/12.uVFM5wVO.js'),
				__vite__mapDeps([34, 1, 2, 28, 4, 29, 5, 6, 20, 3, 30]),
				import.meta.url
			),
		() =>
			m(
				() => import('../nodes/13.BntTOBLy.js'),
				__vite__mapDeps([35, 1, 2, 20, 3, 4]),
				import.meta.url
			)
	],
	pe = [],
	de = {
		'/': [4],
		'/feed': [5],
		'/feed/[dish]': [6],
		'/feed/[dish]/delete': [7],
		'/feed/[dish]/edit': [8],
		'/login': [9, [2]],
		'/login/photo': [10, [2]],
		'/login/username': [11, [2]],
		'/new-meal': [12, [3]],
		'/profile': [13]
	},
	he = {
		handleError: ({ error: l }) => {
			console.error(l);
		},
		reroute: () => {}
	};
export {
	de as dictionary,
	he as hooks,
	ce as matchers,
	me as nodes,
	ue as root,
	pe as server_loads
};