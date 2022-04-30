import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import {Icon} from 'react-native-elements'
import {} from '../../utils/firebase'
import firebase from 'firebase/app'
import Loading from '../../components/Loading'
import { ScrollView } from 'react-native-gesture-handler'

export default function Travels({ navigation }){

    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo)=>{
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    if (user == null) {
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return(
        <View style={styles.viewBody}>
            <Text style={styles.title}>Descubre los mejores detinos para viajar</Text>
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/frgtrfgtrfgtrfgtrff.jpg')}
            />
            <Image
                style={styles.stretch}
                source={require('../../../assets/img/img333.jpg')}
            />
            {user && (
            <Icon
                reverse
                type='material-community'
                name='plus'
                color='#1C56F0'
                containerStyle={styles.btnContainer}
                onPress={()=> navigation.navigate('Añadir Viaje')}
            />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:'#F6FFE8'
    },
    stretch:{
        width: '100%',
        height: 270,
        resizeMode: 'contain',
        marginBottom: 5
    },
    title:{
        fontWeight:'bold',
        fontSize: 20,
        marginBottom:12,
        textAlign:'center'
    },
    btnContainer:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset:{width:2, height: 2},
        shadowOpacity: 0.5
    }
})