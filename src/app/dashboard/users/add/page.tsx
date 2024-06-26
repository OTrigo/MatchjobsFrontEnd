"use client";

import styles from "../../../ui/dashboard/posts/addPost/addPost.module.scss";
import { useState, useContext } from "react";
import { UserContext } from "src/contexts/UserContext";

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  desc: HTMLTextAreaElement;
  videoFile: File;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const AddPostPage = () => {
  const user = useContext(UserContext);
  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();

    const { title, desc } = e.currentTarget.elements;

    if (!videoFile) {
      console.error("No video file selected");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    const name = videoFile.name;
    const file = videoFile;

    reader.onloadend = async () => {
      const uploadVideo = async () => {
        const DateNow = Date.now();
        const nameFile = name + user?.name + DateNow;
        const description = typeof desc === "string" ? desc : desc.value;
        const userId = user?.id ?? "";

        try {
          // Cria um novo objeto FormData
          const formData = new FormData();
          formData.append("file", file); // Anexa o arquivo
          formData.append("nameFile", nameFile);
          formData.append("name", name);
          formData.append("description", description ?? "");
          formData.append("userId", userId.toString());
          console.log("formData: ", formData);

          const response = await fetch(
            "https://matchjobsbackend-7lo5.onrender.com/upload-video/",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            console.log("Video uploaded");
          }
        } catch (error) {
          console.error(error);
        }

        return name;
      };

      const uploadPost = async () => {
        const videoName = await uploadVideo();

        const postData = {
          name: title?.value,
          description: desc?.value,
          userId: user?.id,
          videoUrl: videoName,
        };

        if (videoName.length > 0) {
          try {
            const response = await fetch(
              "https://matchjobsbackend-7lo5.onrender.com/post/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authentication: "Bearer " + auth,
                },
                body: JSON.stringify(postData),
              }
            );

            if (!response.ok) {
              alert("Failed to submit post");
              throw new Error("Failed to upload video");
            } else {
              alert("Post successfully submitted!");
            }
          } catch (error) {
            alert(`Error: ${error}`);
          }
        }
      };

      uploadPost();
    };
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="title" name="title" required />
        <div className={styles.content}>
          <textarea
            name="desc"
            id="desc"
            rows={16}
            placeholder="Description"
            defaultValue={""}
          ></textarea>
          <input
            type="file"
            name="videoFile"
            onChange={handleFileChange}
            id="videoFile"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPostPage;
