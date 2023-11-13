import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const NullListLoaderFriends = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <LottieView style={styles.lottieViewStyles} source={require('../../assets/Animation/GettingFriends.json')} autoPlay loop/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        // marginTop: height*0.1,
        zIndex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 200
        // backgroundColor: '#faf'
    },
    lottieViewStyles: {
        width: width/2,
        height: width/2
    }
})

export default NullListLoaderFriends;