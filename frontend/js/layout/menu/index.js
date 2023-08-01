import { menus } from "../../base/constant.js";

export function getLoggedUser() {
	return JSON.parse(localStorage.getItem("user", "null"));
}

export default function createMenu(containerId) {
	const menuDom = document.getElementById(containerId);
	if (!menuDom) return;
	const active = menuDom.dataset.active;
	menuDom.innerHTML = `
        <ul>
            ${menus
				.filter((menu) => {
					const user = getLoggedUser();
					if (menu.code === "DANG_NHAP") {
						return !user;
					}

					if (menu.code === "DANG_XUAT") {
						return user;
					}

					return (
						!menu.permissions ||
						menu.permissions?.includes(user?.chucVu)
					);
				})
				.map((menu) => {
					return `<li><a class="${
						menu.code === active && "active"
					}" href="${menu.link}">${menu.name}</a></li>`;
				})
				.join("")}
        </ul>
    `;
}
