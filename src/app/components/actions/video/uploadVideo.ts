export type PostVideoProps = {
  desc: HTMLTextAreaElement;
  name: string;
  file: File;
  postId: string;
  auth: string;
};

export const uploadVideo = async ({
  name: title,
  file,
  postId,
  auth,
}: PostVideoProps) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}upload/uploadVideo/${postId}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error uploading Video", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return title;
};
