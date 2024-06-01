"use client";

import styles from "@/ui/dashboard/posts/addPost/addPost.module.scss";
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
        const url = `https://matchjobsbackend-7lo5.onrender.com/post/${params.slug}`;
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const url = `https://matchjobsbackend-7lo5.onrender.com/post/${params.slug}`;
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
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="userId"
          name="userId"
          value={formData.userId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="jobsId"
          name="jobsId"
          value={formData.jobsId}
          onChange={handleInputChange}
        />
        <div className={styles.content}>
          <textarea
            name="description"
            id="description"
            rows={16}
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="file" name="video_uploader" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditPostPage;
