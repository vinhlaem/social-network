/// shimmer layout
import React, { Component } from 'react'
import { Text,View,StyleSheet,TouchableOpacity,Image,FlatList,ScrollView } from 'react-native'
import icsearch from '../img/search.png'
import GetProfile from '../API/GetProfile'; 
import icgender from '../img/sex.png'
import icdob from '../img/dob.png'
import icphone from '../img/phone.png'
import icemail from '../img/email.png'
import iccomment from '../img/comment.png'
import icheart from '../img/heart.png'

class FlatListItem extends Component {
  render() {
    return (
      <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5}}>
        <TouchableOpacity style={{flexDirection: 'row' }}>
          <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2,borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + this.props.item.userAvt }} />
          <Text style={{paddingLeft: 10, paddingTop:10}}>
            {this.props.item.userfullname}
          </Text>
        </TouchableOpacity >
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

export class Profile extends Component {

    constructor(props) {
    super(props)
    this.state = ({
      deletedRowKey: null,
      refreshing:false,
      userInfo:{},
      userPhotos: [],
      userPosts: [],
      totalLike: 0,
      totalCmt:0
    });
  }
  componentDidMount() {
    this.refeshProfile();
  }
  refeshProfile = () => {
    var t =0;
    var c =0;
    GetProfile().then((profile) => {
      this.setState({userInfo:profile.user[0]});
      this.setState({userPosts:profile.data});
      this.setState({userPhotos:profile.photos});
      //console.log(profile.user[0])
      // this.setState.totalLike();
      Array.from(this.state.userPosts).forEach(element => {
        t+=element.like_qty;
        console.log(element.like_qty)
      });
      this.setState({totalLike: t})
      Array.from(this.state.userPosts).forEach(element=> {
        c+=element.cmt_qty;
        console.log(element.cmt_qty)
      });
      this.setState({totalCmt: c})

    }).catch(console.log);
  }

    render() {
        return (
          <View>
            <View>
              <FlatList
                ListHeaderComponent={
                  <>
                    <View style={styles.viewheader}>
                      <Text style={{ fontSize: 20, color: '#5ac618', paddingLeft: 10, marginTop: 10 }}>
                        Trang Cá Nhân
                      </Text>
                      <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: '#DFDFDF', marginTop: 3, marginRight: 10, borderRadius: 100 }}>
                        <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2 }} source={icsearch} />
                      </TouchableOpacity>
                    </View>
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
                      <View style={{alignItems:'center'}}>
                      <Text style={{fontWeight: "bold",fontSize:20,color:'#5ac618'}}>{Object.keys(this.state.userPosts).length}</Text>
                      <Text style={{ fontSize: 15 }}>Bài viết </Text>
                      </View>
                      <View style={{alignItems:'center'}}>
                      <Text style={{fontWeight: "bold",fontSize:20,color:'#5ac618'}}>{this.state.totalLike}</Text>
                      <Text style={{ fontSize: 15 }}>Lượt thích </Text>
                      </View>
                      <View style={{alignItems:'center'}}>
                      <Text style={{fontWeight: "bold",fontSize:20,color:'#5ac618'}}>{this.state.totalCmt}</Text>
                      <Text style={{ fontSize: 15 }}>Bình Luận</Text>
                      </View>
                    </View>
                    <View style={{ padding: 10 }}>
                      <TouchableOpacity style={{ backgroundColor: '#5ac618', padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 15, textAlign: 'center',fontWeight:'bold' }}> Chỉnh sửa thông tin</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#DFDFDF', borderBottomWidth: 1 }}>
                      <Text style={{ fontSize: 20 }}>Thông tin</Text>
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'row', }}>
                      <Image
                        source={icgender}
                        style={styles.imageStyle}
                      />
                      <Text style={{ fontSize: 20, paddingLeft: 5 }}>Giới tính: {this.state.userInfo.gender}</Text>
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'row', }}>
                      <Image
                        source={icdob}
                        style={styles.imageStyle}
                      />
                      <Text style={{ fontSize: 20, paddingLeft: 5 }}>Ngày sinh: {this.state.userInfo.doB}</Text>
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'row', }}>
                      <Image
                        source={icphone}
                        style={styles.imageStyle}
                      />
                      <Text style={{ fontSize: 20, paddingLeft: 5 }}>Di động: {this.state.userInfo.phone}</Text>
                    </View>

                    <View style={{ marginLeft: 10, flexDirection: 'row', }}>
                      <Image
                        source={icemail}
                        style={styles.imageStyle}
                      />
                      <Text style={{ fontSize: 20, paddingLeft: 5 }}>Email: {this.state.userInfo.email}</Text>
                    </View>
                  </>
                }
                //nestedScrollEnabled={true}
                style={{ flex: 0 }}
                ref={"flatlist"}
                data={this.state.userPosts}
                renderItem={({ item, index }) => {
                  return (
                    <FlatListItem item={item} index={index} parentFlatList={this}>
                    </FlatListItem>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              >
              </FlatList>
            </View>
          </View>
            
                
            
           
        )
    }
}

export default Profile
 const styles = StyleSheet.create ({
    viewheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#DFDFDF',
        height: 50
      },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
        
      },
      imageStyle:{
        resizeMode: "center",
        height: 25,
      width: 25
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
      borderBottomColor: '#DFDFDF'
    },
 });