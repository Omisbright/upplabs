import { ExtendedTheme, useTheme } from '@react-navigation/native';
import React, { useState } from "react";
import { FlatList, StyleSheet, TextInput } from 'react-native';
import shallow from 'zustand/shallow';
import MainListingComponent from '../../components/MainListingComponent';
import { View } from '../../components/Themed';
import { hp, wp } from '../../constants/constData';
import useFetchShows from '../../hooks/useFetchShows';
import useGetEpisodes from '../../hooks/useGetEpisodes';
import useGetSeriesInformation from '../../hooks/useGetSeriesInformation';
import useStore from "../../state/store";
import { RootStackScreenProps } from '../../types';

export default function MainListing({ navigation }: RootStackScreenProps<'MainListing'>) { 

  const { colors } = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors])

  const { data: allShows } = useFetchShows();

  const [ searchedItem, setSearchedItem] = useState<string>()
  const [ newList, setNewList] = useState(allShows);
  const [ currentId, setCurrentId] = useState<number>()

  const [saveSeriesDetails, saveEpisodeList ] = useStore((state) => [state.saveSeriesDetails, state.saveEpisodeList], shallow)

  const { data: seriesDetails, isLoading: seriesLoading } = useGetSeriesInformation(currentId)
  const { data: episodesList, isLoading: episodesLoading } = useGetEpisodes(currentId)

  const search = (item: string) => {
    setSearchedItem(item)
    let list: any = [];
    allShows?.forEach((datum: any) => {
      let source = `${datum?.name}`.toLowerCase()
      if(source.includes(item.toLowerCase())) {
        list.push(datum)
      }
    })
    setNewList(list)
  };

  const getSeriesInformation = (id: number) => {
    setCurrentId(id)

    if(!seriesLoading && !episodesLoading) {
      saveSeriesDetails(seriesDetails)
      saveEpisodeList(episodesList)
      navigation.navigate("SeriesDetails")
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "80%", marginVertical: 5}}>
        <TextInput
          style={styles.input}
          onChangeText={search}
          value={searchedItem}
          placeholderTextColor={colors.text}
          placeholder="Search ...."
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={newList ? newList : allShows}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MainListingComponent 
            getSeriesInformation={getSeriesInformation}
            item={item}
          />
        )}
      />
    </View>
  );
}

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 5
  },
  image: {
    width: wp(44), 
    height: hp(20), 
    borderRadius: 10
  },
  input: {
    borderWidth: 0.4,
    backgroundColor: colors.border,
    borderColor: colors.border,
    height: hp(6), 
    borderRadius: 6, 
    marginBottom: 0,
    padding: wp(3)
  },
  movieTitle: {
    marginTop: 5, 
    fontWeight: "700", 
    textAlign: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  showContainer: {
    marginVertical: 10,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    width: wp(46),
    height: hp(25),
    borderWidth: 0.2,
    marginHorizontal: 5,
    borderRadius: 10
  },
});
