import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import About from '../screens/About'

const Stack = createStackNavigator()

export default function AboutStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Acerca De'
                component={About}
                options={{tittle:'Acerca de'}}
            />
        </Stack.Navigator>
    )
}
