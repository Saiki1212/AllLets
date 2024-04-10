import { Dimensions, Image, Pressable, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import BackBtn from '../../BackBtn'
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import { Feather, FontAwesome } from '@expo/vector-icons';
import PostUpload from '../Loader/UploadPostLoading'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 50;

const DetailScreen = ({}) => {
    const route = useRoute()
    const [username, setUsername] = useState('')
    const [myposts, setMyPosts] = useState([])
    const [userId, setUserId] = useState('')
    const [userId1, setUserId1] = useState('')
    const [user, setUser] = useState('')
    const [likes , setLikes] = useState('')
    const [likeLoad, setLikeLoad] = useState(false)
    let len = 0;

    useFocusEffect(
      useCallback(() => {
        fetchUserPosts();
      },[userId])
    )

    useEffect(() => {
      setUserId(route.params.items?._id);
      fetchUserPosts();
    },[])

    useEffect(() => {
      if(username) {
        fetchAllUserLikes()
      }
    }, [username])
  
    useFocusEffect(
      useCallback(() => {
        fetchAllUserLikes();
      },[username])
    )

    useEffect(() => {
      fetchUserdetails();
    },[userId1])

    useFocusEffect(
      useCallback(() => {
        fetchUserdetails();
      },[userId1])
    )
    
    useEffect(() => {
      const fetchUser = async () => {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwt_decode(token);
          const userId1 = decodedToken.userId;
          setUserId1(userId1)
      }
      fetchUser();
    },[]);

    const fetchUserdetails = async () => {
      try {
        const response = await axios.get(`https://letslearn-production.up.railway.app/profile/${userId1}`);
        const { user } = response.data;
        setUser(user);
        setUsername(user.username);
      } catch (error) {
        console.log("error in Detail screen 67: ", error);
      }
    };
    
    

    const handleLikePost = async( postid) => {
      console.log(username,' : : ', postid)
      try {
        setLikeLoad(true)
        const response = await axios.post('https://letslearn-production.up.railway.app/likedPost', {username, postid})
        fetchAllUserLikes();
        fetchUserPosts();
        setLikeLoad(false)
      } catch (error) {
        setLikeLoad(false)
        console.log("error in Upload screen liked post 160 : ", error);
      }
    }

    const fetchAllUserLikes = async () => {
      try {
        // console.log('username: ', username);
        const response = await axios.get(`https://letslearn-production.up.railway.app/LikeForAUser/${username}`);
        // console.log('response .data : ', response.data)
        setLikes(response.data)
        // console.log('likes', likes)
      } catch (error) {
        // console.log(' erlikes')
        console.log('Error while fetching likes:', error);
      }
    };

    const fetchUserPosts = async() => {
      try {
        const response = await axios.get(`https://letslearn-production.up.railway.app/UserPosts/${userId}`)
        setMyPosts(response.data.myposts.reverse())
      } catch (error) {
        console.log("error in My Posts  59 : ", error)
      }
    }

  return (
    <View style={{flex:1, marginTop: statusBarHeight}}>
    {likeLoad && <PostUpload/>}
        <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
    <ScrollView>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingTop:height*0.03}}>
        <BackBtn/>
        <Text numberOfLines={1} style={{fontSize:RFValue(15)}}>{route.params.items?.username}</Text>
        <Text style={{fontSize: RFValue(18)}}/>
      </View>
      
      <View style={styles.mainContainer}>
        <Image style={styles.ProfilePic} source={{uri : route.params.items?.profilePic }}/>
        <View style={{flexDirection:'row', marginVertical:height*0.01}}>
          <View style={styles.friendsView}>
            <Text style={styles.friendsCount}>{route.params.items?.friends}</Text>
            <Text style={styles.editProfileText}>Friends</Text>
          </View>
          <View style={styles.friendsView}>
            <Text style={styles.friendsCount}>{route.params.items?.posts}</Text>
            <Text style={styles.editProfileText}>Posts</Text>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{route.params.items?.name}</Text>
          {route.params.items?.profession && 
            <Text style={styles.bio} numberOfLines={1}>{route.params.items?.profession}</Text>
          }
          {route.params.items?.generalDetails?.collegeName && (
            <Text style={styles.bio} numberOfLines={1}>{route.params.items?.generalDetails?.collegeName}</Text>
          )}
          {route.params.items?.generalDetails?.year && (
            <Text style={styles.bio} numberOfLines={1}>{route.params.items?.generalDetails?.year}</Text>
          )}
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
              {route.params.items?.generalDetails?.favSubject.length > 0 && route.params.items?.generalDetails?.favSubject.map((item, index) => {
                len = len+1;
                return(
                  <View key={index}>
                    {item.length > 0 && (
                      <Text style={styles.bio} numberOfLines={1}>{item}{len === route.params.items?.generalDetails?.favSubject.length ? '.' : ', '}</Text>
                    )}
                  </View>
                )})}
            </View>
        </View>
      </View>

      <View>
        {route.params.items?.posts === 0 ? (
          <View>
            <Text style={styles.mainHeader}>No Posts</Text>
          </View>
        ) : (
          <>
            <Text style={styles.mainHeader}>Posts</Text>
            {myposts.length === 0 ? null : (
                myposts?.map((item, index) => {
                  let like;
                  let checkLike = false;
                  if(likes) {
                    like = likes.filter((uid) => item._id === uid.postid)
                    checkLike = like[0]?.likes;
                  }
                return (
                  <View key={index} style={styles.postTextView}>
                    {/* {console.log('user?.MyPost :: ',user?.MyPost)} */}
                    <SyntaxHighlighter language={'javascript'} value={item?.post}
                    style={docco}
                    fontSize={RFValue(10)}
                      customStyle={{
                        backgroundColor:'#f0f0f0',
                        paddingHorizontal:width*0.03,
                        paddingVertical:height*0.02,
                        marginBottom:height*0.01,
                        borderRadius:8,
                      }} >
                    {item?.post}
                    </SyntaxHighlighter>
                    <View style={styles.bottomView}>
                      <View style={styles.likeView}>
                        <Pressable onPress={() => {handleLikePost(item._id)}}>
                          {checkLike ? (
                            <FontAwesome name="heart" size={24} color="#8a87cd" />
                          ) : (
                            <Feather name="heart" size={22} color="#665da5" />
                          )}
                        </Pressable>
                        <Text style={styles.likeText}><Text style={{color:'#000'}}>{item.totalLike}</Text> like{item.totalLike === 1 ? '' : 's'}</Text>
                      </View>
                      {/* <Pressable onPress={() => {setPost(item?.post); handleDelete();}} style={styles.delBtn}>
                        <Text style={{fontSize:RFValue(12), fontWeight:'600'}}>Delete post</Text>
                      </Pressable> */}
                  </View>
                  </View>
              )})
            )}
            </>
        )}
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    ProfilePic: {
        height: width*0.3,
        width:width*0.3,
        resizeMode:'cover',
        borderRadius:(width*0.3)/2,
      },
      nameContainer: {
        marginRight:'auto',
        marginHorizontal:width*0.07,
        marginTop: height*0.02,
        gap:height*0.005,
        marginBottom: height*0.01,
      },
      name: {
        fontSize:RFValue(12),
        fontWeight:'700',
        marginBottom:height*0.005,
      },
      bio: {
        fontSize:RFValue(11),
      },
      mainContainer: {
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:width*0.03,
        marginTop:height*0.01,
        paddingVertical:height*0.01,
        borderRadius:12,
        backgroundColor:'#fff'
      },
      friendsView: {
        paddingHorizontal: width*0.05,
        marginHorizontal:width*0.03,
        gap:height*0.003,
        // backgroundColor:'#f2f2f0'
      },
      friendsCount: {
        textAlign: 'center',
        fontSize:RFValue(13),
        fontWeight:'700'
      },
      mainHeader: {
        fontSize: RFValue(17),
        fontWeight:'800',
        color:'#636363',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: height*0.02,
        marginBottom: height*0.01
      },
      postTextView: {
        marginHorizontal:width*0.02,
        paddingHorizontal:width*0.03,
        paddingVertical:height*0.01,
        marginVertical:height*0.01,
        backgroundColor:'#d4d4d4',
        borderRadius:8
      },
      likeView: {
        alignItems: 'center',
        gap:2
      },
      likeText: {
        fontSize: RFValue(9),
        fontWeight:'500',
        color:'#595858'
      },
      bottomView: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:height*0.001,
      },
})

export default DetailScreen