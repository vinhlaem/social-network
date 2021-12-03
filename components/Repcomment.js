import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'

import GetToken from '../API/GetToken'
import UrlAPI from '../UrlAPI';
import icsend from '../img/send.png'
var token = '';
GetToken().then(t => {
    token = t;
})

export class Repcomment extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            deletedRowKey: null,
            refreshing: false,
            datacmts:[],
            datarepcmts: [],
            text: '',
            height: 0,

        });
    }
   
    componentDidMount() {
        
        this.Getrepcomment();

    }

    Getrepcomment = async () => {
        var cmtsID = this.props.route.params.comment_ID;
        console.log(cmtsID);
        var RepcommentAPIURL = UrlAPI.url + "replycomments?comment_ID=" + cmtsID;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        fetch(RepcommentAPIURL,
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
                        datacmts: response.cmt,
                        datarepcmts: response.replycmts
                        
                    });
                } else {
                    alert("loi");
                }

            })

            .catch((error) => {
                alert("error" + error);
            })
    }
    onRepcomments = () =>{
        var text = this.state.text;
        var comments_ID = this.props.route.params.comment_ID;
        if (text == '') {
            alert("Vui lòng nhập nội dung hoặc chọn ảnh!");
        } else {

            var RepcommentsAPIURL = UrlAPI.url + "repcmt ";
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            var Data = {
                'comment_ID': comments_ID,
                'content_repcmt': text
            };

            fetch(RepcommentsAPIURL,
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
                        console.log(response);
                        this.setState({
                            datarepcmts: this.state.datarepcmts.concat(response.repcmt),
                            text:''
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

        _renderItemrep = ({item,index}) =>{
            return(
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View >
                    {
                        item.userAvt ?
                            <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + item.userAvt }} />
                            :
                            <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                    }
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View style={{ paddingLeft: 10, backgroundColor: '#DFDFDF', borderRadius: 10, width: 170 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.userfullname}</Text>
                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>{item.content_repcmt}</Text>
                    </View>
                    <TouchableOpacity onPress={this.onRepcmts} style={{ marginLeft: 10 }}>
                        {item.repcmt_qty == 0 ?
                            <Text>Trả lời</Text>
                            :
                            <Text>{item.repcmt_qty} Phản hòi</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            )
        }

        _renderItem = ({ item, index }) => {
            return (


                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View >
                        {
                            item.userAvt ?
                                <Image style={{ height: 40, width: 40, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + item.userAvt }} />
                                :
                                <Image style={{ height: 40, width: 40, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                        }
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ paddingLeft: 10, backgroundColor: '#DFDFDF', borderRadius: 10, width: 170 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.userfullname}</Text>
                            <Text style={{ paddingLeft: 5, fontSize: 16 }}>{item.content_cmt}</Text>
                        </View>
                        <TouchableOpacity onPress={this.onRepcmts} style={{ marginLeft: 10 }}>
                            {item.repcmt_qty == 0 ?
                                <Text>Trả lời</Text>
                                :
                                <Text>{item.repcmt_qty} Phản hòi</Text>
                            }
                        </TouchableOpacity>
                        <FlatList
                        //ref={"flatlist"}
                        data={this.state.datarepcmts}
                        renderItem={_renderItemrep}
                        keyExtractor={(item, index) => index.toString()}
                        >

                        </FlatList>
                    </View>


                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View>
                    <FlatList

                        //ref={"flatlist1"}
                        data={this.state.datacmts}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </View>
                <View style={styles.bottomView} >
                    <TextInput
                        {...this.props}
                        placeholderTextColor={"#a9a9a9"}
                        multiline={true}
                        placeholder="Viết bình luận..."
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
                    <TouchableOpacity onPress={this.onRepcomments} style={{marginLeft:10,backgroundColor: 'transparent'}}> 
                        <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, }} source={icsend} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Repcomment
const styles = StyleSheet.create({
    default: {
        paddingLeft:10,
        fontSize: 20,
        width: 280,
        height: 40,


    },
    container: {
        flex: 1,
        position: 'relative',
        bottom: 0,

    },
    bottomView: {
        flexDirection:'row',
        marginLeft:5,
        width: 340,
        height: 40,
        borderWidth:1,
        borderRadius:20,
        alignItems: 'center',
        position: 'absolute', 
        bottom: 0, 
      },


});
