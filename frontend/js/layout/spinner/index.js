export default function createSpinner(containerId) {
	const spinnerDom = document.getElementById(containerId);
	if (!spinnerDom) return;
	spinnerDom.innerHTML = `
        <div></div>
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
	return {
		hide() {
			spinnerDom.style.display = "none";
		},
		show() {
			spinnerDom.style.display = "block";
		},
	};
}
