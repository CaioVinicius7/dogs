import { useState } from "react";

import { Feed } from "../components/Feed";
import { PostModal } from "../components/PostModal";

export function Home() {
  const [postId, setPostId] = useState<number | null>(null);

  const postModalShouldBeOpen = !!postId;

  return (
    <section className={`container mt-4`}>
      <Feed onSelectPost={setPostId} />

      {postModalShouldBeOpen && (
        <PostModal postId={postId} closeModal={() => setPostId(null)} />
      )}
    </section>
  );
}
