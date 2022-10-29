import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, item }) => {

useEffect(() => {
  const handleKeyDown = event => {
  if (event.code === 'Escape') {
  onClose();
  }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => {
  window.removeEventListener('keydown', handleKeyDown);
  };
  }, [onClose]);

  const handleBackdropClick = event => {
  if (event.currentTarget === event.target) {
  onClose();
}
};
return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={item.largeImageURL} alt={item.tags}/>
      </div>
    </div>,
      modalRoot
    );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
})}

export default Modal;