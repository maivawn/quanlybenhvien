import { http } from "../../utils/http.js";

function BenhAnService() {
	const endpoint = "/benh-an";

	return {
		findById(id) {
			return http.get(`${endpoint}/${id}`);
		},

		createBenhAn(benhAn) {
			return http.post(endpoint, benhAn);
		},
	};
}

const benhAnService = new BenhAnService();
export default benhAnService;
