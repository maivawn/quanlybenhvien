import select from "../../base/components/select/index.js";
import { gender } from "../../base/constant.js";
import { spinner } from "../../layout/layout.js";
import { fillDataToForm, getFormData, resetForm } from "../../utils/data.js";
import { Toast } from "../../utils/toast.js";
import benhNhanService from "../benhnhan/benhNhanService.js";
import nhanVienService from "../nhanvien/nhanVienService.js";
import benhAnService from "./benhanService.js";

const global = {};

async function getListBenhNhan() {
	const benhNhanList = await benhNhanService.searchByCodeName("");
	const benhNhanSelectList = benhNhanList.map((benhNhan) => ({
		id: benhNhan.msbn,
		name: `${benhNhan.msbn} - ${benhNhan.hoTen}`,
	}));

	const getBenhNhan = async (id) => {
		try {
			spinner.show();
			const benhNhan = await benhNhanService.findById(id);
			fillDataToTable("table-benhnhan", benhNhan);
			spinner.hide();
		} catch (err) {
			spinner.hide();
			Toast.error(err.message);
		}
	};
	return select(
		"benhnhan-select-container",
		"benhnhan-select",
		benhNhanSelectList,
		getBenhNhan,
	);
}

async function getListNhanVien() {
	const nhanVienList = await nhanVienService.searchByCodeName("");
	const nhanVienSelectList = nhanVienList.map((benhNhan) => ({
		id: benhNhan.msnv,
		name: `${benhNhan.msnv} - ${benhNhan.hoTen}`,
	}));
	const getNhanVien = async (id) => {
		try {
			spinner.show();
			const nhanVien = await nhanVienService.findById(id);
			fillDataToTable("table-nhanvien", nhanVien);
			spinner.hide();
		} catch (err) {
			spinner.hide();
			Toast.error(err.message);
		}
	};
	return select(
		"nhanvien-select-container",
		"nhanvien-select",
		nhanVienSelectList,
		getNhanVien,
	);
}

function fillDataToTable(tableId, data) {
	document
		.querySelectorAll(`table#${tableId} td[data-field]`)
		.forEach((field) => {
			if (["gioitinh", "gioiTinh"].includes(field.dataset.field)) {
				field.textContent = gender[data[field.dataset.field]] ?? "";
				return;
			}
			field.textContent = data[field.dataset.field] ?? "";
		});
}

async function getBenhAn() {
	const msbaDom = document.querySelector("#msba");
	if (!msbaDom) return;
	try {
		spinner.show();
		const benhAn = await benhAnService.findById(msbaDom.value);
		fillDataToForm(benhAn, "#form-benhan input[name]", true);
		global.selectBenhNhan.onchange(benhAn.msbn, true);
		global.selectNhanVien.onchange(benhAn.msnv, true);
		spinner.hide();
	} catch (err) {
		spinner.hide();
		fillDataToForm({}, "#form-benhan input[name]", false);
		global.selectBenhNhan.prop("disabled", false);
		global.selectNhanVien.prop("disabled", false);
	}
}

async function createBenhAn() {
	const data = {
		...getFormData("#form-benhan input[name]"),
		msnv: global.selectNhanVien.val(),
		msbn: global.selectBenhNhan.val(),
	};

	try {
		spinner.show();
		await benhAnService.createBenhAn(data);
		spinner.hide();
		resetForm("#form-benhan");
		Toast.success("Thêm bệnh án thành công");
	} catch (error) {
		Toast.error(error.message);
		spinner.hide();
	}
}

(async function () {
	const selectBenhNhan = await getListBenhNhan();
	const selectNhanVien = await getListNhanVien();

	global["selectBenhNhan"] = selectBenhNhan;
	global["selectNhanVien"] = selectNhanVien;

	document.getElementById("timba").addEventListener("click", getBenhAn);
	document.getElementById("create").addEventListener("click", createBenhAn);
})();
