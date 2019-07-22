import React from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
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
    this.props.history.goBack();
    return true;
  };
  saveUpdate = () => {
    this.setState({
      loading: true
    });
    const { id, title, content, currentUser } = this.state;
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
    this.setState(this.props.location.state); // aca importamos el state que tramos de la redireccion al state interno del componente
    this.backHandler = BackHandler.addEventListener(
      // con esto escuchamos el botón de atrás del sistema, para que programemos la conducta esperada
      "hardwareBackPress",
      this.handleBackPress
    );
    this.setState({
      currentUser: firebase.auth().currentUser.email // conseguimos el email del login para corroborar que sol podamos editar nuestros propios posts
    });
  }
  componentDidUpdate() {
    if (!this.state.id && !this.state.editable) {
      this.setState({ editable: true });
    }
  }
  componentWillUnmount() {
    this.backHandler.remove(); // quitamos el listener
  }
  render() {
    const { title, author, content, editable, currentUser } = this.state // desesctructurar para tener un codigo mas limpio y legible
      ? this.state
      : "";
    return this.state.loading ? (
      <Loading text="Updating" /> // para no mostrar nada antes de tiempo y evitar la posibilidad de trabajar con valores aun no definidos que nos den error
    ) : (
      <View style={styles.container}>
        <Image style={styles.bg} source={bg} />
        {author === currentUser ? ( // aqui es donde usamos el curren user para mostrar o no mostrar la barra de edicion
          <View style={styles.topBar}>
            {" "}
            {/* Toda esta barra, en un desarrollo normal a hubiera hecho en un componente diferente,
          incluso los botones (touchableOpacity) hubieran sido otros componentes, en este caso se quedaron ahi a modo de ejemplo
          y tambin influyo un poco que se me estaba terminando el tiempo para concluir la app */}
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
            >
              <Text style={styles.buttonText} style={{ color: "white" }}>
                delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topBarButton}
              onPress={() => this.saveUpdate()}
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
