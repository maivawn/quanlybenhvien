export default function select(
	containerId,
	selectId,
	data = [],
	onChange = () => {},
) {
	const containerDom = document.getElementById(containerId);
	if (!containerDom) return;
	const selectDom = document.createElement("select");
	selectDom.id = selectId;
	selectDom.classList.add("form-control");

	const options = data
		.map((x) => `<option value="${x.id}">${x.name}</option>`)
		.join("");
	selectDom.innerHTML = options;
	containerDom.appendChild(selectDom);
	const select = $(`#${selectId}`);
	select.select2();
	select.on("select2:select", (e) => onChange(e.target.value));
	onChange(data[0].id);
	select["onchange"] = function (value, disabled) {
		select.val(value).trigger("change");
		select.prop("disabled", disabled);
		onChange(value);
	};
	return select;
}
