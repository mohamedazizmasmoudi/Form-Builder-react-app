import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/base/components/formsListPage.css';


export default class FormsListPage extends React.Component {
    constructor() {
        super();
        this.state = {
            forms: []
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/customers/get`).then(res => res.json())
            .then(forms =>
                this.setState({ forms }));
    }

    render() {
        return (
            this.state.forms.length > 0 ?
                <div className="container">
                    <h2 className="header__title">Forms List category</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Form ID</th>
                                <th>Form Name</th>
                                <th>#_Submissions</th>
                                <th>Submissions category</th>
                                <th>assign to category</th>
                                <th>confirm demande</th>

                            </tr>
                        </thead>
                        <tbody>

                            {this.state.forms.map((form, index) =>
                                <tr align="center" key={index}>
                                    <td align="center">{index + 1}</td>
                                    <td align="center">{form.name}</td>
                                    <td align="center">{form.counter}</td>
                                    <td align="center"><Link to={"/FormSubmissionsPage/" + form._id}>View</Link></td>
                                    <td align="center"><Link to={"/allpagesnotsub/" + form._id}>assign to category</Link></td>
                                    <td align="center"><Link to={"/allpagesnotsub/" + form._id}>confirm demande</Link></td>

                                </tr>)}
                        </tbody>
                    </table>
                </div> : <div><h1>Loading...</h1></div>
        );
    }
}
