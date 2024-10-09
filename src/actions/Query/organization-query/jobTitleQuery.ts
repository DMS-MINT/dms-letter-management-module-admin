import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { getJobTitle, setJobTitle } from "@/actions/organization/action";
import useToastMutation from "@/hooks/useToastMutation";
import {
	type JobTitleListType,
	type JobTitleType,
} from "@/types/DepartmentType";

export const useFetchJobtitles = () => {
	return useQuery<JobTitleListType[]>({
		queryKey: ["alljobtitles"],
		queryFn: async () => {
			try {
				const data = await getJobTitle();
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
	});
};

export const useAddJobTitles = () => {
	return useToastMutation<JobTitleType>(
		"addJobTitle",
		setJobTitle,
		"የስራ ስም መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the JobTitle data you passed in
				console.log("JobTitle created successfully:", data.message);
				console.log("New JobTitle Data:", variables);
				// queryClient.invalidateQueries({ queryKey: ["JobTitles"] });
			},
			onError: (error) => {
				console.error("Error creating JobTitle:", error);
			},
		}
	);
};
