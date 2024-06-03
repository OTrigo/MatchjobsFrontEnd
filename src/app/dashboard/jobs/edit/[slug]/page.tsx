"use client";

import styles from "../../../../ui/dashboard/posts/addPost/addPost.module.scss";
import { useState, useEffect } from "react";

const EditJobPage = ({ params }: { params: { slug: string } }) => {
  const rawToken = JSON.parse(localStorage.getItem("user") ?? "{}");
  const auth = rawToken?.access_token;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    companyId: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const url = `https://matchjobsbackend-7lo5.onrender.com/job/${params.slug}`;
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
          companyId: data.companyId,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchJob();
  }, [params.slug, auth]);

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
      const url = `https://matchjobsbackend-7lo5.onrender.com/job/${params.slug}`;
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
      console.log("Updated job:", data);
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
          placeholder="companyId"
          name="companyId"
          value={formData.companyId}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditJobPage;
