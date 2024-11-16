import styles from "./LoadMore.module.css";

export default function loadMoreBtn({ setPage }) {
  function handleLoadMore(e) {
    e.preventDefault();
    setPage((curPage) => curPage + 1);
  }

  return (
    <div className={styles.loadMoreContainer}>
      <button className={styles.loadMoreBtn} onClick={(e) => handleLoadMore(e)}>
        Load More
      </button>
    </div>
  );
}
