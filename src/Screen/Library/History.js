import React from "react";
import { View } from "react-native";

import { useMMKVObject } from "react-native-mmkv";
import HistoryVideoPreview from "./HistoryVideoPreview.js";

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
