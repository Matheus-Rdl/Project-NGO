import styles from "./cardList.module.css";

export default function CardList({ text, active, onClick, setActiveScreen }) {

  return (
    <div
      className={active ? `${styles.cardBoxActive} ${styles.cardBox}` : `${styles.cardBox}`}
      onClick={onClick}
    >
      <div className={styles.cardContent}>
        <p>{text}</p>
      </div>
    </div>
  );
}
