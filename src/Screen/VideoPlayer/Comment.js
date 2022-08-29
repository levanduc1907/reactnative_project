import React, { useContext, memo } from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { View, Text, Image } from "react-native";
import { ConvertCount } from "../../components/convert_data";
import { StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { DataContext, SheetContext } from "../VideoPlayer";
import { APIKEY } from "../../assets/APIkey";
const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    marginBottom: 10,
    resizeMode: "contain",
  },
  profileicon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    borderRadius: 10,
    marginRight: 10,
  },
});
function Comment(props) {
  const value = useContext(DataContext);
  const { id, commentCount } = props;
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useContext(SheetContext);

  const getCommnent = async () => {
    try {
      console.log(
        "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&order=relevance&videoId=" +
          id +
          "&key=" +
          APIKEY
      );
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=20&order=relevance&videoId=" +
          id +
          "&key=" +
          APIKEY
      );
      const json = await response.json();

      setComments(json.items || {});
      setSheet({
        title: "Bình luận",
        data: json.items,
      });
    } catch (error) {
      console.error(error);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCommnent();
  }, [id]);

  if (!loading)
    return (
      <TouchableOpacity onPress={value.handlePresentCommentPress}>
        <View>
          <View style={{ margin: 10, flexDirection: "row" }}>
            <Text style={{ color: "#242424", fontWeight: "400", fontSize: 13 }}>
              Bình luận {ConvertCount(commentCount)}
            </Text>
            <View style={{ flex: 1 }} />
            <Image
              source={require("../../assets/img/caret_down.png")}
              style={styles.icon}></Image>
          </View>
        </View>
        <View style={{ margin: 10, flexDirection: "row", marginTop: -10 }}>
          <Image
            style={styles.profileicon}
            source={{
              uri: comments[1]?.snippet.topLevelComment.snippet
                .authorProfileImageUrl,
            }}
          />
          <Text
            style={{ fontSize: 12, paddingRight: 30 }}
            numberOfLines={2}
            ellipsizeMode="tail">
            {comments[1]?.snippet.topLevelComment.snippet.textOriginal}
          </Text>
        </View>
      </TouchableOpacity>
    );
}
export default memo(Comment);
