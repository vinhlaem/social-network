import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'

import GetToken from '../API/GetToken'
import UrlAPI from '../UrlAPI';
import icsend from '../img/send.png'
var token = '';
GetToken().then(t => {
    token = t;
})

export class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            deletedRowKey: null,
            refreshing: false,
            datacmts: [],
            text: '',
            height: 0,
            cmt:''

        });
    }
   
    componentDidMount() {
        this.Getcomment();
    }

    Getcomment = async () => {
        var postID = this.props.route.params.postID;
        console.log(postID);
        var CommentAPIURL = UrlAPI.url + "postcmts?postID=" + postID;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        fetch(CommentAPIURL,
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
                        datacmts: response.cmts,
                        cmt: response.cmts_qty
                    });
                } else {
                    alert("loi");
                }

            })

            .catch((error) => {
                alert("error" + error);
            })
    }
    oncomments = () =>{
        var text = this.state.text;
        var PostID = this.props.route.params.postID;
        if (text == '') {
            alert("Vui lòng nhập nội dung");
        } else {

            var CommentsAPIURL = UrlAPI.url + "comments ";
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            var Data = {
                'content_cmt': text,
                'postID': PostID
            };

            fetch(CommentsAPIURL,
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
                            datacmts: this.state.datacmts.concat(response.cmt),
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
    onRepcmts = (id) =>{
        this.props.navigation.navigate("Repcomment",{
            comment_ID: id
          })
    }
    onmorecmt = () =>{
        var firstCmtID = this.state.datacmts[0].id;
        console.log(firstCmtID)
        var PostID = this.props.route.params.postID;
       
            var CommentsAPIURL = UrlAPI.url + "viewMoreCmts";
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            var Data = {
                'firstCmtID': firstCmtID,
                'postID': PostID
            };

            fetch(CommentsAPIURL,
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
                        console.log(this.state.datacmts.length);
                        this.state.datacmts.unshift(...response.cmts);
                        console.log(response.cmts.length);
                        console.log(this.state.datacmts.length);
                        this.setState({cmt:response.cmts_qty});
                    } else {
                        alert("loi");
                    }

                })

                .catch((error) => {
                    alert("error" + error);
                })
        
    }



    render() {
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
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.userfullname}</Text>
                            <Text style={{ paddingLeft: 5, fontSize: 15 }}>{item.content_cmt}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.onRepcmts(item.id)} style={{ marginLeft: 10 }}>
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

        return (
            <View style={styles.container}>
                 
                <View  style={{flex: 0.9}}>
                    <FlatList
                        ListHeaderComponent={
                            
                            <View style={{padding:10}}>
                            {this.state.cmt>5?
                           <TouchableOpacity onPress={this.onmorecmt}>
                               <Text>Xem thêm bình luận</Text>
                           </TouchableOpacity>
                           :null
                           }
                           </View>
                        }
                        
                        ref={"flatlist"}
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
                    <TouchableOpacity onPress={this.oncomments} style={{marginLeft:10}}> 
                        <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, }} source={icsend} />
                    </TouchableOpacity>
                </View>
                
                
            </View>
        )
    }
}

export default Comment
const styles = StyleSheet.create({
    default: {
        paddingLeft:10,
        fontSize: 20,
        width: 280,
        height: 30,


    },
    container: {
        flex: 1,
        
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
