import { useState } from "react";

import { Feed } from "../components/Feed";
import { PostModal } from "../components/PostModal";

import { useAuthContext } from "../hooks/useAuthContext";

export function UserFeed() {
  const [postId, setPostId] = useState<number | null>(null);

  const postModalShouldBeOpen = !!postId;

  const { user } = useAuthContext();

  return (
    <section>
      <Feed userId={user?.id} onSelectPost={setPostId} />

      {postModalShouldBeOpen && (
        <PostModal postId={postId} closeModal={() => setPostId(null)} />
      )}
    </section>
  );
}
