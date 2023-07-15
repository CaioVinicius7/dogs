import { useEffect, useState } from "react";

import styles from "./Feed.module.css";

import { Photo } from "./Photo";
import { Loading } from "./Loading";

import { postService } from "../services/post";

interface PhotoData {
  id: number;
  author: string;
  title: string;
  date: string;
  url: string;
  weight: number;
  age: number;
  views: number;
  comments: number;
}

export function Feed() {
  const [photos, setPhotos] = useState<PhotoData[] | null>(null);

  useEffect(() => {
    postService
      .getPosts({
        page: 1,
        itemsPerPage: 6
      })
      .then((response) => setPhotos(response));
  }, []);

  if (!photos) {
    return <Loading />;
  }

  return (
    <ul className={`animationLeft ${styles.feed}`}>
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          title={photo.title}
          url={photo.url}
          views={photo.views}
        />
      ))}
    </ul>
  );
}
