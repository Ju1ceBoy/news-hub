import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SCROLL_THRESHOLD = 70;

export function Header() {
  const [isActive, setActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.header} ${isScrolled ? styles.header__scroll : ''}`}>
      <div className={styles.container}>
        <div
          className={`${styles.burger} ${isActive ? styles.burger__active : ''}`}
          onClick={toggleClass}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={`${styles.menu} ${isActive ? styles.menu__active : ''}`}
          onClick={toggleClass}
        >
          <ul className={styles.menu__navigation}>
            <li className={styles.menu__navigation_li}>
              <Link to="/science">SCIENCE</Link>
            </li>
            <li className={styles.menu__navigation_li}>
              <Link to="/general">GENERAL</Link>
            </li>
            <li className={styles.menu__navigation_li}>
              <Link to="/entertaiment">ENTERTAINMENT</Link>
            </li>
            <li className={styles.menu__navigation_li}>
              <Link to="/technology">TECHNOLOGY</Link>
            </li>
            <li className={styles.menu__navigation_li}>
              <Link to="/business">BUSINESS</Link>
            </li>
            <li className={styles.menu__navigation_li}>
              <Link to="/health">HEALTH</Link>
            </li>
            <li className={styles.menu__navigation_li}>
              <Link to="/sports">SPORTS</Link>
            </li>
          </ul>
        </div>
        <Link className={styles.logo__wrapper} to="/">
          <span className={styles.logo__title}>
            NEWS PUB <span className={styles.logo__small}>by Ju1ceBoy</span>
          </span>
        </Link>
      </div>
    </div>
  );
}