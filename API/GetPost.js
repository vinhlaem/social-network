import React, {Component} from "react";
import UrlAPI from "../UrlAPI";
import GetToken from '../API/GetToken';
const url = UrlAPI.url+"posts";
var token = '';

//viet them api or sua
// viet file js api co the truyen bien array vao(post ID), bien truyen vao ten la arrID
//ur nhu tren them ?postArr=+arrID
GetToken().then(t =>{
    token = t;
})
async function GetPostAPI (){
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
        return responseJson.data
    }catch (error) {
        console.error(`Error is: ${error}`);
    }
    
      
  }
  export default GetPostAPI;