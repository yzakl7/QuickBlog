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

export default class Main extends React.Component {
  state = { currentUser: null };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({ currentUser: this.props.location.state.email });
    console.log(this.props);
  }
  render() {
    const { currentUser, error, data } = this.state;
    return (
      <View style={styles.container}>
        {currentUser ? <ViewPosts currentUser={currentUser} /> : null}
        <Text>{JSON.stringify(this.props.location.state.email)}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ced6e3",
    alignItems: "stretch"
  }
});
/*
#f5f8ff = blancos
#7babed = encabezados
#ff72ad = Attention
#ffcc41 = warning
#ced6e3 = fondo
*/
