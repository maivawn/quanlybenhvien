import { http } from "../../utils/http.js";

function NhanVienService() {
	const endpoint = "/nhan-vien";

	return {
		findById(id) {
			return http.get(`${endpoint}/${id}`);
		},
		searchByCodeName(codeName) {
			return http.get(endpoint, { codeName });
		},
		createNhanVien(nhanVien) {
			return http.post(endpoint, nhanVien);
		},
		updateNhanVien(nhanVien) {
			return http.put(endpoint, nhanVien);
		},
		deleteNhanVien(msnv) {
			return http.delete(endpoint, { msnv });
		},
	};
}

const nhanVienService = new NhanVienService();
export default nhanVienService;
