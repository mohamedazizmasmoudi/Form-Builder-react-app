import React from 'react';
import {  isAuthenticated } from '../auth';
const validator = require('validator');

export default class FormSubmitPage extends React.Component {
    _isMounted = false;
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            forms: []
        };
    }

    componentDidMount() {
        this._isMounted = true;
        console.log(this.props.form.name)
        fetch(`${process.env.REACT_APP_API_URL}/customers/getForm`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.props.form.name
            }),
        }).then(res => res.json())
            .then(forms =>
                this.setState({ forms }) );
    }

    componentWillMount() {
        this._isMounted = false;
    }

    updateCounter(name, counter) {
        fetch(`${process.env.REACT_APP_API_URL}/customers/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                counter: counter,
                name: name
              
                 }),
        })
    }

    uploadNewForm(e) {
        let oneForm = [];
        this.state.forms[0].fields.map((field, index) => {
            let input = field.name;
            let value = e.target.elements[field.label].value;
            let sub = { input: input, value: value };
            oneForm.push(sub);
            e.target.elements[field.label].value = '';
            return true;
        });
        let index = this.props.form.id;
        let formSubmissions = [oneForm];
        let newLine = { index: index, formSubmissions: formSubmissions,form: this.props.form, user:isAuthenticated().user,    }

        fetch(`${process.env.REACT_APP_API_URL}/customers/newDB`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                newLine,
           
            ),
        }).then(() => {
            
        })
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        let unfilledInput = false;
        this.state.forms[0].fields.map((field, index) => {
            if (!e.target.elements[field.label].value) {
                unfilledInput = true;
            }
            return true;
        })
        if (unfilledInput) {
            alert('invalid input, please try again!');
        }
        else {
            let counter = this.state.forms[0].counter;
            let name = this.state.forms[0].name;
            counter++;
            this.updateCounter(name, counter);
            this.uploadNewForm(e);
        }
    };

    validate(text, type, label) {
        if (type === 'email') {
            if (!validator.isEmail(text.target.value)) {
                alert('Invalid mail. please try again!');
                text.target.value = '';
            }
        }
        if (type === 'number' || type === 'tel') {
            const number = /^[0-9]+$/;
            if (!text.target.value.match(number)) {
                alert('Invalid number. please try again!');
                text.target.value = '';
            }
        }
        if (type === 'date') {
            if (validator.toDate(text.target.value) === null) {
                alert('Invalid date. please try again!');
                text.target.value = '';
            }
        }
        if (type === 'color') {
            if (!validator.isHexColor(text.target.value)) {
                alert('Invalid color. please try again!');
                text.target.value = '';
            }
        }
    }
    render() {
        return (
            this.state.forms.length > 0 ?
                <div className="container">
                    <form onSubmit={this.handleSubmitForm}>
                        {console.log("yo"+this.state.forms[0])}
                        {this.state.forms[0].fields.map((field, index) =>
                            <div className="row" key={index + field.label}>
                                <div className="col-25">
                                    <label htmlFor="label">{field.label}:</label>
                                </div>
                                <div className="col-75">
                                    <input type="text"
                                        placeholder={field.name}
                                        name={field.label}
                                        onBlur={(text) => this.validate(text, field.type, field.label)}
                                    />                            
                                </div>
                            </div>
                        )}
                        <button className="button">Submit</button>
                    </form>
                </div> : <div><h1>Loading...</h1></div>);
    }
};

