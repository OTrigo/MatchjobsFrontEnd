"use client";

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
        },
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
    <div className="flex bg-[--bgSoft] p-5 rounded-xl mt-5 gap-4 w-full justify-center items-center">
      <span>Adding a Job</span>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="py-1 px-3 bg-transparent focus:bg-white focus:text-black duration-200 text-[--text] border-2 border-[#2e374a] rounded-md h-full my-4"
          required
        />
        <div className={"flex w-full"}>
          <textarea
            name="desc"
            id="desc"
            rows={16}
            placeholder="Description"
            defaultValue={""}
            className="p-8 bg-transparent text-[--text] border-2 border-solid border-[#2e374a] rounded-md h-40 w-full resize-none focus:bg-white focus:text-black duration-200"
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-1 px-3 bg-transparent text-white border border-1 bg-[#151c2c] focus:bg-white focus:text-black hover:bg-white focus:text-[#2e374a] hover:text-[#2e374a] rounded-md h-full my-4 duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
