export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["bosh-big-john.gif","default-meal.webp","favicon.png"]),
	mimeTypes: {".gif":"image/gif",".webp":"image/webp",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.ISDEZiWK.js","app":"_app/immutable/entry/app.DnMGGK8i.js","imports":["_app/immutable/entry/start.ISDEZiWK.js","_app/immutable/chunks/entry.CsvIKO-1.js","_app/immutable/chunks/scheduler.BNDlRAw_.js","_app/immutable/chunks/index.BVPszMDO.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.DnMGGK8i.js","_app/immutable/chunks/scheduler.BNDlRAw_.js","_app/immutable/chunks/index.DcAR09LG.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/feed",
				pattern: /^\/feed\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/feed/[dish]",
				pattern: /^\/feed\/([^/]+?)\/?$/,
				params: [{"name":"dish","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/feed/[dish]/delete",
				pattern: /^\/feed\/([^/]+?)\/delete\/?$/,
				params: [{"name":"dish","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/feed/[dish]/edit",
				pattern: /^\/feed\/([^/]+?)\/edit\/?$/,
				params: [{"name":"dish","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/login/photo",
				pattern: /^\/login\/photo\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/login/username",
				pattern: /^\/login\/username\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/new-meal",
				pattern: /^\/new-meal\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
