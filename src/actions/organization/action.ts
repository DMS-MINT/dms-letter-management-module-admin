"use server";

import axiosInstance from "@/actions/axiosInstance";
import {
	type DepartmentType,
	type DepartmentTypeToUpdate,
	JobTitleListType,
	type JobTitleType,
} from "@/types/DepartmentType";
import { type EnterpriseType } from "@/types/EnterpriseType";
import {
	type OrganizationListType,
	type OrganizationType,
} from "@/types/OrganizationType";

import getErrorMessage from "../getErrorMessage";

export async function setOrganization(data: OrganizationType) {
	try {
		const response = await axiosInstance.post("organizations/create/", data);
		console.log("Organization created:", response.data);
		return { ok: true, message: "አዲስ ድርጅት በተሳካ ሁኔታ ፈጥረዋል!" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getOrganization() {
	try {
		const response = await axiosInstance.get("organizations/");
		return { ok: true, message: "የድርጅት ተገኝቷል!", data: response.data };
	} catch (error: any) {
		throw error.message;
	}
}
export async function updateOrganization(data: OrganizationListType) {
	try {
		const { id } = data;
		const response = await axiosInstance.put(
			`organizations/${id}/update`,
			data
		);
		console.log("department Update", response.data);
		return { ok: true, message: "ደንበኛ ተቀይሯል!" };
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function deleteOrganization(id: string) {
	try {
		const response = await axiosInstance.delete(`organizations/${id}/delete/`);
		console.log("organizations:", response.data);
		return { ok: true, message: "የመምሪያ ተገኝቷል!" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getEnterprises() {
	try {
		const response = await axiosInstance.get("enterprises/");
		console.log("Enterprises:", response.data);
		return { ok: true, message: "የአዲስ ደንበኛ ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getOneEnterprises(id: string) {
	try {
		const response = await axiosInstance.get(`enterprises/${id}`);
		console.log("Enterprises:", response.data);
		return { ok: true, message: "የአዲስ ደንበኛ ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function setEnterprises(data: EnterpriseType) {
	try {
		const response = await axiosInstance.post("enterprises/create/", data);
		console.log("Enterprises:", response.data);
		return { ok: true, message: "የአዲስ ደንበኛ ተገኝቷል!" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function updateEnterprises(data: EnterpriseType) {
	try {
		const { id } = data;
		const response = await axiosInstance.put(`enterprises/${id}/update`, data);
		console.log("enterprise Update", response.data);
		return { ok: true, message: "ደንበኛ ተቀይሯል!" };
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getDepartment() {
	try {
		const response = await axiosInstance.get("departments/");
		console.log("Departments:", response.data);
		return { ok: true, message: "የመምሪያዎች ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getOneDepartment(id: string) {
	try {
		const response = await axiosInstance.get(`departments/${id}`);
		console.log("Departments:", response.data);
		return { ok: true, message: "የመምሪያዎች ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function updateDepartment(data: DepartmentTypeToUpdate) {
	try {
		const { id } = data;
		const response = await axiosInstance.put(`enterprises/${id}/update`, data);
		console.log("department Update", response.data);
		return { ok: true, message: "ደንበኛ ተቀይሯል!" };
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function setDepartment(data: DepartmentType) {
	try {
		const response = await axiosInstance.post("departments/create/", data);
		console.log("Departments:", response.data);
		return { ok: true, message: "የመምሪያ ተገኝቷል!" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function deleteDepartment(id: string) {
	try {
		const response = await axiosInstance.delete(`departments/${id}/delete/`);
		console.log("Departments:", response.data);
		return { ok: true, message: "የመምሪያ ተገኝቷል!" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getJobTitle() {
	try {
		const response = await axiosInstance.get("job_titles/");
		console.log("Job Titles:", response.data);
		return { ok: true, message: "የስራ መደብዎች ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function setJobTitle(data: JobTitleType) {
	try {
		const response = await axiosInstance.post("job_titles/create/", data);
		console.log("Job Titles:", response.data);
		return { ok: true, message: "የስራ መደብ ተገኝቷል!" };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function updateJobTitle(data: JobTitleListType) {
	try {
		const { id } = data;
		const response = await axiosInstance.put(`job_titles/${id}/update`, data);
		console.log("Job Title Update", response.data);
		return { ok: true, message: "ደንበኛ ተቀይሯል!" };
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
