import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const ArrayBinarySearchDesign = () => {
  return (
    <>
    <LinearGradient
      colors={['#696969', '#404040', ]}
      start = {{x:0.9, y:0.4}}
        end= {{x:0.3, y:0.2}}
      style={styles.mainHeader}
    >
      <Text style={styles.TextHeader}>Binary Search</Text>
      <View>
        <View style={styles.ArrayStyle}>
          <View style={styles.view11}>
            <Text style={{ fontSize: RFValue(13), fontWeight: '700' }}>4</Text>
          </View>
          <View style={styles.view1}>
            <Text style={{ fontSize: RFValue(13), fontWeight: '700' }}>6</Text>
          </View>
          <View style={styles.view1}>
            <Text style={{ fontSize: RFValue(13), fontWeight: '700' }}>9</Text>
          </View>
          <View style={styles.view1}>
            <Text style={{ fontSize: RFValue(13), fontWeight: '700' }}>11</Text>
          </View>
          <View style={styles.view12}>
            <Text style={{ fontSize: RFValue(13), fontWeight: '700' }}>15</Text>
          </View>
        </View>
      </View>
      <Text style={styles.sampleText}>
        Binary Search is an efficient search algorithm that works on sorted arrays. It
        works by repeatedly dividing the search interval in half.
        Take taget as 11.
      </Text>
      <Text style={styles.sampleText}>We first find's the mid index of array and 
        and check <Text style={styles.highLightText}>newArray [midIndex] == target</Text>
        then return or else try to move towards right part of the array when <Text style={styles.highLightText}>newArray [midIndex] less than target </Text>
        else move to left part of the array.
      </Text>
      <Text style={styles.sampleText}>
        If target found return index of target else return -1.
      </Text>
      <Text style={styles.sampleText}>
        Here we will get index of target as 3.
      </Text>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
    mainHeader: {
        backgroundColor:'#dedede',
        marginHorizontal: width*0.03,
        marginTop:height*0.02,
        paddingVertical:height*0.01,
        paddingHorizontal:width*0.03,
        borderRadius:12,
        // gap:height*0.02
    },
    TextHeader: {
        fontSize: RFValue(20),
        fontWeight:'700',
        color:'#fff',
        marginBottom:height*0.02
    },
    ArrayStyle: {
        flexDirection:'row',
        marginLeft:'auto',
        marginRight:'auto',
        // marginBottom:height*0.02,
        // gap:width*0.1,
    },
    view1: {
        borderWidth:0.2,
        paddingHorizontal:width*0.07,
        paddingVertical:height*0.02,
        backgroundColor:'#06d6a0',
    },
    view11: {
        borderWidth: 0.2,
        paddingHorizontal:width*0.07,
        paddingVertical:height*0.02,
        borderTopLeftRadius:6,
        borderBottomLeftRadius:6,
        backgroundColor:'#06d6a0',
    },
    view12: {
        borderWidth: 0.2,
        paddingHorizontal:width*0.07,
        paddingVertical:height*0.02,
        borderTopRightRadius:6,
        borderBottomRightRadius:6,
        backgroundColor:'#06d6a0',
    },
    indexTextStyle: {
        paddingHorizontal:width*0.07,
        paddingVertical:height*0.001,
        fontSize:RFValue(10),
        fontWeight:'700',
        color: '#d6d6d6'
        // backgroundColor:'#faf'
    },
    sampleText: {
        fontSize:RFValue(11), 
        fontWeight:'500', 
        marginTop:height*0.015,
        color: '#cccccc'
    },
    highLightText: {
        fontSize:RFValue(12), 
        fontWeight:'500',
        color:'#02eb82'
    },
    
})

export default ArrayBinarySearchDesign