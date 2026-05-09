"use client";


import type React from "react";
import type { UseFormReturn } from "react-hook-form";
import { Loading } from "@/components/custom/loading";
import { CustomButton } from "../custom-button";

interface CustomSubmitButtonProps {
	isSubmitting?: boolean;
	isDirty?: boolean;
	children: React.ReactNode;
	submittingText?: string;
	className?: string;
	disabled?: boolean;
	form?: UseFormReturn<any, any, any>;
}

export function CustomSubmitButton({
	isSubmitting,
	isDirty = true,
	children,
	submittingText = "Enviando...",
	disabled,
	form,
}: CustomSubmitButtonProps) {
	return (
		<CustomButton

			disabled={isSubmitting || !isDirty || disabled}
			type="submit"
			className="w-full"
		>
			{form?.formState.isSubmitting || isSubmitting ? (
				<>
					<Loading />
					{submittingText}
				</>
			) : (
				children
			)}
		</CustomButton>
	);
}