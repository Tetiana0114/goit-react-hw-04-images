import { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Searchbar.module.css'

export default class SearchBar extends Component {
  state = {
    searchName: '',
  }
  
onChangeInput = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

onSubmit = e => {
    e.preventDefault();
    if(this.state.searchName.trim() === '') {
      Notify.info('Please, enter your search query!');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

render () {
  const { searchName } = this.state;
  
    return (
<header className={css.search_bar}>
    <form className={css.searchForm} onSubmit={this.onSubmit}>
      <input
        className={css.searchForm_input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={searchName}
        onChange={this.onChangeInput}
      />

       <button type="submit" className={css.searchForm_button}>
        <span className={css.searchForm_button_label}><FaSearch size={18}/></span>
      </button>

    </form>
</header>
      );
    }
    };

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};