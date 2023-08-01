import { http } from "../../utils/http.js";
function ThanhToanService() {
	const endpoint = "/thanh-toan";

	return {
		findById(id) {
			return http.get(`${endpoint}/${id}`);
		},
		createThanhToan(data) {
			return http.post(endpoint, data);
		},
	};
}
const thanhToanService = new ThanhToanService();
export default thanhToanService;
