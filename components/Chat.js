import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity,StyleSheet,TextInput } from 'react-native'
import GetToken from '../API/GetToken'
import UrlAPI from '../UrlAPI';
import icsend from '../img/send.png'
import icgallery from '../img/gallery.png'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import GetAuUser from '../API/GetAuUser';

var token = '';
GetToken().then(t => {
    token = t;
})

export class Chat extends Component {


    constructor(props) {
        super(props)
        this.state = ({

            refreshing: false,
            listcontentmess: [],
            datauserchat: {},
            text: '',
            height: 0,
            image: null

        });
    }
    refeshAuthUser = () => {
        GetAuUser().then((user) => {
            this.setState({ datauser: user });
        }).catch((error) => {
        });
    }
    componentDidMount() {
        this.refeshAuthUser();
        this.GetListMess();

    }
    GetListMess = async () => {
        var chatuserid = this.props.route.params.userID;
        var ContentMessAPIURL = UrlAPI.url + "messages/" + chatuserid
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        fetch(ContentMessAPIURL,
            {
                method: 'GET',
                headers: headers
            }
        )
            .then((response) => response.json())
            .then((response) => {

                if ((response)) {
                    console.log(response);
                    this.setState({
                        listcontentmess: response.message,
                        datauserchat: response.user
                    });
                } else {
                    alert("loi");
                }

            })

            .catch((error) => {
                alert("error" + error);
            })
    }
    showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        };
        const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.66 });
        // console.log(result);rs app di thay nhanh hon k :v


        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }

    };
    render() {
        _renderItem = ({ item, index }) => {
            return (
                <View style={{ padding: 5 }} >
                    
                    {item.fromID==this.state.datauserchat.id?
                    
                    <View style={{flexDirection:'row'}}>
                        {
                        this.state.datauserchat.img_avt ?
                            <Image style={{ height: 40, width: 40, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + this.state.datauserchat.img_avt }} />
                            :
                            <Image style={{ height: 40, width: 40, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                    }
                    <View style={{backgroundColor:'#DFDFDF',borderRadius:10,alignSelf:'flex-start',alignItems:'baseline',marginLeft:10}}>
                        
                        {item.message!=null && item.message_Image!=null?
                        <View>
                        <Text style={{padding:10,fontSize:16}}>{item.message}</Text>
                        <Image style={{ height: 150, width: 200,borderRadius:10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image}}/>
                        </View>
                        :(item.message!=null && item.message_Image!=null?
                            <Image style={{ height: 150, width: 200,borderRadius:10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image }} />
                         :(item.message==null && item.message_Image!=null?
                            <Image style={{ height: 150, width: 200,borderRadius:10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image}} />
                         :<Text style={{padding:10,fontSize:16}}>{item.message}</Text>   
                        )   
                        )
                        }
                    </View>
                    </View>
                    :
                    
                    <View style={{backgroundColor:'#28a745',borderRadius:10,alignSelf:'flex-end',alignItems:'baseline', marginRight:10}}>
                        {item.message!=null && item.message_Image!=null?
                        <View>
                        <Text style={{padding:10,fontSize:16}}>{item.message}</Text>
                        <Image style={{ height: 150, width: 200,borderRadius:10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image}}/>
                        </View>
                        :(item.message!=null && item.message_Image!=null?
                            <Image style={{ height: 150, width: 200,borderRadius:10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image}} />
                         :(item.message==null && item.message_Image!=null?
                            <Image style={{ height: 150, width: 200,borderRadius:10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image}} />
                         :<Text style={{padding:10,fontSize:16}}>{item.message}</Text>   
                        )   
                        )
                        } 
                    </View>
                    
                }
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row', padding:10, borderBottomWidth:5,borderBottomColor:'#DFDFDF'}}>
                    {
                        this.state.datauserchat.img_avt ?
                            <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + this.state.datauserchat.img_avt }} />
                            :
                            <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                    }
                    <Text style={{paddingLeft:10, paddingTop:10,fontWeight:'bold'}} >
                        {this.state.datauserchat.lastName} {this.state.datauserchat.firstName}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>

                    <FlatList
                    ref={"flatlist"}
                    data={this.state.listcontentmess}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                >
                </FlatList>
                </View>
                <View style={{alignItems:'center',paddingBottom:5}}>
                    {this.state.image!= null? 
                  <Image
                    source={{ uri: this.state.image }}
                    style={{width:100,height:100}}
                    />
                    : null
                    }      
                </View>
                <View style={styles.bottomView} >
                    <TextInput
                        {...this.props}
                        placeholderTextColor={"#a9a9a9"}
                        multiline={true}
                        placeholder="Viết tin nhắn..."
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({ text })
                        }}
                        onContentSizeChange={(event) => {
                            this.setState({ height: event.nativeEvent.contentSize.height })
                        }}
                        style={[styles.default, { height: Math.max(35, this.state.height) }]}
                        value={this.state.text}
                    />
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.onRepcomments} style={{marginLeft:10,backgroundColor: 'transparent'}}> 
                        <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, }} source={icsend} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showImagePicker} style={{marginLeft:10,backgroundColor: 'transparent'}}> 
                        <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, }} source={icgallery} />
                    </TouchableOpacity>
                    
                    </View>
                    
                </View>
            </View>
        )
    }
}

export default Chat
const styles = StyleSheet.create({
    bottomView: {
        flexDirection:'row',
        marginLeft:5,
        width: 340,
        height: 40,
        borderWidth:1,
        borderRadius:20,
        alignItems: 'center',
        //position: 'absolute', 
        bottom: 0, 
      },
      container: {
        flex: 1,
        position: 'relative',
        bottom: 0,
    },
    default: {
        paddingLeft:10,
        fontSize: 20,
        width: 240,
        height: 40,


    },
});
