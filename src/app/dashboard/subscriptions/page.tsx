"use client";

import { BellCheck, BellRing } from "lucide-react";
import { ListChannels } from "@/components/custom/list-channels";
import { Loading } from "@/components/custom/loading";
import PageHeader from "@/components/custom/page-header";
import { useGetSubscriptions } from "@/hooks/useGetSubscriptions";

export default function SubscriptionsPage() {
	const { data: channels = [], isLoading } = useGetSubscriptions();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<PageHeader
				title="Inscrições"
				description="Veja os canais que você está inscrito"
				count={channels.length}
				icon={
					<BellCheck className="h-5 w-5 sm:h-6 sm:w-6" />
				}
			/>

			<div className="mt-8">
				{channels.length === 0 ? (
					<div
						className="
							flex flex-col items-center justify-center
							rounded-3xl border border-dashed border-primary/20
							bg-gradient-to-br from-primary/5 to-secondary/5
							px-6 py-20 text-center
						"
					>
						<div
							className="
								mb-5 flex h-20 w-20 items-center justify-center
								rounded-full bg-primary/10
							"
						>
							<BellRing className="h-10 w-10 text-primary" />
						</div>

						<h2 className="text-xl font-bold text-foreground">
							Nenhum canal inscrito
						</h2>

						<p className="mt-2 max-w-md text-sm text-muted-foreground">
							Inscreva-se em canais para acompanhar novos vídeos, conteúdos e
							atualizações.
						</p>
					</div>
				) : (
					<ListChannels channels={channels} />
				)}
			</div>
		</div>
	);
}
