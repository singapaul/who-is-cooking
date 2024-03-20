import functions from 'firebase-functions'
import admin from 'firebase-admin'
admin.initializeApp();

exports.toggleCooked = functions.firestore
	.document("rotor/267rotor")
	.onWrite(async (change, context) => {
		const document = change.after.exists ? change.after.data() : null;

        console.log(document)
		// Exit if the document does not exist.
		if (!document) return;

		const yourArrayFieldName = document.Order;
		let allCooked = yourArrayFieldName.every((item) => item.cooked);

		if (allCooked) {
			const toggledArray = yourArrayFieldName.map((item) => ({
				...item,
				cooked: false
			}));

			// Update the document
			await change.after.ref.set({
				...document,
				yourArrayFieldName: toggledArray
			});
		}
	});
