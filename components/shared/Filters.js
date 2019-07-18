import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default class Filters extends React.Component {
  renderFilters = () => {
    const { buttons, action } = this.props;
    if (buttons.length > 0) {
      return buttons.map(button => {
        return (
          <TouchableOpacity
            style={styles.button}
            onPress={() => action(button.param)}
          >
            <Text>{button.title}</Text>
          </TouchableOpacity>
        );
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(this.props.buttons)}</Text> */}
        {this.renderFilters()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  button: {
    backgroundColor: "#f5f8ff",
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 2
  }
});