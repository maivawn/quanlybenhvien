import { http } from "../../utils/http.js";

function ChiTietThanhToanService() {
	const endpoint = "/chi-tiet-thanh-toan";

	return {
		findByThanhToanId(id) {
			return http.get(`${endpoint}`, { mtt: id });
		},
		createChiTiet(data) {
			return http.post(endpoint, data);
		},
	};
}

const chiTietThanhToan = new ChiTietThanhToanService();
export default chiTietThanhToan;
