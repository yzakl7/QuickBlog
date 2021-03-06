import React, { Fragment } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity
} from "react-native";

import firebase from "firebase";
import { firestore } from "../../config/firebase";

import ListItem from "./ListItem";
import Login from "../login/Login";
import Loading from "../login/Loading";
import Filters from "../shared/Filters";

export default class ViewPosts extends React.Component {
  state = { loading: true, filter: "all" };
  constructor() {
    super();
    this.ref = firestore.collection("posts");
    this.filters = [
      { title: "My posts", param: "own" },
      { title: "All but mine", param: "hideOwn" },
      { title: "All", param: "all" }
    ];
    this.actions = [
      { title: "Sign out", param: "signOut" },
      { title: "Update", param: "update" },
      { title: "New Post", param: "newPost" }
    ];
  }

  componentDidMount() {
    this.getPosts();
  }
  componentDidUpdate() {}

  getPosts = () => {
    //aca obtenemos los posts
    this.ref
      .get()
      .then(QueryDocumentSnapshot => {
        const posts = QueryDocumentSnapshot.docs.map(doc => ({
          // OJO esto bien parecería ser un QuerySnapshort, pero necesitamos a fuercitas el
          // ID para pasarlo como parametro y posteriormente usarlo para editar el registro
          // en la base de datos
          text: doc.data().text,
          author: doc.data().author,
          title: doc.data().title,
          id: doc.id
        }));
        const filteredPosts = posts;
        this.setState({
          filteredPosts,
          posts,
          loading: false
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  filterPosts = filter => {
    // Acá aplicamos los filtros de los posts que queremos ver/buscar
    // podrian ser llamados filtrados desde la base de datos, pero es para no estar haciendo
    // consultas con cada vez que querramos filtrar
    // se puede complementar con una busqueda manual donde el usuario escriba el correo
    // de quien quiera buscar sus posts y a su vez podrían extraerse los autores de los posts
    // para hacer un autocomplete
    const { posts } = this.state;
    this.setState({ filter });
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
  renderList = ({ item }) => (
    <ListItem
      title={item.title}
      key={item.id}
      id={item.id}
      author={item.author}
      content={item.text}
      history={this.props.history}
    />
  );
  bottomButtons = param => {
    if (param === "newPost") {
      this.props.history.push({
        pathname: "/edit_post",
        state: {
          title: "",
          author: this.props.currentUser,
          content: "",
          id: null
        }
      });
    } else if (param === "update") {
      this.setState({
        loading: true
      });
      this.props.setMessage("Updated!");
      this.getPosts();
    } else {
      firebase.auth().signOut();
    }
  };
  render() {
    return this.state.loading ? (
      <Loading />
      // no mostrar nada hasta que no termine la carga
    ) : (
      <Fragment>
        <Filters
          buttons={this.filters}
          action={this.filterPosts}
          selected={this.state.filter}
        />
        <FlatList
          style={styles.container}
          data={this.state.filteredPosts}
          renderItem={this.renderList}
        />
        <Filters
          buttons={this.actions}
          action={this.bottomButtons}
          selected={this.state.filter}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: { width: "100%" }
});
