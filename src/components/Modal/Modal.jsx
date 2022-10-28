import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
}
componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
}

handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
};

handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
    this.props.onClose();
};
}

render() {
  const { largeImageURL, tags  } = this.props.item;
  
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags}/>
      </div>
    </div>,
      modalRoot
    );
  }
}

export default Modal;