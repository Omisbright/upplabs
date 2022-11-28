import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { wp, hp } from '../constants/constData';
import { ExtendedTheme, useTheme } from '@react-navigation/native';
import { useMemo } from 'react';

type SeriesDetailsTypes = {
  image: {
      medium: string
      original: string
  },
  name: string,
  summary: string,
  schedule: {
      days: string,
      time: string
  },
  genres: string[]
};

const ListHeaderComponent = ({seriesDetails}: {seriesDetails: SeriesDetailsTypes}) => {

  const { colors } = useTheme();
  const styles = useMemo(() => getGlobalStyles({colors}), [colors])

  return (
      <View style={styles.showContainer}>
        <Image style={styles.image} source={{uri: seriesDetails?.image?.medium}}  />
        <Text style={styles.movieTitle}>{seriesDetails?.name}</Text>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Text style={styles.days}>{seriesDetails?.schedule?.days}s, {seriesDetails?.schedule?.time}</Text>
        </View>
        <View style={{flexDirection: "row"}}>
          {seriesDetails?.genres?.map((genre: string, index: number) => 
            <Text key={index} style={styles.genre}>{genre}</Text>
          )}
        </View>
        <Text style={styles.summary}>{seriesDetails?.summary}</Text>
      </View>
  )
}

export default ListHeaderComponent

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
  days: {
    marginVertical: 8, 
    fontWeight: "500", 
    textAlign: "center",
    fontSize: RFValue(14),
    color: colors.text
  },
  genre: {
    marginHorizontal: 5, 
    textAlign: "center",
    fontWeight: "700", 
    color: colors.text
  },
  image: {
    width: wp(80), 
    height: hp(50), 
    borderRadius: 10
  },
  movieTitle: {
    marginTop: 5, 
    fontWeight: "700", 
    textAlign: "center",
    fontSize: RFValue(16),
    color: colors.text
  },
  summary: {
    marginTop: 8, 
    textAlign: "justify",
    color: colors.text
  },
  showContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
});