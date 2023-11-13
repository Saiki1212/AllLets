import { Alert, Dimensions, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { RFValue } from 'react-native-responsive-fontsize'
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import PostUpload from '../Loader/UploadPostLoading'
import { Feather, FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 50;

const UploadScreen = () => {
  const [user, setUser] = useState('')
  const [users, setUsers] = useState('')
  const [likes , setLikes] = useState([])
  const [userId, setUserId] = useState('')
  const [openr, setOpenr] = useState('')
  const [username, setUsername] = useState('')
  const [allFriends, setAllFriends] = useState('')
  const [pressUpload, setPressUpload] = useState(false)
  const [postload, setPostLoading] = useState(false)
  const [post, setcode] = useState('');
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState('');
  const [clearr, setClearR] = useState('')
  const [likeLoad, setLikeLoad] = useState(false)
  const changeScreen = useNavigation();

  const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
  }

  useEffect(() => {
    fetchUser();
      fetchUserdetails();
  },[])

  useEffect(() => {
    if(userId) {
      fetchUserdetails();
      fetchAllUsers();
    }
  },[userId]);

  useEffect(() => {
    if(username) {
      friendsPosts()
      fetchAllUserLikes()
    }
  }, [username])

  useFocusEffect(
    useCallback(() => {
      friendsPosts();
      fetchAllUserLikes();
    },[username])
  )

  useFocusEffect(
    useCallback(() => {
      fetchUser();
      fetchUserdetails();
    },[userId])
  )

const fetchAllUserLikes = async () => {
  try {
    const response = await axios.get(`https://phoenix-optimum-hawk.ngrok-free.app/LikeForAUser/${username}`);
    setLikes(response.data)
  } catch (error) {
    console.log('Error while fetching likes:', error);
  }
};

    const [allUsers, setAllUsers] = useState([]);

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('https://phoenix-optimum-hawk.ngrok-free.app/all-users');
        const { users } = response.data;

        if (users && users.length > 0) {
          setAllUsers(users);
        } else {
          console.log('No users Array found.');
        }
      } catch (error) {
        console.log('Error while fetching all users:', error);
      }
    };

    const fetchUserdetails = async() => {
      try {
        const response = await axios.get(`https://phoenix-optimum-hawk.ngrok-free.app/profile/${userId}`)
        const {user} = response.data
        setUser(user)
        setUsername(user.username)
      } catch (error) {
        console.log("error in Upload screen 53 : ", error)
      }
    }

    const friendsPosts = async() => {
      try {
        const response = await axios.get(`https://phoenix-optimum-hawk.ngrok-free.app/friends/${username}`)
        if (response.status === 200 ) {
          setAllFriends(response.data.allFriends.reverse());
        } else {
          console.error('Error fetching friends post. Status:', response.status);
        }
      } catch (error) {
        console.log("error in Upload screen  66 : ", error)
      }
    }

    const handleSubmit = async() => {
      if (!post) {
        return Alert.alert('Please Enter the query !')
      }
      Alert.alert(
        'Upload query',
        'Click ok to upload the Query',
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Upload',
                onPress: async() => {
                    try {
                      setPostLoading(true)
                      await axios.post('https://phoenix-optimum-hawk.ngrok-free.app/UpdatingPosts',{username, post})
                        .then((response) => {
                          if(response.status === 200) {
                            setPostLoading(false)
                            Alert.alert('Post saved !')
                            setPressUpload(false)
                            setcode('')
                            setTimeout(() => {
                              changeScreen.navigate('Profile')
                            }, 500);
                          }
                          else {
                            setPostLoading(false)
                            Alert.alert('error occured while ploading please try again')
                          }
                        })
                    } catch (error) {
                        setPostLoading(false)
                        console.log('Error while uploading the post line 85',error)
                    }
                }
            },
        ]
      )
    };

    const handleSubmitReply = async(postid) => {
      if (!reply) {
        return Alert.alert('Please Enter the response !')
      }
      Alert.alert(
        'Submit response',
        'Click ok to respond the response',
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Respond',
                onPress: async() => {
                    try {
                      setPostLoading(true)
                      await axios.post('https://phoenix-optimum-hawk.ngrok-free.app/UpdatingReply',{username, reply, postid})
                        .then((response) => {
                          if(response.status === 200) {
                            setPostLoading(false)
                            Alert.alert('Response saved !')
                            setPressUpload(false)
                            setOpenr(''); setReply('')
                          }
                          else {
                            Alert.alert('error occured while uploading reply please try again')
                          }
                        })
                    } catch (error) {
                        console.log('Error while uploading reply the post line 85',error)
                    }
                }
            },
        ]
      )
    };

    const fetchAllRepliesOfaPost = async(postid) => {
      try {
        setReplies('')
        friendsPosts();
        const response = await axios.get(`https://phoenix-optimum-hawk.ngrok-free.app/fetchingRepliesOfAPost/${postid}`)
        setReplies(response.data.replies.reverse())
      } catch (error) {
        console.log('Error while fetch All Replies Of a Post , ', error)
      }
      
    }


  const handleLikePost = async( postid) => {
    const username = user.username;
    try {
      setLikeLoad(true)
      const response = await axios.post('https://phoenix-optimum-hawk.ngrok-free.app/likedPost', {username, postid})
      fetchAllUserLikes();
      setLikeLoad(false)
    } catch (error) {
      setLikeLoad(false)
      console.log("error in Upload screen liked post 160 : ", error);
    }
  }
  
  return (
    <View style={{flex:1 , marginTop: statusBarHeight}}>
        <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
      {postload && <PostUpload/>}
      {likeLoad && <PostUpload/>}
      <ScrollView>
      <View style={styles.upperViewStyle}>
        <Text style={styles.mainHeader}>Do you have a query !</Text>
        <Text style={styles.mainHeaderCaption}>Post here to take help from your friends an experties. Soon we are going to add reply option.</Text>
          <Pressable style={styles.uploadPostView} onPress={() => {setPressUpload(!pressUpload); setOpenr(''); setReply('')}}>
            <Text style={styles.uploadPostText}>Upload post</Text>
          </Pressable>
          {pressUpload ? (
            <ScrollView style={styles.textInputView}>
              <TextInput
                value={post}
                onChangeText={(text) => setcode(text)}
                multiline
                autoFocus={false}
                placeholder='Enter your query here.....'
                style={styles.textInput}
              />
              <View style={{flexDirection:'row'}}>
                <Pressable style={styles.SubmitView} onPress={handleSubmit}>
                  <Text style={styles.uploadPostText}>submit</Text>
                </Pressable>
                <Pressable style={styles.cancelView} onPress={() => {setPressUpload(false); setcode('')}}>
                  <Text style={styles.uploadPostText}>cancel</Text>
                </Pressable>
              </View>
              </ScrollView>
          ) : null}
        </View>
        
        <Text style={styles.friendsQueryHeaderText}>Friends Queries !!!</Text>
        <View style={{borderWidth:0.3, borderColor:'#919191', marginHorizontal:width*0.05}}/>
        <View>
          {allFriends && allFriends?.map((item, index) => {
            {/* console.log('item?.post : ', allUsers.username) */}
            {/* const likesArray = Array.isArray(likes) ? likes : []; */}
            let like;
            let checkLike = false;
            if(likes) {
              like = likes.filter((uid) => item._id === uid.postid)
              checkLike = like[0]?.likes;
            }

            {/* console.log(checkLike) */}
            const items = allUsers.filter((uname) => item.username === uname.username)
            {/* console.log('like :: ' , like[0].likes) */}
            return(
            <View key={index}>
                <View style={styles.postInnerView}>
                  <Pressable style={styles.headerContainer} onPress={() => changeScreen.navigate('Detail', {items : items[0]})}>
                    <Image source={{uri: items[0]?.profilePic }} style={styles.ProfilePic}/>
                    <Text style={styles.postName}>{items[0]?.username}</Text>
                  </Pressable>
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
                  <View style={styles.PostbottomView}>
                    <Pressable onPress={() => {handleLikePost(item._id)}}>
                      {checkLike ? (
                        <FontAwesome name="heart" size={24} color="#8a87cd" />
                      ) : (
                        <Feather name="heart" size={22} color="#665da5" />
                      )}
                    </Pressable>
                    {openr === item._id ? (
                      <View>
                        <Pressable onPress={() => {setOpenr(''); setReply('')}} style={styles.respondBtn}>
                          <Text style={styles.respondText}>close respond</Text>
                        </Pressable>
                      </View>
                      
                    ) : (
                      <Pressable onPress={() => {setOpenr(item._id); setReply(''); fetchAllRepliesOfaPost(item._id)}} style={styles.respondBtn}>
                        <Text style={styles.respondText}>respond</Text>
                      </Pressable>
                    )}
                  </View>
                  {openr === item._id && (
                      <View style={styles.replyMainView}>
                        <Text style={styles.totalReplyText}>total responses : <Text style={{color:'#000'}}>{item.totalReply}</Text></Text>
                        <ScrollView style={styles.textInputView2}>
                          <TextInput
                            value={reply}
                            onChangeText={(text) => setReply(text)}
                            multiline
                            autoFocus={false}
                            placeholder='Enter your response here.....'
                            style={styles.textInput}
                          />
                          <View style={{flexDirection:'row'}}>
                            <Pressable style={styles.SubmitView} onPress={() => {handleSubmitReply(item._id)}}>
                              <Text style={styles.uploadPostText}>respond</Text>
                            </Pressable>
                            <Pressable style={styles.cancelView} onPress={() => {setReply('')}}>
                              <Text style={styles.uploadPostText}>clear</Text>
                            </Pressable>
                          </View>
                          <View>
                            {replies.length > 0 && (
                              replies.map((r1, idx) => {
                                return (
                                <View key={idx} style={[styles.viewReplies, {backgroundColor:  username === r1.username && '#e8eaf7'} ]}>
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
                
                </View>
            </View>
          )})}
          <View style={{height:10}}/>
        </View>   
    
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainHeader: {
    fontSize: RFValue(19),
    fontWeight:'800',
    color:'#47436c',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: height*0.01,
    marginBottom: height*0.01
  },
  mainHeaderCaption : {
    fontSize: RFValue(12),
    fontWeight:'600',
    color:'#544d86',
    marginTop: height*0.01,
    marginBottom: height*0.01,
    textAlign:'center'
  },
  upperViewStyle: {
    backgroundColor:'#e0e1e9',
    marginVertical:height*0.04,
    marginHorizontal:width*0.05,
    paddingVertical:height*0.01,
    borderRadius:8,
    borderWidth:0.5,
    borderColor: '#9f9fda'
    // margin
  },
  uploadPostView: {
    marginLeft:'auto',
    marginHorizontal:width*0.02,
    backgroundColor:'#ebebeb',
    paddingHorizontal:width*0.05,
    paddingVertical:height*0.01,
    borderRadius:8,
    borderWidth:0.4,
    borderColor:'#9f9fda'
  },
  SubmitView : {
    marginRight:'auto',
    backgroundColor:'#cfe6d2',
    paddingHorizontal:width*0.05,
    paddingVertical:height*0.01,
    marginVertical: height*0.01,
    borderRadius:8,
    borderWidth:0.3,
    borderColor:'#76b27f'
  },
  cancelView : {
    marginLeft:'auto',
    backgroundColor:'#e6cfd0',
    paddingHorizontal:width*0.05,
    paddingVertical:height*0.01,
    marginVertical: height*0.01,
    borderRadius:8,
    borderWidth:0.3,
    borderColor:'#b57e80'
  },
  uploadPostText: {
    fontSize: RFValue(12),
    fontWeight:'600'
  },
  textInputView: {
    marginHorizontal: width*0.02,
    marginTop:height*0.01,
    paddingHorizontal:width*0.03,
    paddingTop:height*0.01,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius:8,
    // height:height*0.2
  },
  textInputView2: {
    // marginHorizontal: width*0.02,
    marginTop:height*0.01,
    // paddingHorizontal:width*0.03,
    paddingTop:height*0.01,
    borderRadius:8,
    // borderWidth:0.5
    // height:height*0.2
  },
  textInput : {
    backgroundColor:'#ebebeb',
    paddingHorizontal:width*0.03,
    paddingVertical:height*0.02,
    paddingTop:height*0.02,
    borderRadius:8,
    minHeight: height*0.1,
  },
  friendsQueryHeaderText: {
    fontSize:RFValue(14),
    textAlign:'center',
    fontWeight:'500',
    marginBottom:height*0.01,
    marginTop:-height*0.02
    // color:'#636363'
  },
  postInnerView: {
    marginHorizontal:width*0.03,
    paddingHorizontal:width*0.03,
    marginVertical:height*0.01,
    paddingVertical:height*0.0001,
    paddingBottom:height*0.001,
    backgroundColor:'#e0e1e9',
    borderRadius:8,
    borderWidth:0.5,
    borderColor:'#9f9fda',
    shadowColor:'#000',
    shadowOffset: {
        height:5,
        width:5
    },
    shadowOpacity:0.4,
    shadowRadius: 4,
    elevation:6
  },
  postName: {
    fontSize: RFValue(12),
    paddingVertical:height*0.01,
    fontWeight:'600',
    color:'#544d86'
  },
  ProfilePic: {
    height: width*0.07,
    width: width*0.07,
    borderRadius:70,
    borderWidth:0.5,
    borderColor: '#544d86'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems:'center',
    gap: width*0.02,
    paddingVertical:height*0.005,
    marginRight:'auto'
  },
  PostbottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'#faf',
    marginBottom:5,
    alignItems:'center'
  },
  respondBtn: {
    backgroundColor:'#e8eaf7',
    paddingVertical: height*0.005,
    paddingHorizontal: width*0.05,
    borderRadius:8,
    borderWidth:0.5,
    borderColor:'#8a87cd'
  },
  respondText: {
    color:'#47436c',
    fontSize: RFValue(11),
    fontWeight: '500'
  },
  totalReplyText: {
    color:'#4e4f4f',
    fontSize: RFValue(11),
    fontWeight: '500'
  },
  replyMainView: {
    borderWidth: 0.5,
    borderColor:'#9fa1da',
    marginBottom: 5,
    paddingHorizontal: width*0.03,
    paddingVertical: height*0.01,
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
})

export default UploadScreen