import benhNhanService from "./benhNhanService.js";
import { Toast } from "../../utils/toast.js";
import { spinner } from "../../layout/layout.js";
import {
	getFormData,
	fillDataToForm,
	fillDataToTable,
	resetForm,
} from "../../utils/data.js";

let mode = "create"; // update

async function renderTableBenhNhan() {
	const keysearchDom = document.querySelector("input[name=keyword]");
	spinner.show();
	const benhNhanList = await benhNhanService.searchByCodeName(
		keysearchDom.value,
	);
	const getRow = (benhNhan, index) => `<tr>
		<td>${index + 1}</td> 
		<td>${benhNhan.msbn}</td>
		<td>${benhNhan.hoTen}</td>
		<td>${benhNhan.gioitinh === "0" ? "Nam" : "Nữ"}</td>
		<td>${benhNhan.ntns}</td>
		<td>${benhNhan.cccd}</td>
		<td>${benhNhan.sdt}</td>
		<td>${benhNhan.thongtinsuckhoe}</td>
		<td data-json='${JSON.stringify(benhNhan)}'>
			<i onclick="handleClickEdit(event)" class="fas fa-edit me-3 text-warning"></i>
			<i onclick="handleClickDelete(event)" class="fas fa-trash text-danger"></i>
		</td>
	</tr>`;
	fillDataToTable("#table-benhnhan", benhNhanList, getRow);
	spinner.hide();
}

function handleClickEdit(event) {
	const data = JSON.parse(event.target.parentElement.dataset.json);
	changeMode("update");
	fillDataToForm(data, "form#benhnhan [name]");
}

function handleClickDelete(event) {
	const data = JSON.parse(event.target.parentElement.dataset.json);
	confirmDeleteBenhNhan(data);
}

async function confirmDeleteBenhNhan(benhNhan) {
	const answer = confirm(`Bạn có chắc chắn muốn xóa: ${benhNhan.hoTen}`);
	if (answer) {
		try {
			spinner.show();
			await benhNhanService.deleteBenhNhan(benhNhan.msbn);
			renderTableBenhNhan();
			Toast.success("Xóa bệnh nhân thành công.");
		} catch (err) {
			spinner.hide();
			Toast.error(err.message);
		}
	}
}

async function createBenhNhan() {
	if (mode === "update") return;
	const data = getFormData("form#benhnhan [name]");
	const isValid = validateBenhNhan(data);
	if (!isValid) return;
	try {
		spinner.show();
		await benhNhanService.createBenhNhan(data);
		resetForm("form#benhnhan");
		renderTableBenhNhan();
		Toast.success("Thêm bệnh nhân thành công.");
	} catch (err) {
		spinner.hide();
		Toast.error(err.message);
	}
}

async function updateBenhNhan() {
	if (mode === "create") return;
	const data = getFormData("form#benhnhan [name]");
	const isValid = validateBenhNhan(data);
	if (!isValid) return;
	try {
		spinner.show();
		await benhNhanService.updateBenhNhan(data);
		resetForm("form#benhnhan");
		changeMode("create");
		renderTableBenhNhan();
		Toast.success("Cập nhật bệnh nhân thành công.");
	} catch (err) {
		spinner.hide();
		Toast.error(err.message);
	}
}

function validateBenhNhan(benhNhan) {
	return true;
}

function changeMode(m) {
	mode = m;
	const buttonCreateDom = document.getElementById("create");
	buttonCreateDom.disabled = mode === "update";

	const buttonUpdateDom = document.getElementById("update");
	buttonUpdateDom.disabled = mode === "create";

	document.querySelector("input[name=msbn]").disabled = mode === "update";
}

(function () {
	const buttonCreateDom = document.getElementById("create");
	buttonCreateDom?.addEventListener("click", createBenhNhan);

	const buttonUpdateDom = document.getElementById("update");
	buttonUpdateDom?.addEventListener("click", updateBenhNhan);

	const buttonSearchDom = document.getElementById("timkiem");
	buttonSearchDom?.addEventListener("click", renderTableBenhNhan);

	const formBenhNhanDom = document.querySelector("form#benhnhan");
	formBenhNhanDom.addEventListener("reset", () => {
		changeMode("create");
	});
	renderTableBenhNhan();
	window.handleClickEdit = handleClickEdit;
	window.handleClickDelete = handleClickDelete;
})();
