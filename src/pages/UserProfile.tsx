import { useState } from "react";
import { useParams } from "react-router-dom";

import { Feed } from "../components/Feed";
import { PostModal } from "../components/PostModal";

export function UserProfile() {
  const [postId, setPostId] = useState<number | null>(null);

  const { username } = useParams();

  const postModalShouldBeOpen = !!postId;

  return (
    <main className="container mt-2">
      <h1 className="title">{username}</h1>

      <Feed onSelectPost={setPostId} userIdOrUsername={username} />

      {postModalShouldBeOpen && (
        <PostModal postId={postId} closeModal={() => setPostId(null)} />
      )}
    </main>
  );
}
