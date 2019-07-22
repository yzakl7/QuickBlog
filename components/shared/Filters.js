import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default class Filters extends React.Component {
  renderFilters = () => {
    // esto es para leer el arreglo de botones mapearlos con sus parametros
    const { buttons, action, selected } = this.props;
    if (buttons.length > 0) {
      return buttons.map((button, key) => {
        return (
          <TouchableOpacity
            key={key}
            style={
              button.param !== selected ? styles.button : styles.buttonSelected
            }
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
  },
  buttonSelected: {
    backgroundColor: "#f5f8ff",
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 2,
    borderBottomWidth: 5,
    borderColor: "#7babed"
  }
});
