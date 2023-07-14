import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";

import { ReactComponent as Upload } from "../assets/upload.svg";

import styles from "./Post.module.css";

interface Image {
  name: string;
  preview: string;
  raw: File;
}

const createPostValidationSchema = z.object({
  name: z
    .string({
      required_error: "Esse campo é obrigatório."
    })
    .min(3, {
      message: "Esse campo deve ter no mínimo 3 caracteres."
    }),
  weight: z
    .number({
      required_error: "Esse campo é obrigatório."
    })
    .int({
      message: "Esse campo deve ser um número inteiro."
    })
    .positive({
      message: "Esse campo deve ter um valor positivo."
    }),

  age: z
    .number({
      required_error: "Esse campo é obrigatório."
    })
    .int({
      message: "Esse campo deve ser um número inteiro."
    })
    .positive({
      message: "Esse campo deve ter um valor positivo."
    })
});

type CreatePostFormFields = z.infer<typeof createPostValidationSchema>;

export function Post() {
  const [image, setImage] = useState<Image | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePostFormFields>({
    resolver: zodResolver(createPostValidationSchema),
    shouldFocusError: true
  });

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

  function handleCreatePost({ name, weight, age }: CreatePostFormFields) {
    console.log("Submit Realizado");
    console.log({ name, weight, age });
  }

  return (
    <section className={`${styles.photoPost} animationLeft`}>
      <form className={styles.form} onSubmit={handleSubmit(handleCreatePost)}>
        <Input
          type="text"
          label="Nome"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          type="number"
          label="Peso"
          error={errors.weight?.message}
          {...register("weight", {
            setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10))
          })}
        />

        <Input
          type="number"
          label="Idade"
          error={errors.age?.message}
          {...register("age", {
            setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10))
          })}
        />

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
