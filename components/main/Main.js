import React from "react";
import {
  StyleSheet,
  Platform,
  Button,
  Text,
  View,
  BackHandler
} from "react-native";
import ViewPosts from "../view-posts/ViewPosts";

import firebase from "firebase";

export default class Main extends React.Component {
  state = { currentUser: null };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }
  render() {
    const { currentUser, error, data } = this.state;
    return (
      <View style={styles.container}>
        <ViewPosts />
        <Text />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center"
  }
});
