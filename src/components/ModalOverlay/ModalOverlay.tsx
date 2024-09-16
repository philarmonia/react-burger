import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css'
import { FC } from 'react';
import { TModalOverlay } from '../../services/types/data';

const ModalOverlay: FC<TModalOverlay> = ({ closePopup }) => {
return <div className={styles.overlay} onClick={closePopup}></div>
}
ModalOverlay.propTypes = {
    closePopup: PropTypes.func.isRequired,
}
export default ModalOverlay