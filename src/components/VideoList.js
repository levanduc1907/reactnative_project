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
import VideoPlayerInfo from "../Screen/VideoPlayer/VideoPlayer_info.js";
import { Directions } from "react-native-gesture-handler";
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { ConvertCount, ConvertTime } from "./convert_data";
import VideoPreview from "./VideoPreview.js";
import { APIKEY } from "../assets/APIkey.js";
export default function VideoList(props) {
  const { data, header, handleLoadMore } = props;
  console.log("dataprops", data);
  const ref = React.useRef();
  useEffect(() => {
    if (ref?.current) {
      setTimeout(function () {
        ref?.current?.scrollToOffset({ offset: 0, animated: true });
      }, 500);
    }
  }, [header]);
  return (
    <FlatList
      ref={ref}
      ListHeaderComponent={() => {
        if (header) return <VideoPlayerInfo />;
        return <View></View>;
      }}
      style={{ backgroundColor: "#d8d8d8" }}
      bounces={true}
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <VideoPreview video={item} />}
      onEndReached={handleLoadMore}
      keyExtractor={(item, index) => `${item.id} `}
      onEndReachedThreshold={0.1}
    />
  );
}
