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
    // if (this.state.message !== message) {
    this.setState({ message });
    // }
  };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({
      currentUser,
      message: this.props.location.state
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
          <ViewPosts
            currentUser={currentUser.email}
            history={this.props.history}
            setMessage={this.setMessage}
          />
        ) : null}

        <Text>
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
    // backgroundColor: "#ced6e3",
    alignItems: "center",
    zIndex: 2
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute"
  }
});
