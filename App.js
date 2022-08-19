// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from "react";
import { Text, View, ScrollView, SafeAreaView, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs/";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./Screen/HomeScreen";
import { SearchScreen, SearchResult } from "./Screen/SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoPlayer from "./Screen/VideoPlayer";
import Channel from "./Screen/Channel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import PlaylistDetails from "./components/PlaylistDetails";
import SimpleToast from "react-native-simple-toast";
import LibraryScreen from "./Screen/Library";
function checkDisplayBottomTab(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log("routeName", routeName);
  if (routeName === "VideoPlayer") return { display: "none" };
  return {};
}
import { MMKV, useMMKVNumber, useMMKVString } from "react-native-mmkv";
export const storage = new MMKV();
if (storage.getString("savedVideo") == null)
  storage.set("savedVideo", '{"items":[]}');
if (storage.getString("watchedVideo") == null)
  storage.set("watchedVideo", '{"items":[]}');
function BottomIcon(props) {
  return (
    <View style={{ alignItems: "center", height: 20 }}>
      <Image
        style={{
          height: 18,
          width: 18,
          resizeMode: "contain",
        }}
        source={props.iconname}
      />
      <Text
        style={{
          fontSize: 12,
          marginTop: 3,
        }}>
        {props.label}
      </Text>
    </View>
  );
}
function SubscribeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SubscribeScreen</Text>
    </View>
  );
}

function ShortScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <TouchableOpacity
        onPress={() => {
          storage.set("watchedVideo", '{"items":[]}');
        }}>
        <Text>Short</Text>
      </TouchableOpacity>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}>
      <HomeStack.Screen name="Home" component={HomeScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name="Search"
        component={SearchScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name="SearchResult"
        component={SearchResult}></HomeStack.Screen>
      <HomeStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}></HomeStack.Screen>
      <HomeStack.Screen name="Channel" component={Channel}></HomeStack.Screen>
      <HomeStack.Screen name="PlaylistDetails" component={PlaylistDetails} />
    </HomeStack.Navigator>
  );
}
const LibraryStack = createNativeStackNavigator();
function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}>
      <LibraryStack.Screen
        name="Home"
        component={LibraryScreen}></LibraryStack.Screen>
      <LibraryStack.Screen
        name="Search"
        component={SearchScreen}></LibraryStack.Screen>
      <LibraryStack.Screen
        name="SearchResult"
        component={SearchResult}></LibraryStack.Screen>
      <LibraryStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}></LibraryStack.Screen>
      <LibraryStack.Screen
        name="Channel"
        component={Channel}></LibraryStack.Screen>
      <LibraryStack.Screen name="PlaylistDetails" component={PlaylistDetails} />
    </LibraryStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
          })}>
          <Tab.Screen
            name="HomeStack"
            options={({ route }) => ({
              tabBarStyle: checkDisplayBottomTab(route),
              tabBarIcon: ({ focused }) => (
                <BottomIcon
                  iconname={
                    focused
                      ? require("./assets/img/home_focus.png")
                      : require("./assets/img/home_unfocus.png")
                  }
                  label="Trang chủ"
                />
              ),
            })}
            component={HomeStackScreen}
          />
          <Tab.Screen
            name="Short"
            options={({ route }) => ({
              tabBarStyle: checkDisplayBottomTab(route),
              tabBarIcon: ({ focused }) => (
                <BottomIcon
                  iconname={
                    focused
                      ? require("./assets/img/short_focus.png")
                      : require("./assets/img/short_unfocus.png")
                  }
                  label="Short"
                />
              ),
            })}
            component={ShortScreen}
          />

          <Tab.Screen
            name="Subcribe"
            options={({ route }) => ({
              tabBarStyle: checkDisplayBottomTab(route),
              tabBarIcon: ({ focused }) => (
                <BottomIcon
                  iconname={
                    focused
                      ? require("./assets/img/sub_focus.png")
                      : require("./assets/img/sub_unfocus.png")
                  }
                  label="Kênh đăng ký"
                />
              ),
            })}
            component={SubscribeScreen}
          />
          <Tab.Screen
            name="Library"
            options={({ route }) => ({
              tabBarStyle: checkDisplayBottomTab(route),
              tabBarIcon: ({ focused }) => (
                <BottomIcon
                  iconname={
                    focused
                      ? require("./assets/img/library_focus.png")
                      : require("./assets/img/library_unfocus.png")
                  }
                  label="Thư viện"
                />
              ),
            })}
            component={LibraryStackScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
