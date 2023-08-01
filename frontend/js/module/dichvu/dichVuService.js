import { http } from "../../utils/http.js";

function DichVuService() {
	const endpoint = "/dich-vu";

	return {
		findById(id) {
			return http.get(`${endpoint}/${id}`);
		},
		searchByCodeName(keyword) {
			return http.get(endpoint, { keyword });
		},
		createDichVu(dichVu) {
			return http.post(endpoint, dichVu);
		},
		updateDichVu(dichVu) {
			return http.put(endpoint, dichVu);
		},
		deleteDichVu(msnv) {
			return http.delete(endpoint, { msnv });
		},
	};
}

const dichVuService = new DichVuService();
export default dichVuService;
