import Image from "next/image";
import styles from "./page.module.css";
import WelcomePage from "./Components/WelcomePage";

export default function Home() {
  return (
    <div className={styles.page}>
      <WelcomePage/>
    </div>
  );
}
