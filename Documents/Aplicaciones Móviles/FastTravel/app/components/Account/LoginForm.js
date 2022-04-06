import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({...formData,[type]: e.nativeEvent.text})
    }

    const doLogin = ()=>{
        console.log('Login')
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