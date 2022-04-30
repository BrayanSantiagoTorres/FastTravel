import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading(props){
    const {isVisible, text} = props
    return(
        <Overlay
            isVisible = {isVisible}
            windowBackgroundColor = 'rgba(0,0,0,0.5)'
            overlayBackgroundColor = 'transparent'
            overlayStyle = {styles.overlay}
        >    
            <View>
                <ActivityIndicator size='large' color='#b86586'/>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}
const styles = StyleSheet.create({
    overlay:{
        height:100,
        width:230,
        backgroundColor: '#F4D03F',
        borderColor: '#b86586',
        borderWidth: 3,
        borderRadius: 9
    },
    text:{
        color: '#b86586',
        textTransform: 'uppercase',
        marginTop: 20,
        textAlign: 'center'
    }
})
