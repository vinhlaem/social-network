import React, { Component } from 'react'
import { Text, View, Image,StyleSheet,TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { BorderlessButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetToken from '../../API/GetToken';
import UrlAPI from '../../UrlAPI';

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

  var token = '';
  GetToken().then(t => {
    token = t;
  })
  export class Landing extends Component {
    onCheckLogin = () => {
      const url = UrlAPI.url + "checklogin";
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      };
      try {
        fetch(url,
          {
            method: 'GET',
            headers: headers,
          }).then((response) => response.json())
          .then((response) => {
            if (response.message == 'token alive') {
              this.props.navigation.navigate("Home")
            } else{
              this.props.navigation.navigate("Login")
            }
    
          })
      } catch (error) {
        console.error(`Error is: ${error}`);
      }
    }
    render() {
        return (
          <View style={styles.container}>
          <Text style={styles.title}>ZBIO</Text>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.text}>
                Register
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.btn} onPress={this.onCheckLogin}>
            <Text style={styles.text}>
                Login
            </Text>
          </TouchableOpacity> 
          
      </View>
        )
    }
}

export default Landing


  
  