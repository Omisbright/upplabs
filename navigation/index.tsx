/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';

import EpisodeDetails from '../screens/Shows/EpisodeDetails';
import MainListing from '../screens/Shows/MainListing';
import SeriesDetails from '../screens/Shows/SeriesDetails';
import PinPage from '../screens/Auth/Pin';
import OptionsPage from '../screens/Options/OptionsPage';
import LinkingConfiguration from './LinkingConfiguration';
import { Entypo } from '@expo/vector-icons';

import { RootStackParamList } from '../types';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

 const { navigate } = useNavigation()

  const renderMenu = () => {

    const handleOpenOptions = ()  => {
      navigate("OptionsPage")
    } 

    return (
      <Pressable onPress={handleOpenOptions}>
        <Entypo name="menu" size={24} color="black" />
      </Pressable>
    )
  }

  return (
    <Stack.Navigator>
          <Stack.Screen name="PinPage" component={PinPage} options={{ title: 'PIN' }} />
          <Stack.Screen name="MainListing" component={MainListing} options={{ headerLeft: renderMenu, title: 'Main Listing' }} />
          <Stack.Screen name="SeriesDetails" component={SeriesDetails} options={{ title: 'Series Details' }} />
          <Stack.Screen name="EpisodeDetails" component={EpisodeDetails} options={{ title: 'Episode Details' }} />
          <Stack.Screen name="OptionsPage" component={OptionsPage} options={{ title: 'Menu' }} />
    </Stack.Navigator>
  );
}

