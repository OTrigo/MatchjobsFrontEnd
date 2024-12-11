export type LinkJobProps = {
  jobId: string;
  companyId: string;
  title: string;
  auth: string;
};

export const linkPostToJob = async ({
  jobId,
  companyId,
  title,
  auth,
}: LinkJobProps) => {
  try {
    console.log(jobId);
    const body = {
      title,
      companyId,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}post/addjob/${companyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(body),
      },
    );

    console.log(response);
    const data = await response.json();
    console.log("JOB LINKADO COM SUCESSO:", data);
  } catch (error) {
    console.error("ERRO AO LINKAR O JOB:", error);
  }
};
