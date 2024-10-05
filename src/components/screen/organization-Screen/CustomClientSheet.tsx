import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

// Zod schema for validation
const contactSchema = z.object({
	full_name_en: z
		.string()
		.min(1, { message: "Full Name (English) is required" }),
	full_name_am: z
		.string()
		.min(1, { message: "Full Name (Amharic) is required" }),
	address: z.object({
		city_en: z.string().min(1, { message: "Address (English) is required" }),
		city_am: z.string().min(1, { message: "Address (Amharic) is required" }),
	}),
	phone_number: z
		.string()
		.refine(isValidPhoneNumber, {
			message: "ስልክ ቁጥር ያስገቡት አይደለም።",
		})
		.or(z.literal("")),
	email: z.string().email({ message: "Invalid email address" }),
});

// Define the type for the form data
type ContactFormData = z.infer<typeof contactSchema>;

type CustomSheetProps = {
	isOpen: boolean;
	onClose: () => void;
	isAdding: boolean;
};

export function CustomClientSheet({
	isOpen,
	onClose,
	isAdding,
}: CustomSheetProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormData>({
		defaultValues: {
			full_name_en: "",
			full_name_am: "",
			address: {
				city_en: "",
				city_am: "",
			},
			phone_number: "+251",
			email: "",
		},
		resolver: zodResolver(contactSchema),
	});

	// Submit handler
	const onSubmit = (data: ContactFormData) => {
		console.log("Form submitted with data:", data);
		// Perform your form submission logic here

		// Reset the form after submission
		reset();
		onClose(); // Close the sheet after successful submission
	};

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
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-2">
							<div>
								<Label htmlFor="full_name_en">Full Name (English)</Label>
								<Input
									{...register("full_name_en")}
									placeholder="Full Name - English"
								/>
								{errors.full_name_en && (
									<p className="text-sm text-red-500">
										{errors.full_name_en.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="full_name_am">ስም (አማርኛ)</Label>
								<Input {...register("full_name_am")} placeholder="ስም - አማርኛ" />
								{errors.full_name_am && (
									<p className="text-sm text-red-500">
										{errors.full_name_am.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="address_city_en">Address (English)</Label>
								<Input
									{...register("address.city_en")}
									placeholder="Address - English"
								/>
								{errors.address?.city_en && (
									<p className="text-sm text-red-500">
										{errors.address.city_en.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="address_city_am">አድራሻ (አማርኛ)</Label>
								<Input
									{...register("address.city_am")}
									placeholder="አድራሻ - አማርኛ"
								/>
								{errors.address?.city_am && (
									<p className="text-sm text-red-500">
										{errors.address.city_am.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="phone_number">Phone Number</Label>
								<Input {...register("phone_number")} placeholder="ስልክ ቁጥር" />
								{errors.phone_number && (
									<p className="text-sm text-red-500">
										{errors.phone_number.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input {...register("email")} placeholder="Email" />
								{errors.email && (
									<p className="text-sm text-red-500">{errors.email.message}</p>
								)}
							</div>
						</div>
						<div className="mt-4 flex justify-between gap-2">
							<Button
								type="button"
								onClick={onClose}
								size={"sm"}
								variant={"outline"}
							>
								አጥፋ
							</Button>
							<Button
								type="submit"
								size={"sm"}
								className="flex items-center gap-2"
							>
								<CirclePlus size={15} />
								{isAdding ? "አስገባ" : "አስቀምጥ"}
							</Button>
						</div>
					</form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
