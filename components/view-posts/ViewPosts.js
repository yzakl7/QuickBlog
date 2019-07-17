import React, { Fragment } from "react";
import { View, FlatList, StyleSheet, Text, Button } from "react-native";

import { firestore } from "../../config/firebase";

import ListItem from "./ListItem";
import Login from "../login/Login";
import Loading from "../login/Loading";

export default class ViewPosts extends React.Component {
  state = { loading: true };
  constructor() {
    super();
    this.ref = firestore.collection("posts");
  }

  componentDidMount() {
    this.getPosts();
  }
  componentDidUpdate() {}

  getPosts = () => {
    this.ref
      .where("author", "==", this.props.currentUser)
      .get()
      .then(querySnapshot => {
        const posts = querySnapshot.docs.map(doc => doc.data());
        this.setState({ posts, loading: false });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  componentDidUpdate() {}

  render() {
    return (
      <Fragment>
        {this.state.loading ? (
          <Loading />
        ) : (
          <FlatList
            style={styles.container}
            data={this.state.posts}
            renderItem={({ item }) => (
              <ListItem title={item.title} author={item.author} />
            )}
          />
        )}
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 }
});
