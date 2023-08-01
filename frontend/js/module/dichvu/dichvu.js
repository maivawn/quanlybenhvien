import dichVuService from "./dichVuService.js";
import { Toast } from "../../utils/toast.js";
import { spinner } from "../../layout/layout.js";
import {
	getFormData,
	fillDataToForm,
	fillDataToTable,
	resetForm,
} from "../../utils/data.js";

let mode = "create"; // update

async function renderTableDichVu() {
	const keysearchDom = document.querySelector("input[name=keyword]");
	spinner.show();
	const dichVuList = await dichVuService.searchByCodeName(keysearchDom.value);
	const getRow = (dichVu, index) => `<tr>
		<td>${index + 1}</td> 
		<td>${dichVu.msdv}</td>
		<td>${dichVu.tendv}</td>
		<td>${new Intl.NumberFormat("en-US").format(dichVu.dongia)}</td>
		<td data-json='${JSON.stringify(dichVu)}'>
			<i onclick="handleClickEdit(event)" class="fas fa-edit me-3 text-warning"></i>
		</td>
	</tr>`;
	fillDataToTable("#table-dichvu", dichVuList, getRow);
	spinner.hide();
}

function handleClickEdit(e) {
	const data = JSON.parse(e.target.parentElement.dataset.json);
	changeMode("update");
	fillDataToForm(data, "form#dichVu [name]");
}

async function createDichVu() {
	if (mode === "update") return;
	const data = getFormData("form#dichVu input[name]");
	const isValid = validateDichVu(data);
	if (!isValid) return;
	try {
		spinner.show();
		await dichVuService.createDichVu(data);
		resetForm("form#dichVu");
		renderTableDichVu();
		Toast.success("Thêm dịch vụ thành công.");
	} catch (err) {
		spinner.hide();
		Toast.error(err.message);
	}
}

async function updateDichVu() {
	if (mode === "create") return;
	const data = getFormData("form#dichVu [name]");
	const isValid = validateDichVu(data);
	if (!isValid) return;
	try {
		spinner.show();
		await dichVuService.updateDichVu(data);
		resetForm("form#dichVu");
		changeMode("create");
		renderTableDichVu();
		Toast.success("Cập nhật dịch vụ thành công.");
	} catch (err) {
		spinner.hide();
		Toast.error(err.message);
	}
}

function validateDichVu(dichvu) {
	return true;
}

function changeMode(m) {
	mode = m;
	const buttonCreateDom = document.getElementById("create");
	buttonCreateDom.disabled = mode === "update";

	const buttonUpdateDom = document.getElementById("update");
	buttonUpdateDom.disabled = mode === "create";

	document.querySelector("input[name=msdv]").disabled = mode === "update";
}

(function () {
	const buttonCreateDom = document.getElementById("create");
	buttonCreateDom?.addEventListener("click", createDichVu);

	const buttonUpdateDom = document.getElementById("update");
	buttonUpdateDom?.addEventListener("click", updateDichVu);

	const buttonSearchDom = document.getElementById("timkiem");
	buttonSearchDom?.addEventListener("click", renderTableDichVu);

	renderTableDichVu();
	window.handleClickEdit = handleClickEdit;
})();
