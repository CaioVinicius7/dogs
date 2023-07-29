import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Post as PostContent } from "../components/Post";

export function Post() {
  const { postId } = useParams();

  return (
    <>
      <Helmet>
        <title>Post | Dogs</title>

        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="container mt-2">
        <PostContent postId={Number(postId)} single />
      </main>
    </>
  );
}
