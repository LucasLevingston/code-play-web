"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type CustomButtonProps = React.ComponentProps<typeof Button>;

export const CustomButton = ({
	className,
	children,
	...props
}: CustomButtonProps) => {
	return (
		<Button
			{...props}
			className={cn(
				"h-14 w-full w-[366px] rounded-full bg-gradient-to-r from-primary to-secondary font-bold text-background transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-primary/50 hover:text-black hover:dark:text-white",
				className,
			)}
		>
			{children}
		</Button>
	);
};
