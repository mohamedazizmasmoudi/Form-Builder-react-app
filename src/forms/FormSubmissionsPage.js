import React from 'react';

export default class FormSubmissionsPage extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            newLine: []
        };
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/customers/getnewDB`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                index: this.props.match.params.id
            }),
        }).then(res => res.json())
            .then(newLine =>
                this.setState({ newLine }));
    }

    render() {
        return (
            this.state.newLine.length > 0 ?
                <div className="container">
                    <h2>Form Submissions category</h2>
                    <table>
                        <thead>
                            <tr>
                            <th>name</th>
                            <th>email</th>

                                

                                {this.state.newLine[0].formSubmissions[0].map((header, index) =>
                                    <th align="center" key={index}>
                                        {header.input}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.newLine.map((newline, index) =>
                            <tr>
                                <td>{newline.user.name}</td>
                                <td>{newline.user.email}</td>
                             
                                {newline.formSubmissions.map((line) =>
                                    <td key={index}>
                                        {line.map((header, index) =>
                                            <p align="center" key={index}>
                                                {header.value}
                                            </p>
                                        )}
                                    </td>
                                )}</tr>
                            )}
                        </tbody>
                    </table>
                </div>
                :
                <div>
                    <h3>No submissions in the system yet</h3>
                </div>
        );
    }

}