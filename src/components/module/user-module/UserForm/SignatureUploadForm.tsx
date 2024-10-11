"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { CloudUpload, Replace, Save } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FormData = {
	signature: FileList;
};

const SignatureUploadForm = () => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const hiddenInputRef = useRef<HTMLInputElement | null>(null);
	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm<FormData>();

	const { getRootProps, getInputProps, open } = useDropzone({
		accept: {
			"image/png": [".png"],
			"image/jpeg": [".jpeg", ".jpg"],
			"image/gif": [".gif"],
		},
		onDrop: (incomingFiles) => {
			if (incomingFiles.length > 0) {
				const file = incomingFiles[0];

				// Create a DataTransfer object to simulate a FileList
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);

				// Set the value of the hidden input as a FileList
				setValue("signature", dataTransfer.files);
				clearErrors("signature"); // Clear any existing errors

				// Create a preview of the first file
				const previewUrl = URL.createObjectURL(file);
				setImagePreview(previewUrl);
			}
		},
	});

	const onSubmit = (data: FormData) => {
		console.log("Form data submitted:", data);
		// Handle form submission logic (e.g., API call)
	};

	useEffect(() => {
		// Clean up the object URL when the component unmounts or imagePreview changes
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [imagePreview]);

	return (
		<Card className="m-4">
			<CardHeader>
				<CardTitle>Upload Signature Image</CardTitle>
			</CardHeader>
			<CardContent className="">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6 flex flex-col w-full items-center"
				>
					<div
						{...getRootProps({
							className:
								"border-dashed border-primary w-full border-2 p-6 cursor-pointer flex justify-center items-center",
						})}
					>
						<input
							{...getInputProps()}
							required
							style={{ opacity: 0, position: "absolute", zIndex: -1 }}
						/>
						{imagePreview ? (
							<div className="flex flex-col items-center">
								<Image
									src={imagePreview}
									alt="Signature Preview"
									className="mt-4 w-48 h-auto"
									width={48}
									height={48}
								/>
								<p className="mt-2 text-green-600">
									Image uploaded successfully please save the file!
								</p>
							</div>
						) : (
							<p>
								Drag and drop a signature image here, or click to select one
							</p>
						)}
					</div>
					<Button
						type="button"
						onClick={open}
						variant={"secondary"}
						className="flex items-center gap-2"
					>
						{imagePreview ? <Replace /> : <CloudUpload />}
						{imagePreview ? "Change the image" : "Open File Dialog"}
					</Button>

					{errors.signature && (
						<span className="text-red-600" role="alert">
							{errors.signature.message}
						</span>
					)}
					<div className="w-full flex justify-end">
						<Button
							type="submit"
							disabled={!imagePreview}
							className="flex gap-2 text-white font-bold items-center"
						>
							<Save />
							Submit
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default SignatureUploadForm;
