import { Link } from "react-router-dom";
import styles from "./Error.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Page Not Found</h2>
        <p className={styles.errorMessage}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.backButton}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
