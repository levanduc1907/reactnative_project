import { ScreenWidth } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { APIKEY } from "../assets/APIkey";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Directions } from "react-native-gesture-handler";
import Header from "../components/header";
import TouchableOpacity from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import VideoList from "../components/VideoList";
import Skeleton from "react-loading-skeleton";
import VideoPreview from "../components/VideoPreview";
function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const nextPage = React.useRef("");
  const ref = React.useRef();
  const isEnd = React.useRef(false);
  const url =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=5&regionCode=VN&key=";

  const getVideoList = async () => {
    try {
      const response = await fetch(url + APIKEY);
      const json = await response.json();
      setData(json.items);
      nextPage.current = json.nextPageToken;
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getVideoList();
  }, []);
  const handleLoadMore = async () => {
    if (!isEnd.current) {
      try {
        console.log("load more");
        const response = await fetch(
          url + APIKEY + "&pageToken=" + nextPage.current
        );
        const json = await response.json();
        console.log("okkk", json);
        if (nextPage.current != json.nextPageToken) {
          setData((prev) => [...prev, ...(json.items || [])]);
          nextPage.current = json.nextPageToken;
        } else isEnd.current = true;
      } catch (error) {
        console.error(error);
        console.log("error");
      } finally {
      }
    }
  };
  if (!loading)
    return (
      <View>
        <Header />
        <VideoList data={data} handleLoadMore={handleLoadMore} />
      </View>
    );
}
export default HomeScreen;
