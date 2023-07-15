import { api } from "../libs/axios";

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

interface GetPostsResponse {
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
    const { data } = await api.get<GetPostsResponse[]>("/api/photo", {
      params: {
        _page: page,
        _total: itemsPerPage,
        _user: userId
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
  }
};
