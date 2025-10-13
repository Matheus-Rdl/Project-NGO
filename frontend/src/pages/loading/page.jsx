import styles from "./page.module.css";
import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className={styles.loadingPageContainer}>
      <CircularProgress color="inherit"/>
    </div>
  );
}
