import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';
import VideoList from '../components/VideoList';

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e8e8e8',
    flex: 1,
    padding: 5,
    marginRight: 10,
  },
  backBtn: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 10,
  },
});
export function SearchResult({route, navigation}) {
  const text = route.params.text;
  const [videos, setVideos] = useState([]);
  const getVideoIdList = async () => {
    try {
      const response = await fetch(
        'https://youtube.googleapis.com/youtube/v3/search?part=id&maxResults=25&q=' +
          text +
          '&regionCode=VN&key=AIzaSyDDeetQzqlsCvvTyBrdLrkqqZMPuKgs2nI',
      );
      const json = await response.json();
      return json.items;
    } catch (error) {
      console.error(error);
      console.log('error');
    } finally {
    }
  };

  const getVideoList = async () => {
    const data = await getVideoIdList();
    let idList = '';
    for (let item of data) {
      idList += item.id.videoId + '%2C';
    }
    idList = idList.slice(0, -3);
    try {
      const response = await fetch(
        'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' +
          idList +
          '&key=AIzaSyDDeetQzqlsCvvTyBrdLrkqqZMPuKgs2nI',
      );
      const json = await response.json();
      setVideos(json.items);
    } catch (error) {
      console.error(error);
      console.log('error');
    } finally {
    }
  };

  useEffect(() => {
    getVideoList();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.backBtn}
            source={require('../assets/img/back.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 30,
            backgroundColor: '#e8e8e8',
            alignContent: 'center',
            padding: 5,
            flex: 1,
            marginRight: 20,
            borderRadius:3
          }}
          onPress={() => navigation.navigate('Search')}>
          <Text>{text}</Text>
        </TouchableOpacity>
      </View>
      <VideoList data={videos}> </VideoList>
    </View>
  );
}

export function SearchScreen() {
  const [text, setText] = useState();
  const navigation = useNavigation();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../assets/img/back.png')}
          />
        </TouchableOpacity>
        <TextInput
          selectionColor="#FF4949"
          autoFocus="true"
          placeholder="Tìm kiếm trên YouTube"
          placeholderTextColor="#888888"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
          style={styles.input}
          onSubmitEditing={() => navigation.navigate('SearchResult', {text})}
        />
        <TouchableOpacity
          onPress={() => navigation.push('SearchResult', {text})}>
          <Image
            source={require('../assets/img/search.webp')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: 26,
              width: 26,
              resizeMode: 'contain',
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
