import React, { Component, Fragment } from "react";

import firebase from "firebase";
import { firestore } from "./config/firebase";

import { Text, View } from "react-native";
import { NativeRouter, Route, Link, Switch, Browse } from "react-router-native";

import Loading from "./components/login/Loading";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import Main from "./components/main/Main";
import EditPost from "./components/edit-post/EditPost";

export default class App extends React.Component {
  state = { loading: true };
  constructor() {
    super();
  }
  toggleLoading = loading => {
    this.setState({ loading });
  };
  componentDidMount() {
    this.persistLogin(); // to PERSIST logged in
  }

  componentWillUnmount() {
    this.authSubscription(); // to AVOID memory leaks
  }
  persistLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user
      });
    });
  };
  newPost = param => {
    console.log(param);
  };
  render() {
    const { loading, user } = this.state;
    return (
      <Fragment>
        {this.state.loading ? (
          <Loading />
        ) : (
          <NativeRouter>
            <Switch>
              <Route exact path="/" component={user ? Main : Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/edit_post" component={EditPost} />
            </Switch>
            {/* <Text>{JSON.stringify(user)}</Text> */}
          </NativeRouter>
        )}
      </Fragment>
    );
  }
}
