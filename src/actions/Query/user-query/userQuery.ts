import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	getAllUser,
	getMemberUsers,
	getMyProfile,
	getOneMember,
	getOneUser,
	getRecordOfficers,
	setMemberUsers,
	updateProfile,
	updateUser,
} from "@/actions/user/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { SetCurrentUser } from "@/lib/store/redux/usersSlice";
import {
	type CurrentUserType,
	type UserListType,
	type UserType,
	type memeberDetailType,
	type memeberType,
} from "@/types/user/UserType";

// * get - get current user details
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

// * get - get Record Officers
export const useFetchRecordOfficers = () => {
	return useQuery<CurrentUserType, Error>({
		queryKey: ["recordOfficers"],
		queryFn: async () => {
			try {
				const data = await getRecordOfficers();
				return data.data;
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

// * get - get Members without record officer
export const useFetchMembers = () => {
	return useQuery<UserType[], Error>({
		queryKey: ["getmembers"],
		queryFn: async () => {
			try {
				const data = await getMemberUsers();
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
	});
};

// * get - get All Users
export const useFetchAllUsers = () => {
	return useQuery<memeberType[], Error>({
		queryKey: ["getallusers"],
		queryFn: async () => {
			try {
				const data = await getAllUser();
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
	});
};

// * get - get One Member detail
export const useFetchMemeberDetail = (id: string) => {
	return useQuery<memeberDetailType>({
		queryKey: ["getMemberDetail"],
		queryFn: async () => {
			try {
				const data = await getOneMember(id);

				return data.data as memeberDetailType;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};

// * get - get One User detail
export const useFetchUserDetail = (id: string) => {
	return useQuery<UserListType, Error>({
		queryKey: ["getUserDetail"],
		queryFn: async () => {
			try {
				const data = await getOneUser(id);
				return data.data;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};

export const useUpdateUser = () => {
	return useToastMutation<UserListType>(
		"updateMe",
		updateUser,
		"የእርስዎን መገለጫ በማሻሻል...",
		{
			onSuccess: (variables) => {
				console.log("Updated successfully:", variables);
			},
		}
	);
};

// TODO: Add a loading state for the query
// TODO: wrong type for the form data
// TODO: This hook is not implemented yet

// * patch - update current user details
export const useUpdateMe = () => {
	return useToastMutation<UserType>(
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

// * post - add new user
export const useAddMembers = () => {
	const queryclient = useQueryClient();
	return useToastMutation<UserType>(
		"addUserMember",
		setMemberUsers,
		"አዲስ ተተቃሚ በመመዝገብ ላይ ...",
		{
			onSuccess: (variables) => {
				console.log("Add successfully:", variables);
				queryclient.invalidateQueries({ queryKey: ["getmembers"] });
			},
		}
	);
};
