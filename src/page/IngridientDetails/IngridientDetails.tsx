import IngridientDetails from "../../components/IngridientDetails/IngridientDetails";
import {useEffect} from "react";
import {getIngridients} from "../../services/actions/Ingridients";
import { useDispatch } from "../../services/hooks/hooks";

export const IngridientDetailsPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            getIngridients())
    }, [dispatch])
    return (
                <IngridientDetails />
    )
}