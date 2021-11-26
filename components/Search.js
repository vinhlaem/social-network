import React, { Component } from 'react'
import {View,Text,TextInput,TouchableOpacity,Image} from 'react-native'
import icsearch from '../img/search.png'
export class Search extends Component {
    render() {
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TextInput
                    placeholder='tìm kiếm'
                    style={{borderWidth:1, width:300,marginLeft:5,borderRadius:10, paddingLeft:10}}
                />
                 <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: '#DFDFDF', marginTop: 3, marginRight: 10, borderRadius: 100 }}>
                        <Image style={{ height: 35, width: 35, marginTop: 2, marginLeft: 2 }} source={icsearch} />
                      </TouchableOpacity>
            </View>
        )
    }
}

export default Search
