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
            style={styles.contentE}
            placeholder={this.props.placeholder}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
          />
        ) : (
          <Text style={styles.content}>{this.props.value}</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f8ff",
    padding: 5
  },

  content: {
    borderRadius: 3,
    padding: 0,
    fontSize: 14,
    textAlign: "left"
  },
  contentE: {
    paddingLeft: 10,
    borderColor: "#7babed",
    borderLeftWidth: 5,
    borderRadius: 3,
    fontSize: 14,
    textAlign: "left"
  }
});
