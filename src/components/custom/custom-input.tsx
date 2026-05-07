import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { getIconByFormName } from "@/utils/get-icon-by-form-name";
import { Input } from "../ui/input";

type CustomInputProps = React.ComponentProps<typeof Input> & {
	icon?: ElementType;
};

export const CustomInput = ({
	icon: Icon,
	className,
	...props
}: CustomInputProps) => {
	return (
		<div className="w-full w-[366px] p-4 h-[56px] bg-[#262626] rounded-md border-[#262626] flex items-center focus-visible:ring-[#FF8B9B] focus-visible:border-[#FF8B9B]">
			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
			)}

			{props.name && getIconByFormName(props.name)}

			<Input
				{...props}
				className={cn(
					" text-white placeholder:text-white/40 focus-none ",
					Icon && "pl-10",
					className,
				)}
			/>
		</div>
	);
};
