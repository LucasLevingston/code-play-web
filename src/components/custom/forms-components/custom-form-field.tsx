"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getLabelByFormName, getPlaceholderByFormName } from "@/lib/utils";
import { CustomInput } from "../custom-input";

export enum FormFieldType {
	INPUT = "input",
	EMAIL = "email",
	PASSWORD = "password",
	TEXTAREA = "textarea",
	CHECKBOX = "checkbox",
	SELECT = "select",
}

interface CustomFormFieldProps {
	form: UseFormReturn<any, any, any>;
	name: string;
	label?: string;
	placeholder?: string;
	fieldType: FormFieldType;
	type?: string;
	disabled?: boolean;
	children?: React.ReactNode;
	className?: string;
}

export default function CustomFormField({
	form,
	name,
	label,
	placeholder,
	fieldType,
	type,
	disabled,
	children,
	className,
}: CustomFormFieldProps) {
	const [showPassword, setShowPassword] = useState(false);

	const getInputType = (): string => {
		if (fieldType === FormFieldType.PASSWORD) {
			return showPassword ? "text" : "password";
		}
		if (fieldType === FormFieldType.EMAIL) {
			return "email";
		}
		return type || "text";
	};

	const finalLabel = label === "" ? "" : label || getLabelByFormName(name);
	const finalPlaceholder = placeholder || getPlaceholderByFormName(name);

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					{fieldType !== FormFieldType.CHECKBOX && finalLabel && (
						<FormLabel className="text-[#A68CFF] font-bold">
							{finalLabel}
						</FormLabel>
					)}

					{fieldType === FormFieldType.INPUT && (
						<FormControl>
							<CustomInput
								placeholder={finalPlaceholder}
								disabled={disabled}
								
								{...field}
							/>
						</FormControl>
					)}

					{fieldType === FormFieldType.EMAIL && (
						<FormControl>
							<CustomInput
								type="email"
								placeholder={finalPlaceholder}
								disabled={disabled}
								{...field}
							/>
						</FormControl>
					)}

					{fieldType === FormFieldType.PASSWORD && (
						<FormControl>
							<div className="relative">
								<CustomInput
									type={getInputType()}
									placeholder={finalPlaceholder}
									disabled={disabled}
									{...field}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</FormControl>
					)}

					{fieldType === FormFieldType.TEXTAREA && (
						<FormControl>
							<Textarea
								placeholder={finalPlaceholder}
								disabled={disabled}
								className="bg-[#111] border-[#262626] text-white placeholder:text-white/40 focus-visible:ring-[#FF8B9B] focus-visible:border-[#FF8B9B] min-h-32"
								{...field}
							/>
						</FormControl>
					)}

					{fieldType === FormFieldType.SELECT && children && (
						<FormControl>
							<div className="relative">
								<select
									disabled={disabled}
									className="bg-[#111] border border-[#262626] text-white placeholder:text-white/40 focus-visible:ring-[#FF8B9B] focus-visible:border-[#FF8B9B] rounded px-4 py-2 w-full appearance-none"
									{...field}
								>
									<option value="">{finalPlaceholder}</option>
									{children}
								</select>
							</div>
						</FormControl>
					)}

					<FormMessage className="text-red-400" />
				</FormItem>
			)}
		/>
	);
}
