import styles from "@/ui/dashboard/posts/posts.module.scss";
import Search from "@/ui/dashboard/search";
import Link from "next/link";
import Pagination from "@/ui/dashboard/pagination";

const PostsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
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
            <td>Images</td>
            <td>Status</td>
            <td>Tags</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test post</td>
            <td>description for post</td>
            <td>22/04/2024</td>
            <td>preview</td>
            <td>active</td>
            <td>i.t</td>
            <td>
              <div className={styles.actions}>
                <Link href="/">
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <button className={`${styles.button} ${styles.delete}`}>
                  View
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
};

export default PostsPage;
