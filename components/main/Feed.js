import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity, Alert, ScrollView, TextInput, RefreshControl } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import UrlAPI from '../../UrlAPI';
import icsearch from '../../img/search.png'
import iccamera from '../../img/iccamera.png'
import icgallery from '../../img/gallery.png'
import icheart from '../../img/heart.png'
import icheartcolor from '../../img/icheart.png'
import icheartreact from '../../img/green.png'
import iccomment from '../../img/comment.png'
import ava from '../../img/ava.png'
import GetPostAPI from '../../API/GetPost';
import GetAuUser from '../../API/GetAuUser';
import GetToken from '../../API/GetToken';

var token = '';
GetToken().then(t =>{
  token = t;
})
//const { heights} = Dimensions.get('windown');
//const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvemJpb2dnZy5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE2MzI4MjY2NzcsImV4cCI6MTYzMzA4NTg3NywibmJmIjoxNjMyODI2Njc3LCJqdGkiOiJId1F1YTBGZzl3SzhFWmhlIiwic3ViIjo0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.BLL3msF7NJ6IWqpsmu4T6Iiy7rx6pD6zp8E1IU2s1mc';

class Feed extends React.Component {

  
  constructor(props) {
    super(props)
    this.state = ({
      deletedRowKey: null,
      refreshing:false,
      datapost: [],
      datauser:{},
      listPostNF_id:[], //post?po
      backgroundColor: 'white',
      pressed: false,
      colortext:'black',
      iconheart:icheart
    });
  }
  componentDidMount() {
    this.refreshPost();
    this.refeshAuthUser();
  }
  refeshAuthUser = () => {
    GetAuUser().then((user) => {
      this.setState({datauser:user});
      console.log(user.img_avt)
    }).catch((error)=>{
      this.setState({datauser:[]});
    });
  }

  loadMorePost = async () => {

    const url = UrlAPI.url+"posts?arrPosts="+ this.state.listPostNF_id;
    console.log("url: "+url);
    var headers={'Accept':'application/json',
    'Content-Type':'application/json',
    'Authorization': 'Bearer ' + token };
    this.setState({refreshing:true})
    try{
        fetch(url,
            {
                method:'GET',
                headers:headers,
            }).then((response)=>response.json())
            .then((responseJson)=>{
              this.setState({
                   datapost:this.state.datapost.concat(responseJson.data),
                  refreshing : false,
            });
            responseJson.data.map(a=>{
              this.state.listPostNF_id.push(a.postID);
            })
            
          })
          
        //let responseJson = await response.json();
        //return responseJson.data
    }catch (error) {
        console.error(`Error is: ${error}`);
    }

   
    //   
    //   Array.from(this.state.datapost).forEach(element => {
    //     this.state.listPostNF_id.push(element.postID)
    //     console.log(this.state.listPostNF_id)
    //   });
      
   
  }

  refreshPost = async () => {

    const url = UrlAPI.url+"posts";
    console.log("url: "+url);
    var headers={'Accept':'application/json',
    'Content-Type':'application/json',
    'Authorization': 'Bearer ' + token };
    this.setState({refreshing:true})
    try{
        fetch(url,
            {
                method:'GET',
                headers:headers,
            }).then((response)=>response.json())
            .then((responseJson)=>{
              console.log(responseJson);
              this.setState({
                   datapost:responseJson.data,
                   listPostNF_id:[],
                  refreshing : false,
            });
            responseJson.data.map(a=>{
              this.state.listPostNF_id.push(a.postID);
            })
            
          })
          
        //let responseJson = await response.json();
        //return responseJson.data
    }catch (error) {
        console.error(`Error is: ${error}`);
    }

   
    //   
    //   Array.from(this.state.datapost).forEach(element => {
    //     this.state.listPostNF_id.push(element.postID)
    //     console.log(this.state.listPostNF_id)
    //   });
      
   
  }
  
