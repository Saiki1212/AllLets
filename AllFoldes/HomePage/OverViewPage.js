import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Image, Dimensions, Alert, StatusBar} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import jwt_decode from 'jwt-decode'
import Header from '../Header'
import { RFValue } from 'react-native-responsive-fontsize';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoginLoader from '../Loader/LoginLoader';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const OverViewPage = ({}) => {
    const route = useRoute();
    const changeScreen = useNavigation()

    const [infoOpened, setInfoOpened] = useState(false)
    const [alert , setAlert] = useState(false)
    const [cName, setCName] = useState('')
    const [userId, setUserId] = useState('')
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(false)
    const [enroll, setEnroll] = useState(false)

  useEffect(() => {
    fetchUser()
    fetchUserdetails()
  },[])
  useFocusEffect(
    useCallback(() => {
      fetchUserdetails();
    },[userId])
  )
    const fetchUser = async() => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
      // console.log(userId)
    }
    const fetchUserdetails = async() => {
      try {
        const response = await axios.get(`https://letslearn-production.up.railway.app/profile/${userId}`)
        const {user} = response.data
        setUser(user)
        const enro  = user?.selectedCourses?.map(course => course.name).includes(route.params.course.name)
        if(enro) {
          setEnroll(true)
        }
      } catch (error) {
        console.log("error in Profile screen 35 : ", error)
      }
    }

    const handleOnpress = async () => {
      setAlert(false)
      try {
        const matched  = user?.selectedCourses?.map(course => course.name).includes(cName)
        if(matched) {
          Alert.alert(
            "Already added!",
            "The course has been already in your list.",
            [
              {
                text: "OK",
                onPress: () => changeScreen.navigate('Select')
              },
            ]
          );
          setCName('')
        }
        else {
          setLoading(true)
          console.log("item.name : ", cName)
          const details = {
              userId : userId,
              CourseSelected: cName
          }

          const response = await axios.post('https://letslearn-production.up.railway.app/AddCourseToList',details)
          setCName('')
          if(response.status == 200) {
            setLoading(false)
            Alert.alert(
              "Success!",
              "The course has been added to your list.",
              [
                {
                  text: "OK",
                  onPress: () => {setLoading(false); changeScreen.navigate('Select')}
                },
              ]
            );
          }
          else {
              // setLoading(false)
              console.log('Error in else part adding course : ',response.data)
          }
          }
      } catch (error) {
          // setLoading(false)
          console.log('Error in clickToAddCoursePAge.js', error)
      }
    }
    const handleCourse = () => {
      if(enroll) {
        Alert.alert('Course is already in you list please, check it.')
      }
      else {
        setAlert(!alert);
        setCName(route.params.course?.name);
      }
    }

  return (
    <View style={{flex:1, backgroundColor:'#fff', paddingTop:40}}>
      {loading && <LoginLoader/>}
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
      {/* <Header/> */}
      <ScrollView>
        <Text style={styles.Name}>{route.params.course.name}</Text>
        <View style={styles.imageViewStyle}>
          <Image source={route.params.course.courseImage} style={styles.MainImg}/>
        </View>
        
        {infoOpened ? (
          <Pressable onPress={() => setInfoOpened(!infoOpened)}>
            <LinearGradient colors={[ '#457551','#01330e', '#457551', '#457551']} style={styles.linearGradingOpen}>
              <Text style={styles.Info}>{route.params.course.courseInfo}</Text>
              <Text style={styles.completeInfo}>{route.params.course.courseCompleteInfo}</Text>
            </LinearGradient>
          </Pressable>
          
        ) : (
          <Pressable onPress={() => setInfoOpened(!infoOpened)}>
            <LinearGradient colors={[ '#2b2b2b', '#2b2b2b']} // [ '#014512','#01330e', '#001c08', '#001b07']
                start = {{x:0.9, y:0.1}}
                end= {{x:0.3, y:0.7}}
                style={styles.linearGradingOpen}>
              <Text style={styles.Info}>{route.params.course.courseInfo}</Text>
              <Text style={styles.completeInfo}>{route.params.course.courseCompleteInfo.slice(0,110)}<Text style={styles.more}>...more</Text></Text>
            </LinearGradient>
          </Pressable>
          
        )}
        
        {route.params.course.name === 'Data Structures and Algorithms' && (
          <View style={styles.mainDSATypeView}>
            <LinearGradient colors={[ '#1b0147', '#321563', '#523b7a']} 
              start = {{x:0.9, y:0.1}}
              end= {{x:0.3, y:0.7}}
              style={{borderRadius:12}}>
              <View style={styles.DSAType}>
                <Text style={styles.TypeName}>Linear Data Structure</Text>
                <View style={styles.typeViewView}>
                  <Text style={styles.TypeType}>Array</Text>
                  <Text style={styles.TypeType}>Linked List</Text>
                  <Text style={styles.TypeType}>Stack</Text>
                  <Text style={styles.TypeType}>Queue</Text>
                </View>
              </View>
              <View style={[styles.DSAType, {marginTop:-height*0.02}]}>
                <Text style={styles.TypeName}>Non-Linear Data Structure</Text>
                <View style={styles.typeViewView}>
                  <Text style={styles.TypeType}>Tree</Text>
                  <Text style={styles.TypeType}>Graph</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {enroll ? (
          <Pressable style={styles.EnrollPressable} onPress={handleCourse}>
            <Text style={styles.EnrollText}>Already Enrolled</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.EnrollPressable} onPress={handleCourse}>
            <Text style={styles.EnrollText}>Enroll for free</Text>
          </Pressable>
        )}
        
        {route.params.course?.courseFunctions?.length > 0 && route.params.course?.courseFunctions?.map((func,index) => (
          <Pressable key={index} onPress={handleCourse}>
            <View style={styles.linearGradingFunctions}>
              <Image source={func.courseImage} style={{height:width*0.2, width:width*0.2, borderRadius:width*0.1, resizeMode:'cover'}}/>
              <View style={{gap:height*0.005}}>
                <Text style={styles.funName} >{func.name}</Text>
                <Text numberOfLines={2} style={styles.content} >{func.courseInfo}</Text>
              </View>
              
            </View>
            
          </Pressable>
        ))}
        <View style={{marginBottom:height*0.01}}/>
      </ScrollView>
      <AwesomeAlert
        show={alert}
        title='Eplore new COURSES !!!'
        titleStyle={{color:'#000', fontSize:RFValue(14), fontWeight:'700'}}
        message='Click on the Add button to add the course into your list for free of cost'
        messageStyle={{color:'#000', fontWeight:'500'}}

        showCancelButton={true}
        cancelButtonStyle={{backgroundColor:'#f74a5c', width:width*0.25}}
        cancelButtonTextStyle={{fontWeight:'600', textAlign: 'center'}}
        onCancelPressed={() => {console.log('Pressed cancel'), setAlert(!alert)}}

        showConfirmButton={true}
        confirmText='Add Course'
        confirmButtonStyle={{backgroundColor:'#7d807d', width:width*0.3}}
        confirmButtonTextStyle={{fontWeight:'600', textAlign: 'center'}}
        onConfirmPressed={() => {handleOnpress()}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    MainImg: {
      height:height*0.3,
      width:'100%',
      marginHorizontal:0,
      resizeMode: 'cover',
      borderRadius:12,
    },
    imageViewStyle: {
      height:height*0.3,
      marginHorizontal:width*0.02,
      borderRadius:12,
      shadowColor:'black',
      elevation:7
    },
    Name: {
      // color:'#fff',
      fontSize: RFValue(18),
      fontWeight:'800',
      color:'#636363',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: height*0.01,
      marginBottom: height*0.02
    },
    Info: {
      fontSize: RFValue(15),
      fontWeight:'600',
      color:'#56cc75',
      flexWrap:'wrap'
    },
    completeInfo: {
      fontSize: RFValue(12),
      fontWeight:'500',
      color:'#fff',
      flexWrap:'wrap',
      
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
    mainDSATypeView: {
      marginHorizontal:width*0.02,
      marginTop: height*0.02,
      marginVertical:height*0.02,
      borderRadius:12,
      // backgroundColor:'#e6daaa',
      shadowColor:'black',
      elevation:10
    },
    DSAType: {
      paddingHorizontal: width*0.03,
      paddingTop: height*0.03,
    },
    TypeName : {
      color:'#989799',
      fontSize: RFValue(18),
      fontWeight:'700',
    },
    TypeType: {
      paddingBottom:height*0.009,
      color:'#fff',
      fontSize: RFValue(15),
      fontWeight:'700',
    },
    typeViewView: {
      paddingHorizontal: width*0.02,
      paddingVertical:height*0.02,
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
      backgroundColor:'#4f768c',
      shadowColor:'black',
      elevation:10
    },
    funName: {
      color:'#fff',
      fontSize: RFValue(16),
      fontWeight:'700',
    },
    content: {
      width: width*0.67,
      color:'#b5b5b5',
      fontSize: RFValue(13),
      fontWeight:'600',
    },
    EnrollPressable: {
      // flexDirection:'row',
      marginRight:'auto',
      marginLeft:'auto',
      backgroundColor:'#abc',
      // justifyContent:'space-evenly',
      marginTop:10,
      borderRadius:12,
      // borderWidth:0.2
    },
    EnrollText: {
      fontSize: RFValue(13),
      fontWeight:'600',
      paddingHorizontal:width*0.08,
      paddingVertical:height*0.01,
      // borderRadius:6
    },
  })

export default OverViewPage