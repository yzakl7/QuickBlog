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

  // componentWillUnmount() {}

  // handleLogout = () => {
  //   const { email, password } = this.state;
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       this.props.history.push("/");
  //       console.log;
  //     })
  //     .catch(error =>
  //       this.setState({
  //         errorMessage: error.message
  //       })
  //     );
  // };
  // navigateTo = route => {
  //   const { currentUser } = this.state;
  //   switch (route) {
  //     case "myPosts":
  //       this.props.history.push({
  //         pathname: "/viewposts",
  //         state: {
  //           user: currentUser
  //         }
  //       });

  //       break;

  //     case "blogs":
  //       this.props.history.push({
  //         pathname: "/viewblogs",
  //         state: { user: currentUser }
  //       });

  //       break;
  //     case "newPost":
  //       this.props.history.push({
  //         pathname: "/editpost",
  //         state: {
  //           user: currentUser,
  //           action: route
  //         }
  //       });

  //       break;
  //     default:
  //       break;
  //   }
  // };

  render() {
    const { currentUser, error, data } = this.state;
    return (
      <View style={styles.container}>
        <ViewPosts />
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
