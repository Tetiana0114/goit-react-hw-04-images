import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  }
toggleModal = () => {
  this.setState(({ showModal }) => ({
  showModal: !showModal,
  }));
}
render () {
  const { showModal } = this.state;
  const { webformatURL, tags } = this.props.item;
  const { item } = this.props;
  return (
    <>
     <li className={css.imageGalleryItem}>
          <img className={css.imageGalleryItem_image}
          onClick={this.toggleModal}
          src={webformatURL}
          alt={tags}
          />
    </li>
    {showModal && (<Modal item={item} onClose={this.toggleModal}/>)}
    </>
  )}
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
})}

export default ImageGalleryItem;