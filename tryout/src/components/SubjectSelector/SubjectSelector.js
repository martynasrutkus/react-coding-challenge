import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SubjectSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.subjects,
            selected: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.subjects });
      }

    changeSubjectHandler = (event, value) => {
        this.setState({ selected: value })
        this.props.changeSubject(value);
    }

    render() {
        let selections = this.state.value.map((subject, index) => {
            return (
                <MenuItem value={index} key={index} primaryText={subject} />
            );
        });
        return(
            <MuiThemeProvider>
                <SelectField
                    value={this.state.selected}
                    onChange={this.changeSubjectHandler}
                    floatingLabelText="Choose a Subject">
                    
                    {selections}
                </SelectField>
            </MuiThemeProvider>
        );
    }
}

export default SubjectSelector;