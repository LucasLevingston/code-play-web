import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: 'https',
				hostname:
					'codeplay-bucket-908877525889-us-east-2-an.s3.us-east-2.amazonaws.com',
			},

			{
				protocol: "https",
				hostname: "cdn.jsdelivr.net",
			},
		],
	},
};

export default nextConfig;
