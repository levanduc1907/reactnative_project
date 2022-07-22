import React, { useEffect, useState }  from 'react';
import { FlatList, StyleSheet, Text, View,Image,ScrollView } from 'react-native';



function HomeScreen() {
  const [data, setData] = useState([]);
  const getVideoList = async () => {
    try {
      const response = await fetch(
        'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyCDYkYx_FqApFnNhcmwFDjasu5KRnVVGd0'
      );
      const json = await response.json();
      setData( json.items);
    } catch (error) {
      console.error(error);
      console.log("error")
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getVideoList();
  }, []);

const styles = StyleSheet.create({
  high: {
    height:360,
    width:480
  },
  
});
    return (
      
      <ScrollView >      
      <FlatList
        data = {data}
        renderItem={
          ({item}) => (
            
            <View 
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image 
                style = {styles.high}
                source = {{uri: item.snippet.thumbnails.high.url}}
                ></Image>
                
            </View>
          )
        }
      />
    </ScrollView>
    );
  }
  export default HomeScreen;