import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { ConvertTime, ConvertCount } from "./convert_data";
import { parseDuration } from "./convert_data";
import { useNavigation } from "@react-navigation/native";
import { APIKEY } from "../assets/APIkey";
import { Directions } from "react-native-gesture-handler";
import PopupMenuVideoPreview from "./PopupMenu_VideoPreview";
const ScreenWidth = Dimensions.get("window").width;

export default function LiteVideoPreview(props) {
  const item = props.video;
  const navigation = useNavigation();
  return (
    <View style={{ width: ScreenWidth }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("VideoPlayer", item)}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            paddingBottom: 5,
            paddingTop: 5,
          }}>
          <View>
            <Image
              style={{
                width: (ScreenWidth * 2) / 5,
                height: (ScreenWidth * 9) / 40,
                resizeMode: "cover",
                marginLeft: 15,
                marginRight: 15,
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
                right: 20,
                bottom: 5,
              }}>
              {" "}
              {item?.contentDetails?.duration
                ? parseDuration(item?.contentDetails?.duration)
                : null}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontWeight: "500" }}
              numberOfLines={3}
              ellipsizeMode="tail">
              {item?.snippet?.title}
            </Text>
            <Text style={{ color: "#484848", fontSize: 12 }}>
              {item?.snippet?.channelTitle} ·{" "}
              {item?.statistics?.viewCount
                ? ConvertCount(item.statistics?.viewCount) + " lượt xem · "
                : ""}
              {ConvertTime(item?.snippet?.publishedAt || "")}
            </Text>
          </View>
          <PopupMenuVideoPreview item={item} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
