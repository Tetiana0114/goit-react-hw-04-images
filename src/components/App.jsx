import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchGallery from './Services/FetchGallery';
import css from './App.module.css'
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';


export const App = () => {
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const showComponent = items.length > 0;

const handleSearchFormSubmit = queryName => {
    setPage(1);
    setQuery(queryName);
    setItems([]);
}
  
const loadMore = () => {
    setPage(prev => prev + 1);
    setLoading(true);
};

useEffect(() => {
  if (query === '') {
    return;
}
setLoading(true);
const getNewQuery = async() => {
  try {
    const newItems = await fetchGallery({query: query, page: page});
  if (newItems.totalHits !== 0) {
    setItems(prev => [...prev, ...newItems.hits]);
  } else {
    Notify.failure('Sorry, there are no images with this name.');
        }
  }
  catch (error) {
      setError(error);
  }
  finally {
      setLoading(false);
  } 
}
getNewQuery();
}, [page, query]);


return (
      <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
      >
<SearchBar onSubmit={handleSearchFormSubmit}/>
{error && <p className={css.text}>Whoops, something went wrong...</p>}
{showComponent && (<ImageGallery items={items}/>)}
{loading && (<Loader/>)}
{showComponent && (<Button onClick={loadMore}/>)}
      </div>
    );
}