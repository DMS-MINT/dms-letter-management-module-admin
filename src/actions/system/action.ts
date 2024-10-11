import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function postRefConfig(data: any) {
	try {
		const response = await axiosInstance.post("ref-config/", data);
		console.log("Ref Config created:", response.data);
		return { ok: true, message: "የመምሪያ ተገኝቷል!" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getRefConfig() {
	try {
		const response = await axiosInstance.get("ref-config/");
		console.log("Ref Config:", response.data);
		return { ok: true, message: "የመምሪያ ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function postDateConfig(data: any) {
	try {
		const response = await axiosInstance.post("date-config/", data);
		console.log("Date Config created:", response.data);
		return { ok: true, message: "የመምሪያ ተገኝቷል!" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getDateConfig() {
	try {
		const response = await axiosInstance.get("date-config/");
		console.log("Date Config:", response.data);
		return { ok: true, message: "የመምሪያ ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
