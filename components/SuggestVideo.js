import React, {useEffect, useState, useCallback,useMemo, memo} from 'react';
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
import VideoList from './VideoList';

function SuggestVideo(props) {
  const {id} = props;
  const [suggest, setSuggest] = useState();
  const [loading, setLoading] = useState(true);
  
  
  
  const getSuggestId = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=' +
          id +
          '&type=video&maxResults=20&key='+ APIKEY,
      );
      const json = await response.json();

      return json.items || [];
    } catch (error) {
      console.error(error);
      console.log('error');
    } finally {
    }
  };
  const getSuggest = async () => {
    const data = await getSuggestId();
    let idList = '';
    for (let item of data) {
      idList += item.id.videoId + '%2C';
    }
    idList = idList.slice(0, -3);
    try {
      const response = await fetch(
        'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' +
          idList +
          '&key=' + APIKEY,
      );
      const json = await response.json();
      setSuggest(json.items || []);
    } catch (error) {
      console.error(error);
      console.log('error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSuggest();
  }, [props]);
  if (!loading) 
  return (
    <VideoList data={suggest} header={(true)}></VideoList>    
  )
}
export default memo(SuggestVideo)