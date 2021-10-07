import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity, Alert, ScrollView, TextInput, RefreshControl } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import UrlAPI from '../../UrlAPI';
import GetToken from '../../API/GetToken';
import icsearch from '../../img/search.png'
import iccamera from '../../img/iccamera.png'
import icgallery from '../../img/gallery.png'
import icheart from '../../img/heart.png'
import icheartreact from '../../img/heartreact.png'
import iccomment from '../../img/comment.png'
import ava from '../../img/ava.png'
import GetPostAPI from '../../API/GetPost';
import GetAuUser from '../../API/GetAuUser';
//const { heights} = Dimensions.get('windown');
//const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvemJpb2dnZy5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE2MzI4MjY2NzcsImV4cCI6MTYzMzA4NTg3NywibmJmIjoxNjMyODI2Njc3LCJqdGkiOiJId1F1YTBGZzl3SzhFWmhlIiwic3ViIjo0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.BLL3msF7NJ6IWqpsmu4T6Iiy7rx6pD6zp8E1IU2s1mc';


class FlatListItem extends Component {
  render() {
    return (

      <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5}}>
        <TouchableOpacity style={{flexDirection: 'row' }}>
          <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2,borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + this.props.item.userAvt }} />
          <Text style={{paddingLeft: 10, paddingTop:10}}>
            {this.props.item.userfullname}
          </Text>
        </TouchableOpacity>
        <Text style={{paddingLeft: 10}}>{this.props.item.post_Content}</Text>
        {
        this.props.item.post_Images.length!=0?
          <Image style={{ height: 300, width: null }} source={{uri: 'https://zbioggg.com/' + this.props.item.post_Images[0].image}}/>
        :null
        }
        
        <View style={{paddingLeft: 10,borderBottomColor: '#DFDFDF', borderBottomWidth: 1,flexDirection: 'row',justifyContent: 'space-between',}}>
          <Text>{this.props.item.like_qty}
          </Text>
          <Text>{this.props.item.cmt_qty} bình luận</Text>
        </View>
        <View style={styles.viewbtn1}>
        <TouchableOpacity style={styles.btn}>
            <Image style={{ height: 25, width: 25, marginTop: 3, marginLeft: 2 }} source={icheart} />
            <Text style={{ marginTop: 7, marginLeft: 5 }}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn1}>
            <Image style={{ height: 25, width: 25, marginTop: 3, marginLeft: 2 }} source={iccomment} />
            <Text style={{ marginTop: 7, marginLeft: 5 }}> Bình luận</Text>
          </TouchableOpacity>
          </View>
         
      </View>

    )
  }
}
export class Feed extends Component {


  constructor(props) {
    super(props)
    this.state = ({
      deletedRowKey: null,
      refreshing:false,
      datapost: [],
      datauser:{}
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
  refreshPost = () => {
    this.setState({refreshing:true})
    GetPostAPI().then((post) => {
      this.setState({ datapost: post });
      this.setState({refreshing:false})
      
    }).catch((error) => {
      this.setState({ datapost: [] });
      this.setState({refreshing:false})
    });
  }
  onRefresh = () =>{
    this.refreshPost();
  }
  // refreshFlatList = (activeKey) => {
  //   this.setState((prevState) => {
  //     return {
  //       deletedRowKey: activeKey
  //     };
  //   });
  //   this.refs.FlatList.scrollToEnd();
  // }
  render() {
    return (
      
      <View style={{ backgroundColor: 'white', paddingBottom:350}}>   
        <View style={styles.viewheader}>
          <Text style={{ fontSize: 25, color: '#5ac618', paddingLeft: 10, marginTop: 7 }}>
            ZBIOGG
          </Text>
          <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: '#DFDFDF', marginTop: 3, marginRight: 10, borderRadius: 100 }}>
            <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2 }} source={icsearch} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', height: 50, borderBottomColor: '#DFDFDF', borderBottomWidth: 1 }}>
          <TouchableOpacity style={{ height: 40, width: 40, marginTop: 2, marginLeft: 10 }}>
            {
              this.state.datauser.img_avt?
              <Image style={{ height: 40, width: 40, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{uri: 'https://zbioggg.com/'+this.state.datauser.img_avt }} />
              :
              <Image style={{ height: 40, width: 40, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{uri: 'https://zbioggg.com/'+'img/avt/avt-default.png' }} />
            }
            
           
          </TouchableOpacity>
          <TextInput style={styles.txtStyle} placeholder={"What are you thinking???"}
            placeholderTextColor={"#a9a9a9"}
            underlineColorAndroid="transparent"
          >
          </TextInput>
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
            renderItem={({ item, index })  => {
              return (
                <FlatListItem item={item} index={index} parentFlatList={this}>
                </FlatListItem>
                );
            }}
            keyExtractor={(item, index) => index.toString()}
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