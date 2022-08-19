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

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getVideoList = async () => {
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=US&key=" +
          APIKEY
      );
      const json = await response.json();
      setData(json.items);
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
  if (!loading)
    return (
      <View>
        <Header />
        <VideoList data={data} header={false} />
      </View>
    );
}
export default HomeScreen;
