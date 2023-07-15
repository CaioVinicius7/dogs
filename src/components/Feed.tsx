import { Photo } from "./Photo";

import styles from "./Feed.module.css";

const photos = [
  {
    id: 239,
    author: "cat",
    title: "Joel",
    date: "2020-07-20 21:24:23",
    src: "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/freddie-marriage-w39PTDxKiK8-unsplash-1-1000x1000.jpg",
    peso: "10",
    idade: "12",
    acessos: "154486",
    total_comments: "1"
  },
  {
    id: 233,
    author: "cat",
    title: "Ellie",
    date: "2020-07-20 21:21:37",
    src: "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/charles-deluvio-Mv9hjnEUHR4-unsplash-1-1000x1000.jpg",
    peso: "4",
    idade: "12",
    acessos: "197675",
    total_comments: "1"
  },
  {
    id: 231,
    author: "cat",
    title: "Abby",
    date: "2020-07-20 21:19:12",
    src: "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/julio-bernal-BfsCw2ngc6A-unsplash-1-1000x1000.jpg",
    peso: "4",
    idade: "5",
    acessos: "44358",
    total_comments: "1"
  },
  {
    id: 229,
    author: "cat",
    title: "Ashley",
    date: "2020-07-20 21:16:20",
    src: "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/alan-quirvan-Un2l252-pWA-unsplash-1-1000x1000.jpg",
    peso: "3",
    idade: "8",
    acessos: "19940",
    total_comments: "0"
  },
  {
    id: 227,
    author: "cat",
    title: "Dina",
    date: "2020-07-20 21:14:30",
    src: "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/erik-mclean-QdzRfeLaXPA-unsplash-1-1000x1000.jpg",
    peso: "3",
    idade: "6",
    acessos: "32341",
    total_comments: "0"
  },
  {
    id: 225,
    author: "cat",
    title: "Yara",
    date: "2020-07-20 21:13:19",
    src: "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/charles-deluvio-oWTW-jNGl9I-unsplash-1-1000x1000.jpg",
    peso: "5",
    idade: "3",
    acessos: "22026",
    total_comments: "0"
  }
];

export function Feed() {
  return (
    <ul className={`animationLeft ${styles.feed}`}>
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          title={photo.title}
          url={photo.src}
          views={Number(photo.acessos)}
        />
      ))}
    </ul>
  );
}
