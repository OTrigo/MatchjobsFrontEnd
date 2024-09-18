"use client";

import styles from "../../ui/dashboard/posts/posts.module.scss";
import Search from "../../ui/dashboard/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination";
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
          <td className={styles.hover}>
            <Link href={`posts/linkPost/${id}`}>{name} </Link>
          </td>
          <td className={styles.tableItem}>{description}</td>
          <td className={styles.tableItem}>{createdAt}</td>
          <td className={styles.hover}>
            <Link
              href={`https://lfrigfcolhycpfxcxnjn.supabase.co/storage/v1/object/public/matchjobsVideos/${videoUrl}`}
            >
              Preview
            </Link>
          </td>

          <td className={styles.tableItem}>
            <div className={styles.actions}>
              <Link href={`posts/edit/${id}`}>
                <button className={`${styles.button} ${styles.view}`}>
                  Edit
                </button>
              </Link>
              <button
                className={`${styles.button} ${styles.delete}`}
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
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a post..." />
        <Link href="/dashboard/posts/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
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
                <div className={styles.noPosts}>
                  Não há nenhum post no momento
                </div>
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
