import { Alert, Dimensions, Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LoginSignUpLoader from './Loader/LoginSignUpLoader';
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';


const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')
const gmail = /@gmail\.com$/;


const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [epress, setEpress] = useState(false)
    const [username, setUserName] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [allUsers, setAllUsers] = useState([]);
    const [load, setLoad] = useState(false)
    const [check, setCheck] = useState(false)
    const [visible, setVisible] = useState(false)
    const [showpass, setShowpass] = useState(true);
    const ChangeScreen = useNavigation()

    const logo = require('../assets/myLogo.jpg')
    const fetchAllUsers = async () => {
        try {
            const response = await axios.get('https://letslearn-production.up.railway.app/all-users');
            const { users } = response.data;

            if (users && users.length > 0) {
                setAllUsers(users.reverse());
            } else {
                console.log('No users Array found.');
            }
            // console.log('allUsers 1 : ', allUsers)
        } catch (error) {
            console.log('Error while fetching all users:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
          fetchAllUsers();
        },[])
    )
    useEffect(() => {
        const username2 = username.trim();
        const pass2 = password.trim();
        const email2 = email.trim()
    
        setUserName(username2);
        setPassword(pass2)
        setEmail(email2)
      },[username,password, email])

    const handleSignUpButton = () => {
        const name2 = name.trim();
        setName(name2)
        setEpress(false)
        fetchAllUsers();
        if(!name) {
            return Alert.alert('Name field mandatory')
        }
        if(!email) {
            return Alert.alert('Email field mandatory')
        }
        else {
            
            if(!gmail.test(email)) {
                return Alert.alert('Please enter a valid gmail Account')
            }
        }
        if(!username) {
            return Alert.alert('UserName field mandatory')
        }
        if(!password) {
            return Alert.alert('Password field mandatory')
        }
        if(!check) {
            return Alert.alert('Please agree terms and conditions');
        }
        const user =  {
            name:name,
            email:email,
            username:username,
            password: password
        }
        setLoad(true)
        {allUsers && allUsers?.map((item) => {
            if(item.username === username) {
                setLoad(false)
                return Alert.alert('Username Exists', 'Please try another Username')
            }
            if(item.email === email) {
                setLoad(false)
                return Alert.alert('Email Exists', 'Please Login email already exists')
            }
        })}
        if(username.length < 8) {
            setLoad(false)
            return Alert.alert('Username length should be greater than 8')
        }
        if(password.length < 8) {
            setLoad(false)
            return Alert.alert('Password length should be greater than 8')
        }
        console.group('User : : ; ', user)

                    // https://ec2a-2409-40d1-1d-6926-bd03-fd60-bb30-25eb.ngrok-free.app
        axios.post('https://letslearn-production.up.railway.app/register', user).then((response) => {
                existsemail = response.status;
                console.log('response from register Screen ✅✅✅ : ', user)
                Alert.alert(`Please verify the link sent to ${email}`)
                setEmail('')
                setName('')
                setPassword('')
                setUserName('')
                setLoad(false)
                ChangeScreen.navigate('Login')
            }).catch((err) => {
                setLoad(false)
                console.log('Registration failed , : ', err)
            })

        // console.log('User :✅✅✅ :  ', user)
    }
    
  return (
    
    <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content"/>
       
    <ScrollView >
        <Pressable style={styles.headerView} onPress={() => {setVisible(false)}}>
            <Text style={styles.headerStyle}>WELCOME TO LET'S LEARN</Text>
            <Image style={styles.LogoStyle} source={logo} />
            <Text style={[styles.headerStyle, {marginTop:width*0.05}]}>Signup</Text>
        </Pressable>
        
        <Pressable style={styles.textInputMainView} onPress={() => {setVisible(false)}}>
            <Pressable style={styles.textInputView}>
                <TextInput
                    value={name}
                    onPressIn={() => {setEpress(false); setVisible(false)}}
                    onChangeText={(text) => setName(text)}
                    placeholder='name'
                    placeholderTextColor='gray'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={false}
                    style={styles.textInput}
                />
            </Pressable>
            <Pressable style={styles.textInputView} >
                <TextInput
                    value={email}
                    onPressIn={() => {setEpress(true); setVisible(false)}}
                    onChangeText={(text) => setEmail(text)}
                    placeholder='email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    // autoFocus = {true}
                    autoCorrect={false}
                    placeholderTextColor='gray'
                    autoFocus={false}
                    onpre
                    style={styles.textInput}
                />
            </Pressable>
            {epress && <Text style={styles.requiredTextStyle}>please use valid gmail for verifying the email</Text>}
            <Pressable style={[styles.textInputView, 
                {borderColor: username.length >= 1 && username.length < 8 ? 'red' : username.length == 0 ? '#c9c9c9' : 'green'} 
            ]} >
                <TextInput
                    value={username}
                    onPressIn={() => {setEpress(false); setVisible(false)}}
                    onChangeText={(text) => setUserName(text)}
                    placeholder='username'
                    placeholderTextColor='gray'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={false}
                    style={styles.textInput}
                />
            </Pressable>
            <Pressable style={[styles.textInputView, 
                {borderColor: password.length >= 1 && password.length < 8 ? 'red' : password.length == 0 ? '#c9c9c9' : 'green'} 
            ]} >
                <TextInput
                    value={password}
                    onPressIn={() => {setEpress(false)}}
                    onChangeText={(text) => setPassword(text)}
                    placeholder='password'
                    placeholderTextColor='gray'
                    autoCapitalize='none'
                    textContentType='password'
                    autoCorrect={false}
                    autoFocus={false}
                    secureTextEntry={showpass}
                    style={styles.textInput}
                />
                {showpass ? (
                  <TouchableOpacity onPress={() => {setShowpass(!showpass)}} style={styles.showpassStyle}>
                    <Ionicons name="ios-eye-off-outline" size={24} color="gray" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => {setShowpass(!showpass)}} style={styles.showpassStyle}>
                    <Ionicons name="ios-eye-outline" size={24} color="gray" />
                  </TouchableOpacity>
                )}
            </Pressable>
            <View style={styles.checkBoxmainStyles}>
                {check ? (
                    <TouchableOpacity onPress={() => {setCheck(false)}}>
                        <MaterialIcons name="check-box" size={24} color="gray" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => {setCheck(true)}}>
                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => {setVisible(!visible)}}>
                    <Text style={styles.termsStyle}><Text style={{color:'#000'}}>Agree</Text> terms and conditions *</Text>
                </TouchableOpacity>
                
            </View>
            
        </Pressable>

        <Pressable style={styles.loginPressable} onPress={handleSignUpButton}>
            {load ? (
                <LoginSignUpLoader/>
            ) : (
                <Text style={styles.loginText}>SignUp</Text>
            )}
        </Pressable>

        <Pressable style={styles.signupPressable} onPress={() => ChangeScreen.navigate('Login')}>
            <Text style={styles.signupText}>Already have an account? Login</Text>
        </Pressable>
        </ScrollView>

        {/* 
Last updated: [Date] */}

        {visible && (
            <View style={styles.modalStyles}>
                <TouchableOpacity style={styles.crossStyle} onPress={() => {setVisible(false)}}>
                    <Entypo name="chevron-down" size={24} color="gray" />
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScrollStyle}>
                    <Text style={styles.TermsTextStyle}>Terms and Conditions - Let's Learn :</Text>
                    <Text style={styles.TermsTextStyle2}>Welcome to Let's Learn! By creating an account and using our services, you agree to the following terms and conditions:</Text>
                    <Text style={styles.TermsTextStyle}>Account Creation and User Information:</Text>
                    <Text style={styles.TermsTextStyle2}>You must provide accurate and complete information during the account creation process.</Text>
                    <Text style={styles.TermsTextStyle2}>You are responsible for maintaining the confidentiality of your account credentials.</Text>
                    <Text style={styles.TermsTextStyle}>Email Verification:</Text>
                    <Text style={styles.TermsTextStyle2}>A valid email address is required for account creation.</Text>
                    <Text style={styles.TermsTextStyle2}>Upon registration, a verification link will be sent to your provided email address. You must verify your email to access our services.</Text>
                    <Text style={styles.TermsTextStyle}>User Conduct:</Text>
                    <Text style={styles.TermsTextStyle2}>You agree to use Let's Learn for educational purposes only.</Text>
                    <Text style={styles.TermsTextStyle2}>Any form of abusive, offensive, or inappropriate behavior is strictly prohibited.</Text>
                    <Text style={styles.TermsTextStyle}>Access to Courses:</Text>
                    <Text style={styles.TermsTextStyle2}>All courses on Let's Learn are provided free of charge.</Text>
                    <Text style={styles.TermsTextStyle2}>You have access to all courses upon successful account creation and email verification.</Text>
                    <Text style={styles.TermsTextStyle}>Intellectual Property:</Text>
                    <Text style={styles.TermsTextStyle2}>The content, including but not limited to text, images, videos, and animations, provided on Let's Learn is the intellectual property of Let's Learn. You may not reproduce, distribute, or modify any content without explicit permission.</Text>
                    <Text style={styles.TermsTextStyle}>Data Privacy:</Text>
                    <Text style={styles.TermsTextStyle2}>Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and safeguard your information.</Text>
                    <Text style={styles.TermsTextStyle}>Termination of Account:</Text>
                    <Text style={styles.TermsTextStyle2}>Let's Learn reserves the right to terminate or suspend your account if you violate any of the terms and conditions.</Text>
                    <Text style={styles.TermsTextStyle}>Changes to Terms:</Text>
                    <Text style={styles.TermsTextStyle2}>Let's Learn may update these terms and conditions. It is your responsibility to review them periodically. Continued use of the service after changes constitutes acceptance of the new terms.</Text>
                    <Text style={styles.TermsTextStyle}>Contact Information:</Text>
                    <Text style={styles.TermsTextStyle2}>For any inquiries or concerns regarding these terms, please contact us at teamcoderid@gmail.com</Text>
                    <Text style={styles.TermsTextStyle}>By creating an account on Let's Learn, you acknowledge that you have read, understood, and agreed to these terms and conditions.</Text>
                </ScrollView>
            </View>
        )}
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    
    headerView: {
        // flex:0.1,
        alignItems:'center',
        marginTop:height*0.1, 
        marginBottom:height*0.01, 
        // backgroundColor:'gray'
    },
    headerStyle: {
        fontSize: RFValue(16),
        fontWeight:'800'
    },
    textInputMainView: {
        // marginHorizontal:90
        marginHorizontal:width*0.09
    },
    textInputView: {
        // flexDirection: 'row',
        backgroundColor: '#fafafa',
        // alignItems: 'center',
        justifyContent: 'center',
        // gap: 8,
        borderRadius: RFValue(5),
        paddingLeft: width*0.03,
        marginTop: height*0.03,
        borderWidth: width*0.001,
        borderColor: '#c9c9c9',
        shadowColor:'#000',
        shadowOffset: {
            height:5,
            width:5
        },
        shadowOpacity:0.2,
        shadowRadius: 5,
        elevation:5
    },
    showpassStyle: {
        position:'absolute',
        marginLeft:width-width * 0.19-width * 0.09,
    },
    textInput: {
        width: (width- 2*width*0.09),
        height: height*0.05,
        fontWeight: '600',
        fontSize:RFValue(12)
    },
    loginPressable: {
        width: width*0.4,
        height: height*0.04,
        marginTop:height*0.03,
        marginBottom:height*0.05,
        marginRight:'auto',
        marginLeft:'auto',
        backgroundColor:'#e6e6e6',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: RFValue(6),
        
    },
    loginText: {
        fontSize:RFValue(15),
        fontWeight:'700',
    },
    signupPressable: {
        marginLeft:'auto',
        marginRight:'auto'
    },
    signupText: {
        fontSize:RFValue(11),
        fontWeight:'500',
    },
    requiredTextStyle: {
        fontSize:RFValue(10),
        paddingLeft: width*0.03,
        fontWeight: '500',
        color:'#8f8f8f'
    },
    LogoStyle: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.2,
        marginTop: height * 0.03,
        borderWidth:2,
        borderColor:'#e8eeff',
        resizeMode:'contain'
    },
    checkBoxmainStyles: {
        flexDirection:'row',
        alignItems:'center',
        paddingTop:height*0.02,
        gap: width*0.015
    },
    termsStyle: {
        fontSize: RFValue(11),
        fontWeight:'600',
        color: 'gray'
    },
    modalStyles: {
        height: height*0.6,
        backgroundColor:'#bfe0e2',
        position:'absolute',
        marginTop: height*0.4,
        // width: '100%',
        borderTopRightRadius:25,
        borderTopLeftRadius: 25,
        marginHorizontal:width*0.02
    },
    TermsTextStyle: {
        fontSize: RFValue(12),
        fontWeight: '500',
        width: '95%',
        paddingHorizontal: width*0.03,
        paddingBottom: height*0.005
        // paddingTop:height*0.02,
    },
    TermsTextStyle2: {
        fontSize: RFValue(11),
        fontWeight: '500',
        width: '95%',
        color:'gray',
        paddingHorizontal: width*0.03,
        marginLeft: width*0.03,
        paddingBottom: height*0.005
    },
    modalScrollStyle: {
        marginTop:height*0.01,
        marginBottom:height*0.07
    },
    crossStyle: {
        // backgroundColor:'#faf',
        marginLeft:'auto',
        marginRight:width*0.06,
        marginTop: 20
    },
})


export default RegisterScreen