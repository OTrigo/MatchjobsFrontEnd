"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "src/contexts/UserContext";
import { useParams } from "next/navigation";

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
  const urlParams = new URLSearchParams(window.location.search);
  const hasGeneratedResponse = urlParams.get("isAI");
  const generatedResponse =
    window.localStorage.getItem("lastGeneratedVacancy") ?? "";

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [defaultText, setDefaultText] = useState<string>(
    generatedResponse ?? "",
  );

  useEffect(() => {
    setDefaultText(window.localStorage.getItem("lastGeneratedVacancy") ?? "");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  type UploadProps = {
    title: HTMLInputElement;
    desc: HTMLTextAreaElement;
  };

  type PostVideoProps = {
    desc: HTMLTextAreaElement;
    name: string;
    file: File;
    postId: string;
  };

  const uploadVideo = async ({ name, file, postId }: PostVideoProps) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://mjbackend.azurewebsites.net/upload/uploadVideo/${postId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        },
      );

      const test = await response.json();
      console.log(test);

      if (response.ok) {
        console.log("Video uploaded");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    return name;
  };

  const uploadPost = async ({ title, desc }: UploadProps) => {
    const postData = {
      title: title?.value,
      description: desc?.value,
      userId: user?.id,
    };

    try {
      const response = await fetch(
        "https://mjbackend.azurewebsites.net/post/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(postData),
        },
      );

      if (!response.ok) {
        alert("Failed to submit post");
        console.error("Error");
      }

      const createdPost = await response?.json();

      console.log(createdPost?.id);
      return createdPost?.id;
    } catch (error) {
      console.error("Error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();

    const { title, desc } = e.currentTarget.elements;

    if (!videoFile) {
      console.error("No video file selected");
      return;
    }

    if (!title || !desc) {
      console.error("No Title or Description to emit a post.");
    }

    const postId = await uploadPost({ title, desc });

    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    const name = videoFile.name;
    const file = videoFile;

    reader.onloadend = async () => {
      uploadVideo({ desc, name, file, postId });
    };
  };

  return (
    <div
      className="bg-[#182237] p-5 flex rounded-lg mt-5 gap-4 w-full items-center justify-center
"
    >
      <span>Adding a new Post</span>
      <form
        className="flex flex-col w-full"
        onSubmit={(e) => handleSubmit(e as React.FormEvent<FormElement>)}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="py-1 px-3 bg-transparent focus:bg-white focus:text-black duration-200 text-[--text] border-2 border-[#2e374a] rounded-md h-full my-4"
          required
        />
        <div className="w-full h-fit flex gap-5">
          <textarea
            name="desc"
            id="desc"
            rows={16}
            placeholder="Description"
            defaultValue={defaultText}
            className="flex py-1 px-3 bg-transparent text-[--text] focus:bg-white focus:text-black duration-200 border-2 border-[#2e374a] rounded-md resize-none h-[280px] grow
"
          ></textarea>
          <input
            type="file"
            name="videoFile"
            onChange={handleFileChange}
            id="videoFile"
            className="py-1 px-3 bg-transparent text-[--text] border-2 border-[#2e374a] rounded-md w-[25%]
"
            required
          />
        </div>
        <button
          type="submit"
          className="py-1 px-3 bg-transparent text-white border border-1 bg-[#151c2c] focus:bg-white hover:bg-white focus:text-[#2e374a] hover:text-[#2e374a] rounded-md h-full my-4 duration-300
"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;
