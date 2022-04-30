import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BestPlaces from '../screens/BestPlaces'

const Stack = createStackNavigator()

export default function BestPlacesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Mejores Lugares'
                component={BestPlaces}
                options={{tittle:'Mejores Lugares'}}
            />
        </Stack.Navigator>
    )
}
