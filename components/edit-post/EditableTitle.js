import React from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  ScrollView
} from "react-native";

export default class EditPost extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.editable ? (
          <TextInput
            multiline={this.props.multiline}
            style={styles.titleE}
            placeholder={this.props.placeholder}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
          />
        ) : (
          <Text style={styles.title}>{this.props.value}</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7babed",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    padding: 0
  },
  titleE: {
    fontSize: 25,
    textAlign: "center",
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "white",
    borderRadius: 3
  }
});
