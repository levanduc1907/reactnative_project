import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { APIKEY } from "../assets/APIkey";
import { TabView, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { Title } from "react-native-paper";
import ChannelHome from "../components/ChannelHome";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderLabel={({ route, focused, color }) =>
      focused ? (
        <Text style={{ color: "#000", fontWeight: "500" }}>{route.title}</Text>
      ) : (
        <Text style={{ color: "#666" }}>{route.title}</Text>
      )
    }
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white" }}
  />
);
export default function Channel({ route, navigation }) {
  const Id = route.params.channelId;
  const title = route.params.channelTitle;
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "Home":
        return <ChannelHome channelId={Id} jumpTo={jumpTo} />;
      case "Video":
        return <Text>Video</Text>;
    }
  };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Home", title: "Trang chủ" },
    { key: "Video", title: "Video" },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 5,
          alignItems: "center",
          paddingRight: 10,
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
            source={require("../assets/img/back.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: "500",
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onPress={() => navigation.navigate("Search")}>
          <Image
            source={require("../assets/img/search.webp")}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: Dimensions.get("window").width }}
        />
      </View>
    </View>
  );
}
