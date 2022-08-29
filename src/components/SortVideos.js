import React, { memo } from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { APIKEY } from "../assets/APIkey";
import LiteVideoList from "./LiteVideoList";
export default function SortVideos(props) {
  const channelId = props.channelId;
  const sort = props.sort;

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const getVideoIdList = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=id&order=" +
          sort +
          "&maxResults=15&channelId=" +
          channelId +
          "&key=" +
          APIKEY
      );
      const json = await response.json();
      return json.items;
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
    }
  };

  const getVideoList = async () => {
    const data = await getVideoIdList();
    let idList = "";
    for (let item of data) {
      idList += item.id.videoId + "%2C";
    }
    idList = idList.slice(0, -3);
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&order=" +
          sort +
          "&id=" +
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
      setLoading(false);
    }
  };
  useEffect(() => {
    getVideoList();
  }, [sort]);
  if (loading) return <Text>Loading</Text>;

  return <LiteVideoList data={videos} />;
}
