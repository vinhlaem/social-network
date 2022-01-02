import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity,RefreshControl } from 'react-native'
import GetToken from '../API/GetToken'
import UrlAPI from '../UrlAPI';
import GetAuUser from '../API/GetAuUser';

var token = '';
GetToken().then(t => {
    token = t;
})

export class Messenger extends Component {


    constructor(props) {
        super(props)
        this.state = ({

            refreshing: false,
            listmess: [],
            datauser: {},

        });
    }
    refeshAuthUser = () => {
        GetAuUser().then((user) => {
            this.setState({ datauser: user });
            console.log(user.id)
        }).catch((error) => {
        });
    }
    componentDidMount() {
        this.refeshAuthUser();
        this.GetListMess();

    }
    onRefresh = () => {
        this.GetListMess();
      }
    GetListMess = async () => {
        var ListMessAPIURL = UrlAPI.url + "messages"
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        this.setState({ refreshing: true })
        fetch(ListMessAPIURL,
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
                        listmess: response.messages,
                        refreshing: false,
                    });
                } else {
                    alert("loi");
                }

            })

            .catch((error) => {
                alert("error" + error);
            })
    }
    onChat = (userChat_ID) => {
        this.props.navigation.navigate("Chat",{
            userID:userChat_ID})
      }
    render() {
        _renderItem = ({ item, index }) => {
            return (
                <View style={{ padding: 5 }} >
                    <TouchableOpacity onPress={()=>this.onChat(item.userChat_ID)} style={{ flexDirection: 'row' }}>
                        <View style={{ padding: 10 }}>
                            {
                                item.userChat_Avt ?
                                    <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + item.userChat_Avt }} />
                                    :
                                    <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                            }
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.userChat_fullname} </Text>
                            {this.state.datauser.id == item.fromID && item.message != null?
                                <Text style={{ fontSize: 15 }}>Bạn: {item.message}</Text>
                                : (this.state.datauser.id != item.fromID ?
                                    <Text style={{ fontSize: 15 }}>{item.userChat_fullname}: {item.message}</Text>
                                : (this.state.datauser.id == item.fromID && item.message == null?
                                    <Text style={{ fontSize: 15 }}>Bạn: đã gửi một ảnh</Text>
                                :
                                    <Text style={{ fontSize: 15 }}>{item.userChat_fullname}: đã gửi một ảnh</Text>
                                    )
                                )
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        return (

            <View style={{ flex: 1 }}>

                <FlatList
                    ref={"flatlist"}
                    data={this.state.listmess}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                      />}
                >
                </FlatList>
            </View>
        )
    }
}

export default Messenger
