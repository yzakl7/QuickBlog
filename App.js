import React, { Component, Fragment } from "react";

import firebase from "firebase";
import { firestore } from "./config/firebase";

import { Text, View } from "react-native";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

import Loading from "./components/login/Loading";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import Main from "./components/main/Main";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user: true //temporal
      });
    });
  }
  componentWillUnmount() {
    this.authSubscription();
  }
  render() {
    return (
      <Fragment>
        <NativeRouter>
          {this.state.user ? (
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          )}
        </NativeRouter>
      </Fragment>
    );
  }
}
