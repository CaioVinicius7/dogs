import { useState } from "react";
import { Helmet } from "react-helmet";

import { Feed } from "../components/Feed";
import { PostModal } from "../components/PostModal";

import { useAuthContext } from "../hooks/useAuthContext";

export function UserFeed() {
  const [postId, setPostId] = useState<number | null>(null);

  const postModalShouldBeOpen = !!postId;

  const { user } = useAuthContext();

  return (
    <>
      <Helmet>
        <title>Meu Feed | Dogs</title>

        <meta name="robots" content="noindex" />
      </Helmet>

      <section>
        <Feed userIdOrUsername={user?.id} onSelectPost={setPostId} />

        {postModalShouldBeOpen && (
          <PostModal postId={postId} closeModal={() => setPostId(null)} />
        )}
      </section>
    </>
  );
}
