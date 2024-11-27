import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomImage } from "./CustomImage";

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <CustomImage.Local
        filePathByRequire={require("../../public/mimi_pet_cortada.png")}
        height={80}
        width={200}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
});
