import {ScreenWidth} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Directions} from 'react-native-gesture-handler';

function ConvertView(viewCount) {
  console.log(viewCount);

  if(!viewCount ) return '0 lượt xem';
  if (viewCount < 1000) {
    return viewCount.toString() + ' lượt xem';
  }
  if (viewCount < 1000000) {
    return Math.floor(viewCount / 1000).toString() + ' N lượt xem';
  }
  if (viewCount < 1000000000) {
    return Math.floor(viewCount / 1000000).toString() + ' Tr lượt xem';
  }
  return Math.floor(viewCount / 1000000000).toString() + ' T lượt xem';
}
function ConvertTime(Publictime) {
  const [Pdate, Ptime] = Publictime.split('T');
  const Current = new Date();
  const [pYear, pMonth, pDay] = Pdate.split('-').map(d => {
    return parseInt(d);
  });
  const [pHour, pMinute, pSecond] = Ptime.substring(0, 8)
    .split(':')
    .map(d => {
      return parseInt(d);
    });
  const pTime = new Date(pYear, pMonth - 1, pDay, pHour, pMinute, pSecond);
  const Subtime = ((Current.getTime() - pTime.getTime()) / 1000).toFixed();
  if (Subtime < 60) {
    return Subtime.toString() + ' giây trước';
  } else if (Subtime < 3600) {
    return (Subtime / 60).toFixed().toString() + ' phút trước';
  } else if (Subtime < 86400) {
    return (Subtime / 3600).toFixed().toString() + ' giờ trước';
  } else if (Subtime < 2592000) {
    return (Subtime / 86400).toFixed().toString() + ' ngày trước';
  } else if (Subtime < 31536000) {
    return (Subtime / 2592000).toFixed().toString() + ' tháng trước';
  } else return (Subtime / 31536000).toFixed().toString() + ' năm trước';
}

function parseDuration(duration) {
  var matches = duration.match(/[0-9]+[HMSD]/g);
  var d, h, m, s;
  matches.forEach(function (part) {
    var unit = part.charAt(part.length - 1);
    var amount = parseInt(part.slice(0, -1));

    switch (unit) {
      case 'D':
        d = amount;
      case 'H':
        h = amount;
      case 'M':
        m = amount;
      case 'S':
        s = amount;
      default:
      // noop
    }
  });
  h = d ? d * 24 + h : h;
  return (
    (h ? h.toString() + ':' : '') +
    (h
      ? m
        ? String('0' + m).slice(-2) + ':'
        : '00:'
      : m
      ? m.toString() + ':'
      : '0:') +
    (s ? String('0' + s + ' ').slice(-3) : '00 ')
  );
}

export default function VideoList(props) {
  const {data} = props;

  const styles = StyleSheet.create({
    high: {
      width: ScreenWidth,
      height: (ScreenWidth * 9) / 16,
      resizeMode: 'cover',
    },
    videoList: {
      backgroundColor: '#d8d8d8',
    },
    videoItem: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      flexDirection: 'column',
    },
    videoThumb: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
    },
    describe: {
      flex: 2,
      flexDirection: 'row',
      backgroundColor: '#fff',
      width: ScreenWidth,
      height: (ScreenWidth * 9) / 40,
      padding: 10,
    },
    channelImg: {
      height: 30,
      width: 30,
      borderRadius: 15,
      marginRight: 15,
      marginLeft: 5,
      marginTop: 5,
    },
  });
  return (
    <FlatList
      style={styles.videoList}
      data={data}
      renderItem={({item}) => (
        <View style={styles.videoItem}>
          <View style={styles.videoThumb}>
            <Image
              style={styles.high}
              source={{uri: item.snippet.thumbnails.high.url}}
            />
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: '#fff',
                backgroundColor: '#000',
                position: 'absolute',
                fontWeight: 'bold',
                fontFamily: 'ArialMT',
                fontSize: 13,
                right: 15,
                bottom: 10,
              }}>
              {' '}
              {parseDuration(item.contentDetails.duration)}
            </Text>
          </View>
          <View style={styles.describe}>
            <Image
              style={styles.channelImg}
              source={{
                uri: 'https://yt3.ggpht.com/9v791aXgd4UOgHOVAmwkoq77QplNF_NvZRS7O6hKmMtRT15W6iWXSXfDNihTkQOqIaeU-joNmg=s48-c-k-c0x00ffffff-no-rj',
              }}
            />
            <View style={{width: ScreenWidth * 0.8}}>
              <Text
                style={{fontWeight: '500'}}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.snippet.title}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{color: '#484848', fontSize: 12}}>
                  {' '}
                  {item.snippet.channelTitle} ·{' '}
                  {ConvertView(item.statistics.viewCount)} ·{' '}
                  {ConvertTime(item.snippet.publishedAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
}
