import React, { useEffect, useState, useRef, useCallback } from "react";
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

import { storage } from "../App.js";
import SimpleToast from "react-native-simple-toast";
import VideoPlayerInfo from "./VideoPlayer_info.js";
import { Directions } from "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { ConvertCount, ConvertTime } from "../components/convert_data";
import LiteVideoPreview from "./LiteVideoPreview.js";
import { parseDuration } from "../components/convert_data";
import { useMMKVObject } from "react-native-mmkv";
import HistoryVideoPreview from "./HistoryVideoPreview.js";
const ScreenWidth = Dimensions.get("window").width;
function checkSavedVideo(savedVideo, id) {
  for (item of savedVideo.items) {
    if (item?.id == id) {
      return true;
    }
  }
  return false;
}
export default function History() {
  const [watchedvideo, setWatchedVideo] = useMMKVObject("watchedVideo");

  const data = watchedvideo.items;
  return (
    <View style={{ flexDirection: "row", marginLeft: 15 }}>
      {data?.map((item, index) => (
        <HistoryVideoPreview key={index} item={item} index={index} />
      ))}
    </View>
  );
}
