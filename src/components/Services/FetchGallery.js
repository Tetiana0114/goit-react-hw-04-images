import axios from 'axios';

const KEY = '29871741-92f0be7d75d630b941b41d19d';
const BASIC_URL = 'https://pixabay.com/api/?q=';

const fetchGallery = async ({ query, page }) => {
const response = await axios.get(`${BASIC_URL}${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
return response.data;
};

export default fetchGallery;