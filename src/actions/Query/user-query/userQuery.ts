import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	getMemberUsers,
	getMyProfile,
	getRecordOfficers,
	updateProfile,
} from "@/actions/user/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { SetCurrentUser } from "@/lib/store/redux/usersSlice";
import { type CurrentUserType } from "@/types/user/UserType";

export const useFetchMe = () => {
	const dispatch = useAppDispatch();

	return useQuery<CurrentUserType, Error>({
		queryKey: ["me"],
		queryFn: async () => {
			try {
				const data = await getMyProfile();
				dispatch(SetCurrentUser(data.my_profile));
				return data.my_profile as CurrentUserType;
			} catch (error: any) {
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
	});
};

// TODO: Add a loading state for the query
// TODO: Add a type for the return value of the query
// TODO: This hook is not implemented yet
export const useFetchRecordOfficers = () => {
	return useQuery<CurrentUserType, Error>({
		queryKey: ["recordOfficers"],
		queryFn: async () => {
			try {
				const data = await getRecordOfficers();
				return data.message;
			} catch (error: any) {
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
	});
};

// TODO: Add a loading state for the query
// TODO: Add a type for the return value of the query
// TODO: This hook is not implemented yet
export const useFetchMembers = () => {
	return useQuery<CurrentUserType, Error>({
		queryKey: ["members"],
		queryFn: async () => {
			try {
				const data = await getMemberUsers();
				return data.message;
			} catch (error: any) {
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
	});
};

// TODO: Add a loading state for the query
// TODO: wrong type for the form data
// TODO: This hook is not implemented yet
export const useUpdateMe = () => {
	return useToastMutation<CurrentUserType>(
		"updateMe",
		updateProfile,
		"የእርስዎን መገለጫ በማሻሻል...",
		{
			onSuccess: (variables) => {
				console.log("Updated successfully:", variables);
			},
		}
	);
};
