import styles from './Header.module.css'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react';
import { NavLink, useLocation} from "react-router-dom";
const Header: FC = () => {
    const {pathname} = useLocation()
    return (
        <header className={styles.header}>
            <nav className={styles.menu}>
                    <div className={`${styles.menu__item} ${styles.menu__item_left}`}>
                        <NavLink to="/" className={`${styles.menu__link} ${styles.menu__link_left} text_color_inactive`}>
                            <BurgerIcon type="primary"/>
                            <p className={`${pathname === "/" && styles.active} text text_type_main-default`}>Конструктор</p>
                        </NavLink>
                        <NavLink to="/feed" className={`${styles.menu__link} ${styles.menu__link_left} text_color_inactive`}>
                            <ListIcon type="secondary"></ListIcon>
                            <p className={`${pathname === "/feed"  && styles.active} text text_type_main-default`}>Лента заказов</p>
                        </NavLink>
                    </div>
                    <div className={styles.menu__item}>
                        <NavLink to="/profile" className={`${styles.menu__link_right} ${styles.menu__link} text_color_inactive`}>
                            <ProfileIcon type="secondary" />
                            <p className={`${(pathname === "/profile" || pathname ==="/profile/orders") && styles.active} text text_type_main-default`}>Личный кабинет</p>
                        </NavLink>
                    </div>
                <div className={styles.menu__logo}>
                    <a href="/" className={styles.menu__link}>
                        <Logo/>
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header;