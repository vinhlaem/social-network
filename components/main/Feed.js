import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity, Alert, ScrollView,TextInput} from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import UrlAPI from '../../UrlAPI';
import GetToken from '../../API/GetToken';
import icsearch from '../../img/search.png'
import iccamera from '../../img/iccamera.png'
import icgallery from '../../img/gallery.png'
import ava from '../../img/ava.png'
//const { heights} = Dimensions.get('windown');
//const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvemJpb2dnZy5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE2MzI4MjY2NzcsImV4cCI6MTYzMzA4NTg3NywibmJmIjoxNjMyODI2Njc3LCJqdGkiOiJId1F1YTBGZzl3SzhFWmhlIiwic3ViIjo0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.BLL3msF7NJ6IWqpsmu4T6Iiy7rx6pD6zp8E1IU2s1mc';
const url = UrlAPI.url+"posts";
var token = '';
GetToken().then(t =>{
    token = t;
})
export class Feed extends Component {

    componentDidMount(){
     var headers={'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token };
        return fetch(url,
          {
              method:'GET',
              headers:headers,
          })
          .then((response)=>response.json())
          .then((response)=>
            {
              console.log(token);
                console.log(response)   
                    })
                    .catch((error)=>
                    {
                        console.log(error)
                    })
      }
      render(){
        return (
          <View style={{ backgroundColor:'white'}}>
            <View style={styles.viewheader}>
              <Text style={{fontSize:25,color:'#5ac618',paddingLeft:10, marginTop:7}}>
                ZBIOGG
              </Text>
              <TouchableOpacity style={{height:40,width:40,backgroundColor:'#DFDFDF',marginTop:3,marginRight:10,borderRadius:100}}>
                <Image style={{height: 35,width: 35,marginTop:2,marginLeft:2}} source={icsearch} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',height:50,borderBottomColor:'#DFDFDF',borderBottomWidth:1}}>
              <TouchableOpacity style={{height:40,width:40,marginTop:2,marginLeft:10}}>
                <Image style={{height: 40,width: 40,marginTop:3,marginLeft:2,borderRadius:100}} source={ava} />
              </TouchableOpacity>
              <TextInput style={styles.txtStyle} placeholder={"What are you thinking???"}
                    placeholderTextColor={"#a9a9a9"}
                    underlineColorAndroid="transparent"
                    >
              </TextInput>
            </View>
            <View style={styles.viewbtn} >
              <TouchableOpacity style={styles.btn}>
                <Image style={{height: 35,width: 35,marginTop:3,marginLeft:2}} source={iccamera} />
                <Text style={{marginTop:10,marginLeft:5}}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn1}>
                <Image style={{height: 35,width: 35,marginTop:3,marginLeft:2}} source={icgallery} />
                <Text style={{marginTop:10, marginLeft:5}}> Ảnh</Text>
              </TouchableOpacity>
              </View>
          </View>
          
      )
      }
}

export default Feed
const styles = StyleSheet.create({
    txtStyle:{  
        marginLeft:10,
        borderColor: '#DFDFDF',
        borderWidth: 1,
        borderRadius:20,
        width:290,
        height:40,
        marginTop:5,
        paddingLeft:10
    },
    btn:{
      flexDirection:'row',
      alignItems:'center',
      paddingVertical:15,
      marginLeft:40,
      borderRightColor:'#DFDFDF',
      borderRightWidth:1,
      width:145
    },
    btn1:{
      flexDirection:'row',
      alignItems:'center',
      paddingVertical:15,
      marginLeft:40,
      width:145,
    },
    viewbtn:{
      flexDirection:'row',
      borderBottomWidth:5,
      borderBottomColor:'#DFDFDF'
    },
    viewheader:{
      flexDirection:'row', 
      justifyContent:'space-between',
      borderBottomWidth:2,
      borderBottomColor:'#DFDFDF',
      height:50
    }
  });