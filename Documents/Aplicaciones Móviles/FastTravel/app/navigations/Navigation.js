import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import TravelsStack from './TravelsStack'
import MainStack from './MainStack'
import SearchStack from './SearchStack'
import BestPlacesStack from './BestPlacesStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='restaurants'
                tabBarOptions={{
                    inactiveTintColor: '#BDC3C4',
                    activeTintColor: '#05AFE1'
            }}
            screenOptions={({route}) => ({
                tabBarIcon:({color}) =>screenOptions(route, color)
            })}
            >
                <Tab.Screen 
                    name= 'travels' 
                    component={TravelsStack}
                    options={{title:"Viajes"}}
                />
                <Tab.Screen 
                    name= 'main' 
                    component={MainStack}
                    options={{title:"Principales"}}
                />
                <Tab.Screen 
                    name= 'search' 
                    component={SearchStack}
                    options={{title:"Buscar"}}
                />
                <Tab.Screen 
                    name= 'best-places' 
                    component={BestPlacesStack}
                    options={{title:"Mejores Lugares"}}
                />
                <Tab.Screen 
                    name= 'account' 
                    component={AccountStack}
                    options={{title:"Mi cuenta"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color){
    let iconName
    switch (route.name) {
        case 'travels':
            iconName='train-car'
            break;
        case 'main':
            iconName='heart-box'
            break;
        case 'best-places':
            iconName='star-outline'
            break;
        case 'search':
            iconName='card-search'
            break;
        case 'account':
            iconName='account-box'
            break;
    }
    return(
        <Icon type='material-community' name={iconName} size={26} color={color}/>
    )
}