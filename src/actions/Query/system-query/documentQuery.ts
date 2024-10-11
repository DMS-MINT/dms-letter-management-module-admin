import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	getDateConfig,
	getRefConfig,
	postDateConfig,
	postRefConfig,
} from "@/actions/system/action";
import useToastMutation from "@/hooks/useToastMutation";
import { DateConfigType, RefConfigType } from "@/types/SystemType";

export const useUpdateRefConfig = () => {
	return useToastMutation<RefConfigType>(
		"refConfig",
		postRefConfig,
		"post Ref Config, please wait...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Ref Config created successfully:", data.message);
				console.log("New Ref Config Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};
export const useUpdateDateConfig = () => {
	return useToastMutation<DateConfigType>(
		"dateConfig",
		postDateConfig,
		"post Date Config, please wait...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Date Config created successfully:", data.message);
				console.log("New Date Config Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};

export const useFetchDateConfig = () => {
	return useQuery<DateConfigType>({
		queryKey: ["dateConfig"],
		queryFn: async () => {
			try {
				const data = await getDateConfig();
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};
export const useFetchRefConfig = () => {
	return useQuery<RefConfigType>({
		queryKey: ["RefConfig"],
		queryFn: async () => {
			try {
				const data = await getRefConfig();
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};
