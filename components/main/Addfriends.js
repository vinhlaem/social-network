import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import icsearch from '../../img/search.png'
import GetSuggestFriends from '../../API/GetSuggestFriends'
import UrlAPI from '../../UrlAPI'
import GetToken from '../../API/GetToken'
var token = '';
GetToken().then(t => {
  token = t;
})

export class Addfriends extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            datasuggest: [],
            datarequest:[]
            

        });
    }
    componentDidMount() {
        this.refeshsuggestfriends();
        this.refeshrequestFriends();
    }
    refeshrequestFriends = () => {
        var requestFriends = UrlAPI.url + "requestFriends"
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        fetch(requestFriends,
            {
                method: 'GET',
                headers: headers
            }
        )
            .then((response) => response.json())
            .then((response) => {

                
                    console.log(response);
                    this.setState({
                        datarequest: response.data,
                    });
                
            })

            .catch((error) => {
                alert("error" + error);
            })


    }
    refeshsuggestfriends = () => {
        var suggestfriends = UrlAPI.url + "suggestFriends"
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        fetch(suggestfriends,
            {
                method: 'GET',
                headers: headers
            }
        )
            .then((response) => response.json())
            .then((response) => {

                
                    console.log(response);
                    this.setState({
                        datasuggest: response.data,
                    });
                
                

            })

            .catch((error) => {
                alert("error" + error);
            })


    }
    addfriends = (index, id)=>{
        this.state.datasuggest[index].status_friend = !this.state.datasuggest[index].status_friend;
        this.setState({
          datasuggest: this.state.datasuggest
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
        if (response.status=0) {
            
            this.state.datasuggest[index].status_friend = response.status;
            
         this.setState({
           datasuggest: this.state.datasuggest
          })
          
        } else  {
        }

      })

      .catch((error) => {
        alert("error" + error);
      })
    }
    canceladdfriends  = (index, id)=>{
        this.state.datasuggest[index].status_friend = !this.state.datasuggest[index].status_friend;
        this.setState({
          datasuggest: this.state.datasuggest
        })
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
            
            this.state.datasuggest[index].status_friend = -1;
            
         this.setState({
           datasuggest: this.state.datasuggest
          })
          
        } else  {
        }

      })

      .catch((error) => {
        alert("error" + error);
      })
    }
    acceptFriend  = (index, id)=>{
        this.state.datarequest[index].status_friend = !this.state.datarequest[index].status_friend;
        this.setState({
          datarequest: this.state.datarequest
        })
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
            
            this.state.datarequest[index].status_friend = -1;
            
         this.setState({
           datarequest: this.state.datarequest
          })
          
        } else  {
        }

      })

      .catch((error) => {
        alert("error" + error);
      })
    }
    render() {
        _renderItemm = ({ item, index }) => {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding:10 }}>
                        {
                            item.img_avt ?
                                <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + item.img_avt }} />
                                :
                                <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                        }
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.lastName} {item.firstName}</Text>
                        <Text style={{ color: '#2F4F4F' }}>{item.mutual_friends} Bạn chung</Text>
                        <View style={{ flexDirection: 'row', }}>
                            {
                            item.status_friend==0?
                            <TouchableOpacity onPress={() => this.acceptFriend(index, item.id)} style={{ width: 100, backgroundColor: '#5ac618', borderRadius: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Xác nhận</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity  style={{ width: 100, backgroundColor: '#fff', borderRadius: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Bạn bè</Text>
                            </TouchableOpacity>
                            }
                            <TouchableOpacity style={{ marginLeft: 10, backgroundColor: '#DFDFDF', width: 100, borderRadius: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

        _renderItem = ({ item, index }) => {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding:10 }}>
                        {
                            item.img_avt ?
                                <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + item.img_avt }} />
                                :
                                <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                        }
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.lastName} {item.firstName}</Text>
                        <Text style={{ color: '#2F4F4F' }}>{item.mutual_friends} Bạn chung</Text>
                        <View style={{ flexDirection: 'row', }}>
                            {
                            item.status_friend==-1?
                            <TouchableOpacity onPress={() => this.addfriends(index, item.id)} style={{ width: 100, backgroundColor: '#5ac618', borderRadius: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Thêm bạn bè</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.canceladdfriends(index, item.id)} style={{ width: 100, backgroundColor: '#fff', borderRadius: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Hủy lời mời</Text>
                            </TouchableOpacity>
                            }
                            <TouchableOpacity style={{ marginLeft: 10, backgroundColor: '#DFDFDF', width: 100, borderRadius: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View style={{marginTop:30}}>
                <View style={styles.viewheader}>
                    <Text style={{ fontSize: 25, color: '#5ac618', paddingLeft: 10, marginTop: 7 }}>
                        ZBIOGG
                    </Text>
                    <TouchableOpacity style={{ height: 40, width: 40, marginTop: 3, marginRight: 10, borderRadius: 100 }}>
                        <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius:100 }} source={icsearch} />
                    </TouchableOpacity>
                </View>
              
                <View>
                    <FlatList
                    ListHeaderComponent={
                        <>
                <View style={styles.viewheader}>
                {this.state.datarequest.length!=0?
                    <Text style={{ fontSize: 20, color: '#2F4F4F', paddingLeft: 10, marginTop: 7 }}>
                        Lời mời kết bạn
                    </Text>
                    :
                    <Text style={{ fontSize: 20, color: '#2F4F4F', paddingLeft: 10, marginTop: 7 }}>
                    Bạn không có lời mời kết bạn nào
                    </Text>
                    }
                </View>
                <View>
                    <FlatList
                        style={{ flex: 0 }}
                        ref={"flatlist"}
                        data={this.state.datarequest}
                        renderItem={_renderItemm}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </View>
                <View style={styles.viewheader}>
                    <Text style={{ fontSize: 20, color: '#2F4F4F', paddingLeft: 10, marginTop: 7 }}>
                        Gợi ý kết bạn
                    </Text>
                    
                </View>
              </>
                    }
                        style={{ flex: 0 }}
                        ref={"flatlist"}
                        data={this.state.datasuggest}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </View>
                
               
            </View>
        )
    }
}

export default Addfriends
const styles = StyleSheet.create({
    viewheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#DFDFDF',
        height: 50
    }
});
