import React, { useEffect,useMemo, useState, useCallback,createContext } from 'react';
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
import {BottomSheetModal,
  BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { ConvertTime, ConvertCount } from '../components/convert_data';
import { Directions } from 'react-native-gesture-handler';
import YoutubePlayer from 'react-native-youtube-iframe';

import VideoList from '../components/VideoList';
import SuggestVideo from '../components/SuggestVideo';

export const DataContext = createContext();
export default function VideoPlayer({ navigation, route }) {

  const item = route.params;
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);

  const bottomSheetModalRef = React.useRef();
  const styles = StyleSheet.create({
    icon: {
      height: 20,
      width: 20,
      marginBottom: 10,
      resizeMode: 'contain',
    },
    profileicon: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
      borderRadius: 10,
      marginRight: 10,
    },
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
    }
  });
  // variables
  const snapPoints = useMemo(() => ['100%', '69%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleCloseModalPress = useCallback(()=>{
    bottomSheetModalRef.current.close();
  })

const value={
  item,
  handlePresentModalPress
}

  return (
    <DataContext.Provider value={value}>
      <BottomSheetModalProvider>
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <YoutubePlayer height={230} play={true} videoId={item.id} />

      
      <SuggestVideo id={item.id} />
      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}

        >
          <View>
            <TouchableOpacity onPress={handleCloseModalPress}><Text> binh luan</Text></TouchableOpacity>
            
          </View>
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
    </View>
    </BottomSheetModalProvider>
    </DataContext.Provider>
  );
}
