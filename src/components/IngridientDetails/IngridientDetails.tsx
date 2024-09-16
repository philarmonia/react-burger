
import {useNavigate, useParams} from 'react-router-dom';
import Modal from "../Modal/Modal";
import {IngridientDetailsInfo} from "../IngridientDetailsInfo/IngridientDetailsInfo";
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { FC } from 'react';
import { SET_POPUP_CLOSE } from '../../services/constants';


const IngridientDetails: FC = () => {
    const ingridients = useSelector(store => store.ingridients.ingridients)
    const dispatch = useDispatch()
    const { id } = useParams()
    const data = ingridients.find(ingredient => ingredient._id === id)
    const {popup}= useSelector(store => store.popup)
    const navigate = useNavigate()
    const closePopup = () => {
        dispatch({type: SET_POPUP_CLOSE})
        navigate("/")
    }
    return (
        <>
            {popup ? (
                <Modal closePopup={closePopup}>
                    {data && <IngridientDetailsInfo data={data} />}
                </Modal>
            ) : (
                <>
                    {data && <IngridientDetailsInfo data={data} />}
                </>
            )}
        </>
    );
};

export default IngridientDetails;