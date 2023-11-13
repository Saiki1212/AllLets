import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Pressable} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Header from '../Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import sample from '../../SampleCourses';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const HomeScreen = () => {
  const [AllCourse, setAllCourse] = useState('');
  const changingScreen = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchCourses();
    },[])
  )
  const fetchCourses = async () => {
      try {
          const response = await axios.get('https://phoenix-optimum-hawk.ngrok-free.app/GetCourseCount');
          const { AllCourse } = response.data;
          if (AllCourse && AllCourse.length > 0) {
            setAllCourse(AllCourse);
          } else {
              console.log('No AllCourse Array found.');
          }
      } catch (error) {
          console.log('Error in fetchCourses :', error);
      }
  };
  
  return (
    <View style={{flex:1}}>
      <StatusBar style="dark" backgroundColor="#f0f0f0"/>
      <Header/>
      <ScrollView showsHorizontalScrollIndicator={false} >
          <View style={styles.container}>
            <Text style={styles.programming}>PROGRAMMING</Text>
            {sample?.map((course, index) => {
              let count = 0;
              if(AllCourse) {
                count = AllCourse?.filter((c) => c.name === course?.name).map((course) => course.count);
              }
              {/* console.log(count) */}
              return(
              <View key={index} style={styles.courseOuterView}>
                  <Pressable key={index} onPress={() => {changingScreen.navigate('OverView', {course : course})}} >
                    <LinearGradient 
                      style={styles.courseStyle} 
                      colors={[ '#1976d2', '#1565c0',]}
                      start = {{x:0.7, y:0.1}}
                      end= {{x:0.8, y:0.7}}>
                    <Image style={styles.iconStyle} source={course?.courseImage}/>
                    <View style={{gap:width*0.03}}>
                      <Text numberOfLines={1} style={styles.courseTitle}>{course?.name}</Text>
                      <Text numberOfLines={2} style={styles.courseContent}>{course?.courseInfo}</Text>
                    </View>
                    </LinearGradient>
                  </Pressable>
                  <Pressable style={styles.removePressable}>
                    <Text style={{fontSize:RFValue(11)}}>Total enrolled : {count}</Text>
                  </Pressable>
                </View>
            )})}
        </View>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:100
  },
  programming: {
    // color:'#fff', 
    fontSize: RFValue(18),
    fontWeight:'800',
    color:'#636363',
    marginLeft: width*0.03,
    marginTop: height*0.03,
    marginBottom: height*0.01
  },
  courseTitle: {
    color:'#f7f7f7',
    fontSize:RFValue(14),
    fontWeight:'700',
    width: width*0.55,
  },
  courseContent: {
    color:'#d4d4d4',
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
  freeAndName: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  free: {
    padding:width*0.03,
    paddingVertical:height*0.01,
    backgroundColor:'#f5ca56',
    // marginLeft:'auto',
    // marginHorizontal:width*0.03,
    borderRadius:12,
    flexDirection:'row'
  },
  freeText: {
    fontWeight:'600',
  },
  removePressable: {
    marginLeft:'auto',
    marginHorizontal: width*0.01,
    marginVertical: height*0.005,
    backgroundColor:'#f4f4f4',
    paddingHorizontal:width*0.05,
    paddingVertical:height*0.005,
    borderRadius:5,
  },
  courseOuterView: {
    marginHorizontal:width*0.03,
    marginVertical:height*0.01,
    borderRadius:8,
    backgroundColor:'#dadada',
    shadowColor:'#000',
    shadowOffset: {
        height:5,
        width:5
    },
    shadowOpacity:0.4,
    shadowRadius: 4,
    elevation:10
  },

});

export default HomeScreen;
