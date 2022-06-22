import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import {Icon} from 'react-native-elements'
import firebase from 'firebase/app'

export default function Main(){
    return(
        <View style={styles.viewBody}>
        <Text style={styles.title}>Descubre los mejores detinos para viajar</Text>
        <Image
            style={styles.stretch}
            source={require('../../assets/icon.png')}
        />
        <Image
            style={styles.stretch}
            source={require('../../assets/img/img333.jpg')}
        />
        <Image
            style={styles.stretch}
            source={require('../../assets/img/img333.jpg')}
        />
    </View>
    
    )
    
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:'#00FF7F'
    },
    stretch:{
        width: '90%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 110,
        marginLeft:'250px',
        borderRadius:'23px'
    },
    title:{
        fontWeight:'bold',
        fontSize: 30,
        marginBottom:14,
        textAlign:'center',
        backgroundColor: '#778899',
        fontFamily: 'Helvética'
    },
    Image:{
        width: '250px',
        borderRadius:'23px'
    }
   
})