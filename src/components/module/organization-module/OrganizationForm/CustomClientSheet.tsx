import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
	useAddEnterprise,
	useUpdateEnterprise,
} from "@/actions/Query/organization-query/enterpriseQuery";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	type EnterpriseListType,
	type EnterpriseType,
} from "@/types/EnterpriseType";

// Zod schema for validation
export const enterpriseSchema = z.object({
	name_en: z.string().min(1, { message: "Full Name (English) is required" }),
	name_am: z.string().min(1, { message: "Full Name (Amharic) is required" }),
	address: z.object({
		city_en: z.string().min(1, { message: "Address (English) is required" }),
		city_am: z.string().min(1, { message: "Address (Amharic) is required" }),
	}),
	phone_number: z.union([
		z
			.string()
			.regex(/^\d*$/, "Phone number must be a numeric value")
			.transform((val) => (val === "" ? "" : Number(val))),
		z.literal(""),
	]),
	email: z.string().email({ message: "Invalid email address" }),
	postal_code: z.number().min(1, { message: "Postal code is required" }),
});

// Define the type for the form data
export type EnterpriseFormData = z.infer<typeof enterpriseSchema>;

type CustomSheetProps = {
	isOpen: boolean;
	client?: EnterpriseFormData;
	onClose: () => void;
	isAdding: boolean;
};

export function CustomClientSheet({
	isOpen,
	client,
	onClose,
	isAdding,
}: CustomSheetProps) {
	const form = useForm<EnterpriseFormData>({
		defaultValues: {
			name_en: client?.name_en || "",
			name_am: client?.name_am || "",
			address: {
				city_en: client?.address.city_en || "",
				city_am: client?.address.city_am || "",
			},
			phone_number: client?.phone_number || 0,
			email: client?.email || "",
			postal_code: 0,
		},
		mode: "onChange",
	});

	// Submit handler
	const { mutate: addEnterpriseMutation } = useAddEnterprise();
	const { mutate: updateEnterpriseMutation } = useUpdateEnterprise();

	function onSubmit(data: EnterpriseFormData) {
		toast.success("Organization Created!");
		console.log("Form submitted with data:", data);
		if (isAdding) {
			addEnterpriseMutation(data as EnterpriseType);
			// TODO: Adding a add new enterprise functionality

			setTimeout(() => {
				form.reset();
				onClose();
			}, 1000);
		} else {
			updateEnterpriseMutation(data as EnterpriseListType);
			// TODO: Adding an Update enterprise functionality
		}
	}
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="max-w-lg pl-4 pr-0">
				<SheetHeader>
					<SheetTitle>
						{isAdding ? "አዲስ ማህደሮችን ማስገቢያ" : "ማህደሮችን ማረሚያ"}
					</SheetTitle>
					<SheetDescription>የማህደር ዝርዝሮችን በትክክል ይሙሉ።</SheetDescription>
				</SheetHeader>
				<div className="my-4 h-[90%] overflow-y-auto pl-1 pr-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							{/* Full Name (English) Field */}
							<FormField
								control={form.control}
								name="name_en"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name (English)</FormLabel>
										<FormControl>
											<Input placeholder="Full Name - English" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Full Name (Amharic) Field */}
							<FormField
								control={form.control}
								name="name_am"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ስም (አማርኛ)</FormLabel>
										<FormControl>
											<Input placeholder="ስም - አማርኛ" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Address (English) Field */}
							<FormField
								control={form.control}
								name="address.city_en"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address (English)</FormLabel>
										<FormControl>
											<Input placeholder="Address - English" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Address (Amharic) Field */}
							<FormField
								control={form.control}
								name="address.city_am"
								render={({ field }) => (
									<FormItem>
										<FormLabel>አድራሻ (አማርኛ)</FormLabel>
										<FormControl>
											<Input placeholder="አድራሻ - አማርኛ" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Phone Number Field */}
							<FormField
								control={form.control}
								name="phone_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input type="number" placeholder="ስልክ ቁጥር" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Email Field */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="postal_code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Postal Code</FormLabel>
										<FormControl>
											<Input
												placeholder="Postal Code"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Buttons */}
							<div className="mt-4 flex justify-between gap-2">
								<Button
									type="reset"
									onClick={onClose}
									size="sm"
									variant="outline"
								>
									አጥፋ
								</Button>
								<Button
									type="submit"
									size="sm"
									className="flex items-center gap-2"
								>
									<CirclePlus size={15} />
									{isAdding ? "አስገባ" : "አስቀምጥ"}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
