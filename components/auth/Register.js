import React, { Component } from 'react'
import { View, Text,Image, StyleSheet, ScrollView,Button,TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import UrlAPI from '../../UrlAPI';


//import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements/dist/input/Input';
import { fonts } from 'react-native-elements/dist/config';

export class Register extends Component {

    constructor(props)
    {
        super(props);
        this.state={username:'',email:'',password:'',firstName:'',lastName:'',gender:'',phone:'',doB:''}

    }
    //checkinput = (Phone) =>{
       // if (/^\d+$/.test(Phone)) {
          //  this.setState({
           //   Phone: Phone
          //  });
          //}
    //}
    onSignUp=()=>{
        var username = this.state.username;
        var email = this.state.email;
        var password = this.state.password;
        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        var gender = this.state.gender;
        var phone = this.state.phone;
        var doB = this.state.doB;
        if(username.length==0 || email.length==0 || password.length==0 || firstName.length==0 || lastName.length==0
            || gender.length==0 || phone.length==0 || doB.length==0){
            alert("Required Field is Missing")
        }
        
        else{
            var LoginAPIURL=UrlAPI.url+ "register";
            var headers={'Accept':'application/json',
                           'Content-Type':'application/json'};
            var Data={
               'username':username,
               'email':email,
               'password':password,
               'firstName':firstName,
               'lastName':lastName,
               'gender':gender,
               'phone':phone,
               'doB':doB

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
                            
                            this.props.navigation.navigate("Login")
                            
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

                <Text style={styles.title}>ZBIO</Text>  
                <ScrollView>
                <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/user.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"UserName"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={username=>this.setState({username})}
                    />
                    </View>
                    <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/name.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"FirstName"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={firstName=>this.setState({firstName})}
                    />
                    </View>
                    <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/name.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"LastName"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={lastName=>this.setState({lastName})}
                    />
                    </View>
                    <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/sex.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"Gender"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={gender=>this.setState({gender})}
                    />
                    </View>
                    <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/phone.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"Phone"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    keyboardType='numeric'
                    onChangeText={phone => this.setState({phone})}
                        
                    maxLength={10}
                    />
                    </View>
                    <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/dob.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"Dob dd/mm/yyyy"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    numeric
                    onChangeText={doB=>this.setState({doB})}
                    options={{format: 'DD-MM-YYYY HH:mm:ss'}}
                    />
                    </View>
                    <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/email.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"Email"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={email=>this.setState({email})}
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
               
                
                    
                
                </ScrollView>
                <TouchableOpacity style={styles.btn} onPress={this.onSignUp}>
                    <Text style={styles.text} >
                        SignUp
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
        marginTop:10,
    },

    txtStyle:
    {
        flex:1,
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
        },
        btn:{
            
            alignItems: "center",
            backgroundColor: "#5ac618",
            padding: 10,
            borderRadius: 5,
            borderColor: '#000',
            margin:10
            
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


export default Register