  onRefresh = () =>{
    this.refreshPost();
  }
  onLoadmoreData =() =>{
    this.loadMorePost();
      
  };
  onProfile = () =>{
    this.props.navigation.navigate("Profile")
  }
  onPoststatus = () =>{
    this.props.navigation.navigate("PostStatus")
  }
  onSearch = ()=>{
    this.props.navigation.navigate("Search")
  }
  onCmt = () => {
    this.props.navigation.navigate("Comment")
  }
  onLike = async() =>{
    var idpost= '975'; //this.state.datapost.postID;
    var LikesAPIURL = UrlAPI.url + "likes";
    var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        var Data = {
          'postID': idpost,
      };
        fetch(LikesAPIURL,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data)
            }
        )
            .then((response) => response.json())
            .then((response) => {
                
                if ((response.message=='liked')) {
                    console.log(response);
                    this.setState({
                      colortext: 'green',
                      iconheart:icheartreact
                 });
                } else {
                  this.setState({
                    colortext: 'black',
                    iconheart:icheart
               });
                }

            })

            .catch((error) => {
                alert("error" + error);
            })
    
  //   if(!this.state.pressed){
  //     this.setState({ pressed: true,colortext: 'red',iconheart:icheartreact});
  //  } else {
  //    this.setState({ pressed: false, colortext: 'black',iconheart:icheart});
  //  }
  }
  render() {
    _renderItem = ({item, index}) =>{
      return (
        <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5}}>
        <TouchableOpacity style={{flexDirection: 'row' }}>
          <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2,borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + item.userAvt }} />
          <Text style={{paddingLeft: 10, paddingTop:10}}>
            {item.userfullname}
          </Text>
        </TouchableOpacity >
        <Text style={{paddingLeft: 10}}>{item.post_Content}</Text>
        {
        item.post_Images.length!=0?
          <Image style={{ height: 300, width: null }} source={{uri: 'https://zbioggg.com/' + item.post_Images[0].image}}/>
        :null
        }
        <View style={{paddingLeft: 10,borderBottomColor: '#DFDFDF', borderBottomWidth: 1,flexDirection: 'row',justifyContent: 'space-between',}}>
          <Text>{item.like_qty}
          </Text>
          <Text>{item.cmt_qty} bình luận</Text>
        </View>
        <View style={styles.viewbtn1}>
        <TouchableOpacity onPress = {this.onLike} style={styles.btn}>
          
            {item.liked==0?
            <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)'}} source={this.state.iconheart} />
            :
            <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)'}} source={icheartreact} />
            }
             {item.liked==0?
            <Text style={{ marginTop: 7, marginLeft: 5,color:this.state.colortext }}>Thích</Text>
            :
            <Text style={{ marginTop: 7, marginLeft: 5,color:'green' }}>Thích</Text>
            }
          
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.onCmt} style={styles.btn1}>
            <Image style={{ height: 25, width: 25, marginTop: 3, marginLeft: 2 }} source={iccomment} />
            <Text style={{ marginTop: 7, marginLeft: 5 }}> Bình luận</Text>
          </TouchableOpacity>
          </View>
         
      </View>

      )
    }
    return (
      <View style={{ backgroundColor: 'white', paddingBottom:350}}>   
        <View style={styles.viewheader}>
          <Text style={{ fontSize: 25, color: '#5ac618', paddingLeft: 10, marginTop: 7 }}>
            ZBIOGG
          </Text>
          
          <TouchableOpacity onPress={this.onSearch} style={{ height: 40, width: 40, backgroundColor: '#DFDFDF', marginTop: 3, marginRight: 10, borderRadius: 100 }}>
            <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2 }} source={icsearch} />
          </TouchableOpacity>
        </View> 
        <View style={{ flexDirection: 'row', height: 50, borderBottomColor: '#DFDFDF', borderBottomWidth: 1 }}>
          <TouchableOpacity onPress={this.onProfile} style={{ height: 40, width: 40, marginTop: 2, marginLeft: 10 }}>
            {
              this.state.datauser.img_avt?
              <Image style={{ height: 40, width: 40, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{uri: 'https://zbioggg.com/'+this.state.datauser.img_avt }} />
              :
              <Image style={{ height: 40, width: 40, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{uri: 'https://zbioggg.com/'+'img/avt/avt-default.png' }} />
            }
            
           
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPoststatus} style={{borderWidth:1,borderRadius:50, padding:10,width:300,height:40,marginTop:5, marginLeft:5,borderColor:"#DFDFDF"}}>
            <Text style={{color:"#a9a9a9"}}>What are you thinking???</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.viewbtn} >
          <TouchableOpacity style={styles.btn}>
            <Image style={{ height: 35, width: 35, marginTop: 3, marginLeft: 2 }} source={iccamera} />
            <Text style={{ marginTop: 10, marginLeft: 5 }}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn1}>
            <Image style={{ height: 35, width: 35, marginTop: 3, marginLeft: 2 }} source={icgallery} />
            <Text style={{ marginTop: 10, marginLeft: 5 }}> Ảnh</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
          style={{flex: 0}}
            ref={"flatlist"}
            data={this.state.datapost}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.onLoadmoreData}
            refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />}
          >
          </FlatList>
        </View>
        
      </View>
      

    )
  }
}

export default Feed
const styles = StyleSheet.create({
  txtStyle: {
    marginLeft: 10,
    borderColor: '#DFDFDF',
    borderWidth: 1,
    borderRadius: 20,
    width: 290,
    height: 40,
    marginTop: 5,
    paddingLeft: 10
  },
  btn: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginLeft: 40,
    borderRightColor: '#DFDFDF',
    borderRightWidth: 1,
    width: 145
  },
  btn1: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginLeft: 40,
    width: 145,
  },
  viewbtn: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#DFDFDF'
  },
  viewbtn1: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#DFDFDF',

  },
  viewheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#DFDFDF',
    height: 50
  }
});