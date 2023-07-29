import { useParams } from "react-router-dom";

import { Post as PostContent } from "../components/Post";

export function Post() {
  const { postId } = useParams();

  return (
    <main className="container mt-2">
      <PostContent postId={Number(postId)} single />
    </main>
  );
}
