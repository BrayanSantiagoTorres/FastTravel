import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Main(){
    return(
        <View style={styles.viewBody}>
            <Text>Main travels</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:'#FA8072'
    }
})