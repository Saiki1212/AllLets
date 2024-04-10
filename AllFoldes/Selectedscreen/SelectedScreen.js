import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView, Pressable, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import sample from '../../SampleCourses'
import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from 'react-native-responsive-fontsize'
import Header from '../Header'
import CourseLoading from '../Loader/CourseLoading'
import RemoveCourse from '../Loader/RemoveCourse'
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const statusBarHeight = Platform.OS === 'ios' ? 50 : 40;

const SelectedScreen = () => {
  const [myCourses, setMyCourses] = useState([])
  const [userId, setUserId] = useState('')
  const [load, setLoad] = useState(true)
  const [delc, setDelc] = useState(false)
  const [popup, setPopup] = useState(false)
  const ChangeScreen = useNavigation()
  
  useEffect(() => {
    const fetchUser = async() => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
      // console.log('userid :: ',userId )
    }
    fetchUser()
  },[])

  useEffect(() => {
    if (userId) {
      getCourse();
    }
  },[userId])

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        getCourse();
      }
    },[userId])
  )
  useFocusEffect(
    useCallback(() => {
      setPopup(false)
    },[])
  )

  const getCourse = async () => {
    try {
      const response = await axios.get(`https://letslearn-production.up.railway.app/AddedCourse/${userId}`)
      if (response.status === 200 ) {
        setMyCourses(response.data.courses.reverse());
      } else {
        console.error('Error fetching courses. Status:', response.status);
      }
      setLoad(false);
      // console.log(myCourses)
    } catch (error) {
      console.log("Your selected courses are empty");
    }
  }
  const handleRemove = async(name) => {
    setDelc(true)
    try {
      // console.log('Removing course:', name, 'for user:', userId);
      await axios.post('https://letslearn-production.up.railway.app/RemoveCourse', {name, userId})
        .then((response) => {
          // console.log('Response from RemoveCourse API:    ', response.data);
          getCourse();
          // fetchUser();
          console.log('Course removed successfully.');
          setDelc(false)
        })
    } catch (error) {
      setDelc(false)
      console.log('Error line 70 : ', error)
    }
  }

  const Remove = (name) => {
    Alert.alert('Remove course', 'Are you sure want to remove course', 
      [
        {
          text: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {handleRemove(name)}
        }
      ]
    )
  }

  const handleRemoveAll = async() => {
    
    console.log("remove all")
    setDelc(true)
    try {
      // console.log('Removing course:', name, 'for user:', userId);
      await axios.post('https://letslearn-production.up.railway.app/RemoveAllCourse', {userId})
        .then((response) => {
          getCourse();
          // console.log('All Course removed successfully.');
          setDelc(false)
        })
    } catch (error) {
      setDelc(false)
      console.log('Error line 115 : ', error)
    }
    setPopup(false);
  }
  

  if(load) {
    return(
      <CourseLoading/>
    )
  }

  return ( //colors={[ '#8fb996', '#709775',]}
    <View key={myCourses?.length} style={{flex:1}}>
      { myCourses?.length ? (
        <>
          <StatusBar style="dark" backgroundColor="#f0f0f0"/>
          {/* <Header/> */}
          <View style={styles.headerView}>
            <Text style={styles.programming}>Selected Courses</Text>
            {popup ? (
              <View>
                <TouchableOpacity onPress={() =>{setPopup(false)}}>
                  <MaterialCommunityIcons name="menu-up-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.popupmain} onPress={() => handleRemoveAll()}>
                  <MaterialIcons name="highlight-remove" size={24} color="#ea546c" />
                  <Text style={styles.removePopText}  >Remove all courses</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => {setPopup(true)}}>
                <MaterialCommunityIcons name="menu-down-outline" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {popup && (
            <View style={{ height:height*0.03 }}/>
          )}
          
          <ScrollView onTouchStart={() => setPopup(false)} style={{paddingBottom:100}}>
            { myCourses?.length > 0 && myCourses?.map((course,index) => {
              const matched = sample.find(sampleCourse => sampleCourse.name === course.name)
              return (
                <Pressable key={index} style={styles.courseOuterView} onPress={() => {setPopup(false)}}>
                  <Pressable key={index} onPress={() => {ChangeScreen.navigate('Into1', {course : matched}); setPopup(false)}} >
                    <LinearGradient
                      style={styles.courseStyle} 
                      colors={[ '#8fb996', '#709775',]}
                      start = {{x:0.7, y:0.1}}
                      end= {{x:0.8, y:0.7}}>
                    <Image style={styles.iconStyle} source={matched?.courseImage}/>
                    <View style={{gap:width*0.03}}>
                      <Text numberOfLines={1} style={styles.courseTitle}>{course?.name}</Text>
                      <Text numberOfLines={2} style={styles.courseContent}>{matched?.courseInfo}</Text>
                    </View>
                    </LinearGradient>
                  </Pressable>
                  <Pressable style={styles.removePressable} onPress={ () => {Remove(course.name)} }>
                    <Text style={{fontSize:RFValue(11)}}>Remove course</Text>
                  </Pressable>
                </Pressable>
              )
            })}
          </ScrollView>
          {delc && <RemoveCourse/>}
        </>
      ) : (
        <View>
          <Text style={styles.nullText}>Add a course to your list to access</Text>
          <Pressable style={styles.SelectBtnText} onPress={() => ChangeScreen.navigate('Home')}>
            <Text style={{fontSize:RFValue(12), fontWeight:'700', color: '#e15615'}}>select course</Text>
          </Pressable>
          <View style={[ styles.container]} >
            <LottieView style={styles.lottieViewStyles} source={require('../../assets/Animation/AddCourse.json')} autoPlay loop />
          </View>
        </View>
      )}
    </View>
  )
  
}

