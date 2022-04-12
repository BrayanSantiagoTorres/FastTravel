import { StyleSheet, View } from 'react-native'
import React, {useState} from 'react'
import {Input, Button, Icon} from 'react-native-elements'
import { validateEmail } from '../../utils/validation'
import { isEmpty, result } from 'lodash'

export default function ChangeEmailForm({email, setShowModal, toastRef, setReloadUserInfo }) {
    
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)

    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async() => {
    if (!validateForm()) {
        return
    }

}

    const validateForm= () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        console.log("newEmail", email)
        console.log("email", email)
    
    if(!validateEmail(newEmail)){
        console.log("Not is valid")
        toastRef.current.show({
            type: 'error',
            position: 'top',
            text1: 'Empty',
            text2: 'Debes ingresar un email válido',
            visibilityTime: 3000,
          });
          isValid = false
    } if (newEmail === email){
        toastRef.current.show({
            type: 'error',
            position: 'top',
            text1: 'Empty',
            text2: 'El email ya está en uso',
            visibilityTime: 3000,
          });
          isValid = false
    } if (isEmpty(password)) {
        toastRef.current.show({
            type: 'error',
            position: 'top',
            text1: 'Empty',
            text2: 'Debes ingresar tu contraseña',
            visibilityTime: 3000,
          });
          isValid = false
    } 
    return isValid 
}

return (
<View style={styles.view}>
    <Input
        placeholder='Ingresa el nuevo correo'
        containerStyle={styles.input}
        rightIcon={{
            type: 'material-community',
            name: 'at',
            color: '#c2c2c2'
        }}
        defaultValue={email}
        keyboardType="email-addres"
        onChange={(e)=>setNewEmail(e.nativeEvent.text)}
        errorMessage={errorEmail}
    />
    <Input
        placeholder='Ingresa tu contraseña...'
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={<Icon
            type='material-community'
            name={ showPassword ? "eye-off-outline" : "eye-outline" }
            iconStyle={{ color: '#c2c2c2'}}
            onPress={()=> setShowPassword(!showPassword)}
        />}
        defaultValue={password}
        onChange={(e)=>setPassword(e.nativeEvent.text)}
        errorMessage={errorPassword}
    />
    <Button
        title= 'Actualizar correo'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        isLoading={isLoading}
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
        width: '95%',
        borderRadius: 25
    },
    btn:{
        backgroundColor: '#1CC0F0'
    }
  })

