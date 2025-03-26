import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
// import style from "../../styles/container.module.scss";


export function Header() {
    const [isActive, setActive] = useState(false)

    const toggleClass = () => {
        setActive(!isActive);
      };
      
      const [isScrolled, setIsScrolled] = useState(false);

      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.pageYOffset > 70);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    return (
        <div className={`${styles.header} ${isScrolled ? styles.header__scroll : ''}`}>
            <div className={styles.container}>
                <div 
                className={`${styles.burger} ${isActive ? styles.burger__active : ''}`} 
                onClick={() => toggleClass()}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div
                className={`${styles.menu} ${isActive ? styles.menu__active : ''}`}
                onClick={() => toggleClass()}
                >
                    <ul className={styles.menu__navigation}>
                        <li className={styles.menu__navigation_li}><a href="/science">SCIENCE</a></li>
                        <li className={styles.menu__navigation_li}><a href="/general">GENERAL</a></li>
                        <li className={styles.menu__navigation_li}><a href="/entertaiment">ENTERTAINMENT</a></li>
                        <li className={styles.menu__navigation_li}><a href="/technology">TECHNOLOGY</a></li>
                        <li className={styles.menu__navigation_li}><a href="/business">BUSINESS</a></li>
                        <li className={styles.menu__navigation_li}><a href="/health">HEALTH</a></li>
                        <li className={styles.menu__navigation_li}><a href="/sports">SPORTS</a></li>
                    </ul>
                </div>
                <a className={styles.logo__wrapper} href="/news-hub">
                    <span className={styles.logo__title}>NEWS PUB <span className={styles.logo__small}>by Ju1ceBoy</span></span>
                    {/* <img className={styles.logo} src={logo} alt="BESIDER" /> */}
                </a>
            </div>
        </div>
    )
}