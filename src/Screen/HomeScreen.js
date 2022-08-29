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
import {
  Query,
  QueryClient,
  useInfiniteQuery,
  QueryClientProvider,
} from "react-query";
function HomeVideoList({ navigation }) {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const nextPage = React.useRef("");
  // const ref = React.useRef();
  // const isEnd = React.useRef(false);
  // const url =
  //   "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=5&regionCode=VN&key=";

  // const getVideoList = async () => {
  //   try {
  //     const response = await fetch(url + APIKEY);
  //     const json = await response.json();
  //     setData(json.items);
  //     nextPage.current = json.nextPageToken;
  //   } catch (error) {
  //     console.error(error);
  //     console.log("error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   getVideoList();
  // }, []);
  // const handleLoadMore = async () => {
  //   if (!isEnd.current) {
  //     try {
  //       console.log("load more");
  //       const response = await fetch(
  //         url + APIKEY + "&pageToken=" + nextPage.current
  //       );
  //       const json = await response.json();
  //       console.log("okkk", json);
  //       if (nextPage.current != json.nextPageToken) {
  //         setData((prev) => [...prev, ...(json.items || [])]);
  //         nextPage.current = json.nextPageToken;
  //       } else isEnd.current = true;
  //     } catch (error) {
  //       console.error(error);
  //       console.log("error");
  //     } finally {
  //     }
  //   }
  // };
  // if (!loading)
  const videoCategories = [
    1, 2, 10, 15, 17, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29,
  ];
  const randomIndex = Math.floor(Math.random() * videoCategories.length);
  const url =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=5&regionCode=VN&key=" +
    APIKEY +
    "&videoCategoryId=" +
    videoCategories[randomIndex];
  const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["homepage"],
      async ({ pageParam = "" }) => {
        try {
          console.log("api", url + "&pageToken=" + pageParam);
          const response = await fetch(url + "&pageToken=" + pageParam);
          const json = await response.json();
          return json;
        } catch (error) {
          console.error(error);
          console.log("error");
        } finally {
        }
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextPageToken,
      }
    );
  if (!isLoading)
    return (
      <View>
        <Header />
        <VideoList
          data={data?.pages.reduce((allvideos, current) => {
            if (current.items) return [...allvideos, ...current.items];
            else return allvideos;
          }, [])}
          handleLoadMore={fetchNextPage}
        />
      </View>
    );
}

const queryClient = new QueryClient();

export default function HomeScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeVideoList />
    </QueryClientProvider>
  );
}
