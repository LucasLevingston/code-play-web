import type { Comment, LikeModel, Subscription, Video } from "./video";

export enum Role {
	USER = "USER",
	ADMIN = "ADMIN",
}

export type User = {
	id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	age: number;
	role: Role;
	avatarUrl?: string | null;

	videos: Video[];

	watchLaterIds: string[];
	historyIds: string[];

	comments: Comment[];

	likes: LikeModel[];

	likedVideoIds: string[];
	likedCommentIds: string[];

	subscriptions: Subscription[];
	subscribersCount: number;
	subscribers: Subscription[];
};

export interface Channel {
	id: string;
	name: string;
	username: string
	avatarUrl: string;
	subscribersCount: number;
	videos?: Video[];
	isSubscribed?: boolean;
}