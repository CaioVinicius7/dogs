import { useState } from "react";

import styles from "./Image.module.css";

interface ImageProps {
  src: string;
  alt: string;
}

export function Image({ src, alt }: ImageProps) {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  function onLoadImage() {
    setImageIsLoading(false);
  }

  return (
    <div className={styles.imageWrapper}>
      {imageIsLoading && <div className={styles.skeleton} />}

      <img
        className={styles.image}
        style={{
          opacity: imageIsLoading ? 0 : 1
        }}
        onLoad={onLoadImage}
        src={src}
        alt={alt}
      />
    </div>
  );
}