const styles = StyleSheet.create({
  programming: {
    // color:'#fff', 
    fontSize: RFValue(18),
    fontWeight:'800',
    color:'#636363',
    marginLeft: width*0.03,
    marginTop: height*0.01,
    marginBottom: height*0.01
  },
  courseTitle: {
    color:'#000',
    fontSize:RFValue(14),
    fontWeight:'700',
  },
  courseContent: {
    color:'#454545',
    fontSize:RFValue(12),
    fontWeight:'700',
    width: width*0.7
  },
  courseStyle: {
    paddingHorizontal:width*0.03,
    paddingVertical:height*0.02,
    flexDirection:'row',
    gap:width*0.03,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignItems:'center',
  },
  iconStyle: {
    height:width*0.13,
    width:width*0.13,
    borderRadius:width*0.13/2
  },
  courseOuterView: {
    marginHorizontal:width*0.03,
    marginVertical:height*0.01,
    borderRadius:8,
    backgroundColor:'#dadada',
    borderWidth:0.4,
    borderColor:'#8ebaac',
    shadowColor:'#000',
    shadowOffset: {
        height:5,
        width:5
    },
    shadowOpacity:0.4,
    shadowRadius: 4,
    elevation:10
  },
  removePressable: {
    marginLeft:'auto',
    marginHorizontal: width*0.01,
    marginVertical: height*0.005,
    backgroundColor:'#f4f4f4',
    paddingHorizontal:width*0.05,
    paddingVertical:height*0.005,
    borderRadius:5
  },
  nullText: {
    fontSize: RFValue(12),
    fontWeight:'600',
    backgroundColor:'#f2f7f5',
    textAlign:'center',
    marginTop:height*0.1,
    paddingVertical: height*0.01,
    marginHorizontal:width*0.1,
    borderRadius:6,
    borderWidth:0.5,
     borderColor: '#8ebaac'
  },
  SelectBtnText: {
     backgroundColor:'#fef7ee',
     marginRight:'auto',
     marginLeft:'auto',
     paddingHorizontal:width*0.05,
     paddingVertical:height*0.01,
     marginTop:height*0.02,
     borderRadius:8,
     borderWidth:0.5,
     borderColor: '#f09447'
  },
  container: {
    // flex:1,
    // zIndex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:'auto',
    marginBottom:'auto',
    height:height*0.5,
    // backgroundColor: 'rgba(25,25,25)',
    // backgroundColor:'#faf'
    
  },
  lottieViewStyles: {
    width: width/2,
    height: width/2,
    zIndex:1
  },
  headerView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems:'center',
    paddingRight:width*0.03,
    marginTop: statusBarHeight
  },
  popupmain: {
    flexDirection:'row',
    position: 'absolute',
    right: width*0.01,
    top: height*0.02 ,
    width: width*0.4,
    borderWidth:0.4,
    borderRadius: 4,
    backgroundColor:'#fafafa',
    borderColor:'#ea546c',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical:height*0.006,
    marginTop:5
  },
  removePopText: {
    fontSize: RFValue(10),
    fontWeight: '500',
    color: '#ea546c'
  },
})

export default SelectedScreen