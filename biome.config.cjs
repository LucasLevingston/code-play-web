module.exports = {
	root: true,
	files: ["src/**/*", "app/**/*", "*.ts", "*.tsx", "*.js", "*.jsx"],
	language: {
		javascript: { lint: true },
		typescript: { lint: true },
	},
	lints: {},
	formatter: {
		lineWidth: 100,
	},
};
