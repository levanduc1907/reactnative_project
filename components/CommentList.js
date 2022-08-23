import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Text, View, ScrollView, Image } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { ConvertCount, ConvertTime } from "./convert_data";
import HeaderSheet from "./HeaderSheet";
const Tab = createNativeStackNavigator();

function CommentList(props) {
  const navigation = useNavigation();
  const data = props.data;
  const ref = React.useRef();
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <HeaderSheet title="Bình luận" />
      <ScrollView bounces="false">
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            borderBottomColor: "#d8d8d8",
            borderBottomWidth: 0.5,
          }}>
          <Image
            source={{
              uri: "https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj",
            }}
            style={{
              height: 36,
              width: 36,
              resizeMode: "contain",
              borderRadius: 18,
              marginRight: 15,
              marginLeft: 5,
            }}
          />
          <TextInput
            placeholder="Viết bình luận..."
            placeholderTextColor="#484848"></TextInput>
        </View>
        {data?.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              padding: 10,
              flex: 1,
            }}>
            <Image
              source={{
                uri: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
              }}
              style={{
                height: 26,
                width: 26,
                resizeMode: "contain",
                borderRadius: 13,
                marginRight: 15,
                marginLeft: 5,
              }}
            />
            <View
              style={{
                marginRight: 15,
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("commentDetail", { item })}>
                <Text
                  style={{
                    color: "#484848",
                    fontSize: 12,
                    marginBottom: 5,
                  }}>
                  {item?.snippet.topLevelComment.snippet?.authorDisplayName} ·{" "}
                  {ConvertTime(
                    item.snippet.topLevelComment.snippet.publishedAt
                  )}
                </Text>

                <Text numberOfLines={4} ellipsizeMode="tail">
                  {item?.snippet.topLevelComment.snippet?.textOriginal}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}>
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 12,
                        width: 12,
                        resizeMode: "contain",
                        marginRight: 5,
                      }}
                      source={require("../assets/img/like_icon.png")}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: 5,
                      width: 40,
                      textAlign: "left",
                      overflow: "visible",
                    }}>
                    {ConvertCount(
                      item.snippet.topLevelComment.snippet?.likeCount
                    )}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 12,
                        width: 12,
                        resizeMode: "contain",
                        transform: [{ rotate: "180deg" }],
                      }}
                      source={require("../assets/img/like_icon.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 16,
                        width: 12,
                        resizeMode: "contain",
                        marginLeft: 40,
                      }}
                      source={require("../assets/img/reply.png")}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {item.snippet.totalReplyCount ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("commentDetail", { item })
                  }>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#115cc2",
                      fontWeight: "500",
                      marginTop: 20,
                    }}>
                    {ConvertCount(item.snippet.totalReplyCount)} PHẢN HỒI
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
function CommentDetail({ route, navigation }) {
  const item = route.params.item;
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: 15,
            paddingRight: 5,
          }}>
          <Image
            style={{
              height: 16,
              width: 16,
              resizeMode: "contain",
            }}
            source={require("../assets/img/cmt_back.png")}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          <HeaderSheet title="Trả lời" />
        </View>
      </View>
      <ScrollView>
        {/* selected cmt */}
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#f6f6f6",
          }}>
          <Image
            source={{
              uri: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
            }}
            style={{
              height: 26,
              width: 26,
              resizeMode: "contain",
              borderRadius: 13,
              marginRight: 15,
              marginLeft: 5,
            }}
          />
          <View
            style={{
              marginRight: 15,
              flex: 1,
            }}>
            <Text
              style={{
                color: "#484848",
                fontSize: 12,
                marginBottom: 5,
              }}>
              {item?.snippet.topLevelComment.snippet?.authorDisplayName} ·{" "}
              {ConvertTime(item.snippet.topLevelComment.snippet.publishedAt)}
            </Text>

            <Text>{item?.snippet.topLevelComment.snippet?.textOriginal}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}>
              <TouchableOpacity>
                <Image
                  style={{
                    height: 12,
                    width: 12,
                    resizeMode: "contain",
                    marginRight: 5,
                  }}
                  source={require("../assets/img/like_icon.png")}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  marginRight: 5,
                  width: 40,
                  textAlign: "left",
                  overflow: "visible",
                }}>
                {ConvertCount(item.snippet.topLevelComment.snippet?.likeCount)}
              </Text>
              <TouchableOpacity>
                <Image
                  style={{
                    height: 12,
                    width: 12,
                    resizeMode: "contain",
                    transform: [{ rotate: "180deg" }],
                  }}
                  source={require("../assets/img/like_icon.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    height: 16,
                    width: 12,
                    resizeMode: "contain",
                    marginLeft: 40,
                  }}
                  source={require("../assets/img/reply.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            borderBottomColor: "#d8d8d8",
            borderBottomWidth: 0.5,
          }}>
          <Image
            source={{
              uri: "https://yt3.ggpht.com/9v791aXgd4UOgHOVAmwkoq77QplNF_NvZRS7O6hKmMtRT15W6iWXSXfDNihTkQOqIaeU-joNmg=s48-c-k-c0x00ffffff-no-rj",
            }}
            style={{
              height: 26,
              width: 26,
              resizeMode: "contain",
              borderRadius: 13,
              marginRight: 15,
              marginLeft: 40,
            }}
          />
          <TextInput
            placeholder="Phản hồi..."
            placeholderTextColor="#484848"></TextInput>
        </View>
        <View
          style={{
            paddingLeft: 35,
          }}>
          {item?.replies?.comments.map((reply, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                padding: 10,
              }}>
              <Image
                source={{
                  uri: reply.snippet.authorProfileImageUrl,
                }}
                style={{
                  height: 26,
                  width: 26,
                  resizeMode: "contain",
                  borderRadius: 13,
                  marginRight: 15,
                  marginLeft: 5,
                }}
              />
              <View
                style={{
                  marginRight: 15,
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: "#484848",
                    fontSize: 12,
                    marginBottom: 5,
                  }}>
                  {reply.snippet?.authorDisplayName} ·{" "}
                  {ConvertTime(reply.snippet.publishedAt)}
                </Text>

                <Text>{reply.snippet?.textOriginal}</Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}>
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 12,
                        width: 12,
                        resizeMode: "contain",
                        marginRight: 5,
                      }}
                      source={require("../assets/img/like_icon.png")}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: 5,
                      width: 40,
                      textAlign: "left",
                      overflow: "visible",
                    }}>
                    {ConvertCount(reply.snippet?.likeCount)}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      style={{
                        height: 12,
                        width: 12,
                        resizeMode: "contain",
                        transform: [{ rotate: "180deg" }],
                      }}
                      source={require("../assets/img/like_icon.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
export default function CommentListScreen(props) {
  const data = props.data;

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen
        name="commentList"
        children={() => <CommentList data={data} />}
      />
      <Tab.Screen name="commentDetail" component={CommentDetail} />
    </Tab.Navigator>
  );
}
