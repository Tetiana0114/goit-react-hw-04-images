import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Searchbar.module.css'

const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const onChangeInput = event => {
  setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if(searchName.trim() === '') {
      Notify.info('Please, enter your search query!');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={css.search_bar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={onChangeInput}
          />
    
           <button type="submit" className={css.searchForm_button}>
            <span className={css.searchForm_button_label}><FaSearch size={18}/></span>
          </button>
    
        </form>
    </header>
          );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;