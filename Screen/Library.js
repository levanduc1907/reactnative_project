import React from "react";
import { View, Text } from "react-native";
import { useMMKVObject, useMMKVString } from "react-native-mmkv";
import { storage } from "../App";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../components/header";
import LiteVideoList from "../components/LiteVideoList";
import History from "../components/History";
export default function LibraryScreen() {
  const [savedvideo, setSavedVideo] = useMMKVObject("savedVideo");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              paddingLeft: 15,
              marginBottom: 15,
              marginTop: 15,
            }}>
            Video đã xem
          </Text>
        </View>
        <ScrollView
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <History />
        </ScrollView>
        <View
          style={{
            borderTopColor: "#d8d8d8",
            borderTopWidth: 0.5,
            marginTop: 15,
          }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              paddingLeft: 15,
              marginBottom: 15,
              marginTop: 15,
            }}>
            Danh sách xem sau
          </Text>
        </View>

        <LiteVideoList data={savedvideo.items} />
      </ScrollView>
    </View>
  );
}
