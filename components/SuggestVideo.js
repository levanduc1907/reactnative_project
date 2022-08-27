import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
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
import { isCancelledError } from "react-query";
import { APIKEY } from "../assets/APIkey";
import VideoList from "./VideoList";

function SuggestVideo(props) {
  const { id } = props;
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextpage] = useState("");
  const loadingMore = useRef();
  const isEnd = useRef(false);
  useEffect(() => {
    setSuggest([]);
    setNextpage("");
  }, [id]);
  const getSuggestId = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=id&relatedToVideoId=" +
          id +
          "&type=video&maxResults=15&key=" +
          APIKEY +
          "&pageToken=" +
          nextPage
      );
      const json = await response.json();
      if (nextPage != json.nextPageToken) {
        setNextpage((prev) => json.nextPageToken ?? prev);
        console.log("next", nextPage);
        return json.items || [];
      } else {
        isEnd.current = true;
        return [];
      }
    } catch (error) {
      console.error(error);
      console.log("error");
      return [];
    } finally {
    }
  };
  const getSuggest = async () => {
    const data = await getSuggestId();
    if (data == []) return;
    let idList = "";
    for (let item of data) {
      idList += item.id.videoId + "%2C";
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
      setSuggest((prev) => {
        var list = [...prev];
        json.items?.forEach((item) => {
          if (prev.filter((e) => e.id == item.id).length == 0) {
            list.push(item);
          }
        });
        return list;
      });
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
      setLoading(false);
      loadingMore.current = false;
    }
  };
  const handleLoadMore = () => {
    if (!loadingMore.current) {
      loadingMore.current = true;
      if (!isEnd.current) getSuggest();
    }
  };
  useEffect(() => {
    getSuggest();
  }, [id]);
  if (!loading)
    return (
      <VideoList
        data={suggest}
        handleLoadMore={handleLoadMore}
        header={id}></VideoList>
    );
}
export default memo(SuggestVideo);
