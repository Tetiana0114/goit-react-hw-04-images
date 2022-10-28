import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css'

const ImageGallery = ({ items }) => {
  return <ul className={css.imageGallery}>
    {items.map(item => 
    (<ImageGalleryItem 
      key={item.id} 
      item={item}
    />))}
    </ul>;
}

ImageGallery.propTypes = {
items: PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
}))
};

export default ImageGallery;