import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import GetToken from '../API/GetToken'
import UrlAPI from '../UrlAPI';
import icsend from '../img/send.png'
import icgallery from '../img/gallery.png'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import icback from '../img/back.png'
import GetAuUser from '../API/GetAuUser';
import io from "socket.io-client";

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
            image: null,
            datauser: {},


        });
        this.socket = io("http://chatzbio.herokuapp.com");
    }
    refeshAuthUser = () => {
        GetAuUser().then((user) => {
            this.setState({ datauser: user });
            this.socket.emit("noti_client_id", user.id);

        }).catch((error) => {
        });
    }

    componentDidMount() {

        this.refeshAuthUser();
        this.GetListMess();


        //laays id thang login ra day cho t

        this.socket.on("server_send_message", msg => {

            var ContentMessAPIURL = UrlAPI.url + "detailmess/" + msg.messID
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

                        try {
                            this.setState({ listcontentmess: [...this.state.listcontentmess, response.mess[0]] });
                        } catch (error) {
                            console.log(error);
                        }



                    } else {
                        alert("loi");
                    }

                })

                .catch((error) => {
                    alert("error" + error);
                })
        });

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

                    this.setState({
                        listcontentmess: this.state.listcontentmess.concat(response.message),
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
    onback = () => {
        this.props.navigation.navigate("Messenger")
    }
    onSendmess = async () => {
        var message = this.state.text;
        var message_Image = null;
        if (this.state.image) {
            var message_Image = await FileSystem.readAsStringAsync(this.state.image, { encoding: 'base64' });
        } else {

        }

        var toID = this.state.datauserchat.id

        if (message == '' && !this.state.image) {
            alert("Vui lòng nhập nội dung hoặc chọn ảnh!");
        } else {
            // if (this.state.image) {
            //     message_Image.push(await FileSystem.readAsStringAsync(this.state.image, { encoding: 'base64' }));
            // }
            var SendMessAPIURL = UrlAPI.url + "sendMessage ";
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            var Data = {
                'message': message,
                'message_Image': message_Image,
                'toID': toID
            };

            fetch(SendMessAPIURL,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(Data)
                }
            )
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    if ((response.success)) {
                        this.setState({
                            listcontentmess: this.state.listcontentmess.concat(response.message),
                            text: '',
                            image: null
                        });
                        this.socket.emit("client_send_message", {
                            fromID: response.message[0].fromID,
                            toID: response.message[0].toID,
                            messID: response.message[0].id,
                        });

                    } else {
                        alert("loi");
                    }

                })

                .catch((error) => {
                    alert("error" + error);
                })
        }



    }

    render() {

        _renderItem = ({ item, index }) => {
            return (
                <View style={{ padding: 5 }} >

                    {item.fromID == this.state.datauserchat.id ?

                        <View style={{ flexDirection: 'row' }}>
                            {
                                this.state.datauserchat.img_avt ?
                                    <Image style={{ height: 40, width: 40, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + this.state.datauserchat.img_avt }} />
                                    :
                                    <Image style={{ height: 40, width: 40, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                            }
                            <View style={{ backgroundColor: '#DFDFDF', borderRadius: 10, alignSelf: 'flex-start', alignItems: 'baseline', marginLeft: 10, maxWidth: '70%' }}>

                                {item.message != null && item.message_Image != null ?
                                    <View  >
                                        <Text style={{ padding: 10, fontSize: 16 }}>{item.message}</Text>
                                        <Image style={{ width: 222, resizeMode: "cover", height: 222, borderRadius: 10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image }} />
                                    </View>
                                    : (item.message != null && item.message_Image != null ?
                                        <Image style={{ width: 222, resizeMode: "cover", height: 222, borderRadius: 10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image }} />
                                        : (item.message == null && item.message_Image != null ?
                                            <Image style={{ width: 222, resizeMode: "cover", height: 222, borderRadius: 10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image }} />
                                            : <Text style={{ padding: 10, fontSize: 16 }}>{item.message}</Text>
                                        )
                                    )
                                }
                            </View>
                        </View>
                        :
                        <View style={{ backgroundColor: '#28a745', borderRadius: 10, alignSelf: 'flex-end', alignItems: 'baseline', marginRight: 10 }}>
                            {item.message != null && item.message_Image != null ?
                                <View>
                                    <Text style={{ padding: 10, fontSize: 16 }}>{item.message}</Text>
                                    <Image style={{ width: 222, resizeMode: "cover", height: 222, borderRadius: 10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image }} />
                                </View>
                                : (item.message != null && item.message_Image != null ?
                                    <Image style={{ width: 222, resizeMode: "cover", height: 222, borderRadius: 10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image }} />
                                    : (item.message == null && item.message_Image != null ?
                                        <Image style={{ width: 222, resizeMode: "cover", height: 222, borderRadius: 10 }} source={{ uri: 'https://zbioggg.com/' + item.message_Image }} />
                                        : <Text style={{ padding: 10, fontSize: 16 }}>{item.message}</Text>
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
                <View style={{ flexDirection: 'row', padding: 5, borderBottomWidth: 5, borderBottomColor: '#DFDFDF' }}>
                    <TouchableOpacity onPress={this.onback} style={{ marginLeft: 10, backgroundColor: 'transparent' }}>
                        <Image style={{ height: 20, width: 20, marginTop: 10, marginLeft: 2, }} source={icback} />
                    </TouchableOpacity>
                    {
                        this.state.datauserchat.img_avt ?
                            <Image style={{ height: 40, width: 40, borderRadius: 100, borderColor: 'white', marginLeft: 10 }} source={{ uri: 'https://zbioggg.com/' + this.state.datauserchat.img_avt }} />
                            :
                            <Image style={{ height: 40, width: 40, borderRadius: 100, borderColor: 'white', marginLeft: 10 }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                    }
                    <Text style={{ paddingLeft: 10, paddingTop: 10, fontWeight: 'bold', fontSize: 17 }} >
                        {this.state.datauserchat.lastName} {this.state.datauserchat.firstName}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>

                    <FlatList

                        data={this.state.listcontentmess}
                        renderItem={_renderItem}

                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: false })}
                        onLayout={() => this.flatList.scrollToEnd({ animated: false })}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </View>
                <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                    {this.state.image != null ?
                        <Image
                            source={{ uri: this.state.image }}
                            style={{ width: 100, height: 100 }}
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
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.onSendmess} style={{ marginLeft: 10, backgroundColor: 'transparent' }}>
                            <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, }} source={icsend} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showImagePicker} style={{ marginLeft: 10, backgroundColor: 'transparent' }}>
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
        flexDirection: 'row',
        marginLeft: 5,
        width: 340,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        //position: 'absolute', 
        bottom: 0,
    },
    container: {
        flex: 1,
        position: 'relative',
        bottom: 0,
        marginTop: 30
    },
    default: {
        paddingLeft: 10,
        fontSize: 20,
        width: 240,
        height: 40,


    },
});
