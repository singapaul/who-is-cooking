import { d as _d, w as Vr } from './index.Drio3CKC.js';
var ma = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const $c = function (t) {
		const e = [];
		let n = 0;
		for (let r = 0; r < t.length; r++) {
			let i = t.charCodeAt(r);
			i < 128
				? (e[n++] = i)
				: i < 2048
					? ((e[n++] = (i >> 6) | 192), (e[n++] = (i & 63) | 128))
					: (i & 64512) === 55296 && r + 1 < t.length && (t.charCodeAt(r + 1) & 64512) === 56320
						? ((i = 65536 + ((i & 1023) << 10) + (t.charCodeAt(++r) & 1023)),
							(e[n++] = (i >> 18) | 240),
							(e[n++] = ((i >> 12) & 63) | 128),
							(e[n++] = ((i >> 6) & 63) | 128),
							(e[n++] = (i & 63) | 128))
						: ((e[n++] = (i >> 12) | 224),
							(e[n++] = ((i >> 6) & 63) | 128),
							(e[n++] = (i & 63) | 128));
		}
		return e;
	},
	yd = function (t) {
		const e = [];
		let n = 0,
			r = 0;
		for (; n < t.length; ) {
			const i = t[n++];
			if (i < 128) e[r++] = String.fromCharCode(i);
			else if (i > 191 && i < 224) {
				const s = t[n++];
				e[r++] = String.fromCharCode(((i & 31) << 6) | (s & 63));
			} else if (i > 239 && i < 365) {
				const s = t[n++],
					o = t[n++],
					a = t[n++],
					c = (((i & 7) << 18) | ((s & 63) << 12) | ((o & 63) << 6) | (a & 63)) - 65536;
				(e[r++] = String.fromCharCode(55296 + (c >> 10))),
					(e[r++] = String.fromCharCode(56320 + (c & 1023)));
			} else {
				const s = t[n++],
					o = t[n++];
				e[r++] = String.fromCharCode(((i & 15) << 12) | ((s & 63) << 6) | (o & 63));
			}
		}
		return e.join('');
	},
	zc = {
		byteToCharMap_: null,
		charToByteMap_: null,
		byteToCharMapWebSafe_: null,
		charToByteMapWebSafe_: null,
		ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		get ENCODED_VALS() {
			return this.ENCODED_VALS_BASE + '+/=';
		},
		get ENCODED_VALS_WEBSAFE() {
			return this.ENCODED_VALS_BASE + '-_.';
		},
		HAS_NATIVE_SUPPORT: typeof atob == 'function',
		encodeByteArray(t, e) {
			if (!Array.isArray(t)) throw Error('encodeByteArray takes an array as a parameter');
			this.init_();
			const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
				r = [];
			for (let i = 0; i < t.length; i += 3) {
				const s = t[i],
					o = i + 1 < t.length,
					a = o ? t[i + 1] : 0,
					c = i + 2 < t.length,
					u = c ? t[i + 2] : 0,
					l = s >> 2,
					h = ((s & 3) << 4) | (a >> 4);
				let d = ((a & 15) << 2) | (u >> 6),
					f = u & 63;
				c || ((f = 64), o || (d = 64)), r.push(n[l], n[h], n[d], n[f]);
			}
			return r.join('');
		},
		encodeString(t, e) {
			return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray($c(t), e);
		},
		decodeString(t, e) {
			return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : yd(this.decodeStringToByteArray(t, e));
		},
		decodeStringToByteArray(t, e) {
			this.init_();
			const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
				r = [];
			for (let i = 0; i < t.length; ) {
				const s = n[t.charAt(i++)],
					a = i < t.length ? n[t.charAt(i)] : 0;
				++i;
				const u = i < t.length ? n[t.charAt(i)] : 64;
				++i;
				const h = i < t.length ? n[t.charAt(i)] : 64;
				if ((++i, s == null || a == null || u == null || h == null)) throw new vd();
				const d = (s << 2) | (a >> 4);
				if ((r.push(d), u !== 64)) {
					const f = ((a << 4) & 240) | (u >> 2);
					if ((r.push(f), h !== 64)) {
						const E = ((u << 6) & 192) | h;
						r.push(E);
					}
				}
			}
			return r;
		},
		init_() {
			if (!this.byteToCharMap_) {
				(this.byteToCharMap_ = {}),
					(this.charToByteMap_ = {}),
					(this.byteToCharMapWebSafe_ = {}),
					(this.charToByteMapWebSafe_ = {});
				for (let t = 0; t < this.ENCODED_VALS.length; t++)
					(this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t)),
						(this.charToByteMap_[this.byteToCharMap_[t]] = t),
						(this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t)),
						(this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t),
						t >= this.ENCODED_VALS_BASE.length &&
							((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t),
							(this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t));
			}
		}
	};
class vd extends Error {
	constructor() {
		super(...arguments), (this.name = 'DecodeBase64StringError');
	}
}
const Ed = function (t) {
		const e = $c(t);
		return zc.encodeByteArray(e, !0);
	},
	Or = function (t) {
		return Ed(t).replace(/\./g, '');
	},
	Hc = function (t) {
		try {
			return zc.decodeString(t, !0);
		} catch (e) {
			console.error('base64Decode failed: ', e);
		}
		return null;
	};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Td() {
	if (typeof self < 'u') return self;
	if (typeof window < 'u') return window;
	if (typeof global < 'u') return global;
	throw new Error('Unable to locate global object.');
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Id = () => Td().__FIREBASE_DEFAULTS__,
	wd = () => {
		if (typeof process > 'u' || typeof ma > 'u') return;
		const t = ma.__FIREBASE_DEFAULTS__;
		if (t) return JSON.parse(t);
	},
	Ad = () => {
		if (typeof document > 'u') return;
		let t;
		try {
			t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
		} catch {
			return;
		}
		const e = t && Hc(t[1]);
		return e && JSON.parse(e);
	},
	ti = () => {
		try {
			return Id() || wd() || Ad();
		} catch (t) {
			console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);
			return;
		}
	},
	Wc = (t) => {
		var e, n;
		return (n = (e = ti()) === null || e === void 0 ? void 0 : e.emulatorHosts) === null ||
			n === void 0
			? void 0
			: n[t];
	},
	Gc = (t) => {
		const e = Wc(t);
		if (!e) return;
		const n = e.lastIndexOf(':');
		if (n <= 0 || n + 1 === e.length)
			throw new Error(`Invalid host ${e} with no separate hostname and port!`);
		const r = parseInt(e.substring(n + 1), 10);
		return e[0] === '[' ? [e.substring(1, n - 1), r] : [e.substring(0, n), r];
	},
	Kc = () => {
		var t;
		return (t = ti()) === null || t === void 0 ? void 0 : t.config;
	},
	Qc = (t) => {
		var e;
		return (e = ti()) === null || e === void 0 ? void 0 : e[`_${t}`];
	};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Rd {
	constructor() {
		(this.reject = () => {}),
			(this.resolve = () => {}),
			(this.promise = new Promise((e, n) => {
				(this.resolve = e), (this.reject = n);
			}));
	}
	wrapCallback(e) {
		return (n, r) => {
			n ? this.reject(n) : this.resolve(r),
				typeof e == 'function' && (this.promise.catch(() => {}), e.length === 1 ? e(n) : e(n, r));
		};
	}
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Xc(t, e) {
	if (t.uid)
		throw new Error(
			'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
		);
	const n = { alg: 'none', type: 'JWT' },
		r = e || 'demo-project',
		i = t.iat || 0,
		s = t.sub || t.user_id;
	if (!s) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
	const o = Object.assign(
		{
			iss: `https://securetoken.google.com/${r}`,
			aud: r,
			iat: i,
			exp: i + 3600,
			auth_time: i,
			sub: s,
			user_id: s,
			firebase: { sign_in_provider: 'custom', identities: {} }
		},
		t
	);
	return [Or(JSON.stringify(n)), Or(JSON.stringify(o)), ''].join('.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function K() {
	return typeof navigator < 'u' && typeof navigator.userAgent == 'string'
		? navigator.userAgent
		: '';
}
function Sd() {
	return (
		typeof window < 'u' &&
		!!(window.cordova || window.phonegap || window.PhoneGap) &&
		/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(K())
	);
}
function Pd() {
	var t;
	const e = (t = ti()) === null || t === void 0 ? void 0 : t.forceEnvironment;
	if (e === 'node') return !0;
	if (e === 'browser') return !1;
	try {
		return Object.prototype.toString.call(global.process) === '[object process]';
	} catch {
		return !1;
	}
}
function Cd() {
	const t =
		typeof chrome == 'object'
			? chrome.runtime
			: typeof browser == 'object'
				? browser.runtime
				: void 0;
	return typeof t == 'object' && t.id !== void 0;
}
function bd() {
	return typeof navigator == 'object' && navigator.product === 'ReactNative';
}
function kd() {
	const t = K();
	return t.indexOf('MSIE ') >= 0 || t.indexOf('Trident/') >= 0;
}
function Dd() {
	return (
		!Pd() &&
		!!navigator.userAgent &&
		navigator.userAgent.includes('Safari') &&
		!navigator.userAgent.includes('Chrome')
	);
}
function Jc() {
	try {
		return typeof indexedDB == 'object';
	} catch {
		return !1;
	}
}
function Nd() {
	return new Promise((t, e) => {
		try {
			let n = !0;
			const r = 'validate-browser-context-for-indexeddb-analytics-module',
				i = self.indexedDB.open(r);
			(i.onsuccess = () => {
				i.result.close(), n || self.indexedDB.deleteDatabase(r), t(!0);
			}),
				(i.onupgradeneeded = () => {
					n = !1;
				}),
				(i.onerror = () => {
					var s;
					e(((s = i.error) === null || s === void 0 ? void 0 : s.message) || '');
				});
		} catch (n) {
			e(n);
		}
	});
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Vd = 'FirebaseError';
class xe extends Error {
	constructor(e, n, r) {
		super(n),
			(this.code = e),
			(this.customData = r),
			(this.name = Vd),
			Object.setPrototypeOf(this, xe.prototype),
			Error.captureStackTrace && Error.captureStackTrace(this, zn.prototype.create);
	}
}
class zn {
	constructor(e, n, r) {
		(this.service = e), (this.serviceName = n), (this.errors = r);
	}
	create(e, ...n) {
		const r = n[0] || {},
			i = `${this.service}/${e}`,
			s = this.errors[e],
			o = s ? Od(s, r) : 'Error',
			a = `${this.serviceName}: ${o} (${i}).`;
		return new xe(i, a, r);
	}
}
function Od(t, e) {
	return t.replace(Ld, (n, r) => {
		const i = e[r];
		return i != null ? String(i) : `<${r}?>`;
	});
}
const Ld = /\{\$([^}]+)}/g;
function Md(t) {
	for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
	return !0;
}
function $t(t, e) {
	if (t === e) return !0;
	const n = Object.keys(t),
		r = Object.keys(e);
	for (const i of n) {
		if (!r.includes(i)) return !1;
		const s = t[i],
			o = e[i];
		if (ga(s) && ga(o)) {
			if (!$t(s, o)) return !1;
		} else if (s !== o) return !1;
	}
	for (const i of r) if (!n.includes(i)) return !1;
	return !0;
}
function ga(t) {
	return t !== null && typeof t == 'object';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hn(t) {
	const e = [];
	for (const [n, r] of Object.entries(t))
		Array.isArray(r)
			? r.forEach((i) => {
					e.push(encodeURIComponent(n) + '=' + encodeURIComponent(i));
				})
			: e.push(encodeURIComponent(n) + '=' + encodeURIComponent(r));
	return e.length ? '&' + e.join('&') : '';
}
function xd(t, e) {
	const n = new Ud(t, e);
	return n.subscribe.bind(n);
}
class Ud {
	constructor(e, n) {
		(this.observers = []),
			(this.unsubscribes = []),
			(this.observerCount = 0),
			(this.task = Promise.resolve()),
			(this.finalized = !1),
			(this.onNoObservers = n),
			this.task
				.then(() => {
					e(this);
				})
				.catch((r) => {
					this.error(r);
				});
	}
	next(e) {
		this.forEachObserver((n) => {
			n.next(e);
		});
	}
	error(e) {
		this.forEachObserver((n) => {
			n.error(e);
		}),
			this.close(e);
	}
	complete() {
		this.forEachObserver((e) => {
			e.complete();
		}),
			this.close();
	}
	subscribe(e, n, r) {
		let i;
		if (e === void 0 && n === void 0 && r === void 0) throw new Error('Missing Observer.');
		Fd(e, ['next', 'error', 'complete']) ? (i = e) : (i = { next: e, error: n, complete: r }),
			i.next === void 0 && (i.next = Fi),
			i.error === void 0 && (i.error = Fi),
			i.complete === void 0 && (i.complete = Fi);
		const s = this.unsubscribeOne.bind(this, this.observers.length);
		return (
			this.finalized &&
				this.task.then(() => {
					try {
						this.finalError ? i.error(this.finalError) : i.complete();
					} catch {}
				}),
			this.observers.push(i),
			s
		);
	}
	unsubscribeOne(e) {
		this.observers === void 0 ||
			this.observers[e] === void 0 ||
			(delete this.observers[e],
			(this.observerCount -= 1),
			this.observerCount === 0 && this.onNoObservers !== void 0 && this.onNoObservers(this));
	}
	forEachObserver(e) {
		if (!this.finalized) for (let n = 0; n < this.observers.length; n++) this.sendOne(n, e);
	}
	sendOne(e, n) {
		this.task.then(() => {
			if (this.observers !== void 0 && this.observers[e] !== void 0)
				try {
					n(this.observers[e]);
				} catch (r) {
					typeof console < 'u' && console.error && console.error(r);
				}
		});
	}
	close(e) {
		this.finalized ||
			((this.finalized = !0),
			e !== void 0 && (this.finalError = e),
			this.task.then(() => {
				(this.observers = void 0), (this.onNoObservers = void 0);
			}));
	}
}
function Fd(t, e) {
	if (typeof t != 'object' || t === null) return !1;
	for (const n of e) if (n in t && typeof t[n] == 'function') return !0;
	return !1;
}
function Fi() {}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function B(t) {
	return t && t._delegate ? t._delegate : t;
}
class nt {
	constructor(e, n, r) {
		(this.name = e),
			(this.instanceFactory = n),
			(this.type = r),
			(this.multipleInstances = !1),
			(this.serviceProps = {}),
			(this.instantiationMode = 'LAZY'),
			(this.onInstanceCreated = null);
	}
	setInstantiationMode(e) {
		return (this.instantiationMode = e), this;
	}
	setMultipleInstances(e) {
		return (this.multipleInstances = e), this;
	}
	setServiceProps(e) {
		return (this.serviceProps = e), this;
	}
	setInstanceCreatedCallback(e) {
		return (this.onInstanceCreated = e), this;
	}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ut = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bd {
	constructor(e, n) {
		(this.name = e),
			(this.container = n),
			(this.component = null),
			(this.instances = new Map()),
			(this.instancesDeferred = new Map()),
			(this.instancesOptions = new Map()),
			(this.onInitCallbacks = new Map());
	}
	get(e) {
		const n = this.normalizeInstanceIdentifier(e);
		if (!this.instancesDeferred.has(n)) {
			const r = new Rd();
			if ((this.instancesDeferred.set(n, r), this.isInitialized(n) || this.shouldAutoInitialize()))
				try {
					const i = this.getOrInitializeService({ instanceIdentifier: n });
					i && r.resolve(i);
				} catch {}
		}
		return this.instancesDeferred.get(n).promise;
	}
	getImmediate(e) {
		var n;
		const r = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier),
			i = (n = e == null ? void 0 : e.optional) !== null && n !== void 0 ? n : !1;
		if (this.isInitialized(r) || this.shouldAutoInitialize())
			try {
				return this.getOrInitializeService({ instanceIdentifier: r });
			} catch (s) {
				if (i) return null;
				throw s;
			}
		else {
			if (i) return null;
			throw Error(`Service ${this.name} is not available`);
		}
	}
	getComponent() {
		return this.component;
	}
	setComponent(e) {
		if (e.name !== this.name)
			throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
		if (this.component) throw Error(`Component for ${this.name} has already been provided`);
		if (((this.component = e), !!this.shouldAutoInitialize())) {
			if (qd(e))
				try {
					this.getOrInitializeService({ instanceIdentifier: ut });
				} catch {}
			for (const [n, r] of this.instancesDeferred.entries()) {
				const i = this.normalizeInstanceIdentifier(n);
				try {
					const s = this.getOrInitializeService({ instanceIdentifier: i });
					r.resolve(s);
				} catch {}
			}
		}
	}
	clearInstance(e = ut) {
		this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
	}
	async delete() {
		const e = Array.from(this.instances.values());
		await Promise.all([
			...e.filter((n) => 'INTERNAL' in n).map((n) => n.INTERNAL.delete()),
			...e.filter((n) => '_delete' in n).map((n) => n._delete())
		]);
	}
	isComponentSet() {
		return this.component != null;
	}
	isInitialized(e = ut) {
		return this.instances.has(e);
	}
	getOptions(e = ut) {
		return this.instancesOptions.get(e) || {};
	}
	initialize(e = {}) {
		const { options: n = {} } = e,
			r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
		if (this.isInitialized(r)) throw Error(`${this.name}(${r}) has already been initialized`);
		if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
		const i = this.getOrInitializeService({ instanceIdentifier: r, options: n });
		for (const [s, o] of this.instancesDeferred.entries()) {
			const a = this.normalizeInstanceIdentifier(s);
			r === a && o.resolve(i);
		}
		return i;
	}
	onInit(e, n) {
		var r;
		const i = this.normalizeInstanceIdentifier(n),
			s = (r = this.onInitCallbacks.get(i)) !== null && r !== void 0 ? r : new Set();
		s.add(e), this.onInitCallbacks.set(i, s);
		const o = this.instances.get(i);
		return (
			o && e(o, i),
			() => {
				s.delete(e);
			}
		);
	}
	invokeOnInitCallbacks(e, n) {
		const r = this.onInitCallbacks.get(n);
		if (r)
			for (const i of r)
				try {
					i(e, n);
				} catch {}
	}
	getOrInitializeService({ instanceIdentifier: e, options: n = {} }) {
		let r = this.instances.get(e);
		if (
			!r &&
			this.component &&
			((r = this.component.instanceFactory(this.container, {
				instanceIdentifier: jd(e),
				options: n
			})),
			this.instances.set(e, r),
			this.instancesOptions.set(e, n),
			this.invokeOnInitCallbacks(r, e),
			this.component.onInstanceCreated)
		)
			try {
				this.component.onInstanceCreated(this.container, e, r);
			} catch {}
		return r || null;
	}
	normalizeInstanceIdentifier(e = ut) {
		return this.component ? (this.component.multipleInstances ? e : ut) : e;
	}
	shouldAutoInitialize() {
		return !!this.component && this.component.instantiationMode !== 'EXPLICIT';
	}
}
function jd(t) {
	return t === ut ? void 0 : t;
}
function qd(t) {
	return t.instantiationMode === 'EAGER';
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $d {
	constructor(e) {
		(this.name = e), (this.providers = new Map());
	}
	addComponent(e) {
		const n = this.getProvider(e.name);
		if (n.isComponentSet())
			throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
		n.setComponent(e);
	}
	addOrOverwriteComponent(e) {
		this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name),
			this.addComponent(e);
	}
	getProvider(e) {
		if (this.providers.has(e)) return this.providers.get(e);
		const n = new Bd(e, this);
		return this.providers.set(e, n), n;
	}
	getProviders() {
		return Array.from(this.providers.values());
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var b;
(function (t) {
	(t[(t.DEBUG = 0)] = 'DEBUG'),
		(t[(t.VERBOSE = 1)] = 'VERBOSE'),
		(t[(t.INFO = 2)] = 'INFO'),
		(t[(t.WARN = 3)] = 'WARN'),
		(t[(t.ERROR = 4)] = 'ERROR'),
		(t[(t.SILENT = 5)] = 'SILENT');
})(b || (b = {}));
const zd = {
		debug: b.DEBUG,
		verbose: b.VERBOSE,
		info: b.INFO,
		warn: b.WARN,
		error: b.ERROR,
		silent: b.SILENT
	},
	Hd = b.INFO,
	Wd = {
		[b.DEBUG]: 'log',
		[b.VERBOSE]: 'log',
		[b.INFO]: 'info',
		[b.WARN]: 'warn',
		[b.ERROR]: 'error'
	},
	Gd = (t, e, ...n) => {
		if (e < t.logLevel) return;
		const r = new Date().toISOString(),
			i = Wd[e];
		if (i) console[i](`[${r}]  ${t.name}:`, ...n);
		else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
	};
class Bs {
	constructor(e) {
		(this.name = e), (this._logLevel = Hd), (this._logHandler = Gd), (this._userLogHandler = null);
	}
	get logLevel() {
		return this._logLevel;
	}
	set logLevel(e) {
		if (!(e in b)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
		this._logLevel = e;
	}
	setLogLevel(e) {
		this._logLevel = typeof e == 'string' ? zd[e] : e;
	}
	get logHandler() {
		return this._logHandler;
	}
	set logHandler(e) {
		if (typeof e != 'function')
			throw new TypeError('Value assigned to `logHandler` must be a function');
		this._logHandler = e;
	}
	get userLogHandler() {
		return this._userLogHandler;
	}
	set userLogHandler(e) {
		this._userLogHandler = e;
	}
	debug(...e) {
		this._userLogHandler && this._userLogHandler(this, b.DEBUG, ...e),
			this._logHandler(this, b.DEBUG, ...e);
	}
	log(...e) {
		this._userLogHandler && this._userLogHandler(this, b.VERBOSE, ...e),
			this._logHandler(this, b.VERBOSE, ...e);
	}
	info(...e) {
		this._userLogHandler && this._userLogHandler(this, b.INFO, ...e),
			this._logHandler(this, b.INFO, ...e);
	}
	warn(...e) {
		this._userLogHandler && this._userLogHandler(this, b.WARN, ...e),
			this._logHandler(this, b.WARN, ...e);
	}
	error(...e) {
		this._userLogHandler && this._userLogHandler(this, b.ERROR, ...e),
			this._logHandler(this, b.ERROR, ...e);
	}
}
const Kd = (t, e) => e.some((n) => t instanceof n);
let _a, ya;
function Qd() {
	return _a || (_a = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Xd() {
	return (
		ya ||
		(ya = [
			IDBCursor.prototype.advance,
			IDBCursor.prototype.continue,
			IDBCursor.prototype.continuePrimaryKey
		])
	);
}
const Yc = new WeakMap(),
	as = new WeakMap(),
	Zc = new WeakMap(),
	Bi = new WeakMap(),
	js = new WeakMap();
function Jd(t) {
	const e = new Promise((n, r) => {
		const i = () => {
				t.removeEventListener('success', s), t.removeEventListener('error', o);
			},
			s = () => {
				n(Ze(t.result)), i();
			},
			o = () => {
				r(t.error), i();
			};
		t.addEventListener('success', s), t.addEventListener('error', o);
	});
	return (
		e
			.then((n) => {
				n instanceof IDBCursor && Yc.set(n, t);
			})
			.catch(() => {}),
		js.set(e, t),
		e
	);
}
function Yd(t) {
	if (as.has(t)) return;
	const e = new Promise((n, r) => {
		const i = () => {
				t.removeEventListener('complete', s),
					t.removeEventListener('error', o),
					t.removeEventListener('abort', o);
			},
			s = () => {
				n(), i();
			},
			o = () => {
				r(t.error || new DOMException('AbortError', 'AbortError')), i();
			};
		t.addEventListener('complete', s),
			t.addEventListener('error', o),
			t.addEventListener('abort', o);
	});
	as.set(t, e);
}
let cs = {
	get(t, e, n) {
		if (t instanceof IDBTransaction) {
			if (e === 'done') return as.get(t);
			if (e === 'objectStoreNames') return t.objectStoreNames || Zc.get(t);
			if (e === 'store')
				return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
		}
		return Ze(t[e]);
	},
	set(t, e, n) {
		return (t[e] = n), !0;
	},
	has(t, e) {
		return t instanceof IDBTransaction && (e === 'done' || e === 'store') ? !0 : e in t;
	}
};
function Zd(t) {
	cs = t(cs);
}
function ef(t) {
	return t === IDBDatabase.prototype.transaction &&
		!('objectStoreNames' in IDBTransaction.prototype)
		? function (e, ...n) {
				const r = t.call(ji(this), e, ...n);
				return Zc.set(r, e.sort ? e.sort() : [e]), Ze(r);
			}
		: Xd().includes(t)
			? function (...e) {
					return t.apply(ji(this), e), Ze(Yc.get(this));
				}
			: function (...e) {
					return Ze(t.apply(ji(this), e));
				};
}
function tf(t) {
	return typeof t == 'function'
		? ef(t)
		: (t instanceof IDBTransaction && Yd(t), Kd(t, Qd()) ? new Proxy(t, cs) : t);
}
function Ze(t) {
	if (t instanceof IDBRequest) return Jd(t);
	if (Bi.has(t)) return Bi.get(t);
	const e = tf(t);
	return e !== t && (Bi.set(t, e), js.set(e, t)), e;
}
const ji = (t) => js.get(t);
function nf(t, e, { blocked: n, upgrade: r, blocking: i, terminated: s } = {}) {
	const o = indexedDB.open(t, e),
		a = Ze(o);
	return (
		r &&
			o.addEventListener('upgradeneeded', (c) => {
				r(Ze(o.result), c.oldVersion, c.newVersion, Ze(o.transaction), c);
			}),
		n && o.addEventListener('blocked', (c) => n(c.oldVersion, c.newVersion, c)),
		a
			.then((c) => {
				s && c.addEventListener('close', () => s()),
					i && c.addEventListener('versionchange', (u) => i(u.oldVersion, u.newVersion, u));
			})
			.catch(() => {}),
		a
	);
}
const rf = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
	sf = ['put', 'add', 'delete', 'clear'],
	qi = new Map();
function va(t, e) {
	if (!(t instanceof IDBDatabase && !(e in t) && typeof e == 'string')) return;
	if (qi.get(e)) return qi.get(e);
	const n = e.replace(/FromIndex$/, ''),
		r = e !== n,
		i = sf.includes(n);
	if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || rf.includes(n))) return;
	const s = async function (o, ...a) {
		const c = this.transaction(o, i ? 'readwrite' : 'readonly');
		let u = c.store;
		return r && (u = u.index(a.shift())), (await Promise.all([u[n](...a), i && c.done]))[0];
	};
	return qi.set(e, s), s;
}
Zd((t) => ({
	...t,
	get: (e, n, r) => va(e, n) || t.get(e, n, r),
	has: (e, n) => !!va(e, n) || t.has(e, n)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class of {
	constructor(e) {
		this.container = e;
	}
	getPlatformInfoString() {
		return this.container
			.getProviders()
			.map((n) => {
				if (af(n)) {
					const r = n.getImmediate();
					return `${r.library}/${r.version}`;
				} else return null;
			})
			.filter((n) => n)
			.join(' ');
	}
}
function af(t) {
	const e = t.getComponent();
	return (e == null ? void 0 : e.type) === 'VERSION';
}
const us = '@firebase/app',
	Ea = '0.9.28';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const vt = new Bs('@firebase/app'),
	cf = '@firebase/app-compat',
	uf = '@firebase/analytics-compat',
	lf = '@firebase/analytics',
	hf = '@firebase/app-check-compat',
	df = '@firebase/app-check',
	ff = '@firebase/auth',
	pf = '@firebase/auth-compat',
	mf = '@firebase/database',
	gf = '@firebase/database-compat',
	_f = '@firebase/functions',
	yf = '@firebase/functions-compat',
	vf = '@firebase/installations',
	Ef = '@firebase/installations-compat',
	Tf = '@firebase/messaging',
	If = '@firebase/messaging-compat',
	wf = '@firebase/performance',
	Af = '@firebase/performance-compat',
	Rf = '@firebase/remote-config',
	Sf = '@firebase/remote-config-compat',
	Pf = '@firebase/storage',
	Cf = '@firebase/storage-compat',
	bf = '@firebase/firestore',
	kf = '@firebase/firestore-compat',
	Df = 'firebase',
	Nf = '10.8.1';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ls = '[DEFAULT]',
	Vf = {
		[us]: 'fire-core',
		[cf]: 'fire-core-compat',
		[lf]: 'fire-analytics',
		[uf]: 'fire-analytics-compat',
		[df]: 'fire-app-check',
		[hf]: 'fire-app-check-compat',
		[ff]: 'fire-auth',
		[pf]: 'fire-auth-compat',
		[mf]: 'fire-rtdb',
		[gf]: 'fire-rtdb-compat',
		[_f]: 'fire-fn',
		[yf]: 'fire-fn-compat',
		[vf]: 'fire-iid',
		[Ef]: 'fire-iid-compat',
		[Tf]: 'fire-fcm',
		[If]: 'fire-fcm-compat',
		[wf]: 'fire-perf',
		[Af]: 'fire-perf-compat',
		[Rf]: 'fire-rc',
		[Sf]: 'fire-rc-compat',
		[Pf]: 'fire-gcs',
		[Cf]: 'fire-gcs-compat',
		[bf]: 'fire-fst',
		[kf]: 'fire-fst-compat',
		'fire-js': 'fire-js',
		[Df]: 'fire-js-all'
	};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Lr = new Map(),
	hs = new Map();
function Of(t, e) {
	try {
		t.container.addComponent(e);
	} catch (n) {
		vt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`, n);
	}
}
function Et(t) {
	const e = t.name;
	if (hs.has(e)) return vt.debug(`There were multiple attempts to register component ${e}.`), !1;
	hs.set(e, t);
	for (const n of Lr.values()) Of(n, t);
	return !0;
}
function ni(t, e) {
	const n = t.container.getProvider('heartbeat').getImmediate({ optional: !0 });
	return n && n.triggerHeartbeat(), t.container.getProvider(e);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Lf = {
		'no-app': "No Firebase App '{$appName}' has been created - call initializeApp() first",
		'bad-app-name': "Illegal App name: '{$appName}",
		'duplicate-app':
			"Firebase App named '{$appName}' already exists with different options or config",
		'app-deleted': "Firebase App named '{$appName}' already deleted",
		'no-options': 'Need to provide options, when not being deployed to hosting via source.',
		'invalid-app-argument':
			'firebase.{$appName}() takes either no argument or a Firebase App instance.',
		'invalid-log-argument': 'First argument to `onLog` must be null or a function.',
		'idb-open': 'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
		'idb-get': 'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
		'idb-set': 'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
		'idb-delete':
			'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.'
	},
	et = new zn('app', 'Firebase', Lf);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mf {
	constructor(e, n, r) {
		(this._isDeleted = !1),
			(this._options = Object.assign({}, e)),
			(this._config = Object.assign({}, n)),
			(this._name = n.name),
			(this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
			(this._container = r),
			this.container.addComponent(new nt('app', () => this, 'PUBLIC'));
	}
	get automaticDataCollectionEnabled() {
		return this.checkDestroyed(), this._automaticDataCollectionEnabled;
	}
	set automaticDataCollectionEnabled(e) {
		this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
	}
	get name() {
		return this.checkDestroyed(), this._name;
	}
	get options() {
		return this.checkDestroyed(), this._options;
	}
	get config() {
		return this.checkDestroyed(), this._config;
	}
	get container() {
		return this._container;
	}
	get isDeleted() {
		return this._isDeleted;
	}
	set isDeleted(e) {
		this._isDeleted = e;
	}
	checkDestroyed() {
		if (this.isDeleted) throw et.create('app-deleted', { appName: this._name });
	}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const St = Nf;
function eu(t, e = {}) {
	let n = t;
	typeof e != 'object' && (e = { name: e });
	const r = Object.assign({ name: ls, automaticDataCollectionEnabled: !1 }, e),
		i = r.name;
	if (typeof i != 'string' || !i) throw et.create('bad-app-name', { appName: String(i) });
	if ((n || (n = Kc()), !n)) throw et.create('no-options');
	const s = Lr.get(i);
	if (s) {
		if ($t(n, s.options) && $t(r, s.config)) return s;
		throw et.create('duplicate-app', { appName: i });
	}
	const o = new $d(i);
	for (const c of hs.values()) o.addComponent(c);
	const a = new Mf(n, r, o);
	return Lr.set(i, a), a;
}
function qs(t = ls) {
	const e = Lr.get(t);
	if (!e && t === ls && Kc()) return eu();
	if (!e) throw et.create('no-app', { appName: t });
	return e;
}
function Ce(t, e, n) {
	var r;
	let i = (r = Vf[t]) !== null && r !== void 0 ? r : t;
	n && (i += `-${n}`);
	const s = i.match(/\s|\//),
		o = e.match(/\s|\//);
	if (s || o) {
		const a = [`Unable to register library "${i}" with version "${e}":`];
		s && a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),
			s && o && a.push('and'),
			o && a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),
			vt.warn(a.join(' '));
		return;
	}
	Et(new nt(`${i}-version`, () => ({ library: i, version: e }), 'VERSION'));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const xf = 'firebase-heartbeat-database',
	Uf = 1,
	Cn = 'firebase-heartbeat-store';
let $i = null;
function tu() {
	return (
		$i ||
			($i = nf(xf, Uf, {
				upgrade: (t, e) => {
					switch (e) {
						case 0:
							try {
								t.createObjectStore(Cn);
							} catch (n) {
								console.warn(n);
							}
					}
				}
			}).catch((t) => {
				throw et.create('idb-open', { originalErrorMessage: t.message });
			})),
		$i
	);
}
async function Ff(t) {
	try {
		const n = (await tu()).transaction(Cn),
			r = await n.objectStore(Cn).get(nu(t));
		return await n.done, r;
	} catch (e) {
		if (e instanceof xe) vt.warn(e.message);
		else {
			const n = et.create('idb-get', { originalErrorMessage: e == null ? void 0 : e.message });
			vt.warn(n.message);
		}
	}
}
async function Ta(t, e) {
	try {
		const r = (await tu()).transaction(Cn, 'readwrite');
		await r.objectStore(Cn).put(e, nu(t)), await r.done;
	} catch (n) {
		if (n instanceof xe) vt.warn(n.message);
		else {
			const r = et.create('idb-set', { originalErrorMessage: n == null ? void 0 : n.message });
			vt.warn(r.message);
		}
	}
}
function nu(t) {
	return `${t.name}!${t.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Bf = 1024,
	jf = 30 * 24 * 60 * 60 * 1e3;
class qf {
	constructor(e) {
		(this.container = e), (this._heartbeatsCache = null);
		const n = this.container.getProvider('app').getImmediate();
		(this._storage = new zf(n)),
			(this._heartbeatsCachePromise = this._storage
				.read()
				.then((r) => ((this._heartbeatsCache = r), r)));
	}
	async triggerHeartbeat() {
		var e, n;
		const i = this.container.getProvider('platform-logger').getImmediate().getPlatformInfoString(),
			s = Ia();
		if (
			!(
				((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null &&
				((this._heartbeatsCache = await this._heartbeatsCachePromise),
				((n = this._heartbeatsCache) === null || n === void 0 ? void 0 : n.heartbeats) == null)
			) &&
			!(
				this._heartbeatsCache.lastSentHeartbeatDate === s ||
				this._heartbeatsCache.heartbeats.some((o) => o.date === s)
			)
		)
			return (
				this._heartbeatsCache.heartbeats.push({ date: s, agent: i }),
				(this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((o) => {
					const a = new Date(o.date).valueOf();
					return Date.now() - a <= jf;
				})),
				this._storage.overwrite(this._heartbeatsCache)
			);
	}
	async getHeartbeatsHeader() {
		var e;
		if (
			(this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
			((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null ||
				this._heartbeatsCache.heartbeats.length === 0)
		)
			return '';
		const n = Ia(),
			{ heartbeatsToSend: r, unsentEntries: i } = $f(this._heartbeatsCache.heartbeats),
			s = Or(JSON.stringify({ version: 2, heartbeats: r }));
		return (
			(this._heartbeatsCache.lastSentHeartbeatDate = n),
			i.length > 0
				? ((this._heartbeatsCache.heartbeats = i),
					await this._storage.overwrite(this._heartbeatsCache))
				: ((this._heartbeatsCache.heartbeats = []), this._storage.overwrite(this._heartbeatsCache)),
			s
		);
	}
}
function Ia() {
	return new Date().toISOString().substring(0, 10);
}
function $f(t, e = Bf) {
	const n = [];
	let r = t.slice();
	for (const i of t) {
		const s = n.find((o) => o.agent === i.agent);
		if (s) {
			if ((s.dates.push(i.date), wa(n) > e)) {
				s.dates.pop();
				break;
			}
		} else if ((n.push({ agent: i.agent, dates: [i.date] }), wa(n) > e)) {
			n.pop();
			break;
		}
		r = r.slice(1);
	}
	return { heartbeatsToSend: n, unsentEntries: r };
}
class zf {
	constructor(e) {
		(this.app = e), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
	}
	async runIndexedDBEnvironmentCheck() {
		return Jc()
			? Nd()
					.then(() => !0)
					.catch(() => !1)
			: !1;
	}
	async read() {
		if (await this._canUseIndexedDBPromise) {
			const n = await Ff(this.app);
			return n != null && n.heartbeats ? n : { heartbeats: [] };
		} else return { heartbeats: [] };
	}
	async overwrite(e) {
		var n;
		if (await this._canUseIndexedDBPromise) {
			const i = await this.read();
			return Ta(this.app, {
				lastSentHeartbeatDate:
					(n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : i.lastSentHeartbeatDate,
				heartbeats: e.heartbeats
			});
		} else return;
	}
	async add(e) {
		var n;
		if (await this._canUseIndexedDBPromise) {
			const i = await this.read();
			return Ta(this.app, {
				lastSentHeartbeatDate:
					(n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : i.lastSentHeartbeatDate,
				heartbeats: [...i.heartbeats, ...e.heartbeats]
			});
		} else return;
	}
}
function wa(t) {
	return Or(JSON.stringify({ version: 2, heartbeats: t })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hf(t) {
	Et(new nt('platform-logger', (e) => new of(e), 'PRIVATE')),
		Et(new nt('heartbeat', (e) => new qf(e), 'PRIVATE')),
		Ce(us, Ea, t),
		Ce(us, Ea, 'esm2017'),
		Ce('fire-js', '');
}
Hf('');
var Wf = 'firebase',
	Gf = '10.8.1';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Ce(Wf, Gf, 'app');
function $s(t, e) {
	var n = {};
	for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
	if (t != null && typeof Object.getOwnPropertySymbols == 'function')
		for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
			e.indexOf(r[i]) < 0 &&
				Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
				(n[r[i]] = t[r[i]]);
	return n;
}
function ru() {
	return {
		'dependent-sdk-initialized-before-auth':
			'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.'
	};
}
const Kf = ru,
	iu = new zn('auth', 'Firebase', ru());
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Mr = new Bs('@firebase/auth');
function Qf(t, ...e) {
	Mr.logLevel <= b.WARN && Mr.warn(`Auth (${St}): ${t}`, ...e);
}
function Rr(t, ...e) {
	Mr.logLevel <= b.ERROR && Mr.error(`Auth (${St}): ${t}`, ...e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Oe(t, ...e) {
	throw zs(t, ...e);
}
function be(t, ...e) {
	return zs(t, ...e);
}
function su(t, e, n) {
	const r = Object.assign(Object.assign({}, Kf()), { [e]: n });
	return new zn('auth', 'Firebase', r).create(e, { appName: t.name });
}
function Xf(t, e, n) {
	const r = n;
	if (!(e instanceof r))
		throw (
			(r.name !== e.constructor.name && Oe(t, 'argument-error'),
			su(
				t,
				'argument-error',
				`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
			))
		);
}
function zs(t, ...e) {
	if (typeof t != 'string') {
		const n = e[0],
			r = [...e.slice(1)];
		return r[0] && (r[0].appName = t.name), t._errorFactory.create(n, ...r);
	}
	return iu.create(t, ...e);
}
function S(t, e, ...n) {
	if (!t) throw zs(e, ...n);
}
function Fe(t) {
	const e = 'INTERNAL ASSERTION FAILED: ' + t;
	throw (Rr(e), new Error(e));
}
function qe(t, e) {
	t || Fe(e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ds() {
	var t;
	return (
		(typeof self < 'u' && ((t = self.location) === null || t === void 0 ? void 0 : t.href)) || ''
	);
}
function Jf() {
	return Aa() === 'http:' || Aa() === 'https:';
}
function Aa() {
	var t;
	return (
		(typeof self < 'u' && ((t = self.location) === null || t === void 0 ? void 0 : t.protocol)) ||
		null
	);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Yf() {
	return typeof navigator < 'u' &&
		navigator &&
		'onLine' in navigator &&
		typeof navigator.onLine == 'boolean' &&
		(Jf() || Cd() || 'connection' in navigator)
		? navigator.onLine
		: !0;
}
function Zf() {
	if (typeof navigator > 'u') return null;
	const t = navigator;
	return (t.languages && t.languages[0]) || t.language || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wn {
	constructor(e, n) {
		(this.shortDelay = e),
			(this.longDelay = n),
			qe(n > e, 'Short delay should be less than long delay!'),
			(this.isMobile = Sd() || bd());
	}
	get() {
		return Yf()
			? this.isMobile
				? this.longDelay
				: this.shortDelay
			: Math.min(5e3, this.shortDelay);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hs(t, e) {
	qe(t.emulator, 'Emulator should always be set here');
	const { url: n } = t.emulator;
	return e ? `${n}${e.startsWith('/') ? e.slice(1) : e}` : n;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ou {
	static initialize(e, n, r) {
		(this.fetchImpl = e), n && (this.headersImpl = n), r && (this.responseImpl = r);
	}
	static fetch() {
		if (this.fetchImpl) return this.fetchImpl;
		if (typeof self < 'u' && 'fetch' in self) return self.fetch;
		if (typeof globalThis < 'u' && globalThis.fetch) return globalThis.fetch;
		if (typeof fetch < 'u') return fetch;
		Fe(
			'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
		);
	}
	static headers() {
		if (this.headersImpl) return this.headersImpl;
		if (typeof self < 'u' && 'Headers' in self) return self.Headers;
		if (typeof globalThis < 'u' && globalThis.Headers) return globalThis.Headers;
		if (typeof Headers < 'u') return Headers;
		Fe(
			'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
		);
	}
	static response() {
		if (this.responseImpl) return this.responseImpl;
		if (typeof self < 'u' && 'Response' in self) return self.Response;
		if (typeof globalThis < 'u' && globalThis.Response) return globalThis.Response;
		if (typeof Response < 'u') return Response;
		Fe(
			'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
		);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ep = {
	CREDENTIAL_MISMATCH: 'custom-token-mismatch',
	MISSING_CUSTOM_TOKEN: 'internal-error',
	INVALID_IDENTIFIER: 'invalid-email',
	MISSING_CONTINUE_URI: 'internal-error',
	INVALID_PASSWORD: 'wrong-password',
	MISSING_PASSWORD: 'missing-password',
	INVALID_LOGIN_CREDENTIALS: 'invalid-credential',
	EMAIL_EXISTS: 'email-already-in-use',
	PASSWORD_LOGIN_DISABLED: 'operation-not-allowed',
	INVALID_IDP_RESPONSE: 'invalid-credential',
	INVALID_PENDING_TOKEN: 'invalid-credential',
	FEDERATED_USER_ID_ALREADY_LINKED: 'credential-already-in-use',
	MISSING_REQ_TYPE: 'internal-error',
	EMAIL_NOT_FOUND: 'user-not-found',
	RESET_PASSWORD_EXCEED_LIMIT: 'too-many-requests',
	EXPIRED_OOB_CODE: 'expired-action-code',
	INVALID_OOB_CODE: 'invalid-action-code',
	MISSING_OOB_CODE: 'internal-error',
	CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'requires-recent-login',
	INVALID_ID_TOKEN: 'invalid-user-token',
	TOKEN_EXPIRED: 'user-token-expired',
	USER_NOT_FOUND: 'user-token-expired',
	TOO_MANY_ATTEMPTS_TRY_LATER: 'too-many-requests',
	PASSWORD_DOES_NOT_MEET_REQUIREMENTS: 'password-does-not-meet-requirements',
	INVALID_CODE: 'invalid-verification-code',
	INVALID_SESSION_INFO: 'invalid-verification-id',
	INVALID_TEMPORARY_PROOF: 'invalid-credential',
	MISSING_SESSION_INFO: 'missing-verification-id',
	SESSION_EXPIRED: 'code-expired',
	MISSING_ANDROID_PACKAGE_NAME: 'missing-android-pkg-name',
	UNAUTHORIZED_DOMAIN: 'unauthorized-continue-uri',
	INVALID_OAUTH_CLIENT_ID: 'invalid-oauth-client-id',
	ADMIN_ONLY_OPERATION: 'admin-restricted-operation',
	INVALID_MFA_PENDING_CREDENTIAL: 'invalid-multi-factor-session',
	MFA_ENROLLMENT_NOT_FOUND: 'multi-factor-info-not-found',
	MISSING_MFA_ENROLLMENT_ID: 'missing-multi-factor-info',
	MISSING_MFA_PENDING_CREDENTIAL: 'missing-multi-factor-session',
	SECOND_FACTOR_EXISTS: 'second-factor-already-in-use',
	SECOND_FACTOR_LIMIT_EXCEEDED: 'maximum-second-factor-count-exceeded',
	BLOCKING_FUNCTION_ERROR_RESPONSE: 'internal-error',
	RECAPTCHA_NOT_ENABLED: 'recaptcha-not-enabled',
	MISSING_RECAPTCHA_TOKEN: 'missing-recaptcha-token',
	INVALID_RECAPTCHA_TOKEN: 'invalid-recaptcha-token',
	INVALID_RECAPTCHA_ACTION: 'invalid-recaptcha-action',
	MISSING_CLIENT_TYPE: 'missing-client-type',
	MISSING_RECAPTCHA_VERSION: 'missing-recaptcha-version',
	INVALID_RECAPTCHA_VERSION: 'invalid-recaptcha-version',
	INVALID_REQ_TYPE: 'invalid-req-type'
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const tp = new Wn(3e4, 6e4);
function Ws(t, e) {
	return t.tenantId && !e.tenantId
		? Object.assign(Object.assign({}, e), { tenantId: t.tenantId })
		: e;
}
async function tn(t, e, n, r, i = {}) {
	return au(t, i, async () => {
		let s = {},
			o = {};
		r && (e === 'GET' ? (o = r) : (s = { body: JSON.stringify(r) }));
		const a = Hn(Object.assign({ key: t.config.apiKey }, o)).slice(1),
			c = await t._getAdditionalHeaders();
		return (
			(c['Content-Type'] = 'application/json'),
			t.languageCode && (c['X-Firebase-Locale'] = t.languageCode),
			ou.fetch()(
				cu(t, t.config.apiHost, n, a),
				Object.assign({ method: e, headers: c, referrerPolicy: 'no-referrer' }, s)
			)
		);
	});
}
async function au(t, e, n) {
	t._canInitEmulator = !1;
	const r = Object.assign(Object.assign({}, ep), e);
	try {
		const i = new rp(t),
			s = await Promise.race([n(), i.promise]);
		i.clearNetworkTimeout();
		const o = await s.json();
		if ('needConfirmation' in o) throw pr(t, 'account-exists-with-different-credential', o);
		if (s.ok && !('errorMessage' in o)) return o;
		{
			const a = s.ok ? o.errorMessage : o.error.message,
				[c, u] = a.split(' : ');
			if (c === 'FEDERATED_USER_ID_ALREADY_LINKED') throw pr(t, 'credential-already-in-use', o);
			if (c === 'EMAIL_EXISTS') throw pr(t, 'email-already-in-use', o);
			if (c === 'USER_DISABLED') throw pr(t, 'user-disabled', o);
			const l = r[c] || c.toLowerCase().replace(/[_\s]+/g, '-');
			if (u) throw su(t, l, u);
			Oe(t, l);
		}
	} catch (i) {
		if (i instanceof xe) throw i;
		Oe(t, 'network-request-failed', { message: String(i) });
	}
}
async function np(t, e, n, r, i = {}) {
	const s = await tn(t, e, n, r, i);
	return (
		'mfaPendingCredential' in s && Oe(t, 'multi-factor-auth-required', { _serverResponse: s }), s
	);
}
function cu(t, e, n, r) {
	const i = `${e}${n}?${r}`;
	return t.config.emulator ? Hs(t.config, i) : `${t.config.apiScheme}://${i}`;
}
class rp {
	constructor(e) {
		(this.auth = e),
			(this.timer = null),
			(this.promise = new Promise((n, r) => {
				this.timer = setTimeout(() => r(be(this.auth, 'network-request-failed')), tp.get());
			}));
	}
	clearNetworkTimeout() {
		clearTimeout(this.timer);
	}
}
function pr(t, e, n) {
	const r = { appName: t.name };
	n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber);
	const i = be(t, e, r);
	return (i.customData._tokenResponse = n), i;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ip(t, e) {
	return tn(t, 'POST', '/v1/accounts:delete', e);
}
async function sp(t, e) {
	return tn(t, 'POST', '/v1/accounts:lookup', e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function En(t) {
	if (t)
		try {
			const e = new Date(Number(t));
			if (!isNaN(e.getTime())) return e.toUTCString();
		} catch {}
}
async function op(t, e = !1) {
	const n = B(t),
		r = await n.getIdToken(e),
		i = Gs(r);
	S(i && i.exp && i.auth_time && i.iat, n.auth, 'internal-error');
	const s = typeof i.firebase == 'object' ? i.firebase : void 0,
		o = s == null ? void 0 : s.sign_in_provider;
	return {
		claims: i,
		token: r,
		authTime: En(zi(i.auth_time)),
		issuedAtTime: En(zi(i.iat)),
		expirationTime: En(zi(i.exp)),
		signInProvider: o || null,
		signInSecondFactor: (s == null ? void 0 : s.sign_in_second_factor) || null
	};
}
function zi(t) {
	return Number(t) * 1e3;
}
function Gs(t) {
	const [e, n, r] = t.split('.');
	if (e === void 0 || n === void 0 || r === void 0)
		return Rr('JWT malformed, contained fewer than 3 sections'), null;
	try {
		const i = Hc(n);
		return i ? JSON.parse(i) : (Rr('Failed to decode base64 JWT payload'), null);
	} catch (i) {
		return Rr('Caught error parsing JWT payload as JSON', i == null ? void 0 : i.toString()), null;
	}
}
function ap(t) {
	const e = Gs(t);
	return (
		S(e, 'internal-error'),
		S(typeof e.exp < 'u', 'internal-error'),
		S(typeof e.iat < 'u', 'internal-error'),
		Number(e.exp) - Number(e.iat)
	);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function bn(t, e, n = !1) {
	if (n) return e;
	try {
		return await e;
	} catch (r) {
		throw (r instanceof xe && cp(r) && t.auth.currentUser === t && (await t.auth.signOut()), r);
	}
}
function cp({ code: t }) {
	return t === 'auth/user-disabled' || t === 'auth/user-token-expired';
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class up {
	constructor(e) {
		(this.user = e), (this.isRunning = !1), (this.timerId = null), (this.errorBackoff = 3e4);
	}
	_start() {
		this.isRunning || ((this.isRunning = !0), this.schedule());
	}
	_stop() {
		this.isRunning && ((this.isRunning = !1), this.timerId !== null && clearTimeout(this.timerId));
	}
	getInterval(e) {
		var n;
		if (e) {
			const r = this.errorBackoff;
			return (this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4)), r;
		} else {
			this.errorBackoff = 3e4;
			const i =
				((n = this.user.stsTokenManager.expirationTime) !== null && n !== void 0 ? n : 0) -
				Date.now() -
				3e5;
			return Math.max(0, i);
		}
	}
	schedule(e = !1) {
		if (!this.isRunning) return;
		const n = this.getInterval(e);
		this.timerId = setTimeout(async () => {
			await this.iteration();
		}, n);
	}
	async iteration() {
		try {
			await this.user.getIdToken(!0);
		} catch (e) {
			(e == null ? void 0 : e.code) === 'auth/network-request-failed' && this.schedule(!0);
			return;
		}
		this.schedule();
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uu {
	constructor(e, n) {
		(this.createdAt = e), (this.lastLoginAt = n), this._initializeTime();
	}
	_initializeTime() {
		(this.lastSignInTime = En(this.lastLoginAt)), (this.creationTime = En(this.createdAt));
	}
	_copy(e) {
		(this.createdAt = e.createdAt), (this.lastLoginAt = e.lastLoginAt), this._initializeTime();
	}
	toJSON() {
		return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
	}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function xr(t) {
	var e;
	const n = t.auth,
		r = await t.getIdToken(),
		i = await bn(t, sp(n, { idToken: r }));
	S(i == null ? void 0 : i.users.length, n, 'internal-error');
	const s = i.users[0];
	t._notifyReloadListener(s);
	const o =
			!((e = s.providerUserInfo) === null || e === void 0) && e.length
				? dp(s.providerUserInfo)
				: [],
		a = hp(t.providerData, o),
		c = t.isAnonymous,
		u = !(t.email && s.passwordHash) && !(a != null && a.length),
		l = c ? u : !1,
		h = {
			uid: s.localId,
			displayName: s.displayName || null,
			photoURL: s.photoUrl || null,
			email: s.email || null,
			emailVerified: s.emailVerified || !1,
			phoneNumber: s.phoneNumber || null,
			tenantId: s.tenantId || null,
			providerData: a,
			metadata: new uu(s.createdAt, s.lastLoginAt),
			isAnonymous: l
		};
	Object.assign(t, h);
}
async function lp(t) {
	const e = B(t);
	await xr(e), await e.auth._persistUserIfCurrent(e), e.auth._notifyListenersIfCurrent(e);
}
function hp(t, e) {
	return [...t.filter((r) => !e.some((i) => i.providerId === r.providerId)), ...e];
}
function dp(t) {
	return t.map((e) => {
		var { providerId: n } = e,
			r = $s(e, ['providerId']);
		return {
			providerId: n,
			uid: r.rawId || '',
			displayName: r.displayName || null,
			email: r.email || null,
			phoneNumber: r.phoneNumber || null,
			photoURL: r.photoUrl || null
		};
	});
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function fp(t, e) {
	const n = await au(t, {}, async () => {
		const r = Hn({ grant_type: 'refresh_token', refresh_token: e }).slice(1),
			{ tokenApiHost: i, apiKey: s } = t.config,
			o = cu(t, i, '/v1/token', `key=${s}`),
			a = await t._getAdditionalHeaders();
		return (
			(a['Content-Type'] = 'application/x-www-form-urlencoded'),
			ou.fetch()(o, { method: 'POST', headers: a, body: r })
		);
	});
	return { accessToken: n.access_token, expiresIn: n.expires_in, refreshToken: n.refresh_token };
}
async function pp(t, e) {
	return tn(t, 'POST', '/v2/accounts:revokeToken', Ws(t, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class kn {
	constructor() {
		(this.refreshToken = null), (this.accessToken = null), (this.expirationTime = null);
	}
	get isExpired() {
		return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
	}
	updateFromServerResponse(e) {
		S(e.idToken, 'internal-error'),
			S(typeof e.idToken < 'u', 'internal-error'),
			S(typeof e.refreshToken < 'u', 'internal-error');
		const n = 'expiresIn' in e && typeof e.expiresIn < 'u' ? Number(e.expiresIn) : ap(e.idToken);
		this.updateTokensAndExpiration(e.idToken, e.refreshToken, n);
	}
	async getToken(e, n = !1) {
		return (
			S(!this.accessToken || this.refreshToken, e, 'user-token-expired'),
			!n && this.accessToken && !this.isExpired
				? this.accessToken
				: this.refreshToken
					? (await this.refresh(e, this.refreshToken), this.accessToken)
					: null
		);
	}
	clearRefreshToken() {
		this.refreshToken = null;
	}
	async refresh(e, n) {
		const { accessToken: r, refreshToken: i, expiresIn: s } = await fp(e, n);
		this.updateTokensAndExpiration(r, i, Number(s));
	}
	updateTokensAndExpiration(e, n, r) {
		(this.refreshToken = n || null),
			(this.accessToken = e || null),
			(this.expirationTime = Date.now() + r * 1e3);
	}
	static fromJSON(e, n) {
		const { refreshToken: r, accessToken: i, expirationTime: s } = n,
			o = new kn();
		return (
			r && (S(typeof r == 'string', 'internal-error', { appName: e }), (o.refreshToken = r)),
			i && (S(typeof i == 'string', 'internal-error', { appName: e }), (o.accessToken = i)),
			s && (S(typeof s == 'number', 'internal-error', { appName: e }), (o.expirationTime = s)),
			o
		);
	}
	toJSON() {
		return {
			refreshToken: this.refreshToken,
			accessToken: this.accessToken,
			expirationTime: this.expirationTime
		};
	}
	_assign(e) {
		(this.accessToken = e.accessToken),
			(this.refreshToken = e.refreshToken),
			(this.expirationTime = e.expirationTime);
	}
	_clone() {
		return Object.assign(new kn(), this.toJSON());
	}
	_performRefresh() {
		return Fe('not implemented');
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function We(t, e) {
	S(typeof t == 'string' || typeof t > 'u', 'internal-error', { appName: e });
}
class gt {
	constructor(e) {
		var { uid: n, auth: r, stsTokenManager: i } = e,
			s = $s(e, ['uid', 'auth', 'stsTokenManager']);
		(this.providerId = 'firebase'),
			(this.proactiveRefresh = new up(this)),
			(this.reloadUserInfo = null),
			(this.reloadListener = null),
			(this.uid = n),
			(this.auth = r),
			(this.stsTokenManager = i),
			(this.accessToken = i.accessToken),
			(this.displayName = s.displayName || null),
			(this.email = s.email || null),
			(this.emailVerified = s.emailVerified || !1),
			(this.phoneNumber = s.phoneNumber || null),
			(this.photoURL = s.photoURL || null),
			(this.isAnonymous = s.isAnonymous || !1),
			(this.tenantId = s.tenantId || null),
			(this.providerData = s.providerData ? [...s.providerData] : []),
			(this.metadata = new uu(s.createdAt || void 0, s.lastLoginAt || void 0));
	}
	async getIdToken(e) {
		const n = await bn(this, this.stsTokenManager.getToken(this.auth, e));
		return (
			S(n, this.auth, 'internal-error'),
			this.accessToken !== n &&
				((this.accessToken = n),
				await this.auth._persistUserIfCurrent(this),
				this.auth._notifyListenersIfCurrent(this)),
			n
		);
	}
	getIdTokenResult(e) {
		return op(this, e);
	}
	reload() {
		return lp(this);
	}
	_assign(e) {
		this !== e &&
			(S(this.uid === e.uid, this.auth, 'internal-error'),
			(this.displayName = e.displayName),
			(this.photoURL = e.photoURL),
			(this.email = e.email),
			(this.emailVerified = e.emailVerified),
			(this.phoneNumber = e.phoneNumber),
			(this.isAnonymous = e.isAnonymous),
			(this.tenantId = e.tenantId),
			(this.providerData = e.providerData.map((n) => Object.assign({}, n))),
			this.metadata._copy(e.metadata),
			this.stsTokenManager._assign(e.stsTokenManager));
	}
	_clone(e) {
		const n = new gt(
			Object.assign(Object.assign({}, this), {
				auth: e,
				stsTokenManager: this.stsTokenManager._clone()
			})
		);
		return n.metadata._copy(this.metadata), n;
	}
	_onReload(e) {
		S(!this.reloadListener, this.auth, 'internal-error'),
			(this.reloadListener = e),
			this.reloadUserInfo &&
				(this._notifyReloadListener(this.reloadUserInfo), (this.reloadUserInfo = null));
	}
	_notifyReloadListener(e) {
		this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
	}
	_startProactiveRefresh() {
		this.proactiveRefresh._start();
	}
	_stopProactiveRefresh() {
		this.proactiveRefresh._stop();
	}
	async _updateTokensIfNecessary(e, n = !1) {
		let r = !1;
		e.idToken &&
			e.idToken !== this.stsTokenManager.accessToken &&
			(this.stsTokenManager.updateFromServerResponse(e), (r = !0)),
			n && (await xr(this)),
			await this.auth._persistUserIfCurrent(this),
			r && this.auth._notifyListenersIfCurrent(this);
	}
	async delete() {
		const e = await this.getIdToken();
		return (
			await bn(this, ip(this.auth, { idToken: e })),
			this.stsTokenManager.clearRefreshToken(),
			this.auth.signOut()
		);
	}
	toJSON() {
		return Object.assign(
			Object.assign(
				{
					uid: this.uid,
					email: this.email || void 0,
					emailVerified: this.emailVerified,
					displayName: this.displayName || void 0,
					isAnonymous: this.isAnonymous,
					photoURL: this.photoURL || void 0,
					phoneNumber: this.phoneNumber || void 0,
					tenantId: this.tenantId || void 0,
					providerData: this.providerData.map((e) => Object.assign({}, e)),
					stsTokenManager: this.stsTokenManager.toJSON(),
					_redirectEventId: this._redirectEventId
				},
				this.metadata.toJSON()
			),
			{ apiKey: this.auth.config.apiKey, appName: this.auth.name }
		);
	}
	get refreshToken() {
		return this.stsTokenManager.refreshToken || '';
	}
	static _fromJSON(e, n) {
		var r, i, s, o, a, c, u, l;
		const h = (r = n.displayName) !== null && r !== void 0 ? r : void 0,
			d = (i = n.email) !== null && i !== void 0 ? i : void 0,
			f = (s = n.phoneNumber) !== null && s !== void 0 ? s : void 0,
			E = (o = n.photoURL) !== null && o !== void 0 ? o : void 0,
			I = (a = n.tenantId) !== null && a !== void 0 ? a : void 0,
			v = (c = n._redirectEventId) !== null && c !== void 0 ? c : void 0,
			k = (u = n.createdAt) !== null && u !== void 0 ? u : void 0,
			O = (l = n.lastLoginAt) !== null && l !== void 0 ? l : void 0,
			{ uid: L, emailVerified: M, isAnonymous: Ee, providerData: fe, stsTokenManager: Ue } = n;
		S(L && Ue, e, 'internal-error');
		const Nt = kn.fromJSON(this.name, Ue);
		S(typeof L == 'string', e, 'internal-error'),
			We(h, e.name),
			We(d, e.name),
			S(typeof M == 'boolean', e, 'internal-error'),
			S(typeof Ee == 'boolean', e, 'internal-error'),
			We(f, e.name),
			We(E, e.name),
			We(I, e.name),
			We(v, e.name),
			We(k, e.name),
			We(O, e.name);
		const un = new gt({
			uid: L,
			auth: e,
			email: d,
			emailVerified: M,
			displayName: h,
			isAnonymous: Ee,
			photoURL: E,
			phoneNumber: f,
			tenantId: I,
			stsTokenManager: Nt,
			createdAt: k,
			lastLoginAt: O
		});
		return (
			fe && Array.isArray(fe) && (un.providerData = fe.map((fr) => Object.assign({}, fr))),
			v && (un._redirectEventId = v),
			un
		);
	}
	static async _fromIdTokenResponse(e, n, r = !1) {
		const i = new kn();
		i.updateFromServerResponse(n);
		const s = new gt({ uid: n.localId, auth: e, stsTokenManager: i, isAnonymous: r });
		return await xr(s), s;
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ra = new Map();
function Be(t) {
	qe(t instanceof Function, 'Expected a class definition');
	let e = Ra.get(t);
	return e
		? (qe(e instanceof t, 'Instance stored in cache mismatched with class'), e)
		: ((e = new t()), Ra.set(t, e), e);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lu {
	constructor() {
		(this.type = 'NONE'), (this.storage = {});
	}
	async _isAvailable() {
		return !0;
	}
	async _set(e, n) {
		this.storage[e] = n;
	}
	async _get(e) {
		const n = this.storage[e];
		return n === void 0 ? null : n;
	}
	async _remove(e) {
		delete this.storage[e];
	}
	_addListener(e, n) {}
	_removeListener(e, n) {}
}
lu.type = 'NONE';
const Sa = lu;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Sr(t, e, n) {
	return `firebase:${t}:${e}:${n}`;
}
class Ut {
	constructor(e, n, r) {
		(this.persistence = e), (this.auth = n), (this.userKey = r);
		const { config: i, name: s } = this.auth;
		(this.fullUserKey = Sr(this.userKey, i.apiKey, s)),
			(this.fullPersistenceKey = Sr('persistence', i.apiKey, s)),
			(this.boundEventHandler = n._onStorageEvent.bind(n)),
			this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
	}
	setCurrentUser(e) {
		return this.persistence._set(this.fullUserKey, e.toJSON());
	}
	async getCurrentUser() {
		const e = await this.persistence._get(this.fullUserKey);
		return e ? gt._fromJSON(this.auth, e) : null;
	}
	removeCurrentUser() {
		return this.persistence._remove(this.fullUserKey);
	}
	savePersistenceForRedirect() {
		return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
	}
	async setPersistence(e) {
		if (this.persistence === e) return;
		const n = await this.getCurrentUser();
		if ((await this.removeCurrentUser(), (this.persistence = e), n)) return this.setCurrentUser(n);
	}
	delete() {
		this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
	}
	static async create(e, n, r = 'authUser') {
		if (!n.length) return new Ut(Be(Sa), e, r);
		const i = (
			await Promise.all(
				n.map(async (u) => {
					if (await u._isAvailable()) return u;
				})
			)
		).filter((u) => u);
		let s = i[0] || Be(Sa);
		const o = Sr(r, e.config.apiKey, e.name);
		let a = null;
		for (const u of n)
			try {
				const l = await u._get(o);
				if (l) {
					const h = gt._fromJSON(e, l);
					u !== s && (a = h), (s = u);
					break;
				}
			} catch {}
		const c = i.filter((u) => u._shouldAllowMigration);
		return !s._shouldAllowMigration || !c.length
			? new Ut(s, e, r)
			: ((s = c[0]),
				a && (await s._set(o, a.toJSON())),
				await Promise.all(
					n.map(async (u) => {
						if (u !== s)
							try {
								await u._remove(o);
							} catch {}
					})
				),
				new Ut(s, e, r));
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Pa(t) {
	const e = t.toLowerCase();
	if (e.includes('opera/') || e.includes('opr/') || e.includes('opios/')) return 'Opera';
	if (fu(e)) return 'IEMobile';
	if (e.includes('msie') || e.includes('trident/')) return 'IE';
	if (e.includes('edge/')) return 'Edge';
	if (hu(e)) return 'Firefox';
	if (e.includes('silk/')) return 'Silk';
	if (mu(e)) return 'Blackberry';
	if (gu(e)) return 'Webos';
	if (Ks(e)) return 'Safari';
	if ((e.includes('chrome/') || du(e)) && !e.includes('edge/')) return 'Chrome';
	if (pu(e)) return 'Android';
	{
		const n = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
			r = t.match(n);
		if ((r == null ? void 0 : r.length) === 2) return r[1];
	}
	return 'Other';
}
function hu(t = K()) {
	return /firefox\//i.test(t);
}
function Ks(t = K()) {
	const e = t.toLowerCase();
	return (
		e.includes('safari/') &&
		!e.includes('chrome/') &&
		!e.includes('crios/') &&
		!e.includes('android')
	);
}
function du(t = K()) {
	return /crios\//i.test(t);
}
function fu(t = K()) {
	return /iemobile/i.test(t);
}
function pu(t = K()) {
	return /android/i.test(t);
}
function mu(t = K()) {
	return /blackberry/i.test(t);
}
function gu(t = K()) {
	return /webos/i.test(t);
}
function ri(t = K()) {
	return /iphone|ipad|ipod/i.test(t) || (/macintosh/i.test(t) && /mobile/i.test(t));
}
function mp(t = K()) {
	var e;
	return ri(t) && !!(!((e = window.navigator) === null || e === void 0) && e.standalone);
}
function gp() {
	return kd() && document.documentMode === 10;
}
function _u(t = K()) {
	return ri(t) || pu(t) || gu(t) || mu(t) || /windows phone/i.test(t) || fu(t);
}
function _p() {
	try {
		return !!(window && window !== window.top);
	} catch {
		return !1;
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function yu(t, e = []) {
	let n;
	switch (t) {
		case 'Browser':
			n = Pa(K());
			break;
		case 'Worker':
			n = `${Pa(K())}-${t}`;
			break;
		default:
			n = t;
	}
	const r = e.length ? e.join(',') : 'FirebaseCore-web';
	return `${n}/JsCore/${St}/${r}`;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yp {
	constructor(e) {
		(this.auth = e), (this.queue = []);
	}
	pushCallback(e, n) {
		const r = (s) =>
			new Promise((o, a) => {
				try {
					const c = e(s);
					o(c);
				} catch (c) {
					a(c);
				}
			});
		(r.onAbort = n), this.queue.push(r);
		const i = this.queue.length - 1;
		return () => {
			this.queue[i] = () => Promise.resolve();
		};
	}
	async runMiddleware(e) {
		if (this.auth.currentUser === e) return;
		const n = [];
		try {
			for (const r of this.queue) await r(e), r.onAbort && n.push(r.onAbort);
		} catch (r) {
			n.reverse();
			for (const i of n)
				try {
					i();
				} catch {}
			throw this.auth._errorFactory.create('login-blocked', {
				originalMessage: r == null ? void 0 : r.message
			});
		}
	}
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function vp(t, e = {}) {
	return tn(t, 'GET', '/v2/passwordPolicy', Ws(t, e));
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ep = 6;
class Tp {
	constructor(e) {
		var n, r, i, s;
		const o = e.customStrengthOptions;
		(this.customStrengthOptions = {}),
			(this.customStrengthOptions.minPasswordLength =
				(n = o.minPasswordLength) !== null && n !== void 0 ? n : Ep),
			o.maxPasswordLength && (this.customStrengthOptions.maxPasswordLength = o.maxPasswordLength),
			o.containsLowercaseCharacter !== void 0 &&
				(this.customStrengthOptions.containsLowercaseLetter = o.containsLowercaseCharacter),
			o.containsUppercaseCharacter !== void 0 &&
				(this.customStrengthOptions.containsUppercaseLetter = o.containsUppercaseCharacter),
			o.containsNumericCharacter !== void 0 &&
				(this.customStrengthOptions.containsNumericCharacter = o.containsNumericCharacter),
			o.containsNonAlphanumericCharacter !== void 0 &&
				(this.customStrengthOptions.containsNonAlphanumericCharacter =
					o.containsNonAlphanumericCharacter),
			(this.enforcementState = e.enforcementState),
			this.enforcementState === 'ENFORCEMENT_STATE_UNSPECIFIED' && (this.enforcementState = 'OFF'),
			(this.allowedNonAlphanumericCharacters =
				(i =
					(r = e.allowedNonAlphanumericCharacters) === null || r === void 0
						? void 0
						: r.join('')) !== null && i !== void 0
					? i
					: ''),
			(this.forceUpgradeOnSignin = (s = e.forceUpgradeOnSignin) !== null && s !== void 0 ? s : !1),
			(this.schemaVersion = e.schemaVersion);
	}
	validatePassword(e) {
		var n, r, i, s, o, a;
		const c = { isValid: !0, passwordPolicy: this };
		return (
			this.validatePasswordLengthOptions(e, c),
			this.validatePasswordCharacterOptions(e, c),
			c.isValid && (c.isValid = (n = c.meetsMinPasswordLength) !== null && n !== void 0 ? n : !0),
			c.isValid && (c.isValid = (r = c.meetsMaxPasswordLength) !== null && r !== void 0 ? r : !0),
			c.isValid && (c.isValid = (i = c.containsLowercaseLetter) !== null && i !== void 0 ? i : !0),
			c.isValid && (c.isValid = (s = c.containsUppercaseLetter) !== null && s !== void 0 ? s : !0),
			c.isValid && (c.isValid = (o = c.containsNumericCharacter) !== null && o !== void 0 ? o : !0),
			c.isValid &&
				(c.isValid = (a = c.containsNonAlphanumericCharacter) !== null && a !== void 0 ? a : !0),
			c
		);
	}
	validatePasswordLengthOptions(e, n) {
		const r = this.customStrengthOptions.minPasswordLength,
			i = this.customStrengthOptions.maxPasswordLength;
		r && (n.meetsMinPasswordLength = e.length >= r),
			i && (n.meetsMaxPasswordLength = e.length <= i);
	}
	validatePasswordCharacterOptions(e, n) {
		this.updatePasswordCharacterOptionsStatuses(n, !1, !1, !1, !1);
		let r;
		for (let i = 0; i < e.length; i++)
			(r = e.charAt(i)),
				this.updatePasswordCharacterOptionsStatuses(
					n,
					r >= 'a' && r <= 'z',
					r >= 'A' && r <= 'Z',
					r >= '0' && r <= '9',
					this.allowedNonAlphanumericCharacters.includes(r)
				);
	}
	updatePasswordCharacterOptionsStatuses(e, n, r, i, s) {
		this.customStrengthOptions.containsLowercaseLetter &&
			(e.containsLowercaseLetter || (e.containsLowercaseLetter = n)),
			this.customStrengthOptions.containsUppercaseLetter &&
				(e.containsUppercaseLetter || (e.containsUppercaseLetter = r)),
			this.customStrengthOptions.containsNumericCharacter &&
				(e.containsNumericCharacter || (e.containsNumericCharacter = i)),
			this.customStrengthOptions.containsNonAlphanumericCharacter &&
				(e.containsNonAlphanumericCharacter || (e.containsNonAlphanumericCharacter = s));
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ip {
	constructor(e, n, r, i) {
		(this.app = e),
			(this.heartbeatServiceProvider = n),
			(this.appCheckServiceProvider = r),
			(this.config = i),
			(this.currentUser = null),
			(this.emulatorConfig = null),
			(this.operations = Promise.resolve()),
			(this.authStateSubscription = new Ca(this)),
			(this.idTokenSubscription = new Ca(this)),
			(this.beforeStateQueue = new yp(this)),
			(this.redirectUser = null),
			(this.isProactiveRefreshEnabled = !1),
			(this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
			(this._canInitEmulator = !0),
			(this._isInitialized = !1),
			(this._deleted = !1),
			(this._initializationPromise = null),
			(this._popupRedirectResolver = null),
			(this._errorFactory = iu),
			(this._agentRecaptchaConfig = null),
			(this._tenantRecaptchaConfigs = {}),
			(this._projectPasswordPolicy = null),
			(this._tenantPasswordPolicies = {}),
			(this.lastNotifiedUid = void 0),
			(this.languageCode = null),
			(this.tenantId = null),
			(this.settings = { appVerificationDisabledForTesting: !1 }),
			(this.frameworks = []),
			(this.name = e.name),
			(this.clientVersion = i.sdkClientVersion);
	}
	_initializeWithPersistence(e, n) {
		return (
			n && (this._popupRedirectResolver = Be(n)),
			(this._initializationPromise = this.queue(async () => {
				var r, i;
				if (
					!this._deleted &&
					((this.persistenceManager = await Ut.create(this, e)), !this._deleted)
				) {
					if (
						!((r = this._popupRedirectResolver) === null || r === void 0) &&
						r._shouldInitProactively
					)
						try {
							await this._popupRedirectResolver._initialize(this);
						} catch {}
					await this.initializeCurrentUser(n),
						(this.lastNotifiedUid =
							((i = this.currentUser) === null || i === void 0 ? void 0 : i.uid) || null),
						!this._deleted && (this._isInitialized = !0);
				}
			})),
			this._initializationPromise
		);
	}
	async _onStorageEvent() {
		if (this._deleted) return;
		const e = await this.assertedPersistence.getCurrentUser();
		if (!(!this.currentUser && !e)) {
			if (this.currentUser && e && this.currentUser.uid === e.uid) {
				this._currentUser._assign(e), await this.currentUser.getIdToken();
				return;
			}
			await this._updateCurrentUser(e, !0);
		}
	}
	async initializeCurrentUser(e) {
		var n;
		const r = await this.assertedPersistence.getCurrentUser();
		let i = r,
			s = !1;
		if (e && this.config.authDomain) {
			await this.getOrInitRedirectPersistenceManager();
			const o = (n = this.redirectUser) === null || n === void 0 ? void 0 : n._redirectEventId,
				a = i == null ? void 0 : i._redirectEventId,
				c = await this.tryRedirectSignIn(e);
			(!o || o === a) && c != null && c.user && ((i = c.user), (s = !0));
		}
		if (!i) return this.directlySetCurrentUser(null);
		if (!i._redirectEventId) {
			if (s)
				try {
					await this.beforeStateQueue.runMiddleware(i);
				} catch (o) {
					(i = r),
						this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(o));
				}
			return i ? this.reloadAndSetCurrentUserOrClear(i) : this.directlySetCurrentUser(null);
		}
		return (
			S(this._popupRedirectResolver, this, 'argument-error'),
			await this.getOrInitRedirectPersistenceManager(),
			this.redirectUser && this.redirectUser._redirectEventId === i._redirectEventId
				? this.directlySetCurrentUser(i)
				: this.reloadAndSetCurrentUserOrClear(i)
		);
	}
	async tryRedirectSignIn(e) {
		let n = null;
		try {
			n = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
		} catch {
			await this._setRedirectUser(null);
		}
		return n;
	}
	async reloadAndSetCurrentUserOrClear(e) {
		try {
			await xr(e);
		} catch (n) {
			if ((n == null ? void 0 : n.code) !== 'auth/network-request-failed')
				return this.directlySetCurrentUser(null);
		}
		return this.directlySetCurrentUser(e);
	}
	useDeviceLanguage() {
		this.languageCode = Zf();
	}
	async _delete() {
		this._deleted = !0;
	}
	async updateCurrentUser(e) {
		const n = e ? B(e) : null;
		return (
			n && S(n.auth.config.apiKey === this.config.apiKey, this, 'invalid-user-token'),
			this._updateCurrentUser(n && n._clone(this))
		);
	}
	async _updateCurrentUser(e, n = !1) {
		if (!this._deleted)
			return (
				e && S(this.tenantId === e.tenantId, this, 'tenant-id-mismatch'),
				n || (await this.beforeStateQueue.runMiddleware(e)),
				this.queue(async () => {
					await this.directlySetCurrentUser(e), this.notifyAuthListeners();
				})
			);
	}
	async signOut() {
		return (
			await this.beforeStateQueue.runMiddleware(null),
			(this.redirectPersistenceManager || this._popupRedirectResolver) &&
				(await this._setRedirectUser(null)),
			this._updateCurrentUser(null, !0)
		);
	}
	setPersistence(e) {
		return this.queue(async () => {
			await this.assertedPersistence.setPersistence(Be(e));
		});
	}
	_getRecaptchaConfig() {
		return this.tenantId == null
			? this._agentRecaptchaConfig
			: this._tenantRecaptchaConfigs[this.tenantId];
	}
	async validatePassword(e) {
		this._getPasswordPolicyInternal() || (await this._updatePasswordPolicy());
		const n = this._getPasswordPolicyInternal();
		return n.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
			? Promise.reject(this._errorFactory.create('unsupported-password-policy-schema-version', {}))
			: n.validatePassword(e);
	}
	_getPasswordPolicyInternal() {
		return this.tenantId === null
			? this._projectPasswordPolicy
			: this._tenantPasswordPolicies[this.tenantId];
	}
	async _updatePasswordPolicy() {
		const e = await vp(this),
			n = new Tp(e);
		this.tenantId === null
			? (this._projectPasswordPolicy = n)
			: (this._tenantPasswordPolicies[this.tenantId] = n);
	}
	_getPersistence() {
		return this.assertedPersistence.persistence.type;
	}
	_updateErrorMap(e) {
		this._errorFactory = new zn('auth', 'Firebase', e());
	}
	onAuthStateChanged(e, n, r) {
		return this.registerStateListener(this.authStateSubscription, e, n, r);
	}
	beforeAuthStateChanged(e, n) {
		return this.beforeStateQueue.pushCallback(e, n);
	}
	onIdTokenChanged(e, n, r) {
		return this.registerStateListener(this.idTokenSubscription, e, n, r);
	}
	authStateReady() {
		return new Promise((e, n) => {
			if (this.currentUser) e();
			else {
				const r = this.onAuthStateChanged(() => {
					r(), e();
				}, n);
			}
		});
	}
	async revokeAccessToken(e) {
		if (this.currentUser) {
			const n = await this.currentUser.getIdToken(),
				r = { providerId: 'apple.com', tokenType: 'ACCESS_TOKEN', token: e, idToken: n };
			this.tenantId != null && (r.tenantId = this.tenantId), await pp(this, r);
		}
	}
	toJSON() {
		var e;
		return {
			apiKey: this.config.apiKey,
			authDomain: this.config.authDomain,
			appName: this.name,
			currentUser: (e = this._currentUser) === null || e === void 0 ? void 0 : e.toJSON()
		};
	}
	async _setRedirectUser(e, n) {
		const r = await this.getOrInitRedirectPersistenceManager(n);
		return e === null ? r.removeCurrentUser() : r.setCurrentUser(e);
	}
	async getOrInitRedirectPersistenceManager(e) {
		if (!this.redirectPersistenceManager) {
			const n = (e && Be(e)) || this._popupRedirectResolver;
			S(n, this, 'argument-error'),
				(this.redirectPersistenceManager = await Ut.create(
					this,
					[Be(n._redirectPersistence)],
					'redirectUser'
				)),
				(this.redirectUser = await this.redirectPersistenceManager.getCurrentUser());
		}
		return this.redirectPersistenceManager;
	}
	async _redirectUserForId(e) {
		var n, r;
		return (
			this._isInitialized && (await this.queue(async () => {})),
			((n = this._currentUser) === null || n === void 0 ? void 0 : n._redirectEventId) === e
				? this._currentUser
				: ((r = this.redirectUser) === null || r === void 0 ? void 0 : r._redirectEventId) === e
					? this.redirectUser
					: null
		);
	}
	async _persistUserIfCurrent(e) {
		if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e));
	}
	_notifyListenersIfCurrent(e) {
		e === this.currentUser && this.notifyAuthListeners();
	}
	_key() {
		return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
	}
	_startProactiveRefresh() {
		(this.isProactiveRefreshEnabled = !0),
			this.currentUser && this._currentUser._startProactiveRefresh();
	}
	_stopProactiveRefresh() {
		(this.isProactiveRefreshEnabled = !1),
			this.currentUser && this._currentUser._stopProactiveRefresh();
	}
	get _currentUser() {
		return this.currentUser;
	}
	notifyAuthListeners() {
		var e, n;
		if (!this._isInitialized) return;
		this.idTokenSubscription.next(this.currentUser);
		const r =
			(n = (e = this.currentUser) === null || e === void 0 ? void 0 : e.uid) !== null &&
			n !== void 0
				? n
				: null;
		this.lastNotifiedUid !== r &&
			((this.lastNotifiedUid = r), this.authStateSubscription.next(this.currentUser));
	}
	registerStateListener(e, n, r, i) {
		if (this._deleted) return () => {};
		const s = typeof n == 'function' ? n : n.next.bind(n);
		let o = !1;
		const a = this._isInitialized ? Promise.resolve() : this._initializationPromise;
		if (
			(S(a, this, 'internal-error'),
			a.then(() => {
				o || s(this.currentUser);
			}),
			typeof n == 'function')
		) {
			const c = e.addObserver(n, r, i);
			return () => {
				(o = !0), c();
			};
		} else {
			const c = e.addObserver(n);
			return () => {
				(o = !0), c();
			};
		}
	}
	async directlySetCurrentUser(e) {
		this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(),
			e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
			(this.currentUser = e),
			e
				? await this.assertedPersistence.setCurrentUser(e)
				: await this.assertedPersistence.removeCurrentUser();
	}
	queue(e) {
		return (this.operations = this.operations.then(e, e)), this.operations;
	}
	get assertedPersistence() {
		return S(this.persistenceManager, this, 'internal-error'), this.persistenceManager;
	}
	_logFramework(e) {
		!e ||
			this.frameworks.includes(e) ||
			(this.frameworks.push(e),
			this.frameworks.sort(),
			(this.clientVersion = yu(this.config.clientPlatform, this._getFrameworks())));
	}
	_getFrameworks() {
		return this.frameworks;
	}
	async _getAdditionalHeaders() {
		var e;
		const n = { 'X-Client-Version': this.clientVersion };
		this.app.options.appId && (n['X-Firebase-gmpid'] = this.app.options.appId);
		const r = await ((e = this.heartbeatServiceProvider.getImmediate({ optional: !0 })) === null ||
		e === void 0
			? void 0
			: e.getHeartbeatsHeader());
		r && (n['X-Firebase-Client'] = r);
		const i = await this._getAppCheckToken();
		return i && (n['X-Firebase-AppCheck'] = i), n;
	}
	async _getAppCheckToken() {
		var e;
		const n = await ((e = this.appCheckServiceProvider.getImmediate({ optional: !0 })) === null ||
		e === void 0
			? void 0
			: e.getToken());
		return (
			n != null && n.error && Qf(`Error while retrieving App Check token: ${n.error}`),
			n == null ? void 0 : n.token
		);
	}
}
function ii(t) {
	return B(t);
}
class Ca {
	constructor(e) {
		(this.auth = e), (this.observer = null), (this.addObserver = xd((n) => (this.observer = n)));
	}
	get next() {
		return S(this.observer, this.auth, 'internal-error'), this.observer.next.bind(this.observer);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let Qs = {
	async loadJS() {
		throw new Error('Unable to load external scripts');
	},
	recaptchaV2Script: '',
	recaptchaEnterpriseScript: '',
	gapiScript: ''
};
function wp(t) {
	Qs = t;
}
function Ap(t) {
	return Qs.loadJS(t);
}
function Rp() {
	return Qs.gapiScript;
}
function Sp(t) {
	return `__${t}${Math.floor(Math.random() * 1e6)}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Pp(t, e) {
	const n = ni(t, 'auth');
	if (n.isInitialized()) {
		const i = n.getImmediate(),
			s = n.getOptions();
		if ($t(s, e ?? {})) return i;
		Oe(i, 'already-initialized');
	}
	return n.initialize({ options: e });
}
function Cp(t, e) {
	const n = (e == null ? void 0 : e.persistence) || [],
		r = (Array.isArray(n) ? n : [n]).map(Be);
	e != null && e.errorMap && t._updateErrorMap(e.errorMap),
		t._initializeWithPersistence(r, e == null ? void 0 : e.popupRedirectResolver);
}
function bp(t, e, n) {
	const r = ii(t);
	S(r._canInitEmulator, r, 'emulator-config-failed'),
		S(/^https?:\/\//.test(e), r, 'invalid-emulator-scheme');
	const i = !!(n != null && n.disableWarnings),
		s = vu(e),
		{ host: o, port: a } = kp(e),
		c = a === null ? '' : `:${a}`;
	(r.config.emulator = { url: `${s}//${o}${c}/` }),
		(r.settings.appVerificationDisabledForTesting = !0),
		(r.emulatorConfig = Object.freeze({
			host: o,
			port: a,
			protocol: s.replace(':', ''),
			options: Object.freeze({ disableWarnings: i })
		})),
		i || Dp();
}
function vu(t) {
	const e = t.indexOf(':');
	return e < 0 ? '' : t.substr(0, e + 1);
}
function kp(t) {
	const e = vu(t),
		n = /(\/\/)?([^?#/]+)/.exec(t.substr(e.length));
	if (!n) return { host: '', port: null };
	const r = n[2].split('@').pop() || '',
		i = /^(\[[^\]]+\])(:|$)/.exec(r);
	if (i) {
		const s = i[1];
		return { host: s, port: ba(r.substr(s.length + 1)) };
	} else {
		const [s, o] = r.split(':');
		return { host: s, port: ba(o) };
	}
}
function ba(t) {
	if (!t) return null;
	const e = Number(t);
	return isNaN(e) ? null : e;
}
function Dp() {
	function t() {
		const e = document.createElement('p'),
			n = e.style;
		(e.innerText = 'Running in emulator mode. Do not use with production credentials.'),
			(n.position = 'fixed'),
			(n.width = '100%'),
			(n.backgroundColor = '#ffffff'),
			(n.border = '.1em solid #000000'),
			(n.color = '#b50000'),
			(n.bottom = '0px'),
			(n.left = '0px'),
			(n.margin = '0px'),
			(n.zIndex = '10000'),
			(n.textAlign = 'center'),
			e.classList.add('firebase-emulator-warning'),
			document.body.appendChild(e);
	}
	typeof console < 'u' &&
		typeof console.info == 'function' &&
		console.info(
			'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.'
		),
		typeof window < 'u' &&
			typeof document < 'u' &&
			(document.readyState === 'loading' ? window.addEventListener('DOMContentLoaded', t) : t());
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Eu {
	constructor(e, n) {
		(this.providerId = e), (this.signInMethod = n);
	}
	toJSON() {
		return Fe('not implemented');
	}
	_getIdTokenResponse(e) {
		return Fe('not implemented');
	}
	_linkToIdToken(e, n) {
		return Fe('not implemented');
	}
	_getReauthenticationResolver(e) {
		return Fe('not implemented');
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Ft(t, e) {
	return np(t, 'POST', '/v1/accounts:signInWithIdp', Ws(t, e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Np = 'http://localhost';
class Tt extends Eu {
	constructor() {
		super(...arguments), (this.pendingToken = null);
	}
	static _fromParams(e) {
		const n = new Tt(e.providerId, e.signInMethod);
		return (
			e.idToken || e.accessToken
				? (e.idToken && (n.idToken = e.idToken),
					e.accessToken && (n.accessToken = e.accessToken),
					e.nonce && !e.pendingToken && (n.nonce = e.nonce),
					e.pendingToken && (n.pendingToken = e.pendingToken))
				: e.oauthToken && e.oauthTokenSecret
					? ((n.accessToken = e.oauthToken), (n.secret = e.oauthTokenSecret))
					: Oe('argument-error'),
			n
		);
	}
	toJSON() {
		return {
			idToken: this.idToken,
			accessToken: this.accessToken,
			secret: this.secret,
			nonce: this.nonce,
			pendingToken: this.pendingToken,
			providerId: this.providerId,
			signInMethod: this.signInMethod
		};
	}
	static fromJSON(e) {
		const n = typeof e == 'string' ? JSON.parse(e) : e,
			{ providerId: r, signInMethod: i } = n,
			s = $s(n, ['providerId', 'signInMethod']);
		if (!r || !i) return null;
		const o = new Tt(r, i);
		return (
			(o.idToken = s.idToken || void 0),
			(o.accessToken = s.accessToken || void 0),
			(o.secret = s.secret),
			(o.nonce = s.nonce),
			(o.pendingToken = s.pendingToken || null),
			o
		);
	}
	_getIdTokenResponse(e) {
		const n = this.buildRequest();
		return Ft(e, n);
	}
	_linkToIdToken(e, n) {
		const r = this.buildRequest();
		return (r.idToken = n), Ft(e, r);
	}
	_getReauthenticationResolver(e) {
		const n = this.buildRequest();
		return (n.autoCreate = !1), Ft(e, n);
	}
	buildRequest() {
		const e = { requestUri: Np, returnSecureToken: !0 };
		if (this.pendingToken) e.pendingToken = this.pendingToken;
		else {
			const n = {};
			this.idToken && (n.id_token = this.idToken),
				this.accessToken && (n.access_token = this.accessToken),
				this.secret && (n.oauth_token_secret = this.secret),
				(n.providerId = this.providerId),
				this.nonce && !this.pendingToken && (n.nonce = this.nonce),
				(e.postBody = Hn(n));
		}
		return e;
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xs {
	constructor(e) {
		(this.providerId = e), (this.defaultLanguageCode = null), (this.customParameters = {});
	}
	setDefaultLanguage(e) {
		this.defaultLanguageCode = e;
	}
	setCustomParameters(e) {
		return (this.customParameters = e), this;
	}
	getCustomParameters() {
		return this.customParameters;
	}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gn extends Xs {
	constructor() {
		super(...arguments), (this.scopes = []);
	}
	addScope(e) {
		return this.scopes.includes(e) || this.scopes.push(e), this;
	}
	getScopes() {
		return [...this.scopes];
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ge extends Gn {
	constructor() {
		super('facebook.com');
	}
	static credential(e) {
		return Tt._fromParams({
			providerId: Ge.PROVIDER_ID,
			signInMethod: Ge.FACEBOOK_SIGN_IN_METHOD,
			accessToken: e
		});
	}
	static credentialFromResult(e) {
		return Ge.credentialFromTaggedObject(e);
	}
	static credentialFromError(e) {
		return Ge.credentialFromTaggedObject(e.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: e }) {
		if (!e || !('oauthAccessToken' in e) || !e.oauthAccessToken) return null;
		try {
			return Ge.credential(e.oauthAccessToken);
		} catch {
			return null;
		}
	}
}
Ge.FACEBOOK_SIGN_IN_METHOD = 'facebook.com';
Ge.PROVIDER_ID = 'facebook.com';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ke extends Gn {
	constructor() {
		super('google.com'), this.addScope('profile');
	}
	static credential(e, n) {
		return Tt._fromParams({
			providerId: Ke.PROVIDER_ID,
			signInMethod: Ke.GOOGLE_SIGN_IN_METHOD,
			idToken: e,
			accessToken: n
		});
	}
	static credentialFromResult(e) {
		return Ke.credentialFromTaggedObject(e);
	}
	static credentialFromError(e) {
		return Ke.credentialFromTaggedObject(e.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: e }) {
		if (!e) return null;
		const { oauthIdToken: n, oauthAccessToken: r } = e;
		if (!n && !r) return null;
		try {
			return Ke.credential(n, r);
		} catch {
			return null;
		}
	}
}
Ke.GOOGLE_SIGN_IN_METHOD = 'google.com';
Ke.PROVIDER_ID = 'google.com';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Qe extends Gn {
	constructor() {
		super('github.com');
	}
	static credential(e) {
		return Tt._fromParams({
			providerId: Qe.PROVIDER_ID,
			signInMethod: Qe.GITHUB_SIGN_IN_METHOD,
			accessToken: e
		});
	}
	static credentialFromResult(e) {
		return Qe.credentialFromTaggedObject(e);
	}
	static credentialFromError(e) {
		return Qe.credentialFromTaggedObject(e.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: e }) {
		if (!e || !('oauthAccessToken' in e) || !e.oauthAccessToken) return null;
		try {
			return Qe.credential(e.oauthAccessToken);
		} catch {
			return null;
		}
	}
}
Qe.GITHUB_SIGN_IN_METHOD = 'github.com';
Qe.PROVIDER_ID = 'github.com';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xe extends Gn {
	constructor() {
		super('twitter.com');
	}
	static credential(e, n) {
		return Tt._fromParams({
			providerId: Xe.PROVIDER_ID,
			signInMethod: Xe.TWITTER_SIGN_IN_METHOD,
			oauthToken: e,
			oauthTokenSecret: n
		});
	}
	static credentialFromResult(e) {
		return Xe.credentialFromTaggedObject(e);
	}
	static credentialFromError(e) {
		return Xe.credentialFromTaggedObject(e.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: e }) {
		if (!e) return null;
		const { oauthAccessToken: n, oauthTokenSecret: r } = e;
		if (!n || !r) return null;
		try {
			return Xe.credential(n, r);
		} catch {
			return null;
		}
	}
}
Xe.TWITTER_SIGN_IN_METHOD = 'twitter.com';
Xe.PROVIDER_ID = 'twitter.com';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zt {
	constructor(e) {
		(this.user = e.user),
			(this.providerId = e.providerId),
			(this._tokenResponse = e._tokenResponse),
			(this.operationType = e.operationType);
	}
	static async _fromIdTokenResponse(e, n, r, i = !1) {
		const s = await gt._fromIdTokenResponse(e, r, i),
			o = ka(r);
		return new zt({ user: s, providerId: o, _tokenResponse: r, operationType: n });
	}
	static async _forOperation(e, n, r) {
		await e._updateTokensIfNecessary(r, !0);
		const i = ka(r);
		return new zt({ user: e, providerId: i, _tokenResponse: r, operationType: n });
	}
}
function ka(t) {
	return t.providerId ? t.providerId : 'phoneNumber' in t ? 'phone' : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ur extends xe {
	constructor(e, n, r, i) {
		var s;
		super(n.code, n.message),
			(this.operationType = r),
			(this.user = i),
			Object.setPrototypeOf(this, Ur.prototype),
			(this.customData = {
				appName: e.name,
				tenantId: (s = e.tenantId) !== null && s !== void 0 ? s : void 0,
				_serverResponse: n.customData._serverResponse,
				operationType: r
			});
	}
	static _fromErrorAndOperation(e, n, r, i) {
		return new Ur(e, n, r, i);
	}
}
function Tu(t, e, n, r) {
	return (
		e === 'reauthenticate' ? n._getReauthenticationResolver(t) : n._getIdTokenResponse(t)
	).catch((s) => {
		throw s.code === 'auth/multi-factor-auth-required' ? Ur._fromErrorAndOperation(t, s, e, r) : s;
	});
}
async function Vp(t, e, n = !1) {
	const r = await bn(t, e._linkToIdToken(t.auth, await t.getIdToken()), n);
	return zt._forOperation(t, 'link', r);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Op(t, e, n = !1) {
	const { auth: r } = t,
		i = 'reauthenticate';
	try {
		const s = await bn(t, Tu(r, i, e, t), n);
		S(s.idToken, r, 'internal-error');
		const o = Gs(s.idToken);
		S(o, r, 'internal-error');
		const { sub: a } = o;
		return S(t.uid === a, r, 'user-mismatch'), zt._forOperation(t, i, s);
	} catch (s) {
		throw ((s == null ? void 0 : s.code) === 'auth/user-not-found' && Oe(r, 'user-mismatch'), s);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Lp(t, e, n = !1) {
	const r = 'signIn',
		i = await Tu(t, r, e),
		s = await zt._fromIdTokenResponse(t, r, i);
	return n || (await t._updateCurrentUser(s.user)), s;
}
function Mp(t, e, n, r) {
	return B(t).onIdTokenChanged(e, n, r);
}
function xp(t, e, n) {
	return B(t).beforeAuthStateChanged(e, n);
}
function Up(t, e, n, r) {
	return B(t).onAuthStateChanged(e, n, r);
}
function gT(t) {
	return B(t).signOut();
}
const Fr = '__sak';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Iu {
	constructor(e, n) {
		(this.storageRetriever = e), (this.type = n);
	}
	_isAvailable() {
		try {
			return this.storage
				? (this.storage.setItem(Fr, '1'), this.storage.removeItem(Fr), Promise.resolve(!0))
				: Promise.resolve(!1);
		} catch {
			return Promise.resolve(!1);
		}
	}
	_set(e, n) {
		return this.storage.setItem(e, JSON.stringify(n)), Promise.resolve();
	}
	_get(e) {
		const n = this.storage.getItem(e);
		return Promise.resolve(n ? JSON.parse(n) : null);
	}
	_remove(e) {
		return this.storage.removeItem(e), Promise.resolve();
	}
	get storage() {
		return this.storageRetriever();
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Fp() {
	const t = K();
	return Ks(t) || ri(t);
}
const Bp = 1e3,
	jp = 10;
class wu extends Iu {
	constructor() {
		super(() => window.localStorage, 'LOCAL'),
			(this.boundEventHandler = (e, n) => this.onStorageEvent(e, n)),
			(this.listeners = {}),
			(this.localCache = {}),
			(this.pollTimer = null),
			(this.safariLocalStorageNotSynced = Fp() && _p()),
			(this.fallbackToPolling = _u()),
			(this._shouldAllowMigration = !0);
	}
	forAllChangedKeys(e) {
		for (const n of Object.keys(this.listeners)) {
			const r = this.storage.getItem(n),
				i = this.localCache[n];
			r !== i && e(n, i, r);
		}
	}
	onStorageEvent(e, n = !1) {
		if (!e.key) {
			this.forAllChangedKeys((o, a, c) => {
				this.notifyListeners(o, c);
			});
			return;
		}
		const r = e.key;
		if ((n ? this.detachListener() : this.stopPolling(), this.safariLocalStorageNotSynced)) {
			const o = this.storage.getItem(r);
			if (e.newValue !== o)
				e.newValue !== null ? this.storage.setItem(r, e.newValue) : this.storage.removeItem(r);
			else if (this.localCache[r] === e.newValue && !n) return;
		}
		const i = () => {
				const o = this.storage.getItem(r);
				(!n && this.localCache[r] === o) || this.notifyListeners(r, o);
			},
			s = this.storage.getItem(r);
		gp() && s !== e.newValue && e.newValue !== e.oldValue ? setTimeout(i, jp) : i();
	}
	notifyListeners(e, n) {
		this.localCache[e] = n;
		const r = this.listeners[e];
		if (r) for (const i of Array.from(r)) i(n && JSON.parse(n));
	}
	startPolling() {
		this.stopPolling(),
			(this.pollTimer = setInterval(() => {
				this.forAllChangedKeys((e, n, r) => {
					this.onStorageEvent(
						new StorageEvent('storage', { key: e, oldValue: n, newValue: r }),
						!0
					);
				});
			}, Bp));
	}
	stopPolling() {
		this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
	}
	attachListener() {
		window.addEventListener('storage', this.boundEventHandler);
	}
	detachListener() {
		window.removeEventListener('storage', this.boundEventHandler);
	}
	_addListener(e, n) {
		Object.keys(this.listeners).length === 0 &&
			(this.fallbackToPolling ? this.startPolling() : this.attachListener()),
			this.listeners[e] ||
				((this.listeners[e] = new Set()), (this.localCache[e] = this.storage.getItem(e))),
			this.listeners[e].add(n);
	}
	_removeListener(e, n) {
		this.listeners[e] &&
			(this.listeners[e].delete(n), this.listeners[e].size === 0 && delete this.listeners[e]),
			Object.keys(this.listeners).length === 0 && (this.detachListener(), this.stopPolling());
	}
	async _set(e, n) {
		await super._set(e, n), (this.localCache[e] = JSON.stringify(n));
	}
	async _get(e) {
		const n = await super._get(e);
		return (this.localCache[e] = JSON.stringify(n)), n;
	}
	async _remove(e) {
		await super._remove(e), delete this.localCache[e];
	}
}
wu.type = 'LOCAL';
const qp = wu;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Au extends Iu {
	constructor() {
		super(() => window.sessionStorage, 'SESSION');
	}
	_addListener(e, n) {}
	_removeListener(e, n) {}
}
Au.type = 'SESSION';
const Ru = Au;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $p(t) {
	return Promise.all(
		t.map(async (e) => {
			try {
				return { fulfilled: !0, value: await e };
			} catch (n) {
				return { fulfilled: !1, reason: n };
			}
		})
	);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class si {
	constructor(e) {
		(this.eventTarget = e),
			(this.handlersMap = {}),
			(this.boundEventHandler = this.handleEvent.bind(this));
	}
	static _getInstance(e) {
		const n = this.receivers.find((i) => i.isListeningto(e));
		if (n) return n;
		const r = new si(e);
		return this.receivers.push(r), r;
	}
	isListeningto(e) {
		return this.eventTarget === e;
	}
	async handleEvent(e) {
		const n = e,
			{ eventId: r, eventType: i, data: s } = n.data,
			o = this.handlersMap[i];
		if (!(o != null && o.size)) return;
		n.ports[0].postMessage({ status: 'ack', eventId: r, eventType: i });
		const a = Array.from(o).map(async (u) => u(n.origin, s)),
			c = await $p(a);
		n.ports[0].postMessage({ status: 'done', eventId: r, eventType: i, response: c });
	}
	_subscribe(e, n) {
		Object.keys(this.handlersMap).length === 0 &&
			this.eventTarget.addEventListener('message', this.boundEventHandler),
			this.handlersMap[e] || (this.handlersMap[e] = new Set()),
			this.handlersMap[e].add(n);
	}
	_unsubscribe(e, n) {
		this.handlersMap[e] && n && this.handlersMap[e].delete(n),
			(!n || this.handlersMap[e].size === 0) && delete this.handlersMap[e],
			Object.keys(this.handlersMap).length === 0 &&
				this.eventTarget.removeEventListener('message', this.boundEventHandler);
	}
}
si.receivers = [];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Js(t = '', e = 10) {
	let n = '';
	for (let r = 0; r < e; r++) n += Math.floor(Math.random() * 10);
	return t + n;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zp {
	constructor(e) {
		(this.target = e), (this.handlers = new Set());
	}
	removeMessageHandler(e) {
		e.messageChannel &&
			(e.messageChannel.port1.removeEventListener('message', e.onMessage),
			e.messageChannel.port1.close()),
			this.handlers.delete(e);
	}
	async _send(e, n, r = 50) {
		const i = typeof MessageChannel < 'u' ? new MessageChannel() : null;
		if (!i) throw new Error('connection_unavailable');
		let s, o;
		return new Promise((a, c) => {
			const u = Js('', 20);
			i.port1.start();
			const l = setTimeout(() => {
				c(new Error('unsupported_event'));
			}, r);
			(o = {
				messageChannel: i,
				onMessage(h) {
					const d = h;
					if (d.data.eventId === u)
						switch (d.data.status) {
							case 'ack':
								clearTimeout(l),
									(s = setTimeout(() => {
										c(new Error('timeout'));
									}, 3e3));
								break;
							case 'done':
								clearTimeout(s), a(d.data.response);
								break;
							default:
								clearTimeout(l), clearTimeout(s), c(new Error('invalid_response'));
								break;
						}
				}
			}),
				this.handlers.add(o),
				i.port1.addEventListener('message', o.onMessage),
				this.target.postMessage({ eventType: e, eventId: u, data: n }, [i.port2]);
		}).finally(() => {
			o && this.removeMessageHandler(o);
		});
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ke() {
	return window;
}
function Hp(t) {
	ke().location.href = t;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Su() {
	return typeof ke().WorkerGlobalScope < 'u' && typeof ke().importScripts == 'function';
}
async function Wp() {
	if (!(navigator != null && navigator.serviceWorker)) return null;
	try {
		return (await navigator.serviceWorker.ready).active;
	} catch {
		return null;
	}
}
function Gp() {
	var t;
	return (
		((t = navigator == null ? void 0 : navigator.serviceWorker) === null || t === void 0
			? void 0
			: t.controller) || null
	);
}
function Kp() {
	return Su() ? self : null;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Pu = 'firebaseLocalStorageDb',
	Qp = 1,
	Br = 'firebaseLocalStorage',
	Cu = 'fbase_key';
class Kn {
	constructor(e) {
		this.request = e;
	}
	toPromise() {
		return new Promise((e, n) => {
			this.request.addEventListener('success', () => {
				e(this.request.result);
			}),
				this.request.addEventListener('error', () => {
					n(this.request.error);
				});
		});
	}
}
function oi(t, e) {
	return t.transaction([Br], e ? 'readwrite' : 'readonly').objectStore(Br);
}
function Xp() {
	const t = indexedDB.deleteDatabase(Pu);
	return new Kn(t).toPromise();
}
function fs() {
	const t = indexedDB.open(Pu, Qp);
	return new Promise((e, n) => {
		t.addEventListener('error', () => {
			n(t.error);
		}),
			t.addEventListener('upgradeneeded', () => {
				const r = t.result;
				try {
					r.createObjectStore(Br, { keyPath: Cu });
				} catch (i) {
					n(i);
				}
			}),
			t.addEventListener('success', async () => {
				const r = t.result;
				r.objectStoreNames.contains(Br) ? e(r) : (r.close(), await Xp(), e(await fs()));
			});
	});
}
async function Da(t, e, n) {
	const r = oi(t, !0).put({ [Cu]: e, value: n });
	return new Kn(r).toPromise();
}
async function Jp(t, e) {
	const n = oi(t, !1).get(e),
		r = await new Kn(n).toPromise();
	return r === void 0 ? null : r.value;
}
function Na(t, e) {
	const n = oi(t, !0).delete(e);
	return new Kn(n).toPromise();
}
const Yp = 800,
	Zp = 3;
class bu {
	constructor() {
		(this.type = 'LOCAL'),
			(this._shouldAllowMigration = !0),
			(this.listeners = {}),
			(this.localCache = {}),
			(this.pollTimer = null),
			(this.pendingWrites = 0),
			(this.receiver = null),
			(this.sender = null),
			(this.serviceWorkerReceiverAvailable = !1),
			(this.activeServiceWorker = null),
			(this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(
				() => {},
				() => {}
			));
	}
	async _openDb() {
		return this.db ? this.db : ((this.db = await fs()), this.db);
	}
	async _withRetries(e) {
		let n = 0;
		for (;;)
			try {
				const r = await this._openDb();
				return await e(r);
			} catch (r) {
				if (n++ > Zp) throw r;
				this.db && (this.db.close(), (this.db = void 0));
			}
	}
	async initializeServiceWorkerMessaging() {
		return Su() ? this.initializeReceiver() : this.initializeSender();
	}
	async initializeReceiver() {
		(this.receiver = si._getInstance(Kp())),
			this.receiver._subscribe('keyChanged', async (e, n) => ({
				keyProcessed: (await this._poll()).includes(n.key)
			})),
			this.receiver._subscribe('ping', async (e, n) => ['keyChanged']);
	}
	async initializeSender() {
		var e, n;
		if (((this.activeServiceWorker = await Wp()), !this.activeServiceWorker)) return;
		this.sender = new zp(this.activeServiceWorker);
		const r = await this.sender._send('ping', {}, 800);
		r &&
			!((e = r[0]) === null || e === void 0) &&
			e.fulfilled &&
			!((n = r[0]) === null || n === void 0) &&
			n.value.includes('keyChanged') &&
			(this.serviceWorkerReceiverAvailable = !0);
	}
	async notifyServiceWorker(e) {
		if (!(!this.sender || !this.activeServiceWorker || Gp() !== this.activeServiceWorker))
			try {
				await this.sender._send(
					'keyChanged',
					{ key: e },
					this.serviceWorkerReceiverAvailable ? 800 : 50
				);
			} catch {}
	}
	async _isAvailable() {
		try {
			if (!indexedDB) return !1;
			const e = await fs();
			return await Da(e, Fr, '1'), await Na(e, Fr), !0;
		} catch {}
		return !1;
	}
	async _withPendingWrite(e) {
		this.pendingWrites++;
		try {
			await e();
		} finally {
			this.pendingWrites--;
		}
	}
	async _set(e, n) {
		return this._withPendingWrite(
			async () => (
				await this._withRetries((r) => Da(r, e, n)),
				(this.localCache[e] = n),
				this.notifyServiceWorker(e)
			)
		);
	}
	async _get(e) {
		const n = await this._withRetries((r) => Jp(r, e));
		return (this.localCache[e] = n), n;
	}
	async _remove(e) {
		return this._withPendingWrite(
			async () => (
				await this._withRetries((n) => Na(n, e)),
				delete this.localCache[e],
				this.notifyServiceWorker(e)
			)
		);
	}
	async _poll() {
		const e = await this._withRetries((i) => {
			const s = oi(i, !1).getAll();
			return new Kn(s).toPromise();
		});
		if (!e) return [];
		if (this.pendingWrites !== 0) return [];
		const n = [],
			r = new Set();
		if (e.length !== 0)
			for (const { fbase_key: i, value: s } of e)
				r.add(i),
					JSON.stringify(this.localCache[i]) !== JSON.stringify(s) &&
						(this.notifyListeners(i, s), n.push(i));
		for (const i of Object.keys(this.localCache))
			this.localCache[i] && !r.has(i) && (this.notifyListeners(i, null), n.push(i));
		return n;
	}
	notifyListeners(e, n) {
		this.localCache[e] = n;
		const r = this.listeners[e];
		if (r) for (const i of Array.from(r)) i(n);
	}
	startPolling() {
		this.stopPolling(), (this.pollTimer = setInterval(async () => this._poll(), Yp));
	}
	stopPolling() {
		this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
	}
	_addListener(e, n) {
		Object.keys(this.listeners).length === 0 && this.startPolling(),
			this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
			this.listeners[e].add(n);
	}
	_removeListener(e, n) {
		this.listeners[e] &&
			(this.listeners[e].delete(n), this.listeners[e].size === 0 && delete this.listeners[e]),
			Object.keys(this.listeners).length === 0 && this.stopPolling();
	}
}
bu.type = 'LOCAL';
const em = bu;
new Wn(3e4, 6e4);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ku(t, e) {
	return e ? Be(e) : (S(t._popupRedirectResolver, t, 'argument-error'), t._popupRedirectResolver);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ys extends Eu {
	constructor(e) {
		super('custom', 'custom'), (this.params = e);
	}
	_getIdTokenResponse(e) {
		return Ft(e, this._buildIdpRequest());
	}
	_linkToIdToken(e, n) {
		return Ft(e, this._buildIdpRequest(n));
	}
	_getReauthenticationResolver(e) {
		return Ft(e, this._buildIdpRequest());
	}
	_buildIdpRequest(e) {
		const n = {
			requestUri: this.params.requestUri,
			sessionId: this.params.sessionId,
			postBody: this.params.postBody,
			tenantId: this.params.tenantId,
			pendingToken: this.params.pendingToken,
			returnSecureToken: !0,
			returnIdpCredential: !0
		};
		return e && (n.idToken = e), n;
	}
}
function tm(t) {
	return Lp(t.auth, new Ys(t), t.bypassAuthState);
}
function nm(t) {
	const { auth: e, user: n } = t;
	return S(n, e, 'internal-error'), Op(n, new Ys(t), t.bypassAuthState);
}
async function rm(t) {
	const { auth: e, user: n } = t;
	return S(n, e, 'internal-error'), Vp(n, new Ys(t), t.bypassAuthState);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Du {
	constructor(e, n, r, i, s = !1) {
		(this.auth = e),
			(this.resolver = r),
			(this.user = i),
			(this.bypassAuthState = s),
			(this.pendingPromise = null),
			(this.eventManager = null),
			(this.filter = Array.isArray(n) ? n : [n]);
	}
	execute() {
		return new Promise(async (e, n) => {
			this.pendingPromise = { resolve: e, reject: n };
			try {
				(this.eventManager = await this.resolver._initialize(this.auth)),
					await this.onExecution(),
					this.eventManager.registerConsumer(this);
			} catch (r) {
				this.reject(r);
			}
		});
	}
	async onAuthEvent(e) {
		const { urlResponse: n, sessionId: r, postBody: i, tenantId: s, error: o, type: a } = e;
		if (o) {
			this.reject(o);
			return;
		}
		const c = {
			auth: this.auth,
			requestUri: n,
			sessionId: r,
			tenantId: s || void 0,
			postBody: i || void 0,
			user: this.user,
			bypassAuthState: this.bypassAuthState
		};
		try {
			this.resolve(await this.getIdpTask(a)(c));
		} catch (u) {
			this.reject(u);
		}
	}
	onError(e) {
		this.reject(e);
	}
	getIdpTask(e) {
		switch (e) {
			case 'signInViaPopup':
			case 'signInViaRedirect':
				return tm;
			case 'linkViaPopup':
			case 'linkViaRedirect':
				return rm;
			case 'reauthViaPopup':
			case 'reauthViaRedirect':
				return nm;
			default:
				Oe(this.auth, 'internal-error');
		}
	}
	resolve(e) {
		qe(this.pendingPromise, 'Pending promise was never set'),
			this.pendingPromise.resolve(e),
			this.unregisterAndCleanUp();
	}
	reject(e) {
		qe(this.pendingPromise, 'Pending promise was never set'),
			this.pendingPromise.reject(e),
			this.unregisterAndCleanUp();
	}
	unregisterAndCleanUp() {
		this.eventManager && this.eventManager.unregisterConsumer(this),
			(this.pendingPromise = null),
			this.cleanUp();
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const im = new Wn(2e3, 1e4);
async function _T(t, e, n) {
	const r = ii(t);
	Xf(t, e, Xs);
	const i = ku(r, n);
	return new ht(r, 'signInViaPopup', e, i).executeNotNull();
}
class ht extends Du {
	constructor(e, n, r, i, s) {
		super(e, n, i, s),
			(this.provider = r),
			(this.authWindow = null),
			(this.pollId = null),
			ht.currentPopupAction && ht.currentPopupAction.cancel(),
			(ht.currentPopupAction = this);
	}
	async executeNotNull() {
		const e = await this.execute();
		return S(e, this.auth, 'internal-error'), e;
	}
	async onExecution() {
		qe(this.filter.length === 1, 'Popup operations only handle one event');
		const e = Js();
		(this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e)),
			(this.authWindow.associatedEvent = e),
			this.resolver._originValidation(this.auth).catch((n) => {
				this.reject(n);
			}),
			this.resolver._isIframeWebStorageSupported(this.auth, (n) => {
				n || this.reject(be(this.auth, 'web-storage-unsupported'));
			}),
			this.pollUserCancellation();
	}
	get eventId() {
		var e;
		return ((e = this.authWindow) === null || e === void 0 ? void 0 : e.associatedEvent) || null;
	}
	cancel() {
		this.reject(be(this.auth, 'cancelled-popup-request'));
	}
	cleanUp() {
		this.authWindow && this.authWindow.close(),
			this.pollId && window.clearTimeout(this.pollId),
			(this.authWindow = null),
			(this.pollId = null),
			(ht.currentPopupAction = null);
	}
	pollUserCancellation() {
		const e = () => {
			var n, r;
			if (
				!(
					(r = (n = this.authWindow) === null || n === void 0 ? void 0 : n.window) === null ||
					r === void 0
				) &&
				r.closed
			) {
				this.pollId = window.setTimeout(() => {
					(this.pollId = null), this.reject(be(this.auth, 'popup-closed-by-user'));
				}, 8e3);
				return;
			}
			this.pollId = window.setTimeout(e, im.get());
		};
		e();
	}
}
ht.currentPopupAction = null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const sm = 'pendingRedirect',
	Pr = new Map();
class om extends Du {
	constructor(e, n, r = !1) {
		super(
			e,
			['signInViaRedirect', 'linkViaRedirect', 'reauthViaRedirect', 'unknown'],
			n,
			void 0,
			r
		),
			(this.eventId = null);
	}
	async execute() {
		let e = Pr.get(this.auth._key());
		if (!e) {
			try {
				const r = (await am(this.resolver, this.auth)) ? await super.execute() : null;
				e = () => Promise.resolve(r);
			} catch (n) {
				e = () => Promise.reject(n);
			}
			Pr.set(this.auth._key(), e);
		}
		return this.bypassAuthState || Pr.set(this.auth._key(), () => Promise.resolve(null)), e();
	}
	async onAuthEvent(e) {
		if (e.type === 'signInViaRedirect') return super.onAuthEvent(e);
		if (e.type === 'unknown') {
			this.resolve(null);
			return;
		}
		if (e.eventId) {
			const n = await this.auth._redirectUserForId(e.eventId);
			if (n) return (this.user = n), super.onAuthEvent(e);
			this.resolve(null);
		}
	}
	async onExecution() {}
	cleanUp() {}
}
async function am(t, e) {
	const n = lm(e),
		r = um(t);
	if (!(await r._isAvailable())) return !1;
	const i = (await r._get(n)) === 'true';
	return await r._remove(n), i;
}
function cm(t, e) {
	Pr.set(t._key(), e);
}
function um(t) {
	return Be(t._redirectPersistence);
}
function lm(t) {
	return Sr(sm, t.config.apiKey, t.name);
}
async function hm(t, e, n = !1) {
	const r = ii(t),
		i = ku(r, e),
		o = await new om(r, i, n).execute();
	return (
		o &&
			!n &&
			(delete o.user._redirectEventId,
			await r._persistUserIfCurrent(o.user),
			await r._setRedirectUser(null, e)),
		o
	);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const dm = 10 * 60 * 1e3;
class fm {
	constructor(e) {
		(this.auth = e),
			(this.cachedEventUids = new Set()),
			(this.consumers = new Set()),
			(this.queuedRedirectEvent = null),
			(this.hasHandledPotentialRedirect = !1),
			(this.lastProcessedEventTime = Date.now());
	}
	registerConsumer(e) {
		this.consumers.add(e),
			this.queuedRedirectEvent &&
				this.isEventForConsumer(this.queuedRedirectEvent, e) &&
				(this.sendToConsumer(this.queuedRedirectEvent, e),
				this.saveEventToCache(this.queuedRedirectEvent),
				(this.queuedRedirectEvent = null));
	}
	unregisterConsumer(e) {
		this.consumers.delete(e);
	}
	onEvent(e) {
		if (this.hasEventBeenHandled(e)) return !1;
		let n = !1;
		return (
			this.consumers.forEach((r) => {
				this.isEventForConsumer(e, r) &&
					((n = !0), this.sendToConsumer(e, r), this.saveEventToCache(e));
			}),
			this.hasHandledPotentialRedirect ||
				!pm(e) ||
				((this.hasHandledPotentialRedirect = !0), n || ((this.queuedRedirectEvent = e), (n = !0))),
			n
		);
	}
	sendToConsumer(e, n) {
		var r;
		if (e.error && !Nu(e)) {
			const i =
				((r = e.error.code) === null || r === void 0 ? void 0 : r.split('auth/')[1]) ||
				'internal-error';
			n.onError(be(this.auth, i));
		} else n.onAuthEvent(e);
	}
	isEventForConsumer(e, n) {
		const r = n.eventId === null || (!!e.eventId && e.eventId === n.eventId);
		return n.filter.includes(e.type) && r;
	}
	hasEventBeenHandled(e) {
		return (
			Date.now() - this.lastProcessedEventTime >= dm && this.cachedEventUids.clear(),
			this.cachedEventUids.has(Va(e))
		);
	}
	saveEventToCache(e) {
		this.cachedEventUids.add(Va(e)), (this.lastProcessedEventTime = Date.now());
	}
}
function Va(t) {
	return [t.type, t.eventId, t.sessionId, t.tenantId].filter((e) => e).join('-');
}
function Nu({ type: t, error: e }) {
	return t === 'unknown' && (e == null ? void 0 : e.code) === 'auth/no-auth-event';
}
function pm(t) {
	switch (t.type) {
		case 'signInViaRedirect':
		case 'linkViaRedirect':
		case 'reauthViaRedirect':
			return !0;
		case 'unknown':
			return Nu(t);
		default:
			return !1;
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function mm(t, e = {}) {
	return tn(t, 'GET', '/v1/projects', e);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const gm = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
	_m = /^https?/;
async function ym(t) {
	if (t.config.emulator) return;
	const { authorizedDomains: e } = await mm(t);
	for (const n of e)
		try {
			if (vm(n)) return;
		} catch {}
	Oe(t, 'unauthorized-domain');
}
function vm(t) {
	const e = ds(),
		{ protocol: n, hostname: r } = new URL(e);
	if (t.startsWith('chrome-extension://')) {
		const o = new URL(t);
		return o.hostname === '' && r === ''
			? n === 'chrome-extension:' &&
					t.replace('chrome-extension://', '') === e.replace('chrome-extension://', '')
			: n === 'chrome-extension:' && o.hostname === r;
	}
	if (!_m.test(n)) return !1;
	if (gm.test(t)) return r === t;
	const i = t.replace(/\./g, '\\.');
	return new RegExp('^(.+\\.' + i + '|' + i + ')$', 'i').test(r);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Em = new Wn(3e4, 6e4);
function Oa() {
	const t = ke().___jsl;
	if (t != null && t.H) {
		for (const e of Object.keys(t.H))
			if (
				((t.H[e].r = t.H[e].r || []), (t.H[e].L = t.H[e].L || []), (t.H[e].r = [...t.H[e].L]), t.CP)
			)
				for (let n = 0; n < t.CP.length; n++) t.CP[n] = null;
	}
}
function Tm(t) {
	return new Promise((e, n) => {
		var r, i, s;
		function o() {
			Oa(),
				gapi.load('gapi.iframes', {
					callback: () => {
						e(gapi.iframes.getContext());
					},
					ontimeout: () => {
						Oa(), n(be(t, 'network-request-failed'));
					},
					timeout: Em.get()
				});
		}
		if (
			!(
				(i = (r = ke().gapi) === null || r === void 0 ? void 0 : r.iframes) === null || i === void 0
			) &&
			i.Iframe
		)
			e(gapi.iframes.getContext());
		else if (!((s = ke().gapi) === null || s === void 0) && s.load) o();
		else {
			const a = Sp('iframefcb');
			return (
				(ke()[a] = () => {
					gapi.load ? o() : n(be(t, 'network-request-failed'));
				}),
				Ap(`${Rp()}?onload=${a}`).catch((c) => n(c))
			);
		}
	}).catch((e) => {
		throw ((Cr = null), e);
	});
}
let Cr = null;
function Im(t) {
	return (Cr = Cr || Tm(t)), Cr;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wm = new Wn(5e3, 15e3),
	Am = '__/auth/iframe',
	Rm = 'emulator/auth/iframe',
	Sm = {
		style: { position: 'absolute', top: '-100px', width: '1px', height: '1px' },
		'aria-hidden': 'true',
		tabindex: '-1'
	},
	Pm = new Map([
		['identitytoolkit.googleapis.com', 'p'],
		['staging-identitytoolkit.sandbox.googleapis.com', 's'],
		['test-identitytoolkit.sandbox.googleapis.com', 't']
	]);
function Cm(t) {
	const e = t.config;
	S(e.authDomain, t, 'auth-domain-config-required');
	const n = e.emulator ? Hs(e, Rm) : `https://${t.config.authDomain}/${Am}`,
		r = { apiKey: e.apiKey, appName: t.name, v: St },
		i = Pm.get(t.config.apiHost);
	i && (r.eid = i);
	const s = t._getFrameworks();
	return s.length && (r.fw = s.join(',')), `${n}?${Hn(r).slice(1)}`;
}
async function bm(t) {
	const e = await Im(t),
		n = ke().gapi;
	return (
		S(n, t, 'internal-error'),
		e.open(
			{
				where: document.body,
				url: Cm(t),
				messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
				attributes: Sm,
				dontclear: !0
			},
			(r) =>
				new Promise(async (i, s) => {
					await r.restyle({ setHideOnLeave: !1 });
					const o = be(t, 'network-request-failed'),
						a = ke().setTimeout(() => {
							s(o);
						}, wm.get());
					function c() {
						ke().clearTimeout(a), i(r);
					}
					r.ping(c).then(c, () => {
						s(o);
					});
				})
		)
	);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const km = { location: 'yes', resizable: 'yes', statusbar: 'yes', toolbar: 'no' },
	Dm = 500,
	Nm = 600,
	Vm = '_blank',
	Om = 'http://localhost';
class La {
	constructor(e) {
		(this.window = e), (this.associatedEvent = null);
	}
	close() {
		if (this.window)
			try {
				this.window.close();
			} catch {}
	}
}
function Lm(t, e, n, r = Dm, i = Nm) {
	const s = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
		o = Math.max((window.screen.availWidth - r) / 2, 0).toString();
	let a = '';
	const c = Object.assign(Object.assign({}, km), {
			width: r.toString(),
			height: i.toString(),
			top: s,
			left: o
		}),
		u = K().toLowerCase();
	n && (a = du(u) ? Vm : n), hu(u) && ((e = e || Om), (c.scrollbars = 'yes'));
	const l = Object.entries(c).reduce((d, [f, E]) => `${d}${f}=${E},`, '');
	if (mp(u) && a !== '_self') return Mm(e || '', a), new La(null);
	const h = window.open(e || '', a, l);
	S(h, t, 'popup-blocked');
	try {
		h.focus();
	} catch {}
	return new La(h);
}
function Mm(t, e) {
	const n = document.createElement('a');
	(n.href = t), (n.target = e);
	const r = document.createEvent('MouseEvent');
	r.initMouseEvent('click', !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null),
		n.dispatchEvent(r);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const xm = '__/auth/handler',
	Um = 'emulator/auth/handler',
	Fm = encodeURIComponent('fac');
async function Ma(t, e, n, r, i, s) {
	S(t.config.authDomain, t, 'auth-domain-config-required'),
		S(t.config.apiKey, t, 'invalid-api-key');
	const o = {
		apiKey: t.config.apiKey,
		appName: t.name,
		authType: n,
		redirectUrl: r,
		v: St,
		eventId: i
	};
	if (e instanceof Xs) {
		e.setDefaultLanguage(t.languageCode),
			(o.providerId = e.providerId || ''),
			Md(e.getCustomParameters()) || (o.customParameters = JSON.stringify(e.getCustomParameters()));
		for (const [l, h] of Object.entries(s || {})) o[l] = h;
	}
	if (e instanceof Gn) {
		const l = e.getScopes().filter((h) => h !== '');
		l.length > 0 && (o.scopes = l.join(','));
	}
	t.tenantId && (o.tid = t.tenantId);
	const a = o;
	for (const l of Object.keys(a)) a[l] === void 0 && delete a[l];
	const c = await t._getAppCheckToken(),
		u = c ? `#${Fm}=${encodeURIComponent(c)}` : '';
	return `${Bm(t)}?${Hn(a).slice(1)}${u}`;
}
function Bm({ config: t }) {
	return t.emulator ? Hs(t, Um) : `https://${t.authDomain}/${xm}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Hi = 'webStorageSupport';
class jm {
	constructor() {
		(this.eventManagers = {}),
			(this.iframes = {}),
			(this.originValidationPromises = {}),
			(this._redirectPersistence = Ru),
			(this._completeRedirectFn = hm),
			(this._overrideRedirectResult = cm);
	}
	async _openPopup(e, n, r, i) {
		var s;
		qe(
			(s = this.eventManagers[e._key()]) === null || s === void 0 ? void 0 : s.manager,
			'_initialize() not called before _openPopup()'
		);
		const o = await Ma(e, n, r, ds(), i);
		return Lm(e, o, Js());
	}
	async _openRedirect(e, n, r, i) {
		await this._originValidation(e);
		const s = await Ma(e, n, r, ds(), i);
		return Hp(s), new Promise(() => {});
	}
	_initialize(e) {
		const n = e._key();
		if (this.eventManagers[n]) {
			const { manager: i, promise: s } = this.eventManagers[n];
			return i ? Promise.resolve(i) : (qe(s, 'If manager is not set, promise should be'), s);
		}
		const r = this.initAndGetManager(e);
		return (
			(this.eventManagers[n] = { promise: r }),
			r.catch(() => {
				delete this.eventManagers[n];
			}),
			r
		);
	}
	async initAndGetManager(e) {
		const n = await bm(e),
			r = new fm(e);
		return (
			n.register(
				'authEvent',
				(i) => (
					S(i == null ? void 0 : i.authEvent, e, 'invalid-auth-event'),
					{ status: r.onEvent(i.authEvent) ? 'ACK' : 'ERROR' }
				),
				gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
			),
			(this.eventManagers[e._key()] = { manager: r }),
			(this.iframes[e._key()] = n),
			r
		);
	}
	_isIframeWebStorageSupported(e, n) {
		this.iframes[e._key()].send(
			Hi,
			{ type: Hi },
			(i) => {
				var s;
				const o = (s = i == null ? void 0 : i[0]) === null || s === void 0 ? void 0 : s[Hi];
				o !== void 0 && n(!!o), Oe(e, 'internal-error');
			},
			gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
		);
	}
	_originValidation(e) {
		const n = e._key();
		return (
			this.originValidationPromises[n] || (this.originValidationPromises[n] = ym(e)),
			this.originValidationPromises[n]
		);
	}
	get _shouldInitProactively() {
		return _u() || Ks() || ri();
	}
}
const qm = jm;
var xa = '@firebase/auth',
	Ua = '1.6.1';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $m {
	constructor(e) {
		(this.auth = e), (this.internalListeners = new Map());
	}
	getUid() {
		var e;
		return (
			this.assertAuthConfigured(),
			((e = this.auth.currentUser) === null || e === void 0 ? void 0 : e.uid) || null
		);
	}
	async getToken(e) {
		return (
			this.assertAuthConfigured(),
			await this.auth._initializationPromise,
			this.auth.currentUser ? { accessToken: await this.auth.currentUser.getIdToken(e) } : null
		);
	}
	addAuthTokenListener(e) {
		if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
		const n = this.auth.onIdTokenChanged((r) => {
			e((r == null ? void 0 : r.stsTokenManager.accessToken) || null);
		});
		this.internalListeners.set(e, n), this.updateProactiveRefresh();
	}
	removeAuthTokenListener(e) {
		this.assertAuthConfigured();
		const n = this.internalListeners.get(e);
		n && (this.internalListeners.delete(e), n(), this.updateProactiveRefresh());
	}
	assertAuthConfigured() {
		S(this.auth._initializationPromise, 'dependent-sdk-initialized-before-auth');
	}
	updateProactiveRefresh() {
		this.internalListeners.size > 0
			? this.auth._startProactiveRefresh()
			: this.auth._stopProactiveRefresh();
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function zm(t) {
	switch (t) {
		case 'Node':
			return 'node';
		case 'ReactNative':
			return 'rn';
		case 'Worker':
			return 'webworker';
		case 'Cordova':
			return 'cordova';
		case 'WebExtension':
			return 'web-extension';
		default:
			return;
	}
}
function Hm(t) {
	Et(
		new nt(
			'auth',
			(e, { options: n }) => {
				const r = e.getProvider('app').getImmediate(),
					i = e.getProvider('heartbeat'),
					s = e.getProvider('app-check-internal'),
					{ apiKey: o, authDomain: a } = r.options;
				S(o && !o.includes(':'), 'invalid-api-key', { appName: r.name });
				const c = {
						apiKey: o,
						authDomain: a,
						clientPlatform: t,
						apiHost: 'identitytoolkit.googleapis.com',
						tokenApiHost: 'securetoken.googleapis.com',
						apiScheme: 'https',
						sdkClientVersion: yu(t)
					},
					u = new Ip(r, i, s, c);
				return Cp(u, n), u;
			},
			'PUBLIC'
		)
			.setInstantiationMode('EXPLICIT')
			.setInstanceCreatedCallback((e, n, r) => {
				e.getProvider('auth-internal').initialize();
			})
	),
		Et(
			new nt(
				'auth-internal',
				(e) => {
					const n = ii(e.getProvider('auth').getImmediate());
					return ((r) => new $m(r))(n);
				},
				'PRIVATE'
			).setInstantiationMode('EXPLICIT')
		),
		Ce(xa, Ua, zm(t)),
		Ce(xa, Ua, 'esm2017');
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Wm = 5 * 60,
	Gm = Qc('authIdTokenMaxAge') || Wm;
let Fa = null;
const Km = (t) => async (e) => {
	const n = e && (await e.getIdTokenResult()),
		r = n && (new Date().getTime() - Date.parse(n.issuedAtTime)) / 1e3;
	if (r && r > Gm) return;
	const i = n == null ? void 0 : n.token;
	Fa !== i &&
		((Fa = i),
		await fetch(t, {
			method: i ? 'POST' : 'DELETE',
			headers: i ? { Authorization: `Bearer ${i}` } : {}
		}));
};
function Qm(t = qs()) {
	const e = ni(t, 'auth');
	if (e.isInitialized()) return e.getImmediate();
	const n = Pp(t, { popupRedirectResolver: qm, persistence: [em, qp, Ru] }),
		r = Qc('authTokenSyncURL');
	if (r) {
		const s = Km(r);
		xp(n, s, () => s(n.currentUser)), Mp(n, (o) => s(o));
	}
	const i = Wc('auth');
	return i && bp(n, `http://${i}`), n;
}
function Xm() {
	var t, e;
	return (e =
		(t = document.getElementsByTagName('head')) === null || t === void 0 ? void 0 : t[0]) !==
		null && e !== void 0
		? e
		: document;
}
wp({
	loadJS(t) {
		return new Promise((e, n) => {
			const r = document.createElement('script');
			r.setAttribute('src', t),
				(r.onload = e),
				(r.onerror = (i) => {
					const s = be('internal-error');
					(s.customData = i), n(s);
				}),
				(r.type = 'text/javascript'),
				(r.charset = 'UTF-8'),
				Xm().appendChild(r);
		});
	},
	gapiScript: 'https://apis.google.com/js/api.js',
	recaptchaV2Script: 'https://www.google.com/recaptcha/api.js',
	recaptchaEnterpriseScript: 'https://www.google.com/recaptcha/enterprise.js?render='
});
Hm('Browser');
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Vu = 'firebasestorage.googleapis.com',
	Ou = 'storageBucket',
	Jm = 2 * 60 * 1e3,
	Ym = 10 * 60 * 1e3;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class z extends xe {
	constructor(e, n, r = 0) {
		super(Wi(e), `Firebase Storage: ${n} (${Wi(e)})`),
			(this.status_ = r),
			(this.customData = { serverResponse: null }),
			(this._baseMessage = this.message),
			Object.setPrototypeOf(this, z.prototype);
	}
	get status() {
		return this.status_;
	}
	set status(e) {
		this.status_ = e;
	}
	_codeEquals(e) {
		return Wi(e) === this.code;
	}
	get serverResponse() {
		return this.customData.serverResponse;
	}
	set serverResponse(e) {
		(this.customData.serverResponse = e),
			this.customData.serverResponse
				? (this.message = `${this._baseMessage}
${this.customData.serverResponse}`)
				: (this.message = this._baseMessage);
	}
}
var q;
(function (t) {
	(t.UNKNOWN = 'unknown'),
		(t.OBJECT_NOT_FOUND = 'object-not-found'),
		(t.BUCKET_NOT_FOUND = 'bucket-not-found'),
		(t.PROJECT_NOT_FOUND = 'project-not-found'),
		(t.QUOTA_EXCEEDED = 'quota-exceeded'),
		(t.UNAUTHENTICATED = 'unauthenticated'),
		(t.UNAUTHORIZED = 'unauthorized'),
		(t.UNAUTHORIZED_APP = 'unauthorized-app'),
		(t.RETRY_LIMIT_EXCEEDED = 'retry-limit-exceeded'),
		(t.INVALID_CHECKSUM = 'invalid-checksum'),
		(t.CANCELED = 'canceled'),
		(t.INVALID_EVENT_NAME = 'invalid-event-name'),
		(t.INVALID_URL = 'invalid-url'),
		(t.INVALID_DEFAULT_BUCKET = 'invalid-default-bucket'),
		(t.NO_DEFAULT_BUCKET = 'no-default-bucket'),
		(t.CANNOT_SLICE_BLOB = 'cannot-slice-blob'),
		(t.SERVER_FILE_WRONG_SIZE = 'server-file-wrong-size'),
		(t.NO_DOWNLOAD_URL = 'no-download-url'),
		(t.INVALID_ARGUMENT = 'invalid-argument'),
		(t.INVALID_ARGUMENT_COUNT = 'invalid-argument-count'),
		(t.APP_DELETED = 'app-deleted'),
		(t.INVALID_ROOT_OPERATION = 'invalid-root-operation'),
		(t.INVALID_FORMAT = 'invalid-format'),
		(t.INTERNAL_ERROR = 'internal-error'),
		(t.UNSUPPORTED_ENVIRONMENT = 'unsupported-environment');
})(q || (q = {}));
function Wi(t) {
	return 'storage/' + t;
}
function Zs() {
	const t = 'An unknown error occurred, please check the error payload for server response.';
	return new z(q.UNKNOWN, t);
}
function Zm(t) {
	return new z(q.OBJECT_NOT_FOUND, "Object '" + t + "' does not exist.");
}
function eg(t) {
	return new z(
		q.QUOTA_EXCEEDED,
		"Quota for bucket '" +
			t +
			"' exceeded, please view quota on https://firebase.google.com/pricing/."
	);
}
function tg() {
	const t =
		'User is not authenticated, please authenticate using Firebase Authentication and try again.';
	return new z(q.UNAUTHENTICATED, t);
}
function ng() {
	return new z(
		q.UNAUTHORIZED_APP,
		'This app does not have permission to access Firebase Storage on this project.'
	);
}
function rg(t) {
	return new z(q.UNAUTHORIZED, "User does not have permission to access '" + t + "'.");
}
function ig() {
	return new z(q.RETRY_LIMIT_EXCEEDED, 'Max retry time for operation exceeded, please try again.');
}
function sg() {
	return new z(q.CANCELED, 'User canceled the upload/download.');
}
function og(t) {
	return new z(q.INVALID_URL, "Invalid URL '" + t + "'.");
}
function ag(t) {
	return new z(q.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + t + "'.");
}
function cg() {
	return new z(
		q.NO_DEFAULT_BUCKET,
		"No default bucket found. Did you set the '" + Ou + "' property when initializing the app?"
	);
}
function ug() {
	return new z(q.CANNOT_SLICE_BLOB, 'Cannot slice blob for upload. Please retry the upload.');
}
function lg() {
	return new z(q.NO_DOWNLOAD_URL, 'The given file does not have any download URLs.');
}
function hg(t) {
	return new z(
		q.UNSUPPORTED_ENVIRONMENT,
		`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`
	);
}
function ps(t) {
	return new z(q.INVALID_ARGUMENT, t);
}
function Lu() {
	return new z(q.APP_DELETED, 'The Firebase app was deleted.');
}
function dg(t) {
	return new z(
		q.INVALID_ROOT_OPERATION,
		"The operation '" +
			t +
			"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png')."
	);
}
function Tn(t, e) {
	return new z(q.INVALID_FORMAT, "String does not match format '" + t + "': " + e);
}
function ln(t) {
	throw new z(q.INTERNAL_ERROR, 'Internal error: ' + t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class _e {
	constructor(e, n) {
		(this.bucket = e), (this.path_ = n);
	}
	get path() {
		return this.path_;
	}
	get isRoot() {
		return this.path.length === 0;
	}
	fullServerUrl() {
		const e = encodeURIComponent;
		return '/b/' + e(this.bucket) + '/o/' + e(this.path);
	}
	bucketOnlyServerUrl() {
		return '/b/' + encodeURIComponent(this.bucket) + '/o';
	}
	static makeFromBucketSpec(e, n) {
		let r;
		try {
			r = _e.makeFromUrl(e, n);
		} catch {
			return new _e(e, '');
		}
		if (r.path === '') return r;
		throw ag(e);
	}
	static makeFromUrl(e, n) {
		let r = null;
		const i = '([A-Za-z0-9.\\-_]+)';
		function s(M) {
			M.path.charAt(M.path.length - 1) === '/' && (M.path_ = M.path_.slice(0, -1));
		}
		const o = '(/(.*))?$',
			a = new RegExp('^gs://' + i + o, 'i'),
			c = { bucket: 1, path: 3 };
		function u(M) {
			M.path_ = decodeURIComponent(M.path);
		}
		const l = 'v[A-Za-z0-9_]+',
			h = n.replace(/[.]/g, '\\.'),
			d = '(/([^?#]*).*)?$',
			f = new RegExp(`^https?://${h}/${l}/b/${i}/o${d}`, 'i'),
			E = { bucket: 1, path: 3 },
			I = n === Vu ? '(?:storage.googleapis.com|storage.cloud.google.com)' : n,
			v = '([^?#]*)',
			k = new RegExp(`^https?://${I}/${i}/${v}`, 'i'),
			L = [
				{ regex: a, indices: c, postModify: s },
				{ regex: f, indices: E, postModify: u },
				{ regex: k, indices: { bucket: 1, path: 2 }, postModify: u }
			];
		for (let M = 0; M < L.length; M++) {
			const Ee = L[M],
				fe = Ee.regex.exec(e);
			if (fe) {
				const Ue = fe[Ee.indices.bucket];
				let Nt = fe[Ee.indices.path];
				Nt || (Nt = ''), (r = new _e(Ue, Nt)), Ee.postModify(r);
				break;
			}
		}
		if (r == null) throw og(e);
		return r;
	}
}
class fg {
	constructor(e) {
		this.promise_ = Promise.reject(e);
	}
	getPromise() {
		return this.promise_;
	}
	cancel(e = !1) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function pg(t, e, n) {
	let r = 1,
		i = null,
		s = null,
		o = !1,
		a = 0;
	function c() {
		return a === 2;
	}
	let u = !1;
	function l(...v) {
		u || ((u = !0), e.apply(null, v));
	}
	function h(v) {
		i = setTimeout(() => {
			(i = null), t(f, c());
		}, v);
	}
	function d() {
		s && clearTimeout(s);
	}
	function f(v, ...k) {
		if (u) {
			d();
			return;
		}
		if (v) {
			d(), l.call(null, v, ...k);
			return;
		}
		if (c() || o) {
			d(), l.call(null, v, ...k);
			return;
		}
		r < 64 && (r *= 2);
		let L;
		a === 1 ? ((a = 2), (L = 0)) : (L = (r + Math.random()) * 1e3), h(L);
	}
	let E = !1;
	function I(v) {
		E || ((E = !0), d(), !u && (i !== null ? (v || (a = 2), clearTimeout(i), h(0)) : v || (a = 1)));
	}
	return (
		h(0),
		(s = setTimeout(() => {
			(o = !0), I(!0);
		}, n)),
		I
	);
}
function mg(t) {
	t(!1);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function gg(t) {
	return t !== void 0;
}
function _g(t) {
	return typeof t == 'object' && !Array.isArray(t);
}
function eo(t) {
	return typeof t == 'string' || t instanceof String;
}
function Ba(t) {
	return to() && t instanceof Blob;
}
function to() {
	return typeof Blob < 'u';
}
function ja(t, e, n, r) {
	if (r < e) throw ps(`Invalid value for '${t}'. Expected ${e} or greater.`);
	if (r > n) throw ps(`Invalid value for '${t}'. Expected ${n} or less.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ai(t, e, n) {
	let r = e;
	return n == null && (r = `https://${e}`), `${n}://${r}/v0${t}`;
}
function Mu(t) {
	const e = encodeURIComponent;
	let n = '?';
	for (const r in t)
		if (t.hasOwnProperty(r)) {
			const i = e(r) + '=' + e(t[r]);
			n = n + i + '&';
		}
	return (n = n.slice(0, -1)), n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var _t;
(function (t) {
	(t[(t.NO_ERROR = 0)] = 'NO_ERROR'),
		(t[(t.NETWORK_ERROR = 1)] = 'NETWORK_ERROR'),
		(t[(t.ABORT = 2)] = 'ABORT');
})(_t || (_t = {}));
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function yg(t, e) {
	const n = t >= 500 && t < 600,
		i = [408, 429].indexOf(t) !== -1,
		s = e.indexOf(t) !== -1;
	return n || i || s;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vg {
	constructor(e, n, r, i, s, o, a, c, u, l, h, d = !0) {
		(this.url_ = e),
			(this.method_ = n),
			(this.headers_ = r),
			(this.body_ = i),
			(this.successCodes_ = s),
			(this.additionalRetryCodes_ = o),
			(this.callback_ = a),
			(this.errorCallback_ = c),
			(this.timeout_ = u),
			(this.progressCallback_ = l),
			(this.connectionFactory_ = h),
			(this.retry = d),
			(this.pendingConnection_ = null),
			(this.backoffId_ = null),
			(this.canceled_ = !1),
			(this.appDelete_ = !1),
			(this.promise_ = new Promise((f, E) => {
				(this.resolve_ = f), (this.reject_ = E), this.start_();
			}));
	}
	start_() {
		const e = (r, i) => {
				if (i) {
					r(!1, new mr(!1, null, !0));
					return;
				}
				const s = this.connectionFactory_();
				this.pendingConnection_ = s;
				const o = (a) => {
					const c = a.loaded,
						u = a.lengthComputable ? a.total : -1;
					this.progressCallback_ !== null && this.progressCallback_(c, u);
				};
				this.progressCallback_ !== null && s.addUploadProgressListener(o),
					s.send(this.url_, this.method_, this.body_, this.headers_).then(() => {
						this.progressCallback_ !== null && s.removeUploadProgressListener(o),
							(this.pendingConnection_ = null);
						const a = s.getErrorCode() === _t.NO_ERROR,
							c = s.getStatus();
						if (!a || (yg(c, this.additionalRetryCodes_) && this.retry)) {
							const l = s.getErrorCode() === _t.ABORT;
							r(!1, new mr(!1, null, l));
							return;
						}
						const u = this.successCodes_.indexOf(c) !== -1;
						r(!0, new mr(u, s));
					});
			},
			n = (r, i) => {
				const s = this.resolve_,
					o = this.reject_,
					a = i.connection;
				if (i.wasSuccessCode)
					try {
						const c = this.callback_(a, a.getResponse());
						gg(c) ? s(c) : s();
					} catch (c) {
						o(c);
					}
				else if (a !== null) {
					const c = Zs();
					(c.serverResponse = a.getErrorText()),
						this.errorCallback_ ? o(this.errorCallback_(a, c)) : o(c);
				} else if (i.canceled) {
					const c = this.appDelete_ ? Lu() : sg();
					o(c);
				} else {
					const c = ig();
					o(c);
				}
			};
		this.canceled_ ? n(!1, new mr(!1, null, !0)) : (this.backoffId_ = pg(e, n, this.timeout_));
	}
	getPromise() {
		return this.promise_;
	}
	cancel(e) {
		(this.canceled_ = !0),
			(this.appDelete_ = e || !1),
			this.backoffId_ !== null && mg(this.backoffId_),
			this.pendingConnection_ !== null && this.pendingConnection_.abort();
	}
}
class mr {
	constructor(e, n, r) {
		(this.wasSuccessCode = e), (this.connection = n), (this.canceled = !!r);
	}
}
function Eg(t, e) {
	e !== null && e.length > 0 && (t.Authorization = 'Firebase ' + e);
}
function Tg(t, e) {
	t['X-Firebase-Storage-Version'] = 'webjs/' + (e ?? 'AppManager');
}
function Ig(t, e) {
	e && (t['X-Firebase-GMPID'] = e);
}
function wg(t, e) {
	e !== null && (t['X-Firebase-AppCheck'] = e);
}
function Ag(t, e, n, r, i, s, o = !0) {
	const a = Mu(t.urlParams),
		c = t.url + a,
		u = Object.assign({}, t.headers);
	return (
		Ig(u, e),
		Eg(u, n),
		Tg(u, s),
		wg(u, r),
		new vg(
			c,
			t.method,
			u,
			t.body,
			t.successCodes,
			t.additionalRetryCodes,
			t.handler,
			t.errorHandler,
			t.timeout,
			t.progressCallback,
			i,
			o
		)
	);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Rg() {
	return typeof BlobBuilder < 'u'
		? BlobBuilder
		: typeof WebKitBlobBuilder < 'u'
			? WebKitBlobBuilder
			: void 0;
}
function Sg(...t) {
	const e = Rg();
	if (e !== void 0) {
		const n = new e();
		for (let r = 0; r < t.length; r++) n.append(t[r]);
		return n.getBlob();
	} else {
		if (to()) return new Blob(t);
		throw new z(q.UNSUPPORTED_ENVIRONMENT, "This browser doesn't seem to support creating Blobs");
	}
}
function Pg(t, e, n) {
	return t.webkitSlice
		? t.webkitSlice(e, n)
		: t.mozSlice
			? t.mozSlice(e, n)
			: t.slice
				? t.slice(e, n)
				: null;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Cg(t) {
	if (typeof atob > 'u') throw hg('base-64');
	return atob(t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Re = { RAW: 'raw', BASE64: 'base64', BASE64URL: 'base64url', DATA_URL: 'data_url' };
class Gi {
	constructor(e, n) {
		(this.data = e), (this.contentType = n || null);
	}
}
function bg(t, e) {
	switch (t) {
		case Re.RAW:
			return new Gi(xu(e));
		case Re.BASE64:
		case Re.BASE64URL:
			return new Gi(Uu(t, e));
		case Re.DATA_URL:
			return new Gi(Dg(e), Ng(e));
	}
	throw Zs();
}
function xu(t) {
	const e = [];
	for (let n = 0; n < t.length; n++) {
		let r = t.charCodeAt(n);
		if (r <= 127) e.push(r);
		else if (r <= 2047) e.push(192 | (r >> 6), 128 | (r & 63));
		else if ((r & 64512) === 55296)
			if (!(n < t.length - 1 && (t.charCodeAt(n + 1) & 64512) === 56320)) e.push(239, 191, 189);
			else {
				const s = r,
					o = t.charCodeAt(++n);
				(r = 65536 | ((s & 1023) << 10) | (o & 1023)),
					e.push(240 | (r >> 18), 128 | ((r >> 12) & 63), 128 | ((r >> 6) & 63), 128 | (r & 63));
			}
		else
			(r & 64512) === 56320
				? e.push(239, 191, 189)
				: e.push(224 | (r >> 12), 128 | ((r >> 6) & 63), 128 | (r & 63));
	}
	return new Uint8Array(e);
}
function kg(t) {
	let e;
	try {
		e = decodeURIComponent(t);
	} catch {
		throw Tn(Re.DATA_URL, 'Malformed data URL.');
	}
	return xu(e);
}
function Uu(t, e) {
	switch (t) {
		case Re.BASE64: {
			const i = e.indexOf('-') !== -1,
				s = e.indexOf('_') !== -1;
			if (i || s)
				throw Tn(t, "Invalid character '" + (i ? '-' : '_') + "' found: is it base64url encoded?");
			break;
		}
		case Re.BASE64URL: {
			const i = e.indexOf('+') !== -1,
				s = e.indexOf('/') !== -1;
			if (i || s)
				throw Tn(t, "Invalid character '" + (i ? '+' : '/') + "' found: is it base64 encoded?");
			e = e.replace(/-/g, '+').replace(/_/g, '/');
			break;
		}
	}
	let n;
	try {
		n = Cg(e);
	} catch (i) {
		throw i.message.includes('polyfill') ? i : Tn(t, 'Invalid character found');
	}
	const r = new Uint8Array(n.length);
	for (let i = 0; i < n.length; i++) r[i] = n.charCodeAt(i);
	return r;
}
class Fu {
	constructor(e) {
		(this.base64 = !1), (this.contentType = null);
		const n = e.match(/^data:([^,]+)?,/);
		if (n === null) throw Tn(Re.DATA_URL, "Must be formatted 'data:[<mediatype>][;base64],<data>");
		const r = n[1] || null;
		r != null &&
			((this.base64 = Vg(r, ';base64')),
			(this.contentType = this.base64 ? r.substring(0, r.length - 7) : r)),
			(this.rest = e.substring(e.indexOf(',') + 1));
	}
}
function Dg(t) {
	const e = new Fu(t);
	return e.base64 ? Uu(Re.BASE64, e.rest) : kg(e.rest);
}
function Ng(t) {
	return new Fu(t).contentType;
}
function Vg(t, e) {
	return t.length >= e.length ? t.substring(t.length - e.length) === e : !1;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Je {
	constructor(e, n) {
		let r = 0,
			i = '';
		Ba(e)
			? ((this.data_ = e), (r = e.size), (i = e.type))
			: e instanceof ArrayBuffer
				? (n
						? (this.data_ = new Uint8Array(e))
						: ((this.data_ = new Uint8Array(e.byteLength)), this.data_.set(new Uint8Array(e))),
					(r = this.data_.length))
				: e instanceof Uint8Array &&
					(n ? (this.data_ = e) : ((this.data_ = new Uint8Array(e.length)), this.data_.set(e)),
					(r = e.length)),
			(this.size_ = r),
			(this.type_ = i);
	}
	size() {
		return this.size_;
	}
	type() {
		return this.type_;
	}
	slice(e, n) {
		if (Ba(this.data_)) {
			const r = this.data_,
				i = Pg(r, e, n);
			return i === null ? null : new Je(i);
		} else {
			const r = new Uint8Array(this.data_.buffer, e, n - e);
			return new Je(r, !0);
		}
	}
	static getBlob(...e) {
		if (to()) {
			const n = e.map((r) => (r instanceof Je ? r.data_ : r));
			return new Je(Sg.apply(null, n));
		} else {
			const n = e.map((o) => (eo(o) ? bg(Re.RAW, o).data : o.data_));
			let r = 0;
			n.forEach((o) => {
				r += o.byteLength;
			});
			const i = new Uint8Array(r);
			let s = 0;
			return (
				n.forEach((o) => {
					for (let a = 0; a < o.length; a++) i[s++] = o[a];
				}),
				new Je(i, !0)
			);
		}
	}
	uploadData() {
		return this.data_;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Bu(t) {
	let e;
	try {
		e = JSON.parse(t);
	} catch {
		return null;
	}
	return _g(e) ? e : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Og(t) {
	if (t.length === 0) return null;
	const e = t.lastIndexOf('/');
	return e === -1 ? '' : t.slice(0, e);
}
function Lg(t, e) {
	const n = e
		.split('/')
		.filter((r) => r.length > 0)
		.join('/');
	return t.length === 0 ? n : t + '/' + n;
}
function ju(t) {
	const e = t.lastIndexOf('/', t.length - 2);
	return e === -1 ? t : t.slice(e + 1);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Mg(t, e) {
	return e;
}
class he {
	constructor(e, n, r, i) {
		(this.server = e), (this.local = n || e), (this.writable = !!r), (this.xform = i || Mg);
	}
}
let gr = null;
function xg(t) {
	return !eo(t) || t.length < 2 ? t : ju(t);
}
function qu() {
	if (gr) return gr;
	const t = [];
	t.push(new he('bucket')),
		t.push(new he('generation')),
		t.push(new he('metageneration')),
		t.push(new he('name', 'fullPath', !0));
	function e(s, o) {
		return xg(o);
	}
	const n = new he('name');
	(n.xform = e), t.push(n);
	function r(s, o) {
		return o !== void 0 ? Number(o) : o;
	}
	const i = new he('size');
	return (
		(i.xform = r),
		t.push(i),
		t.push(new he('timeCreated')),
		t.push(new he('updated')),
		t.push(new he('md5Hash', null, !0)),
		t.push(new he('cacheControl', null, !0)),
		t.push(new he('contentDisposition', null, !0)),
		t.push(new he('contentEncoding', null, !0)),
		t.push(new he('contentLanguage', null, !0)),
		t.push(new he('contentType', null, !0)),
		t.push(new he('metadata', 'customMetadata', !0)),
		(gr = t),
		gr
	);
}
function Ug(t, e) {
	function n() {
		const r = t.bucket,
			i = t.fullPath,
			s = new _e(r, i);
		return e._makeStorageReference(s);
	}
	Object.defineProperty(t, 'ref', { get: n });
}
function Fg(t, e, n) {
	const r = {};
	r.type = 'file';
	const i = n.length;
	for (let s = 0; s < i; s++) {
		const o = n[s];
		r[o.local] = o.xform(r, e[o.server]);
	}
	return Ug(r, t), r;
}
function $u(t, e, n) {
	const r = Bu(e);
	return r === null ? null : Fg(t, r, n);
}
function Bg(t, e, n, r) {
	const i = Bu(e);
	if (i === null || !eo(i.downloadTokens)) return null;
	const s = i.downloadTokens;
	if (s.length === 0) return null;
	const o = encodeURIComponent;
	return s.split(',').map((u) => {
		const l = t.bucket,
			h = t.fullPath,
			d = '/b/' + o(l) + '/o/' + o(h),
			f = ai(d, n, r),
			E = Mu({ alt: 'media', token: u });
		return f + E;
	})[0];
}
function jg(t, e) {
	const n = {},
		r = e.length;
	for (let i = 0; i < r; i++) {
		const s = e[i];
		s.writable && (n[s.server] = t[s.local]);
	}
	return JSON.stringify(n);
}
class no {
	constructor(e, n, r, i) {
		(this.url = e),
			(this.method = n),
			(this.handler = r),
			(this.timeout = i),
			(this.urlParams = {}),
			(this.headers = {}),
			(this.body = null),
			(this.errorHandler = null),
			(this.progressCallback = null),
			(this.successCodes = [200]),
			(this.additionalRetryCodes = []);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function zu(t) {
	if (!t) throw Zs();
}
function qg(t, e) {
	function n(r, i) {
		const s = $u(t, i, e);
		return zu(s !== null), s;
	}
	return n;
}
function $g(t, e) {
	function n(r, i) {
		const s = $u(t, i, e);
		return zu(s !== null), Bg(s, i, t.host, t._protocol);
	}
	return n;
}
function Hu(t) {
	function e(n, r) {
		let i;
		return (
			n.getStatus() === 401
				? n.getErrorText().includes('Firebase App Check token is invalid')
					? (i = ng())
					: (i = tg())
				: n.getStatus() === 402
					? (i = eg(t.bucket))
					: n.getStatus() === 403
						? (i = rg(t.path))
						: (i = r),
			(i.status = n.getStatus()),
			(i.serverResponse = r.serverResponse),
			i
		);
	}
	return e;
}
function Wu(t) {
	const e = Hu(t);
	function n(r, i) {
		let s = e(r, i);
		return r.getStatus() === 404 && (s = Zm(t.path)), (s.serverResponse = i.serverResponse), s;
	}
	return n;
}
function zg(t, e, n) {
	const r = e.fullServerUrl(),
		i = ai(r, t.host, t._protocol),
		s = 'GET',
		o = t.maxOperationRetryTime,
		a = new no(i, s, $g(t, n), o);
	return (a.errorHandler = Wu(e)), a;
}
function Hg(t, e) {
	const n = e.fullServerUrl(),
		r = ai(n, t.host, t._protocol),
		i = 'DELETE',
		s = t.maxOperationRetryTime;
	function o(c, u) {}
	const a = new no(r, i, o, s);
	return (a.successCodes = [200, 204]), (a.errorHandler = Wu(e)), a;
}
function Wg(t, e) {
	return (t && t.contentType) || (e && e.type()) || 'application/octet-stream';
}
function Gg(t, e, n) {
	const r = Object.assign({}, n);
	return (
		(r.fullPath = t.path), (r.size = e.size()), r.contentType || (r.contentType = Wg(null, e)), r
	);
}
function Kg(t, e, n, r, i) {
	const s = e.bucketOnlyServerUrl(),
		o = { 'X-Goog-Upload-Protocol': 'multipart' };
	function a() {
		let L = '';
		for (let M = 0; M < 2; M++) L = L + Math.random().toString().slice(2);
		return L;
	}
	const c = a();
	o['Content-Type'] = 'multipart/related; boundary=' + c;
	const u = Gg(e, r, i),
		l = jg(u, n),
		h =
			'--' +
			c +
			`\r
Content-Type: application/json; charset=utf-8\r
\r
` +
			l +
			`\r
--` +
			c +
			`\r
Content-Type: ` +
			u.contentType +
			`\r
\r
`,
		d =
			`\r
--` +
			c +
			'--',
		f = Je.getBlob(h, r, d);
	if (f === null) throw ug();
	const E = { name: u.fullPath },
		I = ai(s, t.host, t._protocol),
		v = 'POST',
		k = t.maxUploadRetryTime,
		O = new no(I, v, qg(t, n), k);
	return (O.urlParams = E), (O.headers = o), (O.body = f.uploadData()), (O.errorHandler = Hu(e)), O;
}
class Qg {
	constructor() {
		(this.sent_ = !1),
			(this.xhr_ = new XMLHttpRequest()),
			this.initXhr(),
			(this.errorCode_ = _t.NO_ERROR),
			(this.sendPromise_ = new Promise((e) => {
				this.xhr_.addEventListener('abort', () => {
					(this.errorCode_ = _t.ABORT), e();
				}),
					this.xhr_.addEventListener('error', () => {
						(this.errorCode_ = _t.NETWORK_ERROR), e();
					}),
					this.xhr_.addEventListener('load', () => {
						e();
					});
			}));
	}
	send(e, n, r, i) {
		if (this.sent_) throw ln('cannot .send() more than once');
		if (((this.sent_ = !0), this.xhr_.open(n, e, !0), i !== void 0))
			for (const s in i) i.hasOwnProperty(s) && this.xhr_.setRequestHeader(s, i[s].toString());
		return r !== void 0 ? this.xhr_.send(r) : this.xhr_.send(), this.sendPromise_;
	}
	getErrorCode() {
		if (!this.sent_) throw ln('cannot .getErrorCode() before sending');
		return this.errorCode_;
	}
	getStatus() {
		if (!this.sent_) throw ln('cannot .getStatus() before sending');
		try {
			return this.xhr_.status;
		} catch {
			return -1;
		}
	}
	getResponse() {
		if (!this.sent_) throw ln('cannot .getResponse() before sending');
		return this.xhr_.response;
	}
	getErrorText() {
		if (!this.sent_) throw ln('cannot .getErrorText() before sending');
		return this.xhr_.statusText;
	}
	abort() {
		this.xhr_.abort();
	}
	getResponseHeader(e) {
		return this.xhr_.getResponseHeader(e);
	}
	addUploadProgressListener(e) {
		this.xhr_.upload != null && this.xhr_.upload.addEventListener('progress', e);
	}
	removeUploadProgressListener(e) {
		this.xhr_.upload != null && this.xhr_.upload.removeEventListener('progress', e);
	}
}
class Xg extends Qg {
	initXhr() {
		this.xhr_.responseType = 'text';
	}
}
function ro() {
	return new Xg();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class It {
	constructor(e, n) {
		(this._service = e),
			n instanceof _e ? (this._location = n) : (this._location = _e.makeFromUrl(n, e.host));
	}
	toString() {
		return 'gs://' + this._location.bucket + '/' + this._location.path;
	}
	_newRef(e, n) {
		return new It(e, n);
	}
	get root() {
		const e = new _e(this._location.bucket, '');
		return this._newRef(this._service, e);
	}
	get bucket() {
		return this._location.bucket;
	}
	get fullPath() {
		return this._location.path;
	}
	get name() {
		return ju(this._location.path);
	}
	get storage() {
		return this._service;
	}
	get parent() {
		const e = Og(this._location.path);
		if (e === null) return null;
		const n = new _e(this._location.bucket, e);
		return new It(this._service, n);
	}
	_throwIfRoot(e) {
		if (this._location.path === '') throw dg(e);
	}
}
function Jg(t, e, n) {
	t._throwIfRoot('uploadBytes');
	const r = Kg(t.storage, t._location, qu(), new Je(e, !0), n);
	return t.storage.makeRequestWithTokens(r, ro).then((i) => ({ metadata: i, ref: t }));
}
function Yg(t) {
	t._throwIfRoot('getDownloadURL');
	const e = zg(t.storage, t._location, qu());
	return t.storage.makeRequestWithTokens(e, ro).then((n) => {
		if (n === null) throw lg();
		return n;
	});
}
function Zg(t) {
	t._throwIfRoot('deleteObject');
	const e = Hg(t.storage, t._location);
	return t.storage.makeRequestWithTokens(e, ro);
}
function e_(t, e) {
	const n = Lg(t._location.path, e),
		r = new _e(t._location.bucket, n);
	return new It(t.storage, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function t_(t) {
	return /^[A-Za-z]+:\/\//.test(t);
}
function n_(t, e) {
	return new It(t, e);
}
function Gu(t, e) {
	if (t instanceof io) {
		const n = t;
		if (n._bucket == null) throw cg();
		const r = new It(n, n._bucket);
		return e != null ? Gu(r, e) : r;
	} else return e !== void 0 ? e_(t, e) : t;
}
function r_(t, e) {
	if (e && t_(e)) {
		if (t instanceof io) return n_(t, e);
		throw ps('To use ref(service, url), the first argument must be a Storage instance.');
	} else return Gu(t, e);
}
function qa(t, e) {
	const n = e == null ? void 0 : e[Ou];
	return n == null ? null : _e.makeFromBucketSpec(n, t);
}
function i_(t, e, n, r = {}) {
	(t.host = `${e}:${n}`), (t._protocol = 'http');
	const { mockUserToken: i } = r;
	i && (t._overrideAuthToken = typeof i == 'string' ? i : Xc(i, t.app.options.projectId));
}
class io {
	constructor(e, n, r, i, s) {
		(this.app = e),
			(this._authProvider = n),
			(this._appCheckProvider = r),
			(this._url = i),
			(this._firebaseVersion = s),
			(this._bucket = null),
			(this._host = Vu),
			(this._protocol = 'https'),
			(this._appId = null),
			(this._deleted = !1),
			(this._maxOperationRetryTime = Jm),
			(this._maxUploadRetryTime = Ym),
			(this._requests = new Set()),
			i != null
				? (this._bucket = _e.makeFromBucketSpec(i, this._host))
				: (this._bucket = qa(this._host, this.app.options));
	}
	get host() {
		return this._host;
	}
	set host(e) {
		(this._host = e),
			this._url != null
				? (this._bucket = _e.makeFromBucketSpec(this._url, e))
				: (this._bucket = qa(e, this.app.options));
	}
	get maxUploadRetryTime() {
		return this._maxUploadRetryTime;
	}
	set maxUploadRetryTime(e) {
		ja('time', 0, Number.POSITIVE_INFINITY, e), (this._maxUploadRetryTime = e);
	}
	get maxOperationRetryTime() {
		return this._maxOperationRetryTime;
	}
	set maxOperationRetryTime(e) {
		ja('time', 0, Number.POSITIVE_INFINITY, e), (this._maxOperationRetryTime = e);
	}
	async _getAuthToken() {
		if (this._overrideAuthToken) return this._overrideAuthToken;
		const e = this._authProvider.getImmediate({ optional: !0 });
		if (e) {
			const n = await e.getToken();
			if (n !== null) return n.accessToken;
		}
		return null;
	}
	async _getAppCheckToken() {
		const e = this._appCheckProvider.getImmediate({ optional: !0 });
		return e ? (await e.getToken()).token : null;
	}
	_delete() {
		return (
			this._deleted ||
				((this._deleted = !0), this._requests.forEach((e) => e.cancel()), this._requests.clear()),
			Promise.resolve()
		);
	}
	_makeStorageReference(e) {
		return new It(this, e);
	}
	_makeRequest(e, n, r, i, s = !0) {
		if (this._deleted) return new fg(Lu());
		{
			const o = Ag(e, this._appId, r, i, n, this._firebaseVersion, s);
			return (
				this._requests.add(o),
				o.getPromise().then(
					() => this._requests.delete(o),
					() => this._requests.delete(o)
				),
				o
			);
		}
	}
	async makeRequestWithTokens(e, n) {
		const [r, i] = await Promise.all([this._getAuthToken(), this._getAppCheckToken()]);
		return this._makeRequest(e, n, r, i).getPromise();
	}
}
const $a = '@firebase/storage',
	za = '0.12.2';
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ku = 'storage';
function yT(t, e, n) {
	return (t = B(t)), Jg(t, e, n);
}
function vT(t) {
	return (t = B(t)), Yg(t);
}
function ET(t) {
	return (t = B(t)), Zg(t);
}
function TT(t, e) {
	return (t = B(t)), r_(t, e);
}
function s_(t = qs(), e) {
	t = B(t);
	const r = ni(t, Ku).getImmediate({ identifier: e }),
		i = Gc('storage');
	return i && o_(r, ...i), r;
}
function o_(t, e, n, r = {}) {
	i_(t, e, n, r);
}
function a_(t, { instanceIdentifier: e }) {
	const n = t.getProvider('app').getImmediate(),
		r = t.getProvider('auth-internal'),
		i = t.getProvider('app-check-internal');
	return new io(n, r, i, e, St);
}
function c_() {
	Et(new nt(Ku, a_, 'PUBLIC').setMultipleInstances(!0)), Ce($a, za, ''), Ce($a, za, 'esm2017');
}
c_();
var u_ =
		typeof globalThis < 'u'
			? globalThis
			: typeof window < 'u'
				? window
				: typeof global < 'u'
					? global
					: typeof self < 'u'
						? self
						: {},
	_,
	so = so || {},
	A = u_ || self;
function ci(t) {
	var e = typeof t;
	return (
		(e = e != 'object' ? e : t ? (Array.isArray(t) ? 'array' : e) : 'null'),
		e == 'array' || (e == 'object' && typeof t.length == 'number')
	);
}
function Qn(t) {
	var e = typeof t;
	return (e == 'object' && t != null) || e == 'function';
}
function l_(t) {
	return (Object.prototype.hasOwnProperty.call(t, Ki) && t[Ki]) || (t[Ki] = ++h_);
}
var Ki = 'closure_uid_' + ((1e9 * Math.random()) >>> 0),
	h_ = 0;
function d_(t, e, n) {
	return t.call.apply(t.bind, arguments);
}
function f_(t, e, n) {
	if (!t) throw Error();
	if (2 < arguments.length) {
		var r = Array.prototype.slice.call(arguments, 2);
		return function () {
			var i = Array.prototype.slice.call(arguments);
			return Array.prototype.unshift.apply(i, r), t.apply(e, i);
		};
	}
	return function () {
		return t.apply(e, arguments);
	};
}
function ae(t, e, n) {
	return (
		Function.prototype.bind && Function.prototype.bind.toString().indexOf('native code') != -1
			? (ae = d_)
			: (ae = f_),
		ae.apply(null, arguments)
	);
}
function _r(t, e) {
	var n = Array.prototype.slice.call(arguments, 1);
	return function () {
		var r = n.slice();
		return r.push.apply(r, arguments), t.apply(this, r);
	};
}
function Y(t, e) {
	function n() {}
	(n.prototype = e.prototype),
		(t.$ = e.prototype),
		(t.prototype = new n()),
		(t.prototype.constructor = t),
		(t.ac = function (r, i, s) {
			for (var o = Array(arguments.length - 2), a = 2; a < arguments.length; a++)
				o[a - 2] = arguments[a];
			return e.prototype[i].apply(r, o);
		});
}
function ot() {
	(this.s = this.s), (this.o = this.o);
}
var p_ = 0;
ot.prototype.s = !1;
ot.prototype.sa = function () {
	!this.s && ((this.s = !0), this.N(), p_ != 0) && l_(this);
};
ot.prototype.N = function () {
	if (this.o) for (; this.o.length; ) this.o.shift()();
};
const Qu = Array.prototype.indexOf
	? function (t, e) {
			return Array.prototype.indexOf.call(t, e, void 0);
		}
	: function (t, e) {
			if (typeof t == 'string') return typeof e != 'string' || e.length != 1 ? -1 : t.indexOf(e, 0);
			for (let n = 0; n < t.length; n++) if (n in t && t[n] === e) return n;
			return -1;
		};
function oo(t) {
	const e = t.length;
	if (0 < e) {
		const n = Array(e);
		for (let r = 0; r < e; r++) n[r] = t[r];
		return n;
	}
	return [];
}
function Ha(t, e) {
	for (let n = 1; n < arguments.length; n++) {
		const r = arguments[n];
		if (ci(r)) {
			const i = t.length || 0,
				s = r.length || 0;
			t.length = i + s;
			for (let o = 0; o < s; o++) t[i + o] = r[o];
		} else t.push(r);
	}
}
function ce(t, e) {
	(this.type = t), (this.g = this.target = e), (this.defaultPrevented = !1);
}
ce.prototype.h = function () {
	this.defaultPrevented = !0;
};
var m_ = (function () {
	if (!A.addEventListener || !Object.defineProperty) return !1;
	var t = !1,
		e = Object.defineProperty({}, 'passive', {
			get: function () {
				t = !0;
			}
		});
	try {
		const n = () => {};
		A.addEventListener('test', n, e), A.removeEventListener('test', n, e);
	} catch {}
	return t;
})();
function Dn(t) {
	return /^[\s\xa0]*$/.test(t);
}
function ui() {
	var t = A.navigator;
	return t && (t = t.userAgent) ? t : '';
}
function Ae(t) {
	return ui().indexOf(t) != -1;
}
function ao(t) {
	return ao[' '](t), t;
}
ao[' '] = function () {};
function g_(t, e) {
	var n = cy;
	return Object.prototype.hasOwnProperty.call(n, t) ? n[t] : (n[t] = e(t));
}
var __ = Ae('Opera'),
	Ht = Ae('Trident') || Ae('MSIE'),
	Xu = Ae('Edge'),
	ms = Xu || Ht,
	Ju =
		Ae('Gecko') &&
		!(ui().toLowerCase().indexOf('webkit') != -1 && !Ae('Edge')) &&
		!(Ae('Trident') || Ae('MSIE')) &&
		!Ae('Edge'),
	y_ = ui().toLowerCase().indexOf('webkit') != -1 && !Ae('Edge');
function Yu() {
	var t = A.document;
	return t ? t.documentMode : void 0;
}
var gs;
e: {
	var Qi = '',
		Xi = (function () {
			var t = ui();
			if (Ju) return /rv:([^\);]+)(\)|;)/.exec(t);
			if (Xu) return /Edge\/([\d\.]+)/.exec(t);
			if (Ht) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);
			if (y_) return /WebKit\/(\S+)/.exec(t);
			if (__) return /(?:Version)[ \/]?(\S+)/.exec(t);
		})();
	if ((Xi && (Qi = Xi ? Xi[1] : ''), Ht)) {
		var Ji = Yu();
		if (Ji != null && Ji > parseFloat(Qi)) {
			gs = String(Ji);
			break e;
		}
	}
	gs = Qi;
}
var _s;
if (A.document && Ht) {
	var Wa = Yu();
	_s = Wa || parseInt(gs, 10) || void 0;
} else _s = void 0;
var v_ = _s;
function Nn(t, e) {
	if (
		(ce.call(this, t ? t.type : ''),
		(this.relatedTarget = this.g = this.target = null),
		(this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0),
		(this.key = ''),
		(this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
		(this.state = null),
		(this.pointerId = 0),
		(this.pointerType = ''),
		(this.i = null),
		t)
	) {
		var n = (this.type = t.type),
			r = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : null;
		if (((this.target = t.target || t.srcElement), (this.g = e), (e = t.relatedTarget))) {
			if (Ju) {
				e: {
					try {
						ao(e.nodeName);
						var i = !0;
						break e;
					} catch {}
					i = !1;
				}
				i || (e = null);
			}
		} else n == 'mouseover' ? (e = t.fromElement) : n == 'mouseout' && (e = t.toElement);
		(this.relatedTarget = e),
			r
				? ((this.clientX = r.clientX !== void 0 ? r.clientX : r.pageX),
					(this.clientY = r.clientY !== void 0 ? r.clientY : r.pageY),
					(this.screenX = r.screenX || 0),
					(this.screenY = r.screenY || 0))
				: ((this.clientX = t.clientX !== void 0 ? t.clientX : t.pageX),
					(this.clientY = t.clientY !== void 0 ? t.clientY : t.pageY),
					(this.screenX = t.screenX || 0),
					(this.screenY = t.screenY || 0)),
			(this.button = t.button),
			(this.key = t.key || ''),
			(this.ctrlKey = t.ctrlKey),
			(this.altKey = t.altKey),
			(this.shiftKey = t.shiftKey),
			(this.metaKey = t.metaKey),
			(this.pointerId = t.pointerId || 0),
			(this.pointerType =
				typeof t.pointerType == 'string' ? t.pointerType : E_[t.pointerType] || ''),
			(this.state = t.state),
			(this.i = t),
			t.defaultPrevented && Nn.$.h.call(this);
	}
}
Y(Nn, ce);
var E_ = { 2: 'touch', 3: 'pen', 4: 'mouse' };
Nn.prototype.h = function () {
	Nn.$.h.call(this);
	var t = this.i;
	t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
};
var Xn = 'closure_listenable_' + ((1e6 * Math.random()) | 0),
	T_ = 0;
function I_(t, e, n, r, i) {
	(this.listener = t),
		(this.proxy = null),
		(this.src = e),
		(this.type = n),
		(this.capture = !!r),
		(this.la = i),
		(this.key = ++T_),
		(this.fa = this.ia = !1);
}
function li(t) {
	(t.fa = !0), (t.listener = null), (t.proxy = null), (t.src = null), (t.la = null);
}
function co(t, e, n) {
	for (const r in t) e.call(n, t[r], r, t);
}
function w_(t, e) {
	for (const n in t) e.call(void 0, t[n], n, t);
}
function Zu(t) {
	const e = {};
	for (const n in t) e[n] = t[n];
	return e;
}
const Ga =
	'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
		' '
	);
function el(t, e) {
	let n, r;
	for (let i = 1; i < arguments.length; i++) {
		r = arguments[i];
		for (n in r) t[n] = r[n];
		for (let s = 0; s < Ga.length; s++)
			(n = Ga[s]), Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
	}
}
function hi(t) {
	(this.src = t), (this.g = {}), (this.h = 0);
}
hi.prototype.add = function (t, e, n, r, i) {
	var s = t.toString();
	(t = this.g[s]), t || ((t = this.g[s] = []), this.h++);
	var o = vs(t, e, r, i);
	return (
		-1 < o
			? ((e = t[o]), n || (e.ia = !1))
			: ((e = new I_(e, this.src, s, !!r, i)), (e.ia = n), t.push(e)),
		e
	);
};
function ys(t, e) {
	var n = e.type;
	if (n in t.g) {
		var r = t.g[n],
			i = Qu(r, e),
			s;
		(s = 0 <= i) && Array.prototype.splice.call(r, i, 1),
			s && (li(e), t.g[n].length == 0 && (delete t.g[n], t.h--));
	}
}
function vs(t, e, n, r) {
	for (var i = 0; i < t.length; ++i) {
		var s = t[i];
		if (!s.fa && s.listener == e && s.capture == !!n && s.la == r) return i;
	}
	return -1;
}
var uo = 'closure_lm_' + ((1e6 * Math.random()) | 0),
	Yi = {};
function tl(t, e, n, r, i) {
	if (r && r.once) return rl(t, e, n, r, i);
	if (Array.isArray(e)) {
		for (var s = 0; s < e.length; s++) tl(t, e[s], n, r, i);
		return null;
	}
	return (n = fo(n)), t && t[Xn] ? t.O(e, n, Qn(r) ? !!r.capture : !!r, i) : nl(t, e, n, !1, r, i);
}
function nl(t, e, n, r, i, s) {
	if (!e) throw Error('Invalid event type');
	var o = Qn(i) ? !!i.capture : !!i,
		a = ho(t);
	if ((a || (t[uo] = a = new hi(t)), (n = a.add(e, n, r, o, s)), n.proxy)) return n;
	if (((r = A_()), (n.proxy = r), (r.src = t), (r.listener = n), t.addEventListener))
		m_ || (i = o), i === void 0 && (i = !1), t.addEventListener(e.toString(), r, i);
	else if (t.attachEvent) t.attachEvent(sl(e.toString()), r);
	else if (t.addListener && t.removeListener) t.addListener(r);
	else throw Error('addEventListener and attachEvent are unavailable.');
	return n;
}
function A_() {
	function t(n) {
		return e.call(t.src, t.listener, n);
	}
	const e = R_;
	return t;
}
function rl(t, e, n, r, i) {
	if (Array.isArray(e)) {
		for (var s = 0; s < e.length; s++) rl(t, e[s], n, r, i);
		return null;
	}
	return (n = fo(n)), t && t[Xn] ? t.P(e, n, Qn(r) ? !!r.capture : !!r, i) : nl(t, e, n, !0, r, i);
}
function il(t, e, n, r, i) {
	if (Array.isArray(e)) for (var s = 0; s < e.length; s++) il(t, e[s], n, r, i);
	else
		(r = Qn(r) ? !!r.capture : !!r),
			(n = fo(n)),
			t && t[Xn]
				? ((t = t.i),
					(e = String(e).toString()),
					e in t.g &&
						((s = t.g[e]),
						(n = vs(s, n, r, i)),
						-1 < n &&
							(li(s[n]),
							Array.prototype.splice.call(s, n, 1),
							s.length == 0 && (delete t.g[e], t.h--))))
				: t &&
					(t = ho(t)) &&
					((e = t.g[e.toString()]),
					(t = -1),
					e && (t = vs(e, n, r, i)),
					(n = -1 < t ? e[t] : null) && lo(n));
}
function lo(t) {
	if (typeof t != 'number' && t && !t.fa) {
		var e = t.src;
		if (e && e[Xn]) ys(e.i, t);
		else {
			var n = t.type,
				r = t.proxy;
			e.removeEventListener
				? e.removeEventListener(n, r, t.capture)
				: e.detachEvent
					? e.detachEvent(sl(n), r)
					: e.addListener && e.removeListener && e.removeListener(r),
				(n = ho(e)) ? (ys(n, t), n.h == 0 && ((n.src = null), (e[uo] = null))) : li(t);
		}
	}
}
function sl(t) {
	return t in Yi ? Yi[t] : (Yi[t] = 'on' + t);
}
function R_(t, e) {
	if (t.fa) t = !0;
	else {
		e = new Nn(e, this);
		var n = t.listener,
			r = t.la || t.src;
		t.ia && lo(t), (t = n.call(r, e));
	}
	return t;
}
function ho(t) {
	return (t = t[uo]), t instanceof hi ? t : null;
}
var Zi = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0);
function fo(t) {
	return typeof t == 'function'
		? t
		: (t[Zi] ||
				(t[Zi] = function (e) {
					return t.handleEvent(e);
				}),
			t[Zi]);
}
function J() {
	ot.call(this), (this.i = new hi(this)), (this.S = this), (this.J = null);
}
Y(J, ot);
J.prototype[Xn] = !0;
J.prototype.removeEventListener = function (t, e, n, r) {
	il(this, t, e, n, r);
};
function ne(t, e) {
	var n,
		r = t.J;
	if (r) for (n = []; r; r = r.J) n.push(r);
	if (((t = t.S), (r = e.type || e), typeof e == 'string')) e = new ce(e, t);
	else if (e instanceof ce) e.target = e.target || t;
	else {
		var i = e;
		(e = new ce(r, t)), el(e, i);
	}
	if (((i = !0), n))
		for (var s = n.length - 1; 0 <= s; s--) {
			var o = (e.g = n[s]);
			i = yr(o, r, !0, e) && i;
		}
	if (((o = e.g = t), (i = yr(o, r, !0, e) && i), (i = yr(o, r, !1, e) && i), n))
		for (s = 0; s < n.length; s++) (o = e.g = n[s]), (i = yr(o, r, !1, e) && i);
}
J.prototype.N = function () {
	if ((J.$.N.call(this), this.i)) {
		var t = this.i,
			e;
		for (e in t.g) {
			for (var n = t.g[e], r = 0; r < n.length; r++) li(n[r]);
			delete t.g[e], t.h--;
		}
	}
	this.J = null;
};
J.prototype.O = function (t, e, n, r) {
	return this.i.add(String(t), e, !1, n, r);
};
J.prototype.P = function (t, e, n, r) {
	return this.i.add(String(t), e, !0, n, r);
};
function yr(t, e, n, r) {
	if (((e = t.i.g[String(e)]), !e)) return !0;
	e = e.concat();
	for (var i = !0, s = 0; s < e.length; ++s) {
		var o = e[s];
		if (o && !o.fa && o.capture == n) {
			var a = o.listener,
				c = o.la || o.src;
			o.ia && ys(t.i, o), (i = a.call(c, r) !== !1 && i);
		}
	}
	return i && !r.defaultPrevented;
}
var po = A.JSON.stringify;
class S_ {
	constructor(e, n) {
		(this.i = e), (this.j = n), (this.h = 0), (this.g = null);
	}
	get() {
		let e;
		return (
			0 < this.h ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null)) : (e = this.i()), e
		);
	}
}
function P_() {
	var t = mo;
	let e = null;
	return t.g && ((e = t.g), (t.g = t.g.next), t.g || (t.h = null), (e.next = null)), e;
}
class C_ {
	constructor() {
		this.h = this.g = null;
	}
	add(e, n) {
		const r = ol.get();
		r.set(e, n), this.h ? (this.h.next = r) : (this.g = r), (this.h = r);
	}
}
var ol = new S_(
	() => new b_(),
	(t) => t.reset()
);
class b_ {
	constructor() {
		this.next = this.g = this.h = null;
	}
	set(e, n) {
		(this.h = e), (this.g = n), (this.next = null);
	}
	reset() {
		this.next = this.g = this.h = null;
	}
}
function k_(t) {
	var e = 1;
	t = t.split(':');
	const n = [];
	for (; 0 < e && t.length; ) n.push(t.shift()), e--;
	return t.length && n.push(t.join(':')), n;
}
function D_(t) {
	A.setTimeout(() => {
		throw t;
	}, 0);
}
let Vn,
	On = !1,
	mo = new C_(),
	al = () => {
		const t = A.Promise.resolve(void 0);
		Vn = () => {
			t.then(N_);
		};
	};
var N_ = () => {
	for (var t; (t = P_()); ) {
		try {
			t.h.call(t.g);
		} catch (n) {
			D_(n);
		}
		var e = ol;
		e.j(t), 100 > e.h && (e.h++, (t.next = e.g), (e.g = t));
	}
	On = !1;
};
function di(t, e) {
	J.call(this),
		(this.h = t || 1),
		(this.g = e || A),
		(this.j = ae(this.qb, this)),
		(this.l = Date.now());
}
Y(di, J);
_ = di.prototype;
_.ga = !1;
_.T = null;
_.qb = function () {
	if (this.ga) {
		var t = Date.now() - this.l;
		0 < t && t < 0.8 * this.h
			? (this.T = this.g.setTimeout(this.j, this.h - t))
			: (this.T && (this.g.clearTimeout(this.T), (this.T = null)),
				ne(this, 'tick'),
				this.ga && (go(this), this.start()));
	}
};
_.start = function () {
	(this.ga = !0), this.T || ((this.T = this.g.setTimeout(this.j, this.h)), (this.l = Date.now()));
};
function go(t) {
	(t.ga = !1), t.T && (t.g.clearTimeout(t.T), (t.T = null));
}
_.N = function () {
	di.$.N.call(this), go(this), delete this.g;
};
function _o(t, e, n) {
	if (typeof t == 'function') n && (t = ae(t, n));
	else if (t && typeof t.handleEvent == 'function') t = ae(t.handleEvent, t);
	else throw Error('Invalid listener argument');
	return 2147483647 < Number(e) ? -1 : A.setTimeout(t, e || 0);
}
function cl(t) {
	t.g = _o(() => {
		(t.g = null), t.i && ((t.i = !1), cl(t));
	}, t.j);
	const e = t.h;
	(t.h = null), t.m.apply(null, e);
}
class V_ extends ot {
	constructor(e, n) {
		super(), (this.m = e), (this.j = n), (this.h = null), (this.i = !1), (this.g = null);
	}
	l(e) {
		(this.h = arguments), this.g ? (this.i = !0) : cl(this);
	}
	N() {
		super.N(), this.g && (A.clearTimeout(this.g), (this.g = null), (this.i = !1), (this.h = null));
	}
}
function Ln(t) {
	ot.call(this), (this.h = t), (this.g = {});
}
Y(Ln, ot);
var Ka = [];
function ul(t, e, n, r) {
	Array.isArray(n) || (n && (Ka[0] = n.toString()), (n = Ka));
	for (var i = 0; i < n.length; i++) {
		var s = tl(e, n[i], r || t.handleEvent, !1, t.h || t);
		if (!s) break;
		t.g[s.key] = s;
	}
}
function ll(t) {
	co(
		t.g,
		function (e, n) {
			this.g.hasOwnProperty(n) && lo(e);
		},
		t
	),
		(t.g = {});
}
Ln.prototype.N = function () {
	Ln.$.N.call(this), ll(this);
};
Ln.prototype.handleEvent = function () {
	throw Error('EventHandler.handleEvent not implemented');
};
function fi() {
	this.g = !0;
}
fi.prototype.Ea = function () {
	this.g = !1;
};
function O_(t, e, n, r, i, s) {
	t.info(function () {
		if (t.g)
			if (s)
				for (var o = '', a = s.split('&'), c = 0; c < a.length; c++) {
					var u = a[c].split('=');
					if (1 < u.length) {
						var l = u[0];
						u = u[1];
						var h = l.split('_');
						o = 2 <= h.length && h[1] == 'type' ? o + (l + '=' + u + '&') : o + (l + '=redacted&');
					}
				}
			else o = null;
		else o = s;
		return (
			'XMLHTTP REQ (' +
			r +
			') [attempt ' +
			i +
			']: ' +
			e +
			`
` +
			n +
			`
` +
			o
		);
	});
}
function L_(t, e, n, r, i, s, o) {
	t.info(function () {
		return (
			'XMLHTTP RESP (' +
			r +
			') [ attempt ' +
			i +
			']: ' +
			e +
			`
` +
			n +
			`
` +
			s +
			' ' +
			o
		);
	});
}
function xt(t, e, n, r) {
	t.info(function () {
		return 'XMLHTTP TEXT (' + e + '): ' + x_(t, n) + (r ? ' ' + r : '');
	});
}
function M_(t, e) {
	t.info(function () {
		return 'TIMEOUT: ' + e;
	});
}
fi.prototype.info = function () {};
function x_(t, e) {
	if (!t.g) return e;
	if (!e) return null;
	try {
		var n = JSON.parse(e);
		if (n) {
			for (t = 0; t < n.length; t++)
				if (Array.isArray(n[t])) {
					var r = n[t];
					if (!(2 > r.length)) {
						var i = r[1];
						if (Array.isArray(i) && !(1 > i.length)) {
							var s = i[0];
							if (s != 'noop' && s != 'stop' && s != 'close')
								for (var o = 1; o < i.length; o++) i[o] = '';
						}
					}
				}
		}
		return po(n);
	} catch {
		return e;
	}
}
var Pt = {},
	Qa = null;
function pi() {
	return (Qa = Qa || new J());
}
Pt.Ta = 'serverreachability';
function hl(t) {
	ce.call(this, Pt.Ta, t);
}
Y(hl, ce);
function Mn(t) {
	const e = pi();
	ne(e, new hl(e));
}
Pt.STAT_EVENT = 'statevent';
function dl(t, e) {
	ce.call(this, Pt.STAT_EVENT, t), (this.stat = e);
}
Y(dl, ce);
function de(t) {
	const e = pi();
	ne(e, new dl(e, t));
}
Pt.Ua = 'timingevent';
function fl(t, e) {
	ce.call(this, Pt.Ua, t), (this.size = e);
}
Y(fl, ce);
function Jn(t, e) {
	if (typeof t != 'function') throw Error('Fn must not be null and must be a function');
	return A.setTimeout(function () {
		t();
	}, e);
}
var mi = { NO_ERROR: 0, rb: 1, Eb: 2, Db: 3, yb: 4, Cb: 5, Fb: 6, Qa: 7, TIMEOUT: 8, Ib: 9 },
	pl = {
		wb: 'complete',
		Sb: 'success',
		Ra: 'error',
		Qa: 'abort',
		Kb: 'ready',
		Lb: 'readystatechange',
		TIMEOUT: 'timeout',
		Gb: 'incrementaldata',
		Jb: 'progress',
		zb: 'downloadprogress',
		$b: 'uploadprogress'
	};
function yo() {}
yo.prototype.h = null;
function Xa(t) {
	return t.h || (t.h = t.i());
}
function ml() {}
var Yn = { OPEN: 'a', vb: 'b', Ra: 'c', Hb: 'd' };
function vo() {
	ce.call(this, 'd');
}
Y(vo, ce);
function Eo() {
	ce.call(this, 'c');
}
Y(Eo, ce);
var Es;
function gi() {}
Y(gi, yo);
gi.prototype.g = function () {
	return new XMLHttpRequest();
};
gi.prototype.i = function () {
	return {};
};
Es = new gi();
function Zn(t, e, n, r) {
	(this.l = t),
		(this.j = e),
		(this.m = n),
		(this.W = r || 1),
		(this.U = new Ln(this)),
		(this.P = U_),
		(t = ms ? 125 : void 0),
		(this.V = new di(t)),
		(this.I = null),
		(this.i = !1),
		(this.u = this.B = this.A = this.L = this.G = this.Y = this.C = null),
		(this.F = []),
		(this.g = null),
		(this.o = 0),
		(this.s = this.v = null),
		(this.ca = -1),
		(this.J = !1),
		(this.O = 0),
		(this.M = null),
		(this.ba = this.K = this.aa = this.S = !1),
		(this.h = new gl());
}
function gl() {
	(this.i = null), (this.g = ''), (this.h = !1);
}
var U_ = 45e3,
	_l = {},
	Ts = {};
_ = Zn.prototype;
_.setTimeout = function (t) {
	this.P = t;
};
function Is(t, e, n) {
	(t.L = 1), (t.A = yi($e(e))), (t.u = n), (t.S = !0), yl(t, null);
}
function yl(t, e) {
	(t.G = Date.now()), er(t), (t.B = $e(t.A));
	var n = t.B,
		r = t.W;
	Array.isArray(r) || (r = [String(r)]),
		Sl(n.i, 't', r),
		(t.o = 0),
		(n = t.l.J),
		(t.h = new gl()),
		(t.g = Gl(t.l, n ? e : null, !t.u)),
		0 < t.O && (t.M = new V_(ae(t.Pa, t, t.g), t.O)),
		ul(t.U, t.g, 'readystatechange', t.nb),
		(e = t.I ? Zu(t.I) : {}),
		t.u
			? (t.v || (t.v = 'POST'),
				(e['Content-Type'] = 'application/x-www-form-urlencoded'),
				t.g.ha(t.B, t.v, t.u, e))
			: ((t.v = 'GET'), t.g.ha(t.B, t.v, null, e)),
		Mn(),
		O_(t.j, t.v, t.B, t.m, t.W, t.u);
}
_.nb = function (t) {
	t = t.target;
	const e = this.M;
	e && Se(t) == 3 ? e.l() : this.Pa(t);
};
_.Pa = function (t) {
	try {
		if (t == this.g)
			e: {
				const l = Se(this.g);
				var e = this.g.Ia();
				const h = this.g.da();
				if (!(3 > l) && (l != 3 || ms || (this.g && (this.h.h || this.g.ja() || ec(this.g))))) {
					this.J || l != 4 || e == 7 || (e == 8 || 0 >= h ? Mn(3) : Mn(2)), _i(this);
					var n = this.g.da();
					this.ca = n;
					t: if (vl(this)) {
						var r = ec(this.g);
						t = '';
						var i = r.length,
							s = Se(this.g) == 4;
						if (!this.h.i) {
							if (typeof TextDecoder > 'u') {
								dt(this), In(this);
								var o = '';
								break t;
							}
							this.h.i = new A.TextDecoder();
						}
						for (e = 0; e < i; e++)
							(this.h.h = !0), (t += this.h.i.decode(r[e], { stream: s && e == i - 1 }));
						(r.length = 0), (this.h.g += t), (this.o = 0), (o = this.h.g);
					} else o = this.g.ja();
					if (((this.i = n == 200), L_(this.j, this.v, this.B, this.m, this.W, l, n), this.i)) {
						if (this.aa && !this.K) {
							t: {
								if (this.g) {
									var a,
										c = this.g;
									if (
										(a = c.g ? c.g.getResponseHeader('X-HTTP-Initial-Response') : null) &&
										!Dn(a)
									) {
										var u = a;
										break t;
									}
								}
								u = null;
							}
							if ((n = u))
								xt(this.j, this.m, n, 'Initial handshake response via X-HTTP-Initial-Response'),
									(this.K = !0),
									ws(this, n);
							else {
								(this.i = !1), (this.s = 3), de(12), dt(this), In(this);
								break e;
							}
						}
						this.S
							? (El(this, l, o),
								ms && this.i && l == 3 && (ul(this.U, this.V, 'tick', this.mb), this.V.start()))
							: (xt(this.j, this.m, o, null), ws(this, o)),
							l == 4 && dt(this),
							this.i && !this.J && (l == 4 ? $l(this.l, this) : ((this.i = !1), er(this)));
					} else
						sy(this.g),
							n == 400 && 0 < o.indexOf('Unknown SID')
								? ((this.s = 3), de(12))
								: ((this.s = 0), de(13)),
							dt(this),
							In(this);
				}
			}
	} catch {
	} finally {
	}
};
function vl(t) {
	return t.g ? t.v == 'GET' && t.L != 2 && t.l.Ha : !1;
}
function El(t, e, n) {
	let r = !0,
		i;
	for (; !t.J && t.o < n.length; )
		if (((i = F_(t, n)), i == Ts)) {
			e == 4 && ((t.s = 4), de(14), (r = !1)), xt(t.j, t.m, null, '[Incomplete Response]');
			break;
		} else if (i == _l) {
			(t.s = 4), de(15), xt(t.j, t.m, n, '[Invalid Chunk]'), (r = !1);
			break;
		} else xt(t.j, t.m, i, null), ws(t, i);
	vl(t) && t.o != 0 && ((t.h.g = t.h.g.slice(t.o)), (t.o = 0)),
		e != 4 || n.length != 0 || t.h.h || ((t.s = 1), de(16), (r = !1)),
		(t.i = t.i && r),
		r
			? 0 < n.length &&
				!t.ba &&
				((t.ba = !0),
				(e = t.l),
				e.g == t &&
					e.ca &&
					!e.M &&
					(e.l.info('Great, no buffering proxy detected. Bytes received: ' + n.length),
					So(e),
					(e.M = !0),
					de(11)))
			: (xt(t.j, t.m, n, '[Invalid Chunked Response]'), dt(t), In(t));
}
_.mb = function () {
	if (this.g) {
		var t = Se(this.g),
			e = this.g.ja();
		this.o < e.length && (_i(this), El(this, t, e), this.i && t != 4 && er(this));
	}
};
function F_(t, e) {
	var n = t.o,
		r = e.indexOf(
			`
`,
			n
		);
	return r == -1
		? Ts
		: ((n = Number(e.substring(n, r))),
			isNaN(n)
				? _l
				: ((r += 1), r + n > e.length ? Ts : ((e = e.slice(r, r + n)), (t.o = r + n), e)));
}
_.cancel = function () {
	(this.J = !0), dt(this);
};
function er(t) {
	(t.Y = Date.now() + t.P), Tl(t, t.P);
}
function Tl(t, e) {
	if (t.C != null) throw Error('WatchDog timer not null');
	t.C = Jn(ae(t.lb, t), e);
}
function _i(t) {
	t.C && (A.clearTimeout(t.C), (t.C = null));
}
_.lb = function () {
	this.C = null;
	const t = Date.now();
	0 <= t - this.Y
		? (M_(this.j, this.B), this.L != 2 && (Mn(), de(17)), dt(this), (this.s = 2), In(this))
		: Tl(this, this.Y - t);
};
function In(t) {
	t.l.H == 0 || t.J || $l(t.l, t);
}
function dt(t) {
	_i(t);
	var e = t.M;
	e && typeof e.sa == 'function' && e.sa(),
		(t.M = null),
		go(t.V),
		ll(t.U),
		t.g && ((e = t.g), (t.g = null), e.abort(), e.sa());
}
function ws(t, e) {
	try {
		var n = t.l;
		if (n.H != 0 && (n.g == t || As(n.i, t))) {
			if (!t.K && As(n.i, t) && n.H == 3) {
				try {
					var r = n.Ja.g.parse(e);
				} catch {
					r = null;
				}
				if (Array.isArray(r) && r.length == 3) {
					var i = r;
					if (i[0] == 0) {
						e: if (!n.u) {
							if (n.g)
								if (n.g.G + 3e3 < t.G) $r(n), Ii(n);
								else break e;
							Ro(n), de(18);
						}
					} else
						(n.Fa = i[1]),
							0 < n.Fa - n.V &&
								37500 > i[2] &&
								n.G &&
								n.A == 0 &&
								!n.v &&
								(n.v = Jn(ae(n.ib, n), 6e3));
					if (1 >= bl(n.i) && n.oa) {
						try {
							n.oa();
						} catch {}
						n.oa = void 0;
					}
				} else ft(n, 11);
			} else if (((t.K || n.g == t) && $r(n), !Dn(e)))
				for (i = n.Ja.g.parse(e), e = 0; e < i.length; e++) {
					let u = i[e];
					if (((n.V = u[0]), (u = u[1]), n.H == 2))
						if (u[0] == 'c') {
							(n.K = u[1]), (n.pa = u[2]);
							const l = u[3];
							l != null && ((n.ra = l), n.l.info('VER=' + n.ra));
							const h = u[4];
							h != null && ((n.Ga = h), n.l.info('SVER=' + n.Ga));
							const d = u[5];
							d != null &&
								typeof d == 'number' &&
								0 < d &&
								((r = 1.5 * d), (n.L = r), n.l.info('backChannelRequestTimeoutMs_=' + r)),
								(r = n);
							const f = t.g;
							if (f) {
								const E = f.g ? f.g.getResponseHeader('X-Client-Wire-Protocol') : null;
								if (E) {
									var s = r.i;
									s.g ||
										(E.indexOf('spdy') == -1 && E.indexOf('quic') == -1 && E.indexOf('h2') == -1) ||
										((s.j = s.l), (s.g = new Set()), s.h && (To(s, s.h), (s.h = null)));
								}
								if (r.F) {
									const I = f.g ? f.g.getResponseHeader('X-HTTP-Session-Id') : null;
									I && ((r.Da = I), U(r.I, r.F, I));
								}
							}
							(n.H = 3),
								n.h && n.h.Ba(),
								n.ca && ((n.S = Date.now() - t.G), n.l.info('Handshake RTT: ' + n.S + 'ms')),
								(r = n);
							var o = t;
							if (((r.wa = Wl(r, r.J ? r.pa : null, r.Y)), o.K)) {
								kl(r.i, o);
								var a = o,
									c = r.L;
								c && a.setTimeout(c), a.C && (_i(a), er(a)), (r.g = o);
							} else jl(r);
							0 < n.j.length && wi(n);
						} else (u[0] != 'stop' && u[0] != 'close') || ft(n, 7);
					else
						n.H == 3 &&
							(u[0] == 'stop' || u[0] == 'close'
								? u[0] == 'stop'
									? ft(n, 7)
									: Ao(n)
								: u[0] != 'noop' && n.h && n.h.Aa(u),
							(n.A = 0));
				}
		}
		Mn(4);
	} catch {}
}
function B_(t) {
	if (t.Z && typeof t.Z == 'function') return t.Z();
	if ((typeof Map < 'u' && t instanceof Map) || (typeof Set < 'u' && t instanceof Set))
		return Array.from(t.values());
	if (typeof t == 'string') return t.split('');
	if (ci(t)) {
		for (var e = [], n = t.length, r = 0; r < n; r++) e.push(t[r]);
		return e;
	}
	(e = []), (n = 0);
	for (r in t) e[n++] = t[r];
	return e;
}
function j_(t) {
	if (t.ta && typeof t.ta == 'function') return t.ta();
	if (!t.Z || typeof t.Z != 'function') {
		if (typeof Map < 'u' && t instanceof Map) return Array.from(t.keys());
		if (!(typeof Set < 'u' && t instanceof Set)) {
			if (ci(t) || typeof t == 'string') {
				var e = [];
				t = t.length;
				for (var n = 0; n < t; n++) e.push(n);
				return e;
			}
			(e = []), (n = 0);
			for (const r in t) e[n++] = r;
			return e;
		}
	}
}
function Il(t, e) {
	if (t.forEach && typeof t.forEach == 'function') t.forEach(e, void 0);
	else if (ci(t) || typeof t == 'string') Array.prototype.forEach.call(t, e, void 0);
	else
		for (var n = j_(t), r = B_(t), i = r.length, s = 0; s < i; s++)
			e.call(void 0, r[s], n && n[s], t);
}
var wl = RegExp(
	'^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$'
);
function q_(t, e) {
	if (t) {
		t = t.split('&');
		for (var n = 0; n < t.length; n++) {
			var r = t[n].indexOf('='),
				i = null;
			if (0 <= r) {
				var s = t[n].substring(0, r);
				i = t[n].substring(r + 1);
			} else s = t[n];
			e(s, i ? decodeURIComponent(i.replace(/\+/g, ' ')) : '');
		}
	}
}
function yt(t) {
	if (
		((this.g = this.s = this.j = ''),
		(this.m = null),
		(this.o = this.l = ''),
		(this.h = !1),
		t instanceof yt)
	) {
		(this.h = t.h), jr(this, t.j), (this.s = t.s), (this.g = t.g), qr(this, t.m), (this.l = t.l);
		var e = t.i,
			n = new xn();
		(n.i = e.i), e.g && ((n.g = new Map(e.g)), (n.h = e.h)), Ja(this, n), (this.o = t.o);
	} else
		t && (e = String(t).match(wl))
			? ((this.h = !1),
				jr(this, e[1] || '', !0),
				(this.s = mn(e[2] || '')),
				(this.g = mn(e[3] || '', !0)),
				qr(this, e[4]),
				(this.l = mn(e[5] || '', !0)),
				Ja(this, e[6] || '', !0),
				(this.o = mn(e[7] || '')))
			: ((this.h = !1), (this.i = new xn(null, this.h)));
}
yt.prototype.toString = function () {
	var t = [],
		e = this.j;
	e && t.push(gn(e, Ya, !0), ':');
	var n = this.g;
	return (
		(n || e == 'file') &&
			(t.push('//'),
			(e = this.s) && t.push(gn(e, Ya, !0), '@'),
			t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
			(n = this.m),
			n != null && t.push(':', String(n))),
		(n = this.l) &&
			(this.g && n.charAt(0) != '/' && t.push('/'),
			t.push(gn(n, n.charAt(0) == '/' ? H_ : z_, !0))),
		(n = this.i.toString()) && t.push('?', n),
		(n = this.o) && t.push('#', gn(n, G_)),
		t.join('')
	);
};
function $e(t) {
	return new yt(t);
}
function jr(t, e, n) {
	(t.j = n ? mn(e, !0) : e), t.j && (t.j = t.j.replace(/:$/, ''));
}
function qr(t, e) {
	if (e) {
		if (((e = Number(e)), isNaN(e) || 0 > e)) throw Error('Bad port number ' + e);
		t.m = e;
	} else t.m = null;
}
function Ja(t, e, n) {
	e instanceof xn ? ((t.i = e), K_(t.i, t.h)) : (n || (e = gn(e, W_)), (t.i = new xn(e, t.h)));
}
function U(t, e, n) {
	t.i.set(e, n);
}
function yi(t) {
	return (
		U(
			t,
			'zx',
			Math.floor(2147483648 * Math.random()).toString(36) +
				Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)
		),
		t
	);
}
function mn(t, e) {
	return t ? (e ? decodeURI(t.replace(/%25/g, '%2525')) : decodeURIComponent(t)) : '';
}
function gn(t, e, n) {
	return typeof t == 'string'
		? ((t = encodeURI(t).replace(e, $_)), n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, '%$1')), t)
		: null;
}
function $_(t) {
	return (t = t.charCodeAt(0)), '%' + ((t >> 4) & 15).toString(16) + (t & 15).toString(16);
}
var Ya = /[#\/\?@]/g,
	z_ = /[#\?:]/g,
	H_ = /[#\?]/g,
	W_ = /[#\?@]/g,
	G_ = /#/g;
function xn(t, e) {
	(this.h = this.g = null), (this.i = t || null), (this.j = !!e);
}
function at(t) {
	t.g ||
		((t.g = new Map()),
		(t.h = 0),
		t.i &&
			q_(t.i, function (e, n) {
				t.add(decodeURIComponent(e.replace(/\+/g, ' ')), n);
			}));
}
_ = xn.prototype;
_.add = function (t, e) {
	at(this), (this.i = null), (t = nn(this, t));
	var n = this.g.get(t);
	return n || this.g.set(t, (n = [])), n.push(e), (this.h += 1), this;
};
function Al(t, e) {
	at(t), (e = nn(t, e)), t.g.has(e) && ((t.i = null), (t.h -= t.g.get(e).length), t.g.delete(e));
}
function Rl(t, e) {
	return at(t), (e = nn(t, e)), t.g.has(e);
}
_.forEach = function (t, e) {
	at(this),
		this.g.forEach(function (n, r) {
			n.forEach(function (i) {
				t.call(e, i, r, this);
			}, this);
		}, this);
};
_.ta = function () {
	at(this);
	const t = Array.from(this.g.values()),
		e = Array.from(this.g.keys()),
		n = [];
	for (let r = 0; r < e.length; r++) {
		const i = t[r];
		for (let s = 0; s < i.length; s++) n.push(e[r]);
	}
	return n;
};
_.Z = function (t) {
	at(this);
	let e = [];
	if (typeof t == 'string') Rl(this, t) && (e = e.concat(this.g.get(nn(this, t))));
	else {
		t = Array.from(this.g.values());
		for (let n = 0; n < t.length; n++) e = e.concat(t[n]);
	}
	return e;
};
_.set = function (t, e) {
	return (
		at(this),
		(this.i = null),
		(t = nn(this, t)),
		Rl(this, t) && (this.h -= this.g.get(t).length),
		this.g.set(t, [e]),
		(this.h += 1),
		this
	);
};
_.get = function (t, e) {
	return t ? ((t = this.Z(t)), 0 < t.length ? String(t[0]) : e) : e;
};
function Sl(t, e, n) {
	Al(t, e), 0 < n.length && ((t.i = null), t.g.set(nn(t, e), oo(n)), (t.h += n.length));
}
_.toString = function () {
	if (this.i) return this.i;
	if (!this.g) return '';
	const t = [],
		e = Array.from(this.g.keys());
	for (var n = 0; n < e.length; n++) {
		var r = e[n];
		const s = encodeURIComponent(String(r)),
			o = this.Z(r);
		for (r = 0; r < o.length; r++) {
			var i = s;
			o[r] !== '' && (i += '=' + encodeURIComponent(String(o[r]))), t.push(i);
		}
	}
	return (this.i = t.join('&'));
};
function nn(t, e) {
	return (e = String(e)), t.j && (e = e.toLowerCase()), e;
}
function K_(t, e) {
	e &&
		!t.j &&
		(at(t),
		(t.i = null),
		t.g.forEach(function (n, r) {
			var i = r.toLowerCase();
			r != i && (Al(this, r), Sl(this, i, n));
		}, t)),
		(t.j = e);
}
var Q_ = class {
	constructor(t, e) {
		(this.g = t), (this.map = e);
	}
};
function Pl(t) {
	(this.l = t || X_),
		A.PerformanceNavigationTiming
			? ((t = A.performance.getEntriesByType('navigation')),
				(t = 0 < t.length && (t[0].nextHopProtocol == 'hq' || t[0].nextHopProtocol == 'h2')))
			: (t = !!(A.g && A.g.Ka && A.g.Ka() && A.g.Ka().dc)),
		(this.j = t ? this.l : 1),
		(this.g = null),
		1 < this.j && (this.g = new Set()),
		(this.h = null),
		(this.i = []);
}
var X_ = 10;
function Cl(t) {
	return t.h ? !0 : t.g ? t.g.size >= t.j : !1;
}
function bl(t) {
	return t.h ? 1 : t.g ? t.g.size : 0;
}
function As(t, e) {
	return t.h ? t.h == e : t.g ? t.g.has(e) : !1;
}
function To(t, e) {
	t.g ? t.g.add(e) : (t.h = e);
}
function kl(t, e) {
	t.h && t.h == e ? (t.h = null) : t.g && t.g.has(e) && t.g.delete(e);
}
Pl.prototype.cancel = function () {
	if (((this.i = Dl(this)), this.h)) this.h.cancel(), (this.h = null);
	else if (this.g && this.g.size !== 0) {
		for (const t of this.g.values()) t.cancel();
		this.g.clear();
	}
};
function Dl(t) {
	if (t.h != null) return t.i.concat(t.h.F);
	if (t.g != null && t.g.size !== 0) {
		let e = t.i;
		for (const n of t.g.values()) e = e.concat(n.F);
		return e;
	}
	return oo(t.i);
}
var J_ = class {
	stringify(t) {
		return A.JSON.stringify(t, void 0);
	}
	parse(t) {
		return A.JSON.parse(t, void 0);
	}
};
function Y_() {
	this.g = new J_();
}
function Z_(t, e, n) {
	const r = n || '';
	try {
		Il(t, function (i, s) {
			let o = i;
			Qn(i) && (o = po(i)), e.push(r + s + '=' + encodeURIComponent(o));
		});
	} catch (i) {
		throw (e.push(r + 'type=' + encodeURIComponent('_badmap')), i);
	}
}
function ey(t, e) {
	const n = new fi();
	if (A.Image) {
		const r = new Image();
		(r.onload = _r(vr, n, r, 'TestLoadImage: loaded', !0, e)),
			(r.onerror = _r(vr, n, r, 'TestLoadImage: error', !1, e)),
			(r.onabort = _r(vr, n, r, 'TestLoadImage: abort', !1, e)),
			(r.ontimeout = _r(vr, n, r, 'TestLoadImage: timeout', !1, e)),
			A.setTimeout(function () {
				r.ontimeout && r.ontimeout();
			}, 1e4),
			(r.src = t);
	} else e(!1);
}
function vr(t, e, n, r, i) {
	try {
		(e.onload = null), (e.onerror = null), (e.onabort = null), (e.ontimeout = null), i(r);
	} catch {}
}
function vi(t) {
	(this.l = t.ec || null), (this.j = t.ob || !1);
}
Y(vi, yo);
vi.prototype.g = function () {
	return new Ei(this.l, this.j);
};
vi.prototype.i = (function (t) {
	return function () {
		return t;
	};
})({});
function Ei(t, e) {
	J.call(this),
		(this.F = t),
		(this.u = e),
		(this.m = void 0),
		(this.readyState = Io),
		(this.status = 0),
		(this.responseType = this.responseText = this.response = this.statusText = ''),
		(this.onreadystatechange = null),
		(this.v = new Headers()),
		(this.h = null),
		(this.C = 'GET'),
		(this.B = ''),
		(this.g = !1),
		(this.A = this.j = this.l = null);
}
Y(Ei, J);
var Io = 0;
_ = Ei.prototype;
_.open = function (t, e) {
	if (this.readyState != Io) throw (this.abort(), Error('Error reopening a connection'));
	(this.C = t), (this.B = e), (this.readyState = 1), Un(this);
};
_.send = function (t) {
	if (this.readyState != 1) throw (this.abort(), Error('need to call open() first. '));
	this.g = !0;
	const e = { headers: this.v, method: this.C, credentials: this.m, cache: void 0 };
	t && (e.body = t),
		(this.F || A).fetch(new Request(this.B, e)).then(this.$a.bind(this), this.ka.bind(this));
};
_.abort = function () {
	(this.response = this.responseText = ''),
		(this.v = new Headers()),
		(this.status = 0),
		this.j && this.j.cancel('Request was aborted.').catch(() => {}),
		1 <= this.readyState && this.g && this.readyState != 4 && ((this.g = !1), tr(this)),
		(this.readyState = Io);
};
_.$a = function (t) {
	if (
		this.g &&
		((this.l = t),
		this.h ||
			((this.status = this.l.status),
			(this.statusText = this.l.statusText),
			(this.h = t.headers),
			(this.readyState = 2),
			Un(this)),
		this.g && ((this.readyState = 3), Un(this), this.g))
	)
		if (this.responseType === 'arraybuffer')
			t.arrayBuffer().then(this.Ya.bind(this), this.ka.bind(this));
		else if (typeof A.ReadableStream < 'u' && 'body' in t) {
			if (((this.j = t.body.getReader()), this.u)) {
				if (this.responseType)
					throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
				this.response = [];
			} else (this.response = this.responseText = ''), (this.A = new TextDecoder());
			Nl(this);
		} else t.text().then(this.Za.bind(this), this.ka.bind(this));
};
function Nl(t) {
	t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t));
}
_.Xa = function (t) {
	if (this.g) {
		if (this.u && t.value) this.response.push(t.value);
		else if (!this.u) {
			var e = t.value ? t.value : new Uint8Array(0);
			(e = this.A.decode(e, { stream: !t.done })) && (this.response = this.responseText += e);
		}
		t.done ? tr(this) : Un(this), this.readyState == 3 && Nl(this);
	}
};
_.Za = function (t) {
	this.g && ((this.response = this.responseText = t), tr(this));
};
_.Ya = function (t) {
	this.g && ((this.response = t), tr(this));
};
_.ka = function () {
	this.g && tr(this);
};
function tr(t) {
	(t.readyState = 4), (t.l = null), (t.j = null), (t.A = null), Un(t);
}
_.setRequestHeader = function (t, e) {
	this.v.append(t, e);
};
_.getResponseHeader = function (t) {
	return (this.h && this.h.get(t.toLowerCase())) || '';
};
_.getAllResponseHeaders = function () {
	if (!this.h) return '';
	const t = [],
		e = this.h.entries();
	for (var n = e.next(); !n.done; ) (n = n.value), t.push(n[0] + ': ' + n[1]), (n = e.next());
	return t.join(`\r
`);
};
function Un(t) {
	t.onreadystatechange && t.onreadystatechange.call(t);
}
Object.defineProperty(Ei.prototype, 'withCredentials', {
	get: function () {
		return this.m === 'include';
	},
	set: function (t) {
		this.m = t ? 'include' : 'same-origin';
	}
});
var ty = A.JSON.parse;
function $(t) {
	J.call(this),
		(this.headers = new Map()),
		(this.u = t || null),
		(this.h = !1),
		(this.C = this.g = null),
		(this.I = ''),
		(this.m = 0),
		(this.j = ''),
		(this.l = this.G = this.v = this.F = !1),
		(this.B = 0),
		(this.A = null),
		(this.K = Vl),
		(this.L = this.M = !1);
}
Y($, J);
var Vl = '',
	ny = /^https?$/i,
	ry = ['POST', 'PUT'];
_ = $.prototype;
_.Oa = function (t) {
	this.M = t;
};
_.ha = function (t, e, n, r) {
	if (this.g)
		throw Error(
			'[goog.net.XhrIo] Object is active with another request=' + this.I + '; newUri=' + t
		);
	(e = e ? e.toUpperCase() : 'GET'),
		(this.I = t),
		(this.j = ''),
		(this.m = 0),
		(this.F = !1),
		(this.h = !0),
		(this.g = this.u ? this.u.g() : Es.g()),
		(this.C = this.u ? Xa(this.u) : Xa(Es)),
		(this.g.onreadystatechange = ae(this.La, this));
	try {
		(this.G = !0), this.g.open(e, String(t), !0), (this.G = !1);
	} catch (s) {
		Za(this, s);
		return;
	}
	if (((t = n || ''), (n = new Map(this.headers)), r))
		if (Object.getPrototypeOf(r) === Object.prototype) for (var i in r) n.set(i, r[i]);
		else if (typeof r.keys == 'function' && typeof r.get == 'function')
			for (const s of r.keys()) n.set(s, r.get(s));
		else throw Error('Unknown input type for opt_headers: ' + String(r));
	(r = Array.from(n.keys()).find((s) => s.toLowerCase() == 'content-type')),
		(i = A.FormData && t instanceof A.FormData),
		!(0 <= Qu(ry, e)) ||
			r ||
			i ||
			n.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
	for (const [s, o] of n) this.g.setRequestHeader(s, o);
	this.K && (this.g.responseType = this.K),
		'withCredentials' in this.g &&
			this.g.withCredentials !== this.M &&
			(this.g.withCredentials = this.M);
	try {
		Ml(this),
			0 < this.B &&
				((this.L = iy(this.g))
					? ((this.g.timeout = this.B), (this.g.ontimeout = ae(this.ua, this)))
					: (this.A = _o(this.ua, this.B, this))),
			(this.v = !0),
			this.g.send(t),
			(this.v = !1);
	} catch (s) {
		Za(this, s);
	}
};
function iy(t) {
	return Ht && typeof t.timeout == 'number' && t.ontimeout !== void 0;
}
_.ua = function () {
	typeof so < 'u' &&
		this.g &&
		((this.j = 'Timed out after ' + this.B + 'ms, aborting'),
		(this.m = 8),
		ne(this, 'timeout'),
		this.abort(8));
};
function Za(t, e) {
	(t.h = !1), t.g && ((t.l = !0), t.g.abort(), (t.l = !1)), (t.j = e), (t.m = 5), Ol(t), Ti(t);
}
function Ol(t) {
	t.F || ((t.F = !0), ne(t, 'complete'), ne(t, 'error'));
}
_.abort = function (t) {
	this.g &&
		this.h &&
		((this.h = !1),
		(this.l = !0),
		this.g.abort(),
		(this.l = !1),
		(this.m = t || 7),
		ne(this, 'complete'),
		ne(this, 'abort'),
		Ti(this));
};
_.N = function () {
	this.g && (this.h && ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)), Ti(this, !0)),
		$.$.N.call(this);
};
_.La = function () {
	this.s || (this.G || this.v || this.l ? Ll(this) : this.kb());
};
_.kb = function () {
	Ll(this);
};
function Ll(t) {
	if (t.h && typeof so < 'u' && (!t.C[1] || Se(t) != 4 || t.da() != 2)) {
		if (t.v && Se(t) == 4) _o(t.La, 0, t);
		else if ((ne(t, 'readystatechange'), Se(t) == 4)) {
			t.h = !1;
			try {
				const o = t.da();
				e: switch (o) {
					case 200:
					case 201:
					case 202:
					case 204:
					case 206:
					case 304:
					case 1223:
						var e = !0;
						break e;
					default:
						e = !1;
				}
				var n;
				if (!(n = e)) {
					var r;
					if ((r = o === 0)) {
						var i = String(t.I).match(wl)[1] || null;
						!i && A.self && A.self.location && (i = A.self.location.protocol.slice(0, -1)),
							(r = !ny.test(i ? i.toLowerCase() : ''));
					}
					n = r;
				}
				if (n) ne(t, 'complete'), ne(t, 'success');
				else {
					t.m = 6;
					try {
						var s = 2 < Se(t) ? t.g.statusText : '';
					} catch {
						s = '';
					}
					(t.j = s + ' [' + t.da() + ']'), Ol(t);
				}
			} finally {
				Ti(t);
			}
		}
	}
}
function Ti(t, e) {
	if (t.g) {
		Ml(t);
		const n = t.g,
			r = t.C[0] ? () => {} : null;
		(t.g = null), (t.C = null), e || ne(t, 'ready');
		try {
			n.onreadystatechange = r;
		} catch {}
	}
}
function Ml(t) {
	t.g && t.L && (t.g.ontimeout = null), t.A && (A.clearTimeout(t.A), (t.A = null));
}
_.isActive = function () {
	return !!this.g;
};
function Se(t) {
	return t.g ? t.g.readyState : 0;
}
_.da = function () {
	try {
		return 2 < Se(this) ? this.g.status : -1;
	} catch {
		return -1;
	}
};
_.ja = function () {
	try {
		return this.g ? this.g.responseText : '';
	} catch {
		return '';
	}
};
_.Wa = function (t) {
	if (this.g) {
		var e = this.g.responseText;
		return t && e.indexOf(t) == 0 && (e = e.substring(t.length)), ty(e);
	}
};
function ec(t) {
	try {
		if (!t.g) return null;
		if ('response' in t.g) return t.g.response;
		switch (t.K) {
			case Vl:
			case 'text':
				return t.g.responseText;
			case 'arraybuffer':
				if ('mozResponseArrayBuffer' in t.g) return t.g.mozResponseArrayBuffer;
		}
		return null;
	} catch {
		return null;
	}
}
function sy(t) {
	const e = {};
	t = ((t.g && 2 <= Se(t) && t.g.getAllResponseHeaders()) || '').split(`\r
`);
	for (let r = 0; r < t.length; r++) {
		if (Dn(t[r])) continue;
		var n = k_(t[r]);
		const i = n[0];
		if (((n = n[1]), typeof n != 'string')) continue;
		n = n.trim();
		const s = e[i] || [];
		(e[i] = s), s.push(n);
	}
	w_(e, function (r) {
		return r.join(', ');
	});
}
_.Ia = function () {
	return this.m;
};
_.Sa = function () {
	return typeof this.j == 'string' ? this.j : String(this.j);
};
function xl(t) {
	let e = '';
	return (
		co(t, function (n, r) {
			(e += r),
				(e += ':'),
				(e += n),
				(e += `\r
`);
		}),
		e
	);
}
function wo(t, e, n) {
	e: {
		for (r in n) {
			var r = !1;
			break e;
		}
		r = !0;
	}
	r ||
		((n = xl(n)), typeof t == 'string' ? n != null && encodeURIComponent(String(n)) : U(t, e, n));
}
function hn(t, e, n) {
	return (n && n.internalChannelParams && n.internalChannelParams[t]) || e;
}
function Ul(t) {
	(this.Ga = 0),
		(this.j = []),
		(this.l = new fi()),
		(this.pa =
			this.wa =
			this.I =
			this.Y =
			this.g =
			this.Da =
			this.F =
			this.na =
			this.o =
			this.U =
			this.s =
				null),
		(this.fb = this.W = 0),
		(this.cb = hn('failFast', !1, t)),
		(this.G = this.v = this.u = this.m = this.h = null),
		(this.aa = !0),
		(this.Fa = this.V = -1),
		(this.ba = this.A = this.C = 0),
		(this.ab = hn('baseRetryDelayMs', 5e3, t)),
		(this.hb = hn('retryDelaySeedMs', 1e4, t)),
		(this.eb = hn('forwardChannelMaxRetries', 2, t)),
		(this.xa = hn('forwardChannelRequestTimeoutMs', 2e4, t)),
		(this.va = (t && t.xmlHttpFactory) || void 0),
		(this.Ha = (t && t.useFetchStreams) || !1),
		(this.L = void 0),
		(this.J = (t && t.supportsCrossDomainXhr) || !1),
		(this.K = ''),
		(this.i = new Pl(t && t.concurrentRequestLimit)),
		(this.Ja = new Y_()),
		(this.P = (t && t.fastHandshake) || !1),
		(this.O = (t && t.encodeInitMessageHeaders) || !1),
		this.P && this.O && (this.O = !1),
		(this.bb = (t && t.bc) || !1),
		t && t.Ea && this.l.Ea(),
		t && t.forceLongPolling && (this.aa = !1),
		(this.ca = (!this.P && this.aa && t && t.detectBufferingProxy) || !1),
		(this.qa = void 0),
		t && t.longPollingTimeout && 0 < t.longPollingTimeout && (this.qa = t.longPollingTimeout),
		(this.oa = void 0),
		(this.S = 0),
		(this.M = !1),
		(this.ma = this.B = null);
}
_ = Ul.prototype;
_.ra = 8;
_.H = 1;
function Ao(t) {
	if ((Fl(t), t.H == 3)) {
		var e = t.W++,
			n = $e(t.I);
		if (
			(U(n, 'SID', t.K),
			U(n, 'RID', e),
			U(n, 'TYPE', 'terminate'),
			nr(t, n),
			(e = new Zn(t, t.l, e)),
			(e.L = 2),
			(e.A = yi($e(n))),
			(n = !1),
			A.navigator && A.navigator.sendBeacon)
		)
			try {
				n = A.navigator.sendBeacon(e.A.toString(), '');
			} catch {}
		!n && A.Image && ((new Image().src = e.A), (n = !0)),
			n || ((e.g = Gl(e.l, null)), e.g.ha(e.A)),
			(e.G = Date.now()),
			er(e);
	}
	Hl(t);
}
function Ii(t) {
	t.g && (So(t), t.g.cancel(), (t.g = null));
}
function Fl(t) {
	Ii(t),
		t.u && (A.clearTimeout(t.u), (t.u = null)),
		$r(t),
		t.i.cancel(),
		t.m && (typeof t.m == 'number' && A.clearTimeout(t.m), (t.m = null));
}
function wi(t) {
	if (!Cl(t.i) && !t.m) {
		t.m = !0;
		var e = t.Na;
		Vn || al(), On || (Vn(), (On = !0)), mo.add(e, t), (t.C = 0);
	}
}
function oy(t, e) {
	return bl(t.i) >= t.i.j - (t.m ? 1 : 0)
		? !1
		: t.m
			? ((t.j = e.F.concat(t.j)), !0)
			: t.H == 1 || t.H == 2 || t.C >= (t.cb ? 0 : t.eb)
				? !1
				: ((t.m = Jn(ae(t.Na, t, e), zl(t, t.C))), t.C++, !0);
}
_.Na = function (t) {
	if (this.m)
		if (((this.m = null), this.H == 1)) {
			if (!t) {
				(this.W = Math.floor(1e5 * Math.random())), (t = this.W++);
				const i = new Zn(this, this.l, t);
				let s = this.s;
				if (
					(this.U && (s ? ((s = Zu(s)), el(s, this.U)) : (s = this.U)),
					this.o !== null || this.O || ((i.I = s), (s = null)),
					this.P)
				)
					e: {
						for (var e = 0, n = 0; n < this.j.length; n++) {
							t: {
								var r = this.j[n];
								if ('__data__' in r.map && ((r = r.map.__data__), typeof r == 'string')) {
									r = r.length;
									break t;
								}
								r = void 0;
							}
							if (r === void 0) break;
							if (((e += r), 4096 < e)) {
								e = n;
								break e;
							}
							if (e === 4096 || n === this.j.length - 1) {
								e = n + 1;
								break e;
							}
						}
						e = 1e3;
					}
				else e = 1e3;
				(e = Bl(this, i, e)),
					(n = $e(this.I)),
					U(n, 'RID', t),
					U(n, 'CVER', 22),
					this.F && U(n, 'X-HTTP-Session-Id', this.F),
					nr(this, n),
					s &&
						(this.O
							? (e = 'headers=' + encodeURIComponent(String(xl(s))) + '&' + e)
							: this.o && wo(n, this.o, s)),
					To(this.i, i),
					this.bb && U(n, 'TYPE', 'init'),
					this.P
						? (U(n, '$req', e), U(n, 'SID', 'null'), (i.aa = !0), Is(i, n, null))
						: Is(i, n, e),
					(this.H = 2);
			}
		} else this.H == 3 && (t ? tc(this, t) : this.j.length == 0 || Cl(this.i) || tc(this));
};
function tc(t, e) {
	var n;
	e ? (n = e.m) : (n = t.W++);
	const r = $e(t.I);
	U(r, 'SID', t.K),
		U(r, 'RID', n),
		U(r, 'AID', t.V),
		nr(t, r),
		t.o && t.s && wo(r, t.o, t.s),
		(n = new Zn(t, t.l, n, t.C + 1)),
		t.o === null && (n.I = t.s),
		e && (t.j = e.F.concat(t.j)),
		(e = Bl(t, n, 1e3)),
		n.setTimeout(Math.round(0.5 * t.xa) + Math.round(0.5 * t.xa * Math.random())),
		To(t.i, n),
		Is(n, r, e);
}
function nr(t, e) {
	t.na &&
		co(t.na, function (n, r) {
			U(e, r, n);
		}),
		t.h &&
			Il({}, function (n, r) {
				U(e, r, n);
			});
}
function Bl(t, e, n) {
	n = Math.min(t.j.length, n);
	var r = t.h ? ae(t.h.Va, t.h, t) : null;
	e: {
		var i = t.j;
		let s = -1;
		for (;;) {
			const o = ['count=' + n];
			s == -1 ? (0 < n ? ((s = i[0].g), o.push('ofs=' + s)) : (s = 0)) : o.push('ofs=' + s);
			let a = !0;
			for (let c = 0; c < n; c++) {
				let u = i[c].g;
				const l = i[c].map;
				if (((u -= s), 0 > u)) (s = Math.max(0, i[c].g - 100)), (a = !1);
				else
					try {
						Z_(l, o, 'req' + u + '_');
					} catch {
						r && r(l);
					}
			}
			if (a) {
				r = o.join('&');
				break e;
			}
		}
	}
	return (t = t.j.splice(0, n)), (e.F = t), r;
}
function jl(t) {
	if (!t.g && !t.u) {
		t.ba = 1;
		var e = t.Ma;
		Vn || al(), On || (Vn(), (On = !0)), mo.add(e, t), (t.A = 0);
	}
}
function Ro(t) {
	return t.g || t.u || 3 <= t.A ? !1 : (t.ba++, (t.u = Jn(ae(t.Ma, t), zl(t, t.A))), t.A++, !0);
}
_.Ma = function () {
	if (((this.u = null), ql(this), this.ca && !(this.M || this.g == null || 0 >= this.S))) {
		var t = 2 * this.S;
		this.l.info('BP detection timer enabled: ' + t), (this.B = Jn(ae(this.jb, this), t));
	}
};
_.jb = function () {
	this.B &&
		((this.B = null),
		this.l.info('BP detection timeout reached.'),
		this.l.info('Buffering proxy detected and switch to long-polling!'),
		(this.G = !1),
		(this.M = !0),
		de(10),
		Ii(this),
		ql(this));
};
function So(t) {
	t.B != null && (A.clearTimeout(t.B), (t.B = null));
}
function ql(t) {
	(t.g = new Zn(t, t.l, 'rpc', t.ba)), t.o === null && (t.g.I = t.s), (t.g.O = 0);
	var e = $e(t.wa);
	U(e, 'RID', 'rpc'),
		U(e, 'SID', t.K),
		U(e, 'AID', t.V),
		U(e, 'CI', t.G ? '0' : '1'),
		!t.G && t.qa && U(e, 'TO', t.qa),
		U(e, 'TYPE', 'xmlhttp'),
		nr(t, e),
		t.o && t.s && wo(e, t.o, t.s),
		t.L && t.g.setTimeout(t.L);
	var n = t.g;
	(t = t.pa), (n.L = 1), (n.A = yi($e(e))), (n.u = null), (n.S = !0), yl(n, t);
}
_.ib = function () {
	this.v != null && ((this.v = null), Ii(this), Ro(this), de(19));
};
function $r(t) {
	t.v != null && (A.clearTimeout(t.v), (t.v = null));
}
function $l(t, e) {
	var n = null;
	if (t.g == e) {
		$r(t), So(t), (t.g = null);
		var r = 2;
	} else if (As(t.i, e)) (n = e.F), kl(t.i, e), (r = 1);
	else return;
	if (t.H != 0) {
		if (e.i)
			if (r == 1) {
				(n = e.u ? e.u.length : 0), (e = Date.now() - e.G);
				var i = t.C;
				(r = pi()), ne(r, new fl(r, n)), wi(t);
			} else jl(t);
		else if (
			((i = e.s), i == 3 || (i == 0 && 0 < e.ca) || !((r == 1 && oy(t, e)) || (r == 2 && Ro(t))))
		)
			switch ((n && 0 < n.length && ((e = t.i), (e.i = e.i.concat(n))), i)) {
				case 1:
					ft(t, 5);
					break;
				case 4:
					ft(t, 10);
					break;
				case 3:
					ft(t, 6);
					break;
				default:
					ft(t, 2);
			}
	}
}
function zl(t, e) {
	let n = t.ab + Math.floor(Math.random() * t.hb);
	return t.isActive() || (n *= 2), n * e;
}
function ft(t, e) {
	if ((t.l.info('Error code ' + e), e == 2)) {
		var n = null;
		t.h && (n = null);
		var r = ae(t.pb, t);
		n ||
			((n = new yt('//www.google.com/images/cleardot.gif')),
			(A.location && A.location.protocol == 'http') || jr(n, 'https'),
			yi(n)),
			ey(n.toString(), r);
	} else de(2);
	(t.H = 0), t.h && t.h.za(e), Hl(t), Fl(t);
}
_.pb = function (t) {
	t
		? (this.l.info('Successfully pinged google.com'), de(2))
		: (this.l.info('Failed to ping google.com'), de(1));
};
function Hl(t) {
	if (((t.H = 0), (t.ma = []), t.h)) {
		const e = Dl(t.i);
		(e.length != 0 || t.j.length != 0) &&
			(Ha(t.ma, e), Ha(t.ma, t.j), (t.i.i.length = 0), oo(t.j), (t.j.length = 0)),
			t.h.ya();
	}
}
function Wl(t, e, n) {
	var r = n instanceof yt ? $e(n) : new yt(n);
	if (r.g != '') e && (r.g = e + '.' + r.g), qr(r, r.m);
	else {
		var i = A.location;
		(r = i.protocol), (e = e ? e + '.' + i.hostname : i.hostname), (i = +i.port);
		var s = new yt(null);
		r && jr(s, r), e && (s.g = e), i && qr(s, i), n && (s.l = n), (r = s);
	}
	return (n = t.F), (e = t.Da), n && e && U(r, n, e), U(r, 'VER', t.ra), nr(t, r), r;
}
function Gl(t, e, n) {
	if (e && !t.J) throw Error("Can't create secondary domain capable XhrIo object.");
	return (e = t.Ha && !t.va ? new $(new vi({ ob: n })) : new $(t.va)), e.Oa(t.J), e;
}
_.isActive = function () {
	return !!this.h && this.h.isActive(this);
};
function Kl() {}
_ = Kl.prototype;
_.Ba = function () {};
_.Aa = function () {};
_.za = function () {};
_.ya = function () {};
_.isActive = function () {
	return !0;
};
_.Va = function () {};
function zr() {
	if (Ht && !(10 <= Number(v_))) throw Error('Environmental error: no available transport.');
}
zr.prototype.g = function (t, e) {
	return new ve(t, e);
};
function ve(t, e) {
	J.call(this),
		(this.g = new Ul(e)),
		(this.l = t),
		(this.h = (e && e.messageUrlParams) || null),
		(t = (e && e.messageHeaders) || null),
		e &&
			e.clientProtocolHeaderRequired &&
			(t ? (t['X-Client-Protocol'] = 'webchannel') : (t = { 'X-Client-Protocol': 'webchannel' })),
		(this.g.s = t),
		(t = (e && e.initMessageHeaders) || null),
		e &&
			e.messageContentType &&
			(t
				? (t['X-WebChannel-Content-Type'] = e.messageContentType)
				: (t = { 'X-WebChannel-Content-Type': e.messageContentType })),
		e &&
			e.Ca &&
			(t
				? (t['X-WebChannel-Client-Profile'] = e.Ca)
				: (t = { 'X-WebChannel-Client-Profile': e.Ca })),
		(this.g.U = t),
		(t = e && e.cc) && !Dn(t) && (this.g.o = t),
		(this.A = (e && e.supportsCrossDomainXhr) || !1),
		(this.v = (e && e.sendRawJson) || !1),
		(e = e && e.httpSessionIdParam) &&
			!Dn(e) &&
			((this.g.F = e), (t = this.h), t !== null && e in t && ((t = this.h), e in t && delete t[e])),
		(this.j = new rn(this));
}
Y(ve, J);
ve.prototype.m = function () {
	(this.g.h = this.j), this.A && (this.g.J = !0);
	var t = this.g,
		e = this.l,
		n = this.h || void 0;
	de(0), (t.Y = e), (t.na = n || {}), (t.G = t.aa), (t.I = Wl(t, null, t.Y)), wi(t);
};
ve.prototype.close = function () {
	Ao(this.g);
};
ve.prototype.u = function (t) {
	var e = this.g;
	if (typeof t == 'string') {
		var n = {};
		(n.__data__ = t), (t = n);
	} else this.v && ((n = {}), (n.__data__ = po(t)), (t = n));
	e.j.push(new Q_(e.fb++, t)), e.H == 3 && wi(e);
};
ve.prototype.N = function () {
	(this.g.h = null), delete this.j, Ao(this.g), delete this.g, ve.$.N.call(this);
};
function Ql(t) {
	vo.call(this),
		t.__headers__ &&
			((this.headers = t.__headers__),
			(this.statusCode = t.__status__),
			delete t.__headers__,
			delete t.__status__);
	var e = t.__sm__;
	if (e) {
		e: {
			for (const n in e) {
				t = n;
				break e;
			}
			t = void 0;
		}
		(this.i = t) && ((t = this.i), (e = e !== null && t in e ? e[t] : void 0)), (this.data = e);
	} else this.data = t;
}
Y(Ql, vo);
function Xl() {
	Eo.call(this), (this.status = 1);
}
Y(Xl, Eo);
function rn(t) {
	this.g = t;
}
Y(rn, Kl);
rn.prototype.Ba = function () {
	ne(this.g, 'a');
};
rn.prototype.Aa = function (t) {
	ne(this.g, new Ql(t));
};
rn.prototype.za = function (t) {
	ne(this.g, new Xl());
};
rn.prototype.ya = function () {
	ne(this.g, 'b');
};
function ay() {
	this.blockSize = -1;
}
function Ie() {
	(this.blockSize = -1),
		(this.blockSize = 64),
		(this.g = Array(4)),
		(this.m = Array(this.blockSize)),
		(this.i = this.h = 0),
		this.reset();
}
Y(Ie, ay);
Ie.prototype.reset = function () {
	(this.g[0] = 1732584193),
		(this.g[1] = 4023233417),
		(this.g[2] = 2562383102),
		(this.g[3] = 271733878),
		(this.i = this.h = 0);
};
function es(t, e, n) {
	n || (n = 0);
	var r = Array(16);
	if (typeof e == 'string')
		for (var i = 0; 16 > i; ++i)
			r[i] =
				e.charCodeAt(n++) |
				(e.charCodeAt(n++) << 8) |
				(e.charCodeAt(n++) << 16) |
				(e.charCodeAt(n++) << 24);
	else for (i = 0; 16 > i; ++i) r[i] = e[n++] | (e[n++] << 8) | (e[n++] << 16) | (e[n++] << 24);
	(e = t.g[0]), (n = t.g[1]), (i = t.g[2]);
	var s = t.g[3],
		o = (e + (s ^ (n & (i ^ s))) + r[0] + 3614090360) & 4294967295;
	(e = n + (((o << 7) & 4294967295) | (o >>> 25))),
		(o = (s + (i ^ (e & (n ^ i))) + r[1] + 3905402710) & 4294967295),
		(s = e + (((o << 12) & 4294967295) | (o >>> 20))),
		(o = (i + (n ^ (s & (e ^ n))) + r[2] + 606105819) & 4294967295),
		(i = s + (((o << 17) & 4294967295) | (o >>> 15))),
		(o = (n + (e ^ (i & (s ^ e))) + r[3] + 3250441966) & 4294967295),
		(n = i + (((o << 22) & 4294967295) | (o >>> 10))),
		(o = (e + (s ^ (n & (i ^ s))) + r[4] + 4118548399) & 4294967295),
		(e = n + (((o << 7) & 4294967295) | (o >>> 25))),
		(o = (s + (i ^ (e & (n ^ i))) + r[5] + 1200080426) & 4294967295),
		(s = e + (((o << 12) & 4294967295) | (o >>> 20))),
		(o = (i + (n ^ (s & (e ^ n))) + r[6] + 2821735955) & 4294967295),
		(i = s + (((o << 17) & 4294967295) | (o >>> 15))),
		(o = (n + (e ^ (i & (s ^ e))) + r[7] + 4249261313) & 4294967295),
		(n = i + (((o << 22) & 4294967295) | (o >>> 10))),
		(o = (e + (s ^ (n & (i ^ s))) + r[8] + 1770035416) & 4294967295),
		(e = n + (((o << 7) & 4294967295) | (o >>> 25))),
		(o = (s + (i ^ (e & (n ^ i))) + r[9] + 2336552879) & 4294967295),
		(s = e + (((o << 12) & 4294967295) | (o >>> 20))),
		(o = (i + (n ^ (s & (e ^ n))) + r[10] + 4294925233) & 4294967295),
		(i = s + (((o << 17) & 4294967295) | (o >>> 15))),
		(o = (n + (e ^ (i & (s ^ e))) + r[11] + 2304563134) & 4294967295),
		(n = i + (((o << 22) & 4294967295) | (o >>> 10))),
		(o = (e + (s ^ (n & (i ^ s))) + r[12] + 1804603682) & 4294967295),
		(e = n + (((o << 7) & 4294967295) | (o >>> 25))),
		(o = (s + (i ^ (e & (n ^ i))) + r[13] + 4254626195) & 4294967295),
		(s = e + (((o << 12) & 4294967295) | (o >>> 20))),
		(o = (i + (n ^ (s & (e ^ n))) + r[14] + 2792965006) & 4294967295),
		(i = s + (((o << 17) & 4294967295) | (o >>> 15))),
		(o = (n + (e ^ (i & (s ^ e))) + r[15] + 1236535329) & 4294967295),
		(n = i + (((o << 22) & 4294967295) | (o >>> 10))),
		(o = (e + (i ^ (s & (n ^ i))) + r[1] + 4129170786) & 4294967295),
		(e = n + (((o << 5) & 4294967295) | (o >>> 27))),
		(o = (s + (n ^ (i & (e ^ n))) + r[6] + 3225465664) & 4294967295),
		(s = e + (((o << 9) & 4294967295) | (o >>> 23))),
		(o = (i + (e ^ (n & (s ^ e))) + r[11] + 643717713) & 4294967295),
		(i = s + (((o << 14) & 4294967295) | (o >>> 18))),
		(o = (n + (s ^ (e & (i ^ s))) + r[0] + 3921069994) & 4294967295),
		(n = i + (((o << 20) & 4294967295) | (o >>> 12))),
		(o = (e + (i ^ (s & (n ^ i))) + r[5] + 3593408605) & 4294967295),
		(e = n + (((o << 5) & 4294967295) | (o >>> 27))),
		(o = (s + (n ^ (i & (e ^ n))) + r[10] + 38016083) & 4294967295),
		(s = e + (((o << 9) & 4294967295) | (o >>> 23))),
		(o = (i + (e ^ (n & (s ^ e))) + r[15] + 3634488961) & 4294967295),
		(i = s + (((o << 14) & 4294967295) | (o >>> 18))),
		(o = (n + (s ^ (e & (i ^ s))) + r[4] + 3889429448) & 4294967295),
		(n = i + (((o << 20) & 4294967295) | (o >>> 12))),
		(o = (e + (i ^ (s & (n ^ i))) + r[9] + 568446438) & 4294967295),
		(e = n + (((o << 5) & 4294967295) | (o >>> 27))),
		(o = (s + (n ^ (i & (e ^ n))) + r[14] + 3275163606) & 4294967295),
		(s = e + (((o << 9) & 4294967295) | (o >>> 23))),
		(o = (i + (e ^ (n & (s ^ e))) + r[3] + 4107603335) & 4294967295),
		(i = s + (((o << 14) & 4294967295) | (o >>> 18))),
		(o = (n + (s ^ (e & (i ^ s))) + r[8] + 1163531501) & 4294967295),
		(n = i + (((o << 20) & 4294967295) | (o >>> 12))),
		(o = (e + (i ^ (s & (n ^ i))) + r[13] + 2850285829) & 4294967295),
		(e = n + (((o << 5) & 4294967295) | (o >>> 27))),
		(o = (s + (n ^ (i & (e ^ n))) + r[2] + 4243563512) & 4294967295),
		(s = e + (((o << 9) & 4294967295) | (o >>> 23))),
		(o = (i + (e ^ (n & (s ^ e))) + r[7] + 1735328473) & 4294967295),
		(i = s + (((o << 14) & 4294967295) | (o >>> 18))),
		(o = (n + (s ^ (e & (i ^ s))) + r[12] + 2368359562) & 4294967295),
		(n = i + (((o << 20) & 4294967295) | (o >>> 12))),
		(o = (e + (n ^ i ^ s) + r[5] + 4294588738) & 4294967295),
		(e = n + (((o << 4) & 4294967295) | (o >>> 28))),
		(o = (s + (e ^ n ^ i) + r[8] + 2272392833) & 4294967295),
		(s = e + (((o << 11) & 4294967295) | (o >>> 21))),
		(o = (i + (s ^ e ^ n) + r[11] + 1839030562) & 4294967295),
		(i = s + (((o << 16) & 4294967295) | (o >>> 16))),
		(o = (n + (i ^ s ^ e) + r[14] + 4259657740) & 4294967295),
		(n = i + (((o << 23) & 4294967295) | (o >>> 9))),
		(o = (e + (n ^ i ^ s) + r[1] + 2763975236) & 4294967295),
		(e = n + (((o << 4) & 4294967295) | (o >>> 28))),
		(o = (s + (e ^ n ^ i) + r[4] + 1272893353) & 4294967295),
		(s = e + (((o << 11) & 4294967295) | (o >>> 21))),
		(o = (i + (s ^ e ^ n) + r[7] + 4139469664) & 4294967295),
		(i = s + (((o << 16) & 4294967295) | (o >>> 16))),
		(o = (n + (i ^ s ^ e) + r[10] + 3200236656) & 4294967295),
		(n = i + (((o << 23) & 4294967295) | (o >>> 9))),
		(o = (e + (n ^ i ^ s) + r[13] + 681279174) & 4294967295),
		(e = n + (((o << 4) & 4294967295) | (o >>> 28))),
		(o = (s + (e ^ n ^ i) + r[0] + 3936430074) & 4294967295),
		(s = e + (((o << 11) & 4294967295) | (o >>> 21))),
		(o = (i + (s ^ e ^ n) + r[3] + 3572445317) & 4294967295),
		(i = s + (((o << 16) & 4294967295) | (o >>> 16))),
		(o = (n + (i ^ s ^ e) + r[6] + 76029189) & 4294967295),
		(n = i + (((o << 23) & 4294967295) | (o >>> 9))),
		(o = (e + (n ^ i ^ s) + r[9] + 3654602809) & 4294967295),
		(e = n + (((o << 4) & 4294967295) | (o >>> 28))),
		(o = (s + (e ^ n ^ i) + r[12] + 3873151461) & 4294967295),
		(s = e + (((o << 11) & 4294967295) | (o >>> 21))),
		(o = (i + (s ^ e ^ n) + r[15] + 530742520) & 4294967295),
		(i = s + (((o << 16) & 4294967295) | (o >>> 16))),
		(o = (n + (i ^ s ^ e) + r[2] + 3299628645) & 4294967295),
		(n = i + (((o << 23) & 4294967295) | (o >>> 9))),
		(o = (e + (i ^ (n | ~s)) + r[0] + 4096336452) & 4294967295),
		(e = n + (((o << 6) & 4294967295) | (o >>> 26))),
		(o = (s + (n ^ (e | ~i)) + r[7] + 1126891415) & 4294967295),
		(s = e + (((o << 10) & 4294967295) | (o >>> 22))),
		(o = (i + (e ^ (s | ~n)) + r[14] + 2878612391) & 4294967295),
		(i = s + (((o << 15) & 4294967295) | (o >>> 17))),
		(o = (n + (s ^ (i | ~e)) + r[5] + 4237533241) & 4294967295),
		(n = i + (((o << 21) & 4294967295) | (o >>> 11))),
		(o = (e + (i ^ (n | ~s)) + r[12] + 1700485571) & 4294967295),
		(e = n + (((o << 6) & 4294967295) | (o >>> 26))),
		(o = (s + (n ^ (e | ~i)) + r[3] + 2399980690) & 4294967295),
		(s = e + (((o << 10) & 4294967295) | (o >>> 22))),
		(o = (i + (e ^ (s | ~n)) + r[10] + 4293915773) & 4294967295),
		(i = s + (((o << 15) & 4294967295) | (o >>> 17))),
		(o = (n + (s ^ (i | ~e)) + r[1] + 2240044497) & 4294967295),
		(n = i + (((o << 21) & 4294967295) | (o >>> 11))),
		(o = (e + (i ^ (n | ~s)) + r[8] + 1873313359) & 4294967295),
		(e = n + (((o << 6) & 4294967295) | (o >>> 26))),
		(o = (s + (n ^ (e | ~i)) + r[15] + 4264355552) & 4294967295),
		(s = e + (((o << 10) & 4294967295) | (o >>> 22))),
		(o = (i + (e ^ (s | ~n)) + r[6] + 2734768916) & 4294967295),
		(i = s + (((o << 15) & 4294967295) | (o >>> 17))),
		(o = (n + (s ^ (i | ~e)) + r[13] + 1309151649) & 4294967295),
		(n = i + (((o << 21) & 4294967295) | (o >>> 11))),
		(o = (e + (i ^ (n | ~s)) + r[4] + 4149444226) & 4294967295),
		(e = n + (((o << 6) & 4294967295) | (o >>> 26))),
		(o = (s + (n ^ (e | ~i)) + r[11] + 3174756917) & 4294967295),
		(s = e + (((o << 10) & 4294967295) | (o >>> 22))),
		(o = (i + (e ^ (s | ~n)) + r[2] + 718787259) & 4294967295),
		(i = s + (((o << 15) & 4294967295) | (o >>> 17))),
		(o = (n + (s ^ (i | ~e)) + r[9] + 3951481745) & 4294967295),
		(t.g[0] = (t.g[0] + e) & 4294967295),
		(t.g[1] = (t.g[1] + (i + (((o << 21) & 4294967295) | (o >>> 11)))) & 4294967295),
		(t.g[2] = (t.g[2] + i) & 4294967295),
		(t.g[3] = (t.g[3] + s) & 4294967295);
}
Ie.prototype.j = function (t, e) {
	e === void 0 && (e = t.length);
	for (var n = e - this.blockSize, r = this.m, i = this.h, s = 0; s < e; ) {
		if (i == 0) for (; s <= n; ) es(this, t, s), (s += this.blockSize);
		if (typeof t == 'string') {
			for (; s < e; )
				if (((r[i++] = t.charCodeAt(s++)), i == this.blockSize)) {
					es(this, r), (i = 0);
					break;
				}
		} else
			for (; s < e; )
				if (((r[i++] = t[s++]), i == this.blockSize)) {
					es(this, r), (i = 0);
					break;
				}
	}
	(this.h = i), (this.i += e);
};
Ie.prototype.l = function () {
	var t = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
	t[0] = 128;
	for (var e = 1; e < t.length - 8; ++e) t[e] = 0;
	var n = 8 * this.i;
	for (e = t.length - 8; e < t.length; ++e) (t[e] = n & 255), (n /= 256);
	for (this.j(t), t = Array(16), e = n = 0; 4 > e; ++e)
		for (var r = 0; 32 > r; r += 8) t[n++] = (this.g[e] >>> r) & 255;
	return t;
};
function V(t, e) {
	this.h = e;
	for (var n = [], r = !0, i = t.length - 1; 0 <= i; i--) {
		var s = t[i] | 0;
		(r && s == e) || ((n[i] = s), (r = !1));
	}
	this.g = n;
}
var cy = {};
function Po(t) {
	return -128 <= t && 128 > t
		? g_(t, function (e) {
				return new V([e | 0], 0 > e ? -1 : 0);
			})
		: new V([t | 0], 0 > t ? -1 : 0);
}
function Pe(t) {
	if (isNaN(t) || !isFinite(t)) return Bt;
	if (0 > t) return ee(Pe(-t));
	for (var e = [], n = 1, r = 0; t >= n; r++) (e[r] = (t / n) | 0), (n *= Rs);
	return new V(e, 0);
}
function Jl(t, e) {
	if (t.length == 0) throw Error('number format error: empty string');
	if (((e = e || 10), 2 > e || 36 < e)) throw Error('radix out of range: ' + e);
	if (t.charAt(0) == '-') return ee(Jl(t.substring(1), e));
	if (0 <= t.indexOf('-')) throw Error('number format error: interior "-" character');
	for (var n = Pe(Math.pow(e, 8)), r = Bt, i = 0; i < t.length; i += 8) {
		var s = Math.min(8, t.length - i),
			o = parseInt(t.substring(i, i + s), e);
		8 > s
			? ((s = Pe(Math.pow(e, s))), (r = r.R(s).add(Pe(o))))
			: ((r = r.R(n)), (r = r.add(Pe(o))));
	}
	return r;
}
var Rs = 4294967296,
	Bt = Po(0),
	Ss = Po(1),
	nc = Po(16777216);
_ = V.prototype;
_.ea = function () {
	if (Te(this)) return -ee(this).ea();
	for (var t = 0, e = 1, n = 0; n < this.g.length; n++) {
		var r = this.D(n);
		(t += (0 <= r ? r : Rs + r) * e), (e *= Rs);
	}
	return t;
};
_.toString = function (t) {
	if (((t = t || 10), 2 > t || 36 < t)) throw Error('radix out of range: ' + t);
	if (je(this)) return '0';
	if (Te(this)) return '-' + ee(this).toString(t);
	for (var e = Pe(Math.pow(t, 6)), n = this, r = ''; ; ) {
		var i = Wr(n, e).g;
		n = Hr(n, i.R(e));
		var s = ((0 < n.g.length ? n.g[0] : n.h) >>> 0).toString(t);
		if (((n = i), je(n))) return s + r;
		for (; 6 > s.length; ) s = '0' + s;
		r = s + r;
	}
};
_.D = function (t) {
	return 0 > t ? 0 : t < this.g.length ? this.g[t] : this.h;
};
function je(t) {
	if (t.h != 0) return !1;
	for (var e = 0; e < t.g.length; e++) if (t.g[e] != 0) return !1;
	return !0;
}
function Te(t) {
	return t.h == -1;
}
_.X = function (t) {
	return (t = Hr(this, t)), Te(t) ? -1 : je(t) ? 0 : 1;
};
function ee(t) {
	for (var e = t.g.length, n = [], r = 0; r < e; r++) n[r] = ~t.g[r];
	return new V(n, ~t.h).add(Ss);
}
_.abs = function () {
	return Te(this) ? ee(this) : this;
};
_.add = function (t) {
	for (var e = Math.max(this.g.length, t.g.length), n = [], r = 0, i = 0; i <= e; i++) {
		var s = r + (this.D(i) & 65535) + (t.D(i) & 65535),
			o = (s >>> 16) + (this.D(i) >>> 16) + (t.D(i) >>> 16);
		(r = o >>> 16), (s &= 65535), (o &= 65535), (n[i] = (o << 16) | s);
	}
	return new V(n, n[n.length - 1] & -2147483648 ? -1 : 0);
};
function Hr(t, e) {
	return t.add(ee(e));
}
_.R = function (t) {
	if (je(this) || je(t)) return Bt;
	if (Te(this)) return Te(t) ? ee(this).R(ee(t)) : ee(ee(this).R(t));
	if (Te(t)) return ee(this.R(ee(t)));
	if (0 > this.X(nc) && 0 > t.X(nc)) return Pe(this.ea() * t.ea());
	for (var e = this.g.length + t.g.length, n = [], r = 0; r < 2 * e; r++) n[r] = 0;
	for (r = 0; r < this.g.length; r++)
		for (var i = 0; i < t.g.length; i++) {
			var s = this.D(r) >>> 16,
				o = this.D(r) & 65535,
				a = t.D(i) >>> 16,
				c = t.D(i) & 65535;
			(n[2 * r + 2 * i] += o * c),
				Er(n, 2 * r + 2 * i),
				(n[2 * r + 2 * i + 1] += s * c),
				Er(n, 2 * r + 2 * i + 1),
				(n[2 * r + 2 * i + 1] += o * a),
				Er(n, 2 * r + 2 * i + 1),
				(n[2 * r + 2 * i + 2] += s * a),
				Er(n, 2 * r + 2 * i + 2);
		}
	for (r = 0; r < e; r++) n[r] = (n[2 * r + 1] << 16) | n[2 * r];
	for (r = e; r < 2 * e; r++) n[r] = 0;
	return new V(n, 0);
};
function Er(t, e) {
	for (; (t[e] & 65535) != t[e]; ) (t[e + 1] += t[e] >>> 16), (t[e] &= 65535), e++;
}
function dn(t, e) {
	(this.g = t), (this.h = e);
}
function Wr(t, e) {
	if (je(e)) throw Error('division by zero');
	if (je(t)) return new dn(Bt, Bt);
	if (Te(t)) return (e = Wr(ee(t), e)), new dn(ee(e.g), ee(e.h));
	if (Te(e)) return (e = Wr(t, ee(e))), new dn(ee(e.g), e.h);
	if (30 < t.g.length) {
		if (Te(t) || Te(e)) throw Error('slowDivide_ only works with positive integers.');
		for (var n = Ss, r = e; 0 >= r.X(t); ) (n = rc(n)), (r = rc(r));
		var i = Vt(n, 1),
			s = Vt(r, 1);
		for (r = Vt(r, 2), n = Vt(n, 2); !je(r); ) {
			var o = s.add(r);
			0 >= o.X(t) && ((i = i.add(n)), (s = o)), (r = Vt(r, 1)), (n = Vt(n, 1));
		}
		return (e = Hr(t, i.R(e))), new dn(i, e);
	}
	for (i = Bt; 0 <= t.X(e); ) {
		for (
			n = Math.max(1, Math.floor(t.ea() / e.ea())),
				r = Math.ceil(Math.log(n) / Math.LN2),
				r = 48 >= r ? 1 : Math.pow(2, r - 48),
				s = Pe(n),
				o = s.R(e);
			Te(o) || 0 < o.X(t);

		)
			(n -= r), (s = Pe(n)), (o = s.R(e));
		je(s) && (s = Ss), (i = i.add(s)), (t = Hr(t, o));
	}
	return new dn(i, t);
}
_.gb = function (t) {
	return Wr(this, t).h;
};
_.and = function (t) {
	for (var e = Math.max(this.g.length, t.g.length), n = [], r = 0; r < e; r++)
		n[r] = this.D(r) & t.D(r);
	return new V(n, this.h & t.h);
};
_.or = function (t) {
	for (var e = Math.max(this.g.length, t.g.length), n = [], r = 0; r < e; r++)
		n[r] = this.D(r) | t.D(r);
	return new V(n, this.h | t.h);
};
_.xor = function (t) {
	for (var e = Math.max(this.g.length, t.g.length), n = [], r = 0; r < e; r++)
		n[r] = this.D(r) ^ t.D(r);
	return new V(n, this.h ^ t.h);
};
function rc(t) {
	for (var e = t.g.length + 1, n = [], r = 0; r < e; r++)
		n[r] = (t.D(r) << 1) | (t.D(r - 1) >>> 31);
	return new V(n, t.h);
}
function Vt(t, e) {
	var n = e >> 5;
	e %= 32;
	for (var r = t.g.length - n, i = [], s = 0; s < r; s++)
		i[s] = 0 < e ? (t.D(s + n) >>> e) | (t.D(s + n + 1) << (32 - e)) : t.D(s + n);
	return new V(i, t.h);
}
zr.prototype.createWebChannel = zr.prototype.g;
ve.prototype.send = ve.prototype.u;
ve.prototype.open = ve.prototype.m;
ve.prototype.close = ve.prototype.close;
mi.NO_ERROR = 0;
mi.TIMEOUT = 8;
mi.HTTP_ERROR = 6;
pl.COMPLETE = 'complete';
ml.EventType = Yn;
Yn.OPEN = 'a';
Yn.CLOSE = 'b';
Yn.ERROR = 'c';
Yn.MESSAGE = 'd';
J.prototype.listen = J.prototype.O;
$.prototype.listenOnce = $.prototype.P;
$.prototype.getLastError = $.prototype.Sa;
$.prototype.getLastErrorCode = $.prototype.Ia;
$.prototype.getStatus = $.prototype.da;
$.prototype.getResponseJson = $.prototype.Wa;
$.prototype.getResponseText = $.prototype.ja;
$.prototype.send = $.prototype.ha;
$.prototype.setWithCredentials = $.prototype.Oa;
Ie.prototype.digest = Ie.prototype.l;
Ie.prototype.reset = Ie.prototype.reset;
Ie.prototype.update = Ie.prototype.j;
V.prototype.add = V.prototype.add;
V.prototype.multiply = V.prototype.R;
V.prototype.modulo = V.prototype.gb;
V.prototype.compare = V.prototype.X;
V.prototype.toNumber = V.prototype.ea;
V.prototype.toString = V.prototype.toString;
V.prototype.getBits = V.prototype.D;
V.fromNumber = Pe;
V.fromString = Jl;
var uy = function () {
		return new zr();
	},
	ly = function () {
		return pi();
	},
	ts = mi,
	hy = pl,
	dy = Pt,
	ic = {
		xb: 0,
		Ab: 1,
		Bb: 2,
		Ub: 3,
		Zb: 4,
		Wb: 5,
		Xb: 6,
		Vb: 7,
		Tb: 8,
		Yb: 9,
		PROXY: 10,
		NOPROXY: 11,
		Rb: 12,
		Nb: 13,
		Ob: 14,
		Mb: 15,
		Pb: 16,
		Qb: 17,
		tb: 18,
		sb: 19,
		ub: 20
	},
	Tr = ml,
	fy = $,
	py = Ie,
	jt = V;
const sc = '@firebase/firestore';
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class se {
	constructor(e) {
		this.uid = e;
	}
	isAuthenticated() {
		return this.uid != null;
	}
	toKey() {
		return this.isAuthenticated() ? 'uid:' + this.uid : 'anonymous-user';
	}
	isEqual(e) {
		return e.uid === this.uid;
	}
}
(se.UNAUTHENTICATED = new se(null)),
	(se.GOOGLE_CREDENTIALS = new se('google-credentials-uid')),
	(se.FIRST_PARTY = new se('first-party-uid')),
	(se.MOCK_USER = new se('mock-user'));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let sn = '10.8.1';
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wt = new Bs('@firebase/firestore');
function fn() {
	return wt.logLevel;
}
function g(t, ...e) {
	if (wt.logLevel <= b.DEBUG) {
		const n = e.map(Co);
		wt.debug(`Firestore (${sn}): ${t}`, ...n);
	}
}
function Le(t, ...e) {
	if (wt.logLevel <= b.ERROR) {
		const n = e.map(Co);
		wt.error(`Firestore (${sn}): ${t}`, ...n);
	}
}
function Wt(t, ...e) {
	if (wt.logLevel <= b.WARN) {
		const n = e.map(Co);
		wt.warn(`Firestore (${sn}): ${t}`, ...n);
	}
}
function Co(t) {
	if (typeof t == 'string') return t;
	try {
		/**
		 * @license
		 * Copyright 2020 Google LLC
		 *
		 * Licensed under the Apache License, Version 2.0 (the "License");
		 * you may not use this file except in compliance with the License.
		 * You may obtain a copy of the License at
		 *
		 *   http://www.apache.org/licenses/LICENSE-2.0
		 *
		 * Unless required by applicable law or agreed to in writing, software
		 * distributed under the License is distributed on an "AS IS" BASIS,
		 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		 * See the License for the specific language governing permissions and
		 * limitations under the License.
		 */ return (function (n) {
			return JSON.stringify(n);
		})(t);
	} catch {
		return t;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function w(t = 'Unexpected state') {
	const e = `FIRESTORE (${sn}) INTERNAL ASSERTION FAILED: ` + t;
	throw (Le(e), new Error(e));
}
function x(t, e) {
	t || w();
}
function P(t, e) {
	return t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const p = {
	OK: 'ok',
	CANCELLED: 'cancelled',
	UNKNOWN: 'unknown',
	INVALID_ARGUMENT: 'invalid-argument',
	DEADLINE_EXCEEDED: 'deadline-exceeded',
	NOT_FOUND: 'not-found',
	ALREADY_EXISTS: 'already-exists',
	PERMISSION_DENIED: 'permission-denied',
	UNAUTHENTICATED: 'unauthenticated',
	RESOURCE_EXHAUSTED: 'resource-exhausted',
	FAILED_PRECONDITION: 'failed-precondition',
	ABORTED: 'aborted',
	OUT_OF_RANGE: 'out-of-range',
	UNIMPLEMENTED: 'unimplemented',
	INTERNAL: 'internal',
	UNAVAILABLE: 'unavailable',
	DATA_LOSS: 'data-loss'
};
class y extends xe {
	constructor(e, n) {
		super(e, n),
			(this.code = e),
			(this.message = n),
			(this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class De {
	constructor() {
		this.promise = new Promise((e, n) => {
			(this.resolve = e), (this.reject = n);
		});
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Yl {
	constructor(e, n) {
		(this.user = n),
			(this.type = 'OAuth'),
			(this.headers = new Map()),
			this.headers.set('Authorization', `Bearer ${e}`);
	}
}
class my {
	getToken() {
		return Promise.resolve(null);
	}
	invalidateToken() {}
	start(e, n) {
		e.enqueueRetryable(() => n(se.UNAUTHENTICATED));
	}
	shutdown() {}
}
class gy {
	constructor(e) {
		(this.token = e), (this.changeListener = null);
	}
	getToken() {
		return Promise.resolve(this.token);
	}
	invalidateToken() {}
	start(e, n) {
		(this.changeListener = n), e.enqueueRetryable(() => n(this.token.user));
	}
	shutdown() {
		this.changeListener = null;
	}
}
class _y {
	constructor(e) {
		(this.t = e),
			(this.currentUser = se.UNAUTHENTICATED),
			(this.i = 0),
			(this.forceRefresh = !1),
			(this.auth = null);
	}
	start(e, n) {
		let r = this.i;
		const i = (c) => (this.i !== r ? ((r = this.i), n(c)) : Promise.resolve());
		let s = new De();
		this.o = () => {
			this.i++,
				(this.currentUser = this.u()),
				s.resolve(),
				(s = new De()),
				e.enqueueRetryable(() => i(this.currentUser));
		};
		const o = () => {
				const c = s;
				e.enqueueRetryable(async () => {
					await c.promise, await i(this.currentUser);
				});
			},
			a = (c) => {
				g('FirebaseAuthCredentialsProvider', 'Auth detected'),
					(this.auth = c),
					this.auth.addAuthTokenListener(this.o),
					o();
			};
		this.t.onInit((c) => a(c)),
			setTimeout(() => {
				if (!this.auth) {
					const c = this.t.getImmediate({ optional: !0 });
					c
						? a(c)
						: (g('FirebaseAuthCredentialsProvider', 'Auth not yet detected'),
							s.resolve(),
							(s = new De()));
				}
			}, 0),
			o();
	}
	getToken() {
		const e = this.i,
			n = this.forceRefresh;
		return (
			(this.forceRefresh = !1),
			this.auth
				? this.auth
						.getToken(n)
						.then((r) =>
							this.i !== e
								? (g('FirebaseAuthCredentialsProvider', 'getToken aborted due to token change.'),
									this.getToken())
								: r
									? (x(typeof r.accessToken == 'string'), new Yl(r.accessToken, this.currentUser))
									: null
						)
				: Promise.resolve(null)
		);
	}
	invalidateToken() {
		this.forceRefresh = !0;
	}
	shutdown() {
		this.auth && this.auth.removeAuthTokenListener(this.o);
	}
	u() {
		const e = this.auth && this.auth.getUid();
		return x(e === null || typeof e == 'string'), new se(e);
	}
}
class yy {
	constructor(e, n, r) {
		(this.l = e),
			(this.h = n),
			(this.P = r),
			(this.type = 'FirstParty'),
			(this.user = se.FIRST_PARTY),
			(this.I = new Map());
	}
	T() {
		return this.P ? this.P() : null;
	}
	get headers() {
		this.I.set('X-Goog-AuthUser', this.l);
		const e = this.T();
		return (
			e && this.I.set('Authorization', e),
			this.h && this.I.set('X-Goog-Iam-Authorization-Token', this.h),
			this.I
		);
	}
}
class vy {
	constructor(e, n, r) {
		(this.l = e), (this.h = n), (this.P = r);
	}
	getToken() {
		return Promise.resolve(new yy(this.l, this.h, this.P));
	}
	start(e, n) {
		e.enqueueRetryable(() => n(se.FIRST_PARTY));
	}
	shutdown() {}
	invalidateToken() {}
}
class Ey {
	constructor(e) {
		(this.value = e),
			(this.type = 'AppCheck'),
			(this.headers = new Map()),
			e && e.length > 0 && this.headers.set('x-firebase-appcheck', this.value);
	}
}
class Ty {
	constructor(e) {
		(this.A = e), (this.forceRefresh = !1), (this.appCheck = null), (this.R = null);
	}
	start(e, n) {
		const r = (s) => {
			s.error != null &&
				g(
					'FirebaseAppCheckTokenProvider',
					`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`
				);
			const o = s.token !== this.R;
			return (
				(this.R = s.token),
				g('FirebaseAppCheckTokenProvider', `Received ${o ? 'new' : 'existing'} token.`),
				o ? n(s.token) : Promise.resolve()
			);
		};
		this.o = (s) => {
			e.enqueueRetryable(() => r(s));
		};
		const i = (s) => {
			g('FirebaseAppCheckTokenProvider', 'AppCheck detected'),
				(this.appCheck = s),
				this.appCheck.addTokenListener(this.o);
		};
		this.A.onInit((s) => i(s)),
			setTimeout(() => {
				if (!this.appCheck) {
					const s = this.A.getImmediate({ optional: !0 });
					s ? i(s) : g('FirebaseAppCheckTokenProvider', 'AppCheck not yet detected');
				}
			}, 0);
	}
	getToken() {
		const e = this.forceRefresh;
		return (
			(this.forceRefresh = !1),
			this.appCheck
				? this.appCheck
						.getToken(e)
						.then((n) =>
							n ? (x(typeof n.token == 'string'), (this.R = n.token), new Ey(n.token)) : null
						)
				: Promise.resolve(null)
		);
	}
	invalidateToken() {
		this.forceRefresh = !0;
	}
	shutdown() {
		this.appCheck && this.appCheck.removeTokenListener(this.o);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Iy(t) {
	const e = typeof self < 'u' && (self.crypto || self.msCrypto),
		n = new Uint8Array(t);
	if (e && typeof e.getRandomValues == 'function') e.getRandomValues(n);
	else for (let r = 0; r < t; r++) n[r] = Math.floor(256 * Math.random());
	return n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Zl {
	static newId() {
		const e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
			n = Math.floor(256 / e.length) * e.length;
		let r = '';
		for (; r.length < 20; ) {
			const i = Iy(40);
			for (let s = 0; s < i.length; ++s)
				r.length < 20 && i[s] < n && (r += e.charAt(i[s] % e.length));
		}
		return r;
	}
}
function N(t, e) {
	return t < e ? -1 : t > e ? 1 : 0;
}
function Gt(t, e, n) {
	return t.length === e.length && t.every((r, i) => n(r, e[i]));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Q {
	constructor(e, n) {
		if (((this.seconds = e), (this.nanoseconds = n), n < 0))
			throw new y(p.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + n);
		if (n >= 1e9) throw new y(p.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + n);
		if (e < -62135596800) throw new y(p.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + e);
		if (e >= 253402300800) throw new y(p.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + e);
	}
	static now() {
		return Q.fromMillis(Date.now());
	}
	static fromDate(e) {
		return Q.fromMillis(e.getTime());
	}
	static fromMillis(e) {
		const n = Math.floor(e / 1e3),
			r = Math.floor(1e6 * (e - 1e3 * n));
		return new Q(n, r);
	}
	toDate() {
		return new Date(this.toMillis());
	}
	toMillis() {
		return 1e3 * this.seconds + this.nanoseconds / 1e6;
	}
	_compareTo(e) {
		return this.seconds === e.seconds
			? N(this.nanoseconds, e.nanoseconds)
			: N(this.seconds, e.seconds);
	}
	isEqual(e) {
		return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
	}
	toString() {
		return 'Timestamp(seconds=' + this.seconds + ', nanoseconds=' + this.nanoseconds + ')';
	}
	toJSON() {
		return { seconds: this.seconds, nanoseconds: this.nanoseconds };
	}
	valueOf() {
		const e = this.seconds - -62135596800;
		return String(e).padStart(12, '0') + '.' + String(this.nanoseconds).padStart(9, '0');
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class R {
	constructor(e) {
		this.timestamp = e;
	}
	static fromTimestamp(e) {
		return new R(e);
	}
	static min() {
		return new R(new Q(0, 0));
	}
	static max() {
		return new R(new Q(253402300799, 999999999));
	}
	compareTo(e) {
		return this.timestamp._compareTo(e.timestamp);
	}
	isEqual(e) {
		return this.timestamp.isEqual(e.timestamp);
	}
	toMicroseconds() {
		return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
	}
	toString() {
		return 'SnapshotVersion(' + this.timestamp.toString() + ')';
	}
	toTimestamp() {
		return this.timestamp;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fn {
	constructor(e, n, r) {
		n === void 0 ? (n = 0) : n > e.length && w(),
			r === void 0 ? (r = e.length - n) : r > e.length - n && w(),
			(this.segments = e),
			(this.offset = n),
			(this.len = r);
	}
	get length() {
		return this.len;
	}
	isEqual(e) {
		return Fn.comparator(this, e) === 0;
	}
	child(e) {
		const n = this.segments.slice(this.offset, this.limit());
		return (
			e instanceof Fn
				? e.forEach((r) => {
						n.push(r);
					})
				: n.push(e),
			this.construct(n)
		);
	}
	limit() {
		return this.offset + this.length;
	}
	popFirst(e) {
		return (
			(e = e === void 0 ? 1 : e), this.construct(this.segments, this.offset + e, this.length - e)
		);
	}
	popLast() {
		return this.construct(this.segments, this.offset, this.length - 1);
	}
	firstSegment() {
		return this.segments[this.offset];
	}
	lastSegment() {
		return this.get(this.length - 1);
	}
	get(e) {
		return this.segments[this.offset + e];
	}
	isEmpty() {
		return this.length === 0;
	}
	isPrefixOf(e) {
		if (e.length < this.length) return !1;
		for (let n = 0; n < this.length; n++) if (this.get(n) !== e.get(n)) return !1;
		return !0;
	}
	isImmediateParentOf(e) {
		if (this.length + 1 !== e.length) return !1;
		for (let n = 0; n < this.length; n++) if (this.get(n) !== e.get(n)) return !1;
		return !0;
	}
	forEach(e) {
		for (let n = this.offset, r = this.limit(); n < r; n++) e(this.segments[n]);
	}
	toArray() {
		return this.segments.slice(this.offset, this.limit());
	}
	static comparator(e, n) {
		const r = Math.min(e.length, n.length);
		for (let i = 0; i < r; i++) {
			const s = e.get(i),
				o = n.get(i);
			if (s < o) return -1;
			if (s > o) return 1;
		}
		return e.length < n.length ? -1 : e.length > n.length ? 1 : 0;
	}
}
class F extends Fn {
	construct(e, n, r) {
		return new F(e, n, r);
	}
	canonicalString() {
		return this.toArray().join('/');
	}
	toString() {
		return this.canonicalString();
	}
	toUriEncodedString() {
		return this.toArray().map(encodeURIComponent).join('/');
	}
	static fromString(...e) {
		const n = [];
		for (const r of e) {
			if (r.indexOf('//') >= 0)
				throw new y(
					p.INVALID_ARGUMENT,
					`Invalid segment (${r}). Paths must not contain // in them.`
				);
			n.push(...r.split('/').filter((i) => i.length > 0));
		}
		return new F(n);
	}
	static emptyPath() {
		return new F([]);
	}
}
const wy = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class te extends Fn {
	construct(e, n, r) {
		return new te(e, n, r);
	}
	static isValidIdentifier(e) {
		return wy.test(e);
	}
	canonicalString() {
		return this.toArray()
			.map(
				(e) => (
					(e = e.replace(/\\/g, '\\\\').replace(/`/g, '\\`')),
					te.isValidIdentifier(e) || (e = '`' + e + '`'),
					e
				)
			)
			.join('.');
	}
	toString() {
		return this.canonicalString();
	}
	isKeyField() {
		return this.length === 1 && this.get(0) === '__name__';
	}
	static keyField() {
		return new te(['__name__']);
	}
	static fromServerFormat(e) {
		const n = [];
		let r = '',
			i = 0;
		const s = () => {
			if (r.length === 0)
				throw new y(
					p.INVALID_ARGUMENT,
					`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
				);
			n.push(r), (r = '');
		};
		let o = !1;
		for (; i < e.length; ) {
			const a = e[i];
			if (a === '\\') {
				if (i + 1 === e.length)
					throw new y(p.INVALID_ARGUMENT, 'Path has trailing escape character: ' + e);
				const c = e[i + 1];
				if (c !== '\\' && c !== '.' && c !== '`')
					throw new y(p.INVALID_ARGUMENT, 'Path has invalid escape sequence: ' + e);
				(r += c), (i += 2);
			} else a === '`' ? ((o = !o), i++) : a !== '.' || o ? ((r += a), i++) : (s(), i++);
		}
		if ((s(), o)) throw new y(p.INVALID_ARGUMENT, 'Unterminated ` in path: ' + e);
		return new te(n);
	}
	static emptyPath() {
		return new te([]);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class T {
	constructor(e) {
		this.path = e;
	}
	static fromPath(e) {
		return new T(F.fromString(e));
	}
	static fromName(e) {
		return new T(F.fromString(e).popFirst(5));
	}
	static empty() {
		return new T(F.emptyPath());
	}
	get collectionGroup() {
		return this.path.popLast().lastSegment();
	}
	hasCollectionId(e) {
		return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
	}
	getCollectionGroup() {
		return this.path.get(this.path.length - 2);
	}
	getCollectionPath() {
		return this.path.popLast();
	}
	isEqual(e) {
		return e !== null && F.comparator(this.path, e.path) === 0;
	}
	toString() {
		return this.path.toString();
	}
	static comparator(e, n) {
		return F.comparator(e.path, n.path);
	}
	static isDocumentKey(e) {
		return e.length % 2 == 0;
	}
	static fromSegments(e) {
		return new T(new F(e.slice()));
	}
}
function Ay(t, e) {
	const n = t.toTimestamp().seconds,
		r = t.toTimestamp().nanoseconds + 1,
		i = R.fromTimestamp(r === 1e9 ? new Q(n + 1, 0) : new Q(n, r));
	return new rt(i, T.empty(), e);
}
function Ry(t) {
	return new rt(t.readTime, t.key, -1);
}
class rt {
	constructor(e, n, r) {
		(this.readTime = e), (this.documentKey = n), (this.largestBatchId = r);
	}
	static min() {
		return new rt(R.min(), T.empty(), -1);
	}
	static max() {
		return new rt(R.max(), T.empty(), -1);
	}
}
function Sy(t, e) {
	let n = t.readTime.compareTo(e.readTime);
	return n !== 0
		? n
		: ((n = T.comparator(t.documentKey, e.documentKey)),
			n !== 0 ? n : N(t.largestBatchId, e.largestBatchId));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Py =
	'The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.';
class Cy {
	constructor() {
		this.onCommittedListeners = [];
	}
	addOnCommittedListener(e) {
		this.onCommittedListeners.push(e);
	}
	raiseOnCommittedEvent() {
		this.onCommittedListeners.forEach((e) => e());
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function rr(t) {
	if (t.code !== p.FAILED_PRECONDITION || t.message !== Py) throw t;
	g('LocalStore', 'Unexpectedly lost primary lease');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class m {
	constructor(e) {
		(this.nextCallback = null),
			(this.catchCallback = null),
			(this.result = void 0),
			(this.error = void 0),
			(this.isDone = !1),
			(this.callbackAttached = !1),
			e(
				(n) => {
					(this.isDone = !0), (this.result = n), this.nextCallback && this.nextCallback(n);
				},
				(n) => {
					(this.isDone = !0), (this.error = n), this.catchCallback && this.catchCallback(n);
				}
			);
	}
	catch(e) {
		return this.next(void 0, e);
	}
	next(e, n) {
		return (
			this.callbackAttached && w(),
			(this.callbackAttached = !0),
			this.isDone
				? this.error
					? this.wrapFailure(n, this.error)
					: this.wrapSuccess(e, this.result)
				: new m((r, i) => {
						(this.nextCallback = (s) => {
							this.wrapSuccess(e, s).next(r, i);
						}),
							(this.catchCallback = (s) => {
								this.wrapFailure(n, s).next(r, i);
							});
					})
		);
	}
	toPromise() {
		return new Promise((e, n) => {
			this.next(e, n);
		});
	}
	wrapUserFunction(e) {
		try {
			const n = e();
			return n instanceof m ? n : m.resolve(n);
		} catch (n) {
			return m.reject(n);
		}
	}
	wrapSuccess(e, n) {
		return e ? this.wrapUserFunction(() => e(n)) : m.resolve(n);
	}
	wrapFailure(e, n) {
		return e ? this.wrapUserFunction(() => e(n)) : m.reject(n);
	}
	static resolve(e) {
		return new m((n, r) => {
			n(e);
		});
	}
	static reject(e) {
		return new m((n, r) => {
			r(e);
		});
	}
	static waitFor(e) {
		return new m((n, r) => {
			let i = 0,
				s = 0,
				o = !1;
			e.forEach((a) => {
				++i,
					a.next(
						() => {
							++s, o && s === i && n();
						},
						(c) => r(c)
					);
			}),
				(o = !0),
				s === i && n();
		});
	}
	static or(e) {
		let n = m.resolve(!1);
		for (const r of e) n = n.next((i) => (i ? m.resolve(i) : r()));
		return n;
	}
	static forEach(e, n) {
		const r = [];
		return (
			e.forEach((i, s) => {
				r.push(n.call(this, i, s));
			}),
			this.waitFor(r)
		);
	}
	static mapArray(e, n) {
		return new m((r, i) => {
			const s = e.length,
				o = new Array(s);
			let a = 0;
			for (let c = 0; c < s; c++) {
				const u = c;
				n(e[u]).next(
					(l) => {
						(o[u] = l), ++a, a === s && r(o);
					},
					(l) => i(l)
				);
			}
		});
	}
	static doWhile(e, n) {
		return new m((r, i) => {
			const s = () => {
				e() === !0
					? n().next(() => {
							s();
						}, i)
					: r();
			};
			s();
		});
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bo {
	constructor(e, n) {
		(this.action = e),
			(this.transaction = n),
			(this.aborted = !1),
			(this.V = new De()),
			(this.transaction.oncomplete = () => {
				this.V.resolve();
			}),
			(this.transaction.onabort = () => {
				n.error ? this.V.reject(new wn(e, n.error)) : this.V.resolve();
			}),
			(this.transaction.onerror = (r) => {
				const i = ko(r.target.error);
				this.V.reject(new wn(e, i));
			});
	}
	static open(e, n, r, i) {
		try {
			return new bo(n, e.transaction(i, r));
		} catch (s) {
			throw new wn(n, s);
		}
	}
	get m() {
		return this.V.promise;
	}
	abort(e) {
		e && this.V.reject(e),
			this.aborted ||
				(g('SimpleDb', 'Aborting transaction:', e ? e.message : 'Client-initiated abort'),
				(this.aborted = !0),
				this.transaction.abort());
	}
	g() {
		const e = this.transaction;
		this.aborted || typeof e.commit != 'function' || e.commit();
	}
	store(e) {
		const n = this.transaction.objectStore(e);
		return new ky(n);
	}
}
class pt {
	constructor(e, n, r) {
		(this.name = e),
			(this.version = n),
			(this.p = r),
			pt.S(K()) === 12.2 &&
				Le(
					'Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.'
				);
	}
	static delete(e) {
		return (
			g('SimpleDb', 'Removing database:', e), lt(window.indexedDB.deleteDatabase(e)).toPromise()
		);
	}
	static D() {
		if (!Jc()) return !1;
		if (pt.C()) return !0;
		const e = K(),
			n = pt.S(e),
			r = 0 < n && n < 10,
			i = pt.v(e),
			s = 0 < i && i < 4.5;
		return !(
			e.indexOf('MSIE ') > 0 ||
			e.indexOf('Trident/') > 0 ||
			e.indexOf('Edge/') > 0 ||
			r ||
			s
		);
	}
	static C() {
		var e;
		return (
			typeof process < 'u' &&
			((e = process.__PRIVATE_env) === null || e === void 0 ? void 0 : e.F) === 'YES'
		);
	}
	static M(e, n) {
		return e.store(n);
	}
	static S(e) {
		const n = e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
			r = n ? n[1].split('_').slice(0, 2).join('.') : '-1';
		return Number(r);
	}
	static v(e) {
		const n = e.match(/Android ([\d.]+)/i),
			r = n ? n[1].split('.').slice(0, 2).join('.') : '-1';
		return Number(r);
	}
	async O(e) {
		return (
			this.db ||
				(g('SimpleDb', 'Opening database:', this.name),
				(this.db = await new Promise((n, r) => {
					const i = indexedDB.open(this.name, this.version);
					(i.onsuccess = (s) => {
						const o = s.target.result;
						n(o);
					}),
						(i.onblocked = () => {
							r(
								new wn(
									e,
									'Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed.'
								)
							);
						}),
						(i.onerror = (s) => {
							const o = s.target.error;
							o.name === 'VersionError'
								? r(
										new y(
											p.FAILED_PRECONDITION,
											'A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.'
										)
									)
								: o.name === 'InvalidStateError'
									? r(
											new y(
												p.FAILED_PRECONDITION,
												'Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: ' +
													o
											)
										)
									: r(new wn(e, o));
						}),
						(i.onupgradeneeded = (s) => {
							g(
								'SimpleDb',
								'Database "' + this.name + '" requires upgrade from version:',
								s.oldVersion
							);
							const o = s.target.result;
							this.p.N(o, i.transaction, s.oldVersion, this.version).next(() => {
								g('SimpleDb', 'Database upgrade to version ' + this.version + ' complete');
							});
						});
				}))),
			this.B && (this.db.onversionchange = (n) => this.B(n)),
			this.db
		);
	}
	L(e) {
		(this.B = e), this.db && (this.db.onversionchange = (n) => e(n));
	}
	async runTransaction(e, n, r, i) {
		const s = n === 'readonly';
		let o = 0;
		for (;;) {
			++o;
			try {
				this.db = await this.O(e);
				const a = bo.open(this.db, e, s ? 'readonly' : 'readwrite', r),
					c = i(a)
						.next((u) => (a.g(), u))
						.catch((u) => (a.abort(u), m.reject(u)))
						.toPromise();
				return c.catch(() => {}), await a.m, c;
			} catch (a) {
				const c = a,
					u = c.name !== 'FirebaseError' && o < 3;
				if (
					(g('SimpleDb', 'Transaction failed with error:', c.message, 'Retrying:', u),
					this.close(),
					!u)
				)
					return Promise.reject(c);
			}
		}
	}
	close() {
		this.db && this.db.close(), (this.db = void 0);
	}
}
class by {
	constructor(e) {
		(this.k = e), (this.q = !1), (this.K = null);
	}
	get isDone() {
		return this.q;
	}
	get $() {
		return this.K;
	}
	set cursor(e) {
		this.k = e;
	}
	done() {
		this.q = !0;
	}
	U(e) {
		this.K = e;
	}
	delete() {
		return lt(this.k.delete());
	}
}
class wn extends y {
	constructor(e, n) {
		super(p.UNAVAILABLE, `IndexedDB transaction '${e}' failed: ${n}`),
			(this.name = 'IndexedDbTransactionError');
	}
}
function ir(t) {
	return t.name === 'IndexedDbTransactionError';
}
class ky {
	constructor(e) {
		this.store = e;
	}
	put(e, n) {
		let r;
		return (
			n !== void 0
				? (g('SimpleDb', 'PUT', this.store.name, e, n), (r = this.store.put(n, e)))
				: (g('SimpleDb', 'PUT', this.store.name, '<auto-key>', e), (r = this.store.put(e))),
			lt(r)
		);
	}
	add(e) {
		return g('SimpleDb', 'ADD', this.store.name, e, e), lt(this.store.add(e));
	}
	get(e) {
		return lt(this.store.get(e)).next(
			(n) => (n === void 0 && (n = null), g('SimpleDb', 'GET', this.store.name, e, n), n)
		);
	}
	delete(e) {
		return g('SimpleDb', 'DELETE', this.store.name, e), lt(this.store.delete(e));
	}
	count() {
		return g('SimpleDb', 'COUNT', this.store.name), lt(this.store.count());
	}
	W(e, n) {
		const r = this.options(e, n),
			i = r.index ? this.store.index(r.index) : this.store;
		if (typeof i.getAll == 'function') {
			const s = i.getAll(r.range);
			return new m((o, a) => {
				(s.onerror = (c) => {
					a(c.target.error);
				}),
					(s.onsuccess = (c) => {
						o(c.target.result);
					});
			});
		}
		{
			const s = this.cursor(r),
				o = [];
			return this.G(s, (a, c) => {
				o.push(c);
			}).next(() => o);
		}
	}
	j(e, n) {
		const r = this.store.getAll(e, n === null ? void 0 : n);
		return new m((i, s) => {
			(r.onerror = (o) => {
				s(o.target.error);
			}),
				(r.onsuccess = (o) => {
					i(o.target.result);
				});
		});
	}
	H(e, n) {
		g('SimpleDb', 'DELETE ALL', this.store.name);
		const r = this.options(e, n);
		r.J = !1;
		const i = this.cursor(r);
		return this.G(i, (s, o, a) => a.delete());
	}
	Y(e, n) {
		let r;
		n ? (r = e) : ((r = {}), (n = e));
		const i = this.cursor(r);
		return this.G(i, n);
	}
	Z(e) {
		const n = this.cursor({});
		return new m((r, i) => {
			(n.onerror = (s) => {
				const o = ko(s.target.error);
				i(o);
			}),
				(n.onsuccess = (s) => {
					const o = s.target.result;
					o
						? e(o.primaryKey, o.value).next((a) => {
								a ? o.continue() : r();
							})
						: r();
				});
		});
	}
	G(e, n) {
		const r = [];
		return new m((i, s) => {
			(e.onerror = (o) => {
				s(o.target.error);
			}),
				(e.onsuccess = (o) => {
					const a = o.target.result;
					if (!a) return void i();
					const c = new by(a),
						u = n(a.primaryKey, a.value, c);
					if (u instanceof m) {
						const l = u.catch((h) => (c.done(), m.reject(h)));
						r.push(l);
					}
					c.isDone ? i() : c.$ === null ? a.continue() : a.continue(c.$);
				});
		}).next(() => m.waitFor(r));
	}
	options(e, n) {
		let r;
		return e !== void 0 && (typeof e == 'string' ? (r = e) : (n = e)), { index: r, range: n };
	}
	cursor(e) {
		let n = 'next';
		if ((e.reverse && (n = 'prev'), e.index)) {
			const r = this.store.index(e.index);
			return e.J ? r.openKeyCursor(e.range, n) : r.openCursor(e.range, n);
		}
		return this.store.openCursor(e.range, n);
	}
}
function lt(t) {
	return new m((e, n) => {
		(t.onsuccess = (r) => {
			const i = r.target.result;
			e(i);
		}),
			(t.onerror = (r) => {
				const i = ko(r.target.error);
				n(i);
			});
	});
}
let oc = !1;
function ko(t) {
	const e = pt.S(K());
	if (e >= 12.2 && e < 13) {
		const n = 'An internal error was encountered in the Indexed Database server';
		if (t.message.indexOf(n) >= 0) {
			const r = new y(
				'internal',
				`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${n}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`
			);
			return (
				oc ||
					((oc = !0),
					setTimeout(() => {
						throw r;
					}, 0)),
				r
			);
		}
	}
	return t;
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Do {
	constructor(e, n) {
		(this.previousValue = e),
			n &&
				((n.sequenceNumberHandler = (r) => this.se(r)),
				(this.oe = (r) => n.writeSequenceNumber(r)));
	}
	se(e) {
		return (this.previousValue = Math.max(e, this.previousValue)), this.previousValue;
	}
	next() {
		const e = ++this.previousValue;
		return this.oe && this.oe(e), e;
	}
}
Do._e = -1;
function Ai(t) {
	return t == null;
}
function Gr(t) {
	return t === 0 && 1 / t == -1 / 0;
}
function Dy(t) {
	return (
		typeof t == 'number' &&
		Number.isInteger(t) &&
		!Gr(t) &&
		t <= Number.MAX_SAFE_INTEGER &&
		t >= Number.MIN_SAFE_INTEGER
	);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ac(t) {
	let e = 0;
	for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
	return e;
}
function Ct(t, e) {
	for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}
function eh(t) {
	for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
	return !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class j {
	constructor(e, n) {
		(this.comparator = e), (this.root = n || Z.EMPTY);
	}
	insert(e, n) {
		return new j(
			this.comparator,
			this.root.insert(e, n, this.comparator).copy(null, null, Z.BLACK, null, null)
		);
	}
	remove(e) {
		return new j(
			this.comparator,
			this.root.remove(e, this.comparator).copy(null, null, Z.BLACK, null, null)
		);
	}
	get(e) {
		let n = this.root;
		for (; !n.isEmpty(); ) {
			const r = this.comparator(e, n.key);
			if (r === 0) return n.value;
			r < 0 ? (n = n.left) : r > 0 && (n = n.right);
		}
		return null;
	}
	indexOf(e) {
		let n = 0,
			r = this.root;
		for (; !r.isEmpty(); ) {
			const i = this.comparator(e, r.key);
			if (i === 0) return n + r.left.size;
			i < 0 ? (r = r.left) : ((n += r.left.size + 1), (r = r.right));
		}
		return -1;
	}
	isEmpty() {
		return this.root.isEmpty();
	}
	get size() {
		return this.root.size;
	}
	minKey() {
		return this.root.minKey();
	}
	maxKey() {
		return this.root.maxKey();
	}
	inorderTraversal(e) {
		return this.root.inorderTraversal(e);
	}
	forEach(e) {
		this.inorderTraversal((n, r) => (e(n, r), !1));
	}
	toString() {
		const e = [];
		return this.inorderTraversal((n, r) => (e.push(`${n}:${r}`), !1)), `{${e.join(', ')}}`;
	}
	reverseTraversal(e) {
		return this.root.reverseTraversal(e);
	}
	getIterator() {
		return new Ir(this.root, null, this.comparator, !1);
	}
	getIteratorFrom(e) {
		return new Ir(this.root, e, this.comparator, !1);
	}
	getReverseIterator() {
		return new Ir(this.root, null, this.comparator, !0);
	}
	getReverseIteratorFrom(e) {
		return new Ir(this.root, e, this.comparator, !0);
	}
}
class Ir {
	constructor(e, n, r, i) {
		(this.isReverse = i), (this.nodeStack = []);
		let s = 1;
		for (; !e.isEmpty(); )
			if (((s = n ? r(e.key, n) : 1), n && i && (s *= -1), s < 0))
				e = this.isReverse ? e.left : e.right;
			else {
				if (s === 0) {
					this.nodeStack.push(e);
					break;
				}
				this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
			}
	}
	getNext() {
		let e = this.nodeStack.pop();
		const n = { key: e.key, value: e.value };
		if (this.isReverse) for (e = e.left; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.right);
		else for (e = e.right; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.left);
		return n;
	}
	hasNext() {
		return this.nodeStack.length > 0;
	}
	peek() {
		if (this.nodeStack.length === 0) return null;
		const e = this.nodeStack[this.nodeStack.length - 1];
		return { key: e.key, value: e.value };
	}
}
class Z {
	constructor(e, n, r, i, s) {
		(this.key = e),
			(this.value = n),
			(this.color = r ?? Z.RED),
			(this.left = i ?? Z.EMPTY),
			(this.right = s ?? Z.EMPTY),
			(this.size = this.left.size + 1 + this.right.size);
	}
	copy(e, n, r, i, s) {
		return new Z(e ?? this.key, n ?? this.value, r ?? this.color, i ?? this.left, s ?? this.right);
	}
	isEmpty() {
		return !1;
	}
	inorderTraversal(e) {
		return (
			this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e)
		);
	}
	reverseTraversal(e) {
		return (
			this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e)
		);
	}
	min() {
		return this.left.isEmpty() ? this : this.left.min();
	}
	minKey() {
		return this.min().key;
	}
	maxKey() {
		return this.right.isEmpty() ? this.key : this.right.maxKey();
	}
	insert(e, n, r) {
		let i = this;
		const s = r(e, i.key);
		return (
			(i =
				s < 0
					? i.copy(null, null, null, i.left.insert(e, n, r), null)
					: s === 0
						? i.copy(null, n, null, null, null)
						: i.copy(null, null, null, null, i.right.insert(e, n, r))),
			i.fixUp()
		);
	}
	removeMin() {
		if (this.left.isEmpty()) return Z.EMPTY;
		let e = this;
		return (
			e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
			(e = e.copy(null, null, null, e.left.removeMin(), null)),
			e.fixUp()
		);
	}
	remove(e, n) {
		let r,
			i = this;
		if (n(e, i.key) < 0)
			i.left.isEmpty() || i.left.isRed() || i.left.left.isRed() || (i = i.moveRedLeft()),
				(i = i.copy(null, null, null, i.left.remove(e, n), null));
		else {
			if (
				(i.left.isRed() && (i = i.rotateRight()),
				i.right.isEmpty() || i.right.isRed() || i.right.left.isRed() || (i = i.moveRedRight()),
				n(e, i.key) === 0)
			) {
				if (i.right.isEmpty()) return Z.EMPTY;
				(r = i.right.min()), (i = i.copy(r.key, r.value, null, null, i.right.removeMin()));
			}
			i = i.copy(null, null, null, null, i.right.remove(e, n));
		}
		return i.fixUp();
	}
	isRed() {
		return this.color;
	}
	fixUp() {
		let e = this;
		return (
			e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
			e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
			e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
			e
		);
	}
	moveRedLeft() {
		let e = this.colorFlip();
		return (
			e.right.left.isRed() &&
				((e = e.copy(null, null, null, null, e.right.rotateRight())),
				(e = e.rotateLeft()),
				(e = e.colorFlip())),
			e
		);
	}
	moveRedRight() {
		let e = this.colorFlip();
		return e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())), e;
	}
	rotateLeft() {
		const e = this.copy(null, null, Z.RED, null, this.right.left);
		return this.right.copy(null, null, this.color, e, null);
	}
	rotateRight() {
		const e = this.copy(null, null, Z.RED, this.left.right, null);
		return this.left.copy(null, null, this.color, null, e);
	}
	colorFlip() {
		const e = this.left.copy(null, null, !this.left.color, null, null),
			n = this.right.copy(null, null, !this.right.color, null, null);
		return this.copy(null, null, !this.color, e, n);
	}
	checkMaxDepth() {
		const e = this.check();
		return Math.pow(2, e) <= this.size + 1;
	}
	check() {
		if ((this.isRed() && this.left.isRed()) || this.right.isRed()) throw w();
		const e = this.left.check();
		if (e !== this.right.check()) throw w();
		return e + (this.isRed() ? 0 : 1);
	}
}
(Z.EMPTY = null), (Z.RED = !0), (Z.BLACK = !1);
Z.EMPTY = new (class {
	constructor() {
		this.size = 0;
	}
	get key() {
		throw w();
	}
	get value() {
		throw w();
	}
	get color() {
		throw w();
	}
	get left() {
		throw w();
	}
	get right() {
		throw w();
	}
	copy(e, n, r, i, s) {
		return this;
	}
	insert(e, n, r) {
		return new Z(e, n);
	}
	remove(e, n) {
		return this;
	}
	isEmpty() {
		return !0;
	}
	inorderTraversal(e) {
		return !1;
	}
	reverseTraversal(e) {
		return !1;
	}
	minKey() {
		return null;
	}
	maxKey() {
		return null;
	}
	isRed() {
		return !1;
	}
	checkMaxDepth() {
		return !0;
	}
	check() {
		return 0;
	}
})();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class re {
	constructor(e) {
		(this.comparator = e), (this.data = new j(this.comparator));
	}
	has(e) {
		return this.data.get(e) !== null;
	}
	first() {
		return this.data.minKey();
	}
	last() {
		return this.data.maxKey();
	}
	get size() {
		return this.data.size;
	}
	indexOf(e) {
		return this.data.indexOf(e);
	}
	forEach(e) {
		this.data.inorderTraversal((n, r) => (e(n), !1));
	}
	forEachInRange(e, n) {
		const r = this.data.getIteratorFrom(e[0]);
		for (; r.hasNext(); ) {
			const i = r.getNext();
			if (this.comparator(i.key, e[1]) >= 0) return;
			n(i.key);
		}
	}
	forEachWhile(e, n) {
		let r;
		for (r = n !== void 0 ? this.data.getIteratorFrom(n) : this.data.getIterator(); r.hasNext(); )
			if (!e(r.getNext().key)) return;
	}
	firstAfterOrEqual(e) {
		const n = this.data.getIteratorFrom(e);
		return n.hasNext() ? n.getNext().key : null;
	}
	getIterator() {
		return new cc(this.data.getIterator());
	}
	getIteratorFrom(e) {
		return new cc(this.data.getIteratorFrom(e));
	}
	add(e) {
		return this.copy(this.data.remove(e).insert(e, !0));
	}
	delete(e) {
		return this.has(e) ? this.copy(this.data.remove(e)) : this;
	}
	isEmpty() {
		return this.data.isEmpty();
	}
	unionWith(e) {
		let n = this;
		return (
			n.size < e.size && ((n = e), (e = this)),
			e.forEach((r) => {
				n = n.add(r);
			}),
			n
		);
	}
	isEqual(e) {
		if (!(e instanceof re) || this.size !== e.size) return !1;
		const n = this.data.getIterator(),
			r = e.data.getIterator();
		for (; n.hasNext(); ) {
			const i = n.getNext().key,
				s = r.getNext().key;
			if (this.comparator(i, s) !== 0) return !1;
		}
		return !0;
	}
	toArray() {
		const e = [];
		return (
			this.forEach((n) => {
				e.push(n);
			}),
			e
		);
	}
	toString() {
		const e = [];
		return this.forEach((n) => e.push(n)), 'SortedSet(' + e.toString() + ')';
	}
	copy(e) {
		const n = new re(this.comparator);
		return (n.data = e), n;
	}
}
class cc {
	constructor(e) {
		this.iter = e;
	}
	getNext() {
		return this.iter.getNext().key;
	}
	hasNext() {
		return this.iter.hasNext();
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ye {
	constructor(e) {
		(this.fields = e), e.sort(te.comparator);
	}
	static empty() {
		return new ye([]);
	}
	unionWith(e) {
		let n = new re(te.comparator);
		for (const r of this.fields) n = n.add(r);
		for (const r of e) n = n.add(r);
		return new ye(n.toArray());
	}
	covers(e) {
		for (const n of this.fields) if (n.isPrefixOf(e)) return !0;
		return !1;
	}
	isEqual(e) {
		return Gt(this.fields, e.fields, (n, r) => n.isEqual(r));
	}
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class th extends Error {
	constructor() {
		super(...arguments), (this.name = 'Base64DecodeError');
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class le {
	constructor(e) {
		this.binaryString = e;
	}
	static fromBase64String(e) {
		const n = (function (i) {
			try {
				return atob(i);
			} catch (s) {
				throw typeof DOMException < 'u' && s instanceof DOMException
					? new th('Invalid base64 string: ' + s)
					: s;
			}
		})(e);
		return new le(n);
	}
	static fromUint8Array(e) {
		const n = (function (i) {
			let s = '';
			for (let o = 0; o < i.length; ++o) s += String.fromCharCode(i[o]);
			return s;
		})(e);
		return new le(n);
	}
	[Symbol.iterator]() {
		let e = 0;
		return {
			next: () =>
				e < this.binaryString.length
					? { value: this.binaryString.charCodeAt(e++), done: !1 }
					: { value: void 0, done: !0 }
		};
	}
	toBase64() {
		return (function (n) {
			return btoa(n);
		})(this.binaryString);
	}
	toUint8Array() {
		return (function (n) {
			const r = new Uint8Array(n.length);
			for (let i = 0; i < n.length; i++) r[i] = n.charCodeAt(i);
			return r;
		})(this.binaryString);
	}
	approximateByteSize() {
		return 2 * this.binaryString.length;
	}
	compareTo(e) {
		return N(this.binaryString, e.binaryString);
	}
	isEqual(e) {
		return this.binaryString === e.binaryString;
	}
}
le.EMPTY_BYTE_STRING = new le('');
const Ny = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function it(t) {
	if ((x(!!t), typeof t == 'string')) {
		let e = 0;
		const n = Ny.exec(t);
		if ((x(!!n), n[1])) {
			let i = n[1];
			(i = (i + '000000000').substr(0, 9)), (e = Number(i));
		}
		const r = new Date(t);
		return { seconds: Math.floor(r.getTime() / 1e3), nanos: e };
	}
	return { seconds: W(t.seconds), nanos: W(t.nanos) };
}
function W(t) {
	return typeof t == 'number' ? t : typeof t == 'string' ? Number(t) : 0;
}
function At(t) {
	return typeof t == 'string' ? le.fromBase64String(t) : le.fromUint8Array(t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function No(t) {
	var e, n;
	return (
		((n = (
			((e = t == null ? void 0 : t.mapValue) === null || e === void 0 ? void 0 : e.fields) || {}
		).__type__) === null || n === void 0
			? void 0
			: n.stringValue) === 'server_timestamp'
	);
}
function Vo(t) {
	const e = t.mapValue.fields.__previous_value__;
	return No(e) ? Vo(e) : e;
}
function Bn(t) {
	const e = it(t.mapValue.fields.__local_write_time__.timestampValue);
	return new Q(e.seconds, e.nanos);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Vy {
	constructor(e, n, r, i, s, o, a, c, u) {
		(this.databaseId = e),
			(this.appId = n),
			(this.persistenceKey = r),
			(this.host = i),
			(this.ssl = s),
			(this.forceLongPolling = o),
			(this.autoDetectLongPolling = a),
			(this.longPollingOptions = c),
			(this.useFetchStreams = u);
	}
}
class jn {
	constructor(e, n) {
		(this.projectId = e), (this.database = n || '(default)');
	}
	static empty() {
		return new jn('', '');
	}
	get isDefaultDatabase() {
		return this.database === '(default)';
	}
	isEqual(e) {
		return e instanceof jn && e.projectId === this.projectId && e.database === this.database;
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wr = { mapValue: { fields: { __type__: { stringValue: '__max__' } } } };
function Rt(t) {
	return 'nullValue' in t
		? 0
		: 'booleanValue' in t
			? 1
			: 'integerValue' in t || 'doubleValue' in t
				? 2
				: 'timestampValue' in t
					? 3
					: 'stringValue' in t
						? 5
						: 'bytesValue' in t
							? 6
							: 'referenceValue' in t
								? 7
								: 'geoPointValue' in t
									? 8
									: 'arrayValue' in t
										? 9
										: 'mapValue' in t
											? No(t)
												? 4
												: Oy(t)
													? 9007199254740991
													: 10
											: w();
}
function Me(t, e) {
	if (t === e) return !0;
	const n = Rt(t);
	if (n !== Rt(e)) return !1;
	switch (n) {
		case 0:
		case 9007199254740991:
			return !0;
		case 1:
			return t.booleanValue === e.booleanValue;
		case 4:
			return Bn(t).isEqual(Bn(e));
		case 3:
			return (function (i, s) {
				if (
					typeof i.timestampValue == 'string' &&
					typeof s.timestampValue == 'string' &&
					i.timestampValue.length === s.timestampValue.length
				)
					return i.timestampValue === s.timestampValue;
				const o = it(i.timestampValue),
					a = it(s.timestampValue);
				return o.seconds === a.seconds && o.nanos === a.nanos;
			})(t, e);
		case 5:
			return t.stringValue === e.stringValue;
		case 6:
			return (function (i, s) {
				return At(i.bytesValue).isEqual(At(s.bytesValue));
			})(t, e);
		case 7:
			return t.referenceValue === e.referenceValue;
		case 8:
			return (function (i, s) {
				return (
					W(i.geoPointValue.latitude) === W(s.geoPointValue.latitude) &&
					W(i.geoPointValue.longitude) === W(s.geoPointValue.longitude)
				);
			})(t, e);
		case 2:
			return (function (i, s) {
				if ('integerValue' in i && 'integerValue' in s)
					return W(i.integerValue) === W(s.integerValue);
				if ('doubleValue' in i && 'doubleValue' in s) {
					const o = W(i.doubleValue),
						a = W(s.doubleValue);
					return o === a ? Gr(o) === Gr(a) : isNaN(o) && isNaN(a);
				}
				return !1;
			})(t, e);
		case 9:
			return Gt(t.arrayValue.values || [], e.arrayValue.values || [], Me);
		case 10:
			return (function (i, s) {
				const o = i.mapValue.fields || {},
					a = s.mapValue.fields || {};
				if (ac(o) !== ac(a)) return !1;
				for (const c in o)
					if (o.hasOwnProperty(c) && (a[c] === void 0 || !Me(o[c], a[c]))) return !1;
				return !0;
			})(t, e);
		default:
			return w();
	}
}
function qn(t, e) {
	return (t.values || []).find((n) => Me(n, e)) !== void 0;
}
function Kt(t, e) {
	if (t === e) return 0;
	const n = Rt(t),
		r = Rt(e);
	if (n !== r) return N(n, r);
	switch (n) {
		case 0:
		case 9007199254740991:
			return 0;
		case 1:
			return N(t.booleanValue, e.booleanValue);
		case 2:
			return (function (s, o) {
				const a = W(s.integerValue || s.doubleValue),
					c = W(o.integerValue || o.doubleValue);
				return a < c ? -1 : a > c ? 1 : a === c ? 0 : isNaN(a) ? (isNaN(c) ? 0 : -1) : 1;
			})(t, e);
		case 3:
			return uc(t.timestampValue, e.timestampValue);
		case 4:
			return uc(Bn(t), Bn(e));
		case 5:
			return N(t.stringValue, e.stringValue);
		case 6:
			return (function (s, o) {
				const a = At(s),
					c = At(o);
				return a.compareTo(c);
			})(t.bytesValue, e.bytesValue);
		case 7:
			return (function (s, o) {
				const a = s.split('/'),
					c = o.split('/');
				for (let u = 0; u < a.length && u < c.length; u++) {
					const l = N(a[u], c[u]);
					if (l !== 0) return l;
				}
				return N(a.length, c.length);
			})(t.referenceValue, e.referenceValue);
		case 8:
			return (function (s, o) {
				const a = N(W(s.latitude), W(o.latitude));
				return a !== 0 ? a : N(W(s.longitude), W(o.longitude));
			})(t.geoPointValue, e.geoPointValue);
		case 9:
			return (function (s, o) {
				const a = s.values || [],
					c = o.values || [];
				for (let u = 0; u < a.length && u < c.length; ++u) {
					const l = Kt(a[u], c[u]);
					if (l) return l;
				}
				return N(a.length, c.length);
			})(t.arrayValue, e.arrayValue);
		case 10:
			return (function (s, o) {
				if (s === wr.mapValue && o === wr.mapValue) return 0;
				if (s === wr.mapValue) return 1;
				if (o === wr.mapValue) return -1;
				const a = s.fields || {},
					c = Object.keys(a),
					u = o.fields || {},
					l = Object.keys(u);
				c.sort(), l.sort();
				for (let h = 0; h < c.length && h < l.length; ++h) {
					const d = N(c[h], l[h]);
					if (d !== 0) return d;
					const f = Kt(a[c[h]], u[l[h]]);
					if (f !== 0) return f;
				}
				return N(c.length, l.length);
			})(t.mapValue, e.mapValue);
		default:
			throw w();
	}
}
function uc(t, e) {
	if (typeof t == 'string' && typeof e == 'string' && t.length === e.length) return N(t, e);
	const n = it(t),
		r = it(e),
		i = N(n.seconds, r.seconds);
	return i !== 0 ? i : N(n.nanos, r.nanos);
}
function Qt(t) {
	return Ps(t);
}
function Ps(t) {
	return 'nullValue' in t
		? 'null'
		: 'booleanValue' in t
			? '' + t.booleanValue
			: 'integerValue' in t
				? '' + t.integerValue
				: 'doubleValue' in t
					? '' + t.doubleValue
					: 'timestampValue' in t
						? (function (n) {
								const r = it(n);
								return `time(${r.seconds},${r.nanos})`;
							})(t.timestampValue)
						: 'stringValue' in t
							? t.stringValue
							: 'bytesValue' in t
								? (function (n) {
										return At(n).toBase64();
									})(t.bytesValue)
								: 'referenceValue' in t
									? (function (n) {
											return T.fromName(n).toString();
										})(t.referenceValue)
									: 'geoPointValue' in t
										? (function (n) {
												return `geo(${n.latitude},${n.longitude})`;
											})(t.geoPointValue)
										: 'arrayValue' in t
											? (function (n) {
													let r = '[',
														i = !0;
													for (const s of n.values || []) i ? (i = !1) : (r += ','), (r += Ps(s));
													return r + ']';
												})(t.arrayValue)
											: 'mapValue' in t
												? (function (n) {
														const r = Object.keys(n.fields || {}).sort();
														let i = '{',
															s = !0;
														for (const o of r)
															s ? (s = !1) : (i += ','), (i += `${o}:${Ps(n.fields[o])}`);
														return i + '}';
													})(t.mapValue)
												: w();
}
function lc(t, e) {
	return {
		referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`
	};
}
function Cs(t) {
	return !!t && 'integerValue' in t;
}
function Oo(t) {
	return !!t && 'arrayValue' in t;
}
function hc(t) {
	return !!t && 'nullValue' in t;
}
function dc(t) {
	return !!t && 'doubleValue' in t && isNaN(Number(t.doubleValue));
}
function br(t) {
	return !!t && 'mapValue' in t;
}
function An(t) {
	if (t.geoPointValue) return { geoPointValue: Object.assign({}, t.geoPointValue) };
	if (t.timestampValue && typeof t.timestampValue == 'object')
		return { timestampValue: Object.assign({}, t.timestampValue) };
	if (t.mapValue) {
		const e = { mapValue: { fields: {} } };
		return Ct(t.mapValue.fields, (n, r) => (e.mapValue.fields[n] = An(r))), e;
	}
	if (t.arrayValue) {
		const e = { arrayValue: { values: [] } };
		for (let n = 0; n < (t.arrayValue.values || []).length; ++n)
			e.arrayValue.values[n] = An(t.arrayValue.values[n]);
		return e;
	}
	return Object.assign({}, t);
}
function Oy(t) {
	return (((t.mapValue || {}).fields || {}).__type__ || {}).stringValue === '__max__';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class pe {
	constructor(e) {
		this.value = e;
	}
	static empty() {
		return new pe({ mapValue: {} });
	}
	field(e) {
		if (e.isEmpty()) return this.value;
		{
			let n = this.value;
			for (let r = 0; r < e.length - 1; ++r)
				if (((n = (n.mapValue.fields || {})[e.get(r)]), !br(n))) return null;
			return (n = (n.mapValue.fields || {})[e.lastSegment()]), n || null;
		}
	}
	set(e, n) {
		this.getFieldsMap(e.popLast())[e.lastSegment()] = An(n);
	}
	setAll(e) {
		let n = te.emptyPath(),
			r = {},
			i = [];
		e.forEach((o, a) => {
			if (!n.isImmediateParentOf(a)) {
				const c = this.getFieldsMap(n);
				this.applyChanges(c, r, i), (r = {}), (i = []), (n = a.popLast());
			}
			o ? (r[a.lastSegment()] = An(o)) : i.push(a.lastSegment());
		});
		const s = this.getFieldsMap(n);
		this.applyChanges(s, r, i);
	}
	delete(e) {
		const n = this.field(e.popLast());
		br(n) && n.mapValue.fields && delete n.mapValue.fields[e.lastSegment()];
	}
	isEqual(e) {
		return Me(this.value, e.value);
	}
	getFieldsMap(e) {
		let n = this.value;
		n.mapValue.fields || (n.mapValue = { fields: {} });
		for (let r = 0; r < e.length; ++r) {
			let i = n.mapValue.fields[e.get(r)];
			(br(i) && i.mapValue.fields) ||
				((i = { mapValue: { fields: {} } }), (n.mapValue.fields[e.get(r)] = i)),
				(n = i);
		}
		return n.mapValue.fields;
	}
	applyChanges(e, n, r) {
		Ct(n, (i, s) => (e[i] = s));
		for (const i of r) delete e[i];
	}
	clone() {
		return new pe(An(this.value));
	}
}
function nh(t) {
	const e = [];
	return (
		Ct(t.fields, (n, r) => {
			const i = new te([n]);
			if (br(r)) {
				const s = nh(r.mapValue).fields;
				if (s.length === 0) e.push(i);
				else for (const o of s) e.push(i.child(o));
			} else e.push(i);
		}),
		new ye(e)
	);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oe {
	constructor(e, n, r, i, s, o, a) {
		(this.key = e),
			(this.documentType = n),
			(this.version = r),
			(this.readTime = i),
			(this.createTime = s),
			(this.data = o),
			(this.documentState = a);
	}
	static newInvalidDocument(e) {
		return new oe(e, 0, R.min(), R.min(), R.min(), pe.empty(), 0);
	}
	static newFoundDocument(e, n, r, i) {
		return new oe(e, 1, n, R.min(), r, i, 0);
	}
	static newNoDocument(e, n) {
		return new oe(e, 2, n, R.min(), R.min(), pe.empty(), 0);
	}
	static newUnknownDocument(e, n) {
		return new oe(e, 3, n, R.min(), R.min(), pe.empty(), 2);
	}
	convertToFoundDocument(e, n) {
		return (
			!this.createTime.isEqual(R.min()) ||
				(this.documentType !== 2 && this.documentType !== 0) ||
				(this.createTime = e),
			(this.version = e),
			(this.documentType = 1),
			(this.data = n),
			(this.documentState = 0),
			this
		);
	}
	convertToNoDocument(e) {
		return (
			(this.version = e),
			(this.documentType = 2),
			(this.data = pe.empty()),
			(this.documentState = 0),
			this
		);
	}
	convertToUnknownDocument(e) {
		return (
			(this.version = e),
			(this.documentType = 3),
			(this.data = pe.empty()),
			(this.documentState = 2),
			this
		);
	}
	setHasCommittedMutations() {
		return (this.documentState = 2), this;
	}
	setHasLocalMutations() {
		return (this.documentState = 1), (this.version = R.min()), this;
	}
	setReadTime(e) {
		return (this.readTime = e), this;
	}
	get hasLocalMutations() {
		return this.documentState === 1;
	}
	get hasCommittedMutations() {
		return this.documentState === 2;
	}
	get hasPendingWrites() {
		return this.hasLocalMutations || this.hasCommittedMutations;
	}
	isValidDocument() {
		return this.documentType !== 0;
	}
	isFoundDocument() {
		return this.documentType === 1;
	}
	isNoDocument() {
		return this.documentType === 2;
	}
	isUnknownDocument() {
		return this.documentType === 3;
	}
	isEqual(e) {
		return (
			e instanceof oe &&
			this.key.isEqual(e.key) &&
			this.version.isEqual(e.version) &&
			this.documentType === e.documentType &&
			this.documentState === e.documentState &&
			this.data.isEqual(e.data)
		);
	}
	mutableCopy() {
		return new oe(
			this.key,
			this.documentType,
			this.version,
			this.readTime,
			this.createTime,
			this.data.clone(),
			this.documentState
		);
	}
	toString() {
		return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
	}
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Kr {
	constructor(e, n) {
		(this.position = e), (this.inclusive = n);
	}
}
function fc(t, e, n) {
	let r = 0;
	for (let i = 0; i < t.position.length; i++) {
		const s = e[i],
			o = t.position[i];
		if (
			(s.field.isKeyField()
				? (r = T.comparator(T.fromName(o.referenceValue), n.key))
				: (r = Kt(o, n.data.field(s.field))),
			s.dir === 'desc' && (r *= -1),
			r !== 0)
		)
			break;
	}
	return r;
}
function pc(t, e) {
	if (t === null) return e === null;
	if (e === null || t.inclusive !== e.inclusive || t.position.length !== e.position.length)
		return !1;
	for (let n = 0; n < t.position.length; n++) if (!Me(t.position[n], e.position[n])) return !1;
	return !0;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Qr {
	constructor(e, n = 'asc') {
		(this.field = e), (this.dir = n);
	}
}
function Ly(t, e) {
	return t.dir === e.dir && t.field.isEqual(e.field);
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rh {}
class G extends rh {
	constructor(e, n, r) {
		super(), (this.field = e), (this.op = n), (this.value = r);
	}
	static create(e, n, r) {
		return e.isKeyField()
			? n === 'in' || n === 'not-in'
				? this.createKeyFieldInFilter(e, n, r)
				: new xy(e, n, r)
			: n === 'array-contains'
				? new By(e, r)
				: n === 'in'
					? new jy(e, r)
					: n === 'not-in'
						? new qy(e, r)
						: n === 'array-contains-any'
							? new $y(e, r)
							: new G(e, n, r);
	}
	static createKeyFieldInFilter(e, n, r) {
		return n === 'in' ? new Uy(e, r) : new Fy(e, r);
	}
	matches(e) {
		const n = e.data.field(this.field);
		return this.op === '!='
			? n !== null && this.matchesComparison(Kt(n, this.value))
			: n !== null && Rt(this.value) === Rt(n) && this.matchesComparison(Kt(n, this.value));
	}
	matchesComparison(e) {
		switch (this.op) {
			case '<':
				return e < 0;
			case '<=':
				return e <= 0;
			case '==':
				return e === 0;
			case '!=':
				return e !== 0;
			case '>':
				return e > 0;
			case '>=':
				return e >= 0;
			default:
				return w();
		}
	}
	isInequality() {
		return ['<', '<=', '>', '>=', '!=', 'not-in'].indexOf(this.op) >= 0;
	}
	getFlattenedFilters() {
		return [this];
	}
	getFilters() {
		return [this];
	}
}
class we extends rh {
	constructor(e, n) {
		super(), (this.filters = e), (this.op = n), (this.ue = null);
	}
	static create(e, n) {
		return new we(e, n);
	}
	matches(e) {
		return ih(this)
			? this.filters.find((n) => !n.matches(e)) === void 0
			: this.filters.find((n) => n.matches(e)) !== void 0;
	}
	getFlattenedFilters() {
		return (
			this.ue !== null ||
				(this.ue = this.filters.reduce((e, n) => e.concat(n.getFlattenedFilters()), [])),
			this.ue
		);
	}
	getFilters() {
		return Object.assign([], this.filters);
	}
}
function ih(t) {
	return t.op === 'and';
}
function sh(t) {
	return My(t) && ih(t);
}
function My(t) {
	for (const e of t.filters) if (e instanceof we) return !1;
	return !0;
}
function bs(t) {
	if (t instanceof G) return t.field.canonicalString() + t.op.toString() + Qt(t.value);
	if (sh(t)) return t.filters.map((e) => bs(e)).join(',');
	{
		const e = t.filters.map((n) => bs(n)).join(',');
		return `${t.op}(${e})`;
	}
}
function oh(t, e) {
	return t instanceof G
		? (function (r, i) {
				return i instanceof G && r.op === i.op && r.field.isEqual(i.field) && Me(r.value, i.value);
			})(t, e)
		: t instanceof we
			? (function (r, i) {
					return i instanceof we && r.op === i.op && r.filters.length === i.filters.length
						? r.filters.reduce((s, o, a) => s && oh(o, i.filters[a]), !0)
						: !1;
				})(t, e)
			: void w();
}
function ah(t) {
	return t instanceof G
		? (function (n) {
				return `${n.field.canonicalString()} ${n.op} ${Qt(n.value)}`;
			})(t)
		: t instanceof we
			? (function (n) {
					return n.op.toString() + ' {' + n.getFilters().map(ah).join(' ,') + '}';
				})(t)
			: 'Filter';
}
class xy extends G {
	constructor(e, n, r) {
		super(e, n, r), (this.key = T.fromName(r.referenceValue));
	}
	matches(e) {
		const n = T.comparator(e.key, this.key);
		return this.matchesComparison(n);
	}
}
class Uy extends G {
	constructor(e, n) {
		super(e, 'in', n), (this.keys = ch('in', n));
	}
	matches(e) {
		return this.keys.some((n) => n.isEqual(e.key));
	}
}
class Fy extends G {
	constructor(e, n) {
		super(e, 'not-in', n), (this.keys = ch('not-in', n));
	}
	matches(e) {
		return !this.keys.some((n) => n.isEqual(e.key));
	}
}
function ch(t, e) {
	var n;
	return (((n = e.arrayValue) === null || n === void 0 ? void 0 : n.values) || []).map((r) =>
		T.fromName(r.referenceValue)
	);
}
class By extends G {
	constructor(e, n) {
		super(e, 'array-contains', n);
	}
	matches(e) {
		const n = e.data.field(this.field);
		return Oo(n) && qn(n.arrayValue, this.value);
	}
}
class jy extends G {
	constructor(e, n) {
		super(e, 'in', n);
	}
	matches(e) {
		const n = e.data.field(this.field);
		return n !== null && qn(this.value.arrayValue, n);
	}
}
class qy extends G {
	constructor(e, n) {
		super(e, 'not-in', n);
	}
	matches(e) {
		if (qn(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) return !1;
		const n = e.data.field(this.field);
		return n !== null && !qn(this.value.arrayValue, n);
	}
}
class $y extends G {
	constructor(e, n) {
		super(e, 'array-contains-any', n);
	}
	matches(e) {
		const n = e.data.field(this.field);
		return (
			!(!Oo(n) || !n.arrayValue.values) &&
			n.arrayValue.values.some((r) => qn(this.value.arrayValue, r))
		);
	}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zy {
	constructor(e, n = null, r = [], i = [], s = null, o = null, a = null) {
		(this.path = e),
			(this.collectionGroup = n),
			(this.orderBy = r),
			(this.filters = i),
			(this.limit = s),
			(this.startAt = o),
			(this.endAt = a),
			(this.ce = null);
	}
}
function mc(t, e = null, n = [], r = [], i = null, s = null, o = null) {
	return new zy(t, e, n, r, i, s, o);
}
function Lo(t) {
	const e = P(t);
	if (e.ce === null) {
		let n = e.path.canonicalString();
		e.collectionGroup !== null && (n += '|cg:' + e.collectionGroup),
			(n += '|f:'),
			(n += e.filters.map((r) => bs(r)).join(',')),
			(n += '|ob:'),
			(n += e.orderBy
				.map((r) =>
					(function (s) {
						return s.field.canonicalString() + s.dir;
					})(r)
				)
				.join(',')),
			Ai(e.limit) || ((n += '|l:'), (n += e.limit)),
			e.startAt &&
				((n += '|lb:'),
				(n += e.startAt.inclusive ? 'b:' : 'a:'),
				(n += e.startAt.position.map((r) => Qt(r)).join(','))),
			e.endAt &&
				((n += '|ub:'),
				(n += e.endAt.inclusive ? 'a:' : 'b:'),
				(n += e.endAt.position.map((r) => Qt(r)).join(','))),
			(e.ce = n);
	}
	return e.ce;
}
function Mo(t, e) {
	if (t.limit !== e.limit || t.orderBy.length !== e.orderBy.length) return !1;
	for (let n = 0; n < t.orderBy.length; n++) if (!Ly(t.orderBy[n], e.orderBy[n])) return !1;
	if (t.filters.length !== e.filters.length) return !1;
	for (let n = 0; n < t.filters.length; n++) if (!oh(t.filters[n], e.filters[n])) return !1;
	return (
		t.collectionGroup === e.collectionGroup &&
		!!t.path.isEqual(e.path) &&
		!!pc(t.startAt, e.startAt) &&
		pc(t.endAt, e.endAt)
	);
}
function ks(t) {
	return T.isDocumentKey(t.path) && t.collectionGroup === null && t.filters.length === 0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sr {
	constructor(e, n = null, r = [], i = [], s = null, o = 'F', a = null, c = null) {
		(this.path = e),
			(this.collectionGroup = n),
			(this.explicitOrderBy = r),
			(this.filters = i),
			(this.limit = s),
			(this.limitType = o),
			(this.startAt = a),
			(this.endAt = c),
			(this.le = null),
			(this.he = null),
			(this.Pe = null),
			this.startAt,
			this.endAt;
	}
}
function Hy(t, e, n, r, i, s, o, a) {
	return new sr(t, e, n, r, i, s, o, a);
}
function Ri(t) {
	return new sr(t);
}
function gc(t) {
	return (
		t.filters.length === 0 &&
		t.limit === null &&
		t.startAt == null &&
		t.endAt == null &&
		(t.explicitOrderBy.length === 0 ||
			(t.explicitOrderBy.length === 1 && t.explicitOrderBy[0].field.isKeyField()))
	);
}
function uh(t) {
	return t.collectionGroup !== null;
}
function Rn(t) {
	const e = P(t);
	if (e.le === null) {
		e.le = [];
		const n = new Set();
		for (const s of e.explicitOrderBy) e.le.push(s), n.add(s.field.canonicalString());
		const r =
			e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : 'asc';
		(function (o) {
			let a = new re(te.comparator);
			return (
				o.filters.forEach((c) => {
					c.getFlattenedFilters().forEach((u) => {
						u.isInequality() && (a = a.add(u.field));
					});
				}),
				a
			);
		})(e).forEach((s) => {
			n.has(s.canonicalString()) || s.isKeyField() || e.le.push(new Qr(s, r));
		}),
			n.has(te.keyField().canonicalString()) || e.le.push(new Qr(te.keyField(), r));
	}
	return e.le;
}
function Ne(t) {
	const e = P(t);
	return e.he || (e.he = Wy(e, Rn(t))), e.he;
}
function Wy(t, e) {
	if (t.limitType === 'F')
		return mc(t.path, t.collectionGroup, e, t.filters, t.limit, t.startAt, t.endAt);
	{
		e = e.map((i) => {
			const s = i.dir === 'desc' ? 'asc' : 'desc';
			return new Qr(i.field, s);
		});
		const n = t.endAt ? new Kr(t.endAt.position, t.endAt.inclusive) : null,
			r = t.startAt ? new Kr(t.startAt.position, t.startAt.inclusive) : null;
		return mc(t.path, t.collectionGroup, e, t.filters, t.limit, n, r);
	}
}
function Ds(t, e) {
	const n = t.filters.concat([e]);
	return new sr(
		t.path,
		t.collectionGroup,
		t.explicitOrderBy.slice(),
		n,
		t.limit,
		t.limitType,
		t.startAt,
		t.endAt
	);
}
function Ns(t, e, n) {
	return new sr(
		t.path,
		t.collectionGroup,
		t.explicitOrderBy.slice(),
		t.filters.slice(),
		e,
		n,
		t.startAt,
		t.endAt
	);
}
function Si(t, e) {
	return Mo(Ne(t), Ne(e)) && t.limitType === e.limitType;
}
function lh(t) {
	return `${Lo(Ne(t))}|lt:${t.limitType}`;
}
function Ot(t) {
	return `Query(target=${(function (n) {
		let r = n.path.canonicalString();
		return (
			n.collectionGroup !== null && (r += ' collectionGroup=' + n.collectionGroup),
			n.filters.length > 0 && (r += `, filters: [${n.filters.map((i) => ah(i)).join(', ')}]`),
			Ai(n.limit) || (r += ', limit: ' + n.limit),
			n.orderBy.length > 0 &&
				(r += `, orderBy: [${n.orderBy
					.map((i) =>
						(function (o) {
							return `${o.field.canonicalString()} (${o.dir})`;
						})(i)
					)
					.join(', ')}]`),
			n.startAt &&
				((r += ', startAt: '),
				(r += n.startAt.inclusive ? 'b:' : 'a:'),
				(r += n.startAt.position.map((i) => Qt(i)).join(','))),
			n.endAt &&
				((r += ', endAt: '),
				(r += n.endAt.inclusive ? 'a:' : 'b:'),
				(r += n.endAt.position.map((i) => Qt(i)).join(','))),
			`Target(${r})`
		);
	})(Ne(t))}; limitType=${t.limitType})`;
}
function Pi(t, e) {
	return (
		e.isFoundDocument() &&
		(function (r, i) {
			const s = i.key.path;
			return r.collectionGroup !== null
				? i.key.hasCollectionId(r.collectionGroup) && r.path.isPrefixOf(s)
				: T.isDocumentKey(r.path)
					? r.path.isEqual(s)
					: r.path.isImmediateParentOf(s);
		})(t, e) &&
		(function (r, i) {
			for (const s of Rn(r)) if (!s.field.isKeyField() && i.data.field(s.field) === null) return !1;
			return !0;
		})(t, e) &&
		(function (r, i) {
			for (const s of r.filters) if (!s.matches(i)) return !1;
			return !0;
		})(t, e) &&
		(function (r, i) {
			return !(
				(r.startAt &&
					!(function (o, a, c) {
						const u = fc(o, a, c);
						return o.inclusive ? u <= 0 : u < 0;
					})(r.startAt, Rn(r), i)) ||
				(r.endAt &&
					!(function (o, a, c) {
						const u = fc(o, a, c);
						return o.inclusive ? u >= 0 : u > 0;
					})(r.endAt, Rn(r), i))
			);
		})(t, e)
	);
}
function Gy(t) {
	return (
		t.collectionGroup ||
		(t.path.length % 2 == 1 ? t.path.lastSegment() : t.path.get(t.path.length - 2))
	);
}
function hh(t) {
	return (e, n) => {
		let r = !1;
		for (const i of Rn(t)) {
			const s = Ky(i, e, n);
			if (s !== 0) return s;
			r = r || i.field.isKeyField();
		}
		return 0;
	};
}
function Ky(t, e, n) {
	const r = t.field.isKeyField()
		? T.comparator(e.key, n.key)
		: (function (s, o, a) {
				const c = o.data.field(s),
					u = a.data.field(s);
				return c !== null && u !== null ? Kt(c, u) : w();
			})(t.field, e, n);
	switch (t.dir) {
		case 'asc':
			return r;
		case 'desc':
			return -1 * r;
		default:
			return w();
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class on {
	constructor(e, n) {
		(this.mapKeyFn = e), (this.equalsFn = n), (this.inner = {}), (this.innerSize = 0);
	}
	get(e) {
		const n = this.mapKeyFn(e),
			r = this.inner[n];
		if (r !== void 0) {
			for (const [i, s] of r) if (this.equalsFn(i, e)) return s;
		}
	}
	has(e) {
		return this.get(e) !== void 0;
	}
	set(e, n) {
		const r = this.mapKeyFn(e),
			i = this.inner[r];
		if (i === void 0) return (this.inner[r] = [[e, n]]), void this.innerSize++;
		for (let s = 0; s < i.length; s++) if (this.equalsFn(i[s][0], e)) return void (i[s] = [e, n]);
		i.push([e, n]), this.innerSize++;
	}
	delete(e) {
		const n = this.mapKeyFn(e),
			r = this.inner[n];
		if (r === void 0) return !1;
		for (let i = 0; i < r.length; i++)
			if (this.equalsFn(r[i][0], e))
				return r.length === 1 ? delete this.inner[n] : r.splice(i, 1), this.innerSize--, !0;
		return !1;
	}
	forEach(e) {
		Ct(this.inner, (n, r) => {
			for (const [i, s] of r) e(i, s);
		});
	}
	isEmpty() {
		return eh(this.inner);
	}
	size() {
		return this.innerSize;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Qy = new j(T.comparator);
function ze() {
	return Qy;
}
const dh = new j(T.comparator);
function _n(...t) {
	let e = dh;
	for (const n of t) e = e.insert(n.key, n);
	return e;
}
function fh(t) {
	let e = dh;
	return t.forEach((n, r) => (e = e.insert(n, r.overlayedDocument))), e;
}
function mt() {
	return Sn();
}
function ph() {
	return Sn();
}
function Sn() {
	return new on(
		(t) => t.toString(),
		(t, e) => t.isEqual(e)
	);
}
const Xy = new j(T.comparator),
	Jy = new re(T.comparator);
function C(...t) {
	let e = Jy;
	for (const n of t) e = e.add(n);
	return e;
}
const Yy = new re(N);
function Zy() {
	return Yy;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function mh(t, e) {
	if (t.useProto3Json) {
		if (isNaN(e)) return { doubleValue: 'NaN' };
		if (e === 1 / 0) return { doubleValue: 'Infinity' };
		if (e === -1 / 0) return { doubleValue: '-Infinity' };
	}
	return { doubleValue: Gr(e) ? '-0' : e };
}
function gh(t) {
	return { integerValue: '' + t };
}
function ev(t, e) {
	return Dy(e) ? gh(e) : mh(t, e);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ci {
	constructor() {
		this._ = void 0;
	}
}
function tv(t, e, n) {
	return t instanceof $n
		? (function (i, s) {
				const o = {
					fields: {
						__type__: { stringValue: 'server_timestamp' },
						__local_write_time__: { timestampValue: { seconds: i.seconds, nanos: i.nanoseconds } }
					}
				};
				return s && No(s) && (s = Vo(s)), s && (o.fields.__previous_value__ = s), { mapValue: o };
			})(n, e)
		: t instanceof Xt
			? yh(t, e)
			: t instanceof Jt
				? vh(t, e)
				: (function (i, s) {
						const o = _h(i, s),
							a = _c(o) + _c(i.Ie);
						return Cs(o) && Cs(i.Ie) ? gh(a) : mh(i.serializer, a);
					})(t, e);
}
function nv(t, e, n) {
	return t instanceof Xt ? yh(t, e) : t instanceof Jt ? vh(t, e) : n;
}
function _h(t, e) {
	return t instanceof Xr
		? (function (r) {
				return (
					Cs(r) ||
					(function (s) {
						return !!s && 'doubleValue' in s;
					})(r)
				);
			})(e)
			? e
			: { integerValue: 0 }
		: null;
}
class $n extends Ci {}
class Xt extends Ci {
	constructor(e) {
		super(), (this.elements = e);
	}
}
function yh(t, e) {
	const n = Eh(e);
	for (const r of t.elements) n.some((i) => Me(i, r)) || n.push(r);
	return { arrayValue: { values: n } };
}
class Jt extends Ci {
	constructor(e) {
		super(), (this.elements = e);
	}
}
function vh(t, e) {
	let n = Eh(e);
	for (const r of t.elements) n = n.filter((i) => !Me(i, r));
	return { arrayValue: { values: n } };
}
class Xr extends Ci {
	constructor(e, n) {
		super(), (this.serializer = e), (this.Ie = n);
	}
}
function _c(t) {
	return W(t.integerValue || t.doubleValue);
}
function Eh(t) {
	return Oo(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xo {
	constructor(e, n) {
		(this.field = e), (this.transform = n);
	}
}
function rv(t, e) {
	return (
		t.field.isEqual(e.field) &&
		(function (r, i) {
			return (r instanceof Xt && i instanceof Xt) || (r instanceof Jt && i instanceof Jt)
				? Gt(r.elements, i.elements, Me)
				: r instanceof Xr && i instanceof Xr
					? Me(r.Ie, i.Ie)
					: r instanceof $n && i instanceof $n;
		})(t.transform, e.transform)
	);
}
class iv {
	constructor(e, n) {
		(this.version = e), (this.transformResults = n);
	}
}
class me {
	constructor(e, n) {
		(this.updateTime = e), (this.exists = n);
	}
	static none() {
		return new me();
	}
	static exists(e) {
		return new me(void 0, e);
	}
	static updateTime(e) {
		return new me(e);
	}
	get isNone() {
		return this.updateTime === void 0 && this.exists === void 0;
	}
	isEqual(e) {
		return (
			this.exists === e.exists &&
			(this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime)
		);
	}
}
function kr(t, e) {
	return t.updateTime !== void 0
		? e.isFoundDocument() && e.version.isEqual(t.updateTime)
		: t.exists === void 0 || t.exists === e.isFoundDocument();
}
class bi {}
function Th(t, e) {
	if (!t.hasLocalMutations || (e && e.fields.length === 0)) return null;
	if (e === null)
		return t.isNoDocument() ? new Uo(t.key, me.none()) : new or(t.key, t.data, me.none());
	{
		const n = t.data,
			r = pe.empty();
		let i = new re(te.comparator);
		for (let s of e.fields)
			if (!i.has(s)) {
				let o = n.field(s);
				o === null && s.length > 1 && ((s = s.popLast()), (o = n.field(s))),
					o === null ? r.delete(s) : r.set(s, o),
					(i = i.add(s));
			}
		return new ct(t.key, r, new ye(i.toArray()), me.none());
	}
}
function sv(t, e, n) {
	t instanceof or
		? (function (i, s, o) {
				const a = i.value.clone(),
					c = vc(i.fieldTransforms, s, o.transformResults);
				a.setAll(c), s.convertToFoundDocument(o.version, a).setHasCommittedMutations();
			})(t, e, n)
		: t instanceof ct
			? (function (i, s, o) {
					if (!kr(i.precondition, s)) return void s.convertToUnknownDocument(o.version);
					const a = vc(i.fieldTransforms, s, o.transformResults),
						c = s.data;
					c.setAll(Ih(i)),
						c.setAll(a),
						s.convertToFoundDocument(o.version, c).setHasCommittedMutations();
				})(t, e, n)
			: (function (i, s, o) {
					s.convertToNoDocument(o.version).setHasCommittedMutations();
				})(0, e, n);
}
function Pn(t, e, n, r) {
	return t instanceof or
		? (function (s, o, a, c) {
				if (!kr(s.precondition, o)) return a;
				const u = s.value.clone(),
					l = Ec(s.fieldTransforms, c, o);
				return u.setAll(l), o.convertToFoundDocument(o.version, u).setHasLocalMutations(), null;
			})(t, e, n, r)
		: t instanceof ct
			? (function (s, o, a, c) {
					if (!kr(s.precondition, o)) return a;
					const u = Ec(s.fieldTransforms, c, o),
						l = o.data;
					return (
						l.setAll(Ih(s)),
						l.setAll(u),
						o.convertToFoundDocument(o.version, l).setHasLocalMutations(),
						a === null
							? null
							: a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((h) => h.field))
					);
				})(t, e, n, r)
			: (function (s, o, a) {
					return kr(s.precondition, o)
						? (o.convertToNoDocument(o.version).setHasLocalMutations(), null)
						: a;
				})(t, e, n);
}
function ov(t, e) {
	let n = null;
	for (const r of t.fieldTransforms) {
		const i = e.data.field(r.field),
			s = _h(r.transform, i || null);
		s != null && (n === null && (n = pe.empty()), n.set(r.field, s));
	}
	return n || null;
}
function yc(t, e) {
	return (
		t.type === e.type &&
		!!t.key.isEqual(e.key) &&
		!!t.precondition.isEqual(e.precondition) &&
		!!(function (r, i) {
			return (r === void 0 && i === void 0) || (!(!r || !i) && Gt(r, i, (s, o) => rv(s, o)));
		})(t.fieldTransforms, e.fieldTransforms) &&
		(t.type === 0
			? t.value.isEqual(e.value)
			: t.type !== 1 || (t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask)))
	);
}
class or extends bi {
	constructor(e, n, r, i = []) {
		super(),
			(this.key = e),
			(this.value = n),
			(this.precondition = r),
			(this.fieldTransforms = i),
			(this.type = 0);
	}
	getFieldMask() {
		return null;
	}
}
class ct extends bi {
	constructor(e, n, r, i, s = []) {
		super(),
			(this.key = e),
			(this.data = n),
			(this.fieldMask = r),
			(this.precondition = i),
			(this.fieldTransforms = s),
			(this.type = 1);
	}
	getFieldMask() {
		return this.fieldMask;
	}
}
function Ih(t) {
	const e = new Map();
	return (
		t.fieldMask.fields.forEach((n) => {
			if (!n.isEmpty()) {
				const r = t.data.field(n);
				e.set(n, r);
			}
		}),
		e
	);
}
function vc(t, e, n) {
	const r = new Map();
	x(t.length === n.length);
	for (let i = 0; i < n.length; i++) {
		const s = t[i],
			o = s.transform,
			a = e.data.field(s.field);
		r.set(s.field, nv(o, a, n[i]));
	}
	return r;
}
function Ec(t, e, n) {
	const r = new Map();
	for (const i of t) {
		const s = i.transform,
			o = n.data.field(i.field);
		r.set(i.field, tv(s, o, e));
	}
	return r;
}
class Uo extends bi {
	constructor(e, n) {
		super(), (this.key = e), (this.precondition = n), (this.type = 2), (this.fieldTransforms = []);
	}
	getFieldMask() {
		return null;
	}
}
class av extends bi {
	constructor(e, n) {
		super(), (this.key = e), (this.precondition = n), (this.type = 3), (this.fieldTransforms = []);
	}
	getFieldMask() {
		return null;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cv {
	constructor(e, n, r, i) {
		(this.batchId = e), (this.localWriteTime = n), (this.baseMutations = r), (this.mutations = i);
	}
	applyToRemoteDocument(e, n) {
		const r = n.mutationResults;
		for (let i = 0; i < this.mutations.length; i++) {
			const s = this.mutations[i];
			s.key.isEqual(e.key) && sv(s, e, r[i]);
		}
	}
	applyToLocalView(e, n) {
		for (const r of this.baseMutations)
			r.key.isEqual(e.key) && (n = Pn(r, e, n, this.localWriteTime));
		for (const r of this.mutations) r.key.isEqual(e.key) && (n = Pn(r, e, n, this.localWriteTime));
		return n;
	}
	applyToLocalDocumentSet(e, n) {
		const r = ph();
		return (
			this.mutations.forEach((i) => {
				const s = e.get(i.key),
					o = s.overlayedDocument;
				let a = this.applyToLocalView(o, s.mutatedFields);
				a = n.has(i.key) ? null : a;
				const c = Th(o, a);
				c !== null && r.set(i.key, c), o.isValidDocument() || o.convertToNoDocument(R.min());
			}),
			r
		);
	}
	keys() {
		return this.mutations.reduce((e, n) => e.add(n.key), C());
	}
	isEqual(e) {
		return (
			this.batchId === e.batchId &&
			Gt(this.mutations, e.mutations, (n, r) => yc(n, r)) &&
			Gt(this.baseMutations, e.baseMutations, (n, r) => yc(n, r))
		);
	}
}
class Fo {
	constructor(e, n, r, i) {
		(this.batch = e), (this.commitVersion = n), (this.mutationResults = r), (this.docVersions = i);
	}
	static from(e, n, r) {
		x(e.mutations.length === r.length);
		let i = (function () {
			return Xy;
		})();
		const s = e.mutations;
		for (let o = 0; o < s.length; o++) i = i.insert(s[o].key, r[o].version);
		return new Fo(e, n, r, i);
	}
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uv {
	constructor(e, n) {
		(this.largestBatchId = e), (this.mutation = n);
	}
	getKey() {
		return this.mutation.key;
	}
	isEqual(e) {
		return e !== null && this.mutation === e.mutation;
	}
	toString() {
		return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lv {
	constructor(e, n) {
		(this.count = e), (this.unchangedNames = n);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var H, D;
function hv(t) {
	switch (t) {
		default:
			return w();
		case p.CANCELLED:
		case p.UNKNOWN:
		case p.DEADLINE_EXCEEDED:
		case p.RESOURCE_EXHAUSTED:
		case p.INTERNAL:
		case p.UNAVAILABLE:
		case p.UNAUTHENTICATED:
			return !1;
		case p.INVALID_ARGUMENT:
		case p.NOT_FOUND:
		case p.ALREADY_EXISTS:
		case p.PERMISSION_DENIED:
		case p.FAILED_PRECONDITION:
		case p.ABORTED:
		case p.OUT_OF_RANGE:
		case p.UNIMPLEMENTED:
		case p.DATA_LOSS:
			return !0;
	}
}
function wh(t) {
	if (t === void 0) return Le('GRPC error has no .code'), p.UNKNOWN;
	switch (t) {
		case H.OK:
			return p.OK;
		case H.CANCELLED:
			return p.CANCELLED;
		case H.UNKNOWN:
			return p.UNKNOWN;
		case H.DEADLINE_EXCEEDED:
			return p.DEADLINE_EXCEEDED;
		case H.RESOURCE_EXHAUSTED:
			return p.RESOURCE_EXHAUSTED;
		case H.INTERNAL:
			return p.INTERNAL;
		case H.UNAVAILABLE:
			return p.UNAVAILABLE;
		case H.UNAUTHENTICATED:
			return p.UNAUTHENTICATED;
		case H.INVALID_ARGUMENT:
			return p.INVALID_ARGUMENT;
		case H.NOT_FOUND:
			return p.NOT_FOUND;
		case H.ALREADY_EXISTS:
			return p.ALREADY_EXISTS;
		case H.PERMISSION_DENIED:
			return p.PERMISSION_DENIED;
		case H.FAILED_PRECONDITION:
			return p.FAILED_PRECONDITION;
		case H.ABORTED:
			return p.ABORTED;
		case H.OUT_OF_RANGE:
			return p.OUT_OF_RANGE;
		case H.UNIMPLEMENTED:
			return p.UNIMPLEMENTED;
		case H.DATA_LOSS:
			return p.DATA_LOSS;
		default:
			return w();
	}
}
((D = H || (H = {}))[(D.OK = 0)] = 'OK'),
	(D[(D.CANCELLED = 1)] = 'CANCELLED'),
	(D[(D.UNKNOWN = 2)] = 'UNKNOWN'),
	(D[(D.INVALID_ARGUMENT = 3)] = 'INVALID_ARGUMENT'),
	(D[(D.DEADLINE_EXCEEDED = 4)] = 'DEADLINE_EXCEEDED'),
	(D[(D.NOT_FOUND = 5)] = 'NOT_FOUND'),
	(D[(D.ALREADY_EXISTS = 6)] = 'ALREADY_EXISTS'),
	(D[(D.PERMISSION_DENIED = 7)] = 'PERMISSION_DENIED'),
	(D[(D.UNAUTHENTICATED = 16)] = 'UNAUTHENTICATED'),
	(D[(D.RESOURCE_EXHAUSTED = 8)] = 'RESOURCE_EXHAUSTED'),
	(D[(D.FAILED_PRECONDITION = 9)] = 'FAILED_PRECONDITION'),
	(D[(D.ABORTED = 10)] = 'ABORTED'),
	(D[(D.OUT_OF_RANGE = 11)] = 'OUT_OF_RANGE'),
	(D[(D.UNIMPLEMENTED = 12)] = 'UNIMPLEMENTED'),
	(D[(D.INTERNAL = 13)] = 'INTERNAL'),
	(D[(D.UNAVAILABLE = 14)] = 'UNAVAILABLE'),
	(D[(D.DATA_LOSS = 15)] = 'DATA_LOSS');
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function dv() {
	return new TextEncoder();
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fv = new jt([4294967295, 4294967295], 0);
function Tc(t) {
	const e = dv().encode(t),
		n = new py();
	return n.update(e), new Uint8Array(n.digest());
}
function Ic(t) {
	const e = new DataView(t.buffer),
		n = e.getUint32(0, !0),
		r = e.getUint32(4, !0),
		i = e.getUint32(8, !0),
		s = e.getUint32(12, !0);
	return [new jt([n, r], 0), new jt([i, s], 0)];
}
class Bo {
	constructor(e, n, r) {
		if (((this.bitmap = e), (this.padding = n), (this.hashCount = r), n < 0 || n >= 8))
			throw new yn(`Invalid padding: ${n}`);
		if (r < 0) throw new yn(`Invalid hash count: ${r}`);
		if (e.length > 0 && this.hashCount === 0) throw new yn(`Invalid hash count: ${r}`);
		if (e.length === 0 && n !== 0) throw new yn(`Invalid padding when bitmap length is 0: ${n}`);
		(this.Te = 8 * e.length - n), (this.Ee = jt.fromNumber(this.Te));
	}
	de(e, n, r) {
		let i = e.add(n.multiply(jt.fromNumber(r)));
		return (
			i.compare(fv) === 1 && (i = new jt([i.getBits(0), i.getBits(1)], 0)),
			i.modulo(this.Ee).toNumber()
		);
	}
	Ae(e) {
		return (this.bitmap[Math.floor(e / 8)] & (1 << e % 8)) != 0;
	}
	mightContain(e) {
		if (this.Te === 0) return !1;
		const n = Tc(e),
			[r, i] = Ic(n);
		for (let s = 0; s < this.hashCount; s++) {
			const o = this.de(r, i, s);
			if (!this.Ae(o)) return !1;
		}
		return !0;
	}
	static create(e, n, r) {
		const i = e % 8 == 0 ? 0 : 8 - (e % 8),
			s = new Uint8Array(Math.ceil(e / 8)),
			o = new Bo(s, i, n);
		return r.forEach((a) => o.insert(a)), o;
	}
	insert(e) {
		if (this.Te === 0) return;
		const n = Tc(e),
			[r, i] = Ic(n);
		for (let s = 0; s < this.hashCount; s++) {
			const o = this.de(r, i, s);
			this.Re(o);
		}
	}
	Re(e) {
		const n = Math.floor(e / 8),
			r = e % 8;
		this.bitmap[n] |= 1 << r;
	}
}
class yn extends Error {
	constructor() {
		super(...arguments), (this.name = 'BloomFilterError');
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ki {
	constructor(e, n, r, i, s) {
		(this.snapshotVersion = e),
			(this.targetChanges = n),
			(this.targetMismatches = r),
			(this.documentUpdates = i),
			(this.resolvedLimboDocuments = s);
	}
	static createSynthesizedRemoteEventForCurrentChange(e, n, r) {
		const i = new Map();
		return (
			i.set(e, ar.createSynthesizedTargetChangeForCurrentChange(e, n, r)),
			new ki(R.min(), i, new j(N), ze(), C())
		);
	}
}
class ar {
	constructor(e, n, r, i, s) {
		(this.resumeToken = e),
			(this.current = n),
			(this.addedDocuments = r),
			(this.modifiedDocuments = i),
			(this.removedDocuments = s);
	}
	static createSynthesizedTargetChangeForCurrentChange(e, n, r) {
		return new ar(r, n, C(), C(), C());
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Dr {
	constructor(e, n, r, i) {
		(this.Ve = e), (this.removedTargetIds = n), (this.key = r), (this.me = i);
	}
}
class Ah {
	constructor(e, n) {
		(this.targetId = e), (this.fe = n);
	}
}
class Rh {
	constructor(e, n, r = le.EMPTY_BYTE_STRING, i = null) {
		(this.state = e), (this.targetIds = n), (this.resumeToken = r), (this.cause = i);
	}
}
class wc {
	constructor() {
		(this.ge = 0),
			(this.pe = Rc()),
			(this.ye = le.EMPTY_BYTE_STRING),
			(this.we = !1),
			(this.Se = !0);
	}
	get current() {
		return this.we;
	}
	get resumeToken() {
		return this.ye;
	}
	get be() {
		return this.ge !== 0;
	}
	get De() {
		return this.Se;
	}
	Ce(e) {
		e.approximateByteSize() > 0 && ((this.Se = !0), (this.ye = e));
	}
	ve() {
		let e = C(),
			n = C(),
			r = C();
		return (
			this.pe.forEach((i, s) => {
				switch (s) {
					case 0:
						e = e.add(i);
						break;
					case 2:
						n = n.add(i);
						break;
					case 1:
						r = r.add(i);
						break;
					default:
						w();
				}
			}),
			new ar(this.ye, this.we, e, n, r)
		);
	}
	Fe() {
		(this.Se = !1), (this.pe = Rc());
	}
	Me(e, n) {
		(this.Se = !0), (this.pe = this.pe.insert(e, n));
	}
	xe(e) {
		(this.Se = !0), (this.pe = this.pe.remove(e));
	}
	Oe() {
		this.ge += 1;
	}
	Ne() {
		(this.ge -= 1), x(this.ge >= 0);
	}
	Be() {
		(this.Se = !0), (this.we = !0);
	}
}
class pv {
	constructor(e) {
		(this.Le = e), (this.ke = new Map()), (this.qe = ze()), (this.Qe = Ac()), (this.Ke = new j(N));
	}
	$e(e) {
		for (const n of e.Ve)
			e.me && e.me.isFoundDocument() ? this.Ue(n, e.me) : this.We(n, e.key, e.me);
		for (const n of e.removedTargetIds) this.We(n, e.key, e.me);
	}
	Ge(e) {
		this.forEachTarget(e, (n) => {
			const r = this.ze(n);
			switch (e.state) {
				case 0:
					this.je(n) && r.Ce(e.resumeToken);
					break;
				case 1:
					r.Ne(), r.be || r.Fe(), r.Ce(e.resumeToken);
					break;
				case 2:
					r.Ne(), r.be || this.removeTarget(n);
					break;
				case 3:
					this.je(n) && (r.Be(), r.Ce(e.resumeToken));
					break;
				case 4:
					this.je(n) && (this.He(n), r.Ce(e.resumeToken));
					break;
				default:
					w();
			}
		});
	}
	forEachTarget(e, n) {
		e.targetIds.length > 0
			? e.targetIds.forEach(n)
			: this.ke.forEach((r, i) => {
					this.je(i) && n(i);
				});
	}
	Je(e) {
		const n = e.targetId,
			r = e.fe.count,
			i = this.Ye(n);
		if (i) {
			const s = i.target;
			if (ks(s))
				if (r === 0) {
					const o = new T(s.path);
					this.We(n, o, oe.newNoDocument(o, R.min()));
				} else x(r === 1);
			else {
				const o = this.Ze(n);
				if (o !== r) {
					const a = this.Xe(e),
						c = a ? this.et(a, e, o) : 1;
					if (c !== 0) {
						this.He(n);
						const u =
							c === 2
								? 'TargetPurposeExistenceFilterMismatchBloom'
								: 'TargetPurposeExistenceFilterMismatch';
						this.Ke = this.Ke.insert(n, u);
					}
				}
			}
		}
	}
	Xe(e) {
		const n = e.fe.unchangedNames;
		if (!n || !n.bits) return null;
		const {
			bits: { bitmap: r = '', padding: i = 0 },
			hashCount: s = 0
		} = n;
		let o, a;
		try {
			o = At(r).toUint8Array();
		} catch (c) {
			if (c instanceof th)
				return (
					Wt(
						'Decoding the base64 bloom filter in existence filter failed (' +
							c.message +
							'); ignoring the bloom filter and falling back to full re-query.'
					),
					null
				);
			throw c;
		}
		try {
			a = new Bo(o, i, s);
		} catch (c) {
			return (
				Wt(c instanceof yn ? 'BloomFilter error: ' : 'Applying bloom filter failed: ', c), null
			);
		}
		return a.Te === 0 ? null : a;
	}
	et(e, n, r) {
		return n.fe.count === r - this.rt(e, n.targetId) ? 0 : 2;
	}
	rt(e, n) {
		const r = this.Le.getRemoteKeysForTarget(n);
		let i = 0;
		return (
			r.forEach((s) => {
				const o = this.Le.nt(),
					a = `projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;
				e.mightContain(a) || (this.We(n, s, null), i++);
			}),
			i
		);
	}
	it(e) {
		const n = new Map();
		this.ke.forEach((s, o) => {
			const a = this.Ye(o);
			if (a) {
				if (s.current && ks(a.target)) {
					const c = new T(a.target.path);
					this.qe.get(c) !== null || this.st(o, c) || this.We(o, c, oe.newNoDocument(c, e));
				}
				s.De && (n.set(o, s.ve()), s.Fe());
			}
		});
		let r = C();
		this.Qe.forEach((s, o) => {
			let a = !0;
			o.forEachWhile((c) => {
				const u = this.Ye(c);
				return !u || u.purpose === 'TargetPurposeLimboResolution' || ((a = !1), !1);
			}),
				a && (r = r.add(s));
		}),
			this.qe.forEach((s, o) => o.setReadTime(e));
		const i = new ki(e, n, this.Ke, this.qe, r);
		return (this.qe = ze()), (this.Qe = Ac()), (this.Ke = new j(N)), i;
	}
	Ue(e, n) {
		if (!this.je(e)) return;
		const r = this.st(e, n.key) ? 2 : 0;
		this.ze(e).Me(n.key, r),
			(this.qe = this.qe.insert(n.key, n)),
			(this.Qe = this.Qe.insert(n.key, this.ot(n.key).add(e)));
	}
	We(e, n, r) {
		if (!this.je(e)) return;
		const i = this.ze(e);
		this.st(e, n) ? i.Me(n, 1) : i.xe(n),
			(this.Qe = this.Qe.insert(n, this.ot(n).delete(e))),
			r && (this.qe = this.qe.insert(n, r));
	}
	removeTarget(e) {
		this.ke.delete(e);
	}
	Ze(e) {
		const n = this.ze(e).ve();
		return this.Le.getRemoteKeysForTarget(e).size + n.addedDocuments.size - n.removedDocuments.size;
	}
	Oe(e) {
		this.ze(e).Oe();
	}
	ze(e) {
		let n = this.ke.get(e);
		return n || ((n = new wc()), this.ke.set(e, n)), n;
	}
	ot(e) {
		let n = this.Qe.get(e);
		return n || ((n = new re(N)), (this.Qe = this.Qe.insert(e, n))), n;
	}
	je(e) {
		const n = this.Ye(e) !== null;
		return n || g('WatchChangeAggregator', 'Detected inactive target', e), n;
	}
	Ye(e) {
		const n = this.ke.get(e);
		return n && n.be ? null : this.Le._t(e);
	}
	He(e) {
		this.ke.set(e, new wc()),
			this.Le.getRemoteKeysForTarget(e).forEach((n) => {
				this.We(e, n, null);
			});
	}
	st(e, n) {
		return this.Le.getRemoteKeysForTarget(e).has(n);
	}
}
function Ac() {
	return new j(T.comparator);
}
function Rc() {
	return new j(T.comparator);
}
const mv = { asc: 'ASCENDING', desc: 'DESCENDING' },
	gv = {
		'<': 'LESS_THAN',
		'<=': 'LESS_THAN_OR_EQUAL',
		'>': 'GREATER_THAN',
		'>=': 'GREATER_THAN_OR_EQUAL',
		'==': 'EQUAL',
		'!=': 'NOT_EQUAL',
		'array-contains': 'ARRAY_CONTAINS',
		in: 'IN',
		'not-in': 'NOT_IN',
		'array-contains-any': 'ARRAY_CONTAINS_ANY'
	},
	_v = { and: 'AND', or: 'OR' };
class yv {
	constructor(e, n) {
		(this.databaseId = e), (this.useProto3Json = n);
	}
}
function Vs(t, e) {
	return t.useProto3Json || Ai(e) ? e : { value: e };
}
function Jr(t, e) {
	return t.useProto3Json
		? `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, '').replace('Z', '')}.${('000000000' + e.nanoseconds).slice(-9)}Z`
		: { seconds: '' + e.seconds, nanos: e.nanoseconds };
}
function Sh(t, e) {
	return t.useProto3Json ? e.toBase64() : e.toUint8Array();
}
function vv(t, e) {
	return Jr(t, e.toTimestamp());
}
function Ve(t) {
	return (
		x(!!t),
		R.fromTimestamp(
			(function (n) {
				const r = it(n);
				return new Q(r.seconds, r.nanos);
			})(t)
		)
	);
}
function jo(t, e) {
	return Os(t, e).canonicalString();
}
function Os(t, e) {
	const n = (function (i) {
		return new F(['projects', i.projectId, 'databases', i.database]);
	})(t).child('documents');
	return e === void 0 ? n : n.child(e);
}
function Ph(t) {
	const e = F.fromString(t);
	return x(Nh(e)), e;
}
function Ls(t, e) {
	return jo(t.databaseId, e.path);
}
function ns(t, e) {
	const n = Ph(e);
	if (n.get(1) !== t.databaseId.projectId)
		throw new y(
			p.INVALID_ARGUMENT,
			'Tried to deserialize key from different project: ' +
				n.get(1) +
				' vs ' +
				t.databaseId.projectId
		);
	if (n.get(3) !== t.databaseId.database)
		throw new y(
			p.INVALID_ARGUMENT,
			'Tried to deserialize key from different database: ' +
				n.get(3) +
				' vs ' +
				t.databaseId.database
		);
	return new T(bh(n));
}
function Ch(t, e) {
	return jo(t.databaseId, e);
}
function Ev(t) {
	const e = Ph(t);
	return e.length === 4 ? F.emptyPath() : bh(e);
}
function Ms(t) {
	return new F([
		'projects',
		t.databaseId.projectId,
		'databases',
		t.databaseId.database
	]).canonicalString();
}
function bh(t) {
	return x(t.length > 4 && t.get(4) === 'documents'), t.popFirst(5);
}
function Sc(t, e, n) {
	return { name: Ls(t, e), fields: n.value.mapValue.fields };
}
function Tv(t, e) {
	let n;
	if ('targetChange' in e) {
		e.targetChange;
		const r = (function (u) {
				return u === 'NO_CHANGE'
					? 0
					: u === 'ADD'
						? 1
						: u === 'REMOVE'
							? 2
							: u === 'CURRENT'
								? 3
								: u === 'RESET'
									? 4
									: w();
			})(e.targetChange.targetChangeType || 'NO_CHANGE'),
			i = e.targetChange.targetIds || [],
			s = (function (u, l) {
				return u.useProto3Json
					? (x(l === void 0 || typeof l == 'string'), le.fromBase64String(l || ''))
					: (x(l === void 0 || l instanceof Uint8Array), le.fromUint8Array(l || new Uint8Array()));
			})(t, e.targetChange.resumeToken),
			o = e.targetChange.cause,
			a =
				o &&
				(function (u) {
					const l = u.code === void 0 ? p.UNKNOWN : wh(u.code);
					return new y(l, u.message || '');
				})(o);
		n = new Rh(r, i, s, a || null);
	} else if ('documentChange' in e) {
		e.documentChange;
		const r = e.documentChange;
		r.document, r.document.name, r.document.updateTime;
		const i = ns(t, r.document.name),
			s = Ve(r.document.updateTime),
			o = r.document.createTime ? Ve(r.document.createTime) : R.min(),
			a = new pe({ mapValue: { fields: r.document.fields } }),
			c = oe.newFoundDocument(i, s, o, a),
			u = r.targetIds || [],
			l = r.removedTargetIds || [];
		n = new Dr(u, l, c.key, c);
	} else if ('documentDelete' in e) {
		e.documentDelete;
		const r = e.documentDelete;
		r.document;
		const i = ns(t, r.document),
			s = r.readTime ? Ve(r.readTime) : R.min(),
			o = oe.newNoDocument(i, s),
			a = r.removedTargetIds || [];
		n = new Dr([], a, o.key, o);
	} else if ('documentRemove' in e) {
		e.documentRemove;
		const r = e.documentRemove;
		r.document;
		const i = ns(t, r.document),
			s = r.removedTargetIds || [];
		n = new Dr([], s, i, null);
	} else {
		if (!('filter' in e)) return w();
		{
			e.filter;
			const r = e.filter;
			r.targetId;
			const { count: i = 0, unchangedNames: s } = r,
				o = new lv(i, s),
				a = r.targetId;
			n = new Ah(a, o);
		}
	}
	return n;
}
function Iv(t, e) {
	let n;
	if (e instanceof or) n = { update: Sc(t, e.key, e.value) };
	else if (e instanceof Uo) n = { delete: Ls(t, e.key) };
	else if (e instanceof ct) n = { update: Sc(t, e.key, e.data), updateMask: Dv(e.fieldMask) };
	else {
		if (!(e instanceof av)) return w();
		n = { verify: Ls(t, e.key) };
	}
	return (
		e.fieldTransforms.length > 0 &&
			(n.updateTransforms = e.fieldTransforms.map((r) =>
				(function (s, o) {
					const a = o.transform;
					if (a instanceof $n)
						return { fieldPath: o.field.canonicalString(), setToServerValue: 'REQUEST_TIME' };
					if (a instanceof Xt)
						return {
							fieldPath: o.field.canonicalString(),
							appendMissingElements: { values: a.elements }
						};
					if (a instanceof Jt)
						return {
							fieldPath: o.field.canonicalString(),
							removeAllFromArray: { values: a.elements }
						};
					if (a instanceof Xr) return { fieldPath: o.field.canonicalString(), increment: a.Ie };
					throw w();
				})(0, r)
			)),
		e.precondition.isNone ||
			(n.currentDocument = (function (i, s) {
				return s.updateTime !== void 0
					? { updateTime: vv(i, s.updateTime) }
					: s.exists !== void 0
						? { exists: s.exists }
						: w();
			})(t, e.precondition)),
		n
	);
}
function wv(t, e) {
	return t && t.length > 0
		? (x(e !== void 0),
			t.map((n) =>
				(function (i, s) {
					let o = i.updateTime ? Ve(i.updateTime) : Ve(s);
					return o.isEqual(R.min()) && (o = Ve(s)), new iv(o, i.transformResults || []);
				})(n, e)
			))
		: [];
}
function Av(t, e) {
	return { documents: [Ch(t, e.path)] };
}
function Rv(t, e) {
	const n = { structuredQuery: {} },
		r = e.path;
	let i;
	e.collectionGroup !== null
		? ((i = r),
			(n.structuredQuery.from = [{ collectionId: e.collectionGroup, allDescendants: !0 }]))
		: ((i = r.popLast()), (n.structuredQuery.from = [{ collectionId: r.lastSegment() }])),
		(n.parent = Ch(t, i));
	const s = (function (u) {
		if (u.length !== 0) return Dh(we.create(u, 'and'));
	})(e.filters);
	s && (n.structuredQuery.where = s);
	const o = (function (u) {
		if (u.length !== 0)
			return u.map((l) =>
				(function (d) {
					return { field: Lt(d.field), direction: Cv(d.dir) };
				})(l)
			);
	})(e.orderBy);
	o && (n.structuredQuery.orderBy = o);
	const a = Vs(t, e.limit);
	return (
		a !== null && (n.structuredQuery.limit = a),
		e.startAt &&
			(n.structuredQuery.startAt = (function (u) {
				return { before: u.inclusive, values: u.position };
			})(e.startAt)),
		e.endAt &&
			(n.structuredQuery.endAt = (function (u) {
				return { before: !u.inclusive, values: u.position };
			})(e.endAt)),
		{ ut: n, parent: i }
	);
}
function Sv(t) {
	let e = Ev(t.parent);
	const n = t.structuredQuery,
		r = n.from ? n.from.length : 0;
	let i = null;
	if (r > 0) {
		x(r === 1);
		const l = n.from[0];
		l.allDescendants ? (i = l.collectionId) : (e = e.child(l.collectionId));
	}
	let s = [];
	n.where &&
		(s = (function (h) {
			const d = kh(h);
			return d instanceof we && sh(d) ? d.getFilters() : [d];
		})(n.where));
	let o = [];
	n.orderBy &&
		(o = (function (h) {
			return h.map((d) =>
				(function (E) {
					return new Qr(
						Mt(E.field),
						(function (v) {
							switch (v) {
								case 'ASCENDING':
									return 'asc';
								case 'DESCENDING':
									return 'desc';
								default:
									return;
							}
						})(E.direction)
					);
				})(d)
			);
		})(n.orderBy));
	let a = null;
	n.limit &&
		(a = (function (h) {
			let d;
			return (d = typeof h == 'object' ? h.value : h), Ai(d) ? null : d;
		})(n.limit));
	let c = null;
	n.startAt &&
		(c = (function (h) {
			const d = !!h.before,
				f = h.values || [];
			return new Kr(f, d);
		})(n.startAt));
	let u = null;
	return (
		n.endAt &&
			(u = (function (h) {
				const d = !h.before,
					f = h.values || [];
				return new Kr(f, d);
			})(n.endAt)),
		Hy(e, i, o, s, a, 'F', c, u)
	);
}
function Pv(t, e) {
	const n = (function (i) {
		switch (i) {
			case 'TargetPurposeListen':
				return null;
			case 'TargetPurposeExistenceFilterMismatch':
				return 'existence-filter-mismatch';
			case 'TargetPurposeExistenceFilterMismatchBloom':
				return 'existence-filter-mismatch-bloom';
			case 'TargetPurposeLimboResolution':
				return 'limbo-document';
			default:
				return w();
		}
	})(e.purpose);
	return n == null ? null : { 'goog-listen-tags': n };
}
function kh(t) {
	return t.unaryFilter !== void 0
		? (function (n) {
				switch (n.unaryFilter.op) {
					case 'IS_NAN':
						const r = Mt(n.unaryFilter.field);
						return G.create(r, '==', { doubleValue: NaN });
					case 'IS_NULL':
						const i = Mt(n.unaryFilter.field);
						return G.create(i, '==', { nullValue: 'NULL_VALUE' });
					case 'IS_NOT_NAN':
						const s = Mt(n.unaryFilter.field);
						return G.create(s, '!=', { doubleValue: NaN });
					case 'IS_NOT_NULL':
						const o = Mt(n.unaryFilter.field);
						return G.create(o, '!=', { nullValue: 'NULL_VALUE' });
					default:
						return w();
				}
			})(t)
		: t.fieldFilter !== void 0
			? (function (n) {
					return G.create(
						Mt(n.fieldFilter.field),
						(function (i) {
							switch (i) {
								case 'EQUAL':
									return '==';
								case 'NOT_EQUAL':
									return '!=';
								case 'GREATER_THAN':
									return '>';
								case 'GREATER_THAN_OR_EQUAL':
									return '>=';
								case 'LESS_THAN':
									return '<';
								case 'LESS_THAN_OR_EQUAL':
									return '<=';
								case 'ARRAY_CONTAINS':
									return 'array-contains';
								case 'IN':
									return 'in';
								case 'NOT_IN':
									return 'not-in';
								case 'ARRAY_CONTAINS_ANY':
									return 'array-contains-any';
								default:
									return w();
							}
						})(n.fieldFilter.op),
						n.fieldFilter.value
					);
				})(t)
			: t.compositeFilter !== void 0
				? (function (n) {
						return we.create(
							n.compositeFilter.filters.map((r) => kh(r)),
							(function (i) {
								switch (i) {
									case 'AND':
										return 'and';
									case 'OR':
										return 'or';
									default:
										return w();
								}
							})(n.compositeFilter.op)
						);
					})(t)
				: w();
}
function Cv(t) {
	return mv[t];
}
function bv(t) {
	return gv[t];
}
function kv(t) {
	return _v[t];
}
function Lt(t) {
	return { fieldPath: t.canonicalString() };
}
function Mt(t) {
	return te.fromServerFormat(t.fieldPath);
}
function Dh(t) {
	return t instanceof G
		? (function (n) {
				if (n.op === '==') {
					if (dc(n.value)) return { unaryFilter: { field: Lt(n.field), op: 'IS_NAN' } };
					if (hc(n.value)) return { unaryFilter: { field: Lt(n.field), op: 'IS_NULL' } };
				} else if (n.op === '!=') {
					if (dc(n.value)) return { unaryFilter: { field: Lt(n.field), op: 'IS_NOT_NAN' } };
					if (hc(n.value)) return { unaryFilter: { field: Lt(n.field), op: 'IS_NOT_NULL' } };
				}
				return { fieldFilter: { field: Lt(n.field), op: bv(n.op), value: n.value } };
			})(t)
		: t instanceof we
			? (function (n) {
					const r = n.getFilters().map((i) => Dh(i));
					return r.length === 1 ? r[0] : { compositeFilter: { op: kv(n.op), filters: r } };
				})(t)
			: w();
}
function Dv(t) {
	const e = [];
	return t.fields.forEach((n) => e.push(n.canonicalString())), { fieldPaths: e };
}
function Nh(t) {
	return t.length >= 4 && t.get(0) === 'projects' && t.get(2) === 'databases';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ye {
	constructor(e, n, r, i, s = R.min(), o = R.min(), a = le.EMPTY_BYTE_STRING, c = null) {
		(this.target = e),
			(this.targetId = n),
			(this.purpose = r),
			(this.sequenceNumber = i),
			(this.snapshotVersion = s),
			(this.lastLimboFreeSnapshotVersion = o),
			(this.resumeToken = a),
			(this.expectedCount = c);
	}
	withSequenceNumber(e) {
		return new Ye(
			this.target,
			this.targetId,
			this.purpose,
			e,
			this.snapshotVersion,
			this.lastLimboFreeSnapshotVersion,
			this.resumeToken,
			this.expectedCount
		);
	}
	withResumeToken(e, n) {
		return new Ye(
			this.target,
			this.targetId,
			this.purpose,
			this.sequenceNumber,
			n,
			this.lastLimboFreeSnapshotVersion,
			e,
			null
		);
	}
	withExpectedCount(e) {
		return new Ye(
			this.target,
			this.targetId,
			this.purpose,
			this.sequenceNumber,
			this.snapshotVersion,
			this.lastLimboFreeSnapshotVersion,
			this.resumeToken,
			e
		);
	}
	withLastLimboFreeSnapshotVersion(e) {
		return new Ye(
			this.target,
			this.targetId,
			this.purpose,
			this.sequenceNumber,
			this.snapshotVersion,
			e,
			this.resumeToken,
			this.expectedCount
		);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Nv {
	constructor(e) {
		this.ct = e;
	}
}
function Vv(t) {
	const e = Sv({ parent: t.parent, structuredQuery: t.structuredQuery });
	return t.limitType === 'LAST' ? Ns(e, e.limit, 'L') : e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ov {
	constructor() {
		this._n = new Lv();
	}
	addToCollectionParentIndex(e, n) {
		return this._n.add(n), m.resolve();
	}
	getCollectionParents(e, n) {
		return m.resolve(this._n.getEntries(n));
	}
	addFieldIndex(e, n) {
		return m.resolve();
	}
	deleteFieldIndex(e, n) {
		return m.resolve();
	}
	deleteAllFieldIndexes(e) {
		return m.resolve();
	}
	createTargetIndexes(e, n) {
		return m.resolve();
	}
	getDocumentsMatchingTarget(e, n) {
		return m.resolve(null);
	}
	getIndexType(e, n) {
		return m.resolve(0);
	}
	getFieldIndexes(e, n) {
		return m.resolve([]);
	}
	getNextCollectionGroupToUpdate(e) {
		return m.resolve(null);
	}
	getMinOffset(e, n) {
		return m.resolve(rt.min());
	}
	getMinOffsetFromCollectionGroup(e, n) {
		return m.resolve(rt.min());
	}
	updateCollectionGroup(e, n, r) {
		return m.resolve();
	}
	updateIndexEntries(e, n) {
		return m.resolve();
	}
}
class Lv {
	constructor() {
		this.index = {};
	}
	add(e) {
		const n = e.lastSegment(),
			r = e.popLast(),
			i = this.index[n] || new re(F.comparator),
			s = !i.has(r);
		return (this.index[n] = i.add(r)), s;
	}
	has(e) {
		const n = e.lastSegment(),
			r = e.popLast(),
			i = this.index[n];
		return i && i.has(r);
	}
	getEntries(e) {
		return (this.index[e] || new re(F.comparator)).toArray();
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Yt {
	constructor(e) {
		this.On = e;
	}
	next() {
		return (this.On += 2), this.On;
	}
	static Nn() {
		return new Yt(0);
	}
	static Bn() {
		return new Yt(-1);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mv {
	constructor() {
		(this.changes = new on(
			(e) => e.toString(),
			(e, n) => e.isEqual(n)
		)),
			(this.changesApplied = !1);
	}
	addEntry(e) {
		this.assertNotApplied(), this.changes.set(e.key, e);
	}
	removeEntry(e, n) {
		this.assertNotApplied(), this.changes.set(e, oe.newInvalidDocument(e).setReadTime(n));
	}
	getEntry(e, n) {
		this.assertNotApplied();
		const r = this.changes.get(n);
		return r !== void 0 ? m.resolve(r) : this.getFromCache(e, n);
	}
	getEntries(e, n) {
		return this.getAllFromCache(e, n);
	}
	apply(e) {
		return this.assertNotApplied(), (this.changesApplied = !0), this.applyChanges(e);
	}
	assertNotApplied() {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xv {
	constructor(e, n) {
		(this.overlayedDocument = e), (this.mutatedFields = n);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Uv {
	constructor(e, n, r, i) {
		(this.remoteDocumentCache = e),
			(this.mutationQueue = n),
			(this.documentOverlayCache = r),
			(this.indexManager = i);
	}
	getDocument(e, n) {
		let r = null;
		return this.documentOverlayCache
			.getOverlay(e, n)
			.next((i) => ((r = i), this.remoteDocumentCache.getEntry(e, n)))
			.next((i) => (r !== null && Pn(r.mutation, i, ye.empty(), Q.now()), i));
	}
	getDocuments(e, n) {
		return this.remoteDocumentCache
			.getEntries(e, n)
			.next((r) => this.getLocalViewOfDocuments(e, r, C()).next(() => r));
	}
	getLocalViewOfDocuments(e, n, r = C()) {
		const i = mt();
		return this.populateOverlays(e, i, n).next(() =>
			this.computeViews(e, n, i, r).next((s) => {
				let o = _n();
				return (
					s.forEach((a, c) => {
						o = o.insert(a, c.overlayedDocument);
					}),
					o
				);
			})
		);
	}
	getOverlayedDocuments(e, n) {
		const r = mt();
		return this.populateOverlays(e, r, n).next(() => this.computeViews(e, n, r, C()));
	}
	populateOverlays(e, n, r) {
		const i = [];
		return (
			r.forEach((s) => {
				n.has(s) || i.push(s);
			}),
			this.documentOverlayCache.getOverlays(e, i).next((s) => {
				s.forEach((o, a) => {
					n.set(o, a);
				});
			})
		);
	}
	computeViews(e, n, r, i) {
		let s = ze();
		const o = Sn(),
			a = (function () {
				return Sn();
			})();
		return (
			n.forEach((c, u) => {
				const l = r.get(u.key);
				i.has(u.key) && (l === void 0 || l.mutation instanceof ct)
					? (s = s.insert(u.key, u))
					: l !== void 0
						? (o.set(u.key, l.mutation.getFieldMask()),
							Pn(l.mutation, u, l.mutation.getFieldMask(), Q.now()))
						: o.set(u.key, ye.empty());
			}),
			this.recalculateAndSaveOverlays(e, s).next(
				(c) => (
					c.forEach((u, l) => o.set(u, l)),
					n.forEach((u, l) => {
						var h;
						return a.set(u, new xv(l, (h = o.get(u)) !== null && h !== void 0 ? h : null));
					}),
					a
				)
			)
		);
	}
	recalculateAndSaveOverlays(e, n) {
		const r = Sn();
		let i = new j((o, a) => o - a),
			s = C();
		return this.mutationQueue
			.getAllMutationBatchesAffectingDocumentKeys(e, n)
			.next((o) => {
				for (const a of o)
					a.keys().forEach((c) => {
						const u = n.get(c);
						if (u === null) return;
						let l = r.get(c) || ye.empty();
						(l = a.applyToLocalView(u, l)), r.set(c, l);
						const h = (i.get(a.batchId) || C()).add(c);
						i = i.insert(a.batchId, h);
					});
			})
			.next(() => {
				const o = [],
					a = i.getReverseIterator();
				for (; a.hasNext(); ) {
					const c = a.getNext(),
						u = c.key,
						l = c.value,
						h = ph();
					l.forEach((d) => {
						if (!s.has(d)) {
							const f = Th(n.get(d), r.get(d));
							f !== null && h.set(d, f), (s = s.add(d));
						}
					}),
						o.push(this.documentOverlayCache.saveOverlays(e, u, h));
				}
				return m.waitFor(o);
			})
			.next(() => r);
	}
	recalculateAndSaveOverlaysForDocumentKeys(e, n) {
		return this.remoteDocumentCache
			.getEntries(e, n)
			.next((r) => this.recalculateAndSaveOverlays(e, r));
	}
	getDocumentsMatchingQuery(e, n, r, i) {
		return (function (o) {
			return T.isDocumentKey(o.path) && o.collectionGroup === null && o.filters.length === 0;
		})(n)
			? this.getDocumentsMatchingDocumentQuery(e, n.path)
			: uh(n)
				? this.getDocumentsMatchingCollectionGroupQuery(e, n, r, i)
				: this.getDocumentsMatchingCollectionQuery(e, n, r, i);
	}
	getNextDocuments(e, n, r, i) {
		return this.remoteDocumentCache.getAllFromCollectionGroup(e, n, r, i).next((s) => {
			const o =
				i - s.size > 0
					? this.documentOverlayCache.getOverlaysForCollectionGroup(
							e,
							n,
							r.largestBatchId,
							i - s.size
						)
					: m.resolve(mt());
			let a = -1,
				c = s;
			return o.next((u) =>
				m
					.forEach(
						u,
						(l, h) => (
							a < h.largestBatchId && (a = h.largestBatchId),
							s.get(l)
								? m.resolve()
								: this.remoteDocumentCache.getEntry(e, l).next((d) => {
										c = c.insert(l, d);
									})
						)
					)
					.next(() => this.populateOverlays(e, u, s))
					.next(() => this.computeViews(e, c, u, C()))
					.next((l) => ({ batchId: a, changes: fh(l) }))
			);
		});
	}
	getDocumentsMatchingDocumentQuery(e, n) {
		return this.getDocument(e, new T(n)).next((r) => {
			let i = _n();
			return r.isFoundDocument() && (i = i.insert(r.key, r)), i;
		});
	}
	getDocumentsMatchingCollectionGroupQuery(e, n, r, i) {
		const s = n.collectionGroup;
		let o = _n();
		return this.indexManager.getCollectionParents(e, s).next((a) =>
			m
				.forEach(a, (c) => {
					const u = (function (h, d) {
						return new sr(
							d,
							null,
							h.explicitOrderBy.slice(),
							h.filters.slice(),
							h.limit,
							h.limitType,
							h.startAt,
							h.endAt
						);
					})(n, c.child(s));
					return this.getDocumentsMatchingCollectionQuery(e, u, r, i).next((l) => {
						l.forEach((h, d) => {
							o = o.insert(h, d);
						});
					});
				})
				.next(() => o)
		);
	}
	getDocumentsMatchingCollectionQuery(e, n, r, i) {
		let s;
		return this.documentOverlayCache
			.getOverlaysForCollection(e, n.path, r.largestBatchId)
			.next((o) => ((s = o), this.remoteDocumentCache.getDocumentsMatchingQuery(e, n, r, s, i)))
			.next((o) => {
				s.forEach((c, u) => {
					const l = u.getKey();
					o.get(l) === null && (o = o.insert(l, oe.newInvalidDocument(l)));
				});
				let a = _n();
				return (
					o.forEach((c, u) => {
						const l = s.get(c);
						l !== void 0 && Pn(l.mutation, u, ye.empty(), Q.now()),
							Pi(n, u) && (a = a.insert(c, u));
					}),
					a
				);
			});
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fv {
	constructor(e) {
		(this.serializer = e), (this.cr = new Map()), (this.lr = new Map());
	}
	getBundleMetadata(e, n) {
		return m.resolve(this.cr.get(n));
	}
	saveBundleMetadata(e, n) {
		return (
			this.cr.set(
				n.id,
				(function (i) {
					return { id: i.id, version: i.version, createTime: Ve(i.createTime) };
				})(n)
			),
			m.resolve()
		);
	}
	getNamedQuery(e, n) {
		return m.resolve(this.lr.get(n));
	}
	saveNamedQuery(e, n) {
		return (
			this.lr.set(
				n.name,
				(function (i) {
					return { name: i.name, query: Vv(i.bundledQuery), readTime: Ve(i.readTime) };
				})(n)
			),
			m.resolve()
		);
	}
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bv {
	constructor() {
		(this.overlays = new j(T.comparator)), (this.hr = new Map());
	}
	getOverlay(e, n) {
		return m.resolve(this.overlays.get(n));
	}
	getOverlays(e, n) {
		const r = mt();
		return m
			.forEach(n, (i) =>
				this.getOverlay(e, i).next((s) => {
					s !== null && r.set(i, s);
				})
			)
			.next(() => r);
	}
	saveOverlays(e, n, r) {
		return (
			r.forEach((i, s) => {
				this.ht(e, n, s);
			}),
			m.resolve()
		);
	}
	removeOverlaysForBatchId(e, n, r) {
		const i = this.hr.get(r);
		return (
			i !== void 0 &&
				(i.forEach((s) => (this.overlays = this.overlays.remove(s))), this.hr.delete(r)),
			m.resolve()
		);
	}
	getOverlaysForCollection(e, n, r) {
		const i = mt(),
			s = n.length + 1,
			o = new T(n.child('')),
			a = this.overlays.getIteratorFrom(o);
		for (; a.hasNext(); ) {
			const c = a.getNext().value,
				u = c.getKey();
			if (!n.isPrefixOf(u.path)) break;
			u.path.length === s && c.largestBatchId > r && i.set(c.getKey(), c);
		}
		return m.resolve(i);
	}
	getOverlaysForCollectionGroup(e, n, r, i) {
		let s = new j((u, l) => u - l);
		const o = this.overlays.getIterator();
		for (; o.hasNext(); ) {
			const u = o.getNext().value;
			if (u.getKey().getCollectionGroup() === n && u.largestBatchId > r) {
				let l = s.get(u.largestBatchId);
				l === null && ((l = mt()), (s = s.insert(u.largestBatchId, l))), l.set(u.getKey(), u);
			}
		}
		const a = mt(),
			c = s.getIterator();
		for (; c.hasNext() && (c.getNext().value.forEach((u, l) => a.set(u, l)), !(a.size() >= i)); );
		return m.resolve(a);
	}
	ht(e, n, r) {
		const i = this.overlays.get(r.key);
		if (i !== null) {
			const o = this.hr.get(i.largestBatchId).delete(r.key);
			this.hr.set(i.largestBatchId, o);
		}
		this.overlays = this.overlays.insert(r.key, new uv(n, r));
		let s = this.hr.get(n);
		s === void 0 && ((s = C()), this.hr.set(n, s)), this.hr.set(n, s.add(r.key));
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qo {
	constructor() {
		(this.Pr = new re(X.Ir)), (this.Tr = new re(X.Er));
	}
	isEmpty() {
		return this.Pr.isEmpty();
	}
	addReference(e, n) {
		const r = new X(e, n);
		(this.Pr = this.Pr.add(r)), (this.Tr = this.Tr.add(r));
	}
	dr(e, n) {
		e.forEach((r) => this.addReference(r, n));
	}
	removeReference(e, n) {
		this.Ar(new X(e, n));
	}
	Rr(e, n) {
		e.forEach((r) => this.removeReference(r, n));
	}
	Vr(e) {
		const n = new T(new F([])),
			r = new X(n, e),
			i = new X(n, e + 1),
			s = [];
		return (
			this.Tr.forEachInRange([r, i], (o) => {
				this.Ar(o), s.push(o.key);
			}),
			s
		);
	}
	mr() {
		this.Pr.forEach((e) => this.Ar(e));
	}
	Ar(e) {
		(this.Pr = this.Pr.delete(e)), (this.Tr = this.Tr.delete(e));
	}
	gr(e) {
		const n = new T(new F([])),
			r = new X(n, e),
			i = new X(n, e + 1);
		let s = C();
		return (
			this.Tr.forEachInRange([r, i], (o) => {
				s = s.add(o.key);
			}),
			s
		);
	}
	containsKey(e) {
		const n = new X(e, 0),
			r = this.Pr.firstAfterOrEqual(n);
		return r !== null && e.isEqual(r.key);
	}
}
class X {
	constructor(e, n) {
		(this.key = e), (this.pr = n);
	}
	static Ir(e, n) {
		return T.comparator(e.key, n.key) || N(e.pr, n.pr);
	}
	static Er(e, n) {
		return N(e.pr, n.pr) || T.comparator(e.key, n.key);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class jv {
	constructor(e, n) {
		(this.indexManager = e),
			(this.referenceDelegate = n),
			(this.mutationQueue = []),
			(this.yr = 1),
			(this.wr = new re(X.Ir));
	}
	checkEmpty(e) {
		return m.resolve(this.mutationQueue.length === 0);
	}
	addMutationBatch(e, n, r, i) {
		const s = this.yr;
		this.yr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
		const o = new cv(s, n, r, i);
		this.mutationQueue.push(o);
		for (const a of i)
			(this.wr = this.wr.add(new X(a.key, s))),
				this.indexManager.addToCollectionParentIndex(e, a.key.path.popLast());
		return m.resolve(o);
	}
	lookupMutationBatch(e, n) {
		return m.resolve(this.Sr(n));
	}
	getNextMutationBatchAfterBatchId(e, n) {
		const r = n + 1,
			i = this.br(r),
			s = i < 0 ? 0 : i;
		return m.resolve(this.mutationQueue.length > s ? this.mutationQueue[s] : null);
	}
	getHighestUnacknowledgedBatchId() {
		return m.resolve(this.mutationQueue.length === 0 ? -1 : this.yr - 1);
	}
	getAllMutationBatches(e) {
		return m.resolve(this.mutationQueue.slice());
	}
	getAllMutationBatchesAffectingDocumentKey(e, n) {
		const r = new X(n, 0),
			i = new X(n, Number.POSITIVE_INFINITY),
			s = [];
		return (
			this.wr.forEachInRange([r, i], (o) => {
				const a = this.Sr(o.pr);
				s.push(a);
			}),
			m.resolve(s)
		);
	}
	getAllMutationBatchesAffectingDocumentKeys(e, n) {
		let r = new re(N);
		return (
			n.forEach((i) => {
				const s = new X(i, 0),
					o = new X(i, Number.POSITIVE_INFINITY);
				this.wr.forEachInRange([s, o], (a) => {
					r = r.add(a.pr);
				});
			}),
			m.resolve(this.Dr(r))
		);
	}
	getAllMutationBatchesAffectingQuery(e, n) {
		const r = n.path,
			i = r.length + 1;
		let s = r;
		T.isDocumentKey(s) || (s = s.child(''));
		const o = new X(new T(s), 0);
		let a = new re(N);
		return (
			this.wr.forEachWhile((c) => {
				const u = c.key.path;
				return !!r.isPrefixOf(u) && (u.length === i && (a = a.add(c.pr)), !0);
			}, o),
			m.resolve(this.Dr(a))
		);
	}
	Dr(e) {
		const n = [];
		return (
			e.forEach((r) => {
				const i = this.Sr(r);
				i !== null && n.push(i);
			}),
			n
		);
	}
	removeMutationBatch(e, n) {
		x(this.Cr(n.batchId, 'removed') === 0), this.mutationQueue.shift();
		let r = this.wr;
		return m
			.forEach(n.mutations, (i) => {
				const s = new X(i.key, n.batchId);
				return (r = r.delete(s)), this.referenceDelegate.markPotentiallyOrphaned(e, i.key);
			})
			.next(() => {
				this.wr = r;
			});
	}
	Mn(e) {}
	containsKey(e, n) {
		const r = new X(n, 0),
			i = this.wr.firstAfterOrEqual(r);
		return m.resolve(n.isEqual(i && i.key));
	}
	performConsistencyCheck(e) {
		return this.mutationQueue.length, m.resolve();
	}
	Cr(e, n) {
		return this.br(e);
	}
	br(e) {
		return this.mutationQueue.length === 0 ? 0 : e - this.mutationQueue[0].batchId;
	}
	Sr(e) {
		const n = this.br(e);
		return n < 0 || n >= this.mutationQueue.length ? null : this.mutationQueue[n];
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qv {
	constructor(e) {
		(this.vr = e),
			(this.docs = (function () {
				return new j(T.comparator);
			})()),
			(this.size = 0);
	}
	setIndexManager(e) {
		this.indexManager = e;
	}
	addEntry(e, n) {
		const r = n.key,
			i = this.docs.get(r),
			s = i ? i.size : 0,
			o = this.vr(n);
		return (
			(this.docs = this.docs.insert(r, { document: n.mutableCopy(), size: o })),
			(this.size += o - s),
			this.indexManager.addToCollectionParentIndex(e, r.path.popLast())
		);
	}
	removeEntry(e) {
		const n = this.docs.get(e);
		n && ((this.docs = this.docs.remove(e)), (this.size -= n.size));
	}
	getEntry(e, n) {
		const r = this.docs.get(n);
		return m.resolve(r ? r.document.mutableCopy() : oe.newInvalidDocument(n));
	}
	getEntries(e, n) {
		let r = ze();
		return (
			n.forEach((i) => {
				const s = this.docs.get(i);
				r = r.insert(i, s ? s.document.mutableCopy() : oe.newInvalidDocument(i));
			}),
			m.resolve(r)
		);
	}
	getDocumentsMatchingQuery(e, n, r, i) {
		let s = ze();
		const o = n.path,
			a = new T(o.child('')),
			c = this.docs.getIteratorFrom(a);
		for (; c.hasNext(); ) {
			const {
				key: u,
				value: { document: l }
			} = c.getNext();
			if (!o.isPrefixOf(u.path)) break;
			u.path.length > o.length + 1 ||
				Sy(Ry(l), r) <= 0 ||
				((i.has(l.key) || Pi(n, l)) && (s = s.insert(l.key, l.mutableCopy())));
		}
		return m.resolve(s);
	}
	getAllFromCollectionGroup(e, n, r, i) {
		w();
	}
	Fr(e, n) {
		return m.forEach(this.docs, (r) => n(r));
	}
	newChangeBuffer(e) {
		return new $v(this);
	}
	getSize(e) {
		return m.resolve(this.size);
	}
}
class $v extends Mv {
	constructor(e) {
		super(), (this.ar = e);
	}
	applyChanges(e) {
		const n = [];
		return (
			this.changes.forEach((r, i) => {
				i.isValidDocument() ? n.push(this.ar.addEntry(e, i)) : this.ar.removeEntry(r);
			}),
			m.waitFor(n)
		);
	}
	getFromCache(e, n) {
		return this.ar.getEntry(e, n);
	}
	getAllFromCache(e, n) {
		return this.ar.getEntries(e, n);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zv {
	constructor(e) {
		(this.persistence = e),
			(this.Mr = new on((n) => Lo(n), Mo)),
			(this.lastRemoteSnapshotVersion = R.min()),
			(this.highestTargetId = 0),
			(this.Or = 0),
			(this.Nr = new qo()),
			(this.targetCount = 0),
			(this.Br = Yt.Nn());
	}
	forEachTarget(e, n) {
		return this.Mr.forEach((r, i) => n(i)), m.resolve();
	}
	getLastRemoteSnapshotVersion(e) {
		return m.resolve(this.lastRemoteSnapshotVersion);
	}
	getHighestSequenceNumber(e) {
		return m.resolve(this.Or);
	}
	allocateTargetId(e) {
		return (this.highestTargetId = this.Br.next()), m.resolve(this.highestTargetId);
	}
	setTargetsMetadata(e, n, r) {
		return r && (this.lastRemoteSnapshotVersion = r), n > this.Or && (this.Or = n), m.resolve();
	}
	qn(e) {
		this.Mr.set(e.target, e);
		const n = e.targetId;
		n > this.highestTargetId && ((this.Br = new Yt(n)), (this.highestTargetId = n)),
			e.sequenceNumber > this.Or && (this.Or = e.sequenceNumber);
	}
	addTargetData(e, n) {
		return this.qn(n), (this.targetCount += 1), m.resolve();
	}
	updateTargetData(e, n) {
		return this.qn(n), m.resolve();
	}
	removeTargetData(e, n) {
		return this.Mr.delete(n.target), this.Nr.Vr(n.targetId), (this.targetCount -= 1), m.resolve();
	}
	removeTargets(e, n, r) {
		let i = 0;
		const s = [];
		return (
			this.Mr.forEach((o, a) => {
				a.sequenceNumber <= n &&
					r.get(a.targetId) === null &&
					(this.Mr.delete(o), s.push(this.removeMatchingKeysForTargetId(e, a.targetId)), i++);
			}),
			m.waitFor(s).next(() => i)
		);
	}
	getTargetCount(e) {
		return m.resolve(this.targetCount);
	}
	getTargetData(e, n) {
		const r = this.Mr.get(n) || null;
		return m.resolve(r);
	}
	addMatchingKeys(e, n, r) {
		return this.Nr.dr(n, r), m.resolve();
	}
	removeMatchingKeys(e, n, r) {
		this.Nr.Rr(n, r);
		const i = this.persistence.referenceDelegate,
			s = [];
		return (
			i &&
				n.forEach((o) => {
					s.push(i.markPotentiallyOrphaned(e, o));
				}),
			m.waitFor(s)
		);
	}
	removeMatchingKeysForTargetId(e, n) {
		return this.Nr.Vr(n), m.resolve();
	}
	getMatchingKeysForTargetId(e, n) {
		const r = this.Nr.gr(n);
		return m.resolve(r);
	}
	containsKey(e, n) {
		return m.resolve(this.Nr.containsKey(n));
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Hv {
	constructor(e, n) {
		(this.Lr = {}),
			(this.overlays = {}),
			(this.kr = new Do(0)),
			(this.qr = !1),
			(this.qr = !0),
			(this.referenceDelegate = e(this)),
			(this.Qr = new zv(this)),
			(this.indexManager = new Ov()),
			(this.remoteDocumentCache = (function (i) {
				return new qv(i);
			})((r) => this.referenceDelegate.Kr(r))),
			(this.serializer = new Nv(n)),
			(this.$r = new Fv(this.serializer));
	}
	start() {
		return Promise.resolve();
	}
	shutdown() {
		return (this.qr = !1), Promise.resolve();
	}
	get started() {
		return this.qr;
	}
	setDatabaseDeletedListener() {}
	setNetworkEnabled() {}
	getIndexManager(e) {
		return this.indexManager;
	}
	getDocumentOverlayCache(e) {
		let n = this.overlays[e.toKey()];
		return n || ((n = new Bv()), (this.overlays[e.toKey()] = n)), n;
	}
	getMutationQueue(e, n) {
		let r = this.Lr[e.toKey()];
		return r || ((r = new jv(n, this.referenceDelegate)), (this.Lr[e.toKey()] = r)), r;
	}
	getTargetCache() {
		return this.Qr;
	}
	getRemoteDocumentCache() {
		return this.remoteDocumentCache;
	}
	getBundleCache() {
		return this.$r;
	}
	runTransaction(e, n, r) {
		g('MemoryPersistence', 'Starting transaction:', e);
		const i = new Wv(this.kr.next());
		return (
			this.referenceDelegate.Ur(),
			r(i)
				.next((s) => this.referenceDelegate.Wr(i).next(() => s))
				.toPromise()
				.then((s) => (i.raiseOnCommittedEvent(), s))
		);
	}
	Gr(e, n) {
		return m.or(Object.values(this.Lr).map((r) => () => r.containsKey(e, n)));
	}
}
class Wv extends Cy {
	constructor(e) {
		super(), (this.currentSequenceNumber = e);
	}
}
class $o {
	constructor(e) {
		(this.persistence = e), (this.zr = new qo()), (this.jr = null);
	}
	static Hr(e) {
		return new $o(e);
	}
	get Jr() {
		if (this.jr) return this.jr;
		throw w();
	}
	addReference(e, n, r) {
		return this.zr.addReference(r, n), this.Jr.delete(r.toString()), m.resolve();
	}
	removeReference(e, n, r) {
		return this.zr.removeReference(r, n), this.Jr.add(r.toString()), m.resolve();
	}
	markPotentiallyOrphaned(e, n) {
		return this.Jr.add(n.toString()), m.resolve();
	}
	removeTarget(e, n) {
		this.zr.Vr(n.targetId).forEach((i) => this.Jr.add(i.toString()));
		const r = this.persistence.getTargetCache();
		return r
			.getMatchingKeysForTargetId(e, n.targetId)
			.next((i) => {
				i.forEach((s) => this.Jr.add(s.toString()));
			})
			.next(() => r.removeTargetData(e, n));
	}
	Ur() {
		this.jr = new Set();
	}
	Wr(e) {
		const n = this.persistence.getRemoteDocumentCache().newChangeBuffer();
		return m
			.forEach(this.Jr, (r) => {
				const i = T.fromPath(r);
				return this.Yr(e, i).next((s) => {
					s || n.removeEntry(i, R.min());
				});
			})
			.next(() => ((this.jr = null), n.apply(e)));
	}
	updateLimboDocument(e, n) {
		return this.Yr(e, n).next((r) => {
			r ? this.Jr.delete(n.toString()) : this.Jr.add(n.toString());
		});
	}
	Kr(e) {
		return 0;
	}
	Yr(e, n) {
		return m.or([
			() => m.resolve(this.zr.containsKey(n)),
			() => this.persistence.getTargetCache().containsKey(e, n),
			() => this.persistence.Gr(e, n)
		]);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zo {
	constructor(e, n, r, i) {
		(this.targetId = e), (this.fromCache = n), (this.qi = r), (this.Qi = i);
	}
	static Ki(e, n) {
		let r = C(),
			i = C();
		for (const s of n.docChanges)
			switch (s.type) {
				case 0:
					r = r.add(s.doc.key);
					break;
				case 1:
					i = i.add(s.doc.key);
			}
		return new zo(e, n.fromCache, r, i);
	}
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gv {
	constructor() {
		this._documentReadCount = 0;
	}
	get documentReadCount() {
		return this._documentReadCount;
	}
	incrementDocumentReadCount(e) {
		this._documentReadCount += e;
	}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Kv {
	constructor() {
		(this.$i = !1),
			(this.Ui = !1),
			(this.Wi = 100),
			(this.Gi = (function () {
				return Dd() ? 8 : pt.v(K()) > 0 ? 6 : 4;
			})());
	}
	initialize(e, n) {
		(this.zi = e), (this.indexManager = n), (this.$i = !0);
	}
	getDocumentsMatchingQuery(e, n, r, i) {
		const s = { result: null };
		return this.ji(e, n)
			.next((o) => {
				s.result = o;
			})
			.next(() => {
				if (!s.result)
					return this.Hi(e, n, i, r).next((o) => {
						s.result = o;
					});
			})
			.next(() => {
				if (s.result) return;
				const o = new Gv();
				return this.Ji(e, n, o).next((a) => {
					if (((s.result = a), this.Ui)) return this.Yi(e, n, o, a.size);
				});
			})
			.next(() => s.result);
	}
	Yi(e, n, r, i) {
		return r.documentReadCount < this.Wi
			? (fn() <= b.DEBUG &&
					g(
						'QueryEngine',
						'SDK will not create cache indexes for query:',
						Ot(n),
						'since it only creates cache indexes for collection contains',
						'more than or equal to',
						this.Wi,
						'documents'
					),
				m.resolve())
			: (fn() <= b.DEBUG &&
					g(
						'QueryEngine',
						'Query:',
						Ot(n),
						'scans',
						r.documentReadCount,
						'local documents and returns',
						i,
						'documents as results.'
					),
				r.documentReadCount > this.Gi * i
					? (fn() <= b.DEBUG &&
							g(
								'QueryEngine',
								'The SDK decides to create cache indexes for query:',
								Ot(n),
								'as using cache indexes may help improve performance.'
							),
						this.indexManager.createTargetIndexes(e, Ne(n)))
					: m.resolve());
	}
	ji(e, n) {
		if (gc(n)) return m.resolve(null);
		let r = Ne(n);
		return this.indexManager.getIndexType(e, r).next((i) =>
			i === 0
				? null
				: (n.limit !== null && i === 1 && ((n = Ns(n, null, 'F')), (r = Ne(n))),
					this.indexManager.getDocumentsMatchingTarget(e, r).next((s) => {
						const o = C(...s);
						return this.zi.getDocuments(e, o).next((a) =>
							this.indexManager.getMinOffset(e, r).next((c) => {
								const u = this.Zi(n, a);
								return this.Xi(n, u, o, c.readTime)
									? this.ji(e, Ns(n, null, 'F'))
									: this.es(e, u, n, c);
							})
						);
					}))
		);
	}
	Hi(e, n, r, i) {
		return gc(n) || i.isEqual(R.min())
			? m.resolve(null)
			: this.zi.getDocuments(e, r).next((s) => {
					const o = this.Zi(n, s);
					return this.Xi(n, o, r, i)
						? m.resolve(null)
						: (fn() <= b.DEBUG &&
								g(
									'QueryEngine',
									'Re-using previous result from %s to execute query: %s',
									i.toString(),
									Ot(n)
								),
							this.es(e, o, n, Ay(i, -1)).next((a) => a));
				});
	}
	Zi(e, n) {
		let r = new re(hh(e));
		return (
			n.forEach((i, s) => {
				Pi(e, s) && (r = r.add(s));
			}),
			r
		);
	}
	Xi(e, n, r, i) {
		if (e.limit === null) return !1;
		if (r.size !== n.size) return !0;
		const s = e.limitType === 'F' ? n.last() : n.first();
		return !!s && (s.hasPendingWrites || s.version.compareTo(i) > 0);
	}
	Ji(e, n, r) {
		return (
			fn() <= b.DEBUG && g('QueryEngine', 'Using full collection scan to execute query:', Ot(n)),
			this.zi.getDocumentsMatchingQuery(e, n, rt.min(), r)
		);
	}
	es(e, n, r, i) {
		return this.zi.getDocumentsMatchingQuery(e, r, i).next(
			(s) => (
				n.forEach((o) => {
					s = s.insert(o.key, o);
				}),
				s
			)
		);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Qv {
	constructor(e, n, r, i) {
		(this.persistence = e),
			(this.ts = n),
			(this.serializer = i),
			(this.ns = new j(N)),
			(this.rs = new on((s) => Lo(s), Mo)),
			(this.ss = new Map()),
			(this.os = e.getRemoteDocumentCache()),
			(this.Qr = e.getTargetCache()),
			(this.$r = e.getBundleCache()),
			this._s(r);
	}
	_s(e) {
		(this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e)),
			(this.indexManager = this.persistence.getIndexManager(e)),
			(this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager)),
			(this.localDocuments = new Uv(
				this.os,
				this.mutationQueue,
				this.documentOverlayCache,
				this.indexManager
			)),
			this.os.setIndexManager(this.indexManager),
			this.ts.initialize(this.localDocuments, this.indexManager);
	}
	collectGarbage(e) {
		return this.persistence.runTransaction('Collect garbage', 'readwrite-primary', (n) =>
			e.collect(n, this.ns)
		);
	}
}
function Xv(t, e, n, r) {
	return new Qv(t, e, n, r);
}
async function Vh(t, e) {
	const n = P(t);
	return await n.persistence.runTransaction('Handle user change', 'readonly', (r) => {
		let i;
		return n.mutationQueue
			.getAllMutationBatches(r)
			.next((s) => ((i = s), n._s(e), n.mutationQueue.getAllMutationBatches(r)))
			.next((s) => {
				const o = [],
					a = [];
				let c = C();
				for (const u of i) {
					o.push(u.batchId);
					for (const l of u.mutations) c = c.add(l.key);
				}
				for (const u of s) {
					a.push(u.batchId);
					for (const l of u.mutations) c = c.add(l.key);
				}
				return n.localDocuments
					.getDocuments(r, c)
					.next((u) => ({ us: u, removedBatchIds: o, addedBatchIds: a }));
			});
	});
}
function Jv(t, e) {
	const n = P(t);
	return n.persistence.runTransaction('Acknowledge batch', 'readwrite-primary', (r) => {
		const i = e.batch.keys(),
			s = n.os.newChangeBuffer({ trackRemovals: !0 });
		return (function (a, c, u, l) {
			const h = u.batch,
				d = h.keys();
			let f = m.resolve();
			return (
				d.forEach((E) => {
					f = f
						.next(() => l.getEntry(c, E))
						.next((I) => {
							const v = u.docVersions.get(E);
							x(v !== null),
								I.version.compareTo(v) < 0 &&
									(h.applyToRemoteDocument(I, u),
									I.isValidDocument() && (I.setReadTime(u.commitVersion), l.addEntry(I)));
						});
				}),
				f.next(() => a.mutationQueue.removeMutationBatch(c, h))
			);
		})(n, r, e, s)
			.next(() => s.apply(r))
			.next(() => n.mutationQueue.performConsistencyCheck(r))
			.next(() => n.documentOverlayCache.removeOverlaysForBatchId(r, i, e.batch.batchId))
			.next(() =>
				n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
					r,
					(function (a) {
						let c = C();
						for (let u = 0; u < a.mutationResults.length; ++u)
							a.mutationResults[u].transformResults.length > 0 &&
								(c = c.add(a.batch.mutations[u].key));
						return c;
					})(e)
				)
			)
			.next(() => n.localDocuments.getDocuments(r, i));
	});
}
function Oh(t) {
	const e = P(t);
	return e.persistence.runTransaction('Get last remote snapshot version', 'readonly', (n) =>
		e.Qr.getLastRemoteSnapshotVersion(n)
	);
}
function Yv(t, e) {
	const n = P(t),
		r = e.snapshotVersion;
	let i = n.ns;
	return n.persistence
		.runTransaction('Apply remote event', 'readwrite-primary', (s) => {
			const o = n.os.newChangeBuffer({ trackRemovals: !0 });
			i = n.ns;
			const a = [];
			e.targetChanges.forEach((l, h) => {
				const d = i.get(h);
				if (!d) return;
				a.push(
					n.Qr.removeMatchingKeys(s, l.removedDocuments, h).next(() =>
						n.Qr.addMatchingKeys(s, l.addedDocuments, h)
					)
				);
				let f = d.withSequenceNumber(s.currentSequenceNumber);
				e.targetMismatches.get(h) !== null
					? (f = f
							.withResumeToken(le.EMPTY_BYTE_STRING, R.min())
							.withLastLimboFreeSnapshotVersion(R.min()))
					: l.resumeToken.approximateByteSize() > 0 && (f = f.withResumeToken(l.resumeToken, r)),
					(i = i.insert(h, f)),
					(function (I, v, k) {
						return I.resumeToken.approximateByteSize() === 0 ||
							v.snapshotVersion.toMicroseconds() - I.snapshotVersion.toMicroseconds() >= 3e8
							? !0
							: k.addedDocuments.size + k.modifiedDocuments.size + k.removedDocuments.size > 0;
					})(d, f, l) && a.push(n.Qr.updateTargetData(s, f));
			});
			let c = ze(),
				u = C();
			if (
				(e.documentUpdates.forEach((l) => {
					e.resolvedLimboDocuments.has(l) &&
						a.push(n.persistence.referenceDelegate.updateLimboDocument(s, l));
				}),
				a.push(
					Zv(s, o, e.documentUpdates).next((l) => {
						(c = l.cs), (u = l.ls);
					})
				),
				!r.isEqual(R.min()))
			) {
				const l = n.Qr.getLastRemoteSnapshotVersion(s).next((h) =>
					n.Qr.setTargetsMetadata(s, s.currentSequenceNumber, r)
				);
				a.push(l);
			}
			return m
				.waitFor(a)
				.next(() => o.apply(s))
				.next(() => n.localDocuments.getLocalViewOfDocuments(s, c, u))
				.next(() => c);
		})
		.then((s) => ((n.ns = i), s));
}
function Zv(t, e, n) {
	let r = C(),
		i = C();
	return (
		n.forEach((s) => (r = r.add(s))),
		e.getEntries(t, r).next((s) => {
			let o = ze();
			return (
				n.forEach((a, c) => {
					const u = s.get(a);
					c.isFoundDocument() !== u.isFoundDocument() && (i = i.add(a)),
						c.isNoDocument() && c.version.isEqual(R.min())
							? (e.removeEntry(a, c.readTime), (o = o.insert(a, c)))
							: !u.isValidDocument() ||
								  c.version.compareTo(u.version) > 0 ||
								  (c.version.compareTo(u.version) === 0 && u.hasPendingWrites)
								? (e.addEntry(c), (o = o.insert(a, c)))
								: g(
										'LocalStore',
										'Ignoring outdated watch update for ',
										a,
										'. Current version:',
										u.version,
										' Watch version:',
										c.version
									);
				}),
				{ cs: o, ls: i }
			);
		})
	);
}
function eE(t, e) {
	const n = P(t);
	return n.persistence.runTransaction(
		'Get next mutation batch',
		'readonly',
		(r) => (e === void 0 && (e = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(r, e))
	);
}
function tE(t, e) {
	const n = P(t);
	return n.persistence
		.runTransaction('Allocate target', 'readwrite', (r) => {
			let i;
			return n.Qr.getTargetData(r, e).next((s) =>
				s
					? ((i = s), m.resolve(i))
					: n.Qr.allocateTargetId(r).next(
							(o) => (
								(i = new Ye(e, o, 'TargetPurposeListen', r.currentSequenceNumber)),
								n.Qr.addTargetData(r, i).next(() => i)
							)
						)
			);
		})
		.then((r) => {
			const i = n.ns.get(r.targetId);
			return (
				(i === null || r.snapshotVersion.compareTo(i.snapshotVersion) > 0) &&
					((n.ns = n.ns.insert(r.targetId, r)), n.rs.set(e, r.targetId)),
				r
			);
		});
}
async function xs(t, e, n) {
	const r = P(t),
		i = r.ns.get(e),
		s = n ? 'readwrite' : 'readwrite-primary';
	try {
		n ||
			(await r.persistence.runTransaction('Release target', s, (o) =>
				r.persistence.referenceDelegate.removeTarget(o, i)
			));
	} catch (o) {
		if (!ir(o)) throw o;
		g('LocalStore', `Failed to update sequence numbers for target ${e}: ${o}`);
	}
	(r.ns = r.ns.remove(e)), r.rs.delete(i.target);
}
function Pc(t, e, n) {
	const r = P(t);
	let i = R.min(),
		s = C();
	return r.persistence.runTransaction('Execute query', 'readwrite', (o) =>
		(function (c, u, l) {
			const h = P(c),
				d = h.rs.get(l);
			return d !== void 0 ? m.resolve(h.ns.get(d)) : h.Qr.getTargetData(u, l);
		})(r, o, Ne(e))
			.next((a) => {
				if (a)
					return (
						(i = a.lastLimboFreeSnapshotVersion),
						r.Qr.getMatchingKeysForTargetId(o, a.targetId).next((c) => {
							s = c;
						})
					);
			})
			.next(() => r.ts.getDocumentsMatchingQuery(o, e, n ? i : R.min(), n ? s : C()))
			.next((a) => (nE(r, Gy(e), a), { documents: a, hs: s }))
	);
}
function nE(t, e, n) {
	let r = t.ss.get(e) || R.min();
	n.forEach((i, s) => {
		s.readTime.compareTo(r) > 0 && (r = s.readTime);
	}),
		t.ss.set(e, r);
}
class Cc {
	constructor() {
		this.activeTargetIds = Zy();
	}
	As(e) {
		this.activeTargetIds = this.activeTargetIds.add(e);
	}
	Rs(e) {
		this.activeTargetIds = this.activeTargetIds.delete(e);
	}
	ds() {
		const e = { activeTargetIds: this.activeTargetIds.toArray(), updateTimeMs: Date.now() };
		return JSON.stringify(e);
	}
}
class rE {
	constructor() {
		(this.no = new Cc()),
			(this.ro = {}),
			(this.onlineStateHandler = null),
			(this.sequenceNumberHandler = null);
	}
	addPendingMutation(e) {}
	updateMutationState(e, n, r) {}
	addLocalQueryTarget(e) {
		return this.no.As(e), this.ro[e] || 'not-current';
	}
	updateQueryState(e, n, r) {
		this.ro[e] = n;
	}
	removeLocalQueryTarget(e) {
		this.no.Rs(e);
	}
	isLocalQueryTarget(e) {
		return this.no.activeTargetIds.has(e);
	}
	clearQueryState(e) {
		delete this.ro[e];
	}
	getAllActiveQueryTargets() {
		return this.no.activeTargetIds;
	}
	isActiveQueryTarget(e) {
		return this.no.activeTargetIds.has(e);
	}
	start() {
		return (this.no = new Cc()), Promise.resolve();
	}
	handleUserChange(e, n, r) {}
	setOnlineState(e) {}
	shutdown() {}
	writeSequenceNumber(e) {}
	notifyBundleLoaded(e) {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class iE {
	io(e) {}
	shutdown() {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bc {
	constructor() {
		(this.so = () => this.oo()), (this._o = () => this.ao()), (this.uo = []), this.co();
	}
	io(e) {
		this.uo.push(e);
	}
	shutdown() {
		window.removeEventListener('online', this.so), window.removeEventListener('offline', this._o);
	}
	co() {
		window.addEventListener('online', this.so), window.addEventListener('offline', this._o);
	}
	oo() {
		g('ConnectivityMonitor', 'Network connectivity changed: AVAILABLE');
		for (const e of this.uo) e(0);
	}
	ao() {
		g('ConnectivityMonitor', 'Network connectivity changed: UNAVAILABLE');
		for (const e of this.uo) e(1);
	}
	static D() {
		return (
			typeof window < 'u' &&
			window.addEventListener !== void 0 &&
			window.removeEventListener !== void 0
		);
	}
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let Ar = null;
function rs() {
	return (
		Ar === null
			? (Ar = (function () {
					return 268435456 + Math.round(2147483648 * Math.random());
				})())
			: Ar++,
		'0x' + Ar.toString(16)
	);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const sE = {
	BatchGetDocuments: 'batchGet',
	Commit: 'commit',
	RunQuery: 'runQuery',
	RunAggregationQuery: 'runAggregationQuery'
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oE {
	constructor(e) {
		(this.lo = e.lo), (this.ho = e.ho);
	}
	Po(e) {
		this.Io = e;
	}
	To(e) {
		this.Eo = e;
	}
	onMessage(e) {
		this.Ao = e;
	}
	close() {
		this.ho();
	}
	send(e) {
		this.lo(e);
	}
	Ro() {
		this.Io();
	}
	Vo(e) {
		this.Eo(e);
	}
	mo(e) {
		this.Ao(e);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ie = 'WebChannelConnection';
class aE extends class {
	constructor(n) {
		(this.databaseInfo = n), (this.databaseId = n.databaseId);
		const r = n.ssl ? 'https' : 'http',
			i = encodeURIComponent(this.databaseId.projectId),
			s = encodeURIComponent(this.databaseId.database);
		(this.fo = r + '://' + n.host),
			(this.po = `projects/${i}/databases/${s}`),
			(this.yo =
				this.databaseId.database === '(default)'
					? `project_id=${i}`
					: `project_id=${i}&database_id=${s}`);
	}
	get wo() {
		return !1;
	}
	So(n, r, i, s, o) {
		const a = rs(),
			c = this.bo(n, r.toUriEncodedString());
		g('RestConnection', `Sending RPC '${n}' ${a}:`, c, i);
		const u = { 'google-cloud-resource-prefix': this.po, 'x-goog-request-params': this.yo };
		return (
			this.Do(u, s, o),
			this.Co(n, c, u, i).then(
				(l) => (g('RestConnection', `Received RPC '${n}' ${a}: `, l), l),
				(l) => {
					throw (
						(Wt(
							'RestConnection',
							`RPC '${n}' ${a} failed with error: `,
							l,
							'url: ',
							c,
							'request:',
							i
						),
						l)
					);
				}
			)
		);
	}
	vo(n, r, i, s, o, a) {
		return this.So(n, r, i, s, o);
	}
	Do(n, r, i) {
		(n['X-Goog-Api-Client'] = (function () {
			return 'gl-js/ fire/' + sn;
		})()),
			(n['Content-Type'] = 'text/plain'),
			this.databaseInfo.appId && (n['X-Firebase-GMPID'] = this.databaseInfo.appId),
			r && r.headers.forEach((s, o) => (n[o] = s)),
			i && i.headers.forEach((s, o) => (n[o] = s));
	}
	bo(n, r) {
		const i = sE[n];
		return `${this.fo}/v1/${r}:${i}`;
	}
	terminate() {}
} {
	constructor(e) {
		super(e),
			(this.forceLongPolling = e.forceLongPolling),
			(this.autoDetectLongPolling = e.autoDetectLongPolling),
			(this.useFetchStreams = e.useFetchStreams),
			(this.longPollingOptions = e.longPollingOptions);
	}
	Co(e, n, r, i) {
		const s = rs();
		return new Promise((o, a) => {
			const c = new fy();
			c.setWithCredentials(!0),
				c.listenOnce(hy.COMPLETE, () => {
					try {
						switch (c.getLastErrorCode()) {
							case ts.NO_ERROR:
								const l = c.getResponseJson();
								g(ie, `XHR for RPC '${e}' ${s} received:`, JSON.stringify(l)), o(l);
								break;
							case ts.TIMEOUT:
								g(ie, `RPC '${e}' ${s} timed out`),
									a(new y(p.DEADLINE_EXCEEDED, 'Request time out'));
								break;
							case ts.HTTP_ERROR:
								const h = c.getStatus();
								if (
									(g(
										ie,
										`RPC '${e}' ${s} failed with status:`,
										h,
										'response text:',
										c.getResponseText()
									),
									h > 0)
								) {
									let d = c.getResponseJson();
									Array.isArray(d) && (d = d[0]);
									const f = d == null ? void 0 : d.error;
									if (f && f.status && f.message) {
										const E = (function (v) {
											const k = v.toLowerCase().replace(/_/g, '-');
											return Object.values(p).indexOf(k) >= 0 ? k : p.UNKNOWN;
										})(f.status);
										a(new y(E, f.message));
									} else a(new y(p.UNKNOWN, 'Server responded with status ' + c.getStatus()));
								} else a(new y(p.UNAVAILABLE, 'Connection failed.'));
								break;
							default:
								w();
						}
					} finally {
						g(ie, `RPC '${e}' ${s} completed.`);
					}
				});
			const u = JSON.stringify(i);
			g(ie, `RPC '${e}' ${s} sending request:`, i), c.send(n, 'POST', u, r, 15);
		});
	}
	Fo(e, n, r) {
		const i = rs(),
			s = [this.fo, '/', 'google.firestore.v1.Firestore', '/', e, '/channel'],
			o = uy(),
			a = ly(),
			c = {
				httpSessionIdParam: 'gsessionid',
				initMessageHeaders: {},
				messageUrlParams: {
					database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
				},
				sendRawJson: !0,
				supportsCrossDomainXhr: !0,
				internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
				forceLongPolling: this.forceLongPolling,
				detectBufferingProxy: this.autoDetectLongPolling
			},
			u = this.longPollingOptions.timeoutSeconds;
		u !== void 0 && (c.longPollingTimeout = Math.round(1e3 * u)),
			this.useFetchStreams && (c.useFetchStreams = !0),
			this.Do(c.initMessageHeaders, n, r),
			(c.encodeInitMessageHeaders = !0);
		const l = s.join('');
		g(ie, `Creating RPC '${e}' stream ${i}: ${l}`, c);
		const h = o.createWebChannel(l, c);
		let d = !1,
			f = !1;
		const E = new oE({
				lo: (v) => {
					f
						? g(ie, `Not sending because RPC '${e}' stream ${i} is closed:`, v)
						: (d || (g(ie, `Opening RPC '${e}' stream ${i} transport.`), h.open(), (d = !0)),
							g(ie, `RPC '${e}' stream ${i} sending:`, v),
							h.send(v));
				},
				ho: () => h.close()
			}),
			I = (v, k, O) => {
				v.listen(k, (L) => {
					try {
						O(L);
					} catch (M) {
						setTimeout(() => {
							throw M;
						}, 0);
					}
				});
			};
		return (
			I(h, Tr.EventType.OPEN, () => {
				f || g(ie, `RPC '${e}' stream ${i} transport opened.`);
			}),
			I(h, Tr.EventType.CLOSE, () => {
				f || ((f = !0), g(ie, `RPC '${e}' stream ${i} transport closed`), E.Vo());
			}),
			I(h, Tr.EventType.ERROR, (v) => {
				f ||
					((f = !0),
					Wt(ie, `RPC '${e}' stream ${i} transport errored:`, v),
					E.Vo(new y(p.UNAVAILABLE, 'The operation could not be completed')));
			}),
			I(h, Tr.EventType.MESSAGE, (v) => {
				var k;
				if (!f) {
					const O = v.data[0];
					x(!!O);
					const L = O,
						M = L.error || ((k = L[0]) === null || k === void 0 ? void 0 : k.error);
					if (M) {
						g(ie, `RPC '${e}' stream ${i} received error:`, M);
						const Ee = M.status;
						let fe = (function (un) {
								const fr = H[un];
								if (fr !== void 0) return wh(fr);
							})(Ee),
							Ue = M.message;
						fe === void 0 &&
							((fe = p.INTERNAL),
							(Ue = 'Unknown error status: ' + Ee + ' with message ' + M.message)),
							(f = !0),
							E.Vo(new y(fe, Ue)),
							h.close();
					} else g(ie, `RPC '${e}' stream ${i} received:`, O), E.mo(O);
				}
			}),
			I(a, dy.STAT_EVENT, (v) => {
				v.stat === ic.PROXY
					? g(ie, `RPC '${e}' stream ${i} detected buffering proxy`)
					: v.stat === ic.NOPROXY && g(ie, `RPC '${e}' stream ${i} detected no buffering proxy`);
			}),
			setTimeout(() => {
				E.Ro();
			}, 0),
			E
		);
	}
}
function is() {
	return typeof document < 'u' ? document : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Di(t) {
	return new yv(t, !0);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Lh {
	constructor(e, n, r = 1e3, i = 1.5, s = 6e4) {
		(this.oi = e),
			(this.timerId = n),
			(this.Mo = r),
			(this.xo = i),
			(this.Oo = s),
			(this.No = 0),
			(this.Bo = null),
			(this.Lo = Date.now()),
			this.reset();
	}
	reset() {
		this.No = 0;
	}
	ko() {
		this.No = this.Oo;
	}
	qo(e) {
		this.cancel();
		const n = Math.floor(this.No + this.Qo()),
			r = Math.max(0, Date.now() - this.Lo),
			i = Math.max(0, n - r);
		i > 0 &&
			g(
				'ExponentialBackoff',
				`Backing off for ${i} ms (base delay: ${this.No} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`
			),
			(this.Bo = this.oi.enqueueAfterDelay(this.timerId, i, () => ((this.Lo = Date.now()), e()))),
			(this.No *= this.xo),
			this.No < this.Mo && (this.No = this.Mo),
			this.No > this.Oo && (this.No = this.Oo);
	}
	Ko() {
		this.Bo !== null && (this.Bo.skipDelay(), (this.Bo = null));
	}
	cancel() {
		this.Bo !== null && (this.Bo.cancel(), (this.Bo = null));
	}
	Qo() {
		return (Math.random() - 0.5) * this.No;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mh {
	constructor(e, n, r, i, s, o, a, c) {
		(this.oi = e),
			(this.$o = r),
			(this.Uo = i),
			(this.connection = s),
			(this.authCredentialsProvider = o),
			(this.appCheckCredentialsProvider = a),
			(this.listener = c),
			(this.state = 0),
			(this.Wo = 0),
			(this.Go = null),
			(this.zo = null),
			(this.stream = null),
			(this.jo = new Lh(e, n));
	}
	Ho() {
		return this.state === 1 || this.state === 5 || this.Jo();
	}
	Jo() {
		return this.state === 2 || this.state === 3;
	}
	start() {
		this.state !== 4 ? this.auth() : this.Yo();
	}
	async stop() {
		this.Ho() && (await this.close(0));
	}
	Zo() {
		(this.state = 0), this.jo.reset();
	}
	Xo() {
		this.Jo() &&
			this.Go === null &&
			(this.Go = this.oi.enqueueAfterDelay(this.$o, 6e4, () => this.e_()));
	}
	t_(e) {
		this.n_(), this.stream.send(e);
	}
	async e_() {
		if (this.Jo()) return this.close(0);
	}
	n_() {
		this.Go && (this.Go.cancel(), (this.Go = null));
	}
	r_() {
		this.zo && (this.zo.cancel(), (this.zo = null));
	}
	async close(e, n) {
		this.n_(),
			this.r_(),
			this.jo.cancel(),
			this.Wo++,
			e !== 4
				? this.jo.reset()
				: n && n.code === p.RESOURCE_EXHAUSTED
					? (Le(n.toString()),
						Le('Using maximum backoff delay to prevent overloading the backend.'),
						this.jo.ko())
					: n &&
						n.code === p.UNAUTHENTICATED &&
						this.state !== 3 &&
						(this.authCredentialsProvider.invalidateToken(),
						this.appCheckCredentialsProvider.invalidateToken()),
			this.stream !== null && (this.i_(), this.stream.close(), (this.stream = null)),
			(this.state = e),
			await this.listener.To(n);
	}
	i_() {}
	auth() {
		this.state = 1;
		const e = this.s_(this.Wo),
			n = this.Wo;
		Promise.all([
			this.authCredentialsProvider.getToken(),
			this.appCheckCredentialsProvider.getToken()
		]).then(
			([r, i]) => {
				this.Wo === n && this.o_(r, i);
			},
			(r) => {
				e(() => {
					const i = new y(p.UNKNOWN, 'Fetching auth token failed: ' + r.message);
					return this.__(i);
				});
			}
		);
	}
	o_(e, n) {
		const r = this.s_(this.Wo);
		(this.stream = this.a_(e, n)),
			this.stream.Po(() => {
				r(
					() => (
						(this.state = 2),
						(this.zo = this.oi.enqueueAfterDelay(
							this.Uo,
							1e4,
							() => (this.Jo() && (this.state = 3), Promise.resolve())
						)),
						this.listener.Po()
					)
				);
			}),
			this.stream.To((i) => {
				r(() => this.__(i));
			}),
			this.stream.onMessage((i) => {
				r(() => this.onMessage(i));
			});
	}
	Yo() {
		(this.state = 5),
			this.jo.qo(async () => {
				(this.state = 0), this.start();
			});
	}
	__(e) {
		return g('PersistentStream', `close with error: ${e}`), (this.stream = null), this.close(4, e);
	}
	s_(e) {
		return (n) => {
			this.oi.enqueueAndForget(() =>
				this.Wo === e
					? n()
					: (g('PersistentStream', 'stream callback skipped by getCloseGuardedDispatcher.'),
						Promise.resolve())
			);
		};
	}
}
class cE extends Mh {
	constructor(e, n, r, i, s, o) {
		super(
			e,
			'listen_stream_connection_backoff',
			'listen_stream_idle',
			'health_check_timeout',
			n,
			r,
			i,
			o
		),
			(this.serializer = s);
	}
	a_(e, n) {
		return this.connection.Fo('Listen', e, n);
	}
	onMessage(e) {
		this.jo.reset();
		const n = Tv(this.serializer, e),
			r = (function (s) {
				if (!('targetChange' in s)) return R.min();
				const o = s.targetChange;
				return o.targetIds && o.targetIds.length ? R.min() : o.readTime ? Ve(o.readTime) : R.min();
			})(e);
		return this.listener.u_(n, r);
	}
	c_(e) {
		const n = {};
		(n.database = Ms(this.serializer)),
			(n.addTarget = (function (s, o) {
				let a;
				const c = o.target;
				if (
					((a = ks(c) ? { documents: Av(s, c) } : { query: Rv(s, c).ut }),
					(a.targetId = o.targetId),
					o.resumeToken.approximateByteSize() > 0)
				) {
					a.resumeToken = Sh(s, o.resumeToken);
					const u = Vs(s, o.expectedCount);
					u !== null && (a.expectedCount = u);
				} else if (o.snapshotVersion.compareTo(R.min()) > 0) {
					a.readTime = Jr(s, o.snapshotVersion.toTimestamp());
					const u = Vs(s, o.expectedCount);
					u !== null && (a.expectedCount = u);
				}
				return a;
			})(this.serializer, e));
		const r = Pv(this.serializer, e);
		r && (n.labels = r), this.t_(n);
	}
	l_(e) {
		const n = {};
		(n.database = Ms(this.serializer)), (n.removeTarget = e), this.t_(n);
	}
}
class uE extends Mh {
	constructor(e, n, r, i, s, o) {
		super(
			e,
			'write_stream_connection_backoff',
			'write_stream_idle',
			'health_check_timeout',
			n,
			r,
			i,
			o
		),
			(this.serializer = s),
			(this.h_ = !1);
	}
	get P_() {
		return this.h_;
	}
	start() {
		(this.h_ = !1), (this.lastStreamToken = void 0), super.start();
	}
	i_() {
		this.h_ && this.I_([]);
	}
	a_(e, n) {
		return this.connection.Fo('Write', e, n);
	}
	onMessage(e) {
		if ((x(!!e.streamToken), (this.lastStreamToken = e.streamToken), this.h_)) {
			this.jo.reset();
			const n = wv(e.writeResults, e.commitTime),
				r = Ve(e.commitTime);
			return this.listener.T_(r, n);
		}
		return x(!e.writeResults || e.writeResults.length === 0), (this.h_ = !0), this.listener.E_();
	}
	d_() {
		const e = {};
		(e.database = Ms(this.serializer)), this.t_(e);
	}
	I_(e) {
		const n = { streamToken: this.lastStreamToken, writes: e.map((r) => Iv(this.serializer, r)) };
		this.t_(n);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lE extends class {} {
	constructor(e, n, r, i) {
		super(),
			(this.authCredentials = e),
			(this.appCheckCredentials = n),
			(this.connection = r),
			(this.serializer = i),
			(this.A_ = !1);
	}
	R_() {
		if (this.A_) throw new y(p.FAILED_PRECONDITION, 'The client has already been terminated.');
	}
	So(e, n, r, i) {
		return (
			this.R_(),
			Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
				.then(([s, o]) => this.connection.So(e, Os(n, r), i, s, o))
				.catch((s) => {
					throw s.name === 'FirebaseError'
						? (s.code === p.UNAUTHENTICATED &&
								(this.authCredentials.invalidateToken(),
								this.appCheckCredentials.invalidateToken()),
							s)
						: new y(p.UNKNOWN, s.toString());
				})
		);
	}
	vo(e, n, r, i, s) {
		return (
			this.R_(),
			Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
				.then(([o, a]) => this.connection.vo(e, Os(n, r), i, o, a, s))
				.catch((o) => {
					throw o.name === 'FirebaseError'
						? (o.code === p.UNAUTHENTICATED &&
								(this.authCredentials.invalidateToken(),
								this.appCheckCredentials.invalidateToken()),
							o)
						: new y(p.UNKNOWN, o.toString());
				})
		);
	}
	terminate() {
		(this.A_ = !0), this.connection.terminate();
	}
}
class hE {
	constructor(e, n) {
		(this.asyncQueue = e),
			(this.onlineStateHandler = n),
			(this.state = 'Unknown'),
			(this.m_ = 0),
			(this.f_ = null),
			(this.g_ = !0);
	}
	p_() {
		this.m_ === 0 &&
			(this.y_('Unknown'),
			(this.f_ = this.asyncQueue.enqueueAfterDelay(
				'online_state_timeout',
				1e4,
				() => (
					(this.f_ = null),
					this.w_("Backend didn't respond within 10 seconds."),
					this.y_('Offline'),
					Promise.resolve()
				)
			)));
	}
	S_(e) {
		this.state === 'Online'
			? this.y_('Unknown')
			: (this.m_++,
				this.m_ >= 1 &&
					(this.b_(),
					this.w_(`Connection failed 1 times. Most recent error: ${e.toString()}`),
					this.y_('Offline')));
	}
	set(e) {
		this.b_(), (this.m_ = 0), e === 'Online' && (this.g_ = !1), this.y_(e);
	}
	y_(e) {
		e !== this.state && ((this.state = e), this.onlineStateHandler(e));
	}
	w_(e) {
		const n = `Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
		this.g_ ? (Le(n), (this.g_ = !1)) : g('OnlineStateTracker', n);
	}
	b_() {
		this.f_ !== null && (this.f_.cancel(), (this.f_ = null));
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class dE {
	constructor(e, n, r, i, s) {
		(this.localStore = e),
			(this.datastore = n),
			(this.asyncQueue = r),
			(this.remoteSyncer = {}),
			(this.D_ = []),
			(this.C_ = new Map()),
			(this.v_ = new Set()),
			(this.F_ = []),
			(this.M_ = s),
			this.M_.io((o) => {
				r.enqueueAndForget(async () => {
					bt(this) &&
						(g('RemoteStore', 'Restarting streams for network reachability change.'),
						await (async function (c) {
							const u = P(c);
							u.v_.add(4), await cr(u), u.x_.set('Unknown'), u.v_.delete(4), await Ni(u);
						})(this));
				});
			}),
			(this.x_ = new hE(r, i));
	}
}
async function Ni(t) {
	if (bt(t)) for (const e of t.F_) await e(!0);
}
async function cr(t) {
	for (const e of t.F_) await e(!1);
}
function xh(t, e) {
	const n = P(t);
	n.C_.has(e.targetId) || (n.C_.set(e.targetId, e), Go(n) ? Wo(n) : an(n).Jo() && Ho(n, e));
}
function Uh(t, e) {
	const n = P(t),
		r = an(n);
	n.C_.delete(e),
		r.Jo() && Fh(n, e),
		n.C_.size === 0 && (r.Jo() ? r.Xo() : bt(n) && n.x_.set('Unknown'));
}
function Ho(t, e) {
	if (
		(t.O_.Oe(e.targetId),
		e.resumeToken.approximateByteSize() > 0 || e.snapshotVersion.compareTo(R.min()) > 0)
	) {
		const n = t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;
		e = e.withExpectedCount(n);
	}
	an(t).c_(e);
}
function Fh(t, e) {
	t.O_.Oe(e), an(t).l_(e);
}
function Wo(t) {
	(t.O_ = new pv({
		getRemoteKeysForTarget: (e) => t.remoteSyncer.getRemoteKeysForTarget(e),
		_t: (e) => t.C_.get(e) || null,
		nt: () => t.datastore.serializer.databaseId
	})),
		an(t).start(),
		t.x_.p_();
}
function Go(t) {
	return bt(t) && !an(t).Ho() && t.C_.size > 0;
}
function bt(t) {
	return P(t).v_.size === 0;
}
function Bh(t) {
	t.O_ = void 0;
}
async function fE(t) {
	t.C_.forEach((e, n) => {
		Ho(t, e);
	});
}
async function pE(t, e) {
	Bh(t), Go(t) ? (t.x_.S_(e), Wo(t)) : t.x_.set('Unknown');
}
async function mE(t, e, n) {
	if ((t.x_.set('Online'), e instanceof Rh && e.state === 2 && e.cause))
		try {
			await (async function (i, s) {
				const o = s.cause;
				for (const a of s.targetIds)
					i.C_.has(a) &&
						(await i.remoteSyncer.rejectListen(a, o), i.C_.delete(a), i.O_.removeTarget(a));
			})(t, e);
		} catch (r) {
			g('RemoteStore', 'Failed to remove targets %s: %s ', e.targetIds.join(','), r),
				await Yr(t, r);
		}
	else if (
		(e instanceof Dr ? t.O_.$e(e) : e instanceof Ah ? t.O_.Je(e) : t.O_.Ge(e), !n.isEqual(R.min()))
	)
		try {
			const r = await Oh(t.localStore);
			n.compareTo(r) >= 0 &&
				(await (function (s, o) {
					const a = s.O_.it(o);
					return (
						a.targetChanges.forEach((c, u) => {
							if (c.resumeToken.approximateByteSize() > 0) {
								const l = s.C_.get(u);
								l && s.C_.set(u, l.withResumeToken(c.resumeToken, o));
							}
						}),
						a.targetMismatches.forEach((c, u) => {
							const l = s.C_.get(c);
							if (!l) return;
							s.C_.set(c, l.withResumeToken(le.EMPTY_BYTE_STRING, l.snapshotVersion)), Fh(s, c);
							const h = new Ye(l.target, c, u, l.sequenceNumber);
							Ho(s, h);
						}),
						s.remoteSyncer.applyRemoteEvent(a)
					);
				})(t, n));
		} catch (r) {
			g('RemoteStore', 'Failed to raise snapshot:', r), await Yr(t, r);
		}
}
async function Yr(t, e, n) {
	if (!ir(e)) throw e;
	t.v_.add(1),
		await cr(t),
		t.x_.set('Offline'),
		n || (n = () => Oh(t.localStore)),
		t.asyncQueue.enqueueRetryable(async () => {
			g('RemoteStore', 'Retrying IndexedDB access'), await n(), t.v_.delete(1), await Ni(t);
		});
}
function jh(t, e) {
	return e().catch((n) => Yr(t, n, e));
}
async function Vi(t) {
	const e = P(t),
		n = st(e);
	let r = e.D_.length > 0 ? e.D_[e.D_.length - 1].batchId : -1;
	for (; gE(e); )
		try {
			const i = await eE(e.localStore, r);
			if (i === null) {
				e.D_.length === 0 && n.Xo();
				break;
			}
			(r = i.batchId), _E(e, i);
		} catch (i) {
			await Yr(e, i);
		}
	qh(e) && $h(e);
}
function gE(t) {
	return bt(t) && t.D_.length < 10;
}
function _E(t, e) {
	t.D_.push(e);
	const n = st(t);
	n.Jo() && n.P_ && n.I_(e.mutations);
}
function qh(t) {
	return bt(t) && !st(t).Ho() && t.D_.length > 0;
}
function $h(t) {
	st(t).start();
}
async function yE(t) {
	st(t).d_();
}
async function vE(t) {
	const e = st(t);
	for (const n of t.D_) e.I_(n.mutations);
}
async function EE(t, e, n) {
	const r = t.D_.shift(),
		i = Fo.from(r, e, n);
	await jh(t, () => t.remoteSyncer.applySuccessfulWrite(i)), await Vi(t);
}
async function TE(t, e) {
	e &&
		st(t).P_ &&
		(await (async function (r, i) {
			if (
				(function (o) {
					return hv(o) && o !== p.ABORTED;
				})(i.code)
			) {
				const s = r.D_.shift();
				st(r).Zo(), await jh(r, () => r.remoteSyncer.rejectFailedWrite(s.batchId, i)), await Vi(r);
			}
		})(t, e)),
		qh(t) && $h(t);
}
async function kc(t, e) {
	const n = P(t);
	n.asyncQueue.verifyOperationInProgress(),
		g('RemoteStore', 'RemoteStore received new credentials');
	const r = bt(n);
	n.v_.add(3),
		await cr(n),
		r && n.x_.set('Unknown'),
		await n.remoteSyncer.handleCredentialChange(e),
		n.v_.delete(3),
		await Ni(n);
}
async function IE(t, e) {
	const n = P(t);
	e ? (n.v_.delete(2), await Ni(n)) : e || (n.v_.add(2), await cr(n), n.x_.set('Unknown'));
}
function an(t) {
	return (
		t.N_ ||
			((t.N_ = (function (n, r, i) {
				const s = P(n);
				return (
					s.R_(), new cE(r, s.connection, s.authCredentials, s.appCheckCredentials, s.serializer, i)
				);
			})(t.datastore, t.asyncQueue, {
				Po: fE.bind(null, t),
				To: pE.bind(null, t),
				u_: mE.bind(null, t)
			})),
			t.F_.push(async (e) => {
				e ? (t.N_.Zo(), Go(t) ? Wo(t) : t.x_.set('Unknown')) : (await t.N_.stop(), Bh(t));
			})),
		t.N_
	);
}
function st(t) {
	return (
		t.B_ ||
			((t.B_ = (function (n, r, i) {
				const s = P(n);
				return (
					s.R_(), new uE(r, s.connection, s.authCredentials, s.appCheckCredentials, s.serializer, i)
				);
			})(t.datastore, t.asyncQueue, {
				Po: yE.bind(null, t),
				To: TE.bind(null, t),
				E_: vE.bind(null, t),
				T_: EE.bind(null, t)
			})),
			t.F_.push(async (e) => {
				e
					? (t.B_.Zo(), await Vi(t))
					: (await t.B_.stop(),
						t.D_.length > 0 &&
							(g('RemoteStore', `Stopping write stream with ${t.D_.length} pending writes`),
							(t.D_ = [])));
			})),
		t.B_
	);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ko {
	constructor(e, n, r, i, s) {
		(this.asyncQueue = e),
			(this.timerId = n),
			(this.targetTimeMs = r),
			(this.op = i),
			(this.removalCallback = s),
			(this.deferred = new De()),
			(this.then = this.deferred.promise.then.bind(this.deferred.promise)),
			this.deferred.promise.catch((o) => {});
	}
	get promise() {
		return this.deferred.promise;
	}
	static createAndSchedule(e, n, r, i, s) {
		const o = Date.now() + r,
			a = new Ko(e, n, o, i, s);
		return a.start(r), a;
	}
	start(e) {
		this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
	}
	skipDelay() {
		return this.handleDelayElapsed();
	}
	cancel(e) {
		this.timerHandle !== null &&
			(this.clearTimeout(),
			this.deferred.reject(new y(p.CANCELLED, 'Operation cancelled' + (e ? ': ' + e : ''))));
	}
	handleDelayElapsed() {
		this.asyncQueue.enqueueAndForget(() =>
			this.timerHandle !== null
				? (this.clearTimeout(), this.op().then((e) => this.deferred.resolve(e)))
				: Promise.resolve()
		);
	}
	clearTimeout() {
		this.timerHandle !== null &&
			(this.removalCallback(this), clearTimeout(this.timerHandle), (this.timerHandle = null));
	}
}
function Qo(t, e) {
	if ((Le('AsyncQueue', `${e}: ${t}`), ir(t))) return new y(p.UNAVAILABLE, `${e}: ${t}`);
	throw t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qt {
	constructor(e) {
		(this.comparator = e
			? (n, r) => e(n, r) || T.comparator(n.key, r.key)
			: (n, r) => T.comparator(n.key, r.key)),
			(this.keyedMap = _n()),
			(this.sortedSet = new j(this.comparator));
	}
	static emptySet(e) {
		return new qt(e.comparator);
	}
	has(e) {
		return this.keyedMap.get(e) != null;
	}
	get(e) {
		return this.keyedMap.get(e);
	}
	first() {
		return this.sortedSet.minKey();
	}
	last() {
		return this.sortedSet.maxKey();
	}
	isEmpty() {
		return this.sortedSet.isEmpty();
	}
	indexOf(e) {
		const n = this.keyedMap.get(e);
		return n ? this.sortedSet.indexOf(n) : -1;
	}
	get size() {
		return this.sortedSet.size;
	}
	forEach(e) {
		this.sortedSet.inorderTraversal((n, r) => (e(n), !1));
	}
	add(e) {
		const n = this.delete(e.key);
		return n.copy(n.keyedMap.insert(e.key, e), n.sortedSet.insert(e, null));
	}
	delete(e) {
		const n = this.get(e);
		return n ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(n)) : this;
	}
	isEqual(e) {
		if (!(e instanceof qt) || this.size !== e.size) return !1;
		const n = this.sortedSet.getIterator(),
			r = e.sortedSet.getIterator();
		for (; n.hasNext(); ) {
			const i = n.getNext().key,
				s = r.getNext().key;
			if (!i.isEqual(s)) return !1;
		}
		return !0;
	}
	toString() {
		const e = [];
		return (
			this.forEach((n) => {
				e.push(n.toString());
			}),
			e.length === 0
				? 'DocumentSet ()'
				: `DocumentSet (
  ` +
					e.join(`  
`) +
					`
)`
		);
	}
	copy(e, n) {
		const r = new qt();
		return (r.comparator = this.comparator), (r.keyedMap = e), (r.sortedSet = n), r;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Dc {
	constructor() {
		this.L_ = new j(T.comparator);
	}
	track(e) {
		const n = e.doc.key,
			r = this.L_.get(n);
		r
			? e.type !== 0 && r.type === 3
				? (this.L_ = this.L_.insert(n, e))
				: e.type === 3 && r.type !== 1
					? (this.L_ = this.L_.insert(n, { type: r.type, doc: e.doc }))
					: e.type === 2 && r.type === 2
						? (this.L_ = this.L_.insert(n, { type: 2, doc: e.doc }))
						: e.type === 2 && r.type === 0
							? (this.L_ = this.L_.insert(n, { type: 0, doc: e.doc }))
							: e.type === 1 && r.type === 0
								? (this.L_ = this.L_.remove(n))
								: e.type === 1 && r.type === 2
									? (this.L_ = this.L_.insert(n, { type: 1, doc: r.doc }))
									: e.type === 0 && r.type === 1
										? (this.L_ = this.L_.insert(n, { type: 2, doc: e.doc }))
										: w()
			: (this.L_ = this.L_.insert(n, e));
	}
	k_() {
		const e = [];
		return (
			this.L_.inorderTraversal((n, r) => {
				e.push(r);
			}),
			e
		);
	}
}
class Zt {
	constructor(e, n, r, i, s, o, a, c, u) {
		(this.query = e),
			(this.docs = n),
			(this.oldDocs = r),
			(this.docChanges = i),
			(this.mutatedKeys = s),
			(this.fromCache = o),
			(this.syncStateChanged = a),
			(this.excludesMetadataChanges = c),
			(this.hasCachedResults = u);
	}
	static fromInitialDocuments(e, n, r, i, s) {
		const o = [];
		return (
			n.forEach((a) => {
				o.push({ type: 0, doc: a });
			}),
			new Zt(e, n, qt.emptySet(n), o, r, i, !0, !1, s)
		);
	}
	get hasPendingWrites() {
		return !this.mutatedKeys.isEmpty();
	}
	isEqual(e) {
		if (
			!(
				this.fromCache === e.fromCache &&
				this.hasCachedResults === e.hasCachedResults &&
				this.syncStateChanged === e.syncStateChanged &&
				this.mutatedKeys.isEqual(e.mutatedKeys) &&
				Si(this.query, e.query) &&
				this.docs.isEqual(e.docs) &&
				this.oldDocs.isEqual(e.oldDocs)
			)
		)
			return !1;
		const n = this.docChanges,
			r = e.docChanges;
		if (n.length !== r.length) return !1;
		for (let i = 0; i < n.length; i++)
			if (n[i].type !== r[i].type || !n[i].doc.isEqual(r[i].doc)) return !1;
		return !0;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class wE {
	constructor() {
		(this.q_ = void 0), (this.Q_ = []);
	}
}
class AE {
	constructor() {
		(this.queries = new on((e) => lh(e), Si)),
			(this.onlineState = 'Unknown'),
			(this.K_ = new Set());
	}
}
async function Xo(t, e) {
	const n = P(t),
		r = e.query;
	let i = !1,
		s = n.queries.get(r);
	if ((s || ((i = !0), (s = new wE())), i))
		try {
			s.q_ = await n.onListen(r);
		} catch (o) {
			const a = Qo(o, `Initialization of query '${Ot(e.query)}' failed`);
			return void e.onError(a);
		}
	n.queries.set(r, s), s.Q_.push(e), e.U_(n.onlineState), s.q_ && e.W_(s.q_) && Yo(n);
}
async function Jo(t, e) {
	const n = P(t),
		r = e.query;
	let i = !1;
	const s = n.queries.get(r);
	if (s) {
		const o = s.Q_.indexOf(e);
		o >= 0 && (s.Q_.splice(o, 1), (i = s.Q_.length === 0));
	}
	if (i) return n.queries.delete(r), n.onUnlisten(r);
}
function RE(t, e) {
	const n = P(t);
	let r = !1;
	for (const i of e) {
		const s = i.query,
			o = n.queries.get(s);
		if (o) {
			for (const a of o.Q_) a.W_(i) && (r = !0);
			o.q_ = i;
		}
	}
	r && Yo(n);
}
function SE(t, e, n) {
	const r = P(t),
		i = r.queries.get(e);
	if (i) for (const s of i.Q_) s.onError(n);
	r.queries.delete(e);
}
function Yo(t) {
	t.K_.forEach((e) => {
		e.next();
	});
}
class Zo {
	constructor(e, n, r) {
		(this.query = e),
			(this.G_ = n),
			(this.z_ = !1),
			(this.j_ = null),
			(this.onlineState = 'Unknown'),
			(this.options = r || {});
	}
	W_(e) {
		if (!this.options.includeMetadataChanges) {
			const r = [];
			for (const i of e.docChanges) i.type !== 3 && r.push(i);
			e = new Zt(
				e.query,
				e.docs,
				e.oldDocs,
				r,
				e.mutatedKeys,
				e.fromCache,
				e.syncStateChanged,
				!0,
				e.hasCachedResults
			);
		}
		let n = !1;
		return (
			this.z_
				? this.H_(e) && (this.G_.next(e), (n = !0))
				: this.J_(e, this.onlineState) && (this.Y_(e), (n = !0)),
			(this.j_ = e),
			n
		);
	}
	onError(e) {
		this.G_.error(e);
	}
	U_(e) {
		this.onlineState = e;
		let n = !1;
		return this.j_ && !this.z_ && this.J_(this.j_, e) && (this.Y_(this.j_), (n = !0)), n;
	}
	J_(e, n) {
		if (!e.fromCache) return !0;
		const r = n !== 'Offline';
		return (!this.options.Z_ || !r) && (!e.docs.isEmpty() || e.hasCachedResults || n === 'Offline');
	}
	H_(e) {
		if (e.docChanges.length > 0) return !0;
		const n = this.j_ && this.j_.hasPendingWrites !== e.hasPendingWrites;
		return !(!e.syncStateChanged && !n) && this.options.includeMetadataChanges === !0;
	}
	Y_(e) {
		(e = Zt.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults)),
			(this.z_ = !0),
			this.G_.next(e);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zh {
	constructor(e) {
		this.key = e;
	}
}
class Hh {
	constructor(e) {
		this.key = e;
	}
}
class PE {
	constructor(e, n) {
		(this.query = e),
			(this.oa = n),
			(this._a = null),
			(this.hasCachedResults = !1),
			(this.current = !1),
			(this.aa = C()),
			(this.mutatedKeys = C()),
			(this.ua = hh(e)),
			(this.ca = new qt(this.ua));
	}
	get la() {
		return this.oa;
	}
	ha(e, n) {
		const r = n ? n.Pa : new Dc(),
			i = n ? n.ca : this.ca;
		let s = n ? n.mutatedKeys : this.mutatedKeys,
			o = i,
			a = !1;
		const c = this.query.limitType === 'F' && i.size === this.query.limit ? i.last() : null,
			u = this.query.limitType === 'L' && i.size === this.query.limit ? i.first() : null;
		if (
			(e.inorderTraversal((l, h) => {
				const d = i.get(l),
					f = Pi(this.query, h) ? h : null,
					E = !!d && this.mutatedKeys.has(d.key),
					I =
						!!f &&
						(f.hasLocalMutations || (this.mutatedKeys.has(f.key) && f.hasCommittedMutations));
				let v = !1;
				d && f
					? d.data.isEqual(f.data)
						? E !== I && (r.track({ type: 3, doc: f }), (v = !0))
						: this.Ia(d, f) ||
							(r.track({ type: 2, doc: f }),
							(v = !0),
							((c && this.ua(f, c) > 0) || (u && this.ua(f, u) < 0)) && (a = !0))
					: !d && f
						? (r.track({ type: 0, doc: f }), (v = !0))
						: d && !f && (r.track({ type: 1, doc: d }), (v = !0), (c || u) && (a = !0)),
					v &&
						(f
							? ((o = o.add(f)), (s = I ? s.add(l) : s.delete(l)))
							: ((o = o.delete(l)), (s = s.delete(l))));
			}),
			this.query.limit !== null)
		)
			for (; o.size > this.query.limit; ) {
				const l = this.query.limitType === 'F' ? o.last() : o.first();
				(o = o.delete(l.key)), (s = s.delete(l.key)), r.track({ type: 1, doc: l });
			}
		return { ca: o, Pa: r, Xi: a, mutatedKeys: s };
	}
	Ia(e, n) {
		return e.hasLocalMutations && n.hasCommittedMutations && !n.hasLocalMutations;
	}
	applyChanges(e, n, r, i) {
		const s = this.ca;
		(this.ca = e.ca), (this.mutatedKeys = e.mutatedKeys);
		const o = e.Pa.k_();
		o.sort(
			(l, h) =>
				(function (f, E) {
					const I = (v) => {
						switch (v) {
							case 0:
								return 1;
							case 2:
							case 3:
								return 2;
							case 1:
								return 0;
							default:
								return w();
						}
					};
					return I(f) - I(E);
				})(l.type, h.type) || this.ua(l.doc, h.doc)
		),
			this.Ta(r),
			(i = i != null && i);
		const a = n && !i ? this.Ea() : [],
			c = this.aa.size === 0 && this.current && !i ? 1 : 0,
			u = c !== this._a;
		return (
			(this._a = c),
			o.length !== 0 || u
				? {
						snapshot: new Zt(
							this.query,
							e.ca,
							s,
							o,
							e.mutatedKeys,
							c === 0,
							u,
							!1,
							!!r && r.resumeToken.approximateByteSize() > 0
						),
						da: a
					}
				: { da: a }
		);
	}
	U_(e) {
		return this.current && e === 'Offline'
			? ((this.current = !1),
				this.applyChanges({ ca: this.ca, Pa: new Dc(), mutatedKeys: this.mutatedKeys, Xi: !1 }, !1))
			: { da: [] };
	}
	Aa(e) {
		return !this.oa.has(e) && !!this.ca.has(e) && !this.ca.get(e).hasLocalMutations;
	}
	Ta(e) {
		e &&
			(e.addedDocuments.forEach((n) => (this.oa = this.oa.add(n))),
			e.modifiedDocuments.forEach((n) => {}),
			e.removedDocuments.forEach((n) => (this.oa = this.oa.delete(n))),
			(this.current = e.current));
	}
	Ea() {
		if (!this.current) return [];
		const e = this.aa;
		(this.aa = C()),
			this.ca.forEach((r) => {
				this.Aa(r.key) && (this.aa = this.aa.add(r.key));
			});
		const n = [];
		return (
			e.forEach((r) => {
				this.aa.has(r) || n.push(new Hh(r));
			}),
			this.aa.forEach((r) => {
				e.has(r) || n.push(new zh(r));
			}),
			n
		);
	}
	Ra(e) {
		(this.oa = e.hs), (this.aa = C());
		const n = this.ha(e.documents);
		return this.applyChanges(n, !0);
	}
	Va() {
		return Zt.fromInitialDocuments(
			this.query,
			this.ca,
			this.mutatedKeys,
			this._a === 0,
			this.hasCachedResults
		);
	}
}
class CE {
	constructor(e, n, r) {
		(this.query = e), (this.targetId = n), (this.view = r);
	}
}
class bE {
	constructor(e) {
		(this.key = e), (this.ma = !1);
	}
}
class kE {
	constructor(e, n, r, i, s, o) {
		(this.localStore = e),
			(this.remoteStore = n),
			(this.eventManager = r),
			(this.sharedClientState = i),
			(this.currentUser = s),
			(this.maxConcurrentLimboResolutions = o),
			(this.fa = {}),
			(this.ga = new on((a) => lh(a), Si)),
			(this.pa = new Map()),
			(this.ya = new Set()),
			(this.wa = new j(T.comparator)),
			(this.Sa = new Map()),
			(this.ba = new qo()),
			(this.Da = {}),
			(this.Ca = new Map()),
			(this.va = Yt.Bn()),
			(this.onlineState = 'Unknown'),
			(this.Fa = void 0);
	}
	get isPrimaryClient() {
		return this.Fa === !0;
	}
}
async function DE(t, e) {
	const n = jE(t);
	let r, i;
	const s = n.ga.get(e);
	if (s) (r = s.targetId), n.sharedClientState.addLocalQueryTarget(r), (i = s.view.Va());
	else {
		const o = await tE(n.localStore, Ne(e)),
			a = n.sharedClientState.addLocalQueryTarget(o.targetId);
		(r = o.targetId),
			(i = await NE(n, e, r, a === 'current', o.resumeToken)),
			n.isPrimaryClient && xh(n.remoteStore, o);
	}
	return i;
}
async function NE(t, e, n, r, i) {
	t.Ma = (h, d, f) =>
		(async function (I, v, k, O) {
			let L = v.view.ha(k);
			L.Xi &&
				(L = await Pc(I.localStore, v.query, !1).then(({ documents: Ue }) => v.view.ha(Ue, L)));
			const M = O && O.targetChanges.get(v.targetId),
				Ee = O && O.targetMismatches.get(v.targetId) != null,
				fe = v.view.applyChanges(L, I.isPrimaryClient, M, Ee);
			return Vc(I, v.targetId, fe.da), fe.snapshot;
		})(t, h, d, f);
	const s = await Pc(t.localStore, e, !0),
		o = new PE(e, s.hs),
		a = o.ha(s.documents),
		c = ar.createSynthesizedTargetChangeForCurrentChange(n, r && t.onlineState !== 'Offline', i),
		u = o.applyChanges(a, t.isPrimaryClient, c);
	Vc(t, n, u.da);
	const l = new CE(e, n, o);
	return t.ga.set(e, l), t.pa.has(n) ? t.pa.get(n).push(e) : t.pa.set(n, [e]), u.snapshot;
}
async function VE(t, e) {
	const n = P(t),
		r = n.ga.get(e),
		i = n.pa.get(r.targetId);
	if (i.length > 1)
		return (
			n.pa.set(
				r.targetId,
				i.filter((s) => !Si(s, e))
			),
			void n.ga.delete(e)
		);
	n.isPrimaryClient
		? (n.sharedClientState.removeLocalQueryTarget(r.targetId),
			n.sharedClientState.isActiveQueryTarget(r.targetId) ||
				(await xs(n.localStore, r.targetId, !1)
					.then(() => {
						n.sharedClientState.clearQueryState(r.targetId),
							Uh(n.remoteStore, r.targetId),
							Us(n, r.targetId);
					})
					.catch(rr)))
		: (Us(n, r.targetId), await xs(n.localStore, r.targetId, !0));
}
async function OE(t, e, n) {
	const r = qE(t);
	try {
		const i = await (function (o, a) {
			const c = P(o),
				u = Q.now(),
				l = a.reduce((f, E) => f.add(E.key), C());
			let h, d;
			return c.persistence
				.runTransaction('Locally write mutations', 'readwrite', (f) => {
					let E = ze(),
						I = C();
					return c.os
						.getEntries(f, l)
						.next((v) => {
							(E = v),
								E.forEach((k, O) => {
									O.isValidDocument() || (I = I.add(k));
								});
						})
						.next(() => c.localDocuments.getOverlayedDocuments(f, E))
						.next((v) => {
							h = v;
							const k = [];
							for (const O of a) {
								const L = ov(O, h.get(O.key).overlayedDocument);
								L != null && k.push(new ct(O.key, L, nh(L.value.mapValue), me.exists(!0)));
							}
							return c.mutationQueue.addMutationBatch(f, u, k, a);
						})
						.next((v) => {
							d = v;
							const k = v.applyToLocalDocumentSet(h, I);
							return c.documentOverlayCache.saveOverlays(f, v.batchId, k);
						});
				})
				.then(() => ({ batchId: d.batchId, changes: fh(h) }));
		})(r.localStore, e);
		r.sharedClientState.addPendingMutation(i.batchId),
			(function (o, a, c) {
				let u = o.Da[o.currentUser.toKey()];
				u || (u = new j(N)), (u = u.insert(a, c)), (o.Da[o.currentUser.toKey()] = u);
			})(r, i.batchId, n),
			await ur(r, i.changes),
			await Vi(r.remoteStore);
	} catch (i) {
		const s = Qo(i, 'Failed to persist write');
		n.reject(s);
	}
}
async function Wh(t, e) {
	const n = P(t);
	try {
		const r = await Yv(n.localStore, e);
		e.targetChanges.forEach((i, s) => {
			const o = n.Sa.get(s);
			o &&
				(x(i.addedDocuments.size + i.modifiedDocuments.size + i.removedDocuments.size <= 1),
				i.addedDocuments.size > 0
					? (o.ma = !0)
					: i.modifiedDocuments.size > 0
						? x(o.ma)
						: i.removedDocuments.size > 0 && (x(o.ma), (o.ma = !1)));
		}),
			await ur(n, r, e);
	} catch (r) {
		await rr(r);
	}
}
function Nc(t, e, n) {
	const r = P(t);
	if ((r.isPrimaryClient && n === 0) || (!r.isPrimaryClient && n === 1)) {
		const i = [];
		r.ga.forEach((s, o) => {
			const a = o.view.U_(e);
			a.snapshot && i.push(a.snapshot);
		}),
			(function (o, a) {
				const c = P(o);
				c.onlineState = a;
				let u = !1;
				c.queries.forEach((l, h) => {
					for (const d of h.Q_) d.U_(a) && (u = !0);
				}),
					u && Yo(c);
			})(r.eventManager, e),
			i.length && r.fa.u_(i),
			(r.onlineState = e),
			r.isPrimaryClient && r.sharedClientState.setOnlineState(e);
	}
}
async function LE(t, e, n) {
	const r = P(t);
	r.sharedClientState.updateQueryState(e, 'rejected', n);
	const i = r.Sa.get(e),
		s = i && i.key;
	if (s) {
		let o = new j(T.comparator);
		o = o.insert(s, oe.newNoDocument(s, R.min()));
		const a = C().add(s),
			c = new ki(R.min(), new Map(), new j(N), o, a);
		await Wh(r, c), (r.wa = r.wa.remove(s)), r.Sa.delete(e), ea(r);
	} else
		await xs(r.localStore, e, !1)
			.then(() => Us(r, e, n))
			.catch(rr);
}
async function ME(t, e) {
	const n = P(t),
		r = e.batch.batchId;
	try {
		const i = await Jv(n.localStore, e);
		Kh(n, r, null),
			Gh(n, r),
			n.sharedClientState.updateMutationState(r, 'acknowledged'),
			await ur(n, i);
	} catch (i) {
		await rr(i);
	}
}
async function xE(t, e, n) {
	const r = P(t);
	try {
		const i = await (function (o, a) {
			const c = P(o);
			return c.persistence.runTransaction('Reject batch', 'readwrite-primary', (u) => {
				let l;
				return c.mutationQueue
					.lookupMutationBatch(u, a)
					.next((h) => (x(h !== null), (l = h.keys()), c.mutationQueue.removeMutationBatch(u, h)))
					.next(() => c.mutationQueue.performConsistencyCheck(u))
					.next(() => c.documentOverlayCache.removeOverlaysForBatchId(u, l, a))
					.next(() => c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u, l))
					.next(() => c.localDocuments.getDocuments(u, l));
			});
		})(r.localStore, e);
		Kh(r, e, n),
			Gh(r, e),
			r.sharedClientState.updateMutationState(e, 'rejected', n),
			await ur(r, i);
	} catch (i) {
		await rr(i);
	}
}
function Gh(t, e) {
	(t.Ca.get(e) || []).forEach((n) => {
		n.resolve();
	}),
		t.Ca.delete(e);
}
function Kh(t, e, n) {
	const r = P(t);
	let i = r.Da[r.currentUser.toKey()];
	if (i) {
		const s = i.get(e);
		s && (n ? s.reject(n) : s.resolve(), (i = i.remove(e))), (r.Da[r.currentUser.toKey()] = i);
	}
}
function Us(t, e, n = null) {
	t.sharedClientState.removeLocalQueryTarget(e);
	for (const r of t.pa.get(e)) t.ga.delete(r), n && t.fa.xa(r, n);
	t.pa.delete(e),
		t.isPrimaryClient &&
			t.ba.Vr(e).forEach((r) => {
				t.ba.containsKey(r) || Qh(t, r);
			});
}
function Qh(t, e) {
	t.ya.delete(e.path.canonicalString());
	const n = t.wa.get(e);
	n !== null && (Uh(t.remoteStore, n), (t.wa = t.wa.remove(e)), t.Sa.delete(n), ea(t));
}
function Vc(t, e, n) {
	for (const r of n)
		r instanceof zh
			? (t.ba.addReference(r.key, e), UE(t, r))
			: r instanceof Hh
				? (g('SyncEngine', 'Document no longer in limbo: ' + r.key),
					t.ba.removeReference(r.key, e),
					t.ba.containsKey(r.key) || Qh(t, r.key))
				: w();
}
function UE(t, e) {
	const n = e.key,
		r = n.path.canonicalString();
	t.wa.get(n) ||
		t.ya.has(r) ||
		(g('SyncEngine', 'New document in limbo: ' + n), t.ya.add(r), ea(t));
}
function ea(t) {
	for (; t.ya.size > 0 && t.wa.size < t.maxConcurrentLimboResolutions; ) {
		const e = t.ya.values().next().value;
		t.ya.delete(e);
		const n = new T(F.fromString(e)),
			r = t.va.next();
		t.Sa.set(r, new bE(n)),
			(t.wa = t.wa.insert(n, r)),
			xh(t.remoteStore, new Ye(Ne(Ri(n.path)), r, 'TargetPurposeLimboResolution', Do._e));
	}
}
async function ur(t, e, n) {
	const r = P(t),
		i = [],
		s = [],
		o = [];
	r.ga.isEmpty() ||
		(r.ga.forEach((a, c) => {
			o.push(
				r.Ma(c, e, n).then((u) => {
					if (
						((u || n) &&
							r.isPrimaryClient &&
							r.sharedClientState.updateQueryState(
								c.targetId,
								u != null && u.fromCache ? 'not-current' : 'current'
							),
						u)
					) {
						i.push(u);
						const l = zo.Ki(c.targetId, u);
						s.push(l);
					}
				})
			);
		}),
		await Promise.all(o),
		r.fa.u_(i),
		await (async function (c, u) {
			const l = P(c);
			try {
				await l.persistence.runTransaction('notifyLocalViewChanges', 'readwrite', (h) =>
					m.forEach(u, (d) =>
						m
							.forEach(d.qi, (f) => l.persistence.referenceDelegate.addReference(h, d.targetId, f))
							.next(() =>
								m.forEach(d.Qi, (f) =>
									l.persistence.referenceDelegate.removeReference(h, d.targetId, f)
								)
							)
					)
				);
			} catch (h) {
				if (!ir(h)) throw h;
				g('LocalStore', 'Failed to update sequence numbers: ' + h);
			}
			for (const h of u) {
				const d = h.targetId;
				if (!h.fromCache) {
					const f = l.ns.get(d),
						E = f.snapshotVersion,
						I = f.withLastLimboFreeSnapshotVersion(E);
					l.ns = l.ns.insert(d, I);
				}
			}
		})(r.localStore, s));
}
async function FE(t, e) {
	const n = P(t);
	if (!n.currentUser.isEqual(e)) {
		g('SyncEngine', 'User change. New user:', e.toKey());
		const r = await Vh(n.localStore, e);
		(n.currentUser = e),
			(function (s, o) {
				s.Ca.forEach((a) => {
					a.forEach((c) => {
						c.reject(new y(p.CANCELLED, o));
					});
				}),
					s.Ca.clear();
			})(n, "'waitForPendingWrites' promise is rejected due to a user change."),
			n.sharedClientState.handleUserChange(e, r.removedBatchIds, r.addedBatchIds),
			await ur(n, r.us);
	}
}
function BE(t, e) {
	const n = P(t),
		r = n.Sa.get(e);
	if (r && r.ma) return C().add(r.key);
	{
		let i = C();
		const s = n.pa.get(e);
		if (!s) return i;
		for (const o of s) {
			const a = n.ga.get(o);
			i = i.unionWith(a.view.la);
		}
		return i;
	}
}
function jE(t) {
	const e = P(t);
	return (
		(e.remoteStore.remoteSyncer.applyRemoteEvent = Wh.bind(null, e)),
		(e.remoteStore.remoteSyncer.getRemoteKeysForTarget = BE.bind(null, e)),
		(e.remoteStore.remoteSyncer.rejectListen = LE.bind(null, e)),
		(e.fa.u_ = RE.bind(null, e.eventManager)),
		(e.fa.xa = SE.bind(null, e.eventManager)),
		e
	);
}
function qE(t) {
	const e = P(t);
	return (
		(e.remoteStore.remoteSyncer.applySuccessfulWrite = ME.bind(null, e)),
		(e.remoteStore.remoteSyncer.rejectFailedWrite = xE.bind(null, e)),
		e
	);
}
class Oc {
	constructor() {
		this.synchronizeTabs = !1;
	}
	async initialize(e) {
		(this.serializer = Di(e.databaseInfo.databaseId)),
			(this.sharedClientState = this.createSharedClientState(e)),
			(this.persistence = this.createPersistence(e)),
			await this.persistence.start(),
			(this.localStore = this.createLocalStore(e)),
			(this.gcScheduler = this.createGarbageCollectionScheduler(e, this.localStore)),
			(this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(e, this.localStore));
	}
	createGarbageCollectionScheduler(e, n) {
		return null;
	}
	createIndexBackfillerScheduler(e, n) {
		return null;
	}
	createLocalStore(e) {
		return Xv(this.persistence, new Kv(), e.initialUser, this.serializer);
	}
	createPersistence(e) {
		return new Hv($o.Hr, this.serializer);
	}
	createSharedClientState(e) {
		return new rE();
	}
	async terminate() {
		var e, n;
		(e = this.gcScheduler) === null || e === void 0 || e.stop(),
			(n = this.indexBackfillerScheduler) === null || n === void 0 || n.stop(),
			this.sharedClientState.shutdown(),
			await this.persistence.shutdown();
	}
}
class $E {
	async initialize(e, n) {
		this.localStore ||
			((this.localStore = e.localStore),
			(this.sharedClientState = e.sharedClientState),
			(this.datastore = this.createDatastore(n)),
			(this.remoteStore = this.createRemoteStore(n)),
			(this.eventManager = this.createEventManager(n)),
			(this.syncEngine = this.createSyncEngine(n, !e.synchronizeTabs)),
			(this.sharedClientState.onlineStateHandler = (r) => Nc(this.syncEngine, r, 1)),
			(this.remoteStore.remoteSyncer.handleCredentialChange = FE.bind(null, this.syncEngine)),
			await IE(this.remoteStore, this.syncEngine.isPrimaryClient));
	}
	createEventManager(e) {
		return (function () {
			return new AE();
		})();
	}
	createDatastore(e) {
		const n = Di(e.databaseInfo.databaseId),
			r = (function (s) {
				return new aE(s);
			})(e.databaseInfo);
		return (function (s, o, a, c) {
			return new lE(s, o, a, c);
		})(e.authCredentials, e.appCheckCredentials, r, n);
	}
	createRemoteStore(e) {
		return (function (r, i, s, o, a) {
			return new dE(r, i, s, o, a);
		})(
			this.localStore,
			this.datastore,
			e.asyncQueue,
			(n) => Nc(this.syncEngine, n, 0),
			(function () {
				return bc.D() ? new bc() : new iE();
			})()
		);
	}
	createSyncEngine(e, n) {
		return (function (i, s, o, a, c, u, l) {
			const h = new kE(i, s, o, a, c, u);
			return l && (h.Fa = !0), h;
		})(
			this.localStore,
			this.remoteStore,
			this.eventManager,
			this.sharedClientState,
			e.initialUser,
			e.maxConcurrentLimboResolutions,
			n
		);
	}
	async terminate() {
		var e;
		await (async function (r) {
			const i = P(r);
			g('RemoteStore', 'RemoteStore shutting down.'),
				i.v_.add(5),
				await cr(i),
				i.M_.shutdown(),
				i.x_.set('Unknown');
		})(this.remoteStore),
			(e = this.datastore) === null || e === void 0 || e.terminate();
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ta {
	constructor(e) {
		(this.observer = e), (this.muted = !1);
	}
	next(e) {
		this.observer.next && this.Ba(this.observer.next, e);
	}
	error(e) {
		this.observer.error
			? this.Ba(this.observer.error, e)
			: Le('Uncaught Error in snapshot listener:', e.toString());
	}
	La() {
		this.muted = !0;
	}
	Ba(e, n) {
		this.muted ||
			setTimeout(() => {
				this.muted || e(n);
			}, 0);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zE {
	constructor(e, n, r, i) {
		(this.authCredentials = e),
			(this.appCheckCredentials = n),
			(this.asyncQueue = r),
			(this.databaseInfo = i),
			(this.user = se.UNAUTHENTICATED),
			(this.clientId = Zl.newId()),
			(this.authCredentialListener = () => Promise.resolve()),
			(this.appCheckCredentialListener = () => Promise.resolve()),
			this.authCredentials.start(r, async (s) => {
				g('FirestoreClient', 'Received user=', s.uid),
					await this.authCredentialListener(s),
					(this.user = s);
			}),
			this.appCheckCredentials.start(
				r,
				(s) => (
					g('FirestoreClient', 'Received new app check token=', s),
					this.appCheckCredentialListener(s, this.user)
				)
			);
	}
	get configuration() {
		return {
			asyncQueue: this.asyncQueue,
			databaseInfo: this.databaseInfo,
			clientId: this.clientId,
			authCredentials: this.authCredentials,
			appCheckCredentials: this.appCheckCredentials,
			initialUser: this.user,
			maxConcurrentLimboResolutions: 100
		};
	}
	setCredentialChangeListener(e) {
		this.authCredentialListener = e;
	}
	setAppCheckTokenChangeListener(e) {
		this.appCheckCredentialListener = e;
	}
	verifyNotTerminated() {
		if (this.asyncQueue.isShuttingDown)
			throw new y(p.FAILED_PRECONDITION, 'The client has already been terminated.');
	}
	terminate() {
		this.asyncQueue.enterRestrictedMode();
		const e = new De();
		return (
			this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
				try {
					this._onlineComponents && (await this._onlineComponents.terminate()),
						this._offlineComponents && (await this._offlineComponents.terminate()),
						this.authCredentials.shutdown(),
						this.appCheckCredentials.shutdown(),
						e.resolve();
				} catch (n) {
					const r = Qo(n, 'Failed to shutdown persistence');
					e.reject(r);
				}
			}),
			e.promise
		);
	}
}
async function ss(t, e) {
	t.asyncQueue.verifyOperationInProgress(),
		g('FirestoreClient', 'Initializing OfflineComponentProvider');
	const n = t.configuration;
	await e.initialize(n);
	let r = n.initialUser;
	t.setCredentialChangeListener(async (i) => {
		r.isEqual(i) || (await Vh(e.localStore, i), (r = i));
	}),
		e.persistence.setDatabaseDeletedListener(() => t.terminate()),
		(t._offlineComponents = e);
}
async function Lc(t, e) {
	t.asyncQueue.verifyOperationInProgress();
	const n = await WE(t);
	g('FirestoreClient', 'Initializing OnlineComponentProvider'),
		await e.initialize(n, t.configuration),
		t.setCredentialChangeListener((r) => kc(e.remoteStore, r)),
		t.setAppCheckTokenChangeListener((r, i) => kc(e.remoteStore, i)),
		(t._onlineComponents = e);
}
function HE(t) {
	return t.name === 'FirebaseError'
		? t.code === p.FAILED_PRECONDITION || t.code === p.UNIMPLEMENTED
		: !(typeof DOMException < 'u' && t instanceof DOMException) ||
				t.code === 22 ||
				t.code === 20 ||
				t.code === 11;
}
async function WE(t) {
	if (!t._offlineComponents)
		if (t._uninitializedComponentsProvider) {
			g('FirestoreClient', 'Using user provided OfflineComponentProvider');
			try {
				await ss(t, t._uninitializedComponentsProvider._offline);
			} catch (e) {
				const n = e;
				if (!HE(n)) throw n;
				Wt('Error using user provided cache. Falling back to memory cache: ' + n),
					await ss(t, new Oc());
			}
		} else g('FirestoreClient', 'Using default OfflineComponentProvider'), await ss(t, new Oc());
	return t._offlineComponents;
}
async function Xh(t) {
	return (
		t._onlineComponents ||
			(t._uninitializedComponentsProvider
				? (g('FirestoreClient', 'Using user provided OnlineComponentProvider'),
					await Lc(t, t._uninitializedComponentsProvider._online))
				: (g('FirestoreClient', 'Using default OnlineComponentProvider'), await Lc(t, new $E()))),
		t._onlineComponents
	);
}
function GE(t) {
	return Xh(t).then((e) => e.syncEngine);
}
async function Zr(t) {
	const e = await Xh(t),
		n = e.eventManager;
	return (
		(n.onListen = DE.bind(null, e.syncEngine)), (n.onUnlisten = VE.bind(null, e.syncEngine)), n
	);
}
function KE(t, e, n = {}) {
	const r = new De();
	return (
		t.asyncQueue.enqueueAndForget(async () =>
			(function (s, o, a, c, u) {
				const l = new ta({
						next: (d) => {
							o.enqueueAndForget(() => Jo(s, h));
							const f = d.docs.has(a);
							!f && d.fromCache
								? u.reject(
										new y(p.UNAVAILABLE, 'Failed to get document because the client is offline.')
									)
								: f && d.fromCache && c && c.source === 'server'
									? u.reject(
											new y(
												p.UNAVAILABLE,
												'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
											)
										)
									: u.resolve(d);
						},
						error: (d) => u.reject(d)
					}),
					h = new Zo(Ri(a.path), l, { includeMetadataChanges: !0, Z_: !0 });
				return Xo(s, h);
			})(await Zr(t), t.asyncQueue, e, n, r)
		),
		r.promise
	);
}
function QE(t, e, n = {}) {
	const r = new De();
	return (
		t.asyncQueue.enqueueAndForget(async () =>
			(function (s, o, a, c, u) {
				const l = new ta({
						next: (d) => {
							o.enqueueAndForget(() => Jo(s, h)),
								d.fromCache && c.source === 'server'
									? u.reject(
											new y(
												p.UNAVAILABLE,
												'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
											)
										)
									: u.resolve(d);
						},
						error: (d) => u.reject(d)
					}),
					h = new Zo(a, l, { includeMetadataChanges: !0, Z_: !0 });
				return Xo(s, h);
			})(await Zr(t), t.asyncQueue, e, n, r)
		),
		r.promise
	);
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Jh(t) {
	const e = {};
	return t.timeoutSeconds !== void 0 && (e.timeoutSeconds = t.timeoutSeconds), e;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Mc = new Map();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Yh(t, e, n) {
	if (!n) throw new y(p.INVALID_ARGUMENT, `Function ${t}() cannot be called with an empty ${e}.`);
}
function XE(t, e, n, r) {
	if (e === !0 && r === !0)
		throw new y(p.INVALID_ARGUMENT, `${t} and ${n} cannot be used together.`);
}
function xc(t) {
	if (!T.isDocumentKey(t))
		throw new y(
			p.INVALID_ARGUMENT,
			`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`
		);
}
function Uc(t) {
	if (T.isDocumentKey(t))
		throw new y(
			p.INVALID_ARGUMENT,
			`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`
		);
}
function Oi(t) {
	if (t === void 0) return 'undefined';
	if (t === null) return 'null';
	if (typeof t == 'string')
		return t.length > 20 && (t = `${t.substring(0, 20)}...`), JSON.stringify(t);
	if (typeof t == 'number' || typeof t == 'boolean') return '' + t;
	if (typeof t == 'object') {
		if (t instanceof Array) return 'an array';
		{
			const e = (function (r) {
				return r.constructor ? r.constructor.name : null;
			})(t);
			return e ? `a custom ${e} object` : 'an object';
		}
	}
	return typeof t == 'function' ? 'a function' : w();
}
function ge(t, e) {
	if (('_delegate' in t && (t = t._delegate), !(t instanceof e))) {
		if (e.name === t.constructor.name)
			throw new y(
				p.INVALID_ARGUMENT,
				'Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?'
			);
		{
			const n = Oi(t);
			throw new y(p.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${n}`);
		}
	}
	return t;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fc {
	constructor(e) {
		var n, r;
		if (e.host === void 0) {
			if (e.ssl !== void 0)
				throw new y(p.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
			(this.host = 'firestore.googleapis.com'), (this.ssl = !0);
		} else (this.host = e.host), (this.ssl = (n = e.ssl) === null || n === void 0 || n);
		if (
			((this.credentials = e.credentials),
			(this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
			(this.localCache = e.localCache),
			e.cacheSizeBytes === void 0)
		)
			this.cacheSizeBytes = 41943040;
		else {
			if (e.cacheSizeBytes !== -1 && e.cacheSizeBytes < 1048576)
				throw new y(p.INVALID_ARGUMENT, 'cacheSizeBytes must be at least 1048576');
			this.cacheSizeBytes = e.cacheSizeBytes;
		}
		XE(
			'experimentalForceLongPolling',
			e.experimentalForceLongPolling,
			'experimentalAutoDetectLongPolling',
			e.experimentalAutoDetectLongPolling
		),
			(this.experimentalForceLongPolling = !!e.experimentalForceLongPolling),
			this.experimentalForceLongPolling
				? (this.experimentalAutoDetectLongPolling = !1)
				: e.experimentalAutoDetectLongPolling === void 0
					? (this.experimentalAutoDetectLongPolling = !0)
					: (this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling),
			(this.experimentalLongPollingOptions = Jh(
				(r = e.experimentalLongPollingOptions) !== null && r !== void 0 ? r : {}
			)),
			(function (s) {
				if (s.timeoutSeconds !== void 0) {
					if (isNaN(s.timeoutSeconds))
						throw new y(
							p.INVALID_ARGUMENT,
							`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`
						);
					if (s.timeoutSeconds < 5)
						throw new y(
							p.INVALID_ARGUMENT,
							`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`
						);
					if (s.timeoutSeconds > 30)
						throw new y(
							p.INVALID_ARGUMENT,
							`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`
						);
				}
			})(this.experimentalLongPollingOptions),
			(this.useFetchStreams = !!e.useFetchStreams);
	}
	isEqual(e) {
		return (
			this.host === e.host &&
			this.ssl === e.ssl &&
			this.credentials === e.credentials &&
			this.cacheSizeBytes === e.cacheSizeBytes &&
			this.experimentalForceLongPolling === e.experimentalForceLongPolling &&
			this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling &&
			(function (r, i) {
				return r.timeoutSeconds === i.timeoutSeconds;
			})(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) &&
			this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
			this.useFetchStreams === e.useFetchStreams
		);
	}
}
class Li {
	constructor(e, n, r, i) {
		(this._authCredentials = e),
			(this._appCheckCredentials = n),
			(this._databaseId = r),
			(this._app = i),
			(this.type = 'firestore-lite'),
			(this._persistenceKey = '(lite)'),
			(this._settings = new Fc({})),
			(this._settingsFrozen = !1);
	}
	get app() {
		if (!this._app)
			throw new y(
				p.FAILED_PRECONDITION,
				"Firestore was not initialized using the Firebase SDK. 'app' is not available"
			);
		return this._app;
	}
	get _initialized() {
		return this._settingsFrozen;
	}
	get _terminated() {
		return this._terminateTask !== void 0;
	}
	_setSettings(e) {
		if (this._settingsFrozen)
			throw new y(
				p.FAILED_PRECONDITION,
				'Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.'
			);
		(this._settings = new Fc(e)),
			e.credentials !== void 0 &&
				(this._authCredentials = (function (r) {
					if (!r) return new my();
					switch (r.type) {
						case 'firstParty':
							return new vy(r.sessionIndex || '0', r.iamToken || null, r.authTokenFactory || null);
						case 'provider':
							return r.client;
						default:
							throw new y(
								p.INVALID_ARGUMENT,
								'makeAuthCredentialsProvider failed due to invalid credential type'
							);
					}
				})(e.credentials));
	}
	_getSettings() {
		return this._settings;
	}
	_freezeSettings() {
		return (this._settingsFrozen = !0), this._settings;
	}
	_delete() {
		return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
	}
	toJSON() {
		return { app: this._app, databaseId: this._databaseId, settings: this._settings };
	}
	_terminate() {
		return (
			(function (n) {
				const r = Mc.get(n);
				r && (g('ComponentProvider', 'Removing Datastore'), Mc.delete(n), r.terminate());
			})(this),
			Promise.resolve()
		);
	}
}
function JE(t, e, n, r = {}) {
	var i;
	const s = (t = ge(t, Li))._getSettings(),
		o = `${e}:${n}`;
	if (
		(s.host !== 'firestore.googleapis.com' &&
			s.host !== o &&
			Wt(
				'Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.'
			),
		t._setSettings(Object.assign(Object.assign({}, s), { host: o, ssl: !1 })),
		r.mockUserToken)
	) {
		let a, c;
		if (typeof r.mockUserToken == 'string') (a = r.mockUserToken), (c = se.MOCK_USER);
		else {
			a = Xc(r.mockUserToken, (i = t._app) === null || i === void 0 ? void 0 : i.options.projectId);
			const u = r.mockUserToken.sub || r.mockUserToken.user_id;
			if (!u)
				throw new y(p.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
			c = new se(u);
		}
		t._authCredentials = new gy(new Yl(a, c));
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class kt {
	constructor(e, n, r) {
		(this.converter = n), (this._query = r), (this.type = 'query'), (this.firestore = e);
	}
	withConverter(e) {
		return new kt(this.firestore, e, this._query);
	}
}
class ue {
	constructor(e, n, r) {
		(this.converter = n), (this._key = r), (this.type = 'document'), (this.firestore = e);
	}
	get _path() {
		return this._key.path;
	}
	get id() {
		return this._key.path.lastSegment();
	}
	get path() {
		return this._key.path.canonicalString();
	}
	get parent() {
		return new tt(this.firestore, this.converter, this._key.path.popLast());
	}
	withConverter(e) {
		return new ue(this.firestore, e, this._key);
	}
}
class tt extends kt {
	constructor(e, n, r) {
		super(e, n, Ri(r)), (this._path = r), (this.type = 'collection');
	}
	get id() {
		return this._query.path.lastSegment();
	}
	get path() {
		return this._query.path.canonicalString();
	}
	get parent() {
		const e = this._path.popLast();
		return e.isEmpty() ? null : new ue(this.firestore, null, new T(e));
	}
	withConverter(e) {
		return new tt(this.firestore, e, this._path);
	}
}
function RT(t, e, ...n) {
	if (((t = B(t)), Yh('collection', 'path', e), t instanceof Li)) {
		const r = F.fromString(e, ...n);
		return Uc(r), new tt(t, null, r);
	}
	{
		if (!(t instanceof ue || t instanceof tt))
			throw new y(
				p.INVALID_ARGUMENT,
				'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
			);
		const r = t._path.child(F.fromString(e, ...n));
		return Uc(r), new tt(t.firestore, null, r);
	}
}
function na(t, e, ...n) {
	if (
		((t = B(t)), arguments.length === 1 && (e = Zl.newId()), Yh('doc', 'path', e), t instanceof Li)
	) {
		const r = F.fromString(e, ...n);
		return xc(r), new ue(t, null, new T(r));
	}
	{
		if (!(t instanceof ue || t instanceof tt))
			throw new y(
				p.INVALID_ARGUMENT,
				'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
			);
		const r = t._path.child(F.fromString(e, ...n));
		return xc(r), new ue(t.firestore, t instanceof tt ? t.converter : null, new T(r));
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class YE {
	constructor() {
		(this.Xa = Promise.resolve()),
			(this.eu = []),
			(this.tu = !1),
			(this.nu = []),
			(this.ru = null),
			(this.iu = !1),
			(this.su = !1),
			(this.ou = []),
			(this.jo = new Lh(this, 'async_queue_retry')),
			(this._u = () => {
				const n = is();
				n && g('AsyncQueue', 'Visibility state changed to ' + n.visibilityState), this.jo.Ko();
			});
		const e = is();
		e && typeof e.addEventListener == 'function' && e.addEventListener('visibilitychange', this._u);
	}
	get isShuttingDown() {
		return this.tu;
	}
	enqueueAndForget(e) {
		this.enqueue(e);
	}
	enqueueAndForgetEvenWhileRestricted(e) {
		this.au(), this.uu(e);
	}
	enterRestrictedMode(e) {
		if (!this.tu) {
			(this.tu = !0), (this.su = e || !1);
			const n = is();
			n &&
				typeof n.removeEventListener == 'function' &&
				n.removeEventListener('visibilitychange', this._u);
		}
	}
	enqueue(e) {
		if ((this.au(), this.tu)) return new Promise(() => {});
		const n = new De();
		return this.uu(() =>
			this.tu && this.su ? Promise.resolve() : (e().then(n.resolve, n.reject), n.promise)
		).then(() => n.promise);
	}
	enqueueRetryable(e) {
		this.enqueueAndForget(() => (this.eu.push(e), this.cu()));
	}
	async cu() {
		if (this.eu.length !== 0) {
			try {
				await this.eu[0](), this.eu.shift(), this.jo.reset();
			} catch (e) {
				if (!ir(e)) throw e;
				g('AsyncQueue', 'Operation failed with retryable error: ' + e);
			}
			this.eu.length > 0 && this.jo.qo(() => this.cu());
		}
	}
	uu(e) {
		const n = this.Xa.then(
			() => (
				(this.iu = !0),
				e()
					.catch((r) => {
						(this.ru = r), (this.iu = !1);
						const i = (function (o) {
							let a = o.message || '';
							return (
								o.stack &&
									(a = o.stack.includes(o.message)
										? o.stack
										: o.message +
											`
` +
											o.stack),
								a
							);
						})(r);
						throw (Le('INTERNAL UNHANDLED ERROR: ', i), r);
					})
					.then((r) => ((this.iu = !1), r))
			)
		);
		return (this.Xa = n), n;
	}
	enqueueAfterDelay(e, n, r) {
		this.au(), this.ou.indexOf(e) > -1 && (n = 0);
		const i = Ko.createAndSchedule(this, e, n, r, (s) => this.lu(s));
		return this.nu.push(i), i;
	}
	au() {
		this.ru && w();
	}
	verifyOperationInProgress() {}
	async hu() {
		let e;
		do (e = this.Xa), await e;
		while (e !== this.Xa);
	}
	Pu(e) {
		for (const n of this.nu) if (n.timerId === e) return !0;
		return !1;
	}
	Iu(e) {
		return this.hu().then(() => {
			this.nu.sort((n, r) => n.targetTimeMs - r.targetTimeMs);
			for (const n of this.nu) if ((n.skipDelay(), e !== 'all' && n.timerId === e)) break;
			return this.hu();
		});
	}
	Tu(e) {
		this.ou.push(e);
	}
	lu(e) {
		const n = this.nu.indexOf(e);
		this.nu.splice(n, 1);
	}
}
function Bc(t) {
	return (function (n, r) {
		if (typeof n != 'object' || n === null) return !1;
		const i = n;
		for (const s of r) if (s in i && typeof i[s] == 'function') return !0;
		return !1;
	})(t, ['next', 'error', 'complete']);
}
class He extends Li {
	constructor(e, n, r, i) {
		super(e, n, r, i),
			(this.type = 'firestore'),
			(this._queue = (function () {
				return new YE();
			})()),
			(this._persistenceKey = (i == null ? void 0 : i.name) || '[DEFAULT]');
	}
	_terminate() {
		return this._firestoreClient || Zh(this), this._firestoreClient.terminate();
	}
}
function ZE(t, e) {
	const n = typeof t == 'object' ? t : qs(),
		r = typeof t == 'string' ? t : e || '(default)',
		i = ni(n, 'firestore').getImmediate({ identifier: r });
	if (!i._initialized) {
		const s = Gc('firestore');
		s && JE(i, ...s);
	}
	return i;
}
function lr(t) {
	return t._firestoreClient || Zh(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
}
function Zh(t) {
	var e, n, r;
	const i = t._freezeSettings(),
		s = (function (a, c, u, l) {
			return new Vy(
				a,
				c,
				u,
				l.host,
				l.ssl,
				l.experimentalForceLongPolling,
				l.experimentalAutoDetectLongPolling,
				Jh(l.experimentalLongPollingOptions),
				l.useFetchStreams
			);
		})(
			t._databaseId,
			((e = t._app) === null || e === void 0 ? void 0 : e.options.appId) || '',
			t._persistenceKey,
			i
		);
	(t._firestoreClient = new zE(t._authCredentials, t._appCheckCredentials, t._queue, s)),
		!((n = i.localCache) === null || n === void 0) &&
			n._offlineComponentProvider &&
			!((r = i.localCache) === null || r === void 0) &&
			r._onlineComponentProvider &&
			(t._firestoreClient._uninitializedComponentsProvider = {
				_offlineKind: i.localCache.kind,
				_offline: i.localCache._offlineComponentProvider,
				_online: i.localCache._onlineComponentProvider
			});
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class en {
	constructor(e) {
		this._byteString = e;
	}
	static fromBase64String(e) {
		try {
			return new en(le.fromBase64String(e));
		} catch (n) {
			throw new y(p.INVALID_ARGUMENT, 'Failed to construct data from Base64 string: ' + n);
		}
	}
	static fromUint8Array(e) {
		return new en(le.fromUint8Array(e));
	}
	toBase64() {
		return this._byteString.toBase64();
	}
	toUint8Array() {
		return this._byteString.toUint8Array();
	}
	toString() {
		return 'Bytes(base64: ' + this.toBase64() + ')';
	}
	isEqual(e) {
		return this._byteString.isEqual(e._byteString);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hr {
	constructor(...e) {
		for (let n = 0; n < e.length; ++n)
			if (e[n].length === 0)
				throw new y(
					p.INVALID_ARGUMENT,
					'Invalid field name at argument $(i + 1). Field names must not be empty.'
				);
		this._internalPath = new te(e);
	}
	isEqual(e) {
		return this._internalPath.isEqual(e._internalPath);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cn {
	constructor(e) {
		this._methodName = e;
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ra {
	constructor(e, n) {
		if (!isFinite(e) || e < -90 || e > 90)
			throw new y(
				p.INVALID_ARGUMENT,
				'Latitude must be a number between -90 and 90, but was: ' + e
			);
		if (!isFinite(n) || n < -180 || n > 180)
			throw new y(
				p.INVALID_ARGUMENT,
				'Longitude must be a number between -180 and 180, but was: ' + n
			);
		(this._lat = e), (this._long = n);
	}
	get latitude() {
		return this._lat;
	}
	get longitude() {
		return this._long;
	}
	isEqual(e) {
		return this._lat === e._lat && this._long === e._long;
	}
	toJSON() {
		return { latitude: this._lat, longitude: this._long };
	}
	_compareTo(e) {
		return N(this._lat, e._lat) || N(this._long, e._long);
	}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const eT = /^__.*__$/;
class tT {
	constructor(e, n, r) {
		(this.data = e), (this.fieldMask = n), (this.fieldTransforms = r);
	}
	toMutation(e, n) {
		return this.fieldMask !== null
			? new ct(e, this.data, this.fieldMask, n, this.fieldTransforms)
			: new or(e, this.data, n, this.fieldTransforms);
	}
}
class ed {
	constructor(e, n, r) {
		(this.data = e), (this.fieldMask = n), (this.fieldTransforms = r);
	}
	toMutation(e, n) {
		return new ct(e, this.data, this.fieldMask, n, this.fieldTransforms);
	}
}
function td(t) {
	switch (t) {
		case 0:
		case 2:
		case 1:
			return !0;
		case 3:
		case 4:
			return !1;
		default:
			throw w();
	}
}
class Mi {
	constructor(e, n, r, i, s, o) {
		(this.settings = e),
			(this.databaseId = n),
			(this.serializer = r),
			(this.ignoreUndefinedProperties = i),
			s === void 0 && this.Eu(),
			(this.fieldTransforms = s || []),
			(this.fieldMask = o || []);
	}
	get path() {
		return this.settings.path;
	}
	get du() {
		return this.settings.du;
	}
	Au(e) {
		return new Mi(
			Object.assign(Object.assign({}, this.settings), e),
			this.databaseId,
			this.serializer,
			this.ignoreUndefinedProperties,
			this.fieldTransforms,
			this.fieldMask
		);
	}
	Ru(e) {
		var n;
		const r = (n = this.path) === null || n === void 0 ? void 0 : n.child(e),
			i = this.Au({ path: r, Vu: !1 });
		return i.mu(e), i;
	}
	fu(e) {
		var n;
		const r = (n = this.path) === null || n === void 0 ? void 0 : n.child(e),
			i = this.Au({ path: r, Vu: !1 });
		return i.Eu(), i;
	}
	gu(e) {
		return this.Au({ path: void 0, Vu: !0 });
	}
	pu(e) {
		return ei(e, this.settings.methodName, this.settings.yu || !1, this.path, this.settings.wu);
	}
	contains(e) {
		return (
			this.fieldMask.find((n) => e.isPrefixOf(n)) !== void 0 ||
			this.fieldTransforms.find((n) => e.isPrefixOf(n.field)) !== void 0
		);
	}
	Eu() {
		if (this.path) for (let e = 0; e < this.path.length; e++) this.mu(this.path.get(e));
	}
	mu(e) {
		if (e.length === 0) throw this.pu('Document fields must not be empty');
		if (td(this.du) && eT.test(e)) throw this.pu('Document fields cannot begin and end with "__"');
	}
}
class nT {
	constructor(e, n, r) {
		(this.databaseId = e), (this.ignoreUndefinedProperties = n), (this.serializer = r || Di(e));
	}
	Su(e, n, r, i = !1) {
		return new Mi(
			{ du: e, methodName: n, wu: r, path: te.emptyPath(), Vu: !1, yu: i },
			this.databaseId,
			this.serializer,
			this.ignoreUndefinedProperties
		);
	}
}
function dr(t) {
	const e = t._freezeSettings(),
		n = Di(t._databaseId);
	return new nT(t._databaseId, !!e.ignoreUndefinedProperties, n);
}
function ia(t, e, n, r, i, s = {}) {
	const o = t.Su(s.merge || s.mergeFields ? 2 : 0, e, n, i);
	ca('Data must be an object, but it was:', o, r);
	const a = sd(r, o);
	let c, u;
	if (s.merge) (c = new ye(o.fieldMask)), (u = o.fieldTransforms);
	else if (s.mergeFields) {
		const l = [];
		for (const h of s.mergeFields) {
			const d = Fs(e, h, n);
			if (!o.contains(d))
				throw new y(
					p.INVALID_ARGUMENT,
					`Field '${d}' is specified in your field mask but missing from your input data.`
				);
			ad(l, d) || l.push(d);
		}
		(c = new ye(l)), (u = o.fieldTransforms.filter((h) => c.covers(h.field)));
	} else (c = null), (u = o.fieldTransforms);
	return new tT(new pe(a), c, u);
}
class xi extends cn {
	_toFieldTransform(e) {
		if (e.du !== 2)
			throw e.du === 1
				? e.pu(`${this._methodName}() can only appear at the top level of your update data`)
				: e.pu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
		return e.fieldMask.push(e.path), null;
	}
	isEqual(e) {
		return e instanceof xi;
	}
}
function nd(t, e, n) {
	return new Mi(
		{ du: 3, wu: e.settings.wu, methodName: t._methodName, Vu: n },
		e.databaseId,
		e.serializer,
		e.ignoreUndefinedProperties
	);
}
class sa extends cn {
	_toFieldTransform(e) {
		return new xo(e.path, new $n());
	}
	isEqual(e) {
		return e instanceof sa;
	}
}
class oa extends cn {
	constructor(e, n) {
		super(e), (this.bu = n);
	}
	_toFieldTransform(e) {
		const n = nd(this, e, !0),
			r = this.bu.map((s) => Dt(s, n)),
			i = new Xt(r);
		return new xo(e.path, i);
	}
	isEqual(e) {
		return e instanceof oa && $t(this.bu, e.bu);
	}
}
class aa extends cn {
	constructor(e, n) {
		super(e), (this.bu = n);
	}
	_toFieldTransform(e) {
		const n = nd(this, e, !0),
			r = this.bu.map((s) => Dt(s, n)),
			i = new Jt(r);
		return new xo(e.path, i);
	}
	isEqual(e) {
		return e instanceof aa && $t(this.bu, e.bu);
	}
}
function rd(t, e, n, r) {
	const i = t.Su(1, e, n);
	ca('Data must be an object, but it was:', i, r);
	const s = [],
		o = pe.empty();
	Ct(r, (c, u) => {
		const l = ua(e, c, n);
		u = B(u);
		const h = i.fu(l);
		if (u instanceof xi) s.push(l);
		else {
			const d = Dt(u, h);
			d != null && (s.push(l), o.set(l, d));
		}
	});
	const a = new ye(s);
	return new ed(o, a, i.fieldTransforms);
}
function id(t, e, n, r, i, s) {
	const o = t.Su(1, e, n),
		a = [Fs(e, r, n)],
		c = [i];
	if (s.length % 2 != 0)
		throw new y(
			p.INVALID_ARGUMENT,
			`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`
		);
	for (let d = 0; d < s.length; d += 2) a.push(Fs(e, s[d])), c.push(s[d + 1]);
	const u = [],
		l = pe.empty();
	for (let d = a.length - 1; d >= 0; --d)
		if (!ad(u, a[d])) {
			const f = a[d];
			let E = c[d];
			E = B(E);
			const I = o.fu(f);
			if (E instanceof xi) u.push(f);
			else {
				const v = Dt(E, I);
				v != null && (u.push(f), l.set(f, v));
			}
		}
	const h = new ye(u);
	return new ed(l, h, o.fieldTransforms);
}
function rT(t, e, n, r = !1) {
	return Dt(n, t.Su(r ? 4 : 3, e));
}
function Dt(t, e) {
	if (od((t = B(t)))) return ca('Unsupported field value:', e, t), sd(t, e);
	if (t instanceof cn)
		return (
			(function (r, i) {
				if (!td(i.du)) throw i.pu(`${r._methodName}() can only be used with update() and set()`);
				if (!i.path) throw i.pu(`${r._methodName}() is not currently supported inside arrays`);
				const s = r._toFieldTransform(i);
				s && i.fieldTransforms.push(s);
			})(t, e),
			null
		);
	if (t === void 0 && e.ignoreUndefinedProperties) return null;
	if ((e.path && e.fieldMask.push(e.path), t instanceof Array)) {
		if (e.settings.Vu && e.du !== 4) throw e.pu('Nested arrays are not supported');
		return (function (r, i) {
			const s = [];
			let o = 0;
			for (const a of r) {
				let c = Dt(a, i.gu(o));
				c == null && (c = { nullValue: 'NULL_VALUE' }), s.push(c), o++;
			}
			return { arrayValue: { values: s } };
		})(t, e);
	}
	return (function (r, i) {
		if ((r = B(r)) === null) return { nullValue: 'NULL_VALUE' };
		if (typeof r == 'number') return ev(i.serializer, r);
		if (typeof r == 'boolean') return { booleanValue: r };
		if (typeof r == 'string') return { stringValue: r };
		if (r instanceof Date) {
			const s = Q.fromDate(r);
			return { timestampValue: Jr(i.serializer, s) };
		}
		if (r instanceof Q) {
			const s = new Q(r.seconds, 1e3 * Math.floor(r.nanoseconds / 1e3));
			return { timestampValue: Jr(i.serializer, s) };
		}
		if (r instanceof ra) return { geoPointValue: { latitude: r.latitude, longitude: r.longitude } };
		if (r instanceof en) return { bytesValue: Sh(i.serializer, r._byteString) };
		if (r instanceof ue) {
			const s = i.databaseId,
				o = r.firestore._databaseId;
			if (!o.isEqual(s))
				throw i.pu(
					`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`
				);
			return { referenceValue: jo(r.firestore._databaseId || i.databaseId, r._key.path) };
		}
		throw i.pu(`Unsupported field value: ${Oi(r)}`);
	})(t, e);
}
function sd(t, e) {
	const n = {};
	return (
		eh(t)
			? e.path && e.path.length > 0 && e.fieldMask.push(e.path)
			: Ct(t, (r, i) => {
					const s = Dt(i, e.Ru(r));
					s != null && (n[r] = s);
				}),
		{ mapValue: { fields: n } }
	);
}
function od(t) {
	return !(
		typeof t != 'object' ||
		t === null ||
		t instanceof Array ||
		t instanceof Date ||
		t instanceof Q ||
		t instanceof ra ||
		t instanceof en ||
		t instanceof ue ||
		t instanceof cn
	);
}
function ca(t, e, n) {
	if (
		!od(n) ||
		!(function (i) {
			return (
				typeof i == 'object' &&
				i !== null &&
				(Object.getPrototypeOf(i) === Object.prototype || Object.getPrototypeOf(i) === null)
			);
		})(n)
	) {
		const r = Oi(n);
		throw r === 'an object' ? e.pu(t + ' a custom object') : e.pu(t + ' ' + r);
	}
}
function Fs(t, e, n) {
	if ((e = B(e)) instanceof hr) return e._internalPath;
	if (typeof e == 'string') return ua(t, e);
	throw ei('Field path arguments must be of type string or ', t, !1, void 0, n);
}
const iT = new RegExp('[~\\*/\\[\\]]');
function ua(t, e, n) {
	if (e.search(iT) >= 0)
		throw ei(
			`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,
			t,
			!1,
			void 0,
			n
		);
	try {
		return new hr(...e.split('.'))._internalPath;
	} catch {
		throw ei(
			`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
			t,
			!1,
			void 0,
			n
		);
	}
}
function ei(t, e, n, r, i) {
	const s = r && !r.isEmpty(),
		o = i !== void 0;
	let a = `Function ${e}() called with invalid data`;
	n && (a += ' (via `toFirestore()`)'), (a += '. ');
	let c = '';
	return (
		(s || o) &&
			((c += ' (found'), s && (c += ` in field ${r}`), o && (c += ` in document ${i}`), (c += ')')),
		new y(p.INVALID_ARGUMENT, a + t + c)
	);
}
function ad(t, e) {
	return t.some((n) => n.isEqual(e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cd {
	constructor(e, n, r, i, s) {
		(this._firestore = e),
			(this._userDataWriter = n),
			(this._key = r),
			(this._document = i),
			(this._converter = s);
	}
	get id() {
		return this._key.path.lastSegment();
	}
	get ref() {
		return new ue(this._firestore, this._converter, this._key);
	}
	exists() {
		return this._document !== null;
	}
	data() {
		if (this._document) {
			if (this._converter) {
				const e = new sT(this._firestore, this._userDataWriter, this._key, this._document, null);
				return this._converter.fromFirestore(e);
			}
			return this._userDataWriter.convertValue(this._document.data.value);
		}
	}
	get(e) {
		if (this._document) {
			const n = this._document.data.field(ud('DocumentSnapshot.get', e));
			if (n !== null) return this._userDataWriter.convertValue(n);
		}
	}
}
class sT extends cd {
	data() {
		return super.data();
	}
}
function ud(t, e) {
	return typeof e == 'string'
		? ua(t, e)
		: e instanceof hr
			? e._internalPath
			: e._delegate._internalPath;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ld(t) {
	if (t.limitType === 'L' && t.explicitOrderBy.length === 0)
		throw new y(
			p.UNIMPLEMENTED,
			'limitToLast() queries require specifying at least one orderBy() clause'
		);
}
class la {}
class oT extends la {}
function ST(t, e, ...n) {
	let r = [];
	e instanceof la && r.push(e),
		(r = r.concat(n)),
		(function (s) {
			const o = s.filter((c) => c instanceof da).length,
				a = s.filter((c) => c instanceof ha).length;
			if (o > 1 || (o > 0 && a > 0))
				throw new y(
					p.INVALID_ARGUMENT,
					'InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.'
				);
		})(r);
	for (const i of r) t = i._apply(t);
	return t;
}
class ha extends oT {
	constructor(e, n, r) {
		super(), (this._field = e), (this._op = n), (this._value = r), (this.type = 'where');
	}
	static _create(e, n, r) {
		return new ha(e, n, r);
	}
	_apply(e) {
		const n = this._parse(e);
		return hd(e._query, n), new kt(e.firestore, e.converter, Ds(e._query, n));
	}
	_parse(e) {
		const n = dr(e.firestore);
		return (function (s, o, a, c, u, l, h) {
			let d;
			if (u.isKeyField()) {
				if (l === 'array-contains' || l === 'array-contains-any')
					throw new y(
						p.INVALID_ARGUMENT,
						`Invalid Query. You can't perform '${l}' queries on documentId().`
					);
				if (l === 'in' || l === 'not-in') {
					qc(h, l);
					const f = [];
					for (const E of h) f.push(jc(c, s, E));
					d = { arrayValue: { values: f } };
				} else d = jc(c, s, h);
			} else
				(l !== 'in' && l !== 'not-in' && l !== 'array-contains-any') || qc(h, l),
					(d = rT(a, o, h, l === 'in' || l === 'not-in'));
			return G.create(u, l, d);
		})(e._query, 'where', n, e.firestore._databaseId, this._field, this._op, this._value);
	}
}
class da extends la {
	constructor(e, n) {
		super(), (this.type = e), (this._queryConstraints = n);
	}
	static _create(e, n) {
		return new da(e, n);
	}
	_parse(e) {
		const n = this._queryConstraints
			.map((r) => r._parse(e))
			.filter((r) => r.getFilters().length > 0);
		return n.length === 1 ? n[0] : we.create(n, this._getOperator());
	}
	_apply(e) {
		const n = this._parse(e);
		return n.getFilters().length === 0
			? e
			: ((function (i, s) {
					let o = i;
					const a = s.getFlattenedFilters();
					for (const c of a) hd(o, c), (o = Ds(o, c));
				})(e._query, n),
				new kt(e.firestore, e.converter, Ds(e._query, n)));
	}
	_getQueryConstraints() {
		return this._queryConstraints;
	}
	_getOperator() {
		return this.type === 'and' ? 'and' : 'or';
	}
}
function jc(t, e, n) {
	if (typeof (n = B(n)) == 'string') {
		if (n === '')
			throw new y(
				p.INVALID_ARGUMENT,
				'Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.'
			);
		if (!uh(e) && n.indexOf('/') !== -1)
			throw new y(
				p.INVALID_ARGUMENT,
				`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
			);
		const r = e.path.child(F.fromString(n));
		if (!T.isDocumentKey(r))
			throw new y(
				p.INVALID_ARGUMENT,
				`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`
			);
		return lc(t, new T(r));
	}
	if (n instanceof ue) return lc(t, n._key);
	throw new y(
		p.INVALID_ARGUMENT,
		`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Oi(n)}.`
	);
}
function qc(t, e) {
	if (!Array.isArray(t) || t.length === 0)
		throw new y(
			p.INVALID_ARGUMENT,
			`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`
		);
}
function hd(t, e) {
	const n = (function (i, s) {
		for (const o of i)
			for (const a of o.getFlattenedFilters()) if (s.indexOf(a.op) >= 0) return a.op;
		return null;
	})(
		t.filters,
		(function (i) {
			switch (i) {
				case '!=':
					return ['!=', 'not-in'];
				case 'array-contains-any':
				case 'in':
					return ['not-in'];
				case 'not-in':
					return ['array-contains-any', 'in', 'not-in', '!='];
				default:
					return [];
			}
		})(e.op)
	);
	if (n !== null)
		throw n === e.op
			? new y(
					p.INVALID_ARGUMENT,
					`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`
				)
			: new y(
					p.INVALID_ARGUMENT,
					`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`
				);
}
class aT {
	convertValue(e, n = 'none') {
		switch (Rt(e)) {
			case 0:
				return null;
			case 1:
				return e.booleanValue;
			case 2:
				return W(e.integerValue || e.doubleValue);
			case 3:
				return this.convertTimestamp(e.timestampValue);
			case 4:
				return this.convertServerTimestamp(e, n);
			case 5:
				return e.stringValue;
			case 6:
				return this.convertBytes(At(e.bytesValue));
			case 7:
				return this.convertReference(e.referenceValue);
			case 8:
				return this.convertGeoPoint(e.geoPointValue);
			case 9:
				return this.convertArray(e.arrayValue, n);
			case 10:
				return this.convertObject(e.mapValue, n);
			default:
				throw w();
		}
	}
	convertObject(e, n) {
		return this.convertObjectMap(e.fields, n);
	}
	convertObjectMap(e, n = 'none') {
		const r = {};
		return (
			Ct(e, (i, s) => {
				r[i] = this.convertValue(s, n);
			}),
			r
		);
	}
	convertGeoPoint(e) {
		return new ra(W(e.latitude), W(e.longitude));
	}
	convertArray(e, n) {
		return (e.values || []).map((r) => this.convertValue(r, n));
	}
	convertServerTimestamp(e, n) {
		switch (n) {
			case 'previous':
				const r = Vo(e);
				return r == null ? null : this.convertValue(r, n);
			case 'estimate':
				return this.convertTimestamp(Bn(e));
			default:
				return null;
		}
	}
	convertTimestamp(e) {
		const n = it(e);
		return new Q(n.seconds, n.nanos);
	}
	convertDocumentKey(e, n) {
		const r = F.fromString(e);
		x(Nh(r));
		const i = new jn(r.get(1), r.get(3)),
			s = new T(r.popFirst(5));
		return (
			i.isEqual(n) ||
				Le(
					`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`
				),
			s
		);
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function fa(t, e, n) {
	let r;
	return (
		(r = t ? (n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e)) : e), r
	);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vn {
	constructor(e, n) {
		(this.hasPendingWrites = e), (this.fromCache = n);
	}
	isEqual(e) {
		return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache;
	}
}
class dd extends cd {
	constructor(e, n, r, i, s, o) {
		super(e, n, r, i, o), (this._firestore = e), (this._firestoreImpl = e), (this.metadata = s);
	}
	exists() {
		return super.exists();
	}
	data(e = {}) {
		if (this._document) {
			if (this._converter) {
				const n = new Nr(
					this._firestore,
					this._userDataWriter,
					this._key,
					this._document,
					this.metadata,
					null
				);
				return this._converter.fromFirestore(n, e);
			}
			return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps);
		}
	}
	get(e, n = {}) {
		if (this._document) {
			const r = this._document.data.field(ud('DocumentSnapshot.get', e));
			if (r !== null) return this._userDataWriter.convertValue(r, n.serverTimestamps);
		}
	}
}
class Nr extends dd {
	data(e = {}) {
		return super.data(e);
	}
}
class fd {
	constructor(e, n, r, i) {
		(this._firestore = e),
			(this._userDataWriter = n),
			(this._snapshot = i),
			(this.metadata = new vn(i.hasPendingWrites, i.fromCache)),
			(this.query = r);
	}
	get docs() {
		const e = [];
		return this.forEach((n) => e.push(n)), e;
	}
	get size() {
		return this._snapshot.docs.size;
	}
	get empty() {
		return this.size === 0;
	}
	forEach(e, n) {
		this._snapshot.docs.forEach((r) => {
			e.call(
				n,
				new Nr(
					this._firestore,
					this._userDataWriter,
					r.key,
					r,
					new vn(this._snapshot.mutatedKeys.has(r.key), this._snapshot.fromCache),
					this.query.converter
				)
			);
		});
	}
	docChanges(e = {}) {
		const n = !!e.includeMetadataChanges;
		if (n && this._snapshot.excludesMetadataChanges)
			throw new y(
				p.INVALID_ARGUMENT,
				'To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().'
			);
		return (
			(this._cachedChanges && this._cachedChangesIncludeMetadataChanges === n) ||
				((this._cachedChanges = (function (i, s) {
					if (i._snapshot.oldDocs.isEmpty()) {
						let o = 0;
						return i._snapshot.docChanges.map((a) => {
							const c = new Nr(
								i._firestore,
								i._userDataWriter,
								a.doc.key,
								a.doc,
								new vn(i._snapshot.mutatedKeys.has(a.doc.key), i._snapshot.fromCache),
								i.query.converter
							);
							return a.doc, { type: 'added', doc: c, oldIndex: -1, newIndex: o++ };
						});
					}
					{
						let o = i._snapshot.oldDocs;
						return i._snapshot.docChanges
							.filter((a) => s || a.type !== 3)
							.map((a) => {
								const c = new Nr(
									i._firestore,
									i._userDataWriter,
									a.doc.key,
									a.doc,
									new vn(i._snapshot.mutatedKeys.has(a.doc.key), i._snapshot.fromCache),
									i.query.converter
								);
								let u = -1,
									l = -1;
								return (
									a.type !== 0 && ((u = o.indexOf(a.doc.key)), (o = o.delete(a.doc.key))),
									a.type !== 1 && ((o = o.add(a.doc)), (l = o.indexOf(a.doc.key))),
									{ type: cT(a.type), doc: c, oldIndex: u, newIndex: l }
								);
							});
					}
				})(this, n)),
				(this._cachedChangesIncludeMetadataChanges = n)),
			this._cachedChanges
		);
	}
}
function cT(t) {
	switch (t) {
		case 0:
			return 'added';
		case 2:
		case 3:
			return 'modified';
		case 1:
			return 'removed';
		default:
			return w();
	}
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function PT(t) {
	t = ge(t, ue);
	const e = ge(t.firestore, He);
	return KE(lr(e), t._key).then((n) => md(e, t, n));
}
class pa extends aT {
	constructor(e) {
		super(), (this.firestore = e);
	}
	convertBytes(e) {
		return new en(e);
	}
	convertReference(e) {
		const n = this.convertDocumentKey(e, this.firestore._databaseId);
		return new ue(this.firestore, null, n);
	}
}
function CT(t) {
	t = ge(t, kt);
	const e = ge(t.firestore, He),
		n = lr(e),
		r = new pa(e);
	return ld(t._query), QE(n, t._query).then((i) => new fd(e, r, t, i));
}
function bT(t, e, n) {
	t = ge(t, ue);
	const r = ge(t.firestore, He),
		i = fa(t.converter, e, n);
	return Ui(r, [
		ia(dr(r), 'setDoc', t._key, i, t.converter !== null, n).toMutation(t._key, me.none())
	]);
}
function kT(t, e, n, ...r) {
	t = ge(t, ue);
	const i = ge(t.firestore, He),
		s = dr(i);
	let o;
	return (
		(o =
			typeof (e = B(e)) == 'string' || e instanceof hr
				? id(s, 'updateDoc', t._key, e, n, r)
				: rd(s, 'updateDoc', t._key, e)),
		Ui(i, [o.toMutation(t._key, me.exists(!0))])
	);
}
function DT(t, e) {
	const n = ge(t.firestore, He),
		r = na(t),
		i = fa(t.converter, e);
	return Ui(n, [
		ia(dr(t.firestore), 'addDoc', r._key, i, t.converter !== null, {}).toMutation(
			r._key,
			me.exists(!1)
		)
	]).then(() => r);
}
function pd(t, ...e) {
	var n, r, i;
	t = B(t);
	let s = { includeMetadataChanges: !1 },
		o = 0;
	typeof e[o] != 'object' || Bc(e[o]) || ((s = e[o]), o++);
	const a = { includeMetadataChanges: s.includeMetadataChanges };
	if (Bc(e[o])) {
		const h = e[o];
		(e[o] = (n = h.next) === null || n === void 0 ? void 0 : n.bind(h)),
			(e[o + 1] = (r = h.error) === null || r === void 0 ? void 0 : r.bind(h)),
			(e[o + 2] = (i = h.complete) === null || i === void 0 ? void 0 : i.bind(h));
	}
	let c, u, l;
	if (t instanceof ue)
		(u = ge(t.firestore, He)),
			(l = Ri(t._key.path)),
			(c = {
				next: (h) => {
					e[o] && e[o](md(u, t, h));
				},
				error: e[o + 1],
				complete: e[o + 2]
			});
	else {
		const h = ge(t, kt);
		(u = ge(h.firestore, He)), (l = h._query);
		const d = new pa(u);
		(c = {
			next: (f) => {
				e[o] && e[o](new fd(u, d, h, f));
			},
			error: e[o + 1],
			complete: e[o + 2]
		}),
			ld(t._query);
	}
	return (function (d, f, E, I) {
		const v = new ta(I),
			k = new Zo(f, v, E);
		return (
			d.asyncQueue.enqueueAndForget(async () => Xo(await Zr(d), k)),
			() => {
				v.La(), d.asyncQueue.enqueueAndForget(async () => Jo(await Zr(d), k));
			}
		);
	})(lr(u), l, a, c);
}
function Ui(t, e) {
	return (function (r, i) {
		const s = new De();
		return r.asyncQueue.enqueueAndForget(async () => OE(await GE(r), i, s)), s.promise;
	})(lr(t), e);
}
function md(t, e, n) {
	const r = n.docs.get(e._key),
		i = new pa(t);
	return new dd(t, i, e._key, r, new vn(n.hasPendingWrites, n.fromCache), e.converter);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uT {
	constructor(e, n) {
		(this._firestore = e),
			(this._commitHandler = n),
			(this._mutations = []),
			(this._committed = !1),
			(this._dataReader = dr(e));
	}
	set(e, n, r) {
		this._verifyNotCommitted();
		const i = os(e, this._firestore),
			s = fa(i.converter, n, r),
			o = ia(this._dataReader, 'WriteBatch.set', i._key, s, i.converter !== null, r);
		return this._mutations.push(o.toMutation(i._key, me.none())), this;
	}
	update(e, n, r, ...i) {
		this._verifyNotCommitted();
		const s = os(e, this._firestore);
		let o;
		return (
			(o =
				typeof (n = B(n)) == 'string' || n instanceof hr
					? id(this._dataReader, 'WriteBatch.update', s._key, n, r, i)
					: rd(this._dataReader, 'WriteBatch.update', s._key, n)),
			this._mutations.push(o.toMutation(s._key, me.exists(!0))),
			this
		);
	}
	delete(e) {
		this._verifyNotCommitted();
		const n = os(e, this._firestore);
		return (this._mutations = this._mutations.concat(new Uo(n._key, me.none()))), this;
	}
	commit() {
		return (
			this._verifyNotCommitted(),
			(this._committed = !0),
			this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve()
		);
	}
	_verifyNotCommitted() {
		if (this._committed)
			throw new y(
				p.FAILED_PRECONDITION,
				'A write batch can no longer be used after commit() has been called.'
			);
	}
}
function os(t, e) {
	if ((t = B(t)).firestore !== e)
		throw new y(
			p.INVALID_ARGUMENT,
			'Provided document reference is from a different Firestore instance.'
		);
	return t;
}
function NT() {
	return new sa('serverTimestamp');
}
function VT(...t) {
	return new oa('arrayUnion', t);
}
function OT(...t) {
	return new aa('arrayRemove', t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function LT(t) {
	return lr((t = ge(t, He))), new uT(t, (e) => Ui(t, e));
}
(function (e, n = !0) {
	(function (i) {
		sn = i;
	})(St),
		Et(
			new nt(
				'firestore',
				(r, { instanceIdentifier: i, options: s }) => {
					const o = r.getProvider('app').getImmediate(),
						a = new He(
							new _y(r.getProvider('auth-internal')),
							new Ty(r.getProvider('app-check-internal')),
							(function (u, l) {
								if (!Object.prototype.hasOwnProperty.apply(u.options, ['projectId']))
									throw new y(
										p.INVALID_ARGUMENT,
										'"projectId" not provided in firebase.initializeApp.'
									);
								return new jn(u.options.projectId, l);
							})(o, i),
							o
						);
					return (s = Object.assign({ useFetchStreams: n }, s)), a._setSettings(s), a;
				},
				'PUBLIC'
			).setMultipleInstances(!0)
		),
		Ce(sc, '4.4.3', e),
		Ce(sc, '4.4.3', 'esm2017');
})();
const lT = {
	apiKey: 'AIzaSyBbl1NaYS3SE3lb0ROS2Pie0ZDoD8wLgzI',
	authDomain: 'who-is-cooking.firebaseapp.com',
	projectId: 'who-is-cooking',
	storageBucket: 'who-is-cooking.appspot.com',
	messagingSenderId: '169576180053',
	appId: '1:169576180053:web:2bd9c7a24914b018e727dc',
	measurementId: 'G-41QYQE18QH'
};
eu(lT);
const gd = ZE(),
	pn = Qm(),
	MT = s_();
function hT() {
	let t;
	if (!pn || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe: n } = Vr(null);
		return { subscribe: n };
	}
	const { subscribe: e } = Vr(
		(pn == null ? void 0 : pn.currentUser) ?? null,
		(n) => (
			(t = Up(pn, (r) => {
				n(r);
			})),
			() => t()
		)
	);
	return { subscribe: e };
}
const dT = hT();
function fT(t) {
	let e;
	const n = na(gd, t),
		{ subscribe: r } = Vr(
			null,
			(i) => (
				(e = pd(n, (s) => {
					i(s.data() ?? null);
				})),
				() => e()
			)
		);
	return { subscribe: r, ref: n, id: n.id };
}
const xT = _d(dT, (t, e) => {
	if (t) return fT(`users/${t.uid}`).subscribe(e);
	e(null);
});
function pT() {
	const { subscribe: t, set: e } = Vr([]),
		n = na(gd, 'rotor', '267rotor'),
		r = pd(
			n,
			(i) => {
				i.exists() ? e(i.data()) : e([]);
			},
			(i) => {
				console.error('Error getting document:', i), e([]);
			}
		);
	return {
		subscribe: t,
		unsubscribe() {
			r();
		}
	};
}
const UT = pT();
export {
	Ke as G,
	gd as a,
	OT as b,
	ET as c,
	na as d,
	_T as e,
	pn as f,
	xT as g,
	yT as h,
	vT as i,
	kT as j,
	PT as k,
	VT as l,
	DT as m,
	RT as n,
	NT as o,
	CT as p,
	ST as q,
	TT as r,
	MT as s,
	gT as t,
	dT as u,
	UT as v,
	LT as w,
	bT as x
};
