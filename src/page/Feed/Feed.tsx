import React, {FC, useEffect} from "react";
import styles from './Feed.module.css'
import {FeedState} from "../../components/FeedState/FeedState";
import {FeedOrders} from "../../components/FeedOrders/FeedOrders";
import {wsConnectionClose, wsConnectionOpen} from "../../services/actions/wsActions";
import {Route, Routes, useLocation} from "react-router-dom";
import {FeedDetails} from "../../components/FeedDetails/FeedDetails";
import {useDispatch, useSelector} from "../../services/hooks/hooks";



export const FeedPage: FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wsConnectionOpen())
        return (() => {
            dispatch(wsConnectionClose())
        })
    },[])
    const {pathname} = useLocation()
    const {popup} = useSelector(store => store.popup)
    return (  <>
        {
            (popup || pathname === "/feed" ) &&
            <main className={`${styles.main} pt-10`}>
                <div className={styles.title}>
                <h1 className="text text_type_main-large">Лента заказов</h1>
                    </div>
                <div className={styles.container}>
                    <FeedOrders />
                    <FeedState />
                </div>
            </main>
        }
            <Routes>
                <Route path="/:id" element={<FeedDetails />} />
            </Routes>
            </>
    )
}