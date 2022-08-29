import { memo } from "react";
import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { useMMKVObject } from "react-native-mmkv";
import { Dimensions } from "react-native";
import { parseDuration } from "../../components/convert_data";
import {
  Menu,
  MenuOption,
  MenuTrigger,
  MenuOptions,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";
import SimpleToast from "react-native-simple-toast";
import { storage } from "../../../App";
const ScreenWidth = Dimensions.get("window").width;

function checkSavedVideo(savedVideo, id) {
  for (item of savedVideo.items) {
    if (item?.id == id) {
      return true;
    }
  }
  return false;
}

function HistoryVideoPreview(props) {
  const navigation = useNavigation();
  const [savedVideo, setSavedVideo] = useMMKVObject("savedVideo");
  const [watchedVideo, setWatchedVideo] = useMMKVObject("watchedVideo");
  const item = props.item;
  const index = props.index;
  const [issaved, setIsSaved] = useState();
  useEffect(() => {
    setIsSaved(checkSavedVideo(savedVideo, item.id));
  }, [savedVideo, watchedVideo]);
  const toggleSave = useCallback(() => {
    if (!issaved) {
      savedVideo.items.unshift(item);
      storage.set("savedVideo", JSON.stringify(savedVideo));
      setIsSaved(true);
      SimpleToast.show("Lưu vào danh sách xem sau");
    } else {
      for (let i = 0; i < savedVideo.items.length; i++) {
        if (item?.id == savedVideo.items[i].id) {
          savedVideo.items.splice(i, 1);
          break;
        }
      }
      storage.set("savedVideo", JSON.stringify(savedVideo));
      setIsSaved(false);
      SimpleToast.show("Xoá khỏi danh sách xem sau");
    }
  });
  const delHistoryVideo = useCallback(() => {
    console.log("index", index);
    watchedVideo.items.splice(index, 1);
    setWatchedVideo(watchedVideo);
  });
  return (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate("VideoPlayer", item)}>
      <View
        key={index}
        style={{
          width: (ScreenWidth * 3) / 8,
          margin: 5,
          marginLeft: 0,
          marginRight: 12,
        }}>
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, paddingTop: 5 }}>
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
          <Menu>
            <MenuTrigger>
              <Image
                style={{
                  height: 12,
                  width: 12,
                  resizeMode: "contain",
                  marginRight: 5,
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  tintColor: "#484848",
                }}
                source={require("../../assets/img/three_dot.png")}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  width: ScreenWidth * 0.5,
                },
              }}>
              {[
                {
                  title: "Xoá khỏi lịch sử",
                  source: require("../../assets/img/trash.png"),
                  function: delHistoryVideo,
                },
                {
                  title: !issaved ? "Lưu vào xem sau" : "Xoá khỏi xem sau",

                  source: issaved
                    ? require("../../assets/img/saved.png")
                    : require("../../assets/img/save.png"),
                  function: toggleSave,
                },
                {
                  title: "Chia sẻ",
                  source: require("../../assets/img/share.png"),
                },
                {
                  title: "Huỷ",
                  source: require("../../assets/img/X_icon.png"),
                },
              ].map((option, index) => (
                <MenuOption
                  key={index}
                  onSelect={option.function}
                  style={{
                    flexDirection: "row",
                    margin: 5,
                    alignItems: "center",
                  }}>
                  <Image
                    source={option.source}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      marginRight: 20,
                    }}></Image>
                  <Text>{option.title}</Text>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default HistoryVideoPreview;
