import React from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import EditableTitle from "./EditableTitle";
import EditableContent from "./EditableContent";
import bg from "../assets/background.png";
import Loading from "../login/Loading";

import { firestore } from "../../config/firebase";
import firebase from "firebase";

export default class EditPost extends React.Component {
  state = { loading: false };

  constructor() {
    super();
    this.ref = firestore.collection("posts");
  }
  handleBackPress = () => {
    console.log("back");
    this.props.history.goBack();
    return true;
  };
  saveUpdate = () => {
    this.setState({
      loading: true
    });
    const { id, title, content, currentUser } = this.state;
    console.log(id, title, content, currentUser);
    if (!id) {
      this.ref
        .add({
          title,
          text: content,
          author: currentUser
        })
        .then(res => {
          this.props.history.push({
            pathname: "/",
            state: {
              message: title + " Successfuly created!"
            }
          });
        })
        .catch(error => {
          this.props.history.push({
            pathname: "/",
            state: {
              message: "Error adding " + title,
              error
            }
          });
        });
    } else {
      this.ref
        .doc(id)
        .set({
          title,
          text: content,
          author: currentUser
        })
        .then(res => {
          this.props.history.push({
            pathname: "/",
            state: {
              message: title + " Successfuly updated!"
            }
          });
        })
        .catch(error => {
          this.props.history.push({
            pathname: "/",
            state: {
              message: "Error updating " + title,
              error
            }
          });
        });
    }
  };

  delete = () => {
    const { title } = this.state;
    this.setState({
      loading: true
    });
    this.ref
      .doc(this.state.id)
      .delete()
      .then(
        this.props.history.push({
          pathname: "/",
          state: {
            message: title + " Successfuly deleted!"
          }
        })
      )
      .catch(error => {
        this.props.history.push({
          pathname: "/",
          state: {
            message: "Error deleting " + title,
            error
          }
        });
      });
  };
  componentDidMount() {
    this.setState(this.props.location.state);
    console.log("edit post", this.props.location.state);
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );

    this.setState({
      currentUser: firebase.auth().currentUser.email
    });
  }
  componentDidUpdate() {
    if (!this.state.id && !this.state.editable) {
      this.setState({ editable: true });
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    const { title, author, content, editable, currentUser } = this.state
      ? this.state
      : "";
    return this.state.loading ? (
      <Loading text="Updating" />
    ) : (
      <View style={styles.container}>
        <Image style={styles.bg} source={bg} />

        {author === currentUser ? (
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.topBarButton}
              onPress={() =>
                this.setState({
                  editable: !editable
                })
              }
            >
              <Text style={styles.buttonText} style={{ color: "white" }}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topBarButton}
              onPress={() => this.delete()}
              // onPress={() => this.setState({ editable: !editable })}
            >
              <Text style={styles.buttonText} style={{ color: "white" }}>
                delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topBarButton}
              onPress={() => this.saveUpdate()}
              // onPress={() => this.setState({ editable: !editable })}
            >
              <Text style={styles.buttonText} style={{ color: "white" }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <ScrollView style={styles.post}>
          <EditableTitle
            multiline={true}
            placeholder="Add a title"
            onChangeText={title => this.setState({ title })}
            value={title}
            editable={editable}
          />
          <EditableContent
            multiline={true}
            placeholder="Write your post."
            onChangeText={content => this.setState({ content })}
            value={content}
            editable={editable}
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#ced6e3",
    flex: 1
  },
  post: {
    margin: 5,
    padding: 15
  },
  topBar: {
    color: "white",
    borderColor: "#ca9c20",
    borderBottomWidth: 5,
    backgroundColor: "#7babed",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  topBarButton: {
    padding: 10
  },
  buttonText: {},
  bg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute"
  }
});
