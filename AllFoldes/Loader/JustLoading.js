import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const JustLoading = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <LottieView style={styles.lottieViewStyles} source={require('../../assets/Animation/mainLoading.json')} autoPlay loop/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // marginTop:80,
        flex:1,
        zIndex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    lottieViewStyles: {
        width: width/5,
        height: width/5
    }
})

export default JustLoading;