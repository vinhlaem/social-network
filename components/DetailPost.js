import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, View, FlatList, StyleSheet } from 'react-native'
import GetToken from '../API/GetToken'
import UrlAPI from '../UrlAPI'
import icheart from '../img/heart.png'
import icheartreact from '../img/green.png'
import iccomment from '../img/comment.png'
var token = '';
GetToken().then(t => {
    token = t;
})
export class DetailPost extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            datapost: [],
            iconheart: icheart,
            colortext: 'black',
            dataimage:[]
        });
    }
    componentDidMount() {

        this.Getdetailpost();

    }
    onProfile = () => {
        this.props.navigation.navigate("Profile")
      }
      onProfileother = (userID) => {
        this.props.navigation.navigate("Profileorther",{
          userID:userID})
      }
      onCmt = (postID) => {
        this.props.navigation.navigate("Comment",{
          postID: postID
        })
      }
    Getdetailpost = async () => {
        var url = this.props.route.params.url_post;
        console.log(url);
        var DetailPostAPIURL = UrlAPI.url + url;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        fetch(DetailPostAPIURL,
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
                        datapost: response.data[0],
                        dataimage:response.data[0].post_Images
                    });
                    console.log(this.state.dataimage)
                } else {
                    alert("loi");
                }
            })
            .catch((error) => {
                alert("error" + error);
            })
    }
    render() {
        return (
            <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5, marginTop:10 }}>
                <TouchableOpacity onPress={() => this.onProfileother(this.state.datapost.userID)} style={{ flexDirection: 'row' }}>
                    <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + this.state.datapost.userAvt }} />
                    <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                        {this.state.datapost.userfullname}
                    </Text>
                </TouchableOpacity >
                <Text style={{ paddingLeft: 10 }}>{this.state.datapost.post_Content}</Text>
                {
                    this.state.dataimage.length !=0 ?
                        <Image style={{ height: 300, width: null }} source={{ uri: 'https://zbioggg.com/' + this.state.datapost.post_Images[0].image }} />
                        : null
                }
                <View style={{ paddingLeft: 10, borderBottomColor: '#DFDFDF', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text>{this.state.datapost.like_qty}
                    </Text>
                    <Text>{this.state.datapost.cmt_qty} bình luận</Text>
                </View>
                <View style={styles.viewbtn1}>
                    <TouchableOpacity onPress={() => this.onLike(index, this.state.datapost.postID)} style={styles.btn}>

                        {this.state.datapost.liked == 0 ?
                            <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)' }} source={this.state.iconheart} />
                            :
                            <Image style={{ height: 30, width: 30, marginTop: 3, marginLeft: 2, backgroundColor: 'rgba(0,0,0,0)' }} source={icheartreact} />
                        }
                        {this.state.datapost.liked == 0 ?
                            <Text style={{ marginTop: 7, marginLeft: 5, color: this.state.colortext }}>Thích</Text>
                            :
                            <Text style={{ marginTop: 7, marginLeft: 5, color: 'green' }}>Thích</Text>
                        }

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onCmt(this.state.datapost.postID)} style={styles.btn1}>
                        <Image style={{ height: 25, width: 25, marginTop: 3, marginLeft: 2 }} source={iccomment} />
                        <Text style={{ marginTop: 7, marginLeft: 5 }}> Bình luận</Text>
                    </TouchableOpacity>
                </View>

            </View>



        )
    }
}
export default DetailPost

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
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginLeft: 40,
        borderRightColor: '#DFDFDF',
        borderRightWidth: 1,
        width: 145
    },
    btn1: {
        backgroundColor: 'transparent',
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