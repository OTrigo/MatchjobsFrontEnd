import { DataUserProps } from "src/app/dashboard/layout";

export type UploadProps = {
  title: HTMLInputElement;
  desc: HTMLTextAreaElement;
  user: DataUserProps | null;
  auth: string;
};

export const uploadPost = async ({ title, desc, user, auth }: UploadProps) => {
  const postData = {
    title: title?.value,
    description: desc?.value,
    userId: user?.id,
  };

  const body = JSON.stringify(postData);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body,
    });

    const createdPost = await response?.json();

    if (window.localStorage.getItem("lastGeneratedVacancy")) {
      window.localStorage.removeItem("lastGeneratedVacancy");
    }
    console.log("POST CREATED:", createdPost);
    return createdPost?.id;
  } catch (error) {
    console.error("Error");
  }
};
