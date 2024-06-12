import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
  const navigation = useNavigation()
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.navigate("Main")
    }, 5000);
    return () => clearTimeout(timeOut)
  }, [])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:"center",flexDirection:'column'}}>
      <Image source={require("./logo.png")} style={{resizeMode:'center',width:'100%',height:190}}/>
      <Text style={{fontSize:20}}>Cao Hải Đăng</Text>
      <Text style={{fontSize:20,color:"red"}}>MSSV:PH33497</Text>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})