import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.div}>Ⓒ N-Keisho All rights reserved.</div>
      <Link href="https://github.com/N-Keisho/yumemi-pass-front">
        <Image
          className={styles.image}
          src="/img/github-mark-white.svg"
          alt="github-mark"
          width={30}
          height={30}
        />
      </Link>
    </footer>
  );
};

export default Footer;
