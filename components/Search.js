import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import icsearch from '../img/search.png'
import UrlAPI from '../UrlAPI'
import GetToken from '../API/GetToken'
import icheart from '../img/heart.png'
import iccomment from '../img/comment.png'
var token = '';
GetToken().then(t => {
  token = t;
})
export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      text: '',
      search_userdata: [],
      search_postdata: [],


    });
  }
  onSearch = async () => {
    var text = this.state.text;
    var images = [];
    var SearchAPIURL = UrlAPI.url + "search?key_search=" + text;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }

    fetch(SearchAPIURL,
      {
        method: 'GET',
        headers: headers
      }
    )
      .then((response) => response.json())
      .then((response) => {

        if ((response.success)) {
          console.log(response)
          this.setState({
            search_postdata: response.search_posts,
            search_userdata: response.search_users
          });
          console.log(this.state.search_userdata)
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
        <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5 }}>
           <View>
                  <Text>Mọi người</Text>
           </View>
           <View>
             <Text>{item.lastName} {item.firstName}</Text>
           </View>
         </View>
      )
    }

    _renderItemm = ({ item, index }) => {
      return (
        <View style={{ flex: 1, borderBottomColor: '#DFDFDF', borderBottomWidth: 5 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius: 100 }} source={{ uri: 'https://zbioggg.com/' + item.userAvt }} />
            <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
              {item.userfullname}
            </Text>
          </TouchableOpacity >
          <Text style={{ paddingLeft: 10 }}>{item.post_Content}</Text>

          {
            item.post_Images.length != 0 ?
              <Image style={{ height: 300, width: null }} source={{ uri: 'https://zbioggg.com/' + item.post_Images[0].image }} />
              : null
          }

          <View style={{ paddingLeft: 10, borderBottomColor: '#DFDFDF', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text>{item.like_qty}
            </Text>
            <Text>{item.cmt_qty} bình luận</Text>
          </View>
          <View style={styles.viewbtn1}>
            <TouchableOpacity style={styles.btn}>
              <Image style={{ height: 25, width: 25, marginTop: 3, marginLeft: 2 }} source={icheart} />
              <Text style={{ marginTop: 7, marginLeft: 5 }}>Thích</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCmt} style={styles.btn1}>
              <Image style={{ height: 25, width: 25, marginTop: 3, marginLeft: 2 }} source={iccomment} />
              <Text style={{ marginTop: 7, marginLeft: 5 }}> Bình luận</Text>
            </TouchableOpacity>
          </View>

        </View>
      )
    }

    return (
      <View>

        <View>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextInput
                    backgroundColor='#DFDFDF'
                    onChangeText={(text) => {
                      this.setState({ text })
                    }}
                    placeholder='Tìm kiếm'
                    
                    style={{ borderWidth: 1, width: 300, marginLeft: 5, borderRadius: 10, padding: 5,margin:10, borderColor: '#28a745' }}
                  />
                  <TouchableOpacity onPress={this.onSearch} style={{ height: 40, width: 40, marginTop: 10, marginRight: 10, borderRadius: 100 }}>
                    <Image style={{ height: 40, width: 40, marginTop: 2, marginLeft: 2, borderRadius:100, backgroundColor: 'rgba(0,0,0,0)' }} source={icsearch} />
                  </TouchableOpacity>
                </View>
               
               
              </>
            }
            style={{ flex: 0 }}
            ref={"flatlist"}
            data={this.state.search_postdata}
            renderItem={_renderItemm}
            keyExtractor={(item, index) => index.toString()}>
          </FlatList>
          <View>
                  <FlatList
                    style={{ flex: 0 }}
                    ref={"flatlist"}
                    data={this.state.search_userdata}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  >
                  </FlatList>
                </View>
        </View>
      </View>
    )
  }
}

export default Search
const styles = StyleSheet.create({

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginLeft: 40,
    borderRightColor: '#DFDFDF',
    borderRightWidth: 1,
    width: 145
  },
  btn1: {
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

});
