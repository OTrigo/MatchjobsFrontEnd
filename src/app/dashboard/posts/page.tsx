"use client";

import Search from "../../components/dashboard/search";
import Link from "next/link";
import Pagination from "../../components/dashboard/pagination";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/contexts/UserContext";

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
      }
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

  console.log(videoUrl);
  return (
    <>
      {isLoading || hasDeleted ? (
        <></>
      ) : (
        <tr>
          <td className="rounded-3xl hover:text-[#5d57c9] hover:bg-white cursor-pointer transition-[300ms]">
            <Link href={`posts/linkPost/${id}`}>{name} </Link>
          </td>
          <td className="max-h-20">{description}</td>
          <td className="max-h-20">{createdAt}</td>
          <td className="roundex-3xl hover:text-[#5d57c9] hover:bg-white cursor-pointer transition-[300ms]">
            <Link
              href={`https://lfrigfcolhycpfxcxnjn.supabase.co/storage/v1/object/public/matchjobsVideos/${videoUrl}`}
            >
              Preview
            </Link>
          </td>

          <td className="max-h-20">
            <div className="flex gap-3">
              <Link href={`posts/edit/${id}`}>
                <button
                  className={`py-1 px-3 text-[--text] cursor-pointer border-none bg-[teal]`}
                >
                  Edit
                </button>
              </Link>
              <button
                className={`py-1 px-3 text-[--text] cursor-pointer border-none bg-[crimson]`}
                onClick={() => handleDelete(id)}
              >
                Delete
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
    console.log(posts, totalPosts);
  }, [page, totalPosts]);

  const getPostsPerPage = async () => {
    setIsLoading(true);
    try {
      const url = `https://mjbackend.azurewebsites.net/post${
        user?.role !== "Admin" ? `/myposts/${page}` : `/page/${page}`
      }`;

      console.log(posts);
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

  console.log(posts);

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
        <Link href="/dashboard/posts/add">
          <button
            className="p-3 bg-[#5d57c9] text-white border-none rounded-md cursor-pointer
"
          >
            Add New
          </button>
        </Link>
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
