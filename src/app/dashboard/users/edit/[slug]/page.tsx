"use client";

import { useState, useEffect } from "react";

const EditPostPage = ({ params }: { params: { slug: string } }) => {
  const rawToken = JSON.parse(localStorage.getItem("user") ?? "{}");
  const auth = rawToken?.access_token;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userId: "",
    videoUrl: "",
    jobsId: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `https://mjbackend.azurewebsites.net/post/${params.slug}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        setFormData({
          name: data.name,
          description: data.description,
          userId: data.userId,
          videoUrl: data.videoUrl,
          jobsId: data.jobsId,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [params.slug, auth]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        videoUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `https://mjbackend.azurewebsites.net/post/${params.slug}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, options);
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[var(--bgSoft)] p-5 flex rounded-lg mt-5 gap-4 w-full">
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="p-8 bg-transparent text-[var(--text)] border-2 border-[#2e374a] rounded-md w-full mt-4"
        />
        <input
          type="text"
          placeholder="userId"
          name="userId"
          value={formData.userId}
          onChange={handleInputChange}
          className="p-8 bg-transparent text-[var(--text)] border-2 border-[#2e374a] rounded-md w-full mt-4"
        />
        <input
          type="text"
          placeholder="jobsId"
          name="jobsId"
          value={formData.jobsId}
          onChange={handleInputChange}
          className="p-8 bg-transparent text-[var(--text)] border-2 border-[#2e374a] rounded-md w-full mt-4"
        />
        <div className="flex w-full">
          <textarea
            name="description"
            id="description"
            rows={16}
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full resize-none p-8 bg-transparent text-[var(--text)] border-2 border-[#2e374a] rounded-md mt-4"
          ></textarea>
        </div>
        <input
          type="file"
          name="video_uploader"
          onChange={handleFileChange}
          className="w-1/2 h-full"
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

export default EditPostPage;
