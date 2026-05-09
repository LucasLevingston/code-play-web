import type React from "react";
import { cn } from "@/lib/utils";

type logoProps = React.ComponentProps<"p">;

export const Logo = (props: logoProps) => {
	return (
		<p {...props} className={cn("text-[#FF8B9B] font-bold text-2xl", props.className)} >
			CodePlay
		</p>
	);
};
