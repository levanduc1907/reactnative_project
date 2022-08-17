import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { APIKEY } from "../assets/APIkey";
import { Dimensions } from "react-native";
import { ConvertCount } from "./convert_data";
import VideoPreview from "./VideoPreview";
export default function ChannelHome(props) {
  const channelId = props.channelId;
  console.log(props);
  const [channel, setChannel] = useState();
  const [trailer, setTrailer] = useState();
  const [loading, setLoading] = useState(true);

  const getChannel = async () => {
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2C%20brandingSettings&id=" +
          channelId +
          "&key=" +
          APIKEY
      );
      const json = await response.json();
      setChannel(json?.items[0]);
      console.log("aaa1", json);
      return json?.items[0].brandingSettings.channel.unsubscribedTrailer;
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
    }
  };
  const getTrailer = async () => {
    const id = await getChannel();
    console.log("idd", id);
    try {
      console.log("calll");
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
          id +
          "&key=" +
          APIKEY
      );
      const json = await response.json();
      console.log("aaa2", json);
      setTrailer(json.items[0]);
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrailer();
  }, []);

  if (loading) return <Text>Loading..</Text>;

  console.log("aaa3,", trailer);
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image
        style={{
          width: (Dimensions.get("window").width * 3.2) / 2,
          height: (Dimensions.get("window").width * 3) / 11,
          resizeMode: "cover",
        }}
        source={{ uri: channel?.brandingSettings.image.bannerExternalUrl }}
      />
      <Image
        style={{
          width: 60,
          height: 60,
          resizeMode: "contain",
          borderRadius: 30,
          marginTop: 15,
        }}
        source={{ uri: channel?.snippet.thumbnails.high.url }}
      />
      <Text
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 26,
          margin: 10,
        }}>
        {channel?.snippet.title}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#B90707" }}>
        ĐĂNG KÝ
      </Text>
      <Text style={{ fontSize: 13, fontWeight: "300", marginTop: 10 }}>
        {ConvertCount(channel?.statistics.subscriberCount)} người đăng ký ·{" "}
        {channel?.statistics.videoCount} video
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: "#484848",
          textAlign: "center",
          paddingRight: 15,
          paddingLeft: 15,
          marginTop: 5,
        }}
        numberOfLines={2}
        ellipsizeMode="tail">
        {channel?.brandingSettings.channel?.description}
      </Text>
      {trailer ? <VideoPreview video={trailer} /> : null}
    </ScrollView>
  );
}
