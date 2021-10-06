import React, {Component} from "react";
import UrlAPI from "../UrlAPI";
import GetToken from '../API/GetToken';
const url = UrlAPI.url+"user";
var token = '';
GetToken().then(t =>{
    token = t;
})
// 1 trang cá nhân 2 api get auuser vs get post auuser
// vd nhu chinh sua anh dai dien thay avt lan 
//redux bo luu tru toan bo data cua app avtauuser 
// khi sua anh vo component sua anh -> thay doi avtuser trong redux -> toan bo cai avtuser get tu redux
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