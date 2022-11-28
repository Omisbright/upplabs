import { ExtendedTheme, useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import shallow from 'zustand/shallow';
import { Text, View } from '../../components/Themed';
import { hp, wp } from '../../constants/constData';
import useStore from "../../state/store";

export default function EpisodeDetails() {

  const [ currentEpisode ] = useStore((state) => [ state.currentEpisode ], shallow)
  const { colors } = useTheme();
  const styles = useMemo(() => getGlobalStyles({colors}), [colors])
  
  return (
      <View style={styles.showContainer}>
        {currentEpisode?.image?.medium ? <Image style={styles.image} source={{uri: currentEpisode?.image?.medium}} /> : null}
        <Text style={styles.movieTitle}>{currentEpisode?.name}</Text>
        <Text style={styles.seasonTitle}>Season {currentEpisode?.season}, Episode {currentEpisode?.number}</Text>
        <Text style={styles.summary}>{currentEpisode?.summary}</Text>
      </View>
  );
}

const getGlobalStyles = ({colors}: ExtendedTheme) => StyleSheet.create({
  image: {
    width: wp(80), 
    height: hp(20), 
    borderRadius: 10
  },
  movieTitle: {
    marginTop: 15, 
    fontWeight: "700", 
    textAlign: "center",
    fontSize: RFValue(18),
    color: colors.text
  },
  seasonTitle: {
    marginTop: 5, 
    fontWeight: "400", 
    textAlign: "center",
    fontSize: RFValue(12),
    color: colors.text
  },
  summary: {
    marginTop: 8, 
    textAlign: "justify",
    color: colors.text
  },
  showContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    marginHorizontal: 5,
    flex: 1,
    backgroundColor: colors.background
  },
});
