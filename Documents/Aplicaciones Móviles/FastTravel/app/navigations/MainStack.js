import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Main from '../screens/Main'

const Stack = createStackNavigator()

export default function MainStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Principales'
                component={Main}
                options={{tittle:'Principales'}}
            />
        </Stack.Navigator>
    )
}
