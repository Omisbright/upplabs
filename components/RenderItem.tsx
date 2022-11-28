import { ExtendedTheme, useTheme } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ItemType } from '../screens/Shows/SeriesDetails'
import EpisodesComponent from './EpisodesComponent'
import SectionHeader from './SectionHeaderComponent'


type RenderItemProps = {
    item: {
        data: ItemType[],
        season: number
    },
    viewEpisodeInformation: (item: ItemType) => void
}

const RenderItem = ({item, viewEpisodeInformation}: RenderItemProps) => {

    const { colors } = useTheme();
    const styles = useMemo(() => getGlobalStyles({colors}), [colors])
    
    const Data = item?.data
    return (
        <View style={styles.container}>
            <SectionHeader season={item?.season} />
            <FlatList
                data={Data}
                renderItem={({item}) => <EpisodesComponent viewEpisodeInformation={viewEpisodeInformation}  item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default RenderItem

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
    container: {
        padding: 6
    }
})