import React from 'react'
import { Text, View, Image,StyleSheet,TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { BorderlessButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
  btn:{
    alignItems: "center",
        backgroundColor: "#5ac618",
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        borderColor: '#fff'
},
  text:{
    color:'#fff',
    fontFamily:'sans-serif',
    fontSize: 15,
    fontWeight: "bold"
    
},
container:{
        flex:1,
        padding:20,
        marginTop:200,
},
title:{
  fontSize:30,
  textAlign:'center',
  fontWeight:'bold',
  color:'#5ac618'
} 
    
  });

export default function Landing({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ZBIO</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Register")}>
              <Text style={styles.text}>
                  Register
              </Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>
                  Login
              </Text>
            </TouchableOpacity> 
            
        </View>
    )
    
}
