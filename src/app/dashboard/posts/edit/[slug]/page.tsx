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
      console.log("Updated post:", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[--bgSoft] p-5 flex rounded-lg mt-5 w-full">
      <form
        className="flex flex-col w-full h-fit gap-4
"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="name"
          name="name"
          className="py-1 px-3 bg-transparent focus:bg-white focus:text-black duration-200 text-[--text] border-2 border-[#2e374a] rounded-md h-full my-4
"
          value={formData.name}
          onChange={handleInputChange}
        />

        <div className="w-full h-fit flex grow gap-5">
          <textarea
            name="description"
            id="description"
            rows={16}
            className="w-full px-3 bg-transparent focus:bg-white focus:text-black duration-200 text-[--text] border-2 border-[#2e374a] rounded-md h-full
"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="file"
            className="py-1 px-3 bg-transparent focus:bg-white focus:text-black duration-200 text-[--text] border-2 border-[#2e374a] rounded-md h-full my-4
"
            name="video_uploader"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="py-1 px-3 bg-transparent focus:bg-white focus:text-black duration-200 text-[--text] border-2 border-[#2e374a] rounded-md h-full
"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
