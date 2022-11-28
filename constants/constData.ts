import {
    widthPercentageToDP,
    heightPercentageToDP,
  } from 'react-native-responsive-screen';

export const wp = (val: any) => widthPercentageToDP(val);

export const hp = (val: any) => heightPercentageToDP(val);

export const hitSlop = {top: 6, bottom: 6, left: 6, right: 6};