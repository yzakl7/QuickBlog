import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default class ListItem extends Component {
  render() {
    const { title, author } = this.props;
    return (
      <TouchableOpacity style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
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
