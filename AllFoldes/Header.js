import { Dimensions, StyleSheet, Text, View, StatusBar, TextInput, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const statusBarHeight = Platform.OS === 'ios' ? 50 : 40;

const Header = () => {
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState('')
    const ChangeScreen = useNavigation()
  
  useEffect(() => {
    const fetchUser = async() => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
    }
    fetchUser()
  },[])

  useEffect(() => {
    const fetchUserdetails = async() => {
      try {
        const response = await axios.get(`https://letslearn-production.up.railway.app/profile/${userId}`)
        const {user} = response.data
        setUser(user)
      } catch (error) {
        console.log("error in header screen 35 : ", error)
      }
    }
    fetchUserdetails()
  },[userId]);

//   console.log("user user : ", user)

  return (
    <View style={styles.container1Header}>
        <View style={styles.container2Header}>
            <TextInput
                placeholder='courses'
                placeholderTextColor={'#7a7979'}
                // autoCapitalize={false}
                autoFocus={false}
                style={styles.inputTextHeader}
            />
            <TouchableOpacity style={styles.imageViewHeader} onPress={() => ChangeScreen.navigate('Profile')}>
                <Image source={{uri: user?.profilePic}} style={styles.imageStyleHeader}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container1Header: {
        marginHorizontal: width*0.03,
        height:height*0.06,
        // backgroundColor:'#343a40',
        backgroundColor:'#d9d9d9',
        borderRadius:10,
        marginTop:statusBarHeight,
        marginBottom:10
    },
    container2Header: {
        flexDirection:'row'
    },
    inputTextHeader: {
        flex:1,
        // fontSize: RFPercentage(3)
        fontSize: RFValue(15),
        marginLeft:10,
        color:'#4d4d4d',
        // fontSize: RFValue(16)
    },
    imageViewHeader: {
        height:height*0.06,
        width: height*0.05,
        justifyContent:'center',
        alignItems:'center',
        paddingRight:10
    },
    imageStyleHeader: {
        width:height*0.04,
        height:height*0.04,
        borderRadius:height*0.03,
        resizeMode:'cover',
    },
})

export default Header