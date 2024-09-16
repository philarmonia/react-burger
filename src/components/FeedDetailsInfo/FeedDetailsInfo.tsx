import styles from './FeedDetailsInfo.module.css'
import React, {FC, useEffect, useMemo} from "react";
import {useLocation,  useParams} from "react-router-dom";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {FeedDetailsComposition} from "./FeedDetailsComposition/FeedDetailsComposition"
import {wsConnectionClose, wsConnectionOpen, wsConnectionOpenUser} from "../../services/actions/wsActions";
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { TIngridient } from '../../services/types/data';

export const FeedDetailsInfo: FC = () => {
    const {id} = useParams()
    const {orders} = useSelector(store => store.order) || null;
    const order = orders.find((order) => order._id === id);
    const ingridients = useSelector(store => store.ingridients.ingridients)
    const location = useLocation();
    const dispatch = useDispatch()
    useEffect(() => {
        if (location.pathname === `/feed/${id}` && !order) {
            dispatch(wsConnectionOpen())
            return (() => {
                dispatch(wsConnectionClose())
            })
        }
        if (location.pathname === `/profile/orders/${id}` && !order) {
            dispatch(wsConnectionOpenUser())
            return (() => {
                dispatch(wsConnectionClose())
            })
        }
    },[dispatch, order, id, location])
    const getOrderStatus = (status: string) => {
        switch (status) {
            case "done":
                return (
                    <p className={`${styles.text} ${styles.status} text text_type_main-default mt-3`}>Готов</p>
                )
            case "created":
                return (
                    <p className={`${styles.text} ${styles.status} text text_type_main-default mt-3`}>Создан</p>
                )
            case "pending":
                return (
                    <p className={`${styles.text} ${styles.status} text text_type_main-default mt-3`}>Готовится</p>
                )
            default:
                return (
                    <p className={`${styles.text} ${styles.status} text text_type_main-default mt-3`}>{status}</p>
                )
        }
    }
    const ingridientsData = useMemo(() => {
        if (!order?.ingredients || !ingridients) {
            return null;
        }
        return order?.ingredients.map((id) =>{
            return ingridients?.find((data) => {
                return id === data._id
            })
        })
    }, [order?.ingredients, ingridients])

    const totalPrice = useMemo(() => {
        return ingridientsData?.reduce((total, item) => {
            if (item?.type === 'bun') {
                return total += item.price * 2
            }
                return total += (item ? item.price : 0)
        }, 0)
    },[ingridientsData])

    return (
        <> {order &&
                <div className={`${styles.container} pt-10 `}>
                    <h2 className={`${styles.number} text text_type_digits-default`}>#{order.number}</h2>
                    <p className={`${styles.text} text text_type_main-medium mt-10`}>{order.name}</p>
                    {getOrderStatus(order.status)}
                    <p className={`${styles.text} text text_type_main-medium mt-15 mb-6`}>Состав:</p>
                    <FeedDetailsComposition orders={ingridientsData as TIngridient[]}/>
                    <div className={`${styles.time_price} mt-10 mb-10`}>
                        <p className="text text_type_main-default text_color_inactive"><FormattedDate
                            date={new Date(order.createdAt)}/> i-GMT+3</p>
                        <div className={styles.totalPrice}>
                            <p className={`text text_type_digits-default`}>{totalPrice}</p>
                            <CurrencyIcon type='primary'/>
                        </div>
                    </div>
                </div>
            }
            </>
    )
}