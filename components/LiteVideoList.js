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
import LiteVideoPreview from "./LiteVideoPreview.js";

export default function LiteVideoList(props) {
  const data = props.data;
  const ref = React.useRef();
  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>
          <LiteVideoPreview video={item} />
        </View>
      ))}
    </View>
  );
}
