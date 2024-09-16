import styles from './Profile.module.css'
import {NavLink, Route, Routes, useLocation} from "react-router-dom";
import {FC} from "react";
import {logout} from "../../services/actions/User";
import {ProfileOrders} from "./ProfileOrders/ProfileOrders";
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import ProfileForm from './ProfileForm/ProfileForm';



export const ProfilePage: FC = () => {
    const {pathname} = useLocation()
    const {popup} = useSelector(store => store.popup)
    const dispatch = useDispatch()

    return (
        <div className={`${styles.container}`}>
            <>
                { (popup || pathname === "/profile" || pathname === "/profile/orders") && <div className={`${styles.links} pt-30`}>
                    <NavLink
                        className={`${styles.link} text_color_inactive text text_type_main-medium ${pathname === "/profile" && styles.active}`}
                        to="/profile">Профиль</NavLink>
                    <NavLink
                        className={`${styles.link} text_color_inactive text text_type_main-medium ${pathname === "/profile/orders" && styles.active}`}
                        to="/profile/orders">История
                        заказов</NavLink>
                    <NavLink className={`${styles.link} text_color_inactive text text_type_main-medium`}
                             onClick={() => dispatch(logout())} to="/login">Выход</NavLink>
                    <p className={`text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете
                        изменить свои персональные данные</p>
                </div>}
                </>
            <Routes>
                <Route path="/" element={<ProfileForm />}/>
                <Route path="/orders/*" element={<ProfileOrders />} />
            </Routes>
        </div>
    )
}