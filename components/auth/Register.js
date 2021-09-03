import React, { Component } from 'react'
import { View, Text,Image, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';



import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements/dist/input/Input';

export class Register extends Component {

    constructor(props)
    {
        super(props);
        this.state={Name:'',Email:'',Password:''}

    }
    onSignUp=()=>{
        var Name = this.state.Name;
        var Email = this.state.Email;
        var Password = this.state.Password;
        if(Name.length==0 || Email.length==0|| Password.length==0){
            alert("Required Field is Missing")
        }
        else{
            alert("Fecth API code com here")
        }
        }


    render() {
        return (
            <View style={styles.ViewStyle}>

                <Image
                    style={styles.imgstyle}
                source={require('../../img/logo.png')}
            />
                
                <View style={styles.sectionStyle}>
                    <Image
                    source={
                    require('../../img/user.png')
                    
                        }
                    style={styles.imageStyle}
                    />
                    <TextInput
                    placeholder={"Name"}
                    placeholderTextColor={"black"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={Name=>this.setState({Name})}
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
                    placeholderTextColor={"black"}
                    underlineColorAndroid="transparent"
                    style={styles.txtStyle}
                    onChangeText={Email=>this.setState({Email})}
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
                    onChangeText={Password=>this.setState({Password})}
                    secureTextEntry={true}
                    />
                    </View>
                
                <Button
                    type="clear"
                    onPress={this.onSignUp}
                    title="Sign Up"
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
        }
});


export default Register