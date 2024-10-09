"use client";

import Image from "next/image";
import { useState } from "react";

import { Edit } from "lucide-react";

import { useFetchOrganization } from "@/actions/Query/organization-query/organizationQuery";
import { OrganizationForm } from "@/components/module/organization-module/OrganizationForm/OrganizationForm";
import UserDetailTable from "@/components/module/user-module/UserDetailTable";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/files";

const OrganizationProfileScreen = () => {
	const [formOpen, setFormOpen] = useState(false);
	const handleEditOrganization = () => {
		setFormOpen(!formOpen);
	};
	const { data: organization } = useFetchOrganization();
	const organizationData = [
		{
			name: "Organization Name",
			value: organization?.name_en || "N/A",
		},
		{
			name: "Organization Name (Amharic)",
			value: organization?.name_am || "N/A",
		},
		{
			name: "Description",
			value: organization?.bio || "N/A",
		},
		{ name: "Contact Phone", value: organization?.contact_phone || "N/A" },
		{ name: "Contact Email", value: organization?.contact_email || "N/A" },
		{ name: "Address", value: organization?.address.city_en || "N/A" },
		{ name: "Postal Code", value: organization?.postal_code || "N/A" },
		{ name: "Domain", value: organization?.organization_slug || "N/A" },
	];
	return (
		<div className="flex flex-col space-y-4 mb-20">
			<div className="w-full relative bg-muted/40 border-primary border-2 border-t-0 background-svg-pattern h-80 md:h-48 rounded-b-lg  ">
				<div className="flex items-center justify-center">
					<div className="md:absolute items-center justify-center mt-10 md:-bottom-20">
						<Image
							src={IMAGES.mint}
							alt="Profile Pic"
							width={200}
							className="bg-background border-b-4 ring-2 border-0  border-primary h-[200px] w-[200px] object-contain rounded-full"
						/>
					</div>
				</div>
				<div className="absolute bottom-0 right-0">
					<Button
						className="w-[100px] flex items-center gap-2"
						size={"sm"}
						onClick={() => {
							handleEditOrganization();
						}}
					>
						<Edit size={20} />
						Edit
					</Button>
				</div>
			</div>

			{formOpen ? (
				<div className="pt-28 flex items-center justify-center">
					<OrganizationForm
						lounchScreen={false}
						editOrganization={true}
						dataToEdit={organization}
					/>
				</div>
			) : (
				<div className="pt-28 flex items-center justify-center">
					<UserDetailTable
						data={organizationData}
						title="Organization Profile"
						desc="Here are a list of your organization detail for DMS"
					/>
				</div>
			)}
		</div>
	);
};

export default OrganizationProfileScreen;
