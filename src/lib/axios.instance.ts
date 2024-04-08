import axios from "axios";
import { store } from "../redux/store/store";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 30 * 60 * 1000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});
axiosInstance.interceptors.request.use(
	(config) => {
		const token = store.getState().user.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
