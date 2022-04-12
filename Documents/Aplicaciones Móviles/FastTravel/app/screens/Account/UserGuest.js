import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest(){
    const navigation = useNavigation()
    return(
        <ScrollView style={StyleSheet.container}>
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/travel.png')}
            />
            <Text style={styles.title}>Ingresa a tu cuenta</Text>
            <Text style={styles.description}>
                Mira los diferentes lugares a los que podrías viajar, incluso si no sabes nada de ese lugar
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    title='Iniciar sesión'
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={()=>navigation.navigate('login')}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 10
    },
    stretch:{
        width: '100%',
        height: 420,
        resizeMode: 'contain',
        marginBottom: 40
    },
    title:{
        fontWeight:'bold',
        fontSize: 20,
        marginBottom:12,
        textAlign:'center'
    },
    description:{
        marginBottom: 22,
        textAlign: 'center'
    },
    viewBtn:{
        flex:1,
        alignItems: 'center'
    },
    btnStyle:{
        backgroundColor:'#1CC0F0',
        borderRadius: 25
    },
    btnContainer:{
        width: '55%'
    }
})