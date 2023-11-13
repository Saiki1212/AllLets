import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const ArrayInsertionDesign = () => {
  return (
    <LinearGradient 
        colors={['#2d0605', '#4c0827', ]} 
        start = {{x:0.3, y:0.4}}
        end= {{x:0.9, y:0.9}}
        style={styles.mainHeader}>
        <Text style={styles.TextHeader}>Inserting an Element</Text>
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
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}> </Text>
                </View>
            </View>
            <View style={styles.ArrayStyle}>
                <Text style={styles.indexTextStyle}>0</Text>
                <Text style={styles.indexTextStyle}>1</Text>
                <Text style={styles.indexTextStyle}>2</Text>
                <Text style={styles.indexTextStyle}>3</Text>
                <Text style={styles.indexTextStyle}> </Text>
            </View>
        </View>

        <Text style={styles.sampleText}>To insert an element at any index, for example index 2. Then move all the elements from index starting 2 to the right</Text>
        
        <View style={{marginTop:height*0.02}}>
            <View style={styles.ArrayStyle}>
                <View style={styles.view11}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>2</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>4</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}> </Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>6</Text>
                </View>
                <View style={styles.view12}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>8</Text>
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

        <Text style={styles.sampleText}>Now insert the new element in the index 2 place.</Text>

        <Text style={[styles.highLightText, {fontSize:RFValue(14), marginTop:height*0.02}]}>Final Array after inserting the element</Text>

        <View style={{marginTop:height*0.02}}>
            <View style={styles.ArrayStyle}>
                <View style={styles.view11}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>2</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>4</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>1</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>6</Text>
                </View>
                <View style={styles.view12}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>8</Text>
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

export default ArrayInsertionDesign