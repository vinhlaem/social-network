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
import Repcomment from './components/Repcomment';
import Profileorther from './components/Profileorther';
import DetailPost  from './components/DetailPost';
import ListFriends from './components/ListFriends';
import Messenger from './components/Messenger';
import Chat from './components/Chat';
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
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="PostStatus" component={PostStatus} />
          <Stack.Screen name = "Search" component={Search}/>
          <Stack.Screen name = "Comment" component={Comment}/>
          <Stack.Screen name ="Repcomment" component={Repcomment}/>
          <Stack.Screen name ="Profileorther" component={Profileorther} options={{headerShown:false}}/>
          <Stack.Screen name ="DetailPost" component={DetailPost}/>
          <Stack.Screen name ="ListFriends" component={ListFriends}/>
          <Stack.Screen name = "Messenger" component={Messenger}/>
          <Stack.Screen name = "Chat" component={Chat} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>


    );
    
  }
}

export default App



