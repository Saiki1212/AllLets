import { Dimensions, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import Lottie from 'lottie-react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import setItem from '../AsyncStorageFile'
import { RFValue } from 'react-native-responsive-fontsize'

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('screen')

const OnboardingScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const changeScreen = useNavigation();

  const pages = [
    {
      backgroundColor: '#a7f3d0',
      image: (
        <View style={styles.lottieViewStyles}>
            <Lottie source={require('../assets/Animation/CodingAnimation.json')} autoPlay loop/>
        </View>
      ),
      title: "Let's Code",
      subtitle: "Are you facing problems while understanding the concepts like DSA, Java, and more ? If so, you're on the right path.",
      statusBarColor: '#a7f3d0', // Specify the status bar color for this page
    },
    {
      backgroundColor: '#abcdef',
      image: (
        <View style={styles.lottieViewStyles}>
          <Lottie source={require('../assets/Animation/2ndPageAnimation.json')} autoPlay loop/>
        </View>
      ),
      title: "Let's Learn",
      titleStyles: {color: '#202b4b'},
      subtitle: "Let's Learn is a platform where concepts are cleared by visualizing the algorithms deeper.",
      subTitleStyles: {color:'#2e447a'},
      statusBarColor: '#abcdef',
    },
    {
      backgroundColor: '#a78bfa',
      image: (
        <View style={styles.lottieViewStyles}>
          <Lottie source={require('../assets/Animation/startAnimation.json')} autoPlay loop/>
        </View>
      ),
      title: "Let's Start",
      titleStyles: {color: '#251065'},
      subtitle: "Let's get into the app and explore the course in deeper detail with fully functionalized animations.",
      subTitleStyles: {color:'#3b1d95'},
      statusBarColor: '#a78bfa',
    },
  ];

  const handlePageChange = (index) => {
    setCurrentPage(index);
    // Update the status bar color based on the current page's configuration
    StatusBar.setBackgroundColor(pages[index].statusBarColor);
  };

  const  handleDone = () => {
    AsyncStorage.setItem('onboarded','1')
    const resetAction = CommonActions.reset({
      index: 0, 
      routes: [{ name: 'Register' }],
    });
    changeScreen.dispatch(resetAction);
  }

  const doneButton = ({...props}) => (
    <TouchableOpacity style={styles.doneBtn} {...props}>
      <Text>Done</Text>
    </TouchableOpacity>
  )

  const Shape = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    } else {
      backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    }
    return (
      <View
        style={{
          width: 7,
          height: 7,
          borderRadius:10,
          marginHorizontal: 8,
          backgroundColor,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        containerStyles={{paddingHorizontal:width*0.1}}
        pages={pages}
        DotComponent={Shape}
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        titleStyles={{
          fontSize:RFValue(17),
          fontWeight:'700',
          color:'#022c19'
        }}
        subTitleStyles={{
          fontSize:RFValue(12),
          fontWeight:'500',
          color:'#064e2d'
        }}
        DoneButtonComponent={doneButton}
        pageIndexCallback={handlePageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottieViewStyles: {
    height:width,
    width: width*0.8
  },
  doneBtn: {
    // backgroundColor:'red',
    marginHorizontal:20
  },
});

export default OnboardingScreen;
