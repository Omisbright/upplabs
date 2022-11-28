import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ExtendedTheme, useTheme } from '@react-navigation/native';
import { wp } from '../../constants/constData';
import Navigation from '../../navigation';
import { RootStackScreenProps } from '../../types';

const OptionsPage = ({navigation}: RootStackScreenProps<"OptionsPage">) => {

    const { colors } = useTheme();
    const styles = React.useMemo(() => getGlobalStyles({colors}), [colors])

    const onPressLockApp = () => {
        navigation.navigate("PinPage")
    }
    
  return (
    <View style={styles.container}>
        <Pressable onPress={onPressLockApp} style={styles.button}>
            <Text style={styles.text}>Lock app</Text>
        </Pressable>
        <Pressable disabled style={styles.favouritesButton}>
            <Text style={styles.text}>Favourites</Text>
            <Text style={styles.comingSoonText}>Coming soon</Text>
        </Pressable>
    </View>
  )
}

export default OptionsPage

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
    button: {
        borderRadius: 10,
        width: "100%",
        backgroundColor: "grey",
        height: wp(12),
        justifyContent: "center",
        paddingHorizontal: 12,
        marginVertical: 6
    },
    comingSoonText: {
        color: "rgba(0,0,0,0.3)"
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        padding: 16
    },
    favouritesButton: {
        backgroundColor: "light-grey",
        borderRadius: 10,
        width: "100%",
        height: wp(12),
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        marginVertical: 6,
        flexDirection: "row"
    },
    text: {
        color: colors.text
    }
})