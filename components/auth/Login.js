import React, { Component } from 'react'
import { View, Text,TextInput,Image, StyleSheet,TouchableOpacity } from 'react-native'
// import * as SecureStore from 'expo-secure-store'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import UrlAPI from '../../UrlAPI';
import GetToken from '../../API/GetToken';
import saveToken from '../../API/SaveTonken';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements/dist/input/Input';
// const storeData = async (key,value) => {
//     try {
//       await AsyncStorage.setItem(key, value)
//     } catch (e) {
//       // saving error
//     }
//   }
export class Login extends Component {
  
    constructor(props)
    {
        super(props);
        this.state={username:'',password:''}

    }
    
    onLogin= async()=>{
        var username = this.state.username;
        var password = this.state.password;
        if(username.length==0|| password.length==0){
            alert("Required Field is Missing")
        }
        else{
            var LoginAPIURL=UrlAPI.url+"login ";
            var headers={'Accept':'application/json',
                         'Content-Type':'application/json' };
            var Data={
                'username':username,
                'password':password
            };

            fetch(LoginAPIURL,
                {
                    method:'POST',
                    headers:headers,
                    body: JSON.stringify(Data)
                }
                )
                .then((response)=>response.json())
                .then((response)=>
                    {
                            if((response.success))
                            {
                                 this.props.navigation.navigate("Home")
                                 saveToken(response.token);
                            }else{
                                alert("username or password is incorrect")
                            }
                       
                    })
                    
                    .catch((error)=>
                    {
                        alert("error"+error);
                    })
                   
        }
        }
    
    componentDidMount(){ 
            GetToken()
            .then(a => console.log('TOKEN::::'+a));
    }

    render() {
       
        return (
            <View style={styles.ViewStyle}>

            <Text style={styles.title}>ZBIO</Text>
                <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/email.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"Username"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={username=>this.setState({username})}
                    />
                    </View>
                    <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/lock-icon-11.png')
                    
                        }
                    
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"Password"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={password=>this.setState({password})}
                    secureTextEntry={true}
                    />
                    </View>
                
                    <TouchableOpacity style={styles.btn} onPress={this.onLogin}>
                    <Text style={styles.text} >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({

    ViewStyle:
    {
        flex:1,
        padding:20,
        marginTop:50,
    },

    txtStyle:
    {
        flex: 1,
        //borderBottomColor:'black',
        
    },
    imgstyle:{
        resizeMode: "center",
        height: 100,
        width: 320
    },
    imageStyle:{
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    },
    sectionStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10,
    },
    btn:{
        alignItems: "center",
        backgroundColor: "#5ac618",
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        margin: 10
    
    },
    text:{
        color:'#fff',
        fontFamily:'sans-serif',
        fontSize: 15,
        fontWeight: "bold"
        
    },
    title:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold',
        color:'#5ac618'
      }
    
});


export default Login