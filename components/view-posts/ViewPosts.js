import React, { Fragment } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity
} from "react-native";

import { firestore } from "../../config/firebase";

import ListItem from "./ListItem";
import Login from "../login/Login";
import Loading from "../login/Loading";
import Filters from "../shared/Filters";

export default class ViewPosts extends React.Component {
  state = { loading: true };
  constructor() {
    super();
    this.ref = firestore.collection("posts");
    this.filters = [
      { title: "My posts", param: "own" },
      { title: "All but mine", param: "hideOwn" },
      { title: "All", param: "all" }
    ];
  }

  componentDidMount() {
    this.getPosts();
  }
  componentDidUpdate() {}

  getPosts = () => {
    this.ref
      // .where("author", "==", this.props.currentUser)
      .get()
      .then(querySnapshot => {
        const posts = querySnapshot.docs.map(doc => doc.data());
        const filteredPosts = posts;
        this.setState({ filteredPosts, posts, loading: false });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  componentDidUpdate() {
    console.log(this.state);
  }

  filterPosts = filter => {
    const { posts } = this.state;

    var filteredPosts;
    switch (filter) {
      case "all":
        filteredPosts = posts;
        break;
      case "own":
        filteredPosts = posts.filter(
          post => post.author == this.props.currentUser
        );
        break;
      case "hideOwn":
        filteredPosts = posts.filter(
          post => post.author != this.props.currentUser
        );
        break;
      default:
        break;
    }
    this.setState({ filteredPosts });
  };
  render() {
    return (
      <Fragment>
        <Filters buttons={this.filters} action={this.filterPosts} />
        {this.state.loading ? (
          <Loading />
        ) : (
          <FlatList
            style={styles.container}
            // data={this.showPosts("hideOwn")}
            data={this.state.filteredPosts}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                author={item.author}
                content={item.content}
                history={this.props.history}
              />
            )}
          />
        )}
        {/* <Text>{JSON.stringify(this.state.posts)}</Text> */}
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: { borderWidth: 1, width: "100%" }
});
