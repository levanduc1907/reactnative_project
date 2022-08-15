import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  createContext,
  useContext,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import YoutubePlayer from 'react-native-youtube-iframe';
import SuggestVideo from '../components/SuggestVideo';
import CommentList from '../components/CommentList';
export const DataContext = createContext();
export const SheetContext = createContext();
const status = {
  detailComment:"" 
}
export default function VideoPlayer({navigation, route}) {
  const item = route.params;
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
    },
  });
  // variables
  const snapPoints = useMemo(() => ['100%', '69%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  });
  const [sheet, setSheet] = useState();
  const [sheetSeason, setSetSeason] = useState();

  const value = {
    item,
    handlePresentModalPress,
    
  };

  return (
    <SheetContext.Provider value={[sheet, setSheet]}>
      <DataContext.Provider value={value}>
        <BottomSheetModalProvider>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <YoutubePlayer height={230} play={true} videoId={item.id} />

            <SuggestVideo id={item.id} />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <View
                style={{
                  flexDirection:"row",
                  borderBottomColor: '#d8d8d8',
                  borderBottomWidth: 0.5,
                  padding:10
                }}>
                <Text
                  style={{
                    fontSize:16,
                    fontWeight:"bold"
                  }} 
                >
                    {sheet?.title}
                </Text>  
                <View style={{
                  flex:1
                }}/>

                <TouchableOpacity
                  onPress={handleCloseModalPress}
                >
                  <Text>x</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contentContainer}>

                <CommentList data={sheet?.data}></CommentList>
              </View>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </DataContext.Provider>
    </SheetContext.Provider>
  );
}
