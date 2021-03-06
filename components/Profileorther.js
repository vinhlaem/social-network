/// shimmer layout
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import icsearch from '../img/search.png'
import GetProfile from '../API/GetProfile';
import icgender from '../img/sex.png'
import icdob from '../img/dob.png'
import icphone from '../img/phone.png'
import icemail from '../img/email.png'
import iccomment from '../img/comment.png'
import icheart from '../img/heart.png'
import UrlAPI from '../UrlAPI';
import GetToken from '../API/GetToken';
import GetAuUser from '../API/GetAuUser';
import icheartreact from '../img/green.png'
import icback from '../img/back.png'



var token = '';
GetToken().then(t => {
  token = t;
})

export class Profileorther extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      deletedRowKey: null,
      refreshing: false,
      userInfo: {},
      userPhotos: [],
      userPosts: [],
      totalLike: 0,
      totalCmt: 0,
      datauser:{},
      colortext: 'black',
      iconheart: icheart,
      backgroundColor: 'white',

    });
  }

  componentDidMount() {
    this.refeshAuthUser();
    this.refeshProfile();
    
  }
  refeshAuthUser = () => {
    GetAuUser().then((user) => {
      this.setState({ datauser: user});
      console.log(user.id)
    }).catch((error) => {
    });
  }
  refeshProfile = () => {
    var t = 0;
    var c = 0;
    var userID = this.props.route.params.userID;
    var GetprofileAPIURL = UrlAPI.url + "userprofile/" + userID;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    fetch(GetprofileAPIURL,
      {
        method: 'GET',
        headers: headers
      }
    )
      .then((response) => response.json())
      .then((response) => {

        if ((response.success)) {
          console.log(response);
          this.setState({
            userInfo: response.user[0],
            userPhotos: response.photos,
            userPosts: response.data

          });
          Array.from(this.state.userPosts).forEach(element => {
            t += element.like_qty;
          
          });
          this.setState({ totalLike: t })
          Array.from(this.state.userPosts).forEach(element => {
            c += element.cmt_qty;
            
          });
          this.setState({ totalCmt: c })
        } else {
          alert("loi");
        }

      })

      .catch((error) => {
        alert("error" + error);
      })
  }
  addfriends = (id) => {
    this.state.userInfo.status_friend = !this.state.userInfo.status_friend;
    this.setState({
      userInfo: this.state.userInfo
    })
    var iduser = id;
    var addfriendAPIURL = UrlAPI.url + "addFriend";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    var Data = {
      'receiverID': iduser,
    };
    fetch(addfriendAPIURL,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {

          this.state.userInfo.status_friend = response.status;
          this.state.userInfo.action_userID = response.action_userID;
          this.setState({
            userInfo: this.state.userInfo
          })

        } else {
        }
        
      })

      .catch((error) => {
        alert("error" + error);
      })
  }
  canceladdfriends = (id) => {
    
     
    var iduser = id;
    var addfriendAPIURL = UrlAPI.url + "cancelAddFriend";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    var Data = {
      'receiverID': iduser,
    };
    fetch(addfriendAPIURL,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {

          this.state.userInfo.status_friend = -1;

          this.setState({
            userInfo: this.state.userInfo
          })

        } else {
        }

      })

      .catch((error) => {
        alert("error" + error);
      })
  }
  acceptFriend = ( id) => {
    
    var iduser = id;
    var addfriendAPIURL = UrlAPI.url + "acceptFriend";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    var Data = {
      'senderID': iduser,
    };
    fetch(addfriendAPIURL,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {

          this.state.userInfo.status_friend = 1;
          this.setState({
            userInfo: this.state.userInfo
          })

        } else {
        }

      })

      .catch((error) => {
        alert("error" + error);
      })
  }
  onListFriends = (id) => {
    this.props.navigation.navigate("ListFriends",{
      ID:id
    })
  }
  onchat = (id) => {
    this.props.navigation.navigate("Chat",{
        userID:id})
  }
  onback = () => {
    this.props.navigation.navigate("Home")
}
onLike = (index, postID) => {
  this.state.userPosts[index].liked = !this.state.userPosts[index].liked;
  this.setState({
    userPosts: this.state.userPosts
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
        this.state.userPosts[index].liked = 1;
        this.state.userPosts[index].like_qty += 1;
        this.setState({
          userPosts: this.state.userPosts
        })
      } else if(response.message=='disliked') {
        this.state.userPosts[index].liked = 0;
        this.state.userPosts[index].like_qty -= 1;
        this.setState({
          userPosts: this.state.userPosts
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

onCmt = (postID) => {
  this.props.navigation.navigate("Comment",{
    postID: postID
  })
}

  render() {
    _renderItem= ({ item, index }) =>{
      return (
        <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5 }}>
          <TouchableOpacity style={{ flexDirection: 'row', padding: 10, paddingTop: 10 }}>
            <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + item.userAvt }} />
            <Text style={{ paddingLeft: 10, paddingTop: 10, fontWeight:"bold" }}>
              {item.userfullname}
            </Text>
          </TouchableOpacity >
          <Text style={{ paddingLeft: 10 }}>{item.post_Content}</Text>
          {
            item.post_Images.length != 0 ?
              <Image style={{ height: 300, width: null }} source={{ uri: 'https://zbioggg.com/' + item.post_Images[0].image }} />
              : null
          }
    
          <View style={{ padding: 5, borderBottomColor: '#DFDFDF', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{  flexDirection: 'row',  }}>
              <Image style={{ height: 15, width: 15, marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)' }} source={icheartreact}/>
              <Text style={{paddingLeft:3}} >{item.like_qty}</Text>
            </View>
            <Text>{item.cmt_qty} b??nh lu???n</Text>
          </View>
          <View style={styles.viewbtn1}>
              <TouchableOpacity onPress={() => this.onLike(index, item.postID)} style={styles.btn}>
              {item.liked == 0 ?
                  <Image style={{ height: 35, width: 35,resizeMode:"center", marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)' }} source={icheart} />
                  :
                  <Image style={{ height: 25, width: 25,resizeMode:"center", marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)' }} source={icheartreact} />
                }
                {item.liked == 0 ?
                  <Text style={{ marginTop: 2, marginLeft: 1, color: this.state.colortext }}>Th??ch</Text>
                  :
                  <Text style={{ marginTop: 2, marginLeft: 5, color: 'green' }}>Th??ch</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onCmt(item.postID)} style={styles.btn1}>
                <Image style={{ height: 20, width: 20, marginTop: 3,resizeMode:"center", marginLeft: 2 }} source={iccomment} />
                <Text style={{ marginTop: 2, marginLeft: 5 }}> B??nh lu???n</Text>
              </TouchableOpacity>
            </View>
    
        </View>
      )
    }
    return (
      <View style={{paddingBottom:160}}>
        <View style={styles.viewheader}>
                <TouchableOpacity onPress={this.onback} style={{ marginLeft: 10, backgroundColor: 'transparent' }}>
                        <Image style={{ height: 20, width: 20, marginTop: 10, marginLeft: 2, }} source={icback} />
                    </TouchableOpacity>
                  {this.state.userInfo.id == this.state.datauser.id?
                  <Text style={{ fontSize: 20, color: '#5ac618', paddingLeft: 10, marginTop: 10 }}>Trang c?? nh??n</Text>
                  :
                  <Text style={{ fontSize: 20, color: '#5ac618', paddingLeft: 10, marginTop: 10 }}>
                    {this.state.userInfo.lastName} {this.state.userInfo.firstName}
                  </Text>
                  }
                  <TouchableOpacity style={{ height: 40, width: 40,  marginTop: 3, marginRight: 10, borderRadius: 100 }}>
                    <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius:100 }} source={icsearch} />
                  </TouchableOpacity>
                </View>
        <View>
          <FlatList
            ListHeaderComponent={
              <>
                
                <View style={styles.container}>
                  {
                    this.state.userInfo.img_cover ?
                      <Image style={{ height: 150, width: 360 }} source={{ uri: 'https://zbioggg.com/' + this.state.userInfo.img_cover }} />
                      :
                      <Image style={{ height: 150, width: 360 }} source={{ uri: 'https://zbioggg.com/' + '/img/cover/cover-default.png' }} />
                  }
                  {
                    this.state.userInfo.img_avt ?
                      <Image style={{ height: 100, width: 100, borderRadius: 100, borderColor: 'white', borderWidth: 3, position: 'absolute', top: 100 }} source={{ uri: 'https://zbioggg.com/' + this.state.userInfo.img_avt }} />
                      :
                      <Image style={{ height: 100, width: 100, borderRadius: 100, borderColor: 'white', borderWidth: 3, position: 'absolute', top: 100 }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                  }
                </View>
                <View style={{ marginTop: 50 }}>
                  <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.userInfo.lastName} {this.state.userInfo.firstName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: '#5ac618' }}>{Object.keys(this.state.userPosts).length}</Text>
                    <Text style={{ fontSize: 15 }}>B??i vi???t </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: '#5ac618' }}>{this.state.totalLike}</Text>
                    <Text style={{ fontSize: 15 }}>L?????t th??ch </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: '#5ac618' }}>{this.state.totalCmt}</Text>
                    <Text style={{ fontSize: 15 }}>B??nh Lu???n</Text>
                  </View>
                </View>
                <View style={{ padding: 10,flexDirection:'row' }}>
                  <View style={{width:250, paddingEnd:10}}>
                  {this.state.userInfo.action_userID != this.state.datauser.id && this.state.userInfo.status_friend == 0?
                  
                    <TouchableOpacity onPress={() => this.acceptFriend(this.state.userInfo.id)} style={{ backgroundColor: '#5ac618', padding: 10, borderRadius: 5 }}>
                    <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>X??c nh???n</Text>
                    </TouchableOpacity>
                    
                  
                    : (this.state.userInfo.status_friend == 0 &&  this.state.userInfo.action_userID == this.state.datauser.id?
                      
                       <TouchableOpacity onPress={() => this.canceladdfriends(this.state.userInfo.id)} style={{ backgroundColor: '#5ac618', padding: 10, borderRadius: 5 }}>
                       <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>H???y l???i m???i</Text>
                     </TouchableOpacity>
                      : (this.state.userInfo.status_friend == -1 && this.state.userInfo.id != this.state.datauser.id  ?
                        <TouchableOpacity onPress={() => this.addfriends(this.state.userInfo.id)} style={{ backgroundColor: '#5ac618', padding: 10, borderRadius: 5 }}>
                          <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Th??m b???n b??</Text>
                        </TouchableOpacity>
                        :(this.state.userInfo.status_friend == 1 && this.state.userInfo.id != this.state.datauser.id  ?
                        <TouchableOpacity  style={{ backgroundColor: '#5ac618', padding: 10, borderRadius: 5 }}>
                          <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>B???n b??</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ backgroundColor: '#5ac618', padding: 10, borderRadius: 5, width:340 }}>
                          <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Ch???nh s???a th??ng tin</Text>
                        </TouchableOpacity>

                        )
                      )
                    )
                  }
                  </View>
                  <View style={{width:90}}>
                  {this.state.userInfo.action_userID != this.state.datauser.id && this.state.userInfo.status_friend == 0?
                  
                  <TouchableOpacity onPress={() => this.onchat(this.state.userInfo.id)} style={{ backgroundColor: '#DFDFDF', padding: 10, borderRadius: 5 }}>
                  <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>nh???n tin</Text>
                  </TouchableOpacity>
                  : (this.state.userInfo.status_friend == 0 &&  this.state.userInfo.action_userID == this.state.datauser.id?
                    
                     <TouchableOpacity onPress={() => this.onchat(this.state.userInfo.id)} style={{ backgroundColor: '#DFDFDF', padding: 10, borderRadius: 5 }}>
                     <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>nh???n tin</Text>
                   </TouchableOpacity>
                    : (this.state.userInfo.status_friend == -1 && this.state.userInfo.id != this.state.datauser.id  ?
                      <TouchableOpacity onPress={() => this.onchat(this.state.userInfo.id)} style={{ backgroundColor: '#DFDFDF', padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>nh???n tin</Text>
                      </TouchableOpacity>
                      :(this.state.userInfo.status_friend == 1 && this.state.userInfo.id != this.state.datauser.id  ?
                      <TouchableOpacity onPress={() => this.onchat(this.state.userInfo.id)} style={{ backgroundColor: '#DFDFDF', padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>nh???n tin</Text>
                      </TouchableOpacity>
                      :
                      null

                      )
                    )
                  )
                }
                </View>
                        
                </View>
                <View style={{paddingLeft:10, paddingRight:10,paddingTop:2}}>
                  <TouchableOpacity style={{ backgroundColor: '#DFDFDF', padding:10, borderRadius: 5 }} onPress={() => this.onListFriends(this.state.userInfo.id)}>
                          <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Xem b???n b??</Text>
                  </TouchableOpacity>
                </View>
                <View style={{padding:10, borderBottomColor:'#DFDFDF' ,borderBottomWidth:10,backgroundColor:'#fff'}}>
                <View style={{ borderBottomColor: '#DFDFDF', borderBottomWidth: 1, paddingBottom:5 }}>
                  <Text style={{ fontSize: 20 }}>Th??ng tin</Text>
                </View>
                <View style={{ marginLeft: 10, flexDirection: 'row', paddingTop:10 }}>
                  <Image
                    source={icgender}
                    style={styles.imageStyle}
                  />
                  <Text style={{ fontSize: 15, paddingLeft: 5 }}>Gi???i t??nh: {this.state.userInfo.gender}</Text>
                </View>
                <View style={{ marginLeft: 10, flexDirection: 'row',paddingTop:10 }}>
                  <Image
                    source={icdob}
                    style={styles.imageStyle}
                  />
                  <Text style={{ fontSize: 15, paddingLeft: 5 }}>Ng??y sinh: {this.state.userInfo.doB}</Text>
                </View>
                <View style={{ marginLeft: 10, flexDirection: 'row',paddingTop:10 }}>
                  <Image
                    source={icphone}
                    style={styles.imageStyle}
                  />
                  <Text style={{ fontSize: 15, paddingLeft: 5 }}>Di ?????ng: {this.state.userInfo.phone}</Text>
                </View>

                <View style={{ marginLeft: 10, flexDirection: 'row', paddingTop:10}}>
                  <Image
                    source={icemail}
                    style={styles.imageStyle}
                  />
                  <Text style={{ fontSize: 15, paddingLeft: 5 }}>Email: {this.state.userInfo.email}</Text>
                </View>
                </View>
              </>
            }
            //nestedScrollEnabled={true}
            style={{ flex: 0 }}
            ref={"flatlist"}
            data={this.state.userPosts}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
          >
          </FlatList>
        </View>
      </View>




    )
  }
}

export default Profileorther
const styles = StyleSheet.create({
  viewheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#DFDFDF',
    height: 50,
    backgroundColor:'white',
    marginTop:30,
    
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',



  },
  imageStyle: {
    resizeMode: "center",
    height: 25,
    width: 25,

  },
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
  viewbtn1: {
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#DFDFDF',
    height: 50
  },
});