import { ExtendedTheme, useTheme } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const SectionHeader = ({season}: {season: number}) => {

  const { colors } = useTheme();
  const styles = useMemo(() => getGlobalStyles({colors}), [colors])

  return (
    <View style={{marginVertical: 1}}>
      <Text style={styles.text}>Season {season}</Text>
    </View>
  )
}

export default SectionHeader

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
  text: {
    fontWeight: "700", 
    fontSize: RFValue(13),
    color: colors.text
  }
})