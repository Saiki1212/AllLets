import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const ArrayLinearSearchDesign = () => {
  return (
    <LinearGradient 
        colors={[ '#334753', '#65747b',]} 
        start = {{x:0.3, y:0.4}}
        end= {{x:0.9, y:0.9}}
        style={styles.mainHeader}>
        <Text style={styles.TextHeader}>Linear Search</Text>
        <View>
            <View style={styles.ArrayStyle}>
                <View style={styles.view11}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>2</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>4</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>6</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>8</Text>
                </View>
                <View style={styles.view12}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>9</Text>
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

        <Text style={styles.sampleText}>To Perform the Linear Search consider the above array named as newArray</Text>
        <Text style={styles.sampleText}>Here our target is <Text style={styles.highLightText}>target = 9</Text>, so that we have to search 9 in the newArray and have to return the index of target.</Text>
        <Text style={styles.sampleText}>Take a for for loop which starts from index 0 and goes upto 4 (Array length -1).</Text>
        <Text style={styles.sampleText}>When i goes to 0 to 4 then check the value at that index to target <Text style={styles.highLightText}>if (newArray [i] == target)</Text>, if it is true then print the index i value and return or else continue upto the end of the loop.</Text>
        <Text style={styles.sampleText}>If we goes to the end of the and still didn't get the index of target, then <Text style={styles.highLightText}>return -1</Text>, because the value of target not present in the give array.</Text>
        <Text style={styles.sampleText}>Here : <Text style={styles.highLightText}>if (newArray [i] == target)</Text> at that time <Text style={styles.highLightText}>i = 0 and 2 != 9</Text> it returns false then loop again</Text>
        <Text style={styles.sampleText}><Text style={styles.highLightText}>if (newArray [i] == target)</Text> at that time <Text style={styles.highLightText}>i = 1 and 4 != 9</Text> it returns false then loop again</Text>
        <Text style={styles.sampleText}><Text style={styles.highLightText}>if (newArray [i] == target)</Text> at that time <Text style={styles.highLightText}>i = 2 and 6 != 9</Text> it returns false then loop again</Text>
        <Text style={styles.sampleText}><Text style={styles.highLightText}>if (newArray [i] == target)</Text> at that time <Text style={styles.highLightText}>i = 3 and 8 != 9</Text> it returns false then loop again</Text>
        <Text style={styles.sampleText}><Text style={styles.highLightText}>if (newArray [i] == target)</Text> at that time <Text style={styles.highLightText}>i = 4 and 9 == 9</Text> it returns true then the loop breaks and prints the index of 9 as <Text style={styles.highLightText}>4.</Text></Text>

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

export default ArrayLinearSearchDesign