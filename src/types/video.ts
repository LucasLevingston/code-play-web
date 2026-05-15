import type { User } from "./user";

export enum VideoSegment {
	BACKEND = "BACKEND",
	FRONTEND = "FRONTEND",
	FULLSTACK = "FULLSTACK",
	ARTIFICIAL_INTELLIGENCE = "ARTIFICIAL_INTELLIGENCE",
	DATA_SCIENCE = "DATA_SCIENCE",
	DEVOPS = "DEVOPS",
}

export enum Visibility {
	PUBLIC = "PUBLIC",
	UNLISTED = "UNLISTED",
	PRIVATE = "PRIVATE",
}

export enum Like {
	VIDEO = "VIDEO",
	COMMENT = "COMMENT",
}

export type Subscription = {
	id: string;

	subscriberId: string;
	subscriber: User;

	subscribedToId: string;
	subscribedTo: User;

	createdAt: Date;
};

export type Video = {
	id: string;
	title: string;
	description?: string | null;
	videoUrl: string;
	thumbnailUrl: string;
	duration: string;
	views: number;
	visibility: Visibility;
	isLiked?: boolean;
	isSubscribed?: boolean;
	likesCount: number

	segment: VideoSegment;

	tags: string[];

	userId: string;
	user: User;

	comments: Comment[];

	likes: LikeModel[];

	publishedAt: Date;
	createdAt: Date;
};

export type Comment = {
	id: string;
	content: string;

	authorId: string;
	author: User;

	videoId: string;
	video: Video;
	likesCount?: number
	likes: LikeModel[];

	createdAt: Date;
};

export type LikeModel = {
	id: string;

	type: Like;

	userId: string;
	user: User;

	videoId?: string | null;
	video?: Video | null;

	commentId?: string | null;
	comment?: Comment | null;

	createdAt: Date;
};

export const categoriesType = [
	{ value: "All", label: "Todos" },
	{ value: VideoSegment.BACKEND, label: "Backend" },
	{ value: VideoSegment.FRONTEND, label: "Frontend" },
	{ value: VideoSegment.FULLSTACK, label: "Fullstack" },
	{
		value: VideoSegment.ARTIFICIAL_INTELLIGENCE,
		label: "Inteligência Artificial",
	},
	{ value: VideoSegment.DATA_SCIENCE, label: "Data Science" },
	{ value: VideoSegment.DEVOPS, label: "DevOps" },
] as const;