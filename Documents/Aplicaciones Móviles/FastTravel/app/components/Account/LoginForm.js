import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import { validateEmail } from '../../utils/validation'
import firebase from 'firebase'

export default function LoginForm(props) {
    const {toastRef} = props
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const navigation = useNavigation()

    const doLogin = ()=>{
        if(formData.email.length===0||formData.password.length===0){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'Debes rellenar los campos vacíos',
                visibilityTime: 3000,
              });
        } else if (!validateEmail(formData.email)){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'El correo o la contraseña son incorrectos',
                visibilityTime: 3000,
              });
        } else if (formData.password.length < 6){
            toastRef.current.show({
                type: 'error',
                position: 'top',
                text1: 'Empty',
                text2: 'El password debe tener mínimo 6 carácteres',
                visibilityTime: 3000,
              });
        } else{
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(()=>{
                    navigation.navigate('Mi cuenta')
                })
                .catch(()=>{
                    toastRef.current.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Cuenta',
                        text2: 'El correo no se ha registrado',
                        visibilityTime: 3000,
                      });
                })
        }
    }
    
    const onChange = (e, type) => {
        setFormData({...formData,[type]: e.nativeEvent.text})
    }

  return (
    <View style={styles.container}>
        <Input
                placeholder='Correo Electronico'
                containerStyle={styles.inputForm}
                onChange={(e)=>onChange(e, 'email')}
                rightIcon={<Icon type= 'material-community' name='email' iconStyle={styles.iconRight}/>}
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e)=>onChange(e, 'password')}
                rightIcon={<Icon 
                    type= 'material-community' 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    iconStyle={styles.iconRight}
                    onPress={()=> setShowPassword(!showPassword)}
            />}
            />
            <Button
                title='Iniciar Sesión'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={(doLogin)}
            />
    </View>
  )
}

function defaultFormValues(){
    return{
        email: '',
        password: ''
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35
    },
    inputForm:{
        width: '100%',
        marginTop: 20
    },
    btnContainerRegister:{
        marginTop: 20,
        width: '98%'
    },
    btnRegister:{
        backgroundColor:'#0DB8EB',
        borderRadius: 25
    },
    iconRight:{
        color: '#c1c1c1'
    }
})