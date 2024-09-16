
import {FeedOrder} from "../FeedOrder/FeedOrder";
import styles from './FeedOrders.module.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/hooks/hooks";
import { SET_POPUP_ACITVE } from "../../services/constants";


export const FeedOrders = () => {
    const orders = useSelector(store => store.order.orders)
    const wsConnected = useSelector(store => store.order.wsConnected)
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch({type: SET_POPUP_ACITVE})
    }
    return wsConnected ? (
                <div className={`${styles.container} pr-2`}>
                    {
                        orders.map((order) => {
                            return (
                                <Link key={order._id} onClick={onClick} className={styles.link} to={`/feed/${order._id}`} >
                                    <FeedOrder order={order} />
                                </Link>
                            )
                        })
                    }
                </div>
    ) : null
}