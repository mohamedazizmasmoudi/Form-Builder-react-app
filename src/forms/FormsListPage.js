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
                    <h2 className="header__title">Forms List Page</h2>
                    <h1></h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Form ID</th>
                                <th>Form Name</th>
                                <th>#_Submissions</th>
                                <th>Submit Page</th>
                                <th>Submissions Page</th>
                                <th>assign to page</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.forms.map((form, index) =>
                                <tr align="center" key={index}>
                                    <td align="center">{index + 1}</td>
                                    <td align="center">{form.name}</td>
                                    <td align="center">{form.counter}</td>
                                    <td align="center"><Link to={{ pathname: `/FormSubmitPage/${index + 1}`, state: { name: form.name } }}>View</Link></td>
                                    <td align="center"><Link to={"/FormSubmissionsPage/" + (index + 1)}>View</Link></td>
                                    <td align="center"><Link to={"/allpagesnotsub/" + form._id}>assign to page</Link></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div> : <div><h1>Loading...</h1></div>
        );
    }
}
