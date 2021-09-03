import React, { Component } from 'react'
import { View, Text,TextInput,Image, StyleSheet } from 'react-native'
//import { TextInput } from 'react-native-gesture-handler';



import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements/dist/input/Input';

export class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state={username:'',password:''}

    }
    onLogin=()=>{
        var username = this.state.username;
        var password = this.state.password;
        if(username.length==0|| password.length==0){
            alert("Required Field is Missing")
        }
        else{
            var LoginAPIURL="http://api.zbioggg.com/api/login";
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
                            alert(response.token);
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


    render() {
        return (
            <View style={styles.ViewStyle}>

                <Image
                    style={styles.imgstyle}
                    source={
                    require('../../img/logo.png')
                }
            />
                <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/email.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"Username"}
                    placeholderTextColor={"black"}
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
                    placeholderTextColor={"black"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={password=>this.setState({password})}
                    secureTextEntry={true}
                    />
                    </View>
                
                <Button
                    type="clear"
                    onPress={this.onLogin}
                    
                    title="Login"
                />
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
        borderBottomColor:'black',
        
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
    }
    
});


export default Login