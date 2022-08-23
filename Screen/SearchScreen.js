import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import VideoList from "../components/VideoList";
import { APIKEY } from "../assets/APIkey";
import { get, set } from "react-hook-form";

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#e8e8e8",
    flex: 1,
    padding: 5,
    height: 30,
    borderRadius: 3,
    paddingEnd: 30,
  },
  backBtn: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 10,
    marginLeft: 10,
  },
});
export function SearchResult({ route, navigation }) {
  const text = route.params.text;
  const [videos, setVideos] = useState([]);
  const getVideoIdList = async () => {
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/search?part=id&maxResults=25&q=" +
          text +
          "&regionCode=VN&key=" +
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

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
        }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.backBtn}
            source={require("../assets/img/back.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 30,
            backgroundColor: "#e8e8e8",
            alignContent: "center",
            justifyContent: "center",
            padding: 5,
            flex: 1,
            marginRight: 20,
            borderRadius: 3,
          }}
          onPress={() => navigation.navigate("Search")}>
          <Text>{text}</Text>
        </TouchableOpacity>
      </View>
      <VideoList data={videos}> </VideoList>
    </View>
  );
}

export function SearchScreen() {
  const [text, setText] = useState("");
  const [suggest, setSuggest] = useState();
  const navigation = useNavigation();
  const getSuggest = async () => {
    const query = text.toLocaleLowerCase().trim();
    if (query != "")
      try {
        const response = await fetch(
          `https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=en&gl=vn&ds=yt&client=chrome&q=${encodeURIComponent(
            query
          )}`,
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );
        console.log("resp", response);
        const json = await response?.json();

        console.log(json);
        setSuggest(json[1]);
      } catch (error) {
        console.log("error", error);
        setSuggest("");
      } finally {
      }
  };
  useEffect(() => {
    setTimeout(getSuggest, 200);
  }, [text]);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require("../assets/img/back.png")}
          />
        </TouchableOpacity>
        <TextInput
          selectionColor="#FF4949"
          autoFocus="true"
          placeholder="Tìm kiếm trên YouTube"
          placeholderTextColor="#888888"
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
          style={styles.input}
          onSubmitEditing={() => {
            if (text != "") navigation.navigate("SearchResult", { text });
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 50,
          }}
          onPress={() => {
            setText("");
          }}>
          <Image
            source={require("../assets/img/X_icon.png")}
            style={{
              margin: 7,
              height: 12,
              width: 12,
              resizeMode: "contain",
            }}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (text != "") navigation.push("SearchResult", { text });
          }}>
          <Image
            source={require("../assets/img/search.webp")}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: 26,
              width: 26,
              resizeMode: "contain",
              marginRight: 15,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView bounces={false}>
        {suggest
          ? suggest.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  setText(item);
                  navigation.navigate({
                    name: "SearchResult",
                    params: { text: item },
                  });
                }}>
                <Image
                  source={require("../assets/img/search.webp")}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    height: 16,
                    width: 45,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  {item}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setText(item);
                  }}>
                  <Image
                    source={require("../assets/img/back.png")}
                    style={{
                      height: 16,
                      width: 16,
                      margin: 15,
                      resizeMode: "contain",
                      transform: [{ rotate: "45deg" }],
                      marginBottom: 7,
                      marginTop: 7,
                    }}></Image>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
}
