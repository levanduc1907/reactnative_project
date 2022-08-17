import { ScreenWidth } from "@rneui/base";
import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import VideoPlayerInfo from "./VideoPlayer_info.js";
import { Directions } from "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { ConvertCount, ConvertTime } from "../components/convert_data";
import VideoPreview from "./VideoPreview.js";

export default function VideoList(props) {
  const { data, header } = props;
  const ref = React.useRef();
  return (
    <FlatList
      ref={ref}
      ListHeaderComponent={() => {
        if (header) return <VideoPlayerInfo />;
        return <View></View>;
      }}
      style={{ backgroundColor: "#d8d8d8" }}
      bounces={false}
      data={data}
      renderItem={({ item }) => <VideoPreview video={item} />}
    />
  );
}
