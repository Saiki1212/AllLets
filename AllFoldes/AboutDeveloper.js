import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackBtn from '../BackBtn'
import { RFValue } from 'react-native-responsive-fontsize'
import LottieView from 'lottie-react-native';
import { A } from '@expo/html-elements';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight+20 : 50;


const AboutDeveloper = () => {
  return (
    <View style={{paddingTop: statusBarHeight, backgroundColor:'#9fa2da', flex:1}}>
    <StatusBar backgroundColor="#9fa2da" barStyle="dark-content"/>
      <View style={styles.headertextConatiner}>
        <BackBtn/>
        <Text style={styles.headerText}>Welcome Buddy !</Text>
      </View>
      <View >
        <View style={styles.container}>
          <LottieView style={styles.lottieViewStyles} source={require('../assets/Animation/mypic.json')} autoPlay loop/>
          <Text style={styles.nameText}>Sai kiran varma pingili</Text>
          <Text style={styles.basicProfileFont}>Lovely Professional University</Text>
        </View>
      </View>
      <Text style={styles.info}>For more information or help please contact me</Text>
      <Text style={styles.info2}>teamcoderid@gmail.com</Text>
      {/* <View style={styles.contactContainer}>
        <Text style={styles.contactTextStyle}>Contact us....</Text>
        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
            <LottieView style={styles.lottieView2Styles} source={require('../assets/Animation/telegram.json')} autoPlay loop/>
          <A href='https://www.instagram.com/sai_ki_munna/' rel="external" target="_blank">
            <LottieView style={styles.lottieView3Styles} source={require('../assets/Animation/insta.json')} autoPlay loop/>
          </A>
          <LottieView style={styles.lottieView2Styles} source={require('../assets/Animation/gmail.json')} autoPlay loop/>
        </View>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  headertextConatiner: {
    flexDirection:'row',
    gap: 10,
    alignItems: 'center'
  },
  headerText: {
    fontSize: RFValue(16),
    fontWeight: '600'
  },
  container: {
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'#faf'
  },
  lottieViewStyles: {
    width: width/3,
    height: width/3
  },
  lottieView3Styles: {
    width: width/6,
    height: width/6
  },
  lottieView2Styles: {
    width: width/5,
    height: width/5
  },
  nameText: {
    fontSize: RFValue(15),
    fontWeight: '600',
    color: '#fff',
    fontStyle: 'italic',
  },
  basicProfileFont: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#665da5',
  },
  contactContainer: {
    // backgroundColor:'#faf',
    marginHorizontal: width*0.03,
    marginVertical: height*0.02
  },
  contactTextStyle: {
    fontSize: RFValue(13),
    fontWeight: '500',
    marginLeft: 5
  },
  info: {
    fontWeight:'500',
    fontSize:RFValue(11),
    marginTop:height*0.02,
    marginLeft:width*0.03,
    textAlign:'center',
  },
  info2: {
    fontWeight:'600',
    fontSize:RFValue(13),
    marginLeft:width*0.03,
    textAlign:'center',
  },
})

export default AboutDeveloper