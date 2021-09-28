import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity, Alert, ScrollView} from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import UrlAPI from '../../UrlAPI';
import GetToken from '../../API/GetToken';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvemJpb2dnZy5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE2MzI3OTQ1MjQsImV4cCI6MTYzMzA1MzcyNCwibmJmIjoxNjMyNzk0NTI0LCJqdGkiOiJ5YVFmTDRvVXpLQ212ekFiIiwic3ViIjoyLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.hoOh1Bl0hoMuWvg-tuxDEqwDXIw77YNH6C2GErpYOKI';
const url = UrlAPI.url+"Posts";

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
              if((response.success))
                {
                  console.log(response)
                  
                            
                  }     
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