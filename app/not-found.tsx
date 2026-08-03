import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      {/* ========================
          +++ DECORATION — top left
      ======================== */}
      <span className={styles.plusTop}>+++</span>

      {/* ========================
          CONTENT BLOCK
      ======================== */}
      <div className={styles.content}>
        {/* console.error("404") — main heading */}
        <h1 className={styles.heading}>404</h1>

        {/* message */}
        <p className={styles.message}>Page not found</p>

        {/* back to homepage */}
        <a href="/" className={styles.backHome}>
          Back to homepage
        </a>
      </div>

      {/* ========================
          +++ DECORATION — bottom right
      ======================== */}
      <span className={styles.plusBottom}>+++</span>
    </section>
  );
}
