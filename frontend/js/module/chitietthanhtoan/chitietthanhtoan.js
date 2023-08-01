import thanhToanService from "../thanhtoan/thanhToanService.js";
import chiTietThanhToanService from "./chiTietThanhToanService.js";
import dichVuService from "../dichvu/dichVuService.js";
import benhNhanService from "../benhnhan/benhNhanService.js";
import { spinner } from "../../layout/layout.js";
import { Toast } from "../../utils/toast.js";
import select from "../../base/components/select/index.js";
import { gender } from "../../base/constant.js";

async function getThanhToanById(dichVuSelect) {
	const mttDom = document.querySelector("input[name=mtt]");
	if (!mttDom) return;
	try {
		spinner.show();
		const thanhToan = await thanhToanService.findById(mttDom.value);
		await getDataChiTiet(thanhToan);
		spinner.hide();
	} catch (error) {
		Toast.error(error.message);
		spinner.hide();
	}
}

async function getDataChiTiet(thanhToan) {
	document.querySelector("input[name=mtt]").value = thanhToan.mtt;
	const chiTietThanhToan = await chiTietThanhToanService.findByThanhToanId(
		thanhToan.mtt,
	);
	const benhNhan = await benhNhanService.findById(thanhToan.msbn);
	fillDataBenhNhan(benhNhan);
	if (chiTietThanhToan?.[0]) {
		const data = chiTietThanhToan?.[0];
		dichVuSelect.onchange(data.id.msdv, true);
		const soLuongDom = document.querySelector("input[name=soluong]");
		soLuongDom.value = data.soluong;
		soLuongDom.disabled = true;
		calculateTotalPrice(dichVuSelect.val());
		document.getElementById("button").innerHTML = "";
	} else {
		appendThanhToanButton(mttDom.value);
		dichVuSelect.prop("disabled", false);
		const soLuongDom = document.querySelector("input[name=soluong]");
		soLuongDom.value = "";
		soLuongDom.disabled = false;
		calculateTotalPrice(dichVuSelect.val());
	}
}

async function getListDichVu() {
	const dichVulist = await dichVuService.searchByCodeName("");
	const dichVuSelectList = dichVulist.map((dichVu) => ({
		id: dichVu.msdv,
		name: `${dichVu.msdv} - ${dichVu.tendv}`,
	}));
	return select("dichvu-select-container", "dichvu-select", dichVuSelectList);
}

async function calculateTotalPrice(dichVuId) {
	spinner.show();
	const result = await dichVuService.findById(dichVuId);
	spinner.hide();
	const soLuongDom = document.querySelector("input[name=soluong]");
	const total = result.dongia * (soLuongDom.valueAsNumber ?? 0);
	document.querySelector("input[name=tongtien]").value =
		new Intl.NumberFormat("en-Us").format(total);
}

function appendThanhToanButton(mtt) {
	document.getElementById(
		"button",
	).innerHTML = `<input onclick="checkout('${mtt}')" type="submit" value=" Thanh toán ">`;
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

async function checkout(dichVuSelect, mtt) {
	const soluongDom = document.querySelector("input[name=soluong]");
	try {
		spinner.show();
		await chiTietThanhToanService.createChiTiet({
			id: {
				mtt,
				msdv: dichVuSelect.val(),
			},
			soluong: soluongDom.valueAsNumber,
		});
		Toast.success("Thanh toán thành công");
		spinner.hide();
	} catch (err) {
		spinner.hide();
		Toast.error(err.message);
	}
}

(async function () {
	const dichVuSelect = await getListDichVu();
	const timKiemButtonDom = document.getElementById("timtt");
	timKiemButtonDom?.addEventListener("click", () => {
		getThanhToanById(dichVuSelect);
	});

	document.getElementById("tinhtong").addEventListener("click", () => {
		calculateTotalPrice(dichVuSelect.val());
	});
	document
		.querySelector("input[name=mtt]")
		.addEventListener("keydown", () => {
			document.getElementById("button").innerHTML = "";
		});
	window.checkout = (mtt) => checkout(dichVuSelect, mtt);
	const urlParams = new URLSearchParams(window.location.search);
	const json = urlParams.get("json");
	if (json) {
		const thanhToan = JSON.parse(window.atob(json));
		getDataChiTiet(thanhToan);
		appendThanhToanButton(thanhToan.mtt);
	}
})();
