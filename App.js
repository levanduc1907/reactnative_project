// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import { Text, View,ScrollView, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs/';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Screen/HomeScreen'
import {SearchScreen, SearchResult} from './Screen/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/header';

function ShortScreen() {
  return (
    <ScrollView >
       <Text>ok</Text>

      </ScrollView>
  );
}
function SubscribeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Subcribe!</Text>
    </View>
  );
}

function LibraryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text >Library!</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen(){
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name = "Home" component={HomeScreen}></HomeStack.Screen>
      <HomeStack.Screen name = "Search" component={SearchScreen}></HomeStack.Screen>
      <HomeStack.Screen name = "SearchResult" component={SearchResult} ></HomeStack.Screen>
    </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ focused }) => {
            let iconname;
            if(route.name ==='Home')     {
              iconname = "home"
            }
            else if(route.name ==='Short') {    
              iconname ="rocket"
            }
            else if(route.name ==='Subcribe')     {
              iconname ="magic"
            }
            else if(route.name ==='Library')     {
             iconname ="rocket"
              }
              return (
                <Icon name={iconname} size={30} color="#900" />
              )
          },
   
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Short" component={ShortScreen} />
        
        <Tab.Screen name="Subcribe" component={SubscribeScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />


      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}