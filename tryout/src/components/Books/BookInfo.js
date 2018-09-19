import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

class BookInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {}
        };
    }

    getBook = () => {
        fetch('http://localhost:3010/books?id=' + this.props.id)
        .then(response => response.json())
        .then(data => {this.setState({book: data[0]})})
        .catch(err => console.error(this.props.url, err.toString()))
    }

    componentDidMount() {
        this.getBook();
    }

    changeTitleHandler = (title) => {
        
    }

    render() {
        return (
            <div className="BookInfo">
                <MuiThemeProvider>
                    <TextField
                        type="text"
                        hintText={this.state.book.title}
                        fullWidth={false}
                        onChange={(event, value) => this.changeTitleHandler(value)} />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default BookInfo;