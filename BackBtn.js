import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window')

const BackBtn = () => {
    const changeScreen = useNavigation()
  return (
    <Ionicons name="ios-chevron-back-outline" 
        size={RFValue(18)} 
        color="black" 
        onPress={() => changeScreen.goBack()}
        style={{marginLeft: width*0.02}} />
  )
}

export default BackBtn

const styles = StyleSheet.create({})