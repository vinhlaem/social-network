import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import HomeScreen from './components/Home';
import { Provider } from 'react-redux';




const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
     
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="landing" component={LandingScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      
      
    );
    
  }
}

export default App



