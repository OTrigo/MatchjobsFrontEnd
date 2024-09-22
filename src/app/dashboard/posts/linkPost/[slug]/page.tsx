"use client";

import { useState } from "react";
import { MutatingDots } from "react-loader-spinner";

interface FormElements extends HTMLFormControlsCollection {
  id: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface RequestJobAndLinkPostProps {
  auth: string;
  jobId: string;
  slug?: string;
}

const createLinkInPost = async ({ job, auth, slug }: any) => {
  console.log(job);
  try {
    const response = await fetch(
      `https://mjbackend.azurewebsites.net/post/addjob/${slug}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth,
        },
        body: JSON.stringify({
          id: job.id,
          name: job.name,
          description: job.description,
          available: job.available,
          companyId: job.companyId,
        }),
      }
    );

    if (!response.ok) {
      alert("Cannot link the job with the post");
      console.log(slug, job.id);
      console.error("Error:", response);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.log("erro:", error);
    alert(`Error: Job doesn't exist`);
  }
};

const getJob = async ({ auth, jobId }: RequestJobAndLinkPostProps) => {
  try {
    const response = await fetch(
      `https://mjbackend.azurewebsites.net/job/${jobId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth,
        },
      }
    );

    if (!response.ok) {
      alert("Error: Cannot fetch job");
      return;
    }

    const data = await response.json();
    if (data === null || data?.length === 0) {
      alert("Error: Job doesn't exist");
    }

    console.log(data);
    return data;
  } catch (err) {
    console.log(auth, jobId);
    console.log(`https://mjbackend.azurewebsites.net/job/${jobId}`);
    alert(`Error: Cannot fetch job, ${err}`);
  }
};

const LinkPostInJob = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(false);
  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { id } = e.currentTarget.elements;
    const slug = params.slug;

    const jobId = id.value;

    const job = await getJob({ auth, jobId });
    setLoading(false);

    if (job) {
      setLoading(true);
      const link = await createLinkInPost({ job, auth, slug });
      console.log(link);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[--bgSoft] p-5 flex rounded-lg mt-5 gap-4 w-full">
      {loading ? (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#0579bd"
          secondaryColor="#0579bd"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="flex items-center border-2 border-[#2e374a] rounded-md">
            <input
              type="text"
              placeholder="Id of the job to link this post"
              name="id"
              className="p-8 bg-transparent text-white border-2 border-[#2e374a] rounded-md h-full my-4"
              required
            />
          </div>
          <button
            className="p-8 bg-transparent text-white border-2 border-[#2e374a] rounded-md h-full my-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default LinkPostInJob;
