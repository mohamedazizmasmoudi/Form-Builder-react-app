import React from 'react';
import Form from './Form'
import '../styles/base/components/FormBuilderPage.css';


export default class FormBuilderPage extends React.Component {
    state = {
        name: undefined,
        fields: [],
        counter: 0
    };

    handleField = (e) => {
        e.preventDefault();
        const label = e.target.elements.label.value;
        const name = e.target.elements.name.value;
        const type = e.target.elements.type.value;
        const newField = { label: label, name: name, type: type };

        let found = false;
        
        this.state.fields.map((field) => {
            if (field.label === label && field.name === name && field.type === type) {
                alert('field already exists');
                found = true;
            }
            return true;
        })

        if (!!label && !!name && !found) {
            this.setState((prev) => ({
                fields: prev.fields.concat([newField])
            }));
        }
        e.target.elements.label.value = '';
        e.target.elements.name.value = '';
    };

    handleForm = (e) => {
        e.preventDefault();
        const formName = e.target.elements.formName.value;
        fetch(`${process.env.REACT_APP_API_URL}/customers/getForm`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formName
            }),
        }).then(res => res.json())
            .then(form => {
                console.log("anyhounycomdsdssddpenr")

                if (form.length > 0) {
                    alert('Form name already Exists!');
                } else {
                    if (this.state.fields.length > 0 && !!formName) {
                        alert(formName + ' form submitted!');
                        this.setState(() => ({
                            name: formName
                        }));
                    }
                }
            });
    };

    componentDidUpdate() {
        if (this.state.name !== undefined) {
            fetch(`${process.env.REACT_APP_API_URL}/customers/add`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    this.state
                ),
            }).then(() => {
                console.log("anyhounycompenr")
                const address = "/FormsListPage";
                this.props.history.push(address);
            })

            this.setState(() => ({
                name: undefined,
                fields: []
            }));
        }
    }

    render() {
        return (
            <div className="container">
                <form className="add-form" onSubmit={this.handleField}>
                    <div  className="row">
                        <div className="col-25">
                            <label htmlFor="label">Field label</label>
                        </div>
                        <div className="col-75">
                            <input id="label" type="text" placeholder="enter field label" name="label" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="inputName">Input name</label>
                        </div>
                        <div className="col-75">
                            <input id="inputName" type="text" placeholder="enter input name" name="name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="type">Type</label>
                        </div>
                        <div className="col-75">
                            <select name="type" >
                                <option value="text">text</option>
                                <option value="color">color</option>
                                <option value="date">date</option>
                                <option value="email">email</option>
                                <option value="tel">tel</option>
                                <option value="number ">number</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <button className="button">Add Field</button>
                    </div>
                </form>
                {this.state.fields.map((option, index) => (
                    <Form
                        key={option.label + option.name + option.type}
                        optionText={option}
                        count={index + 1}
                    />))}
                <form onSubmit={this.handleForm}>
                    <h3>Enter form name:</h3>
                    <input type="text" placeholder="form name" name="formName" />
                    <button className="button__2">SAVE</button>
                </form>
            </div>
        );
    }
}

