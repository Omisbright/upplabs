import { ExtendedTheme, useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { hp, wp } from '../constants/constData';
import { ItemType } from "../screens/Shows/SeriesDetails";

type ViewEpisodeInformationType = {
  viewEpisodeInformation: (item: ItemType) => void
 };

const EpisodesComponent = ({item, viewEpisodeInformation}: {item: ItemType, viewEpisodeInformation: ViewEpisodeInformationType["viewEpisodeInformation"]}) => {

  const { colors } = useTheme();
  const styles = useMemo(() => getGlobalStyles({colors}), [colors])
  
  return (
    <View>
      <Pressable onPress={() => viewEpisodeInformation(item)}  style={styles.showContainer}>
        <Image style={styles.image} source={{uri: item?.image?.medium}}  />
        <Text style={styles.movieTitle}>{item?.name}</Text>
      </Pressable>
    </View>
  )
}

export default EpisodesComponent

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
  image: {
    width: wp(28), 
    height: hp(10), 
    borderRadius: 6
  },
  movieTitle: {
    marginTop: 4, 
    fontSize: RFValue(12),
    fontWeight: "500", 
    textAlign: "center",
    color: colors.text
  },
  showContainer: {
    marginVertical: hp(0.8),
    alignItems: "center",
    width: wp(28), 
    height: hp(14), 
    marginHorizontal: 5,
  },
});