import { api } from "../libs/axios";

import { GetStatsResponse } from "./types/stats";

export const statsService = {
  getStats: async () => {
    const { data } = await api.get<GetStatsResponse>("/api/stats");

    const formattedData = data.map((postStats) => {
      return {
        postId: postStats.id,
        title: postStats.title,
        access: Number(postStats.acessos)
      };
    });

    return formattedData;
  }
};
