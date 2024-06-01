import styles from "@/ui/dashboard/jobs/addJob/addJob.module.scss";

const AddVacancyPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="title" name="title" required />
        <select name="category" id="category">
          <option>Choose a Category</option>
          <option value="fun">For fun</option>
          <option value="jobad">Job ad</option>
          <option value="tour">Tour</option>
          <option value="educational">Educational</option>  
          <option value="webevent">Web Event</option>
        </select>
        <label htmlFor="tag1">Tag 1</label>
        <input type="radio" name="tag1" id="tag1" />

        <textarea
          name="desc"
          id="desc"
          rows={16}
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddVacancyPage;
