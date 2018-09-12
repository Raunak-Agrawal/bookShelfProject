import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import MainPage from "./mainPage.js";
import SearchPage from "./searchPage.js";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.displayBooks = this.displayBooks.bind(this);
  }
  state = {
    books: []
  };
  displayBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }
  componentDidMount() {
    this.displayBooks();
  }
  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    book.shelf = shelf;
    this.setState(state => {
      books: state.book;
    });
  };

  render() {
    // console.log(this.state.books);
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage moveShelf={this.moveShelf} books={this.state.books} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
