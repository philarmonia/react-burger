import {FC, useEffect} from "react";
import styles from "./ProfileOrders.module.css"
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {FeedOrder} from "../../../components/FeedOrder/FeedOrder";
import {FeedDetails} from "../../../components/FeedDetails/FeedDetails";
import {wsConnectionClose, wsConnectionOpenUser} from "../../../services/actions/wsActions";
import { useDispatch, useSelector } from "../../../services/hooks/hooks";
import { SET_POPUP_ACITVE } from "../../../services/constants";




export const ProfileOrders: FC = () => {
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch({type: SET_POPUP_ACITVE})
    }
    useEffect(() => {
        dispatch(wsConnectionOpenUser())
        return (() => {
            dispatch(wsConnectionClose())
        })
    },[])
    const wsConnected = useSelector(store => store.order.wsConnected)
    const orders = useSelector(store => store.order.orders)
    const {popup} = useSelector(store => store.popup)
    const {pathname} = useLocation()

    return wsConnected ? (
        <>
            {
                (popup || pathname === "/profile/orders" ) &&
        <div className={`${styles.container} mt-10 pr-2`}>
            <div className={styles.container_items}>
            {
                orders.map((order) => {
                    return (
                        <Link key={order._id} onClick={onClick} className={styles.link} to={`/profile/orders/${order._id}`} >
                            <FeedOrder order={order} />
                        </Link>
                    )
                })
            }
            </div>
        </div>
            }
            <Routes>
                <Route path="/:id" element={<FeedDetails />} />
            </Routes>
        </>
    ) : null
}