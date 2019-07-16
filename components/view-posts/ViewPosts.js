import React, { Fragment } from "react";
import { View, FlatList, StyleSheet, Text, Button } from "react-native";

import { firestore } from "../../config/firebase";

import ListItem from "./ListItem";

export default class ViewPosts extends React.Component {
  state = { user: "isaacsauriortegon@gmail.com" };
  constructor() {
    super();
    this.ref = firestore.collection("posts");
  }
  componentDidMount() {
    this.getPosts();
  }
  getPosts = () => {
    const { user } = this.state;
    this.ref
      .where("author", "==", "isaacsauriortegon@gmail.com")
      .get()
      .then(querySnapshot => {
        const posts = querySnapshot.docs.map(doc => doc.data());
        this.setState({ posts });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  componentDidUpdate() {
    console.log(this.state);
  }
  renderPosts = () => {
    return <Text>Not Yet!</Text>;
  };
  render() {
    return (
      <Fragment>
        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => (
            <View style={styles.flatview}>
              <Text>{item.title}1</Text>
              <Text>{item.author}2</Text>
            </View>
          )}
        />
        <Button
          title="setstate"
          onPress={() => this.setState({ random: Math.random() })}
        />
        <Text>{JSON.stringify(this.state.posts)}</Text>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 }
});
