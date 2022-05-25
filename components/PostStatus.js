import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import ava from '../img/ava.png'
import iccamera from '../img/iccamera.png'
import icgallery from '../img/gallery.png'
import GetAuUser from '../API/GetAuUser';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import UrlAPI from '../UrlAPI'
import GetToken from '../API/GetToken'
var token = '';
GetToken().then(t => {
    token = t;
})
export class PostStatus extends Component {



    constructor(props) {
        super(props);
        this.state = { text: '', height: 0, datauser: {}, image: null };


    }

    componentDidMount() {
        this.refeshAuthUser()
    }
    refeshAuthUser = () => {
        GetAuUser().then((user) => {
            this.setState({ datauser: user });
            console.log(user)
        }).catch((error) => {
            this.setState({ datauser: [] });
        });
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
    openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");

            return;
        };
        //rs app
        const result = await ImagePicker.launchCameraAsync({ quality: 0.66 });


        if (!result.cancelled) {
            console.log("adasda");
            this.setState({ image: result.uri });

        }
    }
    onPost = async () => {
        var text = this.state.text;
        var images = [];
        if (text == '' && !this.state.image) {
            alert("Vui lòng nhập nội dung hoặc chọn ảnh!");
        } else {
            if (this.state.image) {
                images.push(await FileSystem.readAsStringAsync(this.state.image, { encoding: 'base64' }));
            }
            var PostAPIURL = UrlAPI.url + "posts ";
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            var Data = {
                'post_Content': text,
                'post_Images': images
            };

            fetch(PostAPIURL,
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
                        this.props.navigation.navigate("Home")

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
        let { image } = this.state;
        return (
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                >
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Tạo bài viết</Text>
                            <TouchableOpacity onPress={this.onPost} style={{ width: 70, }}>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>Đăng</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <TouchableOpacity onPress={this.onProfile} style={{ height: 50, width: 50 }}>
                                {
                                    this.state.datauser.img_avt ?
                                        <Image style={{ height: 50, width: 50, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + this.state.datauser.img_avt }} />
                                        :
                                        <Image style={{ height: 50, width: 50, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
                                }
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 10, marginTop:12, fontSize:15 }}>{this.state.datauser.lastName} {this.state.datauser.firstName}</Text>
                        </View>
                        <View style={{ height: 300, borderBottomWidth: 1 }}>
                            <TextInput
                                {...this.props}
                                placeholder={"Bạn đang cảm thấy thế nào!!!!"}
                                placeholderTextColor={"#a9a9a9"}
                                multiline={true}
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
                        </View>
                        <View style={{ flexDirection: 'row-reverse', margin: 10 }} >
                            <TouchableOpacity onPress={this.openCamera} >
                                <Image style={{ height: 35, width: 35, marginTop: 3, marginLeft: 2 }} source={iccamera} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.showImagePicker}>
                                <Image style={{ height: 35, width: 35, marginTop: 3, marginLeft: 2 }} source={icgallery} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}>

                            {Image &&
                                <Image
                                    source={{ uri: image }}
                                    style={styles.image}
                                />
                            }
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        )
    }
}

export default PostStatus

const styles = StyleSheet.create({
    default: {
        fontSize: 20,
        width: 330,
        height: 100,
        marginLeft: 10,
        textAlignVertical: 'top'
    },
    image: {
        width: 200,
        height: 500,


    },
    container: {
        alignItems: 'center',
    }


});
