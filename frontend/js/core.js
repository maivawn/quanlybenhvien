import layout from "./layout/layout.js";
import { menus } from "./base/constant.js";
import { getLoggedUser } from "./layout/menu/index.js";

const paths = location.pathname.split('/');
const path = paths[paths.length - 1];
const menu = menus.find((menu) => menu.link === path);

const user = getLoggedUser();
if (
	(menu.permissions && !user) ||
	(menu.permissions && !menu.permissions.includes(user.chucVu))
) {
	localStorage.removeItem("user");
	localStorage.removeItem("token");
	window.location.href = "index.html#login";
} else {
	layout();
}
