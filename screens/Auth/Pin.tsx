import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { PinCode, PinCodeT, hasSetPIN, clearPIN } from '@martintorresch/react-native-pincode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackScreenProps } from '../../types';
import { useFocusEffect } from '@react-navigation/native';

const PinPage = ({navigation}: RootStackScreenProps<"PinPage">) => {


  const [mode, setMode] = useState<PinCodeT.Modes>(PinCodeT.Modes.Set);
  const [visible, setVisible] = useState(true);

  const handleSuccess = () => {
    navigation.navigate("MainListing")
  };

  useFocusEffect(useCallback(() => {
    checkStatus()
  }, [navigation],
  ))

  const checkStatus = async() => {
    const value = await AsyncStorage.getItem('pin')
    if(value !== null) {
      setMode(PinCodeT.Modes.Enter)
    } 
  }

  const handlePinSet = async (value: string) => {
    try {
      await AsyncStorage.setItem('pin', value)
      navigation.navigate("MainListing")
    } catch (e) {
      // saving error
    }
  };

  const onLogin = async (pin: string) => {
    try {
      const value = await AsyncStorage.getItem('pin')
      if(value !== pin) {
          Alert.alert(
            "Error",
            "Wrong Password",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  const handleReset = () => {
    setMode(PinCodeT.Modes.Set)
  }
  return (
    <View style={{flex: 1, backgroundColor: "red"}}>
      <PinCode 
          mode={mode} 
          visible={visible}
          onEnterSuccess={(pin: any) => {onLogin(pin)}} 
          onSetSuccess={(pin: any) => handlePinSet(pin)} 
          onResetSuccess={handleReset}  
          options={{
            pinLength: 4,
            maxAttempt: 1000,
            lockDuration:0
          }}  
          textOptions={customTexts}
          styles={customStyles}  
      />
    </View>
  )
}

export default PinPage;

const customTexts = {
  enter: {
      title: 'Enter PIN',
      error: 'You have entered an incorrect pin',
      backSpace: 'Del',
      footerText: 'Forgot PIN?'
  },
  set: {
      title: 'Set PIN',
      repeat: 'Enter PIN again',
      error: 'You have entered an incorrect pin',
  },
  locked: {
      title: 'Custom locked title',
      subTitle: `You have entered wrong PIN {{maxAttempt}} times. The app is locked in {{lockDuration}}.`,
      lockedText: 'Locked',
  },
  reset: {
      title: 'Reset PIN title',
      confirm: 'Custom confirm message'
  }
};

const customStyles = { 
  main: { 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    zIndex: 99, 
    backgroundColor: "#000" 
  },
}