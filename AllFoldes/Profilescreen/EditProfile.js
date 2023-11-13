import { SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions, Pressable, Image, Alert, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { launchImageLibraryAsync } from 'expo-image-picker'
import * as ImagePicker from 'expo-image-picker';
import { RFValue } from 'react-native-responsive-fontsize'
import jwt_decode from 'jwt-decode'
import { AntDesign } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native'
import BackBtn from '../../BackBtn'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { CheckBox, ListItem } from 'react-native-elements'
import PostUpload from '../Loader/UploadPostLoading'
import EditProfileLoading from '../Loader/EditProfileLoading'
import { MaterialIcons } from '@expo/vector-icons';

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 50;

const EditProfile = () => {
    const changeScreen = useNavigation()
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [convertedimage, setConvertedImage] = useState('')
    const [gender, setGen] = useState('')
    const [collegeName, setCollege] = useState('')
    const [year, setYear] = useState('')
    const [favSubject, setFavSub] = useState('')
    const [profession, setProfession] = useState('')
    const [mobileNumber, setMobile] = useState('')
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)

    const placeCollege  = collegeName ? collegeName : 'ex : Lovely Professional University'
    const placeMobile  = mobileNumber ? mobileNumber : 'ex : 63045XXXXX'

    const CourseData = [
        {label: 'DSA', value: 'Data Structurs and Algorithms'},
        {label: 'C', value: 'C Language'},
        {label: 'Python', value: 'Python'},
        {label: 'C++', value: 'C++'},
        {label: 'AI', value: 'Artificial Intelligence'},
        {label: 'HTML', value: 'HTML'},
        {label: 'Java', value: 'Java'},
        {label: 'ML', value: 'Machine Learning'},
        {label: 'JavaScript', value: 'JavaScript'},
    ]

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
    const fetchUserdetails = async() => {
      try {
        setLoad(true)
        const response = await axios.get(`https://phoenix-optimum-hawk.ngrok-free.app/profile/${userId}`)
        const {user} = response.data
        setLoad(false)
        setUser(user)
        setImage(user.profilePic)
        setName(user.name)
        setProfession(user.profession)
        setCollege(user.generalDetails.collegeName)
        setFavSub(user.generalDetails.favSubject)
        setYear(user.generalDetails.year)
        setMobile(user.generalDetails.mobileNumber)
        setGen(user.generalDetails.gender)
      } catch (error) {
        console.log("error in Profile screen 35 : ", error)
      }
    }
    fetchUserdetails()
  },[userId]);

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri );
      }
    }
  };

  const handleSubmit = async() => {
    try {
        if(mobileNumber && (mobileNumber.length < 10)) {
            return Alert.alert('Please re-check the mobile number')
        }
        setLoading(true)
        axios.post('https://phoenix-optimum-hawk.ngrok-free.app/AddingGeneralDetaiils', {userId, profession, image, name, gender, collegeName, year, favSubject, mobileNumber})
            .then((response) => {
                Alert.alert('Details saved successfully')
                handleReset;
                setTimeout(() => {
                    setLoading(false)
                    changeScreen.goBack()
                }, 500);
            })
    } catch (error) {
        setLoading(false)
        console.log("Error in hadleSubmit : ",error)
    }
  }

  const handleLogOut = () => {
    Alert.alert(
        'Logout','Do you want to Logout',
        [
            {text:'Cancel', style:'cancel'},
            {text:'Logout', onPress: () => {clearAuthToken()}},
        ]
    )
  }

  const clearAuthToken = async() => {
    await AsyncStorage.removeItem('authToken')
    console.log('Auth token removed successfully logged out .....')
    const resetAction = CommonActions.reset({
        index: 0, 
        routes: [{ name: 'Login' }],
      });
    changeScreen.dispatch(resetAction);
  }

  const handleDelete = () => {
    Alert.alert(
        'Delete Account',
        'Are you sure want to delete your account permenently !',
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: async() => {
                    try {
                        setLoading(true)
                        await axios.delete(`https://phoenix-optimum-hawk.ngrok-free.app/DeleteAccount/${userId}`)
                        await clearAuthToken();
                        setLoading(false)
                    } catch (error) {
                        setLoading(false)
                        console.log('Error while deleting line 130',error)
                    }
                }
            },
        ]
    )
  }

  const handleReset = () => {
    setMobile('')
    setCollege('')
    setFavSub('')
    setGen('')
    // setImage(null)
    setProfession('')
    setYear('')
    setName('')
  }

  const toggleCourse = (value) => {
    if (favSubject.includes(value)) {
      setFavSub(favSubject.filter((course) => course !== value));
    } else {
      setFavSub([...favSubject, value]);
    }
  };
