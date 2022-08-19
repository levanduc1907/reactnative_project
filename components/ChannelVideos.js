import React, { useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import SortVideos from "./SortVideos";
const sortlist = {
  popular: "popular",
  date: "date",
};
export default function ChannelVideo(props) {
  const channelId = props.channelId;
  const [sort, setSort] = useState(sortlist.popular);
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginLeft: 10,
        }}>
        {[
          {
            id: "popular",
            text: "Phổ biến nhất",
            Touch: () => setSort(sortlist.popular),
          },
          {
            id: "date",
            text: "Mới nhất",
            Touch: () => setSort(sortlist.date),
          },
        ].map((item) => (
          <TouchableOpacity key={item.id} onPress={item.Touch}>
            <View style={item.id == sort ? styles.focused : styles.unfocused}>
              <Text
                style={{
                  fontWeight: "500",
                  color: item.id == sort ? "#fff" : "#000",
                }}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {sort === "popular" ? (
        <SortVideos channelId={channelId} sort={"ViewCount"}></SortVideos>
      ) : (
        <SortVideos channelId={channelId} sort={"date"}></SortVideos>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  focused: {
    backgroundColor: "#484848",
    borderRadius: 12,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
  },
  unfocused: {
    backgroundColor: "#d8d8d8",
    borderRadius: 12,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
  },
});
