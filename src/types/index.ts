export type RoleType = "READER" | "REPORTER" | "EDITOR" | "ADMIN";
export type MediaType = "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: RoleType;
}

export interface Media {
  id: number;
  url: string;
  caption?: string | null;
  type: MediaType;
  width?: number | null;
  height?: number | null;
  duration?: number | null;
  size?: number | null;
  format?: string | null;
  createdAt: Date;
  author?: User | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string | null;
  author: User;
  media: Media[] | null;
  publishedAt: Date | null;
  content: string | null;
  slug: string;
  published: boolean;
  category: Category | null;
  categoryId?: number | null;
  comments?: Comment[] | null;
  commentCount?: number | null;
  viewCount?: number | null;
  likeCount?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: number;
  content: string;
  author: User | null;
  authorId: string | null;
  postId: number;
  createdAt: Date;
}
