import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default class EditPost extends React.Component {
  componentDidMount() {
    this.setState(this.props.location.state);
  }

  render() {
    const { title, author } = this.state ? this.state : "";
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
