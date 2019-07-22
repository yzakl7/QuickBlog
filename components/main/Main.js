import React from "react";
import {
  StyleSheet,
  Platform,
  Button,
  Text,
  View,
  BackHandler,
  Image
} from "react-native";
import ViewPosts from "../view-posts/ViewPosts";
import firebase from "firebase";
import bg from "../assets/background.png";

export default class Main extends React.Component {
  state = { currentUser: null };
  constructor(props) {
    super(props);
  }
  setMessage = message => {
    // estos son los mensajitos que da la aplicacion cuando pasa algo, como login
    // update, deleted successfuly etc...
    this.setState({ message });
  };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    // comprobamos que estamos logueados porque no siempre venimos de
    // Login con el email definido por medio de estado
    this.setState({
      currentUser,
      message: this.props.location.state   // si traemos un mensaje, acá lo seteamos
        ? this.props.location.state.message
        : ""
    });
  }
  render() {
    const { currentUser, error, data, message } = this.state;
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={bg} />
        {currentUser && currentUser.email ? (
          // otra comprobación, esta es mas que nada para esperar que haya
          // información para renderear
          <ViewPosts
            currentUser={currentUser.email}
            history={this.props.history}
            setMessage={this.setMessage}
          />
        ) : null}

        <Text>
          {/* Aqí es donde rendeamos los mensajitos, en una siguiente edición
          serán puestos en un snackbar, mientras tanto estan aquí y por eso
          no tienen demasiado estilo */}
          {message
            ? message
            : currentUser && currentUser.email
            ? JSON.stringify(currentUser.email)
            : ""}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    zIndex: 2
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute"
  }
});
