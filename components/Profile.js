import React, { Component } from 'react'
import { Text,View,StyleSheet,TouchableOpacity,Image } from 'react-native'
import icsearch from '../img/search.png'
import GetProfile from '../API/GetProfile'; 
export class Profile extends Component {

    constructor(props) {
    super(props)
    this.state = ({
      deletedRowKey: null,
      refreshing:false,
      dataprofile:{}
    });
  }
  componentDidMount() {
    this.refeshProfile();
  }
  refeshProfile = () => {
    GetProfile().then((profile) => {
      this.setState({dataprofile:profile});
      console.log(profile)
    }).catch((error)=>{
      this.setState({dataprofile:[]});
    });
  }

    render() {
        return (
            <View>
                <View style={styles.viewheader}>
                    <Text style={{ fontSize: 20, color: '#5ac618', paddingLeft: 10, marginTop: 10 }}>
                        Trang Cá Nhân
                    </Text>
                    <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: '#DFDFDF', marginTop: 3, marginRight: 10, borderRadius: 100 }}>
                        <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2 }} source={icsearch} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                {
                    this.state.dataprofile.img_cover?
                    <Image style={{ height: 200, width: 360 }} source={{uri: 'https://zbioggg.com/'+this.state.dataprofile.img_cover }} />
                    :
                    <Image style={{ height: 200, width: 360 }} source={{uri: 'https://zbioggg.com/'+'/img/cover/cover-default.png' }} />
                    }
                    {
                     this.state.dataprofile.img_avt?
                    <Image style={{ height: 100, width: 100, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{uri: 'https://zbioggg.com/'+this.state.dataprofile.img_avt }} />
                    :
                    <Image style={{ height: 100, width: 100, marginTop: 3, marginLeft: 2, borderRadius: 100 }} source={{uri: 'https://zbioggg.com/'+'img/avt/avt-default.png' }} />
                }
                </View>
                <View >
                    <Text style={{ fontSize: 20, textAlign:'center'}}>{this.state.dataprofile.lastName} {this.state.dataprofile.firstName}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent: 'space-between',padding:10}}>
                    <Text style={{ fontSize: 15}}>Bài viết</Text>
                    <Text style={{ fontSize: 15}}>Lượt thích</Text>
                    <Text style={{ fontSize: 15}}>Bình Luận</Text>
                </View>
                <View style={{padding:10}}>
                    <TouchableOpacity style={{backgroundColor:'#5ac618', padding:10, borderRadius:5}}>
                    <Text style={{ fontSize: 15, textAlign:'center'}}> Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderBottomColor: '#DFDFDF', borderBottomWidth: 1}}>
                    <Text style={{fontSize:20}}>Thông tin</Text>
                </View>
                <View style={{marginLeft:10}}>
                    <Text style={{fontSize:20}}>Giới tính: {this.state.dataprofile.gender}</Text>
                    <Text style={{fontSize:20}}>Ngày sinh: {this.state.dataprofile.doB}</Text>
                    <Text style={{fontSize:20}}>Di động: {this.state.dataprofile.phone}</Text>
                    <Text style={{fontSize:20}}>Email: {this.state.dataprofile.email}</Text>
                </View>
            </View>
                
            
           
        )
    }
}

export default Profile
 const styles = StyleSheet.create ({
    viewheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#DFDFDF',
        height: 50
      },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        
      }
 });