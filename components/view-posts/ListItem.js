import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ListItem extends Component {
  render() {
    const { title, author } = this.props;
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    margin: 5,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
    borderLeftColor: "purple",
    borderLeftWidth: 5
  },
  title: { fontSize: 20 },
  author: { alignSelf: "flex-end" }
});
