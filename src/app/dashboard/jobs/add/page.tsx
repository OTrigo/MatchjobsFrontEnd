"use client";

import styles from "../../../ui/dashboard/posts/addPost/addPost.module.scss";
import { useState, useContext } from "react";
import { UserContext } from "src/contexts/UserContext";

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  desc: HTMLTextAreaElement;
  companyId: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const AddJobPage = () => {
  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();

    const { title, desc, companyId } = e.currentTarget.elements;

    JSON.stringify({
      title: title?.value,
      desc: desc?.value,
      companyId: companyId?.value,
    });

    try {
      const postData = {
        name: title?.value,
        description: desc?.value,
        companyId: parseInt(companyId?.value),
      };

      const postResponse = await fetch(
        "https://mjbackend.azurewebsites.net/job/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: "Bearer " + auth,
          },
          body: JSON.stringify(postData),
        }
      );

      if (postResponse.ok) {
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
        <input type="text" placeholder="companyId" name="companyId" required />
        <div className={styles.content}>
          <textarea
            name="desc"
            id="desc"
            rows={16}
            placeholder="Description"
            defaultValue={""}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddJobPage;
