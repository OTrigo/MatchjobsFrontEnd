"use client";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "src/contexts/UserContext";
import { uploadVideo } from "src/app/components/actions/video/uploadVideo";
import { uploadPost } from "src/app/components/actions/post/createPost";
import { createJob } from "src/app/components/actions/job/createJob";

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
  const [isJob, setIsJob] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();

    const { title, desc } = e.currentTarget.elements;

    if (!videoFile) {
      console.error("No video file selected");
      return;
    }

    if (!title || !desc || !user) {
      console.error("No Title or Description or User to emit a post.");
    }

    const postId = await uploadPost({ title, desc, user, auth });

    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    const name = videoFile.name;
    const file = videoFile;

    reader.onloadend = async () => {
      uploadVideo({ desc, name, file, postId, auth });
    };

    if (isJob) {
      const companyId = user?.companyId ?? "";
      const titleName = title?.value;
      const description = desc?.value;

      console.log("Info to create a Job:", {
        titleName,
        companyId,
      });

      const jobId = await createJob({
        companyId,
        description,
        title: titleName,
        auth,
      });

      // console.log("Info to link job into post:", {
      //   jobId,
      //   companyId,
      //   titleName,
      // });
      // linkPostToJob({ jobId, companyId, title: titleName, auth });
    }
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
        <div className="flex items-center gap-4 mb-3">
          <span>Is a Job?</span>
          <input
            type="button"
            placeholder=""
            name="job"
            className={`h-4 w-4 border border-[#2e374a] ${isJob && "bg-green-600 border-none"} transition-all duration-200 rounded-full cursor-pointer`}
            onClick={() => {
              setIsJob(!isJob);
            }}
          />
        </div>
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
