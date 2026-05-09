import { Globe, Link2, Lock } from "lucide-react";

export const visibilityOptions = [
	{
		value: "PUBLIC",
		label: "Public",
		icon: Globe,
	},
	{
		value: "UNLISTED",
		label: "Unlisted",
		icon: Link2,
	},
	{
		value: "PRIVATE",
		label: "Private",
		icon: Lock,
	},
] as const;