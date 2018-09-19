import React, { Component } from 'react';
import SubjectSelector from './components/SubjectSelector/SubjectSelector';
import './App.css';
import Books from './components/Books/Books';
import BookInfo from './components/Books/BookInfo';

class App extends Component {
  constructor() {
    super();

    this.state = {
      subjects: [],
      booksS: [],
      booksF: [],
      selectedBookId: -1,
      selectedSubject: ''
    };
  }

  componentDidMount() {
    this.getSubjects();
    this.getBooks();
  }

  bookClickedHandler = (id) => {
    this.setState({ selectedBookId: id });
  }

  getSubjects = () => {
    fetch('http://localhost:3010/subjects')
      .then(response => response.json())
      .then(data => {
        let subjects = data.map(subject => subject)
        this.setState({ subjects: subjects });
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  getBooks = () => {
    fetch('http://localhost:3010/books?subjects_like=' + this.state.selectedSubject)
      .then(response => response.json())
      .then(data => {
        let booksS = [];
        let booksF = [];
        data.map(book => {
          if (book.subjects.length === 2) {
            booksS.push({ book });
            booksF.push({ book });
          } else if (book.subjects[0] === 'Science') {
            booksS.push({ book });
          } else if (book.subjects[0] === 'Fiction') {
            booksF.push({ book });
          }
        });
        this.setState({ booksS: booksS, booksF: booksF });
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  changeSubject = (subjectIndex) => {
    this.setState({ selectedSubject: this.state.subjects[subjectIndex] });
  }

  render() {
    // let bookInfo;
    // if (this.state.selectedBookId > -1) {
    //   bookInfo = <BookInfo id={this.state.selectedBookId} selectedSubject={this.state.selectedSubject} />
    // }

    let books;
    if (this.state.selectedSubject === 'Science') {
      books = <Books selectedSubject={this.state.selectedSubject} clickedBook={(id) => { this.bookClickedHandler(id) }} books={this.state.booksS} />
    } else if (this.state.selectedSubject === 'Fiction') {
      books = <Books selectedSubject={this.state.selectedSubject} clickedBook={(id) => { this.bookClickedHandler(id) }} books={this.state.booksF} />
    }

    return (
      <div className="App">
        <h1>My Reading List</h1>
        <SubjectSelector
          subjects={this.state.subjects}
          changeSubject={(value) => { this.changeSubject(value) }} />
        {books}
        {/* {bookInfo} */}
      </div>
    );
  }
}

export default App;
