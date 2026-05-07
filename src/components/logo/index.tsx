import type React from "react";

type logoProps = React.ComponentProps<"p">;

export const Logo = (props: logoProps) => {
	return (
		<p className="text-[#FF8B9B] font-bold text-2xl" {...props}>
			CodePlay
		</p>
	);
};
