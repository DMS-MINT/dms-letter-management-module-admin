import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	deleteDepartment,
	getDepartment,
	getOneDepartment,
	setDepartment,
	updateDepartment,
} from "@/actions/organization/action";
import useToastMutation from "@/hooks/useToastMutation";
import {
	type DepartmentListType,
	type DepartmentType,
	type DepartmentTypeToUpdate,
} from "@/types/DepartmentType";

export const useFetchDepartments = () => {
	return useQuery<DepartmentListType[]>({
		queryKey: ["departments"],
		queryFn: async () => {
			try {
				const data = await getDepartment();
				return data.data.departments;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};
export const useFetchOneDepartments = (id: string, enabled: boolean = true) => {
	return useQuery<DepartmentTypeToUpdate>({
		queryKey: ["Onedepartments"],
		queryFn: async () => {
			try {
				const data = await getOneDepartment(id);
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: enabled,
	});
};

export const useAddDepartment = () => {
	return useToastMutation<DepartmentType>(
		"addDepartment",
		setDepartment,
		"የመምሪያው መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Department created successfully:", data.message);
				console.log("New Department Data:", variables);
				// queryClient.invalidateQueries({ queryKey: ["departments"] });
				// Example: Display a message with the department name
				toast.success(
					`Department ${variables.department_name_en} created successfully!`
				);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};

export const useUpdateDepartment = () => {
	return useToastMutation<DepartmentTypeToUpdate>(
		"updateDepartment",
		updateDepartment,
		"የመምሪያው መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Department updated successfully:", data.message);
				console.log("New Department Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};

export const useDeleteDepartment = () => {
	return useToastMutation<string>(
		"updateDepartment",
		deleteDepartment,
		"የመምሪያው መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Department deleted successfully:", data.message);
				console.log("New Department Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};
