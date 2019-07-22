import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import banana from "./loading2.gif";
import homer from "./loading3.gif";
import monkey from "./loading.gif";

export default class Loading extends React.Component {
  randImg = () => {
    // esto es solo un poquito de dinamismo, consigo un valor aleatorio entre 1 y 4 ( excluyendo 4)
    // y se lo asigno a cada una de las imagenes de carga de la app, asi tenemos la posibilidad de
    // ver diferentes animaciones de carga en cada caso, agregando un poquito de UX
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
        {/* Aquí se aplica el random */}
        <Text>{this.props.text ? this.props.text : "Loading"}</Text>
        {/* <ActivityIndicator size="large" /> */}
        {/* Tambien podemow usar una imagen de carga normal de RN, siempre y cuando la importemos */}
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
