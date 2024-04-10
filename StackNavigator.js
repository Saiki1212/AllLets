import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './AllFoldes/HomePage/HomeScreen'
import IntoTheCourse1 from './AllFoldes/Selectedscreen/IntoTheCourse1'
import LoginScreen from './AllFoldes/LoginScreen'
import RegisterScreen from './AllFoldes/RegisterScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, Fontisto, FontAwesome5, FontAwesome} from '@expo/vector-icons';
import ProfileScreen from './AllFoldes/Profilescreen/ProfileScreen'
import SelectedScreen from './AllFoldes/Selectedscreen/SelectedScreen'
import UploadScreen from './AllFoldes/Uploadscreen/UploadScreen'
import FollowList from './AllFoldes/Profilescreen/FriendsList'
import OverViewPage from './AllFoldes/HomePage/OverViewPage'
import EditProfile from './AllFoldes/Profilescreen/EditProfile'
import DetailScreen from './AllFoldes/Profilescreen/DetailScreen'
import MyFriendsList from './AllFoldes/Profilescreen/MyFriendList'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFValue } from 'react-native-responsive-fontsize'
import OnboardingScreen from './AllFoldes/OnboardingScreen'
import ForgotPassword from './AllFoldes/ForgotPassword'
import EditPost from './AllFoldes/EditPost'
import AboutDeveloper from './AllFoldes/AboutDeveloper'
import { BlurView } from 'expo-blur'


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

  

function BottomTabs() {

  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }
    fetchUser();
  },[]);

  useEffect(() => {
    fetchUserdetails()
  },[userId]);

  const fetchUserdetails = async() => {
    try {
      const response = await axios.get(`https://letslearn-production.up.railway.app/profile/${userId}`)
      const {user} = response.data
      setUser(user)
    } catch (error) {
      console.log("error in Profile screen 35 : ", error)
    }
  }

  return (
    <Tab.Navigator
    screenOptions={{
    tabBarActiveTintColor: '#8a87cd',
  }}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // tabBarLableStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) => 
            focused ? 
            (<MaterialCommunityIcons name="home-outline" size={RFValue(20)} color="#8a87cd" />) : 
              (<MaterialCommunityIcons name="home-outline" size={RFValue(17)} color="black" />)
        }}
      />
      <Tab.Screen
        name='Select'
        component={SelectedScreen}
        options={{
          tabBarLabel: 'courses',
          // tabBarLableStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) => 
            focused ? 
            (<FontAwesome name="angellist" size={RFValue(20)} color="#8a87cd" />) : 
              (<FontAwesome name="angellist" size={RFValue(17)} color="black" />)
        }}
      />
      <Tab.Screen
        name='solve'
        component={UploadScreen}
        options={{
          tabBarLabel: 'solve',
          // tabBarLableStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) => 
            focused ? 
            (<FontAwesome5 name="comments" size={RFValue(20)} color="#8a87cd" />) : 
              (<FontAwesome5 name="comments" size={RFValue(17)} color="black" />)
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          // tabBarLableStyle: {color: '#8a87cd'},
          headerShown: false,
          tabBarIcon: ({focused}) => 
            focused ? 
            (<Image source={{uri: user?.profilePic}} style={{height:RFValue(24), width:RFValue(24), borderRadius:RFValue(24), borderWidth:2, borderColor:'#8a87cd'}}/>) : 
              (<Image source={{uri: user?.profilePic}} style={{height:RFValue(20), width:RFValue(20), borderRadius:RFValue(19), borderWidth:0.5, borderColor:'#8a87cd'}}/>)
        }}
      />
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  const [showBoarding, setShowBoarding] = useState(null);

  useEffect(() => {
    checkAsyncStorage();
  },[])

  const checkAsyncStorage = async () => {
    let onboarded = await AsyncStorage.getItem('onboarded');
    if (onboarded == '1') {
      setShowBoarding(false)
    } else {
      setShowBoarding(true)
    }
  }

  if(showBoarding == null) {
    return null;
  }

  if(showBoarding) {
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Onboard'>
              <Stack.Screen name='Onboard' component={OnboardingScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}/>
              <Stack.Screen name='BottomTabs' component={BottomTabs} options={{headerShown: false}}/>
              <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Edit' component={EditProfile} options={{headerShown: false}}/>
              <Stack.Screen name='OverView' component={OverViewPage} options={{headerShown: false}}/>
              <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
              <Stack.Screen name='MyFList' component={MyFriendsList} options={{headerShown: false}}/>
              <Stack.Screen name='Detail' component={DetailScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Into1' component={IntoTheCourse1} options={{headerShown: false}}/>
              <Stack.Screen name='Follow' component={FollowList} options={{headerShown: false}}/>
              <Stack.Screen name='Developer' component={AboutDeveloper} options={{headerShown: false}}/>
          </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else {
    return (
      <NavigationContainer>
          <Stack.Navigator>
              {/* <Stack.Screen name='Onboard' component={OnboardingScreen} options={{headerShown: false}}/> */}
              <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Forgot' component={ForgotPassword} options={{headerShown: false}}/>
              <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}/>
              <Stack.Screen name='BottomTabs' component={BottomTabs} options={{headerShown: false}}/>
              <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Edit' component={EditProfile} options={{headerShown: false}}/>
              <Stack.Screen name='OverView' component={OverViewPage} options={{headerShown: false}}/>
              <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
              <Stack.Screen name='MyFList' component={MyFriendsList} options={{headerShown: false}}/>
              <Stack.Screen name='Detail' component={DetailScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Into1' component={IntoTheCourse1} options={{headerShown: false}}/>
              <Stack.Screen name='Follow' component={FollowList} options={{headerShown: false}}/>
              <Stack.Screen name='EditPost' component={EditPost} options={{headerShown: false}}/>
              <Stack.Screen name='Developer' component={AboutDeveloper} options={{headerShown: false}}/>
          </Stack.Navigator>
      </NavigationContainer>
    )
  }


}
const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: '#faf',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  bottomContainer: {
    backgroundColor: 'red',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default StackNavigator