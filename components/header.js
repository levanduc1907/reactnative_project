import React, { useEffect, useState }  from 'react';
import { FlatList, StyleSheet, Text, View,Image,ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchScreen from '../Screen/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

 
export default function Header () {
    const navigation = useNavigation()
    return (
        <View style={{paddingTop:5,height:45, backgroundColor:"#fff",flexDirection:"row",justifyContent:"flex-start"}}>
            <Image source={require('../assets/img/yt_logo_rgb_light.png')} style={{
                height:30,
                width:90,
                resizeMode:"contain",
                left:10

            }} ></Image>
            <Text style={{flex :1 }}></Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Image source={require('../assets/img/search.webp')} style={{
                    height:26,
                    width:26,
                    resizeMode:"contain",
                    marginRight: 15
                    
                }}  />
            </TouchableOpacity>
           
            <Image source={{uri:"https://yt3.ggpht.com/9v791aXgd4UOgHOVAmwkoq77QplNF_NvZRS7O6hKmMtRT15W6iWXSXfDNihTkQOqIaeU-joNmg=s48-c-k-c0x00ffffff-no-rj"}}
                style={{
                    height:26,
                    width:26,
                    resizeMode:"contain",
                    borderRadius:13,
                    marginRight:15,
                }}></Image>
                
        </View>        
    )
}

