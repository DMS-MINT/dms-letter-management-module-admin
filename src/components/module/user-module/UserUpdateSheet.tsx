import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { type memeberDetailType } from "@/types/user/UserType";

import { UpdateUserForm } from "./UserForm/UpdateUserForm";

const UserUpdateSheet = ({
	show = false,
	data,
	setshowSheet,
}: {
	show: boolean;
	data: memeberDetailType;
	setshowSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<div>
			<Sheet open={show} onOpenChange={setshowSheet}>
				<SheetContent className="" side={"top"}>
					<SheetHeader>
						<SheetTitle>Update User Information</SheetTitle>
					</SheetHeader>
					<UpdateUserForm dataValue={data} />
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default UserUpdateSheet;
