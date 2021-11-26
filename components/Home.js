import React, { Component } from 'react'
import { Text } from 'react-native-elements'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeedScreen from './main/Feed'
import AddfriendsScreen from './main/Addfriends'
import notificationScreen from './main/notification'
import MenuScreen from './main/Menu'
const Tab = createMaterialBottomTabNavigator();
export class Home extends Component {
    render() {
        return (
            <Tab.Navigator
            activeColor="#5ac618"
            inactiveColor="#a9a9a9"
            barStyle={{ backgroundColor: '#fff', height: 50}}>
               <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                        
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }} /> 
                     <Tab.Screen name="Addfriends" component={AddfriendsScreen}
                    options={{

                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-plus" color={color} size={26} />
                        ),
                    }} />
                     <Tab.Screen  name="notification" component={notificationScreen}
                    options={{
                    
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="bell" color={color} size={26} />
                        ),
                    }} />
                    <Tab.Screen  name="Menu" component={MenuScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="menu" color={color} size={26} />
                        ),
                    }} />
            </Tab.Navigator>
                /*<Text>HomeScreen</Text>*/
                
            
        )
    }
}

export default Home

