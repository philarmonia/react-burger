import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import { TIngridient } from "../../services/types/data";
import { DELETE_INGRIDIENT, MOVE_INGRIDIENT } from "../../services/constants";
import { useDispatch } from "../../services/hooks/hooks";

type TConstructorItem = {
    props: TIngridient;
    index: number;
    uuid?: string;
}

export const BurgerConstructorItem: FC<TConstructorItem> = ({props, index, uuid}) => {
    const dispatch = useDispatch()
    const onRemoveItem = (uuid: string) => {
        dispatch({
            type: DELETE_INGRIDIENT,
            uuid: uuid
        })
    }
    const [{opacity}, dragRef] = useDrag({
        type: 'item',
        item: {index, uuid},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })
    const [, dropRef] = useDrop({
        accept: 'item',
        hover: (item: TIngridient) => {
            if (!ref.current) return
            const dragIndex = item.index;
            const hoverIndex = index;

            dispatch({
                type: MOVE_INGRIDIENT,
                data: {dragIndex, hoverIndex}
            })
            item.index = hoverIndex
        },
    })
    const ref = useRef(null)
   dragRef(dropRef(ref))
    return (
        <>
            <li style={{opacity}} ref={ref} key={props.uuid}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    isLocked={false}
                    text={props.name}
                    price={props.price}
                    handleClose={(() => onRemoveItem(props.uuid))}
                    thumbnail={props.image}
                    extraClass="ml-2"
                />
            </li>

        </>
    )
}
