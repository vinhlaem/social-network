import React, { Component } from 'react'
import { Text,View,StyleSheet,TouchableOpacity,Image } from 'react-native'
import icsearch from '../../img/search.png'
import RemoveToKen from '../../API/RemoveToken'

export class Menu extends Component {
    onLogout = () =>{
        RemoveToKen()
        this.props.navigation.navigate("Login")
    }
    render() {
        return (
            <View style={{marginTop:30}}>
                <View style={styles.viewheader}>
                    <Text style={{ fontSize: 25, color: '#5ac618', paddingLeft: 10, marginTop: 7 }}>
                        ZBIOGG
                    </Text>
                    <TouchableOpacity style={{ height: 40, width: 40, marginTop: 3, marginRight: 10, borderRadius: 100 }}>
                        <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2, borderRadius:100 }} source={icsearch} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.onLogout} style={{ backgroundColor: '#5ac618', padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 15, textAlign: 'center',fontWeight:'bold' }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Menu
const styles = StyleSheet.create({
    viewheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#DFDFDF',
        height: 50
    }
});
