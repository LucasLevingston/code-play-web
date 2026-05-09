import type React from "react";
import { cn } from "@/lib/utils";

type logoProps = React.ComponentProps<"p">;

export const Logo = (props: logoProps) => {
	return (
		<p {...props} className={cn("text-primary font-bold text-2xl", props.className)} >
			CodePlay
		</p>
	);
};
