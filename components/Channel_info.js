import { isLoaded } from 'expo-font';
import React, { useEffect, useState, useCallback } from 'react';
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
} from 'react-native';
import { APIKEY } from '../assets/APIkey';
import { ConvertSub } from './convert_data';


export default function ChannelInfo(props) {
    const [channel, setChannel] = useState();
    const [loading, setLoading] = useState(true);
    const  channelId = props.channel
    
    const getChannel = async () => {
        try {
            console.log("tryd", channelId);
          const response = await fetch(
            'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id='
             + channelId+
            '&key=' + APIKEY,
          );
          const json = await response.json();
          setChannel(json.items[0] || {});
        } catch (error) {
          console.error(error);
          console.log('error');
        } finally {
            setLoading(false);
        }
      };
 useEffect(()=>{
    getChannel();
 },[])
 
 if(!loading) 
   
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderBottomColor: '#d8d8d8',
                borderBottomWidth: 1,
            }}>
            <Image
                style={{
                    height: 30,
                    width: 30,
                    resizeMode: 'contain',
                    borderRadius: 15,
                    marginRight: 10,
                }}
                source={{ uri: channel?.snippet?.thumbnails?.high.url }}
            />
            <View>
                <Text
                    style={{ fontWeight: '500', fontSize: 14 }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {channel?.snippet?.title}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        marginTop: 2,
                        color: '#484848',
                    }}>
                    {ConvertSub(channel?.statistics?.subscriberCount)} người đăng kí{' '}
                </Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <Text
                style={{
                    color: '#EE2020',
                    fontWeight: '600',
                    marginRight: 10,
                }}>
                ĐĂNG KÍ
            </Text>
        </View>
    )
}