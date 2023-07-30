interface PostStats {
  id: number;
  title: string;
  acessos: string;
}

export type GetStatsResponse = PostStats[];
