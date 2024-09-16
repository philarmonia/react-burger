import styles from "./BurgerIngridiens.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import  {FC, useMemo} from "react";
import { useDrag } from "react-dnd";
import { TIngridient } from "../../services/types/data";
import { useSelector } from "../../services/hooks/hooks";

type TIngridientItem = {
    ingridient: TIngridient
}



export const BurgerIngridient: FC<TIngridientItem> = ({ ingridient }) => {
    const {bun, ingridients} = useSelector(store => store.ingridientsConstructor)
    const { image, name, price, _id } = ingridient
    const [{ opacity }, dragRef] = useDrag({
        type: "ingridients",
        item: { ingridient },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })
    const counterItems = useMemo(
        () =>
            (count = 0) => {
                for (let { _id } of ingridients)
                    if (_id === ingridient._id) count++;

                if (bun && bun._id === ingridient._id) return 2;
                return count;
            },
        [bun, ingridients, ingridient._id]
    );
    return (
        <li className={styles.ingridient_item} key={_id} ref={dragRef} style={{ opacity }}>
            <img className={styles.image} src={image} alt={name}/>
            <div className={`${styles.price} mt-1 mb-1`}>
                <p className={`text text_type_digits-default`}>{price}</p>
                <CurrencyIcon type='primary'/>
            </div>
            <p className={`text text_type_main-default`}>{name}</p>
            {counterItems() > 0 && <Counter count={counterItems()} size="default" />}
        </li>
    )
}