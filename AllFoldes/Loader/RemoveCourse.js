import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const RemoveCourse = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <LottieView style={styles.lottieViewStyles} source={require('../../assets/Animation/logSignLoader.json')} autoPlay loop/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        zIndex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:-300,
        backgroundColor: 'rgba(205,205,205,0.1)'
    },
    lottieViewStyles: {
        width: width/3,
        height: width/3
    }
})

export default RemoveCourse