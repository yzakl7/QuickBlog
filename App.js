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
  render() {
    const { loading, user } = this.state;
    return (
      <Fragment>
        {loading ? ( // no cargamos nada hasta que no tengamos la info del auth, sea
          <Loading /> // que estemos o no logueados
        ) : (
          <NativeRouter>
            <Switch>
              <Route exact path="/" component={user ? Main : Login} />{" "}
              {/* De esta forma, cuando user sea null siempre nos dirigiremos a Login */}
              <Route path="/signup" component={SignUp} />
              {user ? <Route path="/edit_post" component={EditPost} /> : null}
              {/* no podremos tener accesso a edit post si no hay usuariio */}
            </Switch>
          </NativeRouter>
        )}
      </Fragment>
    );
  }
}
