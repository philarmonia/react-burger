import React, {FC, useMemo} from "react";
import styles from './FeedDetailsComposition.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngridient } from "../../../services/types/data";
import { useSelector } from "../../../services/hooks/hooks";

type TDetailsCompostition = {
    orders?: TIngridient[];
  }
  

export const FeedDetailsComposition: FC<TDetailsCompostition> = ({orders}) => {
    const ingridients = useSelector(store => store.ingridients.ingridients)
    const countItems = (element: TIngridient, arr: TIngridient[]) => {
        return arr.filter(item => item._id === element._id).length
    }
    const ingridientsOrder = useMemo(() => {
        return orders?.map((element) => {
            return ingridients.find((item) => {
                return element._id === item._id
            })
        }).filter((element, index, arr) => {
            return arr.findIndex(item => item?._id === element?._id) === index
        })
    }, [orders, ingridients])
    return (
        <div className={styles.scroll}>
            {ingridientsOrder && ingridientsOrder.map((order) => {
                const itemCount = countItems(order!, orders!);
                return (
                            <div className={styles.container} key={order?._id}>
                                <div className={styles.container_info}>
                            <div className={styles.border}>
                                <div className={styles.container_image}>
                                    <img className={styles.image} src={order?.image} alt={order?.name}/>
                                </div>
                            </div>
                                    <p className={`${styles.name} text text_type_main-default`}>{order?.name}</p>
                                </div>
                                    <div className={styles.price}>
                                        <p className="text text_type_digits-default">{itemCount} x {order?.price}</p>
                                        <CurrencyIcon type='primary'/>
                                    </div>
                                </div>
                )
            })
            }
        </div>
    )
}
