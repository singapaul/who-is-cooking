import { d as derived, w as writable } from './index2.js';
function createNotificationStore(timeout) {
	const _notifications = writable([]);
	function send(message, type = 'default', timeout2) {
		_notifications.update((state) => {
			return [...state, { id: id(), type, message, timeout: timeout2 }];
		});
	}
	const notifications2 = derived(_notifications, ($_notifications, set) => {
		set($_notifications);
		if ($_notifications.length > 0) {
			const timer = setTimeout(() => {
				_notifications.update((state) => {
					state.shift();
					return state;
				});
			}, $_notifications[0].timeout);
			return () => {
				clearTimeout(timer);
			};
		}
	});
	const { subscribe } = notifications2;
	return {
		subscribe,
		send,
		default: (msg, timeout2) => send(msg, 'default', timeout2),
		danger: (msg, timeout2) => send(msg, 'danger', timeout2),
		warning: (msg, timeout2) => send(msg, 'warning', timeout2),
		info: (msg, timeout2) => send(msg, 'info', timeout2),
		success: (msg, timeout2) => send(msg, 'success', timeout2)
	};
}
function id() {
	return '_' + Math.random().toString(36).substr(2, 9);
}
const notifications = createNotificationStore();
export { notifications as n };
