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
import Profile from './components/Profile';
import PostStatus from './components/PostStatus';
import Search from './components/Search';
import Comment from './components/Comment';
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
        <Stack.Navigator>
          <Stack.Screen name="Langding" component={LandingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="PostStatus" component={PostStatus} />
          <Stack.Screen name = "Search" component={Search}/>
          <Stack.Screen name = "Comment" component={Comment}/>
        </Stack.Navigator>
      </NavigationContainer>
      
      
    );
    
  }
}

export default App



