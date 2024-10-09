import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { type UserListType } from "@/types/user/UserType";

import { UpdateUserForm } from "./UserForm/UpdateUserForm";

const UserUpdateSheet = ({
	show = false,
	data,
	setshowSheet,
}: {
	show: boolean;
	data: UserListType;
	setshowSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<div>
			<Sheet open={show} onOpenChange={setshowSheet}>
				<SheetContent className="" side={"top"}>
					<SheetHeader>
						<SheetTitle>Update User Information</SheetTitle>
					</SheetHeader>
					<UpdateUserForm data={data} />
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default UserUpdateSheet;
