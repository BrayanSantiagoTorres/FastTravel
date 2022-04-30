import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Toast from 'react-native-toast-message'
import firebase from 'firebase'
import InfoUser from '../../components/Account/InfoUser'
import AccountOptions from '../../components/Account/AccountOptions'

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const [reloadUserInfo, setReloadUserInfo] = useState(false)
    const toastRef = useRef() 

    useEffect(()=>{
        (async()=>{
            const user = await firebase.auth().
            currentUser
            setUserInfo(user)
        })()
        setReloadUserInfo(false)
    },[reloadUserInfo])
    return(
        <View style={styles.viewUserInfo} >
            {userInfo&&(<InfoUser userInfo={userInfo} toastRef={toastRef}/>)}
            <AccountOptions userInfo ={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>
            <Button 
                title='Cerrar sesión'
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={()=>firebase.auth().signOut()}
            />
            <Toast ref={toastRef}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight:'100%',
        backgroundColor:'#27AE60'
    },
    btnCloseSession:{
        marginTop: 30,
        borderRadius: 25,
        backgroundColor: '#1CC0F0',
        borderTopWidth: 1,
        borderTopColor: '#1CC0F0',
        borderBottomWidth: 1,
        borderBottomColor: '#839192',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSessionText:{
        color: '#ffffff'
    }
})
