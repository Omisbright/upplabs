import { ExtendedTheme, useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import shallow from 'zustand/shallow';
import ListHeaderComponent from '../../components/ListHeaderComponent';
import RenderItem from '../../components/RenderItem';
import { View } from '../../components/Themed';
import useStore from "../../state/store";
import { RootStackScreenProps } from '../../types';


export type ItemType = {
  "_links": {
    "self": {
        "href": string
    },
    "show": {
        "href": string
    }
  },
  "airdate": string,
  "airstamp": string,
  "airtime": string,
  "id": number,
  "image": {
    "medium": string,
    "original": string
  },
  "name": string,
  "number": number,
  "rating": {
    "average": number
  },
  "runtime": number,
  "season": number,
  "summary": string,
  "type": string,
  "url": string
};

type RenderItemType = {
  data: ItemType[],
  season: number
};

export default function SeriesDetails({navigation}: RootStackScreenProps<"SeriesDetails">) {

  const { colors } = useTheme();
  const styles = useMemo(() => getGlobalStyles({colors}), [colors])
  
  const [ seriesDetails, episodeList, saveCurrentEpisode ] = useStore((state) => [ state.seriesDetails, state.episodeList, state.saveCurrentEpisode ], shallow)
  const sections = episodeList?.reduce((accum: any, current: ItemType) => {
    let seasons = accum.find(((x: { season: number; }) => x.season === current.season))
    if(!seasons) {
      seasons = { season: current?.season, data: [] }
      accum.push(seasons);
    }
    seasons?.data?.push(current);
    return accum;
  }, []);

  const viewEpisodeInformation = (item: ItemType) => {
    saveCurrentEpisode(item)
    navigation.navigate("EpisodeDetails")
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (<ListHeaderComponent seriesDetails={seriesDetails} />)}
        data={sections}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: RenderItemType}) => <RenderItem item={item} viewEpisodeInformation={viewEpisodeInformation} />}
      />
    </View>
  );
};

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
  container: {
    backgroundColor: colors.background
  }
})
