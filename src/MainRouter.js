import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";
import Admin from "./admin/Admin";
import FormsListPage from './forms/FormsListPage';
import FormBuilderPage from './forms/FormBuilderPage';
import FormSubmitPage from './forms/FormSubmitPage';
import FormSubmissionsPage from './forms/FormSubmissionsPage';
import allpagesnotsub from "./post/Postsnotassign";

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/allpagesnotsub/:id" component={allpagesnotsub} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute
                exact
                path="/post/edit/:postId"
                component={EditPost}
            />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute
                exact
                path="/user/edit/:userId"
                component={EditProfile}
            />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute path="/FormsListPage" component={FormsListPage}  />
            <PrivateRoute path="/FormBuilderPage" component={FormBuilderPage} />
            <PrivateRoute path="/FormSubmitPage/:id" component={FormSubmitPage} />
            <PrivateRoute path="/FormSubmissionsPage/:id" component={FormSubmissionsPage} />
        </Switch>
    </div>
);

export default MainRouter;
