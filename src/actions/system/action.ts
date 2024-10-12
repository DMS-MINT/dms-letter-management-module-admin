import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function postSystemConfig(data: any) {
	try {
		const { id, ...dataToSend } = data as any;
		const response = await axiosInstance.put(`tenants/update/settings/${id}/`, {
			dataToSend,
		});
		console.log("system Config created:", response.data.message);
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

export async function getDateConfig() {
	try {
		const response = await axiosInstance.get("date-config/");
		console.log("Date Config:", response.data);
		return { ok: true, message: "የመምሪያ ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
