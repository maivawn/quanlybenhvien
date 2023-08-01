export function getFormData(selector) {
	const dataDoms = document.querySelectorAll(selector);
	const data = {};
	if (dataDoms) {
		dataDoms.forEach((input) => (data[input.name] = input.value));
	}
	return data;
}

export function fillDataToForm(data, selector, disabled = false) {
	const dataDoms = document.querySelectorAll(selector);
	if (dataDoms) {
		dataDoms.forEach((input) => {
			if (!input.dataset.nonfill) {
				input.value = data[input.name] ?? "";
			}
			input.disabled = disabled && !input.dataset.notdis;
		});
	}
}

export function fillDataToTable(selector, data, getRow) {
	const tbodyDom = document.querySelector(`${selector} tbody`);
	tbodyDom.innerHTML = "";
	if (data && data.length > 0) {
		tbodyDom.innerHTML = data.map(getRow).join("");
	}
}

export function resetForm(selector) {
	const formDom = document.querySelector(selector);
	formDom?.reset();
}
