import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const ArrayTraversingDesign = () => {
  return (
    <LinearGradient 
        colors={['#6e4c0d', '#805b10']} 
        start = {{x:0.3, y:0.4}}
        end= {{x:0.9, y:0.9}}
        style={styles.mainHeader}>
        <Text style={styles.TextHeader}>Array Traversing</Text>
        <View>
            <View style={styles.ArrayStyle}>
                <View style={styles.view11}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>7</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>9</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>5</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>1</Text>
                </View>
                <View style={styles.view12}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>3</Text>
                </View>
            </View>
            <View style={styles.ArrayStyle}>
                <Text style={styles.indexTextStyle}>0</Text>
                <Text style={styles.indexTextStyle}>1</Text>
                <Text style={styles.indexTextStyle}>2</Text>
                <Text style={styles.indexTextStyle}>3</Text>
                <Text style={styles.indexTextStyle}>4</Text>
            </View>
        </View>

        <Text style={styles.sampleText}>Now how to traverse over the Array elements</Text>
        <Text style={styles.sampleText}>Let's assume Array name as " newArray ".</Text>
        <Text style={styles.sampleText}>Take a for for loop which starts from index 0 and goes upto index 4.</Text>
        <Text style={styles.sampleText}>When i goes to 0 to 4 then print the value at that index as <Text style={styles.highLightText}>newArray [i] = 7</Text>, because initially the value of i is 0 and the value at index 0 is 7.</Text>
        <Text style={styles.sampleText}>Then <Text style={styles.highLightText}>newArray [i] = 9</Text>, because the value of i is incremented in for, then it becomes <Text style={styles.highLightText}>i = 1</Text>, then the value at index 1 is 9.</Text>
        <Text style={styles.sampleText}>Next : <Text style={styles.highLightText}>newArray [i] = 5</Text> and <Text style={styles.highLightText}>i = 2,</Text></Text>
        <Text style={styles.sampleText}><Text style={styles.highLightText}>newArray [i] = 1</Text> and <Text style={styles.highLightText}>i = 3,</Text></Text>
        <Text style={styles.sampleText}><Text style={styles.highLightText}>newArray [i] = 3</Text> and <Text style={styles.highLightText}>i = 4 .</Text></Text>
        <Text style={styles.sampleText}>Then the loop ends at <Text style={styles.highLightText}>i = 5 </Text> and it won't check for <Text style={styles.highLightText}>newArray [5].</Text></Text>
        

    </LinearGradient>
  )
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

export default ArrayTraversingDesign