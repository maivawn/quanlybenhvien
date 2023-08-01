import { environment } from "../env.js";

async function fetchWithParams(url, params, options) {
	const token = localStorage.getItem("token");
	url = params ? `${url}?${new URLSearchParams(params)}` : url;
	const result = await window.fetch(`${environment.API}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			[token && "Authorization"]: token,
			...options.headers,
		},
	});
	if (!result.ok) {
		const messageError = await result.text();
		throw new Error(messageError);
	}
	return result.json();
}

async function fetchWithBody(url, data, options) {
	const token = localStorage.getItem("token");
	const result = await window.fetch(`${environment.API}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			[token && "Authorization"]: token,
			...options.headers,
		},
		body: JSON.stringify(data),
	});

	if (!result.ok) {
		const messageError = await result.text();
		throw new Error(messageError);
	}
	return result.json();
}

export const http = {
	async get(url, params, headers = {}) {
		return fetchWithParams(url, params, {
			method: "GET",
			headers: headers,
		});
	},
	async post(url, data = {}, headers = {}) {
		return fetchWithBody(url, data, {
			method: "POST",
			headers: headers,
		});
	},
	async put(url, data = {}, headers = {}) {
		return fetchWithBody(url, data, {
			method: "PUT",
			headers: headers,
		});
	},
	async delete(url, params = {}, headers = {}) {
		return fetchWithParams(url, params, {
			method: "DELETE",
			headers: headers,
		});
	},
};
