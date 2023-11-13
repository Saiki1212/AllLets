import { Alert, Dimensions, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import LoginSignUpLoader from './Loader/LoginSignUpLoader';
import { useNavigation } from '@react-navigation/native';
import BackBtn from '../BackBtn'
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [repass, setrePass] = useState('')
    const [user, setUser] = useState('')
    const [load, setLoad] = useState(false)
    const [start, setStart] = useState(false)
    const [showpass1, setShowpass1] = useState(true);
    const [showpass2, setShowpass2] = useState(true);
    const [otp, setOpt] = useState('');
    const changeScreen = useNavigation();

    const handleSubmit = async() => {
        if(!email && !pass && !repass) 
            return Alert.alert("All Fields are required");

        if(!email)
            return Alert.alert("Email Address is mandatory");

        if(!pass)
            return Alert.alert("Please enter new password");

        if(!repass)
            return Alert.alert("Please re-enter password");
        
        const pass2 = pass.trim()
        const repass2 = repass.trim()
        setPass(pass2)
        setrePass(repass2)

        if(repass !== pass) {
            return Alert.alert('❌   New password and re-password are not matching')
        }
        if(pass.length < 8 && repass.length < 8) {
            return Alert.alert('Password length must be greater than or equal to 8 characters')
        }

        setLoad(true)
        try {
            const response = await axios.get(
              `https://phoenix-optimum-hawk.ngrok-free.app/profileByEmail?email=${email}`
            );
            const user = response.data.user;
            setUser(user)
        } catch (error) {
            setLoad(false)
            Alert.alert("Invalid Email Address");
            return console.log("Error bro : ", error);
        }

        

        if(user.password === pass) {
            setLoad(false)
            return Alert.alert('Old-Password and New-Password are same. Please try another one.')
        }

        try {
            const response = await axios.post(
              "https://phoenix-optimum-hawk.ngrok-free.app/SendOtp",
              {email}
            );
            setLoad(false);
            Alert.alert('Otp sent to email successfully')
            setStart(true)
            // changeScreen.navigate('Login')
        } catch (err) {
            setLoad(false);
            Alert.alert("Error Please try after some time");
            return console.log("Error:", err);
        }
    }

    const handleOTP = async() => {
        try {
            setLoad(true)
            if(otp.length !== 4) {
                setLoad(false);
                return Alert.alert("Otp is of 4 digits.");
            }
            const response = await axios.post(
              "https://phoenix-optimum-hawk.ngrok-free.app/VerifyOtp",
              {email, otp}
            );
            setOpt('');
        } catch (err) {
            setLoad(false);
            Alert.alert("Error entering otp");
            return console.log("Error:", err);
        }

        try {
            const user = {
              email: email,
              pass: pass,
            };
            const response = await axios.post(
              "https://phoenix-optimum-hawk.ngrok-free.app/ResetPassword",
              user
            );
            setLoad(false);
            Alert.alert('Password reseted successfully')
            changeScreen.navigate('Login')
        } catch (err) {
            setLoad(false);
            console.log("Error:", err);
            Alert.alert("Error Please try after some time");
        }
    }

  return (
    <>
    
    <SafeAreaView style={{flex:1}}>
    <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
    <BackBtn/>
        <View style={{flex:1,justifyContent:'center'}}>
            <Text style={styles.headerText}>Forgot Password</Text>
            {start ? (
                <View style={styles.otpMainStyle}>
                    <Text>Enter otp sent to email</Text>
                    <Pressable style={styles.textInputView} >
                            <TextInput
                                value={otp}
                                onChangeText={(text) => setOpt(text)}
                                placeholder='OTP'
                                autoCapitalize='none'
                                keyboardType='number-pad'
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                autoFocus={false}
                                style={styles.textInput}
                            />
                        </Pressable>
                        <Pressable style={styles.PressableSubmit} onPress={handleOTP}>
                            {load ? <LoginSignUpLoader /> : <Text style={styles.TextSubmit}>Verify Otp</Text>}
                        </Pressable>
                </View>
            ) : (
                <View style={styles.OuterViewStyles}>
                    <Text style={[styles.TextSubmit, {fontSize:RFValue(10), textAlign:'center'}]}>To reset your password please enter correct Email id.</Text>

                    <View style={styles.textInputMainView}>
                        <Pressable style={styles.textInputView} >
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder='email-id'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoCorrect={false}
                                placeholderTextColor='gray'
                                autoFocus={false}
                                onpre
                                style={styles.textInput}
                            />
                        </Pressable>
                        <Pressable style={styles.textInputView} >
                            <TextInput
                                value={pass}
                                onChangeText={(text) => setPass(text)}
                                placeholder='new password'
                                placeholderTextColor='gray'
                                autoCapitalize='none'
                                textContentType='password'
                                autoCorrect={false}
                                autoFocus={false}
                                secureTextEntry={showpass1}
                                style={styles.textInput}
                            />
                            {showpass1 ? (
                                <TouchableOpacity onPress={() => {setShowpass1(!showpass1)}} style={styles.showpassStyle}>
                                    <Ionicons name="ios-eye-off-outline" size={24} color="gray" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => {setShowpass1(!showpass1)}} style={styles.showpassStyle}>
                                    <Ionicons name="ios-eye-outline" size={24} color="gray" />
                                </TouchableOpacity>
                            )}
                        </Pressable>
                        <Pressable style={styles.textInputView} >
                            <TextInput
                                value={repass}
                                onChangeText={(text) => setrePass(text)}
                                placeholder='confirm password'
                                placeholderTextColor='gray'
                                autoCapitalize='none'
                                textContentType='password'
                                autoCorrect={false}
                                autoFocus={false}
                                secureTextEntry={showpass2}
                                style={styles.textInput}
                            />
                            {showpass2 ? (
                                <TouchableOpacity onPress={() => {setShowpass2(!showpass2)}} style={styles.showpassStyle}>
                                    <Ionicons name="ios-eye-off-outline" size={24} color="gray" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => {setShowpass2(!showpass2)}} style={styles.showpassStyle}>
                                    <Ionicons name="ios-eye-outline" size={24} color="gray" />
                                </TouchableOpacity>
                            )}
                        </Pressable>
                    </View>
                    <Pressable style={styles.PressableSubmit} onPress={handleSubmit}>
                        {load ? <LoginSignUpLoader /> : <Text style={styles.TextSubmit}>Submit</Text>}
                    </Pressable>
                </View>
            )}
            
        </View>
            
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    headerText: {
        marginRight:'auto',
        marginLeft:'auto',
        fontSize: RFValue(16),
        fontWeight: '600',
        paddingBottom:50
    },
    OuterViewStyles: {
        marginHorizontal:10,
        paddingVertical:height*0.05,
        paddingHorizontal:width*0.03,
        borderRadius:8,
        backgroundColor:'#fff',
        shadowColor:'#000',
        shadowOffset: {
            height:5,
            width:5
        },
        shadowOpacity:0.2,
        shadowRadius: 5,
        elevation:5
    },
    textInputMainView: {
        marginHorizontal:width*0.05
    },
    textInputView: {
        flexDirection: 'row',
        backgroundColor: "#fafafa",
        borderRadius: RFValue(5),
        paddingLeft: width * 0.03,
        marginTop: height * 0.03,
        borderWidth: width * 0.001,
        borderColor: "#c9c9c9",
        shadowColor:'#000',
        shadowOffset: {
            height:5,
            width:5
        },
        shadowOpacity:0.2,
        shadowRadius: 5,
        elevation:6,
        alignItems:'center',
    },
    showpassStyle: {
        position:'absolute',
        marginLeft:width-width * 0.18-width * 0.12,
      },
    textInput: {
        width: (width- 2*width*0.09),
        height: height*0.05,
        fontWeight: '600',
        fontSize:RFValue(12)
    },
    PressableSubmit: {
        marginRight:'auto',
        marginLeft:'auto',
        marginVertical:height*0.02,
        marginTop: height*0.04,
        backgroundColor:'#f2f7f5',
        height: height*0.04,
        width: width*0.3,
        borderRadius:8,
        borderWidth:0.7,
        borderColor:'#c1d9cd',
        justifyContent:'center',
        alignItems:'center'
    },
    TextSubmit: {
        fontSize: RFValue(12),
        fontWeight: '600',
        color:'#1f352e',
        // textAlign:'center'
    },
    otpMainStyle: {
        marginHorizontal: width/5
    },
})


export default ForgotPassword