import { Pressable, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../constants/constData'
import { ExtendedTheme, useTheme } from '@react-navigation/native';

type MainListingComponent = {
 item: {
    id: number,
    name: string,
    image: {
        medium: string
        original: string
    }
 },
 getSeriesInformation: (id: number) => void
};
const MainListingComponent = ({item, getSeriesInformation}: MainListingComponent) => {

  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors])

  return (
    <Pressable onPress={() => getSeriesInformation(item?.id)} style={styles.showContainer}>
        {item?.image?.medium ? <Image style={styles.image} source={{uri: item?.image?.medium}}  /> : null}
        <Text style={styles.movieTitle}>{item?.name}</Text>
    </Pressable>
  )
}

export default MainListingComponent

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
    image: {
      width: wp(45), 
      height: hp(30), 
      borderRadius: 10
    },
    movieTitle: {
      marginTop: 5, 
      fontWeight: "700", 
      textAlign: "center",
      color: colors.text
    },
    showContainer: {
      marginVertical: hp(3),
      padding: 5,
      alignItems: "center",
      width: wp(45), 
      height: hp(30), 
      marginHorizontal: 5,
    },
  });