"use client";

import styles from "@/ui/dashboard/posts/addPost/addPost.module.scss";
import { createClient } from "@supabase/supabase-js";
import { useState, useContext } from "react";
import { UserContext } from "../../layout";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";

console.log(supabaseUrl, supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  desc: HTMLTextAreaElement;
  video_uploader: HTMLInputElement;
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

    try {
      const { data, error } = await supabase.storage
        .from("matchjobsVideos")
        .upload(`${videoFile.name}`, videoFile);

      if (error) {
        console.error("Error uploading file:", error);
        if (error.message) {
          alert("Vídeo duplicado, por favor, escolha outro vídeo.");
        }
        return;
      }

      const videoUrl = `${supabaseUrl}/storage/v1/object/${data.path}`;

      const postData = {
        name: title?.value,
        description: desc?.value,
        userId: user?.id,
        videoUrl: videoUrl,
      };
      const response = await fetch(
        "https://matchjobsbackend-7lo5.onrender.com/post/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: "Bearer" + auth,
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        alert("Post successfully submitted!");
      } else {
        alert("Failed to submit post");
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
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
            name="video_uploader"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPostPage;
