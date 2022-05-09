import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";

function SuccessScreen() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.primary,
      }}
    >
      <Icon name="check-circle-outline" />
    </View>
  );
}

export default SuccessScreen;
