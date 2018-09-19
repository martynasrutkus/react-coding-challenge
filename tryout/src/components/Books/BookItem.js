import React, { Component } from 'react';
import './BookItem.css';

class BookItem extends Component {
    constructor(props) {
        super(props);

        this.state = {book: props.book};
    }
    
    componentDidMount() {
        this.getBook();
    }

    getBook = () => {
        fetch('http://localhost:3010/books?id=' + this.props.id)
        .then(response => response.json())
        .then(data => {this.setState({book: data[0]})})
        .catch(err => console.error(this.props.url, err.toString()))
    }

    bookClickedHandler = () => {
        () => { this.props.clikedBook() }
    }

    render() {
        const authors = this.state.book.authors.map((author) => {
            return (
                author.name
            );
        });

        return (
            <div className="BookItem" onClick={() => { this.bookClickedHandler() }}>
                <p>Title: {this.state.book.title}</p>
                <p>Authors: {authors}</p>
            </div>
        );
    }
}

export default BookItem;
