import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Travels from '../screens/Travels'

const Stack = createStackNavigator()

export default function TravelsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Viajes'
                component={Travels}
                options={{tittle:'Viajes'}}
            />
        </Stack.Navigator>
    )
}
