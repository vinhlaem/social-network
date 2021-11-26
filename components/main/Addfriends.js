import React, { Component } from 'react'
import { Text,View,StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native'
import icsearch from '../../img/search.png'
import GetSuggestFriends from '../../API/GetSuggestFriends'

class FlatListItem extends Component {
    render() {
      return (
        <View style={{flexDirection: 'row'}}>
            <View style={{marginLeft:10}}>
            {
                this.props.item.img_avt ?
                <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white'  }} source={{ uri: 'https://zbioggg.com/' + this.props.item.img_avt }} />
                :
                <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'white' }} source={{ uri: 'https://zbioggg.com/' + 'img/avt/avt-default.png' }} />
            }
            </View>
              <View style={{paddingLeft:10}}>
                  <Text style={{color:'black',fontWeight:'bold'}}>{this.props.item.lastName} {this.props.item.firstName}</Text>
                  <Text style={{color:'#2F4F4F'}}>{this.props.item.mutual_friends} Bạn chung</Text>
                  <View style={{flexDirection: 'row',}}>
                  <TouchableOpacity style={{width:100,backgroundColor:'#5ac618',borderRadius: 5}}>
                      <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Thêm bạn bè</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft:5,backgroundColor:'#DFDFDF',width:100,borderRadius: 5}}>
                      <Text style={{textAlign:'center',color:'black',fontWeight:'bold'}}>Xóa</Text>
                  </TouchableOpacity>
                  </View>
              </View>

        </View>
      )
    }
  }
export class Addfriends extends Component {

     constructor(props) {
         super(props)
         this.state = ({
             datasuggest:[]
         });
     }
     componentDidMount() {
        this.refeshsuggestfriends();
      }
      refeshsuggestfriends = () =>{
          GetSuggestFriends().then((suggestfriends)=>{
            this.setState({datasuggest:suggestfriends.data});
          }).catch(console.log);
          
            
      }

    render() {
        return (
            <View>
                <View style={styles.viewheader}>
                    <Text style={{ fontSize: 25, color: '#5ac618', paddingLeft: 10, marginTop: 7 }}>
                        ZBIOGG
                    </Text>
                    <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: '#DFDFDF', marginTop: 3, marginRight: 10, borderRadius: 100 }}>
                        <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2 }} source={icsearch} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewheader}>
                    <Text style={{ fontSize: 20, color: '#2F4F4F', paddingLeft: 10, marginTop: 7 }}>
                        Gợi ý kết bạn
                    </Text>
                    <TouchableOpacity style={{ marginRight: 10,alignItems:'center'}}>
                        <Text style={{ fontSize: 18, color: '#5ac618',marginTop:10}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        style={{ flex: 0 }}
                        ref={"flatlist"}
                        data={this.state.datasuggest}
                        renderItem={({ item, index }) => {
                            return (
                                <FlatListItem item={item} index={index} parentFlatList={this}>
                                </FlatListItem>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </FlatList>
                </View>
          </View>
        )
    }
}

export default Addfriends
const styles = StyleSheet.create({
    viewheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#DFDFDF',
        height: 50
      }
});
