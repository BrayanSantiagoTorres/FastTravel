import { StyleSheet, View } from 'react-native'
import React, {useState} from 'react'
import {Input, Button} from 'react-native-elements'
import firebase from 'firebase'

export default function ChangeDisplayNameForm(props) {
    const {displayName, setShowModal, toastRef, setReloadUserInfo} = props
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit= ()=>{
        setError(null)
        if(!newDisplayName){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'El nombre no puede estar vacío',
                visibilityTime: 3000,
              });
        } else if (displayName === newDisplayName){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'El nombre no puede ser igual al actual',
                visibilityTime: 3000,
              });
        } else{
            setIsLoading(true)
            const update = {
                displayName: newDisplayName
            }
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(()=>{
                    console.log('Excelente desde firebase')
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    setShowModal(false)
                })
                .catch(()=>{
                    console.log('Error al actualizar el nombre')
                    setIsLoading(false)
                })
        }
    }

  return (
    <View style={styles.view}>
        <Input
            placeholder='Nombre y apellidos'
            containerStyle={styles.Input}
            rightIcon={{
                type: 'material-community',
                name: 'account-circle-outline',
                color: '#c2c2c2'
            }}
            defaultValue={displayName || ''}
            onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}
            errorMessage={error}
        />
        <Button
            title= 'Cambiar Nombre'
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={isLoading}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width: '86%',
        borderRadius: 25,
        alignContent: 'center'
    },
    btn:{
        backgroundColor: '#1CC0F0'
    }
})