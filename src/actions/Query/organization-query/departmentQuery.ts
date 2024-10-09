import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { getDepartment, setDepartment } from "@/actions/organization/action";
import useToastMutation from "@/hooks/useToastMutation";
import {
	type DepartmentType,
	type DepartmentTypeToUpdate,
} from "@/types/DepartmentType";

export const useFetchDepartments = () => {
	return useQuery<DepartmentTypeToUpdate[]>({
		queryKey: ["departments"],
		queryFn: async () => {
			try {
				const data = await getDepartment();
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
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