//   console.log(favSubject)

  return (
    <View style={{flex:1, backgroundColor:'#fff', marginTop:statusBarHeight}}>
        <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
    {loading && <PostUpload/>}
    {load && <EditProfileLoading/>}
    <ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:height*0.02}}>
            <BackBtn/>
            <Text style={styles.editProfile}>Edit Profile</Text>
            <View style={{width:24}}/>
        </View>
      <View>
        <Pressable style={styles.imageViewStyle}>
            {image != null ? (
                <>
                    <Image source={{uri : image}} style={{width:height*0.15, height:height*0.15, borderRadius:height*0.1}}/>
                    {/* <AntDesign name="pluscircle" size={height*0.03} color="#3f4040" style={styles.addSymbol}/> */}
                </>
            ) : (
                <>
                    <Image source={{uri : user?.profilePic}} style={{width:height*0.15, height:height*0.15, borderRadius:height*0.1}}/>
                    {/* <AntDesign name="pluscircle" size={height*0.03} color="#3f4040" style={styles.addSymbol}/> */}
                </>
            )}
        </Pressable>
        <View style={styles.a}>
            <Text style={styles.sampleText}>Name : </Text>
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder={name}
                placeholderTextColor={'#9e9d9d'}
                autoFocus={false}
                style={styles.inputView}
            />
        </View>
        <View style={styles.a}>
            <Text style={styles.sampleText}>Status : </Text>
            <TextInput
                value={profession}
                onChangeText={(text) => setProfession(text)}
                placeholder={profession}
                placeholderTextColor={'#9e9d9d'}
                autoFocus={false}
                style={styles.inputView}
            />
        </View>
        <View style={styles.a}>
            <Text style={styles.sampleText}>College name : </Text>
            <TextInput
                value={collegeName}
                onChangeText={(text) => setCollege(text)}
                placeholder={placeCollege}
                placeholderTextColor={'#9e9d9d'}
                autoFocus={false}
                style={styles.inputView}
            />
        </View>
        <View style={styles.a}>
            <Text style={styles.sampleText}>Current year of study : </Text>
            <RadioButtonGroup 
                containerStyle={
                    {flexDirection:'row', 
                        paddingVertical:height*0.01,
                        flex:1, 
                        justifyContent:'space-evenly',
                    }}
                selected={year} 
                style={{ transform: [{ scale: 0.1 }] }}
                onSelected={(val) => setYear(val)} 
                radioBackground={'#0095F6'}>
                <RadioButtonItem style={{ transform: [{ scale: 0.8 }] }} value={'1st year'} label={
                    <Text style={styles.radioButtonTextStyles}>1</Text>
                }/>
                <RadioButtonItem style={{ transform: [{ scale: 0.8 }] }} value={'2nd year'} label={
                    <Text style={styles.radioButtonTextStyles}>2</Text>
                }/>
                <RadioButtonItem style={{ transform: [{ scale: 0.8 }] }} value={'3rd year'} label={
                    <Text style={styles.radioButtonTextStyles}>3</Text>
                }/>
                <RadioButtonItem style={{ transform: [{ scale: 0.8 }] }} value={'4th year'} label={
                    <Text style={styles.radioButtonTextStyles}>4</Text>
                }/>
            </RadioButtonGroup>
        </View>
        <View style={styles.b}>
        <Text style={{fontSize:RFValue(14), fontWeight:'600', color:'#525252', marginTop:10}}>Select favourite subjects </Text>
            <View style={{flexDirection:'row',justifyContent:'flex-start', flexWrap:'wrap'}} >
                {CourseData?.map((item, index) => (
                    <ListItem key={index} containerStyle={{ padding:0, margin:0, gap: -width*0.02 }}>
                        <CheckBox
                            checked={favSubject.includes(item?.value)}
                            onPress={() => toggleCourse(item?.value)}
                            containerStyle={{
                                backgroundColor: 'transparent', // Remove the background color
                                // borderWidth: 0, // Remove the border
                            }}
                            checkedIcon={<MaterialIcons name="radio-button-on" size={24} color="#0095F6" />}
                        />
                        <Text style={styles.labelStyle}>{item?.label}</Text>
                    </ListItem>
                ))}
            </View>
        </View>
        <View style={[styles.a, {borderColor: mobileNumber && (mobileNumber.length === 10? 'green' : mobileNumber.length === 0 ? '#d7d7d7' : 'red')}]}>
            <Text style={styles.sampleText}>Mobile number : </Text>
            <TextInput
                value={mobileNumber}
                onChangeText={(text) => setMobile(text)}
                placeholder={placeMobile}
                keyboardType='number-pad'
                placeholderTextColor={'#9e9d9d'}
                autoFocus={false}
                style={styles.inputView}
            />
        </View>
        <View style={styles.a}>
            <Text style={styles.sampleText}>Gender : </Text>
            <RadioButtonGroup 
                containerStyle={
                    {flexDirection:'row', 
                        paddingVertical:height*0.01,
                        flex:1, 
                        justifyContent:'space-evenly',
                    }}
                selected={gender} 
                onSelected={(val) => setGen(val)} 
                radioBackground={'#0095F6'}>
                <RadioButtonItem style={{ transform: [{ scale: 0.8 }] }} value={'Male'} label={
                    <Text style={styles.radioButtonTextStyles}>Male</Text>
                }/>
                <RadioButtonItem style={{ transform: [{ scale: 0.8 }] }} value={'Female'} label={
                    <Text style={styles.radioButtonTextStyles}>Female</Text>
                }/>
            </RadioButtonGroup>
        </View>
      </View>
      <View style={styles.resetView}>
        <Pressable onPress={handleReset}>
            <Text style={styles.resetText}>Clear data</Text>
        </Pressable>
      </View>

        <Pressable style={styles.submit} onPress={handleSubmit}>
            <Text style={{fontSize: RFValue(14)}}>Submit</Text>
        </Pressable>

        <View style={styles.delLog}>
            <Pressable style={styles.delete} onPress={handleDelete}>
                <Text style={{fontSize: RFValue(12)}}>Delete Account</Text>
            </Pressable>
            <Pressable style={styles.delete} onPress={handleLogOut}>
                <Text style={{fontSize: RFValue(12)}}>Logout Account</Text>
            </Pressable>
        </View>
        <View style={{height: height*0.04}}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    editProfile: {
        fontSize:RFValue(16),
        fontWeight:'700',
        color:'#333332',
    },
    inputView: {
        fontSize:RFValue(12),
        flex:1,
        fontWeight:'500',
        paddingVertical: height*0.013,
    },
    imageContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:width*0.1
    },
    imageViewStyle:{
        alignItems:'center',
        marginVertical:height*0.01
    },
    addSymbol: {
        position:'absolute',
        top:height*0.122,
        right:(width-width/2-height*0.05)
    },
    submit: {
        paddingHorizontal:width*0.1,
        paddingVertical: height*0.01,
        backgroundColor:'#ebeded',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom: height*0.02,
        marginTop: height*0.01,
        borderRadius:8,
    },
    delLog:{
        flexDirection:'row'
    },
    delete: {
        paddingHorizontal:width*0.05,
        paddingVertical: height*0.01,
        backgroundColor:'#ffebeb',
        marginLeft:'auto',
        marginRight:'auto',
        // marginVertical: height*0.03,
        borderRadius:8
    },
    a: {
        // flex:1,
        flexDirection:'row',
        paddingHorizontal: width*0.015,
        marginHorizontal: width*0.05,
        marginVertical: height*0.01,
        borderWidth: 0.5,
        marginBottom: 7,
        borderRadius: 5,
        borderColor: '#d7d7d7',
        alignItems:'center'
    },
    b: {
        // paddingHorizontal: width*0.015,
        marginHorizontal: width*0.05,
        marginVertical: height*0.01,
        borderWidth: 1,
        marginBottom: 7,
        borderRadius: 5,
        borderColor: '#d7d7d7',
        alignItems:'center'
    },
    sampleText: {
        fontSize: RFValue(10),
        fontWeight:'400'
    },
    radioButtonTextStyles: {
        fontSize: RFValue(12),
        fontWeight:'600',
        marginLeft:width*0.03
    },
    resetView: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:width*0.05
    },
    resetText: {
        fontSize: RFValue(10),
        color: '#0095F6',
        fontWeight:'500'
    },
    labelStyle: {
        fontSize: RFValue(10),
        fontWeight:'500',
        color:'#7a7a7a'
    },
})

export default EditProfile