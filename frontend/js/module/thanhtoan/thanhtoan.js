import select from "../../base/components/select/index.js";
import { gender } from "../../base/constant.js";
import { spinner } from "../../layout/layout.js";
import { resetForm } from "../../utils/data.js";
import { Toast } from "../../utils/toast.js";
import benhNhanService from "../benhnhan/benhNhanService.js";
import nhanVienService from "../nhanvien/nhanVienService.js";
import thanhToanService from "./thanhToanService.js";

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
			fillDataBenhNhan(benhNhan);
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

	return select(
		"nhanvien-select-container",
		"nhanvien-select",
		nhanVienSelectList,
	);
}

function fillDataBenhNhan(benhNhan) {
	document.querySelectorAll("table td[data-field]").forEach((field) => {
		if (field.dataset.field === "gioitinh") {
			field.textContent = gender[benhNhan[field.dataset.field]] ?? "";
			return;
		}
		field.textContent = benhNhan[field.dataset.field] ?? "";
	});
}

async function getThanhToanById(selectNhanVien, selectBenhNhan) {
	const mttDom = document.querySelector("input[name=mtt]");
	if (!mttDom) return;
	if (!mttDom.value) {
		Toast.error("Vui lòng nhập mã thanh toán");
		return;
	}
	const ngayThanhToanDom = document.querySelector(
		"input[name=ngaythanhtoan]",
	);
	try {
		spinner.show();
		const thanhToan = await thanhToanService.findById(mttDom.value);
		spinner.hide();
		ngayThanhToanDom.disabled = true;
		ngayThanhToanDom.value = thanhToan.ngaythanhtoan;
		selectBenhNhan.onchange(thanhToan.msbn, true);
		selectNhanVien.onchange(thanhToan.msnv, true);
		appendShowDetailButton(mttDom.value);
	} catch (err) {
		spinner.hide();
		appendCreateButton(mttDom.value);
		ngayThanhToanDom.disabled = false;
		ngayThanhToanDom.value = "";
		selectBenhNhan.prop("disabled", false);
		selectNhanVien.prop("disabled", false);
	}
}

function appendCreateButton(mtt) {
	const buttonContainerDom = document.getElementById("button");
	if (!buttonContainerDom) return;
	buttonContainerDom.innerHTML = `<input onclick="createThanhToan('${mtt}')" class="me-0" style="float: none" type="button" value="Tạo hóa đơn">`;
}

function appendShowDetailButton(mtt) {
	const buttonContainerDom = document.getElementById("button");
	if (!buttonContainerDom) return;
	buttonContainerDom.innerHTML = `<input onclick="navigateToChiTiet('${mtt}')" class="me-0" style="float: none" type="button" value="Chi tiết  thanh toán">`;
}

async function createThanhToan(thanhToan) {
	try {
		spinner.show();
		await thanhToanService.createThanhToan(thanhToan);
		Toast.success("Tạo thanh toán thành công");
		resetForm("form#thanhtoan");
		spinner.hide();
		setTimeout(() => {
			navigateToChiTiet(thanhToan);
		}, 500);
	} catch (err) {
		spinner.hide();
		Toast.error(err.message);
	}
}

function navigateToChiTiet(thanhToan) {
	window.location.href =
		"./chitietthanhtoan.html?" +
		new URLSearchParams({ json: window.btoa(JSON.stringify(thanhToan)) });
}

(async function () {
	const ngayThanhToanDom = document.querySelector(
		"input[name=ngaythanhtoan]",
	);
	const selectBenhNhan = await getListBenhNhan();
	const selectNhanVien = await getListNhanVien();
	const timThanhToanDom = document.getElementById("timtt");
	timThanhToanDom.addEventListener("click", () =>
		getThanhToanById(selectNhanVien, selectBenhNhan),
	);
	const formThanhToanDom = document.querySelector("form#thanhtoan");
	formThanhToanDom.addEventListener("reset", () => {
		selectBenhNhan.prop("disabled", false);
		selectNhanVien.prop("disabled", false);
		ngayThanhToanDom.disabled = false;
		const buttonContainerDom = document.getElementById("button");
		buttonContainerDom.innerHTML = "";
	});
	window.navigateToChiTiet = function (mtt) {
		navigateToChiTiet({
			mtt: mtt,
			ngaythanhtoan: ngayThanhToanDom.value,
			msnv: selectNhanVien.val(),
			msbn: selectBenhNhan.val(),
		});
	};
	window.createThanhToan = function (mtt) {
		createThanhToan({
			mtt: mtt,
			ngaythanhtoan: ngayThanhToanDom.value,
			msnv: selectNhanVien.val(),
			msbn: selectBenhNhan.val(),
		});
	};
})();
