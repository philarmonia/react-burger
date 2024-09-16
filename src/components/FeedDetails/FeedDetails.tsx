
import Modal from "../Modal/Modal";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FeedDetailsInfo} from "../FeedDetailsInfo/FeedDetailsInfo";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { FC } from "react";
import { SET_POPUP_CLOSE } from "../../services/constants";

export const FeedDetails: FC = () => {
    const closePopup = () => {
        dispatch({type: SET_POPUP_CLOSE})
        location.pathname ===`/feed/${id}` ? navigate("/feed") : navigate("/profile/orders")
    }
    const {popup}= useSelector(store => store.popup)
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    return (
        <>
            {popup ? (
                <Modal closePopup={closePopup}>
                    <FeedDetailsInfo />
                </Modal>
            ) : (
                <>
                    {<FeedDetailsInfo />}
                </>
            )}
        </>
    );
}