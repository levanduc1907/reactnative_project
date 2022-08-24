import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text } from "react-native";
import { storage } from "../App";
import { MenuProvider } from "react-native-popup-menu";
import SimpleToast from "react-native-simple-toast";
import { Dimensions } from "react-native";
import { useMMKVObject } from "react-native-mmkv";

function checkSavedVideo(savedVideo, id) {
  for (item of savedVideo.items) {
    if (item?.id == id) {
      return true;
    }
  }
  return false;
}
const ScreenWidth = Dimensions.get("window").width;
export default function PopupMenuVideoPreview(props) {
  const item = props.item;
  const [savedVideo, setSavedVideo] = useMMKVObject("savedVideo");

  const [issaved, setIsSaved] = useState();
  useEffect(() => {
    setIsSaved(checkSavedVideo(savedVideo, item.id));
  }, [savedVideo]);
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
  return (
    <Menu>
      <MenuTrigger>
        <Image
          style={{
            height: 15,
            width: 15,
            resizeMode: "contain",
            margin: 10,
            tintColor: "#484848",
          }}
          source={require("../assets/img/three_dot.png")}
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: ScreenWidth * 0.5,
            marginLeft: -40,
          },
        }}>
        {[
          {
            title: !issaved ? "Lưu vào xem sau" : "Xoá khỏi xem sau",
            source: issaved
              ? require("../assets/img/saved.png")
              : require("../assets/img/save.png"),
            function: toggleSave,
          },
          {
            title: "Chia sẻ",
            source: require("../assets/img/share.png"),
          },
          {
            title: "Huỷ",
            source: require("../assets/img/X_icon.png"),
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
  );
}
