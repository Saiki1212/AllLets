import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, Dimensions, TouchableOpacity, Pressable, ScrollView, StatusBar, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackBtn from '../../BackBtn'
import MakingFriendLoader from '../Loader/MakingFriendLoader';
import NullListLoaderFriends from '../Loader/NullListLoaderFriends';
import JustLoading from '../Loader/JustLoading';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 50;
const FollowList = () => {

  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')
  const [load1, setLoad1] = useState(false)
  const [load2, setLoad2] = useState(false)
  const changeScreen = useNavigation()

  // useEffect(() => {
  //   fetchUser()
  // },[userId]);
    const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }

  useEffect(() => {
    fetchUserdetails()
    fetchUser()
  },[userId]);
  
  const fetchUserdetails = async() => {
    try {
      setLoad2(true)
      const response = await axios.get(`https://letslearn-production.up.railway.app/profile/${userId}`)
      const {user} = response.data
      setUser(user)
      setLoad2(false)
    } catch (error) {
      setLoad2(false)
      console.log("error in FriendsList screen 35 : ", error)
    }
  }

  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [search, setSearch] = useState('');
  const [btn, setBtn] = useState('Make Friend');

    // fetching all the users .....
    // useEffect(() => {
    //   fetchAllUsers();
    // }, []);

    useFocusEffect(
      useCallback(() => {
        fetchAllUsers();
        fetchUserdetails();
      },[])
    )
    const fetchAllUsers = async () => {
        try {
            setLoad2(true)
            const response = await axios.get('https://letslearn-production.up.railway.app/all-users');
            const { users } = response.data;
            // setAllUsers(users)
            setLoad2(false)
            if (users && users.length > 0) {
                setAllUsers(users.reverse());
                setSearchQuery(users)
            } else {
                console.log('No users Array found.');
            }
            // console.log('allUsers 1 : ', allUsers)
        } catch (error) {
          setLoad2(false)
            console.log('Error while fetching all users:', error);
        }
    };

    const handleRemoveFriend = async({items}) => {
      setLoad1(true)
      const id = items._id
      try {
        const api = await axios.post('https://letslearn-production.up.railway.app/UnfollowBothUsers', {userId, id})
        fetchAllUsers()
        fetchUserdetails()
        setLoad1(false)
      } catch (error) {
        setLoad1(false)
        fetchUserdetails();
        fetchAllUsers()
        console.log("Error in handleRemoveFriend : ",error)
      }
    }

    // const filteredUsers = (text) => {
    //   if (text) {
    //     const newData = searchQuery.filter(function (item) {
    //       // Applying filter for the inserted text in search bar
    //       const itemData = item.title
    //         ? item.title.toUpperCase()
    //         : ''.toUpperCase();
    //       const textData = text.toUpperCase();
    //       return itemData.indexOf(textData) > -1;
    //     });
    //   }
    // }

  return (
    <View style={{flex:1}}>
        <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
    {load1 && <MakingFriendLoader/>}
    {load2 && <JustLoading/>}
      <View style={{marginTop:statusBarHeight+10}} />
      {/* <ScrollView>
        {filteredUsers?.map((item, index) => (
          <Text key={index}>{item?.name}</Text>
        ))}
      </ScrollView> */}
      <ScrollView style={{}}>
      {/* {user.friendsNames?.map((item, index) => (
        <Text key={index}>{item?.name}</Text>
      ))} */}
      <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:height*0.02}}>
        <BackBtn/>
        <Text style={styles.List}>List of Friends</Text>
        <View style={{width:24}}/>
      </View>
      {/* {console.log('allUsers : :: ', allUsers)} */}
      {allUsers?.map((items) =>{ 
        const matched = Array.isArray(user.friendsNames) && user.friendsNames.length > 0
          ? user.friendsNames.find((f) => f.username === items.username)
          : null;
          {/* console.log('user?.friendsNames : :: ', user) */}
        return(
        <Pressable key={items._id} onPress={() => changeScreen.navigate('Detail', {items : items})}>
        {items._id != userId && (
              <View>
                {
                  matched && (
                    <>
                    <View style={styles.userContainer}>
                        <View>
                            <Image style={styles.ProfilePic} source={{ uri: items.profilePic }} />
                            <Pressable style={styles.btnView} onPress={() => handleRemoveFriend({items})}>
                              <Text style={styles.btnText}>Remove Friend</Text>
                            </Pressable>
                        </View>
                        <View style={{gap: 10, flex:1}}>
                        <View>
                            <Text numberOfLines={1} style={styles.nameText}>{items?.name}</Text>
                            {items?.profession && 
                              <Text numberOfLines={1} style={styles.professionText}>{items?.profession}</Text>
                            }
                            {items?.generalDetails?.collegeName && 
                              <Text numberOfLines={1} style={styles.professionText}>{items?.generalDetails?.collegeName}</Text>
                            }
                        </View>
                        <View style={styles.FriendView}>
                            <View style={styles.f1View}>
                            <Text style={{fontWeight:'700', fontSize:RFValue(10)}}>{items?.friends}</Text>
                            <Text style={{fontSize:RFValue(10), color:'#303030'}}>Friends</Text>
                            </View>
                            <View style={styles.f1View}>
                            <Text style={{fontWeight:'700', fontSize:RFValue(10)}}>{items?.posts}</Text>
                            <Text style={{fontSize:RFValue(10), color:'#303030'}}>Posts</Text>
                            </View>
                        </View>
                        </View>
                        </View>
                    </>
                )}
                
          </View>
        )}
        </Pressable>
      )})}
        {user?.friends === 0 && (
            <View style={{flex:1, height:height/2}}>
              <NullListLoaderFriends/>
            </View>
        )}

      <View style={{marginBottom:height*0.05}}/>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container2Header: {
      flexDirection:'row'
  },
  inputTextHeader: {
      flex:1,
      // fontSize: RFPercentage(3)
      fontSize: RFValue(13),
      marginLeft:10,
      // color:'#e3e3e3',
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
      borderRadius:50,
      resizeMode:'cover',
  },
  ProfilePic: {
    height: height*0.1,
    width:height*0.1,
    resizeMode:'cover',
    borderRadius:height*0.1,
  },
  List: {
    fontSize:RFValue(16),
    fontWeight:'700',
    color:'#333332',
  },
  userContainer: {
    flexDirection:'row',
    backgroundColor: '#cfcfcf',
    marginHorizontal:width*0.03,
    marginTop:height*0.02,
    paddingHorizontal:width*0.03,
    paddingVertical:height*0.005,
    alignItems:'center',
    gap:width*0.03,
    borderRadius:12,
    shadowColor:'#643f38',
    shadowOffset: {
        height:5,
        width:5
    },
    shadowOpacity:0.4,
    shadowRadius: 4,
    elevation:10
  },
  nameText: {
    fontSize: RFValue(14),
    fontWeight:'600',
    marginBottom:height*0.01
  },
  professionText: {
    fontSize: RFValue(11),
    fontWeight:'600',
    color:'#575757',
  },
  FriendView: {
    flexDirection:'row',
    // backgroundColor:'#fcf',
    marginLeft:'auto',
    marginRight:'auto',
    gap: width*0.1
  },
  f1View: {
    justifyContent:'center',
    alignItems:'center',
    gap: 3
  },
  btnView: {
    paddingHorizontal:width*0.02,
    paddingVertical:height*0.01,
    backgroundColor:'#d9d9d9',
    marginTop:height*0.01,
    borderRadius:8,
  },
  btnText: {
    color:'#0095f6'
  },
})

export default FollowList