import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('screen')

const ArrayDesign = () => {
  return (
    <View style={styles.mainHeader}>
        <Text style={styles.TextHeader}>Array Example :</Text>
        <View>
            <View style={styles.ArrayStyle}>
                <View style={styles.view11}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>2</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>5</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>9</Text>
                </View>
                <View style={styles.view1}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>7</Text>
                </View>
                <View style={styles.view12}>
                    <Text style={{fontSize:RFValue(13), fontWeight:'700'}}>4</Text>
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

        <Text style={styles.sampleText}>Now how to access the array elements : </Text>
        <Text>Let's assume Array name as " newArray ".</Text>
        <Text style={styles.sampleText}>Here the value of <Text style={{color:'#038f6a'}}>newArray [0] = 2, </Text>that means the value newArray at the index of 0 is 2</Text>
        <Text style={styles.sampleText}>Let's check another one <Text style={{color:'#038f6a'}}>newArray [3] = 7, </Text>that means the value newArray at the index of 3 is 7</Text>
        <Text style={styles.sampleText}>If we check the value of <Text style={{color:'#038f6a'}}>newArray [5] it will result in an "ArrayIndexOutOfBoundsException" , </Text>because it's out of the array's bounds, our limit is only upto index 4. But it was trying to access the 5th index.</Text>
        

    </View>
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
        fontSize: RFValue(14),
        fontWeight:'600',
        color:'#616161',
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
        color: '#038f6a'
        // backgroundColor:'#faf'
    },
    sampleText: {
        fontSize:RFValue(11), 
        fontWeight:'500', 
        marginTop:height*0.015,
    }
})

export default ArrayDesign