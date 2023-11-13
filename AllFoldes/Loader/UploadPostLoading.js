import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const PostUpload = () => {
  return (
    <View style={[StyleSheet.absoluteFill ,styles.container]}>
      <LottieView style={styles.lottieViewStyles} source={require('../../assets/Animation/logSignLoader.json')} autoPlay loop/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        zIndex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(25,25,25,0.3)'
    },
    lottieViewStyles: {
        width: width/3,
        height: width/3
    }
})

export default PostUpload