import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchGallery from './Services/FetchGallery';
import css from './App.module.css'
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';


export class App extends Component {
  state = {
    error: null,
    query: '',
    items: [],
    page: 0, 
    loading: false,
  }

async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const newQuery = this.state.query;
    const newPage = this.state.page;
    if (prevQuery !== newQuery || prevPage !== newPage) {
    this.setState({ loading: true });
    try {
      const newItems = await fetchGallery({query: newQuery, page: newPage});
    if (newItems.totalHits !== 0) {
      this.setState({
        items: [...this.state.items, ...newItems.hits],
        })} 
        else {
          Notify.failure('Sorry, there are no images with this name.');
        }
        }
    catch (error) {
      this.setState({ error })
    }
    finally {
      this.setState({ loading: false });
      }
    }
}

handleSearchFormSubmit = queryName => {
  this.setState({
    page: 1,
    query: queryName,
    items: [],
    loading: true,
  });
}

loadMore = () => {
  this.setState(prevState => ({
    page: prevState.page + 1,
    loading: true,
  }));
};


render () {
const { items, loading, error } = this.state;
const showComponent = items.length > 0;

return (
    <div
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 40,
      color: '#010101'
    }}
    >
<SearchBar onSubmit={this.handleSearchFormSubmit}/>
{error && <p className={css.text}>Whoops, something went wrong...</p>}
{showComponent && (<ImageGallery items={items}/>)}
{loading && (<Loader/>)}
{showComponent && (<Button onClick={this.loadMore}/>)}
    </div>
  );
}
};