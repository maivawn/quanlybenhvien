import { http } from "../../utils/http.js";
function BenhNhanService() {
	const endpoint = "/benh-nhan";

	return {
		findById(id) {
			return http.get(`${endpoint}/${id}`);
		},
		searchByCodeName(codeNameBenhNhan) {
			return http.get(endpoint, { keyword: codeNameBenhNhan });
		},
		createBenhNhan(data) {
			return http.post(endpoint, data);
		},
		deleteBenhNhan(msbn) {
			return http.delete(endpoint, { msbn });
		},
		updateBenhNhan(data) {
			return http.put(endpoint, data);
		},
	};
}
const benhNhanService = new BenhNhanService();
export default benhNhanService;
