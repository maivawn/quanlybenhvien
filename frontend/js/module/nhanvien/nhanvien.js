import nhanVienService from "./nhanVienService.js";
import { Toast } from "../../utils/toast.js";
import { spinner } from "../../layout/layout.js";
import {
	getFormData,
	fillDataToForm,
	fillDataToTable,
	resetForm,
} from "../../utils/data.js";

let mode = "create"; // update

async function renderTableNhanVien() {
	const keysearchDom = document.querySelector("input[name=keyword]");
	spinner.show();
	const nhanvienList = await nhanVienService.searchByCodeName(
		keysearchDom.value,
	);
	const getRow = (benhNhan, index) => `<tr>
		<td>${index + 1}</td> 
		<td>${benhNhan.msnv}</td>
		<td>${benhNhan.hoTen}</td>
		<td>${benhNhan.gioiTinh === "0" ? "Nam" : "Nữ"}</td>
		<td>${benhNhan.ntns}</td>
		<td>${benhNhan.chucVu}</td>
		<td>${benhNhan.sdt}</td>
		<td data-json='${JSON.stringify(benhNhan)}'>
			<i onclick="handleClickEdit(event)" class="fas fa-edit me-3 text-warning"></i>
			<i onclick="handleClickDelete(event)" class="fas fa-trash text-danger"></i>
		</td>
	</tr>`;
	fillDataToTable("#table-nhanvien", nhanvienList, getRow);
	spinner.hide();
}

function handleClickEdit(event) {
	const data = JSON.parse(event.target.parentElement.dataset.json);
	changeMode("update");
	fillDataToForm(data, "form#nhanvien [name]");
}

function handleClickDelete(event) {
	const data = JSON.parse(event.target.parentElement.dataset.json);
	confirmDeleteNhanVien(data);
}

async function confirmDeleteNhanVien(nhanVien) {
	const answer = confirm(`Bạn có chắc chắn muốn xóa: ${nhanVien.hoTen}`);
	if (answer) {
		try {
			spinner.show();
			await nhanVienService.deleteNhanVien(nhanVien.msnv);
			renderTableNhanVien();
			Toast.success("Xóa nhân viên thành công.");
		} catch (err) {
			spinner.hide();
			Toast.error(err.message);
		}
	}
}

async function createNhanVien() {
	if (mode === "update") return;
	const data = getFormData("form#nhanvien [name]");
	const isValid = validateNhanVien(data);
	if (!isValid) return;
	try {
		spinner.show();
		await nhanVienService.createNhanVien(data);
		resetForm("form#nhanvien");
		renderTableNhanVien();
		Toast.success("Thêm nhân viên thành công.");
	} catch (err) {
		spinner.hide();
		Toast.error(err.message);
	}
}

async function updateNhanVien() {
	if (mode === "create") return;
	const data = getFormData("form#nhanvien [name]");
	const isValid = validateNhanVien(data);
	if (!isValid) return;
	try {
		spinner.show();
		await nhanVienService.updateNhanVien(data);
		resetForm("form#nhanvien");
		changeMode("create");
		renderTableNhanVien();
		Toast.success("Cập nhật nhân viên thành công.");
	} catch (err) {
		spinner.hide();
		Toast.error(err.message);
	}
}

function validateNhanVien(benhNhan) {
	return true;
}

function changeMode(m) {
	mode = m;
	const buttonCreateDom = document.getElementById("create");
	buttonCreateDom.disabled = mode === "update";

	const buttonUpdateDom = document.getElementById("update");
	buttonUpdateDom.disabled = mode === "create";

	document.querySelector("input[name=msnv]").disabled = mode === "update";
}

(function () {
	const buttonCreateDom = document.getElementById("create");
	buttonCreateDom?.addEventListener("click", createNhanVien);

	const buttonUpdateDom = document.getElementById("update");
	buttonUpdateDom?.addEventListener("click", updateNhanVien);

	const buttonSearchDom = document.getElementById("timkiem");
	buttonSearchDom?.addEventListener("click", renderTableNhanVien);

	const formNhanVienDom = document.querySelector("form#nhanvien");
	formNhanVienDom.addEventListener("reset", () => {
		changeMode("create");
	});
	renderTableNhanVien();
	window.handleClickEdit = handleClickEdit;
	window.handleClickDelete = handleClickDelete;
})();
