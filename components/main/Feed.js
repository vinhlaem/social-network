import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity, Alert, ScrollView} from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import UrlAPI from '../../UrlAPI';
import GetToken from '../../API/GetToken';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvemJpb2dnZy5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE2MzI4MjY2NzcsImV4cCI6MTYzMzA4NTg3NywibmJmIjoxNjMyODI2Njc3LCJqdGkiOiJId1F1YTBGZzl3SzhFWmhlIiwic3ViIjo0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.BLL3msF7NJ6IWqpsmu4T6Iiy7rx6pD6zp8E1IU2s1mc';
const url = UrlAPI.url+"posts";

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
                console.log(response)   
                    })
                    .catch((error)=>
                    {
                        console.log(error)
                    })
      }
   
      render(){
        return (
          <Text>Feed</Text>
      )
      }
}

export default Feed
const styles = StyleSheet.create({
    
  });