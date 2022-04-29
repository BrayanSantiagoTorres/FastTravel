import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Toast from 'react-native-toast-message'
import AddTravelForm from '../../components/travels/AddTravelForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

export default function AddTravel({ navigation }) {
const toastRef = useRef()
const [loading, setLoading] = useState(false)
  return (
    <KeyboardAwareScrollView>
      <AddTravelForm 
        toastRef={toastRef} 
        setLoading={setLoading}
        navigation={navigation}
      />
      <Loading isVisible={loading} text='Creando nuevo viaje...'/>
      <Toast ref={toastRef} position='top' opacity={0.9}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})