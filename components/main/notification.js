import React, { Component } from 'react'
import { Text, TouchableOpacity,Image, View, FlatList,RefreshControl } from 'react-native'
import GetToken from '../../API/GetToken'
import UrlAPI from '../../UrlAPI'
var token = '';
GetToken().then(t => {
    token = t;
})
export class notification extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            refreshing: false,
            datanotifications: [],
        });
    }
   
    componentDidMount() {
        
        this.Getnotification();

    }
    

    Getnotification = async () => {
        var NotificationAPIURL = UrlAPI.url + "notification"
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        this.setState({ refreshing: true })
        fetch(NotificationAPIURL,
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
                        datanotifications: response.notifications,
                        refreshing:false
                    });
                } else {
                    alert("loi");
                }

            })

            .catch((error) => {
                alert("error" + error);
            })
    }
    onRefresh = () => {
        this.Getnotification();
      }
    onDetailPost = (url) =>{
        this.props.navigation.navigate("DetailPost",{
            url_post: url
          })
    }
    render() {
        _renderItem = ({ item, index }) => {
            return(
                <View >
                    <TouchableOpacity onPress={()=>this.onDetailPost(item.url)} style={{flexDirection:'row', margin:5, marginLeft:20 }}>
                    {
                        item.sender_Avt ?
                        <Image style={{ height: 40, width: 40, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + item.sender_Avt }} />
                        :
                         <Image style={{ height: 40, width: 40, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                        }
                        <View>
                            <Text style={{marginTop:10, fontWeight:'bold', paddingLeft:10}} >{item.sender_fullname}</Text>
                            <Text style={{marginLeft:10}}>{item.message}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={{marginTop:30}}>
                <View>
                    <Text style={{fontSize:20,fontWeight:'bold', padding:10}}>Thông Báo</Text>
                </View>
                <FlatList
                ref={"flatlist"}
                data={this.state.datanotifications}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />}>
               
                </FlatList>
            </View>
        )
    }
}

export default notification
