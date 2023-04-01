import styles from './Profile.module.css'
import {NavLink, Route, Routes, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {EmailInput, Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, logout, patchProfile} from "../../services/actions/User";
import {ProfileForm} from "./ProfileForm/ProfileForm";
import {ProfileOrders} from "./ProfileOrders/ProfileOrders";



export const ProfilePage = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch()

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.links} pt-30`}>
                <NavLink className={`${styles.link} text_color_inactive text text_type_main-medium ${pathname === "/profile" && styles.active}`} exact to="/profile">Профиль</NavLink>
                <NavLink className={`${styles.link} text_color_inactive text text_type_main-medium ${pathname === "/profile/orders" && styles.active}`} exact to="/profile/orders">История
                    заказов</NavLink>
                <NavLink className={`${styles.link} text_color_inactive text text_type_main-medium`} onClick={() => dispatch(logout())}  to="/login" >Выход</NavLink>
                <p className={`text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <Routes>
                <Route path="/" element={<ProfileForm />} />
                <Route path="/orders/*" element={<ProfileOrders />} />
            </Routes>
        </div>
    )
}