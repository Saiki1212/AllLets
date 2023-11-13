import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from 'react-native-responsive-fontsize'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const DSADesign = () => {
  return (
    <View style={styles.mainDSATypeView}>
            <LinearGradient colors={[ '#1b0147', '#321563', '#523b7a']} 
              start = {{x:0.9, y:0.1}}
              end= {{x:0.3, y:0.7}}
              style={{borderRadius:12}}>
              <View style={styles.DSAType}>
                <Text style={styles.TypeName}>Linear Data Structure</Text>
                <View style={styles.typeViewView}>
                  <Text style={styles.TypeType}>Array</Text>
                  <Text style={styles.TypeType}>Linked List</Text>
                  <Text style={styles.TypeType}>Stack</Text>
                  <Text style={styles.TypeType}>Queue</Text>
                </View>
              </View>
              <View style={[styles.DSAType, {marginTop:-height*0.02}]}>
                <Text style={styles.TypeName}>Non-Linear Data Structure</Text>
                <View style={styles.typeViewView}>
                  <Text style={styles.TypeType}>Tree</Text>
                  <Text style={styles.TypeType}>Graph</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
  )
}

const styles = StyleSheet.create({
    mainDSATypeView: {
        marginHorizontal:width*0.02,
        marginTop: height*0.02,
        // paddingVertical:height*0.01,
        // backgroundColor:'#e6daaa'
      },
      DSAType: {
        paddingHorizontal: width*0.03,
        paddingTop: height*0.015,
      },
      TypeName : {
        color:'#989799',
        fontSize: RFValue(18),
        fontWeight:'700',
      },
      TypeType: {
        paddingBottom:height*0.009,
        color:'#fff',
        fontSize: RFValue(15),
        fontWeight:'700',
      },
      typeViewView: {
        paddingHorizontal: width*0.02,
        paddingVertical:height*0.02,
      },
})

export default DSADesign