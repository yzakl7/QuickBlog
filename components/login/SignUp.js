import React from "react";
import firebase from "firebase";

import { StyleSheet, Text, TextInput, View, Button } from "react-native";

export default class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.history.push("/")) // una vez registrados nos vamos a la raiz
      .catch(error => this.setState({ errorMessage: error.message })); // hay que avisar en caso de error
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {/* De la misma manera que login y por cosistencia se quedaron estos inputs con lo minimo de estilos */}
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.history.push("/")}
        />
        {/*  para regresar a login en caso de tener una cuenta creada */}
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
