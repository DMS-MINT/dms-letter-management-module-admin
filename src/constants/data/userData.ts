import { CircleIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";

export const labels = [
	{
		value: "member",
		label: "Member",
	},
	{
		value: "admin",
		label: "Admin",
	},
	{
		value: "recordOfficer",
		label: "Record Officer",
	},
];

export const statuses = [
	{
		value: "active",
		label: "Active",
		icon: CircleIcon,
	},
	{
		value: "trashed",
		label: "Trashed",
		icon: Trash2,
	},
];
