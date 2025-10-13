import styles from "./cardListUser.module.css";

export default function CardListUser({ text, active, onClick, setActiveScreen }) {

  return (
    <div
      className={active ? `${styles.cardBoxActive} ${styles.cardBox}` : `${styles.cardBox}`}
      onClick={onClick}
    >
      <div className={styles.cardContent}>
        <h1>{text}</h1>
      </div>
    </div>
  );
}
