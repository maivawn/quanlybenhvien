import { getFormData } from "../../utils/data.js";
import authService from "./authService.js";
import { spinner } from "../../layout/layout.js";
import { Toast } from "../../utils/toast.js";

window.login = async () => {
	const loginForm = getFormData("#login input[name]");

	try {
		spinner.show();
		const result = await authService.login(loginForm);
		localStorage.setItem("token", result.token);
		localStorage.setItem("user", JSON.stringify(result.user));
		spinner.hide();
		Toast.success("Đăng nhập thành công");
		window.location.href = "index.html";
	} catch (error) {
		spinner.hide();
		Toast.error(error.message);
	}
};
