import { FC } from "react";
import styles from "../IngridientDetails/IngridientDetails.module.css"
import { TIngridient } from "../../services/types/data";

type TDataIngridient = {
    data: TIngridient
}

export const IngridientDetailsInfo: FC<TDataIngridient> = ({ data }) => {
    return (
        <div className={`${styles.container} pt-10 pb-15`}>
            <h2 className={`${styles.title} text text_type_main-large`}>
                Детали ингридиента
            </h2>
            <img src={data.image_large} alt={data.name} />
            <p className="text text_type_main-medium mt-4">{data.name}</p>
            <ul
                className={`${styles.stats} text text_type_main-default text_color_inactive mt-8`}
            >
                <li className={styles.value}>
                    <p>Калории,ккал</p>
                    <p className="text text_type_digits-default mt-2">{data.calories}</p>
                </li>
                <li className={styles.value}>
                    <p>Белки, г</p>
                    <p className="text text_type_digits-default mt-2">{data.proteins}</p>
                </li>
                <li className={styles.value}>
                    <p>Жиры, г</p>
                    <p className="text text_type_digits-default mt-2">{data.fat}</p>
                </li>
                <li className={styles.value}>
                    <p>Углеводы, г</p>
                    <p className="text text_type_digits-default mt-2">
                        {data.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
};