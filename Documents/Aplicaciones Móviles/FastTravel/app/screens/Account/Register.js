import React from "react";
import { StyleSheet, View, Text, Image } from 'react-native'

export default function Register(){
    return(
        <View>
            <Image
                source={require('../../../assets/img/fastravellll.png')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style = {styles.ViewForms}>
                <Text>Form para registrarse</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ViewForms:{
        marginRight: 40,
        marginLeft: 40,
        textAlign: 'center'
    },
    logo:{
        width:'100%',
        height: 300,
        marginTop: 20
    }
})