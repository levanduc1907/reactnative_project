import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  memo,
} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import ChannelInfo from "./Channel_info";
import Comment from "./Comment";
import { DataContext } from "../Screen/VideoPlayer";
import { ConvertCount, ConvertTime } from "./convert_data";
const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    marginBottom: 10,
    resizeMode: "contain",
  },
});
import { storage } from "../App";
import SimpleToast from "react-native-simple-toast";
function checkSavedVideo(id) {
  const savedVideo = JSON.parse(storage.getString("savedVideo"));
  for (item of savedVideo.items) {
    if (item.id == id) {
      return true;
    }
  }
  return false;
}
function VideoPlayerInfo() {
  const value = useContext(DataContext);
  const item = value.item;

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [issaved, setIsSaved] = useState(checkSavedVideo(item.id));
  const toggleLike = useCallback(() => {
    if (!like) setDislike(false);
    setLike((prev) => !prev);
  });
  const toggleDislike = useCallback(() => {
    if (!dislike) setLike(false);
    setDislike((prev) => !prev);
  });

  const toggleSave = useCallback(() => {
    const savedVideo = JSON.parse(storage.getString("savedVideo"));

    if (!issaved) {
      savedVideo.items.unshift(item);
      storage.set("savedVideo", JSON.stringify(savedVideo));
      setIsSaved(true);
      SimpleToast.show("Lưu vào danh sách xem sau");
    } else {
      for (let i = 0; i < savedVideo.items.length; i++) {
        if (item.id == savedVideo.items[i].id) {
          savedVideo.items.splice(i, 1);
          break;
        }
      }
      storage.set("savedVideo", JSON.stringify(savedVideo));
      setIsSaved(false);
      SimpleToast.show("Xoá khỏi danh sách xem sau");
    }
  });

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 8,
      }}>
      <TouchableOpacity onPress={value.handlePresentDescriptionPress}>
        <Text
          style={{
            paddingTop: 10,
            marginLeft: 10,
            fontSize: 16,
            fontWeight: "500",
            marginRight: 20,
          }}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.snippet.title}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 12,
            color: "#686868",
            marginTop: 5,
          }}>
          {item.statistics?.viewCount
            ? ConvertCount(item.statistics?.viewCount) + " lượt xem · "
            : ""}
          {ConvertTime(item.snippet?.publishedAt)}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingLeft: 10,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
          paddingRight: 10,
          borderBottomColor: "#d8d8d8",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          style={{ alignItems: "center", padding: 10 }}
          onPress={toggleLike}>
          <Image
            source={
              like
                ? require("../assets/img/liked_icon.png")
                : require("../assets/img/like_icon.png")
            }
            style={styles.icon}></Image>
          <Text style={{ fontSize: 12, fontWeight: "300" }}>
            {" "}
            {ConvertCount(item.statistics?.likeCount)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", padding: 10 }}
          onPress={toggleDislike}>
          <Image
            source={
              dislike
                ? require("../assets/img/liked_icon.png")
                : require("../assets/img/like_icon.png")
            }
            style={{
              transform: [{ rotate: "180deg" }],
              height: 20,
              width: 20,
              marginBottom: 10,
              resizeMode: "contain",
            }}></Image>
          <Text style={{ fontSize: 12, fontWeight: "300" }}> Không thích</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 10 }}>
          <Image
            source={require("../assets/img/share.png")}
            style={styles.icon}></Image>
          <Text style={{ fontSize: 12, fontWeight: "300" }}> Chia sẻ </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center", padding: 10 }}>
          <Image
            source={require("../assets/img/download.png")}
            style={styles.icon}></Image>
          <Text style={{ fontSize: 12, fontWeight: "300" }}> Tải xuống </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", padding: 10 }}
          onPress={toggleSave}>
          <Image
            source={
              issaved
                ? require("../assets/img/saved.png")
                : require("../assets/img/save.png")
            }
            style={styles.icon}></Image>
          <Text style={{ fontSize: 12, fontWeight: "300" }}> Lưu</Text>
        </TouchableOpacity>
      </View>
      <ChannelInfo channel={item.snippet.channelId} />
      <Comment id={item.id} commentCount={item.statistics.commentCount} />
    </View>
  );
}
export default VideoPlayerInfo;
