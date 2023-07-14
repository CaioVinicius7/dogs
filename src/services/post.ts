import { api } from "../libs/axios";

interface CreatePostRequest {
  name: string;
  weight: number;
  age: number;
  img: File;
}

export const postService = {
  async createPost({ name, weight, age, img }: CreatePostRequest) {
    const formData = new FormData();

    formData.append("nome", name);
    formData.append("peso", weight.toString());
    formData.append("idade", age.toString());
    formData.append("img", img);

    await api.post("/api/photo", formData);
  }
};
