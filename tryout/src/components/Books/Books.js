import React from 'react';
import BookItem from './BookItem';

const books = (props) => {
    let bookList;
    if (props.books.length > 0) {
        bookList = props.books.map((book) => {
            return (
                <BookItem
                    book={book}
                    key={book.id}
                    clickedBook={() => { props.clickedBook(book.id) }} />
            );
        });
    }

    return (
        <div className="BookList">
            {bookList}
        </div>
    );
}

export default books;