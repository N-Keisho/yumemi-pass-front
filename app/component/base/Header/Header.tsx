import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>都道府県別の総人口推移グラフ</h1>
    </header>
  );
};

export default Header;