import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React from 'react';
import {Text, View, ScrollView,Image} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import { ConvertCount, ConvertTime } from './convert_data';
export default function CommentList(props) {
  const data = props.data;
  const ref = React.useRef();
  console.log('ffin', data);
  return (
    <ScrollView 
    bounces="false">
      <View 
        style={{
          flexDirection:"row",
          padding:10,
          borderBottomColor: '#d8d8d8',
          borderBottomWidth: 0.5,
          
        }}>
        <Image
          source={{
            uri: 'https://yt3.ggpht.com/9v791aXgd4UOgHOVAmwkoq77QplNF_NvZRS7O6hKmMtRT15W6iWXSXfDNihTkQOqIaeU-joNmg=s48-c-k-c0x00ffffff-no-rj',
          }}
          style={{
            height: 36,
            width: 36,
            resizeMode: 'contain',
            borderRadius: 18,
            marginRight: 15,
            marginLeft: 5
          }}
        />
        <TextInput
          placeholder='Viết bình luận...'
          placeholderTextColor="#484848"
        >

        </TextInput>
      </View>
      {data?.map((item) => (
        <View 
          style={{
            flexDirection:"row",
            padding:10,
            flex:1
        }}> 
          <Image
            source={{
              uri: item.snippet.topLevelComment.snippet.authorProfileImageUrl
            }}
            style={{
              height: 26,
              width: 26,
              resizeMode: 'contain',
              borderRadius: 13,
              marginRight: 15,
              marginLeft: 5
          }}
          />
          <View
          style={{
            marginRight:15,
            flex:1
          }}>
            <Text
              style={{
                color:"#484848",
                fontSize:12,
                marginBottom:5
              }}  
            >
            {item?.snippet.topLevelComment.snippet?.authorDisplayName} · {ConvertTime(item.snippet.topLevelComment.snippet.publishedAt)}
            </Text>
            <Text
              numberOfLines={4}
              ellipsizeMode="tail"
              >
              {item?.snippet.topLevelComment.snippet?.textOriginal}
            </Text>
            <View style={{
              flexDirection:"row",
              alignItems:"center",
              marginTop:10,              
            }}>
              <TouchableOpacity>
                <Image
                style={{
                  height:12,
                  width:12,
                  resizeMode:'contain',
                  marginRight:5
                }}
                  source={require('../assets/img/like_icon.png')}
                />
              </TouchableOpacity>
              <Text 
                style={{
                  fontSize:12,
                  marginRight:5,
                  width:40,
                  textAlign:"left",
                  overflow:"visible"
                }}
              >
                {ConvertCount(item.snippet.topLevelComment.snippet?.likeCount)}
              </Text>
              <TouchableOpacity>
                <Image 
                  style={{
                    height:12,
                    width:12,
                    resizeMode:'contain',
                    transform:[{rotate:'180deg'}]}}
                  source={require('../assets/img/like_icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                style={{
                  height:16,
                  width:12,
                  resizeMode:'contain',
                  marginLeft:40
                }}
                  source={require('../assets/img/reply.png')}
                />
              </TouchableOpacity>

              
            </View>
            <Text 
              style={{
                fontSize:13,
                color:"#115cc2",
                fontWeight:"500",
                marginTop:20                
              }}>
              {ConvertCount(item.snippet.totalReplyCount)} PHẢN HỒI
            </Text>
          </View> 
        </View>
      ))}
      
    </ScrollView>
  );
}
