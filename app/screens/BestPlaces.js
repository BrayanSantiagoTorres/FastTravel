import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function BestPlaces(){
    return(
        <View style={styles.viewBody}>
            <Text>BestPlaces</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:'#F6FFE8'
    }
})