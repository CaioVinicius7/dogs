import { useState } from "react";
import { Helmet } from "react-helmet";

import { Feed } from "../components/Feed";
import { PostModal } from "../components/PostModal";

export function Home() {
  const [postId, setPostId] = useState<number | null>(null);

  const postModalShouldBeOpen = !!postId;

  return (
    <>
      <Helmet>
        <title>Home | Dogs</title>

        <meta
          name="description"
          content="Veja as ultima publicações e interaja com a comunidade!"
        />
      </Helmet>

      <section className={`container mt-2`}>
        <Feed onSelectPost={setPostId} />

        {postModalShouldBeOpen && (
          <PostModal postId={postId} closeModal={() => setPostId(null)} />
        )}
      </section>
    </>
  );
}
