import React, {useEffect, useState, useCallback,useMemo} from 'react';
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
import VideoList from './VideoList';
import {BottomSheetModal,
  BottomSheetModalProvider} from '@gorhom/bottom-sheet';
export default function SuggestVideo(props) {
  const {id} = props;
  const [suggest, setSuggest] = useState();
  const [loading, setLoading] = useState(true);
  const bottomSheetModalRef = React.useRef();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
  // variables
  const snapPoints = useMemo(() => ['25%', '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  const getSuggestId = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=' +
          id +
          '&type=video&maxResults=20&key=AIzaSyDDeetQzqlsCvvTyBrdLrkqqZMPuKgs2nI',
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
          '&key=AIzaSyDDeetQzqlsCvvTyBrdLrkqqZMPuKgs2nI',
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
  <BottomSheetModalProvider>
    <VideoList data={suggest} header={(true)}></VideoList>
    <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <ScrollView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Aome 🎉</Text>

          </ScrollView>
        </BottomSheetModal> 
      </BottomSheetModalProvider>
  )
}
