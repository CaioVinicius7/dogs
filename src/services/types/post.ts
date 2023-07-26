export interface Post {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
}

export interface Comment {
  comment_ID: string;
  comment_author: string;
  comment_content: string;
}

export interface CreatePostRequest {
  name: string;
  weight: number;
  age: number;
  img: File;
}

export interface GetPostsRequest {
  page: number;
  itemsPerPage: number;
  userId?: number;
}

export type GetPostsResponse = Post[];

export interface GetPostByIdRequest {
  postId: number;
}

export interface GetPostByIdResponse {
  photo: Post;
  comments: Comment[];
}

export interface AddCommentRequest {
  postId: number;
  comment: string;
}

export interface AddCommentRequest {
  postId: number;
  comment: string;
}

export type AddCommentResponse = Comment;

export interface DeletePostRequest {
  postId: number;
}
