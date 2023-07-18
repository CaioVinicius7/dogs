import { api } from "../libs/axios";

interface Post {
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

interface Comment {
  comment_ID: string;
  comment_author: string;
  comment_content: string;
}

interface CreatePostRequest {
  name: string;
  weight: number;
  age: number;
  img: File;
}

interface GetPostsRequest {
  page: number;
  itemsPerPage: number;
  userId?: number;
}

type GetPostsResponse = Post[];

interface GetPostByIdRequest {
  postId: number;
}

interface GetPostByIdResponse {
  photo: Post;
  comments: Comment[];
}

interface AddCommentRequest {
  postId: number;
  comment: string;
}

interface AddCommentRequest {
  postId: number;
  comment: string;
}

type AddCommentResponse = Comment;

interface DeletePostRequest {
  postId: number;
}

export const postService = {
  createPost: async ({ name, weight, age, img }: CreatePostRequest) => {
    const formData = new FormData();

    formData.append("nome", name);
    formData.append("peso", weight.toString());
    formData.append("idade", age.toString());
    formData.append("img", img);

    await api.post("/api/photo", formData);
  },
  getPosts: async ({ page, itemsPerPage, userId = 0 }: GetPostsRequest) => {
    const { data } = await api.get<GetPostsResponse>("/api/photo", {
      params: {
        _page: page,
        _total: itemsPerPage,
        _user: userId,
        timestamp: new Date().getTime()
      }
    });

    const formattedData = data.map((photo) => {
      return {
        id: Number(photo.id),
        author: photo.author,
        title: photo.title,
        date: photo.date,
        url: photo.src,
        weight: Number(photo.peso),
        age: Number(photo.idade),
        views: Number(photo.acessos),
        comments: Number(photo.total_comments)
      };
    });

    return formattedData;
  },
  getPostById: async ({ postId }: GetPostByIdRequest) => {
    const { data } = await api.get<GetPostByIdResponse>(
      `/api/photo/${postId}`,
      {
        params: {
          timestamp: new Date().getTime()
        }
      }
    );

    const formattedData = {
      id: Number(data.photo.id),
      author: data.photo.author,
      title: data.photo.title,
      date: data.photo.date,
      url: data.photo.src,
      weight: Number(data.photo.peso),
      age: Number(data.photo.idade),
      views: Number(data.photo.acessos),
      comments: data.comments.map((comment) => {
        return {
          id: Number(comment.comment_ID),
          author: comment.comment_author,
          content: comment.comment_content
        };
      })
    };

    return formattedData;
  },
  addComment: async ({ postId, comment }: AddCommentRequest) => {
    const { data } = await api.post<AddCommentResponse>(
      `/api/comment/${postId}`,
      {
        comment
      }
    );

    const formattedData = {
      id: Number(data.comment_ID),
      content: data.comment_content,
      author: data.comment_author
    };

    return formattedData;
  },
  deletePost: async ({ postId }: DeletePostRequest) => {
    await api.delete(`/api/photo/${postId}`);
  }
};
