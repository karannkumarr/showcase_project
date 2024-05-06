"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import FormField from "./FormField";
import Button from "./Button";
import CustomMenu from "./CustomMenu";

import { FormState, ProjectInterface } from "@/common.types";
import { categoryFilters } from "@/constants";
import { uploadImage } from "@/lib/uploadimage";

type Props = {
	type: string;
	session: {
		user: {
			id: "";
		};
	};
	project?: ProjectInterface;
};

let result="";

const ProjectForm = ({ type, project }: Props) => {
	const router = useRouter();

	const [submitting, setSubmitting] = useState<boolean>(false);
	const [form, setForm] = useState<FormState>({
		title: project?.title || "",
		description: project?.description || "",
		image: project?.image || "",
		liveSiteUrl: project?.liveSiteUrl || "",
		githubUrl: project?.githubUrl || "",
		category: project?.category || "",
	});

	const handleStateChange = (fieldName: keyof FormState, value: string) => {
		setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
	};

	const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const file = e.target.files?.[0];

		if (!file) return;

		if (!file.type.includes("image")) {
			alert("Please upload an image!");

			return;
		}
		

		

		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = async () => {
			try {
				const imageBase64 = reader.result as string;
		  
				const response = await fetch("/api/upload", {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify({ image: imageBase64 }),
				});
		  
				if (!response.ok) {
				  throw new Error("Failed to upload image on Cloudinary");
				}
		  
				const cloudinaryResponse = await response.json();
				const imageUrl = cloudinaryResponse.secure_url; // Assuming Cloudinary returns the URL of the uploaded image
		  
				handleStateChange("image", imageUrl);
			  } catch (error) {
				console.error("Error uploading image to Cloudinary:", error);
				alert("Failed to upload image on Cloudinary");
			  }
			};
		  };

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();

		setSubmitting(true);

		// const { token } = await fetchToken()

		try {
			if (type === "create") {
				//  await createNewProject(form, session?.user?.id, token)



				// Add the user ID to the form data
				const formData = new FormData();
				formData.append("type", "project");
				formData.append(
					"data",
					JSON.stringify({
						...form,
						createdBy: "66379ea9cf10249c95c7baea",
                        // Add the user ID here
					})
				);

				console.log("FormData:", formData); // Log the FormData object
				console.log("FormData JSON:", JSON.stringify(formData)); // Log the JSON representation of FormData

				const response = await fetch("/api/user", {
					method: "POST",
					body: formData,
				});

				if (!response.ok) {
					throw new Error("Failed to create a project.");
				}

				router.push("/");
			}

			if (type === "edit") {
				// await updateProject(form, project?.id as string, token)

				router.push("/");
			}
		} catch (error) {
			alert(
				`Failed to ${
					type === "create" ? "create" : "edit"
				} a project. Try again!`
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleFormSubmit}
			className="flexStart form"
		>
			<div className="flexStart form_image-container">
				<label
					htmlFor="poster"
					className="flexCenter form_image-label"
				>
					{!form.image && "Choose a poster for your project"}
				</label>
				<input
					id="image"
					type="file"
					accept="image/*"
					required={type === "create" ? true : false}
					className="form_image-input"
					onChange={(e) => handleChangeImage(e)}
				/>
				{form.image && (
					<Image
						src={form?.image}
						className="sm:p-10 object-contain z-20"
						alt="image"
						fill
					/>
				)}
			</div>

			<FormField
				title="Title"
				state={form.title}
				placeholder="Project Name"
				setState={(value) => handleStateChange("title", value)}
			/>

			<FormField
				title="Description"
				state={form.description}
				placeholder="This project helps users to do this task."
				isTextArea
				setState={(value) => handleStateChange("description", value)}
			/>

			<FormField
				type="url"
				title="Website URL"
				state={form.liveSiteUrl}
				placeholder="https://weppdev.tech"
				setState={(value) => handleStateChange("liveSiteUrl", value)}
			/>

			<FormField
				type="url"
				title="GitHub URL"
				state={form.githubUrl}
				placeholder="https://github.com/"
				setState={(value) => handleStateChange("githubUrl", value)}
			/>

			<CustomMenu
				title="Category"
				state={form.category}
				filters={categoryFilters}
				setState={(value) => handleStateChange("category", value)}
			/>

			<div className="flexStart w-full">
				<Button
					title={
						submitting
							? `${type === "create" ? "Creating" : "Editing"}`
							: `${type === "create" ? "Create" : "Edit"}`
					}
					type="submit"
					leftIcon={submitting ? "" : "/plus.svg"}
					submitting={submitting}
				/>
			</div>
		</form>
	);
};

export default ProjectForm;
