import React, { useState, useRef, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";

import { Button, ImageInput, Input } from "../components/ArtsyLib";

import { Container } from "../styles/pages/postWork";
import { useAuth } from "../hooks/useAuth";
import { api } from "src/services/api";
import { Artwork } from "@entities/Artwork";

interface IFormState {
  images: string[];
  tags: string[];
  title: string;
  description: string;
}

const wizerURL = "http://localhost:5000";

const PostWork: React.FC = () => {
  const [formState, setFormState] = useState<IFormState>({
    images: [],
    description: "",
    title: "",
    tags: [],
  });
  const tagInputRef = useRef<null | HTMLInputElement>(null);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const { errorWrapper } = useAuth();

  const router = useRouter();

  function addTag(tag: string, onAdd: () => void) {
    if (formState.tags.includes(tag))
      return toast.error(`❌ Tag: "${tag}", já foi adicionada.`);

    setFormState({
      ...formState,
      tags: [...formState.tags, tag],
    });
    onAdd();
  }

  useEffect(() => {
    if (formState.images.length > 0) {
      let shouldSetState = true;
      axios
        .post(wizerURL, formState.images, { baseURL: "" })
        .then(({ data }) => {
          if (shouldSetState) {
            let newTags = [];
            data.forEach((tagGroup) => {
              tagGroup.forEach((tag) => {
                if (!newTags.includes(tag) && !formState.tags.includes(tag)) {
                  newTags.push(tag);
                }
              });
            });
            setSuggestedTags(newTags);
          }
        })
        .catch(() => setSuggestedTags([]));
      return () => {
        shouldSetState = false;
      };
    }
  }, [formState.images]);

  async function onSubmit() {
    errorWrapper(async () => {
      const { data: { id } } = await api.post<Artwork>("artwork", formState);

      router.push(`/work/${id}`);
    })
  }

  return (
    <Container>
      <section className="gallery">
        <ImageInput
          type="multiple"
          images={formState.images}
          setImages={(images) => setFormState({ ...formState, images })}
        />
      </section>
      <section className="form">
        <input
          placeholder="Título"
          className="titleInput"
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
        />
        <Input
          customtype="textArea"
          placeholder="Descrição"
          maxLength={255}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
        />
        {suggestedTags.length > 0 && (
          <>
            <h3>Tags Sugeridas:</h3>
            <span className="tagList">
              {suggestedTags.map((tag, idx) => (
                <em
                  key={idx}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    addTag(tag, () => {
                      setSuggestedTags(
                        suggestedTags.filter((suggested) => suggested !== tag)
                      );
                    });
                  }}
                >
                  {tag}
                </em>
              ))}
            </span>
          </>
        )}
        <div className="tagInput">
          <span>
            <input placeholder="Adicione uma tag" ref={tagInputRef} />
            <Button
              color="primary"
              className="addTag"
              onClick={() => {
                if (tagInputRef.current && tagInputRef.current.value) {
                  addTag(tagInputRef.current.value, () => {
                    tagInputRef.current.value = "";
                  });
                }
              }}
            >
              Adicionar
            </Button>
          </span>

          <div className="tagList">
            {formState.tags.map((tag, idx) => (
              <em key={idx}>
                {" "}
                {tag}{" "}
                <MdClose
                  onClick={() => {
                    let newTags = [...formState.tags];
                    newTags.splice(idx, 1);
                    setFormState({
                      ...formState,
                      tags: newTags,
                    });
                  }}
                />{" "}
              </em>
            ))}
          </div>
        </div>
        <Button color="confirm" className="submit" onClick={onSubmit}>
          {" "}
          Postar{" "}
        </Button>
      </section>
    </Container>
  );
};

export default PostWork;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'artsy.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

