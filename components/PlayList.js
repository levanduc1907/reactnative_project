import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image } from "react-native";
import { APIKEY } from "../assets/APIkey";
import { FlatList } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaylistDetails from "./PlaylistDetails";
import { useNavigation } from "@react-navigation/native";
const ScreenWidth = Dimensions.get("window").width;

export default function Playlist(props) {
  const channelId = props.channelId;
  const [playlist, setPlaylist] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const ref = React.useRef();
  const getPlaylist = async () => {
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=" +
          channelId +
          "&maxResults=15&key=" +
          APIKEY
      );
      const json = await response.json();
      setPlaylist(json?.items);
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPlaylist();
  }, []);
  if (!loading)
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={ref}
          style={{ backgroundColor: "#fff" }}
          data={playlist}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PlaylistDetails", { item })}
              style={{
                paddingTop: 5,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 20,
                flexDirection: "row",
              }}>
              <View
                style={{
                  width: (ScreenWidth * 2) / 5,
                  height: (ScreenWidth * 9) / 40,
                  flexDirection: "row",
                }}>
                <Image
                  style={{
                    width: (ScreenWidth * 2) / 5,
                    height: (ScreenWidth * 9) / 40,
                    resizeMode: "cover",
                  }}
                  source={{
                    uri: (
                      item.snippet.thumbnails.high ??
                      item.snippet.thumbnails.medium ??
                      item.snippet.thumbnails.default
                    ).url,
                  }}></Image>
                <View
                  style={{
                    backgroundColor: "rgba(42,42,42,0.8)",
                    height: (ScreenWidth * 9) / 40,
                    width: (ScreenWidth * 4.5) / 25,
                    marginLeft: -(ScreenWidth * 4.5) / 25,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
                    {item.contentDetails.itemCount}
                  </Text>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                    }}
                    source={require("../assets/img/playlist_icon.png")}></Image>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 15,
                  paddingRight: 10,
                  width: (ScreenWidth * 2.7) / 5,
                }}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                  }}>
                  {item.snippet.title}
                </Text>
                <Text
                  style={{
                    color: "#484848",
                  }}>
                  {item.snippet.channelTitle}
                </Text>
                <Text
                  style={{
                    color: "#484848",
                  }}>
                  {item.contentDetails.itemCount} video
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
}
