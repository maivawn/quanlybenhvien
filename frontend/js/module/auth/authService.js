import { http } from "../../utils/http.js";

function AuthService() {
	const endpoint = "/auth";

	return {
		login(data) {
			return http.post(`${endpoint}/login`, data);
		},
	};
}

const authService = new AuthService();
export default authService;
