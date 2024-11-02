"use client";

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
        const url = `https://mjbackend.azurewebsites.net/job/${params.slug}`;
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
      const url = `https://mjbackend.azurewebsites.net/job/${params.slug}`;
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

export default EditJobPage;
