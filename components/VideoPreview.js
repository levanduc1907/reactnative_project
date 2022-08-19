import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { ConvertTime, ConvertCount } from "./convert_data";
import { parseDuration } from "./convert_data";
import { useNavigation } from "@react-navigation/native";
import { APIKEY } from "../assets/APIkey";
import Skeleton from "react-loading-skeleton";
const ScreenWidth = Dimensions.get("window").width;

export default function VideoPreview(props) {
  const item = props.video;
  const [channelThumb, setChannelThumb] = useState();
  const [loading, setLoading] = useState();
  const getChannelThumb = async () => {
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=" +
          item?.snippet.channelId +
          "&key=" +
          APIKEY
      );

      console.log("itemem", item.snippet?.channelId);
      const json = await response.json();
      setChannelThumb(json?.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getChannelThumb();
  }, [item]);
  const navigation = useNavigation();
  if (loading) return null;
  return (
    <View>
      <TouchableOpacity
        style={styles.videoItem}
        onPress={() => navigation.navigate("VideoPlayer", item)}>
        <View style={styles.videoThumb}>
          <Image
            style={styles.high}
            source={{
              uri: item?.snippet?.thumbnails?.high?.url,
            }}
          />
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: "#fff",
              backgroundColor: "#000",
              position: "absolute",
              fontWeight: "bold",
              fontFamily: "ArialMT",
              fontSize: 13,
              right: 15,
              bottom: 10,
            }}>
            {" "}
            {item?.contentDetails?.duration
              ? parseDuration(item?.contentDetails?.duration)
              : null}
          </Text>
        </View>
        <View style={styles.describe}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Channel", {
                channelId: item.snippet.channelId,
                channelTitle: item?.snippet?.channelTitle,
              })
            }>
            <Image
              style={styles.channelImg}
              source={{
                uri: channelThumb,
              }}
            />
          </TouchableOpacity>
          <View style={{ width: ScreenWidth * 0.8 }}>
            <Text
              style={{ fontWeight: "500" }}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item?.snippet?.title}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text style={{ color: "#484848", fontSize: 12 }}>
                {item?.snippet?.channelTitle} ·{" "}
                {item?.statistics?.viewCount
                  ? ConvertCount(item.statistics?.viewCount) + " lượt xem · "
                  : ""}
                {ConvertTime(item?.snippet?.publishedAt || "")}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  high: {
    width: ScreenWidth,
    height: (ScreenWidth * 9) / 16,
    resizeMode: "cover",
  },

  videoItem: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "column",
  },
  videoThumb: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  describe: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: ScreenWidth,
    height: (ScreenWidth * 9) / 40,
    padding: 10,
  },
  channelImg: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 15,
    marginLeft: 5,
    marginTop: 5,
  },
});
