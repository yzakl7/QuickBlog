import React, { Component } from "react";
import { View, Text } from "react-native";

export default class ListItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <View>
        <Text>{JSON.stringify(this.props.item)}!</Text>
      </View>
    );
  }
}
