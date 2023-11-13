import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable, StatusBar} from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient'
import BackBtn from '../../BackBtn'
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import ArrayDesign from '../Designs/ArrayDesign'
import DSADesign from '../Designs/DSADesign'
import ArrayTraversingDesign from '../Designs/ArrayTraversingDesign'
import ArrayLinearSearchDesign from '../Designs/ArrayLinearSearchDesign'
import ArraySearchingDesign from '../Designs/ArraySearchingDesign'
import ArrayBinarySearchDesign from '../Designs/ArrayBinarSearchDesign'
import ArrayInsertionDesign from '../Designs/ArrayInsertionDesign'
import ArrayDeletionDesign from '../Designs/ArrayDeletionDesign'
import { Video } from 'expo-av'
import { A } from '@expo/html-elements';
import LinkedList from '../Designs/LinkedList'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 50;

const IntoTheCourse1 = ({}) => {
  const route = useRoute();
  const navigation = useNavigation()
  const [infoOpened, setInfoOpened] = useState(false)
  const video = useRef(null);

  const navigateToAnotherScreen = (func) => {
      navigation.push('Into1', { course: func });
  }

  return ( // 171717
    <View style={{flex:1, backgroundColor:'#fff', paddingTop:statusBarHeight}}>
      {/* <Header/> */}
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
      <ScrollView>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <BackBtn/>
        <Text style={styles.Name}>{route.params.course.name}</Text>
        <View style={{marginLeft: width*0.02}}/>
      </View>
       
        
        {/* <Image source={{uri : route.params.course.courseImage}} style={styles.MainImg}/> */}
        
        {infoOpened ? (
          <Pressable onPress={() => setInfoOpened(!infoOpened)}>
            <LinearGradient colors={[ '#457551','#01330e', '#457551', '#457551']} style={styles.linearGradingOpen}>
              <Text style={styles.Info}>{route.params.course.courseInfo}</Text>
              <Text style={styles.completeInfo}>{route.params.course.courseCompleteInfo}</Text>
            </LinearGradient>
          </Pressable>
          
        ) : (
          <Pressable onPress={() => setInfoOpened(!infoOpened)}>
            <LinearGradient colors={[ '#2b2b2b', '#2b2b2b']} style={styles.linearGradingOpen}>
              <Text style={styles.Info}>{route.params.course.courseInfo}</Text>
              <Text style={styles.completeInfo}>{route.params.course.courseCompleteInfo.slice(0,110)}<Text style={styles.more}>...more</Text></Text>
            </LinearGradient>
          </Pressable>
          
        )}
        
        {route.params.course.name === 'Data Structures and Algorithms' && (
          <DSADesign/>
        )}
        {route.params.course.name === 'Array' && (
          <ArrayDesign/>
        )}
        {route.params.course.name === 'Traversing' && (
          <ArrayTraversingDesign/>
        )}
        {route.params.course.name === 'Searching' && (
          <ArraySearchingDesign/>
        )}
        {route.params.course.name === 'Linear Search' && (
          <ArrayLinearSearchDesign/>
        )}
        {route.params.course.name === 'Binary Search' && (
          <ArrayBinarySearchDesign/>
        )}
        {route.params.course.name === 'Insertion' && (
          <ArrayInsertionDesign/>
        )}
        {route.params.course.name === 'Deletion' && (
          <ArrayDeletionDesign/>
        )}
        {route.params.course.name === 'Linked List' && (
          <LinkedList/>
        )}

        {route.params.course?.courseVideo != null && (
          <>
            <Text style={styles.sampleVideoText}>Sample Video</Text>
            <Video
              ref={video}
              source={route.params.course?.courseVideo}
              useNativeControls
              resizeMode= 'contain'
              // isLooping
              style={styles.videoStyling}
              // onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
          </>
        )}
        <>
          {route.params.course?.courseFunctions?.length > 0 && route.params.course?.courseFunctions?.map((func,index) => (
            <Pressable key={index} onPress={() => navigateToAnotherScreen(func)}>
              <LinearGradient colors={['#2293ee', '#1c548c']}
                style={styles.linearGradingFunctions}>
                <Image source={func.courseImage} style={{height:height*0.1, width:height*0.1, borderRadius:height*0.1, resizeMode:'cover'}}/>
                <View style={{gap:8}}>
                  <Text style={styles.funName} >{func.name}</Text>
                  <Text numberOfLines={2} style={styles.content} >{func.courseInfo}</Text>
                </View>
                
              </LinearGradient>
              
            </Pressable>
          ))}
          <View style={{height:20}}/>
        </>

          {/* {console.log('Video ::: ',route.params.course?.courseVideo)} */}

        {route.params.course?.code == null && (
          <View style={{marginBottom:height*0.01}}/>
        )}
        
        {route.params.course?.code != null && (
          <>
            <View style={styles.postTextView}>
              <Text style={{fontSize:RFValue(12), fontWeight:'600', marginBottom:height*0.01}}>{route.params.course.name} code in java : </Text>
              <SyntaxHighlighter language={'java'} value={route.params.course.code} style={docco} 
                  fontSize={RFValue(10)}
                  customStyle={{
                    backgroundColor:'#d4d4d4',
                    paddingHorizontal:width*0.03,
                    paddingVertical:height*0.02,
                    marginBottom:height*0.01,
                    borderRadius:8,
                  }}>
                {route.params.course.code}
              </SyntaxHighlighter>
            </View>
          </>
        )}
        {route.params.course?.courseLink && (
          <>
            <View style={styles.codeLinkStyles}>
              <Text style={styles.codeHeader}>Sample practice codes</Text>
              {route.params.course?.courseLink?.map((item, index) => (
                  <A style={styles.linkStyle} href={item} key={index} rel="external" target="_blank">{item}</A>
              ))}
            </View>
            <View style={{height:30}}/>
          </>
        )}
        

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  MainImg: {
    height:height*0.3,
    marginHorizontal:width*0.02,
    resizeMode:'cover',
    borderRadius:12
  },
  Name: {
    // color:'#fff',
    fontSize: RFValue(18),
    fontWeight:'800',
    color:'#636363',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: height*0.01,
    marginBottom: height*0.01
  },
  Info: {
    fontSize: RFValue(15),
    fontWeight:'600',
    color:'#56cc75',
    flexWrap:'wrap',
    // textAlign:'justify',
  },
  completeInfo: {
    fontSize: RFValue(12),
    fontWeight:'500',
    color:'#fff',
    flexWrap:'wrap',
    textAlign:'justify',
  },
  linearGradingOpen: {
    marginTop: height*0.02,
    marginHorizontal: width*0.02,
    paddingHorizontal: width*0.03,
    paddingVertical: height*0.03,
    borderRadius:12,
    gap:10
  },
  more: {
    color:'#bab6b6',
    fontSize: RFValue(12),
    fontWeight:'500',
  },
  linearGradingFunctions: {
    marginHorizontal:width*0.02,
    // marginBottom: height*0.05,
    paddingVertical:height*0.008,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    borderRadius:12,
    gap:5,
    marginTop: height*0.02,
    backgroundColor:'#4f768c'
  },
  funName: {
    color:'#1c548c',
    fontSize: RFValue(16),
    fontWeight:'700',
  },
  content: {
    width: width*0.67,
    color:'#beebff',
    fontSize: RFValue(13),
    fontWeight:'600',
  },
  postTextView: {
    marginHorizontal:width*0.02,
    paddingHorizontal:width*0.03,
    paddingVertical:height*0.01,
    marginVertical:height*0.02,
    backgroundColor:'#9c9c9c',
    borderRadius:8
  },
  videoStyling: {
    height: height*0.3,
    // width: '90%',
    alignSelf: 'stretch',
    marginHorizontal:width*0.03,
    borderRadius:8,
    marginTop:height*0.02,
    borderWidth:0.2
  },
  codeLinkStyles: {
    marginVertical:height*0.01,
    marginHorizontal:width*0.02,
    backgroundColor:'#e6e3e3',
    borderRadius:8,
    paddingHorizontal:width*0.02,
    paddingVertical:height*0.01,
    borderWidth:0.2,
  },
  codeHeader: {
    fontSize: RFValue(15),
    fontWeight:'600',
    paddingVertical:height*0.01
  },
  linkStyle: {
    color:'#2f70fa',
    fontSize:RFValue(10),
    fontWeight:'500',
    paddingTop:height*0.007,
    paddingHorizontal:width*0.01,
    textAlign:'left'
  },
  sampleVideoText: {
    marginLeft:'auto',
    marginRight:'auto', 
    marginTop:height*0.015, 
    marginBottom:-10, 
    fontSize:RFValue(13), 
    fontWeight:'500'
  },
})

export default IntoTheCourse1