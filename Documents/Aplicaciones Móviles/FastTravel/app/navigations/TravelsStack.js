import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Travels from '../screens/Travels/Travels'
import AddTravel from '../screens/Travels/AddTravel'

const Stack = createStackNavigator()

export default function TravelsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Viajes'
                component={Travels}
                options={{tittle:'Viajes'}}
            />
            <Stack.Screen
                name='Añadir Viaje'
                component={AddTravel}
                options={{tittle:'Añadir nuevo viaje'}}
            />
        </Stack.Navigator>
    )
}
