import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataContext } from "../Screen/VideoPlayer";
import { useContext } from "react";
export default function HeaderSheet(props) {
  const title = props.title;
  const value = useContext(DataContext);
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 0.5,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        marginTop: -5,
        justifyContent: "space-between",
        paddingBottom: 5,
      }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginLeft: 15,
        }}>
        {title}
      </Text>
      <TouchableOpacity onPress={value.handleCloseModalPress}>
        <Image
          source={require("../assets/img/X_icon.png")}
          style={{
            height: 16,
            width: 16,
            resizeMode: "contain",
            marginRight: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
