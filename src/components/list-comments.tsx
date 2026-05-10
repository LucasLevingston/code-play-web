import { MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import type { Comment } from "@/types/video";
import { fromNow } from "@/utils/dayjs";

type commentsListType = {
	comments: Comment[];
};

export const CommentsList = ({ comments }: commentsListType) => {
	return (
		<div className="space-y-4">
			{comments?.map((comment) => (
				<article
					key={comment.id}
					className="flex gap-3 rounded-2xl border border-white/5 bg-black/15 p-4"
				>
					<Image
						src={comment.author.avatarUrl || "/default-avatar.png"}
						alt={comment.author.name}
						width={36}
						height={36}
						className="h-9 w-9 rounded-full object-cover"
					/>

					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
							<span className="font-medium text-white">
								{comment.author.name}
							</span>
							<span className="text-white/45">
								{fromNow(comment.createdAt)}
							</span>
						</div>

						<p className="mt-2 text-sm leading-6 text-white/72">
							{comment.content}
						</p>

						<div className="mt-3 flex items-center gap-4 text-sm text-white/55">
							<button
								className="inline-flex items-center gap-1.5 transition hover:text-white"
								type="button"
							>
								<ThumbsUp className="h-4 w-4" />
								{/* {comment.likes} */}
							</button>
							<button
								className="inline-flex items-center gap-1.5 transition hover:text-white"
								type="button"
							>
								<MessageCircle className="h-4 w-4" />
								Reply
							</button>
						</div>
					</div>
				</article>
			))}
		</div>
	);
};
