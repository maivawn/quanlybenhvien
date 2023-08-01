function showToast(text, background) {
	Toastify({
		text: text,
		duration: 3000,
		close: true,
		gravity: "top",
		position: "right",
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
			background: background,
		},
	}).showToast();
}

export const Toast = {
	success(text) {
		showToast(text, "green");
	},
	error(text) {
		showToast(text, "red");
	},
};
