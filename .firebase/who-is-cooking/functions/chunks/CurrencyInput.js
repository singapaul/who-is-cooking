import { c as create_ssr_component, a as add_attribute, e as escape } from './ssr.js';
import { w as writable, d as derived } from './index2.js';
import { dequal } from 'dequal/lite';
import { g as get_store_value, n as null_to_empty } from './utils.js';
const FormInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { fieldName = 'fieldName' } = $$props;
	let { handleChange = () => console.log('pressed') } = $$props;
	let { errors } = $$props;
	let { bindValue } = $$props;
	let { label } = $$props;
	if ($$props.fieldName === void 0 && $$bindings.fieldName && fieldName !== void 0)
		$$bindings.fieldName(fieldName);
	if ($$props.handleChange === void 0 && $$bindings.handleChange && handleChange !== void 0)
		$$bindings.handleChange(handleChange);
	if ($$props.errors === void 0 && $$bindings.errors && errors !== void 0)
		$$bindings.errors(errors);
	if ($$props.bindValue === void 0 && $$bindings.bindValue && bindValue !== void 0)
		$$bindings.bindValue(bindValue);
	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	return `<label class="form-control"${add_attribute('for', fieldName, 0)}><div class="label"><span class="font-bold">${escape(label)}</span> <span class="label-text">${errors ? `<small>${escape(errors)}</small> ` : ``}</span></div> <input type="text" placeholder="Dish name..." class="input input-bordered w-full"${add_attribute('id', fieldName, 0)}${add_attribute('value', bindValue, 0)}></label>`;
});
function subscribeOnce(observable) {
	return new Promise((resolve) => {
		observable.subscribe(resolve)();
	});
}
function update(object, path, value) {
	object.update((o) => {
		set(o, path, value);
		return o;
	});
}
function cloneDeep(object) {
	return JSON.parse(JSON.stringify(object));
}
function isNullish(value) {
	return value === void 0 || value === null;
}
function isEmpty(object) {
	return isNullish(object) || Object.keys(object).length <= 0;
}
function getValues(object) {
	let results = [];
	for (const [, value] of Object.entries(object)) {
		const values = typeof value === 'object' ? getValues(value) : [value];
		results = [...results, ...values];
	}
	return results;
}
function getErrorsFromSchema(initialValues, schema, errors = {}) {
	for (const key in schema) {
		switch (true) {
			case schema[key].type === 'object' && !isEmpty(schema[key].fields): {
				errors[key] = getErrorsFromSchema(initialValues[key], schema[key].fields, {
					...errors[key]
				});
				break;
			}
			case schema[key].type === 'array': {
				const values = initialValues && initialValues[key] ? initialValues[key] : [];
				errors[key] = values.map((value) => {
					const innerError = getErrorsFromSchema(value, schema[key].innerType.fields, {
						...errors[key]
					});
					return Object.keys(innerError).length > 0 ? innerError : '';
				});
				break;
			}
			default: {
				errors[key] = '';
			}
		}
	}
	return errors;
}
const deepEqual = dequal;
function assignDeep(object, value) {
	if (Array.isArray(object)) {
		return object.map((o) => assignDeep(o, value));
	}
	const copy = {};
	for (const key in object) {
		copy[key] =
			typeof object[key] === 'object' && !isNullish(object[key])
				? assignDeep(object[key], value)
				: value;
	}
	return copy;
}
function set(object, path, value) {
	if (new Object(object) !== object) return object;
	if (!Array.isArray(path)) {
		path = path.toString().match(/[^.[\]]+/g) || [];
	}
	const result = path
		.slice(0, -1)
		.reduce(
			(accumulator, key, index) =>
				new Object(accumulator[key]) === accumulator[key]
					? accumulator[key]
					: (accumulator[key] =
							Math.trunc(Math.abs(path[index + 1])) === +path[index + 1] ? [] : {}),
			object
		);
	result[path[path.length - 1]] = value;
	return object;
}
const util = {
	assignDeep,
	cloneDeep,
	deepEqual,
	getErrorsFromSchema,
	getValues,
	isEmpty,
	isNullish,
	set,
	subscribeOnce,
	update
};
const NO_ERROR = '';
const IS_TOUCHED = true;
function isCheckbox(element) {
	return element.getAttribute && element.getAttribute('type') === 'checkbox';
}
function isFileInput(element) {
	return element.getAttribute && element.getAttribute('type') === 'file';
}
function resolveValue(element) {
	if (isFileInput(element)) {
		return element.files;
	} else if (isCheckbox(element)) {
		return element.checked;
	} else {
		return element.value;
	}
}
const createForm = (config) => {
	let initialValues = config.initialValues || {};
	const validationSchema = config.validationSchema;
	const validateFunction = config.validate;
	const onSubmit = config.onSubmit;
	const getInitial = {
		values: () => util.cloneDeep(initialValues),
		errors: () =>
			validationSchema
				? util.getErrorsFromSchema(initialValues, validationSchema.fields)
				: util.assignDeep(initialValues, NO_ERROR),
		touched: () => util.assignDeep(initialValues, !IS_TOUCHED)
	};
	const form = writable(getInitial.values());
	const errors = writable(getInitial.errors());
	const touched = writable(getInitial.touched());
	const isSubmitting = writable(false);
	const isValidating = writable(false);
	const isValid = derived(errors, ($errors) => {
		const noErrors = util.getValues($errors).every((field) => field === NO_ERROR);
		return noErrors;
	});
	const modified = derived(form, ($form) => {
		const object = util.assignDeep($form, false);
		for (let key in $form) {
			object[key] = !util.deepEqual($form[key], initialValues[key]);
		}
		return object;
	});
	const isModified = derived(modified, ($modified) => {
		return util.getValues($modified).includes(true);
	});
	function validateField(field) {
		return util.subscribeOnce(form).then((values) => validateFieldValue(field, values[field]));
	}
	function validateFieldValue(field, value) {
		updateTouched(field, true);
		if (validationSchema) {
			isValidating.set(true);
			return validationSchema
				.validateAt(field, get_store_value(form))
				.then(() => util.update(errors, field, ''))
				.catch((error) => util.update(errors, field, error.message))
				.finally(() => {
					isValidating.set(false);
				});
		}
		if (validateFunction) {
			isValidating.set(true);
			return Promise.resolve()
				.then(() => validateFunction({ [field]: value }))
				.then((errs) => util.update(errors, field, !util.isNullish(errs) ? errs[field] : ''))
				.finally(() => {
					isValidating.set(false);
				});
		}
		return Promise.resolve();
	}
	function updateValidateField(field, value) {
		updateField(field, value);
		return validateFieldValue(field, value);
	}
	function handleChange(event) {
		const element = event.target;
		const field = element.name || element.id;
		const value = resolveValue(element);
		return updateValidateField(field, value);
	}
	function handleSubmit(event) {
		if (event && event.preventDefault) {
			event.preventDefault();
		}
		isSubmitting.set(true);
		return util.subscribeOnce(form).then((values) => {
			if (typeof validateFunction === 'function') {
				isValidating.set(true);
				return Promise.resolve()
					.then(() => validateFunction(values))
					.then((error) => {
						if (util.isNullish(error) || util.getValues(error).length === 0) {
							return clearErrorsAndSubmit(values);
						} else {
							errors.set(error);
							isSubmitting.set(false);
						}
					})
					.finally(() => isValidating.set(false));
			}
			if (validationSchema) {
				isValidating.set(true);
				return validationSchema
					.validate(values, { abortEarly: false })
					.then(() => clearErrorsAndSubmit(values))
					.catch((yupErrors) => {
						if (yupErrors && yupErrors.inner) {
							const updatedErrors = getInitial.errors();
							yupErrors.inner.map((error) => util.set(updatedErrors, error.path, error.message));
							errors.set(updatedErrors);
						}
						isSubmitting.set(false);
					})
					.finally(() => isValidating.set(false));
			}
			return clearErrorsAndSubmit(values);
		});
	}
	function handleReset() {
		form.set(getInitial.values());
		errors.set(getInitial.errors());
		touched.set(getInitial.touched());
	}
	function clearErrorsAndSubmit(values) {
		return Promise.resolve()
			.then(() => errors.set(getInitial.errors()))
			.then(() => onSubmit(values, form, errors))
			.finally(() => isSubmitting.set(false));
	}
	function updateField(field, value) {
		util.update(form, field, value);
	}
	function updateTouched(field, value) {
		util.update(touched, field, value);
	}
	function updateInitialValues(newValues) {
		initialValues = newValues;
		handleReset();
	}
	return {
		form,
		errors,
		touched,
		modified,
		isValid,
		isSubmitting,
		isValidating,
		isModified,
		handleChange,
		handleSubmit,
		handleReset,
		updateField,
		updateValidateField,
		updateTouched,
		validateField,
		updateInitialValues,
		state: derived(
			[form, errors, touched, modified, isValid, isValidating, isSubmitting, isModified],
			([
				$form,
				$errors,
				$touched,
				$modified,
				$isValid,
				$isValidating,
				$isSubmitting,
				$isModified
			]) => ({
				form: $form,
				errors: $errors,
				touched: $touched,
				modified: $modified,
				isValid: $isValid,
				isSubmitting: $isSubmitting,
				isValidating: $isValidating,
				isModified: $isModified
			})
		)
	};
};
const FormSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { fieldName = 'fieldName' } = $$props;
	let { handleChange = () => console.log('pressed') } = $$props;
	let { errors } = $$props;
	let { bindValue } = $$props;
	let { label } = $$props;
	if ($$props.fieldName === void 0 && $$bindings.fieldName && fieldName !== void 0)
		$$bindings.fieldName(fieldName);
	if ($$props.handleChange === void 0 && $$bindings.handleChange && handleChange !== void 0)
		$$bindings.handleChange(handleChange);
	if ($$props.errors === void 0 && $$bindings.errors && errors !== void 0)
		$$bindings.errors(errors);
	if ($$props.bindValue === void 0 && $$bindings.bindValue && bindValue !== void 0)
		$$bindings.bindValue(bindValue);
	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	return `<label${add_attribute('for', fieldName, 0)} class="form-control w-full"><div class="label"><span class="font-bold">${escape(label)}</span> <span class="label-text">${errors ? `<small>${escape(errors)}</small> ` : ``}</span></div> <select${add_attribute('class', `select select-bordered ${errors && `select-error`}`, 0)}${add_attribute('id', fieldName, 0)}><option disabled selected value="Pick one" data-svelte-h="svelte-8xjvh6">Pick one</option><option value="Hugo" data-svelte-h="svelte-3xqa46">Hugo</option><option value="James" data-svelte-h="svelte-niwdpi">James</option><option value="Matt" data-svelte-h="svelte-13n45z6">Matt</option><option value="Rob" data-svelte-h="svelte-t6hlj8">Rob</option><option value="Henry" data-svelte-h="svelte-1wv4ek6">Henry</option><option value="Pelayo" data-svelte-h="svelte-1b3szsm">Pelayo</option><option value="Paul" data-svelte-h="svelte-14bpqh6">Paul</option></select></label>`;
});
const TextAreaInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { fieldName = 'fieldName' } = $$props;
	let { handleChange = () => console.log('pressed') } = $$props;
	let { errors } = $$props;
	let { bindValue } = $$props;
	let { label } = $$props;
	if ($$props.fieldName === void 0 && $$bindings.fieldName && fieldName !== void 0)
		$$bindings.fieldName(fieldName);
	if ($$props.handleChange === void 0 && $$bindings.handleChange && handleChange !== void 0)
		$$bindings.handleChange(handleChange);
	if ($$props.errors === void 0 && $$bindings.errors && errors !== void 0)
		$$bindings.errors(errors);
	if ($$props.bindValue === void 0 && $$bindings.bindValue && bindValue !== void 0)
		$$bindings.bindValue(bindValue);
	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	return `<label class="form-control"><div class="label"><span class="font-bold">${escape(label)}</span> <span class="label-text">${errors ? `<small>${escape(errors)}</small> ` : ``}</span></div> <textarea class="textarea textarea-bordered h-24" placeholder="Please enter a short description of the recipe or a link to the recipe used"${add_attribute('id', fieldName, 0)}>${escape(bindValue || '')}</textarea></label>`;
});
const css = {
	code: 'input.currencyInput__formatted.svelte-n0twf6{border:1px solid #e2e2e2;padding:10px;box-sizing:border-box}input.currencyInput__formatted--zero.svelte-n0twf6{color:#333}input.currencyInput__formatted--positive.svelte-n0twf6{color:#00a36f}input.currencyInput__formatted--negative.svelte-n0twf6{color:#e75258}input.currencyInput__formatted.svelte-n0twf6:disabled{color:#999;background-color:#e2e2e2;pointer-events:none;cursor:default}',
	map: null
};
const DEFAULT_LOCALE = 'en-US';
const DEFAULT_CURRENCY = 'USD';
const DEFAULT_NAME = 'total';
const DEFAULT_VALUE = 0;
const DEFAULT_FRACTION_DIGITS = 2;
const DEFAULT_CLASS_WRAPPER = 'currencyInput';
const DEFAULT_CLASS_UNFORMATTED = 'currencyInput__unformatted';
const DEFAULT_CLASS_FORMATTED = 'currencyInput__formatted';
const DEFAULT_CLASS_FORMATTED_POSITIVE = 'currencyInput__formatted--positive';
const DEFAULT_CLASS_FORMATTED_NEGATIVE = 'currencyInput__formatted--negative';
const DEFAULT_CLASS_FORMATTED_ZERO = 'currencyInput__formatted--zero';
const CurrencyInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let isNegative;
	let isPositive;
	let isZero;
	let { value = DEFAULT_VALUE } = $$props;
	let { locale = DEFAULT_LOCALE } = $$props;
	let { currency = DEFAULT_CURRENCY } = $$props;
	let { name = DEFAULT_NAME } = $$props;
	let { required = false } = $$props;
	let { disabled = false } = $$props;
	let { placeholder = DEFAULT_VALUE } = $$props;
	let { autocomplete = void 0 } = $$props;
	let { isNegativeAllowed = true } = $$props;
	let { isZeroNullish = false } = $$props;
	let { fractionDigits = DEFAULT_FRACTION_DIGITS } = $$props;
	let { inputClasses = null } = $$props;
	let { onValueChange = () => {} } = $$props;
	const formatCurrency = (value2, maximumFractionDigits, minimumFractionDigits) => {
		return new Intl.NumberFormat(locale, {
			currency,
			style: 'currency',
			maximumFractionDigits: maximumFractionDigits || 0,
			minimumFractionDigits: minimumFractionDigits || 0
		}).format(value2);
	};
	let inputElement;
	new Intl.NumberFormat(locale).format(1.1).charAt(1);
	formatCurrency(0, 0)
		.replace('0', '')
		.replace(/\u00A0/, '');
	const handlePlaceholder = (placeholder2) => {
		if (typeof placeholder2 === 'number')
			return formatCurrency(placeholder2, fractionDigits, fractionDigits);
		if (placeholder2 === null) return '';
		return placeholder2;
	};
	let formattedValue = '';
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
		$$bindings.locale(locale);
	if ($$props.currency === void 0 && $$bindings.currency && currency !== void 0)
		$$bindings.currency(currency);
	if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
	if ($$props.required === void 0 && $$bindings.required && required !== void 0)
		$$bindings.required(required);
	if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
		$$bindings.disabled(disabled);
	if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
		$$bindings.placeholder(placeholder);
	if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
		$$bindings.autocomplete(autocomplete);
	if (
		$$props.isNegativeAllowed === void 0 &&
		$$bindings.isNegativeAllowed &&
		isNegativeAllowed !== void 0
	)
		$$bindings.isNegativeAllowed(isNegativeAllowed);
	if ($$props.isZeroNullish === void 0 && $$bindings.isZeroNullish && isZeroNullish !== void 0)
		$$bindings.isZeroNullish(isZeroNullish);
	if ($$props.fractionDigits === void 0 && $$bindings.fractionDigits && fractionDigits !== void 0)
		$$bindings.fractionDigits(fractionDigits);
	if ($$props.inputClasses === void 0 && $$bindings.inputClasses && inputClasses !== void 0)
		$$bindings.inputClasses(inputClasses);
	if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
		$$bindings.onValueChange(onValueChange);
	$$result.css.add(css);
	isNegative = value < 0;
	isPositive = value > 0;
	isZero = !isNegative && !isPositive;
	return `<div${add_attribute('class', inputClasses?.wrapper ?? DEFAULT_CLASS_WRAPPER, 0)}><input class="${escape(null_to_empty(inputClasses?.unformatted ?? DEFAULT_CLASS_UNFORMATTED), true) + ' svelte-n0twf6'}" type="hidden"${add_attribute('name', name, 0)} ${disabled ? 'disabled' : ''}${add_attribute('value', value, 0)}> <input class="${
		'' +
		escape(inputClasses?.formatted ?? DEFAULT_CLASS_FORMATTED, true) +
		' ' +
		escape(
			isNegativeAllowed && !isZero && !isNegative
				? inputClasses?.formattedPositive ?? DEFAULT_CLASS_FORMATTED_POSITIVE
				: '',
			true
		) +
		' ' +
		escape(isZero ? inputClasses?.formattedZero ?? DEFAULT_CLASS_FORMATTED_ZERO : '', true) +
		' ' +
		escape(
			isNegativeAllowed && isNegative
				? inputClasses?.formattedNegative ?? DEFAULT_CLASS_FORMATTED_NEGATIVE
				: '',
			true
		) +
		' svelte-n0twf6'
	}" type="text"${add_attribute('inputmode', fractionDigits > 0 ? 'decimal' : 'numeric', 0)}${add_attribute('name', `formatted-${name}`, 0)} ${required && !isZero ? 'required' : ''}${add_attribute('placeholder', handlePlaceholder(placeholder), 0)}${add_attribute('autocomplete', autocomplete, 0)} ${disabled ? 'disabled' : ''}${add_attribute('this', inputElement, 0)}${add_attribute('value', formattedValue, 0)}> </div>`;
});
export { CurrencyInput as C, FormInput as F, TextAreaInput as T, FormSelect as a, createForm as c };
