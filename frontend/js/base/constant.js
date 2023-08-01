export const menus = [
	{
		name: "Trang chủ",
		link: "index.html",
		code: "TRANG_CHU",
	},
	{
		name: "Bệnh nhân",
		link: "benhnhan.html",
		code: "BENH_NHAN",
		permissions: ["Bác sĩ", "Phó khoa", "Trưởng khoa", "Y tá"],
	},
	{
		name: "Nhân viên",
		link: "nhanvien.html",
		code: "NHAN_VIEN",
		permissions: ["Phó khoa", "Trưởng khoa"],
	},
	{
		name: "Thanh toán",
		link: "thanhtoan.html",
		code: "THANH_TOAN",
		permissions: ["Thu ngân", "Phó khoa", "Trưởng khoa"],
	},
	{
		name: "Bệnh án",
		link: "benhan.html",
		code: "BENH_AN",
		permissions: ["Bác sĩ", "Phó khoa", "Trưởng khoa"],
	},
	{
		name: "Chi tiết thanh toán",
		link: "chitietthanhtoan.html",
		code: "CHI_TIET_THANH_TOAN",
		permissions: ["Thu ngân", "Phó khoa", "Trưởng khoa"],
	},
	{
		name: "Dịch vụ",
		link: "dichvu.html",
		code: "DICH_VU",
		permissions: ["Phó khoa", "Trưởng khoa"],
	},
	{
		name: "Đăng nhập",
		link: "#login",
		code: "DANG_NHAP",
	},
	{
		name: "Đăng xuất",
		link: "dangxuat.html",
		code: "DANG_XUAT",
	},
];

export const gender = {
	0: "Nam",
	1: "Nữ",
};
