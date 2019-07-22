import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default class ListItem extends Component {
// Este es otro componente que será transformado en meramente funcional en
// los siguientes releases/ediciones/revisiones, es la plantilla de un elemento de la lista
  render() {
    const { title, author, content, id } = this.props;
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() =>
          this.props.history.push({
            pathname: "/edit_post",
            state: { title, author, content, id }
          })
        }
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    margin: 5,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#f5f8ff",
    borderLeftColor: "#7babed",
    borderLeftWidth: 5
  },
  title: { fontSize: 20, color: "#ca9c20" },
  author: { alignSelf: "flex-end" }
});
