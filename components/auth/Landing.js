import React from 'react'
import { Text, View, Image,StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
    
    
  });

export default function Landing({ navigation }) {
    return (
        <View style={{ flex:1, justifyContent: 'center'}} >
            <Image
        style={{
            resizeMode: "center",
            height: 100,
            width: 360}
            }
        source={
          require('../../img/logo.png')
        }
      />
            
            <Button type='clear' Color= "#000000" title="Register" onPress={() => navigation.navigate("Register")}/>
            <Button type='clear' title="Login" onPress={() => navigation.navigate("Login")}/>
            
        </View>
    )
}
