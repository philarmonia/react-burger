
import styles from './FeedState.module.css'
import {useSelector} from "../../services/hooks/hooks";
import {FC} from "react";

export const FeedState: FC = () => {
    const {total, totalToday, orders, wsConnected} = useSelector(store => store.order)

    const doneOrders = orders.filter(order => order.status === 'done').slice(0,10)
    const pendingOrders = orders.filter(order => order.status === 'pending').slice(0,10)
    return wsConnected ? (
        <div className={styles.container_state}>
            <div className={`${styles.container_titles}`}>
            <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Готовы:</h3>
            <h3 className={`${styles.title} text text_type_main-medium mb-6`}>В работе:</h3>
                </div>
            <div className={`${styles.container_numbers} mb-15`}>
            <div className={styles.container_number}>
                {
                    doneOrders.map((data) => {
                        return (
                            <p key={data.number} className={`text text_type_digits-default`}>{data.number}</p>
                        )
                    })
                }
            </div>
                <div className={styles.container_number}>
                {
                    pendingOrders.map((data) => {
                        return (
                                <p key={data.number} className={`text text_type_digits-default`}>{data.number}</p>
                                )
                    })
                }
            </div>
            </div>
            <div className={styles.container_ready}>
                <h3 className={`text text_type_main-medium mt-15`}>Выполнено за все время:</h3>
                <p className="text text_type_digits-large">{total}</p>
                </div>
            <div className={styles.container_ready}>
                <h3 className={`text text_type_main-medium`}>Выполнено за сегодня:</h3>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </div>
    ) : null
}