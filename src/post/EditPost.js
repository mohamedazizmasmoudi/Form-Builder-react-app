import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            redirectToProfile: false,
            error: "",
            loading: false
        };
    }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data.postedBy._id,
                    title: data.title,
                    body: data.body,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }


    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
             event.target.value;

        this.postData.set(name, value);
        this.setState({ [name]: value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        
    };

    editPostForm = (title, body) => (
        <form>
           
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update category
            </button>
        </form>
    );

    render() {
        const {
            title,
            body,
            redirectToProfile,
            error,
            loading
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

             

                {isAuthenticated().user.role === "admin" &&
                    this.editPostForm(title, body)}

            
            </div>
        );
    }
}

export default EditPost;
