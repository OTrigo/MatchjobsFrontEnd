"use client";

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
  const rawToken = localStorage.getItem("user") ?? "";
  const auth = JSON.parse(rawToken)?.access_token;

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
          const formData = new FormData();
          formData.append("file", file);
          formData.append("nameFile", nameFile);
          formData.append("name", name);
          formData.append("description", description ?? "");
          formData.append("userId", userId.toString());

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}upload/upload-video/`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (response.ok) {
            console.info("Video uploaded");
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
              `${process.env.NEXT_PUBLIC_API_URL}post/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authentication: "Bearer " + auth,
                },
                body: JSON.stringify(postData),
              },
            );

            console.log(response);

            if (!response.ok) {
              alert("Failed to submit post");
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
    <div className="bg-[var(--bgSoft)] p-5 flex rounded-lg mt-5 gap-4 w-full">
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          required
          className="p-8 bg-transparent text-[var(--text)] border-2 border-[#2e374a] rounded-md w-full mt-4"
        />
        <div className="flex w-full mt-4">
          <textarea
            name="desc"
            id="desc"
            rows={16}
            placeholder="Description"
            defaultValue=""
            className="w-full resize-none p-8 bg-transparent text-[var(--text)] border-2 border-[#2e374a] rounded-md"
          ></textarea>
        </div>
        <input
          type="file"
          name="videoFile"
          onChange={handleFileChange}
          id="videoFile"
          required
          className="w-1/2 h-full mt-4"
        />
        <button
          type="submit"
          className="w-full p-8 bg-teal-500 text-[var(--text)] border-none cursor-pointer mt-8"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;
