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
import { parseDuration } from "../components/convert_data";
const ScreenWidth = Dimensions.get("window").width;
export default function History(props) {
  const navigation = useNavigation();
  const data = props.data;
  const ref = React.useRef();
  return (
    <View style={{ flexDirection: "row", marginLeft: 15 }}>
      {data?.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("VideoPlayer", item)}>
          <View key={index} style={{ width: (ScreenWidth * 3) / 8, margin: 5 }}>
            <View>
              <Image
                style={{
                  width: (ScreenWidth * 3) / 8,
                  height: (ScreenWidth * 27) / 128,
                  resizeMode: "cover",
                }}
                source={{ uri: item?.snippet?.thumbnails?.high?.url }}
              />
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: "#fff",
                  backgroundColor: "#000",
                  position: "absolute",
                  fontWeight: "bold",
                  fontFamily: "ArialMT",
                  fontSize: 11,
                  right: 5,
                  bottom: 5,
                }}>
                {" "}
                {item?.contentDetails?.duration
                  ? parseDuration(item?.contentDetails?.duration)
                  : null}
              </Text>
            </View>
            <View style={{ flex: 1, paddingRight: 10, paddingTop: 5 }}>
              <Text
                style={{ fontWeight: "400", fontSize: 14 }}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item?.snippet?.title}
              </Text>
              <Text style={{ color: "#484848", fontSize: 12 }}>
                {item?.snippet?.channelTitle}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
