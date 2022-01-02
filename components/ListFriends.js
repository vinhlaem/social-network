import React, { Component } from 'react'
import { View,Text,FlatList,Image,TouchableOpacity } from 'react-native'
import GetToken from '../API/GetToken'
import UrlAPI from '../UrlAPI';

var token = '';
GetToken().then(t => {
    token = t;
})

export class ListFriends extends Component {


    constructor(props) {
        super(props)
        this.state = ({
           
            refreshing: false,
            datalistfriends: [],

        });
    }
    componentDidMount() {
        
        this.GetLisFriends();

    }
    GetLisFriends = async () => {
        var iduser = this.props.route.params.ID;
       console.log(iduser)
        var ListFriendsAPIURL = UrlAPI.url + "friends?userID=" + iduser;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        fetch(ListFriendsAPIURL,
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
                        datalistfriends: response.listfriends
                    });
                } else {
                    alert("loi");
                }

            })

            .catch((error) => {
                alert("error" + error);
            })
    }
    onProfileother = (id) => {
        this.props.navigation.navigate("Profileorther",{
          userID:id})
      }
    
    render() {
        _renderItem = ({ item, index }) => {
            return(
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity  style={{ flexDirection: 'row' }}>
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
                        
                    </View>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            
            <View  style={{flex: 1}}>
                {this.state.datalistfriends.length>0?
                    <FlatList
                        ref={"flatlist"}
                        data={this.state.datalistfriends}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                    :<Text style={{fontSize:20,fontWeight:'bold',color:'#28a745'}}>Chưa có bạn bè</Text>
    }
                </View>
        )
    }
}

export default ListFriends
