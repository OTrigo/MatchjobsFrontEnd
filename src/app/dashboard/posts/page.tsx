"use client";

import styles from "@/ui/dashboard/posts/posts.module.scss";
import Search from "@/ui/dashboard/search";
import Link from "next/link";
import Pagination from "@/ui/dashboard/pagination";
import { useEffect, useState } from "react";

interface PostProps {
  name: string;
  description: string;
  createdAt: string;
  videoUrl: string;
}

const Post = ({ name, description, createdAt, videoUrl }: PostProps) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{description}</td>
        <td>{createdAt}</td>
        <a href={videoUrl}>
          <td>Preview</td>
        </a>
        <td>
          <div className={styles.actions}>
            <Link href="/">
              <button className={`${styles.button} ${styles.view}`}>
                View
              </button>
            </Link>
            <button
              className={`${styles.button} ${styles.delete}`}
              onClick={() => alert("oi")}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  const rawToken = JSON.parse(localStorage.getItem("user") ?? "");
  const auth = rawToken?.access_token;

  useEffect(() => {
    getPostsPerPage();
    console.log(posts, totalPosts);
  }, [page, totalPosts]);

  const getPostsPerPage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://matchjobsbackend-7lo5.onrender.com/post/myposts/${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + auth,
          },
        }
      );

      const data = await response.json();
      setPosts(data.posts);
      setTotalPosts(data.total);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  };

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
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Created at</td>
            <td>Video</td>
          </tr>
        </thead>
        <tbody>
          {isLoading  &&  (
            <tr>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
              <td>Carregando...</td>
            </tr>
          )}
          {posts?.map((post, id) => (
            <Post
              key={id}
              name={post?.name}
              description={post?.description}
              createdAt={post?.createdAt}
              videoUrl={post?.videoUrl}
            />
          ))}
        </tbody>
      </table>
      <Pagination setPage={setPage} page={page} totalPosts={totalPosts} />
    </div>
  );
};

export default PostsPage;
