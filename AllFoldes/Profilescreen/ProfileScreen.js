import { SafeAreaView, StyleSheet, Text, View, Image,  Dimensions, Pressable, ScrollView, Alert, StatusBar, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native'
import React, {useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import PostUpload from '../Loader/UploadPostLoading'
import ProfileLoad from '../Loader/ProfileLoad'
import { Feather, FontAwesome, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 50;

const ProfileScreen = () => {
  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  const changeScreen = useNavigation();
  const [myposts, setMyPosts] = useState([])
  const [postload, setPostLoading] = useState(false)
  const [load, setLoad] = useState(false)
  const [likes , setLikes] = useState('')
  const [openr, setOpenr] = useState('')
  const [replies, setReplies] = useState('');
  const [clearr, setClearR] = useState('')
  const [visible, setVisible] = useState(false)
  const [postinfo, setPostInfo] = useState('')
  const [popVisible, setPopVisible] = useState(false)
  const [likeLoad, setLikeLoad] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }
    fetchUser();
  },[]);

  useFocusEffect(
    useCallback(() => {
      fetchUserdetails();
      fetchUserPosts();
    },[userId])
  )

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

  useFocusEffect(
    useCallback(() => {
      setPopVisible(false)
      setVisible(false)
      setOpenr('')
    },[])
  )
    const handleLikePost = async( postid) => {
      // const username = user.username;
      // console.log(username,' : : ', postid)
      try {
        setLikeLoad(true)
        const response = await axios.post('https://letslearn-production.up.railway.app/likedPost', {username, postid})
        setLikeLoad(false)
        fetchAllUserLikes();
        fetchUserPosts();
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

    const fetchAllRepliesOfaPost = async(postid) => {
      try {
        setReplies('')
        const response = await axios.get(`https://letslearn-production.up.railway.app/fetchingRepliesOfAPost/${postid}`)
        setReplies(response.data.replies.reverse())
        fetchUserPosts()
      } catch (error) {
        console.log('Error while fetch All Replies Of a Post , ', error)
      }
      
    }
    

    const fetchUserdetails = async() => {
      try {
        setLoad(true)
        const response = await axios.get(`https://letslearn-production.up.railway.app/profile/${userId}`)
        const {user} = response.data
        setLoad(false)
        setUser(user)
        setUsername(user.username)
        fetchUserPosts();
      } catch (error) {
        console.log("error in Profile screen 35 : ", error)
      }
    }

    const fetchUserPosts = async() => {
      try {
        const response = await axios.get(`https://letslearn-production.up.railway.app/UserPosts/${userId}`)
        setMyPosts(response.data.myposts.reverse())
        // console.log('MY POSTS by response :::::: ', response.data.myposts)
        // console.log('MY POSTS :::::: ', myposts)
      } catch (error) {
        console.log("error in My Posts  59 : ", error)
      }
    }

    const handleDelete = async() => {
      Alert.alert(
        'Delete query',
        'Click ok to delete the Query',
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: async() => {
                  setPostLoading(true)
                    try {
                      const postid = postinfo._id;
                      // console.log('Userid and postid : ' , userId,' : : :', postid);
                      await axios.post('https://letslearn-production.up.railway.app/RemovingPost',{postid, userId})
                        .then((response) => {
                          if(response.status === 200) {
                            fetchUserdetails()
                            fetchUserPosts()
                            Alert.alert('Post Deleted !')
                          }
                          else {
                            Alert.alert('error occured while deleting please try again')
                          }
                        })
                    } catch (error) {
                        console.log('Error while deleting the post line 113',error)
                    }
                    setPostLoading(false)
                }
            },
        ]
    )
  };

  const postOptions = [
    {title:'Total Likes', icon:'hearto', color: '#665da5'},
    {title:'Total Responses', icon:'arrowright', color: '#665da5'},
    {title:'Edit Post', icon:'edit', color: '#317adf'},
    {title:'Remove Post', icon:'delete', color: '#ea546c'}
  ];

  
    const handleDelOrEdit = (i, user) => {
      setVisible(false)
      if(i.title === 'Edit Post') {
        changeScreen.navigate('EditPost', {postinfo, user});
      }
      if(i.title === 'Remove Post') {
        handleDelete();
      }
      setPostInfo('')
    }
  

  let len = 0;

  return (
    <View style={{flex:1, marginTop:statusBarHeight}}>
    <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
      {postload && <PostUpload/>}
      {load && <ProfileLoad/>}
      {likeLoad && <PostUpload/>}
      <ScrollView>
      <Pressable style={styles.mainContainer} onPress={() => {setPopVisible(false); setOpenr('')}}>
        <TouchableOpacity style={styles.mainMenu} onPress={() => {setPopVisible(!popVisible); setOpenr('')}}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        </TouchableOpacity>
        {popVisible ? (
          <View style={styles.popup1}>
            <TouchableOpacity style={styles.popup12} onPress={() => {changeScreen.navigate('Developer'); setPopVisible(false)}}>
              <Text style={styles.popup12Text}>About developer</Text>
            </TouchableOpacity>
            <Text style={{height:0.5, borderWidth:0.5, borderColor:'#665da5'}}/>
            <TouchableOpacity style={styles.popup12}>
              <Text style={styles.popup12Text}>Let's Learn site</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <Image style={styles.ProfilePic} source={{uri : user?.profilePic }}/>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={{fontSize: RFValue(13), fontWeight:'500', textDecorationLine:'underline', color:'#181e9a'}} numberOfLines={1}>{user?.username}</Text>
          <Text style={{fontSize: RFValue(11), fontWeight:'500', textDecorationLine:'underline', color:'#181e9a'}} numberOfLines={1}>{user?.email}</Text>
          {user?.profession && (
            <Text style={styles.bio} numberOfLines={1}>{user?.profession}</Text>
          )}
          {user?.generalDetails && (
            <>
            {user?.generalDetails?.collegeName && (
              <Text style={styles.bio} numberOfLines={1}>{user?.generalDetails?.collegeName}</Text>
            )}
            {user?.generalDetails?.year && (
              <Text style={styles.bio} numberOfLines={1}>{user?.generalDetails?.year}</Text>
            )}

            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
              {user?.generalDetails?.favSubject.length > 0 && user.generalDetails.favSubject.map((item, index) => {
                len = len+1;
                return(
                  <View key={index}>
                  {item.length > 0 && (
                    <Text style={styles.bio} numberOfLines={1}>{item}{len === user?.generalDetails?.favSubject.length ? '.' : ', '}</Text>
                  )}
                  </View>
              )})}
            </View>
            {user?.generalDetails?.gender && (
              <Text style={styles.bio} numberOfLines={1}>{user?.generalDetails?.gender}</Text>
            )}
            {user?.generalDetails?.mobileNumber && (
              <Text style={styles.bio} numberOfLines={1}>{user?.generalDetails?.mobileNumber}</Text>
            )}
          </>
          )}
          
        </View>
        <View style={{flexDirection:'row', marginVertical:height*0.01}}>
          <Pressable style={styles.friendsView} onPress={() => {changeScreen.navigate('MyFList'); setPopVisible(false); setOpenr('')}}>
            <Text style={styles.friendsCount}>{user?.friends}</Text>
            <Text style={styles.editProfileText}>Friends</Text>
          </Pressable>
          <View style={styles.friendsView}>
            <Text style={styles.friendsCount}>{user?.posts}</Text>
            <Text style={styles.editProfileText}>Posts</Text>
          </View>
        </View>

        <View style={{flexDirection:'row', marginVertical:height*0.01}}>
          <Pressable style={styles.editProfileView} onPress={() => {changeScreen.navigate('Edit'); setPopVisible(false); setOpenr('')}}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.editProfileView} onPress={() => {changeScreen.navigate('Follow'); setPopVisible(false); setOpenr('')}}>
            <Text style={styles.editProfileText}>Add Friends</Text>
          </Pressable>
        </View>
      </Pressable>

      <View>
        {user.posts === 0 ? (
          <View>
            <Text style={styles.mainHeader}>No Posts</Text>
          </View>
        ) : (
          <Pressable onPress={() => {setOpenr(''); setPopVisible(false)}} >
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
                <View key={index} style={styles.postTextView} >
                {/* {console.log('user?.MyPost :: ',user?.MyPost)} */}
                  <View style={{ marginRight:-7}}>
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
                    <TouchableOpacity style={styles.dotsStyle} onPress={() => {fetchAllUserLikes();fetchAllRepliesOfaPost() ; setPostInfo(item); setOpenr(''); setPopVisible(false); setVisible(true)}}>
                      <MaterialCommunityIcons name="dots-vertical" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.bottomView}>
                    <Pressable onPress={() => {handleLikePost(item._id); setPopVisible(false)}}>
                      {checkLike ? (
                        <FontAwesome name="heart" size={24} color="#8a87cd" />
                      ) : (
                        <Feather name="heart" size={22} color="#665da5" />
                      )}
                    </Pressable>
                    {openr === item._id ? (
                      <Pressable onPress={() => {setOpenr(''); fetchAllRepliesOfaPost(item._id); setPopVisible(false)}}>
                        <MaterialCommunityIcons name="message-reply-text" size={24} color="#665da5" />
                      </Pressable>
                    ) : (
                      <Pressable onPress={() => {setOpenr(item._id); fetchAllRepliesOfaPost(item._id); setPopVisible(false)}}>
                        <MaterialCommunityIcons name="message-reply-text-outline" size={24} color="#665da5" />
                      </Pressable>
                    )}
                    
                  </View>
                    {openr === item._id && (
                      <View style={styles.replyMainView}>
                        <Text style={styles.totalReplyText}>total responses : <Text style={{color:'#000'}}>{item.totalReply}</Text></Text>
                        <ScrollView style={styles.textInputView2}>
                          <View >
                            {replies.length > 0 && (
                              replies.map((r1, idx) => {
                                return (
                                <View key={idx} style={[styles.viewReplies ]}>
                                  {r1.username.length >= 12 ? (
                                    <Text style={styles.rUserName}>{r1.username.slice(0,10)}...</Text>
                                  ) : (
                                    <Text style={styles.rUserName}>{r1.username}</Text>
                                  )}
                                  {clearr === r1._id && (
                                    <Pressable onPress={() => {setClearR('')}} style={styles.completeReplyStyles}>
                                      <Text style={styles.rreply}>{r1.reply}</Text>
                                    </Pressable>
                                  )}
                                  {r1.reply.length >= 35 ? (
                                    <Pressable onPress={() => {setClearR(r1._id)}}>
                                      <Text style={styles.rreply}>{r1.reply.slice(0,35)}...</Text>
                                    </Pressable>
                                  ) : (
                                    <Text style={styles.rreply}>{r1.reply}</Text>
                                  )}
                                </View>
                              )})
                            )}
                          </View>
                        </ScrollView>
                      </View>
                    )}
                    {/* <Pressable onPress={() => {setPost(item?.post); handleDelete();}} style={styles.delBtn}>
                      <Text style={{fontSize:RFValue(12), fontWeight:'600'}}>Delete post</Text>
                    </Pressable> */}
                </View>
              )})
            )}
            <Modal animationType='slide' transparent visible={visible}>
              <SafeAreaView style={{flex:1, justifyContent:'flex-end', paddingBottom:20, backgroundColor: 'rgba(200,200,200,0.5)'}}>
                <View style={styles.popup2}>
                    <View style={styles.bottomModal}>
                    <View style={{borderWidth:2, borderColor:'#919191',marginHorizontal:width*0.42, borderRadius:4, flexDirection:'row'}}/>
                    <Pressable style={{marginLeft:'auto', marginRight:5, marginTop: -10}} onPress={() => setVisible(false)}>
                      <Entypo name="cross" size={30} color="#919191" />
                    </Pressable>
                  {postOptions.map((i,idx) => (
                    <Pressable key={idx} 
                      style={[styles.popup21, idx === postOptions.length-1 ? {paddingBottom:height*0.03} : {borderBottomWidth: 0.8, borderColor: '#7c7d7c'}]}
                      onPress={() => {handleDelOrEdit(i, user)}}>
                        <AntDesign name={i.icon} size={20} color={i.color} />
                        <Text style={[styles.editTextStyles, {color: i.color}]}>{i.title}</Text>
                        {i.title === 'Total Likes' ? <Text style={styles.likesCount}>{postinfo.totalLike}</Text> : null}
                        {i.title === 'Total Responses' ? <Text style={styles.likesCount}>{postinfo.totalReply}</Text> : null}
                    </Pressable>
                  ))}
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
            </Pressable>
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
    gap:height*0.01
  },
  name: {
    fontSize:RFValue(12),
    fontWeight:'700',
    color:'#0b125b'
  },
  bio: {
    fontSize:RFValue(11),
    color:'#0b125b',
    fontWeight:'500',
    // backgroundColor:'#ffa'
  },
  mainContainer: {
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:width*0.03,
    marginTop:height*0.01,
    paddingVertical:height*0.01,
    borderRadius:12,
    shadowColor:'#000',
    shadowOffset: {
        height:5,
        width:5
    },
    shadowOpacity:0.4,
    shadowRadius: 4,
    elevation:10,
    borderWidth:0.4,
    borderColor:'#879dfe', 
    backgroundColor:'#e8eeff'
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
  editProfileView: {
    paddingHorizontal: width*0.13,
    paddingVertical: height*0.01,
    marginHorizontal:width*0.01,
    backgroundColor:'#f2f2f0',
    borderRadius:8,
    backgroundColor:'#d4dfff',
    borderWidth:0.4,
    borderColor:'#879dfe'
  },
  editProfileText: {
    fontSize:RFValue(10)
  },
  postTextView: {
    marginHorizontal:width*0.02,
    paddingHorizontal:width*0.03,
    paddingVertical:height*0.01,
    marginVertical:height*0.01,
    backgroundColor:'#d4d4d4',
    borderRadius:8,
  },
  dotsStyle: {
    position: 'absolute',
    marginLeft: width-55,
    top: 3
  },
  bottomView: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    // marginVertical:height*0.005,
  },
  delBtn: {
    backgroundColor:'#f0f0f0',
    paddingHorizontal:width*0.04,
    paddingVertical:height*0.007,
    borderRadius:6
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
  likesCount: {
    fontSize: RFValue(13), 
    fontWeight:'500',
    color: '#665da5'
  },
  likeText: {
    fontSize: RFValue(5.5),
    fontWeight:'600',
    color:'#fff'
  },
  likeCountView: {
    backgroundColor: '#665da5',
    justifyContent: 'center',
    alignItems: 'center',
    height: height*0.013,
    width : height*0.013,
    borderRadius: height*0.01,
    position: 'absolute',
    left: width*0.035
  },
  totalReplyText: {
    color:'#4e4f4f',
    fontSize: RFValue(11),
    fontWeight: '500',
    marginBottom: height*0.01
  },
  replyMainView: {
    // borderWidth: 0.5,
    borderColor:'#9fa1da',
    marginBottom: 5,
    paddingHorizontal: width*0.03,
    paddingTop: height*0.01,
    borderRadius: 4
  },
  viewReplies: {
    flexDirection:'row',
    // backgroundColor:'#abc',
    paddingVertical:height*0.01,
    marginBottom:height*0.005,
    gap:width*0.02,
    // width: width*0.5
    paddingHorizontal: width*0.02,
    alignItems: 'center',
    borderWidth:0.4,
    borderRadius:4,
    borderColor: '#786ebd'
  },
  completeReplyStyles: {
    width: width*0.6
  },
  rUserName: {
    fontSize: RFValue(11),
    fontWeight: '500',
    color:'#47436c'
  },
  rreply: {
    fontSize: RFValue(10),
    fontWeight: '500',
    color:'#554d86',
  },
  popup2: {
    paddingHorizontal: width*0.02,
    width: width,
    position: 'absolute',
  },
  bottomModal: {
    backgroundColor: '#fff',
    paddingVertical: height*0.01,
    borderRadius:8,
  },
  popup21: {
    paddingVertical:height*0.02,
    flexDirection: 'row',
    gap: width*0.03,
    alignItems:'center',
    marginHorizontal:width*0.03
  },
  editTextStyles: {
    fontSize: RFValue(13),
    fontWeight:'500',
  },
  mainMenu: {
    marginLeft:'auto',
    marginRight:width*0.03,
    position: 'absolute',
    zIndex: 1000,
    top:height*0.01,
    right: 0
  },
  popup1: {
    marginLeft:'auto',
    marginRight:width*0.03,
    position: 'absolute',
    zIndex: 1,
    top:height*0.04,
    right: width*0.01,
    backgroundColor:'#bbc0e6',
    paddingHorizontal:width*0.03,
    paddingVertical: height*0.01,
    borderRadius:5,
    shadowColor:'#000',
    shadowOpacity:0.5,
    shadowOffset: {
      width:0,
      height:0
    },
    elevation:10
  },
  popup12: {
    paddingVertical: height*0.015
  },
  popup12Text: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#47436c'
  },
})

export default ProfileScreen