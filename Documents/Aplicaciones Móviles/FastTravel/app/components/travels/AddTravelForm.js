import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Icon, Avatar, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter } from 'lodash'

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
        console.log(formData)
        console.log("Has añadido un viaje nuevo!")
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
            style={{ width: widthScreen, height: 200}}
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
            toastRef.current.show('No ha seleccionado ninguna iamagen.', 3000)
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
                       name='camera'
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
                placeholder='Tipo de viaje...'
                defaultValue={formData.tipo}
                onChange={(e) => onChange(e, 'tipo')}
                errorMessage={errorTipo}
            />
            <Input
                placeholder='Lugar de destino...'
                defaultValue={formData.address}
                onChange={(e) => onChange(e, 'address')}
                errorMessage={errorAddress}
            />
            <Input
                keyboardType='email-address'
                placeholder='email de contacto...'
                defaultValue={formData.email}
                onChange={(e) => onChange(e, 'email')}
                errorMessage={errorEmail}
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
                    placeholder='WhatsApp de contacto...'
                    keyboardType='phone-pad'
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, 'phone')}
                    errorMessage={errorPhone}
                />
            </View> 
            <Input
                placeholder='Descripción del viaje...'
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, 'description')}
                errorMessage={errorDescription}
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
        height: '100%'
    },
    viewForm:{
        marginHorizontal: 10,
    },
    textArea:{
        height: 100,
        width: '100%'
    },
    phoneView:{
        width: '80%',
        flexDirection:'row'
    },
    inputPhone:{
        width: '80%'
    },
    btnAddTravel:{
        margin: 20,
        backgroundColor: '#1CC0F0',
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
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: '#e3e3e3'
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto:{
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    }
})