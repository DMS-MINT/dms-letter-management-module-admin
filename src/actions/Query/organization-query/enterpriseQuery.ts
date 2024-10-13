import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	getEnterprises,
	getOneEnterprises,
	setEnterprises,
	updateEnterprises,
} from "@/actions/organization/action";
import useToastMutation from "@/hooks/useToastMutation";
import {
	type EnterpriseListType,
	type EnterpriseType,
} from "@/types/EnterpriseType";

export const useFetchEnterprises = () => {
	return useQuery<EnterpriseListType[]>({
		queryKey: ["enterprises"],
		queryFn: async () => {
			try {
				const data = await getEnterprises();
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};
export const useFetchOneEnterprises = (id: string) => {
	return useQuery<EnterpriseType>({
		queryKey: ["enterprisesOne"],
		queryFn: async () => {
			try {
				const data = await getOneEnterprises(id);
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};

export const useAddEnterprise = () => {
	return useToastMutation<EnterpriseType>(
		"addEnterprise",
		setEnterprises,
		"የመምሪያው መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Enterprise created successfully:", data.message);
				console.log("New Enterprise Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};
export const useUpdateEnterprise = () => {
	return useToastMutation<EnterpriseListType>(
		"updateEnterprise",
		updateEnterprises,
		"የመምሪያው መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Department created successfully:", data.message);
				console.log("New Department Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};
