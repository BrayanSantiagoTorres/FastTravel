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
                <ActivityIndicator size='large' color='#47D5FF'/>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        height:100,
        width:230,
        backgroundColor: '#D9FFED',
        borderColor: '#47D5FF',
        borderWidth: 3,
        borderRadius: 9
    },
    text:{
        color: '#D9FFED',
        textTransform: 'uppercase',
        marginTop: 10,
        textAlign: 'center'
    }
})