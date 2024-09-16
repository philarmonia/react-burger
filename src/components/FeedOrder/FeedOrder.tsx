import styles from "./FeedOrder.module.css"

import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useMemo} from "react";
import { useSelector } from "../../services/hooks/hooks";
import { TFeedOrder } from "../../services/types/data";

export type TOrder = {
    order: TFeedOrder
}

export const FeedOrder: FC<TOrder> = ({order}) => {
    const {number, createdAt, name} = order
    const ingridients = useSelector(store => store.ingridients.ingridients)
    const ingridientsData = useMemo(() => {
        return order.ingredients.map((id) =>{
            return ingridients.find((data) => {
                return id === data._id
            })
        })
    }, [order.ingredients, ingridients])
    const totalPrice = useMemo(() => {
        return ingridientsData.reduce((total, item) => {
            if (item && item.type === 'bun') {
                return total += item.price * 2
            }
            return total += (item ? item.price : 0)
        }, 0)
    },[ingridientsData])

    let ingridientImages

    if (ingridientsData && ingridientsData.length > 0) {
        if (ingridientsData.length <= 6) {
            ingridientImages = ingridientsData && ingridientsData.map((data, index) => {
                return data && data.image && (
                    <div className={styles.item_margin} key={index}>
                    <div className={styles.border}>
                    <div className={styles.container_image}>
                        <img className={styles.image} src={data.image} alt={data.name} />
                    </div>
                    </div>
                    </div>
                );
            });
        } else {
            ingridientImages = ingridientsData && ingridientsData.slice(0, 5).map((data, index) => {
                return data && data.image && (
                    <div className={styles.item_margin} key={index}>
                    <div className={styles.border}>
                    <div className={styles.container_image}>
                        <img className={styles.image} src={data.image} alt={data.name} />
                    </div>
                    </div>
                    </div>
                );
            });
            const remainingIngridients = ingridientsData.length - 5;
            ingridientImages.push(
                <div className={styles.item_margin} key={ingridientsData.length}>
                <div className={styles.item}>
                    <span className={`${styles.count} text text_type_main-default`}>+{remainingIngridients}</span>
                    <div className={styles.overlay}>
                <div className={styles.border}>
              <div className={styles.container_image}>
                    <img className={styles.image} src={ingridientsData[ingridientsData.length - 1]?.image} alt={ingridientsData[ingridientsData.length - 1]?.name}></img>
                </div>
                </div>
                    </div>
                </div>
        </div>
            );
        }
    }
    return (
        <div className={`${styles.container} mb-4`}>
            <div className={`${styles.id}`}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(createdAt)} /> i-GMT+3</p>
            </div>
            <div className={`${styles.info} text text_type_main-medium`}>{name}</div>
            <div className={styles.components}>
                <div className={styles.ingridients}>
                    {ingridientImages}
                </div>
                <div className={styles.totalPrice}>
                    <p className={`text text_type_digits-default`}>{totalPrice}</p>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        </div>
    )
}