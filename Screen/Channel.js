import React from "react";
import { View, Text, Image } from "react-native";
import {NavigationContainer, useNavigation} from '@react-navigation/native';

export default function Channel({ route,navigation}){
  const channelId = route.params.channelId;
    return(
        <View>
            <Text>
                {channelId}
            </Text>
        </View>
    )
}