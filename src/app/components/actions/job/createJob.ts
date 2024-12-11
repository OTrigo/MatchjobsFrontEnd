export type JobProps = {
  companyId: string;
  description: string;
  title: string;
  auth: string;
};

export const createJob = async ({
  companyId,
  description,
  title,
  auth,
}: JobProps) => {
  try {
    console.log("Isso não faz sentido ->", companyId);
    const body = {
      companyId,
      description,
      title,
    };
    console.log("JOB BODY:", body);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}job`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("JOB RESPONSE:", data);

    if (response.ok) {
      console.log("Job Created");
    }

    return data?.id;
  } catch (error) {
    console.error("Error:", error);
    return;
  }
};
