import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

const ImageGalleryItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  
  const toggleModal = () => {
  setShowModal(prev => !prev);
};

return (
  <>
   <li className={css.imageGalleryItem}>
        <img className={css.imageGalleryItem_image}
        onClick={toggleModal}
        src={item.webformatURL}
        alt={item.tags}
        />
  </li>
  {showModal && (<Modal item={item} onClose={toggleModal}/>)}
  </>
)}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
})}

export default ImageGalleryItem;