import React, { FC } from 'react';
import styles from './Modal.module.css'
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import { TModal } from '../../services/types/data';

const modalRoot = document.querySelector('#modal') as HTMLElement;

const Modal: FC<TModal> = ( { children, closePopup } ) => {
    React.useEffect(() => {
        const closePopupOnEsc = (evt: KeyboardEvent) => {
            if (evt.key === "Escape") {
                closePopup()
            }
        }
            document.addEventListener("keydown", closePopupOnEsc);
        return () => {
            document.removeEventListener("keydown", closePopupOnEsc);
        };
    },[]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closePopup={closePopup} />
                <div className={styles.modal}>
                    <div className={styles.content}>
                        {children}
                        <div className={styles.close} onClick={closePopup}>
                            <CloseIcon type="primary" />
                        </div>
                    </div>
                </div>
</>
    , modalRoot)
}
Modal.propTypes = {
    closePopup: PropTypes.func.isRequired,
}
export default Modal;