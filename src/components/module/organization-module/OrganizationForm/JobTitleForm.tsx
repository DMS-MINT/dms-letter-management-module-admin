"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
	useAddJobTitles,
	useUpdateJobTitles,
} from "@/actions/Query/organization-query/jobTitleQuery";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function JobTitleForm({
	titleEngURL,
	titleAmURL,
	id,
	update = false,
}: {
	titleEngURL?: string;
	titleAmURL?: string;
	id?: string;
	update?: boolean;
}) {
	const t = useTranslations("JobTitleForm");

	const jobTitleFormSchema = z.object({
		title_en: z.string().min(2, {
			message: t("fields.jobTitleEn.error"),
		}),
		title_am: z.string().min(2, {
			message: t("fields.jobTitleAm.error"),
		}),
	});

	// TypeScript types inferred from the schema
	type JobTitleFormValues = z.infer<typeof jobTitleFormSchema>;

	const form = useForm<JobTitleFormValues>({
		resolver: zodResolver(jobTitleFormSchema),
		defaultValues: {
			title_en: titleEngURL?.toString() || "",
			title_am: titleAmURL?.toString() || "",
		},
		mode: "onChange",
	});

	const { mutate: JobTitleMutation } = useAddJobTitles();
	const { mutate: JobTitleUpdateMutation } = useUpdateJobTitles();
	function onSubmit(data: JobTitleFormValues) {
		toast.success("Organization Created!");

		if (update && id) {
			const value = { ...data, id };
			console.log("value", value);
			JobTitleUpdateMutation(value);
		} else {
			JobTitleMutation(data);
		}
	}

	return (
		<div>
			<Card className="relative">
				<CardHeader>
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>{t("description")}</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="title_en"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.jobTitleEn.label")}</FormLabel>
										<FormControl>
											<Input
												placeholder={t("fields.jobTitleEn.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t("fields.jobTitleEn.description")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="title_am"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.jobTitleAm.label")}</FormLabel>
										<FormControl>
											<Input
												placeholder={t("fields.jobTitleAm.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t("fields.jobTitleAm.description")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">
								{update ? t("button.updateSubmit") : t("button.submit")}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
