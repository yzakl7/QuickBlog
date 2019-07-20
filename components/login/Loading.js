import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import banana from "./loading2.gif";
import homer from "./loading3.gif";
import monkey from "./loading.gif";

export default class Loading extends React.Component {
  randImg = () => {
    var min = 1;
    var max = 4;
    var random = Math.random() * (+max - +min) + +min;
    if (random.toFixed(0) == 1) {
      return banana;
    } else if (random.toFixed(0) == 2) {
      return homer;
    }
    return monkey;
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={this.randImg()} style={{ width: 100, height: 100 }} />
        <Text>{this.props.text ? this.props.text : "Loading"}</Text>
        {/* <ActivityIndicator size="large" /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexShrink: 0,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fefe8f"
  }
});
