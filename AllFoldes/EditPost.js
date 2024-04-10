import { Dimensions, Platform, StyleSheet, Text, View,StatusBar, Image, ScrollView, TextInput, Pressable, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import BackBtn from '../BackBtn'
import axios from 'axios'
import UploadPostLoading from './Loader/UploadPostLoading'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 50;

const EditPost = ({}) => {

    const route = useRoute();
    const post1 = route.params.postinfo;
    const user = route.params.user;
    const changeScreen = useNavigation()
    const [changeText, setChangeText] = useState(post1.post)
    const [load, setLoad] = useState(false)

    const handleSubmit  = async() => {
        const finalText = changeText.trim();
        if(post1.post === finalText) {
            return Alert.alert('Post not changed');
        }
        if(!finalText) {
            return Alert.alert('Post should not be empty');
        }

        try {
            const postid = post1._id;
            const post = finalText;
            setLoad(true)
            const response = await axios.post('https://letslearn-production.up.railway.app/EditPost', {postid, post})
            setLoad(false)
            Alert.alert('Post changed');
            setTimeout(() => {
                changeScreen.goBack();
            },  500);
        } catch (error) {
            setLoad(false)
            console.log('Error in editpost : ', error)
        }
    }

  return (
    <View style={{flex:1, paddingTop: statusBarHeight+10}}>
    {/* <Text>{post._id}</Text> */}
        {load && <UploadPostLoading/> }
        <BackBtn/>
        <Text style={styles.editPostheader}>Edit Post</Text>
        <View>
            {user && (
                <View>
                   <View style={styles.profileView}>
                        <Image source={{uri : user.profilePic}} style={styles.profilepic}/>
                        <Text style={styles.profileUsername}>{user.username}</Text>
                        <Pressable style={styles.clearBtn} onPress={() => {setChangeText(post1.post)}}>
                            <Text style={{fontSize: RFValue(20), color: '#776ebd'}}>🅇</Text>
                        </Pressable>
                    </View>
                    <ScrollView>
                        <TextInput
                            value={changeText}
                            onChangeText={(text) => setChangeText(text)}
                            multiline
                            autoFocus={false}
                            placeholder={changeText}
                            style={styles.textInput}
                        />
                        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </Pressable>
                    </ScrollView>
                </View>
                
            )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    editPostheader: {
        fontSize: RFValue(17),
        fontWeight: '600',
        color: '#1b2d50',
        marginRight:'auto',
        marginLeft: 'auto'
    },
    profileView: {
        flexDirection:'row',
        gap: width*0.03,
        alignItems:'center',
        marginTop: height*0.04,
        marginBottom: height*0.01,
        marginHorizontal:width*0.03
    },
    profilepic: {
        height: height*0.035,
        width: height*0.035,
        borderRadius: height*0.035,
        resizeMode: 'cover'
    },
    profileUsername: {
        fontSize: RFValue(13),
        fontWeight:'600',
        color: "#254783",
    },
    clearBtn: {
        marginLeft:'auto',
    },
    textInput : {
        backgroundColor:'#d5d9f0',
        paddingHorizontal:width*0.03,
        marginHorizontal:width*0.03,
        paddingVertical:height*0.02,
        paddingTop:height*0.02,
        borderRadius:8,
        minHeight: height*0.1,
        borderWidth:0.5,
        borderColor:'#776ebd',
        color: '#2a273f',
        fontSize: RFValue(12),
        fontWeight:'500'
    },
    submitBtn: {
        marginRight:'auto',
        marginLeft: 'auto',
        backgroundColor:'#6ab4f0',
        paddingHorizontal: width*0.1,
        paddingVertical: height*0.01,
        borderRadius:12,
        marginTop: height*0.02
    },
    submitText: {
        fontSize: RFValue(14),
        fontWeight: '600',
        color: '#fff'
    },
})

export default EditPost