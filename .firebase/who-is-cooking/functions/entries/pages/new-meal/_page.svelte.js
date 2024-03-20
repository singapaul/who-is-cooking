import { s as subscribe, n as null_to_empty } from "../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { c as createForm, F as FormInput, a as FormSelect, T as TextAreaInput, C as CurrencyInput } from "../../../chunks/CurrencyInput.js";
import { g as goto } from "../../../chunks/client.js";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
import { a as user, u as userData, d as db, s as storage } from "../../../chunks/firebase.js";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const css = {
  code: "div.my-currency-input.svelte-kqxn9h input.currencyInput__formatted{width:100%;background:transparent;border-radius:0.5rem}div.my-currency-input-error.svelte-kqxn9h input.currencyInput__formatted{border:1px solid red;color:red}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  let $form, $$unsubscribe_form;
  let $userData, $$unsubscribe_userData;
  let $errors, $$unsubscribe_errors;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  console.log($user?.email);
  let uploading = false;
  let fileToUpload;
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      dish: "",
      // I don't need to
      // select
      chef: "",
      // currency input
      cost: 0,
      // text area
      recipe: "",
      // file input
      photoURL: null
    },
    validate: (values) => {
      let errs = {};
      if (values.dish === "") {
        errs["dish"] = "dish is required";
      }
      if (values.chef === "") {
        errs["chef"] = "chef is required";
      }
      if (values.recipe === "") {
        errs["recipe"] = "Please enter a recipe or link";
      }
      if (values.cost <= 9 || values.cost >= 99) {
        errs["cost"] = "Please enter a valid price";
      }
      if (!values.photoURL) {
        errs["photoURL"] = "Please attach a photo";
      }
      return errs;
    },
    onSubmit: (values) => {
      postRecipeToFirebase($form);
    }
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  async function postRecipeToFirebase(data) {
    const { chef, cost, dish, photoURL, recipe } = data;
    try {
      const docRef = await addDoc(collection(db, "meals"), {
        chef,
        cost,
        dish,
        photoURL,
        recipe,
        postedById: $user?.uid,
        createdAt: serverTimestamp(),
        likedBy: []
      });
      uploadImage({ docRef: docRef.id }).then(() => goto("/"));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function uploadImage({ docRef }) {
    uploading = true;
    const storageRef = ref(storage, `meals/${docRef}.png`);
    const result = await uploadBytes(storageRef, fileToUpload);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc(db, "meals", docRef), { photoURL: url });
    uploading = false;
  }
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    `/${$userData?.username}/edit`;
    $$rendered = `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
      default: () => {
        return `<form class="m-auto flex max-w-96 flex-col py-9">${validate_component(FormInput, "FormInput").$$render(
          $$result,
          {
            fieldName: "dish",
            label: "Dish name",
            bindValue: $form.dish,
            handleChange,
            errors: $errors.dish
          },
          {},
          {}
        )} ${validate_component(FormSelect, "FormSelect").$$render(
          $$result,
          {
            fieldName: "chef",
            label: "Chef",
            bindValue: $form.chef,
            handleChange,
            errors: $errors.chef
          },
          {},
          {}
        )} ${validate_component(TextAreaInput, "TextAreaInput").$$render(
          $$result,
          {
            fieldName: "recipe",
            label: "Recipe",
            bindValue: $form.recipe,
            handleChange,
            errors: $errors.recipe
          },
          {},
          {}
        )}  <label class="form-control"${add_attribute("for", "cost", 0)}><div class="label"><span class="font-bold">${escape("Meal cost (£)")}</span> <span class="label-text">${$errors.cost ? `<small>${escape($errors.cost)}</small> ` : ``}</span></div> <div class="${escape(null_to_empty(`my-currency-input ${$errors.cost && "my-currency-input-error"}`), true) + " svelte-kqxn9h"}">${validate_component(CurrencyInput, "CurrencyInput").$$render(
          $$result,
          {
            currency: "GBP",
            name: "cost",
            value: $form.cost
          },
          {
            value: ($$value) => {
              $form.cost = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div></label>  <div class="form-control mx-auto my-10 w-full max-w-xs text-center"><img${add_attribute("src", "/default-meal.webp", 0)} alt="photoURL" width="256" height="256" class="mx-auto max-h-52 object-scale-down"> <span class="label-text">${$errors.photoURL ? `<small>${escape($errors.photoURL)}</small> ` : ``}</span> <label for="photoURL" class="label" data-svelte-h="svelte-qouqa7"><span class="label-text">Pick a file</span></label> <input name="photoURL" type="file" class="file-input file-input-bordered w-full max-w-xs" accept="image/png, image/jpeg, image/gif, image/webp"> ${uploading ? `<p data-svelte-h="svelte-be0b5h">Uploading...</p> <progress class="progress progress-info mt-6 w-56"></progress>` : ``}</div> <button type="submit" class="btn btn-primary" data-svelte-h="svelte-5uxpl7">submit</button></form>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_user();
  $$unsubscribe_form();
  $$unsubscribe_userData();
  $$unsubscribe_errors();
  return $$rendered;
});
export {
  Page as default
};
