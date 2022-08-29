import React, { memo } from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { APIKEY } from "../../assets/APIkey";
import LiteVideoList from "../../components/LiteVideoList";
import { useNavigation } from "@react-navigation/native";
export default function PlaylistDetails({ route }) {
  const item = route.params.item;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const getVideoIdList = async () => {
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=15&playlistId=" +
          item.id +
          "&key=" +
          APIKEY
      );
      const json = await response.json();
      return json.items;
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  const getVideoList = async () => {
    const data = await getVideoIdList();
    let idList = "";
    for (let item of data) {
      idList += item.contentDetails.videoId + "%2C";
    }
    idList = idList.slice(0, -3);
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
          idList +
          "&key=" +
          APIKEY
      );
      const json = await response.json();
      setVideos(json.items);
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
    }
  };

  useEffect(() => {
    getVideoList();
  }, []);

  if (loading) return <Text>Loading</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 5,
          alignItems: "center",
          paddingRight: 10,
          justifyContent: "space-between",
        }}>
        <TouchableOpacity
          style={{
            paddingLeft: 15,
            paddingRight: 15,
          }}
          onPress={() => navigation.navigate("Home")}>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
            }}
            source={require("../../assets/img/back.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onPress={() => navigation.navigate("Search")}>
          <Image
            source={require("../../assets/img/search.webp")}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            {item.snippet.title}
          </Text>
          <Text style={{ color: "#484848", marginBottom: 10 }}>
            {item.snippet.channelTitle}
          </Text>
          <Text style={{ color: "#484848" }}>{item.snippet.description}</Text>
        </View>
        <LiteVideoList data={videos} />
      </ScrollView>
    </View>
  );
}
