import React, { Component, useState } from 'react'
import {View,Text,TouchableOpacity,Image,TextInput,StyleSheet,KeyboardAvoidingView, Platform} from 'react-native'
import ava from '../img/ava.png'
import iccamera from '../img/iccamera.png'
import icgallery from '../img/gallery.png'
import GetAuUser from '../API/GetAuUser';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler'


 
  
export class PostStatus extends Component {
    
   
    
    constructor(props) {
        super(props);
        this.state = {text: '', height: 0,datauser:{}, image:null};
        
        
      }
      componentDidMount(){
          this.refeshAuthUser()
      }
      refeshAuthUser = () => {
        GetAuUser().then((user) => {
          this.setState({datauser:user});
          console.log(user)
        }).catch((error)=>{
          this.setState({datauser:[]});
        });
      }
      showImagePicker = async () =>{
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        };
        const result = await ImagePicker.launchImageLibraryAsync();
        console.log(result);

        if (!result.cancelled) {
         this.setState({ image: result.uri });
        }
        
  };
      openCamera = async () =>{
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        };
        const result = await ImagePicker.launchCameraAsync();
        console.log(result);

        if (!result.cancelled) {
         this.setState({ image: result.uri });
        }
      }
    render() {
        let { image } = this.state;
        return (
            <ScrollView>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-between', padding:10,borderBottomWidth:1,borderBottomColor:'#DFDFDF'}}>
                    <Text style={{fontSize:16}} >Tạo bài viết</Text>
                    <TouchableOpacity style={{width:70, }}>
                        <Text style={{fontSize:16,textAlign:'center'}}>Đăng</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', padding:10}}>
                    <TouchableOpacity onPress={this.onProfile} style={{ height: 50, width: 50 }}>
                    {
                    this.state.datauser.img_avt?
                    <Image style={{ height: 50, width: 50,  borderRadius: 100 }} source={{uri: 'https://zbioggg.com/'+this.state.datauser.img_avt }} />
                    :
                    <Image style={{ height: 50, width: 50, borderRadius: 100 }} source={{uri: 'https://zbioggg.com/'+'img/avt/avt-default.png' }} />
                    }
                    </TouchableOpacity>
                    <Text style={{fontWeight:'bold',paddingLeft:10}}>{this.state.datauser.lastName} {this.state.datauser.firstName}</Text>
                </View>
                <View style={{height:400,borderBottomWidth:1}}>
                    <TextInput
                    {...this.props}
                    placeholder={"What are you thinking!!!!"}
                    placeholderTextColor={"#a9a9a9"}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => {
                        this.setState({ text })
                    }}
                    onContentSizeChange={(event) => {
                        this.setState({ height: event.nativeEvent.contentSize.height })
                    }}
                    style={[styles.default, {height: Math.max(35, this.state.height)}]}
                    value={this.state.text}
                    />
                </View>
                <View style={{flexDirection:'row-reverse',margin:10}} >
                    <TouchableOpacity  onPress={this.openCamera} >
                        <Image style={{ height: 35, width: 35, marginTop: 3, marginLeft: 2 }} source={iccamera} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showImagePicker}>
                        <Image style={{ height: 35, width: 35, marginTop: 3, marginLeft: 2 }} source={icgallery} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    
                  { Image && 
                    <Image
                source={{ uri: image}}
                style={styles.image}
                />
                }
                </View>
                
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
            
        )
    }
}

export default PostStatus

const styles = StyleSheet.create({
    default:{
        fontSize:20,
        width:330,
        height:100,
        marginLeft:10,
        textAlignVertical:'top'
    },
    image: {
    width: 200,
    height: 500,
    
    
  },
  container:{
    alignItems:'center',
  }
  
    
});
