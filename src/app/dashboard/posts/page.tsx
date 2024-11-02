"use client";

import Search from "../../components/dashboard/search";
import Link from "next/link";
import Pagination from "../../components/dashboard/pagination";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/UserContext";
import { VscSparkle } from "react-icons/vsc";
import AIButton from "src/app/components/common/AIButton";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface PostProps {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  videoUrl: string;
}

const Post = ({ id, title, description, createdAt, videoUrl }: PostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
    const auth = rawToken?.access_token;
    const response = await fetch(
      `https://mjbackend.azurewebsites.net/post/${id}`,
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
          <td className="rounded-3xl hover:text-[#5d57c9] hover:bg-white cursor-pointer transition-[300ms] px-2.5 py-1">
            <Link href={`posts/linkPost/${id}`}>{title} </Link>
          </td>
          <td className="max-h-20 px-2.5 py-1">{description}</td>
          <td className="max-h-20 px-2.5 py-1">{Date.parse(createdAt)}</td>

          <td className="roundex-3xl hover:text-[#5d57c9] hover:bg-white cursor-pointer transition-[300ms] px-2.5 py-1">
            {videoUrl && (
              <Link
                href={`https://mjbackend.azurewebsites.net/upload/getVideo/${videoUrl}`}
              >
                Preview
              </Link>
            )}
          </td>

          <td className="max-h-20">
            <div className="flex gap-3">
              <Link href={`posts/edit/${id}`}>
                <FaRegEdit height={24} width={24} />
              </Link>
              <button
                className={`py-1 px-3 text-[--text] cursor-pointer border-none`}
                onClick={() => handleDelete(id)}
              >
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

  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;

  useEffect(() => {
    getPostsPerPage();
  }, [page, totalPosts]);

  const getPostsPerPage = async () => {
    setIsLoading(true);
    try {
      const url = `https://mjbackend.azurewebsites.net/post${
        user?.role !== "Admin" ? `/myposts/${user?.id}` : `/page/${page}`
      }`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth,
        },
      });

      const data = await response.json();
      console.log(data);
      setPosts(data?.posts);
      setTotalPosts(data?.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div
      className="bg-[--bgSoft] p-5 rounded-lg mt-5
"
    >
      <div
        className="flex items-center justify-between
"
      >
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
      <table className="w-full">
        <thead>
          {posts?.length > 0 && (
            <tr>
              <td className="p-2.5">Name</td>
              <td className="p-2.5">Description</td>
              <td className="p-2.5">Created at</td>
              <td className="p-2.5">Video</td>
            </tr>
          )}
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td className="p-2.5">Carregando...</td>
              <td className="p-2.5">Carregando...</td>
              <td className="p-2.5">Carregando...</td>
              <td className="p-2.5">Carregando...</td>
              <td className="p-2.5">Carregando...</td>
            </tr>
          )}
          {posts?.length > 0 ? (
            <>
              {posts?.map((post, id) => (
                <Post
                  key={id}
                  id={post?.id}
                  title={post?.title}
                  description={post?.description}
                  createdAt={post?.createdAt}
                  videoUrl={post?.videoUrl}
                />
              ))}
            </>
          ) : (
            <>
              {!isLoading && (
                <div className="p-8">Não há nenhum post no momento</div>
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
