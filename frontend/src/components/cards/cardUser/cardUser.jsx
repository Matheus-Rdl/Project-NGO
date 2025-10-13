import styles from "./cardUser.module.css";

export default function CardUser({title, quantity}) {
  return (
    <div className={styles.cardBox}>
      <div className={styles.cardContent}>
        <h1>{title}</h1>
        <p>Total: {quantity}</p>
      </div>
    </div>
  );
}
