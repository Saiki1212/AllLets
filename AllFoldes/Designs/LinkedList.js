import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from 'react-native-responsive-fontsize';


const {width} = Dimensions.get('window');
const {height} = Dimensions.get('screen')

const LinkedList = () => {
  return (
    <View>
        <LinearGradient 
            colors={['#457fde', '#4a71b0']}
            start = {{x:0.9, y:0.4}}
            end= {{x:0.3, y:0.2}}
            style={styles.mainHeader}
        >
            <Text style={styles.Header}>LinkedList</Text>
            <View style={styles.commonNode}>
                <Text style={styles.miniHeader}>Header</Text>
                <View style={{alignItems:'center', gap:height*0.01}}>
                    <View style={styles.anyNode}>
                        <Text style={styles.BoxInsideTextStyle}>
                            stores the address of inital node
                        </Text>
                    </View>
                    <Text style={{fontSize:RFValue(12), color:'white', fontWeight:'500'}}>Header node</Text>
                </View>
            </View>

            <View style={styles.commonNode}>
                <Text style={styles.miniHeader}>Node</Text>
                <View style={{alignItems:'center', gap:height*0.01}}>
                    <View style={{flexDirection:'row', borderWidth:1, borderColor:'#fff'}}>
                        <View style={[styles.anyNode, {borderWidth:0, borderRadius:0, borderRightWidth:1}]}>
                            <Text style={styles.BoxInsideTextStyle}>
                                stores the Data in the Node
                            </Text>
                        </View>
                        <View style={[styles.anyNode, {borderWidth:0, borderRadius: 0}]}>
                            <Text style={styles.BoxInsideTextStyle}>
                                stores address of next Node
                            </Text>
                        </View>
                    </View>
                    <Text style={{fontSize:RFValue(12), color:'white', fontWeight:'500'}}>Node with Data and a Node</Text>
                </View>
            </View>

            <Text style={styles.allTexts}><Text style={styles.highlightText}>Header </Text>always stores the address of the first node in the Linked List</Text>
            <Text style={styles.allTexts}><Text style={styles.highlightText}>Node</Text> contains 2 parts one is data and the other one is pointer part</Text>
            <Text style={styles.allTexts}>In <Text style={styles.highlightText}>Data</Text> part we store the give data.</Text>
            <Text style={styles.allTexts}>In <Text style={styles.highlightText}>Pointer</Text> part we store the pointer which points to the next Node.</Text>
            
        </LinearGradient>
     
    </View>
  )
}

const styles = StyleSheet.create({
    mainHeader: {
        marginHorizontal: width*0.02,
        marginVertical: height*0.01,
        paddingHorizontal:width*0.03,
        paddingVertical: height*0.01,
        borderRadius:12
    },
    Header: {
        fontSize: RFValue(20),
        fontWeight: '800',
        color:'#abc',
        marginLeft:'auto',
        marginRight:'auto',
        marginVertical:height*0.01
    },
    miniHeader: {
        fontSize: RFValue(15),
        fontWeight: '600',
        color:'#abc',
        marginVertical:height*0.004
    },
    commonNode: {
        alignItems:'center', 
        flexDirection:'row', 
        justifyContent:'space-evenly',
        borderWidth:0.3,
        paddingVertical: height*0.01,
    },
    anyNode: {
        height: height*0.05, 
        width: width*0.3,
        backgroundColor:'#303030',
        borderRadius:6,
        borderWidth:0.5,
        borderColor:'white',
        justifyContent:'center',
        alignItems: 'center'
    },
    BoxInsideTextStyle: {
        fontSize:(11), 
        color: '#fff',
        textAlign:'center'
    },
    allTexts: {
        fontSize: RFValue(12),
        fontWeight: '500',
        paddingTop:height*0.01,
        color:'#abc'
    },
    highlightText: {
        fontSize: RFValue(14),
        fontWeight: '600',
        paddingTop:height*0.01,
        color:'#f5f5f5'
    },
})

export default LinkedList