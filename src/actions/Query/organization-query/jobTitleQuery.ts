import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	deleteJobTitle,
	getJobTitle,
	setJobTitle,
	updateJobTitle,
} from "@/actions/organization/action";
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
				return data.data.job_titles;
			} catch (error: any) {
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
	});
};

export const useAddJobTitles = () => {
	const queryClient = useQueryClient();
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
				queryClient.invalidateQueries({ queryKey: ["alljobtitles"] });
			},
			onError: (error) => {
				console.error("Error creating JobTitle:", error);
			},
		}
	);
};
export const useUpdateJobTitles = () => {
	const queryClient = useQueryClient();
	return useToastMutation<JobTitleListType>(
		"updateJobTitle",
		updateJobTitle,
		"የስራ ስም መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				console.log("JobTitle updated successfully:", data.message);
				console.log("New JobTitle Data:", variables);
				queryClient.invalidateQueries({ queryKey: ["alljobtitles"] });
			},
			onError: (error) => {
				console.error("Error creating JobTitle:", error);
			},
		}
	);
};

export const useDeleteJobTitles = () => {
	const queryClient = useQueryClient();
	return useToastMutation<string>(
		"deleteJobTitle",
		deleteJobTitle,
		"የስራ ስም መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				console.log("JobTitle deleted successfully:", data.message);
				console.log("New JobTitle Data:", variables);
				queryClient.invalidateQueries({ queryKey: ["alljobtitles"] });
			},
			onError: (error) => {
				console.error("Error creating JobTitle:", error);
			},
		}
	);
};
