import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Icon, Avatar, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'
import { validateEmail } from '../../utils/validation'

import { loadImageFromGallery } from '../../utils/helpers'

const widthScreen = Dimensions.get('window').width

export default function AddTravelForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData ] = useState(defaultFormValues())
    const [errorTipo, setErrorTipo ] = useState(null)

    const [errorDescription, setErrorDescription ] = useState(null)
    const [errorEmail, setErrorEmail ] = useState(null)
    const [errorAddress, setErrorAddress ] = useState(null)
    const [errorPhone, setErrorPhone ] = useState(null)
    const [imagesSelected, setImagesSelected ] = useState([])

    const addTravel = () => {
        if (!validForm()) {
            return
        }
        console.log(formData)
        console.log("Has añadido un viaje nuevo")
    }

    const validForm = () => {
        clearErrors()
        let isValid = true

        if (isEmpty(formData.tipo)) {
            setErrorTipo('Es necesario escribir el tipo de viaje.')
            isValid = false
        }

        if (isEmpty(formData.address)) {
            setErrorAddress('Es necesario escribir el destino.')
            isValid = false
        }

        if (isEmpty(formData.phone)) {
            setErrorPhone('Es necesario escribir un teléfono.')
            isValid = false
        }

        if (!validateEmail(formData.email)) {
            setErrorEmail('Debes ingresar un email válido.')
            isValid = false
        }

        if (isEmpty(formData.description)) {
            setErrorDescription('Es necesario escribir la descripción del lugar.')
            isValid = false
        }

        return isValid
    }

    const clearErrors = () => {
        setErrorDescription(null)
        setErrorPhone(null)
        setErrorEmail(null)
        setErrorTipo(null)
        setErrorAddress(null)
    }
    
    return (
    <ScrollView style={styles.viewContainer}>
        <ImageTravel
            imageTravel={imagesSelected[0]}
        />
        <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorTipo={errorTipo}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
        />
        <UploadImage
            toastRef={toastRef}
            imagesSelected={imagesSelected}
            setImagesSelected={setImagesSelected}
        />
        <Button
                title='Crear nuevo viaje'
                onPress={addTravel}
                buttonStyle={styles.btnAddTravel}
        />
    </ScrollView>
  )
}

function ImageTravel({ imageTravel }) {
    return (
    <View style={styles.viewPhoto}>
        <Image
            style={{ width: widthScreen, height: 230}}
            source={
                imageTravel
                    ? { uri: imageTravel}
                    : require('../../../assets/sinimagen.png')
            }
        />
    </View>
    )
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async() => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show('No ha seleccionado ninguna imagen.', 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            'Eliminar imagen',
            '¿Quieres remover la imagen?',
            [
                {
                   text: 'No',
                   style: 'cancel'
                },
                {
                    text: 'Si',
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected) < 7 && (
                    <Icon
                       type='material-community'
                       name='image'
                       color='#7a7a7a'
                       containerStyle={styles.containerIcon}
                       onPress={imageSelect}
                    />
                )
            }
            {
            map(imagesSelected, (imageTravel, index) => (
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{ uri: imageTravel }}
                    onPress={() => removeImage(imageTravel)}
                />
            ))
            }
        </ScrollView>
    )
}

function FormAdd({ formData, setFormData, errorTipo, errorDescription, errorEmail, errorAddress, errorPhone }) {
    const [country, setCountry] = useState('MX')
    const [callingCode, setCallingCode] = useState('52')
    const [phone, setPhone] = useState('')

    const onChange = (e, type) => {
        setFormData({ ...formData, [type] : e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder='Tipo de viaje'
                defaultValue={formData.tipo}
                onChange={(e) => onChange(e, 'tipo')}
                errorMessage={errorTipo}
                rightIcon={{
                    type: 'material-community',
                    name: 'pencil',
                    color: '#E1C433'
                }}
            />
            <Input
                placeholder='Lugar de destino'
                defaultValue={formData.address}
                onChange={(e) => onChange(e, 'address')}
                errorMessage={errorAddress}
                rightIcon={{
                    type: 'material-community',
                    name: 'earth',
                    color: '#557DEA'
                }}
            />
            <Input
                keyboardType='email-address'
                placeholder='Email de contacto'
                defaultValue={formData.email}
                onChange={(e) => onChange(e, 'email')}
                errorMessage={errorEmail}
                rightIcon={{
                    type: 'material-community',
                    name: 'email-variant',
                    color: '#CD5C5C'
                }}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country)=>{
                        setFormData({ 
                            ...formData, 
                            'country': country.cca2, 
                            'callingCode': country.callingCode[0]
                        })
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder='WhatsApp de contacto'
                    keyboardType='phone-pad'
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, 'phone')}
                    errorMessage={errorPhone}
                    rightIcon={{
                        type: 'material-community',
                        name: 'whatsapp',
                        color: '#148F77'
                    }}
                />
            </View> 
            <Input
                placeholder='Descripción del viaje'
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, 'description')}
                errorMessage={errorDescription}
                rightIcon={{
                    type: 'material-community',
                    name: 'message-draw',
                    color: '#717D7E'
                }}
            />              
        </View>
    )
}

const defaultFormValues = () => {
    return {
        tipo: '',
        description: '',
        email: '',
        phone: '',
        address: '',
        country: 'MX',
        callingCode: '52'
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        height: '80%'
    },
    viewForm:{
        marginHorizontal: 20,
        marginTop: 30
    },
    textArea:{
        height: 100,
        width: '80%',
        fontFamily: 'verdana'
    },
    phoneView:{
        width: '80%',
        flexDirection:'row'
    },
    inputPhone:{
        width: '80%'
        
    },
    btnAddTravel:{
        margin: 50,
        backgroundColor: '#E74C3C',
        borderRadius:25
    },
    viewImages:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 70,
        height: 90,
        width: 90,
        backgroundColor: '#f0e29e',
        borderRadius: 70
    },
    miniatureStyle:{
        width: 60,
        height: 60,
        marginRight: 25
    },
    viewPhoto:{
        alignItems: 'center',
        height: 200,
        marginBottom: 20,
    }
})