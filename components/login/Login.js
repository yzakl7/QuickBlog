import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import firebase from "firebase";

export default class Login extends React.Component {
  // state = { email: "", password: "", errorMessage: null };
  state = {
    email: "isaacsauriortegon@gmail.com",
    password: "popolus",
    errorMessage: null
  };
  componentDidMount() {
    this.handleLogin();
  }
  handleLogin = () => {
    const { email, password } = this.state;
    console.log("signin");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.history.push({ pathname: "/", state: { email } }))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.history.push("/signup")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
