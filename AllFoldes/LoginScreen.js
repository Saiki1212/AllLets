import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LoginSignUpLoader from "./Loader/LoginSignUpLoader";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const ChangeScreen = useNavigation();
  const [showpass, setShowpass] = useState(true);
  const logo = require('../assets/myLogo.jpg')

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          try {
              const response = await axios.get('https://letslearn-production.up.railway.app/');
              setLoading(false);
              ChangeScreen.replace("BottomTabs");
          } catch (error) {
              console.log('Error in fetchget :', error);
          }
        }
        else setLoading(false);
      } catch (error) {
        console.log("Error checking loginStatus : ", error);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const username2 = username.trim();
    const pass2 = password.trim();

    setUsername(username2);
    setPassword(pass2)
  }, [username, password])

  const handleLogin = async () => {
    if (!username) {
      return Alert.alert("username mandatory");
    } else if (!password) {
      return Alert.alert("Password mandatory");
    }

    setLoad(true);

    try {
      const response = await axios.get(
        `https://letslearn-production.up.railway.app/profileByUsername?username=${username}`
      );
      const user = response.data.user;
      if (user.verify === false) {
        setLoad(false);
        Alert.alert("Please verify the link sent to your email !!!");
        return console.log("please verify the link sent to your email !!!");
      }
    } catch (error) {
      setLoad(false);
      Alert.alert("Invalid Username/email-id");
      return console.log("Error bro : ", error);
    }

    try {
      const user = {
        username: username,
        password: password,
      };
      const response = await axios.post(
        "https://letslearn-production.up.railway.app/login",
        user
      );
      const token = response.data.token;
      setLoad(false);
      if (token) {
        await AsyncStorage.setItem("authToken", token);
        // console.log('Token:', token);
        ChangeScreen.replace("BottomTabs");
      } else {
        Alert.alert("Invalid Password");
      }
    } catch (err) {
      setLoad(false);
      console.log("Error:", err);
      Alert.alert("Invalid details");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {loading ? (
        <LoginSignUpLoader />
      ) : (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >

          <View style={styles.headerView}>
            <Text style={styles.headerStyle}>WELCOME TO LET'S LEARN</Text>
            <Image style={styles.LogoStyle} source={logo} />
            <Text style={[styles.headerStyle, { marginTop: height * 0.03 }]}>
              Login
            </Text>
          </View>
          <View>
            <View style={styles.textInputMainView}>
              <View style={styles.textInputView}>
                <TextInput
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  placeholder="username / email-id"
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={false}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.textInputViewP}>
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="password"
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={false}
                  secureTextEntry={showpass}
                  style={styles.textInput}
                />
                {showpass ? (
                  <TouchableOpacity onPress={() => { setShowpass(!showpass) }} style={styles.showpassStyle}>
                    <Ionicons name="ios-eye-off-outline" size={24} color="gray" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => { setShowpass(!showpass) }} style={styles.showpassStyle}>
                    <Ionicons name="ios-eye-outline" size={24} color="gray" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <Pressable style={styles.forgotPasswordStyle} onPress={() => ChangeScreen.navigate('Forgot')}>
              <Text style={styles.forgotPasswordTextStyle}>Forgot password ?</Text>
            </Pressable>

            <Pressable style={styles.loginPressable} onPress={handleLogin}>
              {load ? (
                <LoginSignUpLoader />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </Pressable>

            <Pressable
              style={styles.signupPressable}
              onPress={() => {
                ChangeScreen.navigate("Register");
                setPassword("");
                setUsername("");
              }}
            >
              <Text style={styles.signupText}>
                Don't have an account? Signup
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    // flex:0.1,
    alignItems: "center",
    marginTop: height * 0.13,
    marginBottom: height * 0.01,
    // backgroundColor:'gray'
  },
  headerStyle: {
    fontSize: RFValue(16),
    fontWeight: "800",
  },
  textInputMainView: {
    // marginHorizontal:90
    marginHorizontal: width * 0.09,
  },
  textInputView: {
    // flexDirection: 'row',
    backgroundColor: "#fafafa",
    borderRadius: RFValue(5),
    paddingLeft: width * 0.03,
    marginTop: height * 0.03,
    borderWidth: width * 0.001,
    borderColor: "#c9c9c9",
    shadowColor: '#000',
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6
  },
  textInputViewP: {
    flexDirection: 'row',
    backgroundColor: "#fafafa",
    borderRadius: RFValue(5),
    paddingLeft: width * 0.03,
    marginTop: height * 0.03,
    borderWidth: width * 0.001,
    borderColor: "#c9c9c9",
    shadowColor: '#000',
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    alignItems: 'center',
  },
  showpassStyle: {
    position: 'absolute',
    marginLeft: width - width * 0.18 - width * 0.08,
  },
  textInput: {
    width: width - 2 * width * 0.09,
    height: height * 0.05,
    fontWeight: "600",
    fontSize: RFValue(12),
  },
  loginPressable: {
    width: width * 0.4,
    height: height * 0.04,
    marginTop: height * 0.03,
    marginBottom: height * 0.05,
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(6),
  },
  loginText: {
    fontSize: RFValue(15),
    fontWeight: "700",
  },
  signupPressable: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: height * 0.03,
  },
  signupText: {
    fontSize: RFValue(11),
    fontWeight: "500",
  },
  loadingLogoStyle: {
    width: width * 0.2,
    height: width * 0.2,
    borderWidth: 8,
    borderColor: "#acc",
  },
  LogoStyle: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.2,
    marginTop: height * 0.03,
    borderWidth: 2,
    borderColor: '#e8eeff',
    resizeMode: 'contain'
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(25,25,25)",
    paddingVertical: height * 0.001,
  },
  forgotPasswordStyle: {
    marginLeft: 'auto',
    marginRight: width * 0.09,
    marginTop: height * 0.015
  },
  forgotPasswordTextStyle: {
    color: '#0095f6',
    fontSize: RFValue(11),
    fontWeight: '600'
  },
});

export default LoginScreen;
