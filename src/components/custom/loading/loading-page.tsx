import { Loading } from "./";

export function LoadingPage() {
	return (
		<div className="container mx-auto py-8">
			<div>
				<div className="flex items-center justify-center py-8">
					<Loading />
				</div>
			</div>
		</div>
	);
}