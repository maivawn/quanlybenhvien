import createMenu, { getLoggedUser } from "./menu/index.js";
import createHeader from "./header/index.js";
import createSpinner from "./spinner/index.js";
import createLogin from "./login/index.js";

export const spinner = createSpinner("spinner-container");

export default function layout() {
	createHeader("header");
	createMenu("menu");

	if (!getLoggedUser()) {
		createLogin("login");
	}
}
