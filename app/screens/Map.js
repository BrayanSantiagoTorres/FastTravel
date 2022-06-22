import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Map(){
    return(
        <View style={styles.viewBody}>
            <Text>Map</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:'#4169E1'
    }
})