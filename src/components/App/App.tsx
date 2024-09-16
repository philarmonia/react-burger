import React, {FC, useEffect} from 'react'
// @ts-ignore
import styles from './App.module.css'
import Header from "../Header/Header"
import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import { ConstructorPage } from "../../page/Constructor/Constructor";
import { LoginPage}  from "../../page/Login/Login";
import { ForgotPasswordPage } from '../../page/ForgotPassword/ForgotPassword';
import { ResetPasswordPage } from '../../page/ResetPassword/ResetPassword';
import { RegisterPage } from '../../page/Register/Register';
import { ProfilePage } from "../../page/Profile/Profile";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {IngridientDetailsPage} from "../../page/IngridientDetails/IngridientDetails";
import {getProfile} from "../../services/actions/User";
import {FeedPage} from "../../page/Feed/Feed";
import {FeedDetails} from "../FeedDetails/FeedDetails";
import {getIngridients} from "../../services/actions/Ingridients";
import {OnlyUnAuth} from "../OnlyUnAuth/OnlyUnAuth";
import {useDispatch, useSelector} from '../../services/hooks/hooks';

const App: FC = () => {
    const {user} = useSelector(store => store.user)
    const dispatch = useDispatch()
    useEffect(() => {
       if (!user) {
           dispatch(getProfile())
       }
        dispatch(getIngridients())
    },[dispatch, user])
    return (
        <BrowserRouter>
        <div className={styles.App}>
            <Header/>
            <Routes >
                <Route path="/*" element={<ConstructorPage />} />
                <Route
                    path="/login"
                    element={<OnlyUnAuth element={<LoginPage />} />}
                />
                <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage />} />} />
                <Route path="/reset-password"  element={<OnlyUnAuth element={<ResetPasswordPage />} />} />
                <Route path="/register" element={<OnlyUnAuth element={<RegisterPage />} />}/>
                <Route
                    path="/profile/*"
                    element={<ProtectedRoute element={<ProfilePage />} />}
                />
                <Route path="/feed/*" element={<FeedPage />} />
            </Routes>
        </div>
    </BrowserRouter>
    );
}

export default App;
