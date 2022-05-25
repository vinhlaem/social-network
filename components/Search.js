import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import icsearch from '../img/search.png'
import UrlAPI from '../UrlAPI'
import GetToken from '../API/GetToken'
import icheart from '../img/heart.png'
import iccomment from '../img/comment.png'
import icheartreact from '../img/green.png'
var token = '';
GetToken().then(t => {
  token = t;
})
export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      text: '',
      search_userdata: {},
      search_postdata: [],
      success: false,
      pressed: false,
      colortext: 'black',
      iconheart: icheart,


    });
  }
  onSearch = async () => {
    var text = this.state.text;
    var images = [];
    var SearchAPIURL = UrlAPI.url + "search?key_search=" + text;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }

    fetch(SearchAPIURL,
      {
        method: 'GET',
        headers: headers
      }
    )
      .then((response) => response.json())
      .then((response) => {

        if ((response.success)) {
          const user_data = Object.keys(response.search_users).map((key) =>  response.search_users[key]);
          this.setState({
            search_postdata: response.search_posts,
            search_userdata: user_data,
            success: true
          });
          console.log(user_data);
        } else {
          alert("loi");
        }

      })

      .catch((error) => {
        alert("error" + error);
      })
  }
  onLike = (index, postID) => {
    this.state.search_postdata[index].liked = !this.state.search_postdata[index].liked;
    this.setState({
      search_postdata: this.state.search_postdata
    })
    var idpost = postID;
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
        if (response.message == 'liked') {
          this.state.search_postdata[index].liked = 1;
          this.state.search_postdata[index].like_qty += 1;
          this.setState({
            search_postdata: this.state.search_postdata
          })
        } else if(response.message=='disliked') {
          this.state.search_postdata[index].liked = 0;
          this.state.search_postdata[index].like_qty -= 1;
          this.setState({
            search_postdata: this.state.search_postdata
          })
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
    _renderItem = ({ item, index }) => {
      return (
        <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5 }}>
           <View>
           <TouchableOpacity onPress={()=>this.onProfileother(item.id)} style={{ flexDirection: 'row', padding:5 }}>
          {
          item.img_avt !=null ?
            <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + item.img_avt }} />
            :<Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
          }
          <View style={{flexDirection:'column'}}>
            {item.mutual_friends==0?
            <Text style={{marginLeft:10,marginTop:5, fontWeight:'bold'}}> {item.lastName} {item.firstName}</Text>
            :
            <Text style={{marginLeft:10, fontWeight:'bold'}}> {item.lastName} {item.firstName}</Text>
            }
            {item.mutual_friends!=0&&
            <Text style={{marginLeft:10}}> {item.mutual_friends} bạn chung</Text>
            }
            
          </View>
            
          </TouchableOpacity >
                  
           </View>
         </View>
      )
    }

    _renderItemm = ({ item, index }) => {
      return (
        <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5 }}>
          <TouchableOpacity style={{ paddingLeft:10, paddingTop: 5,flexDirection: 'row' }}>
            <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + item.userAvt }} />
            <Text style={{ paddingLeft: 10, paddingTop: 10, fontWeight:'bold' }}>
              {item.userfullname}
            </Text>
          </TouchableOpacity >
          <Text style={{ padding: 10 }}>{item.post_Content}</Text>

          {
            item.post_Images.length != 0 ?
              <Image style={{height: 300, width: null }} source={{ uri: 'https://zbioggg.com/' + item.post_Images[0].image }} />
              : null
          }

        <View style={{ padding: 5, borderBottomColor: '#DFDFDF', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{  flexDirection: 'row',  }}>
            <Image style={{ height: 15, width: 15, marginTop: 3,paddingLeft:3,  backgroundColor: 'rgba(0,0,0,0)' }} source={icheartreact}/>
            <Text style={{paddingLeft:3}}>{item.like_qty}</Text>
          </View>
            <Text>{item.cmt_qty} bình luận</Text>
          </View>
          <View style={styles.viewbtn1}>
            <TouchableOpacity onPress={() => this.onLike(index, item.postID)} style={styles.btn}>
            {item.liked == 0 ?
                <Image style={{ height: 35, width: 35,resizeMode:"center", marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)' }} source={this.state.iconheart} />
                :
                <Image style={{ height: 25, width: 25,resizeMode:"center", marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)' }} source={icheartreact} />
              }
              {item.liked == 0 ?
                <Text style={{ marginTop: 2, marginLeft: 1, color: this.state.colortext }}>Thích</Text>
                :
                <Text style={{ marginTop: 2, marginLeft: 5, color: 'green' }}>Thích</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCmt} style={styles.btn1}>
              <Image style={{ height: 20, width: 20, marginTop: 3,resizeMode:"center", marginLeft: 2 }} source={iccomment} />
              <Text style={{ marginTop: 2, marginLeft: 5 }}> Bình luận</Text>
            </TouchableOpacity>
          </View>

        </View>
      )
    }

    return (
      <View>

        <View>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextInput
                    backgroundColor='#DFDFDF'
                    onChangeText={(text) => {
                      this.setState({ text })
                    }}
                    placeholder='Tìm kiếm'
                    
                    style={{ borderWidth: 1, width: 300, marginLeft: 5, borderRadius: 10, padding: 5,margin:10, borderColor: '#28a745' }}
                  />
                  <TouchableOpacity onPress={this.onSearch} style={{ height: 40, width: 40, marginTop: 10, marginRight: 10, borderRadius: 100 }}>
                    <Image style={{ height: 40, width: 40, marginTop: 2, marginLeft: 2, borderRadius:100, backgroundColor: 'rgba(0,0,0,0)' }} source={icsearch} />
                  </TouchableOpacity>
                </View>
                {this.state.success===true&&
                <Text style={{fontSize:20,fontWeight:'bold', margin:10}}>Mọi người</Text>
                }
                <FlatList
                style={{ flex: 1}}
                ref={"flatlist"}
                data={  this.state.search_userdata}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                  >
              
              </FlatList>
              {this.state.success===true&&
                <Text style={{fontSize:20,fontWeight:'bold', margin:10}}>Bài viết</Text>
              }
              </>
            }
            style={{ flex: 0 }}
            ref={"flatlist"}
            data={this.state.search_postdata}
            renderItem={_renderItemm}
            keyExtractor={(item, index) => index.toString()}>
              
          </FlatList>
          
        </View>
      </View>
    )
  }
}

export default Search
const styles = StyleSheet.create({

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginLeft: 40,
    borderRightColor: '#DFDFDF',
    borderRightWidth: 1,
    width: 145
  },
  btn1: {
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
    height:40,
    borderBottomColor: '#DFDFDF',

  },

});
