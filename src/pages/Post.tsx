import { ChangeEvent, useRef, useState } from "react";

import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

import { ReactComponent as Upload } from "../assets/upload.svg";

import styles from "./Post.module.css";

interface Image {
  name: string;
  preview: string;
  raw: File;
}

export function Post() {
  const [image, setImage] = useState<Image | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (!target.files) {
      return;
    }

    setImage({
      name: target.files[0].name,
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0]
    });
  }

  return (
    <section className={`${styles.photoPost} animationLeft`}>
      <form className={styles.form}>
        <Input name="Nome" label="Nome" type="text" />
        <Input name="Peso" label="Peso" type="text" />
        <Input name="Idade" label="Idade" type="text" />

        <div className={styles.uploadImage}>
          <Button
            style={{
              minWidth: "unset",
              padding: "0.5rem 0.75rem"
            }}
            aria-label="Upload de arquivo"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload />
          </Button>

          <span>{image ? image.name : "Nenhuma imagem selecionada"}</span>
        </div>

        <input
          name="img"
          id="img"
          type="file"
          multiple={false}
          accept="image/*"
          className={styles.hide}
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <Button>Enviar</Button>
      </form>

      <div>
        {!!image && image.preview && (
          <div
            className={styles.preview}
            style={{
              backgroundImage: `url("${image.preview}")`
            }}
          />
        )}
      </div>
    </section>
  );
}
