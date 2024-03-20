import { s as subscribe } from '../../../chunks/utils.js';
import { c as create_ssr_component, e as escape } from '../../../chunks/ssr.js';
import 'firebase/auth';
import { a as user } from '../../../chunks/firebase.js';
import { n as navProgress } from '../../../chunks/nav.js';
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $user, $$unsubscribe_user;
	$$unsubscribe_user = subscribe(user, (value) => ($user = value));
	navProgress.set(33);
	$$unsubscribe_user();
	return `<a href="/login/username" data-svelte-h="svelte-1vahqrx">USERNAME</a> <h2 data-svelte-h="svelte-bhb3ah">Login</h2> ${$user ? `<h2 class="card-title">Welcome, ${escape($user.displayName)}</h2> <p class="text-center text-success" data-svelte-h="svelte-1958qcl">You are logged in</p> <a class="btn btn-primary" href="/login/username" data-svelte-h="svelte-15sj5y">Setup username</a> ` : `<button class="btn btn-primary" data-svelte-h="svelte-12721gk">Sign in with Google</button>`}`;
});
export { Page as default };
