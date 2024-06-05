"use client";

import styles from "../../../../ui/dashboard/posts/addPost/addPost.module.scss";
import { useContext } from "react";
import { UserContext } from "src/contexts/UserContext";

interface FormElements extends HTMLFormControlsCollection {
  description: HTMLInputElement;
  name: HTMLInputElement;
  available: HTMLInputElement;
  companyId: any;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const LinkPostInJob = ({ params }: { params: { slug: string } }) => {
  const user = useContext(UserContext);
  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();

    const { description, name, available } = e.currentTarget.elements;

    console.log(description, name, available, user?.role);

    const validateAdmin = (role: string | undefined) => {
      console.log("role", role);
      if (role == "Admin") {
        return 1;
      }
      alert("You are not allowed to do this.");
    };

    console.log({
      id: params.slug,
      name: name?.value,
      available: available?.value,
      description: description?.value,
      companyId: user?.companyId ?? validateAdmin(user?.role),
    });

    console.log(Date.now())

    try {
      const response = await fetch(
        `https://matchjobsbackend-7lo5.onrender.com/post/addjob/${params.slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + auth,
          },
          body: JSON.stringify({
            id: params.slug,
            name: name?.value,
            createdAt: Date.now(),
            available: available?.value,
            companyId: user?.companyId ?? validateAdmin(user?.role),
          }),
        }
      );

      if (!response.ok) {
        console.error("Error:", response);
      }

      const data = response.json();
      return data;
    } catch (error) {
      console.log("erro:", error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.idAndAvailable}>
          <input
            type="text"
            placeholder="Title of the Job"
            name="name"
            required
          />
          <div className={styles.available}>
            Available <input type="checkbox" id="available" />
          </div>
        </div>

        <textarea
          name="description"
          id="description"
          rows={16}
          placeholder="Description"
          defaultValue={""}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LinkPostInJob;
