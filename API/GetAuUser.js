import React, {Component} from "react";
import UrlAPI from "../UrlAPI";
import GetToken from '../API/GetToken';
const url = UrlAPI.url+"user";
var token = '';
GetToken().then(t =>{
    token = t;
})

async function GetAuUser (){
    var headers={'Accept':'application/json',
    'Content-Type':'application/json',
    'Authorization': 'Bearer ' + token };
    try{
        let response = await fetch(url,
            {
                method:'GET',
                headers:headers,
            })
        let responseJson = await response.json();
        return responseJson.data[0]
    }catch (error) {
        console.error(`Error is: ${error}`);
    }
    
      
  }
  export default GetAuUser;