import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  InteractionManager,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import YoutubePlayer from "react-native-youtube-iframe";
import SuggestVideo from "../components/SuggestVideo";
import CommentList from "../components/CommentList";
import HeaderSheet from "../components/HeaderSheet";
import {
  addDot,
  ConvertCount,
  getMD,
  getYear,
} from "../components/convert_data";
import { storage } from "../App";
export const DataContext = createContext();
export const SheetContext = createContext();

const status = {
  detailComment: "",
};
export default function VideoPlayer({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      setLoading(false)
    );
    return () => interactionPromise.cancel();
  }, []);
  useEffect(() => {
    const watchedVideo = JSON.parse(storage.getString("watchedVideo"));
    if (item.id != watchedVideo.items[0]?.id) {
      watchedVideo.items.unshift(item);
      storage.set("watchedVideo", JSON.stringify(watchedVideo));
    }
  }, []);
  const item = route.params;

  const bottomSheetModalRef = React.useRef();
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
    container: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
      backgroundColor: "grey",
    },
    contentContainer: {
      flex: 1,
    },
  });
  // variables
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const sheetHeight = ((windowHeight - 245) / windowHeight) * 100;
  const snapPoints = useMemo(
    () => [sheetHeight.toFixed(0).toString() + "%", "100%"],
    []
  );

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  });
  const handlePresentCommentPress = useCallback(() => {
    setSheetSeason("comment");
    handlePresentModalPress();
  });
  const handlePresentDescriptionPress = useCallback(() => {
    setSheetSeason("des");
    handlePresentModalPress();
  });
  const [sheet, setSheet] = useState();
  const [sheetSeason, setSheetSeason] = useState("comment");

  const value = {
    item,
    handlePresentCommentPress,
    handlePresentDescriptionPress,
    handleCloseModalPress,
  };
  if (loading) return <View style={{ backgroundColor: "#000", flex: 1 }} />;

  return (
    <SheetContext.Provider value={[sheet, setSheet]}>
      <DataContext.Provider value={value}>
        <BottomSheetModalProvider>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <YoutubePlayer height={220} play={true} videoId={item.id} />

            <SuggestVideo id={item.id} />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <View style={styles.contentContainer}>
                {sheetSeason == "des" ? (
                  <View>
                    <HeaderSheet title="Nội dung mô tả" />
                    <ScrollView>
                      <Text
                        style={{
                          padding: 15,
                          fontSize: 16,
                          fontWeight: "bold",
                        }}>
                        {item.snippet.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingRight: 15,
                          paddingLeft: 15,
                          marginLeft: 15,
                          marginRight: 15,
                          borderBottomColor: "#d8d8d8",
                          borderBottomWidth: 0.5,
                          paddingBottom: 10,
                        }}>
                        {[
                          {
                            top: ConvertCount(item.statistics?.likeCount),
                            bottom: "Lượt thích",
                          },
                          {
                            top: addDot(item.statistics?.viewCount),
                            bottom: "Lượt xem",
                          },
                          {
                            top: getMD(item.snippet?.publishedAt),
                            bottom: getYear(item.snippet?.publishedAt),
                          },
                        ].map((box, index) => (
                          <View key={index} style={{ alignItems: "center" }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                marginBottom: 5,
                              }}>
                              {box.top}
                            </Text>
                            <Text style={{ color: "#484848" }}>
                              {box.bottom}
                            </Text>
                          </View>
                        ))}
                      </View>
                      <Text
                        style={{
                          margin: 15,
                          marginBottom: 50,
                          fontSize: 12,
                        }}>
                        {item.snippet?.description}
                      </Text>
                    </ScrollView>
                  </View>
                ) : (
                  <CommentList data={sheet?.data}></CommentList>
                )}
              </View>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </DataContext.Provider>
    </SheetContext.Provider>
  );
}
