import styles from "./page.module.css";
import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div className={styles.loadingPageContainer}>
      <Spinner size="xl" color="brand.primary" />
    </div>
  );
}
