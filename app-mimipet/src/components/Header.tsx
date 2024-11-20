import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomImage } from "./CustomImage";

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <CustomImage.Local filePathByRequire={require("../../public/mimi_pet_v2_cortada.png")} height={50} width={80}/>
    </View>

  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FE6863",
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  }
})
