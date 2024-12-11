"use client";

import Search from "../../components/dashboard/search";
import Link from "next/link";
import Pagination from "../../components/dashboard/pagination";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/UserContext";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AIButton from "src/app/components/common/AIButton";

interface PostProps {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  videoUrl: string;
}

const Post = ({ id, name, description, createdAt, videoUrl }: PostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const rawToken = localStorage.getItem("user") ?? "";
    const auth = JSON.parse(rawToken)?.access_token;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}post/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.info(data);
      setIsLoading(false);
      setHasDeleted(true);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading || hasDeleted ? (
        <></>
      ) : (
        <tr>
          <td
            className={
              "rounded-[20px] text-[#5d57c9] transition duration-300 bg-white cursor-pointer"
            }
          >
            <Link href={`posts/linkPost/${id}`}>{name} </Link>
          </td>
          <td className={"max-h-[5rem]"}>{description}</td>
          <td className={"max-h-[5rem]"}>{createdAt}</td>
          <td
            className={
              "rounded-[20px] text-[#5d57c9] transition duration-300 bg-white cursor-pointer"
            }
          ></td>

          <td className={"max-h-[5rem]"}>
            <div className={"flex gap-[10px]"}>
              <Link href={`/dashboard/jobs/edit/${id}`} className="h-4 w-4">
                <FaRegEdit height={24} width={24} />
              </Link>
              <button className={`h-4 w-4`} onClick={() => handleDelete(id)}>
                <MdDelete height={24} width={24} />
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const PostsPage = () => {
  const user = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const rawToken = localStorage.getItem("user") ?? "";
  const auth = JSON.parse(rawToken)?.access_token;

  useEffect(() => {
    getPostsPerPage();
  }, [page, totalPosts]);

  const getPostsPerPage = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}post${
        user?.role !== "Admin" ? `/myposts/${page}` : `/page/${page}`
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth,
        },
      });

      console.log(
        user?.role !== "Admin" ? `/myposts/${page}` : `/page/${page}`,
      );
      const data = await response.json();
      setPosts(data?.posts);
      setTotalPosts(data?.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className={`bg-[var(--bgSoft)] p-[20px] rounded-[10px] mt-[20px]`}>
      <div className={`flex items-center justify-between`}>
        <Search placeholder="Search for a post..." />
        <div className="inline-flex gap-4 w-fit">
          <Link href="/dashboard/posts/add">
            <button className="p-3 bg-[#5d57c9] text-[--text] border-none rounded-md cursor-pointer">
              Add New
            </button>
          </Link>
          <AIButton />
        </div>
      </div>
      <table className={`w-full`}>
        <thead>
          {posts?.length > 0 && (
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Created at</td>
              <td>Video</td>
            </tr>
          )}
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
            </tr>
          )}
          {posts?.length > 0 ? (
            <>
              {posts?.map((post, id) => (
                <Post
                  key={id}
                  id={post?.id}
                  name={post?.name}
                  description={post?.description}
                  createdAt={post?.createdAt}
                  videoUrl={post?.videoUrl}
                />
              ))}
            </>
          ) : (
            <>
              {!isLoading && (
                <div className={`p-8`}>Não há nenhum post no momento</div>
              )}
            </>
          )}
        </tbody>
      </table>
      <Pagination setPage={setPage} page={page} total={totalPosts} />
    </div>
  );
};

export default PostsPage;
