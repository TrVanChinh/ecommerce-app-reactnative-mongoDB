import {
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    View,
    Alert,
  } from "react-native";
  import React from "react";
  import { useState } from "react";
  import { Feather, SimpleLineIcons , AntDesign } from "@expo/vector-icons";
  import { Input, Icon } from "react-native-elements";
import  axios  from "axios";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../Locahost";

  const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const handleLogin = () => {
      const user = {
        email: email,
        password: password,
      }
      axios.post(`${API_BASE_URL}/login`,user).then((response) => {
        console.log(response)
        console.log(response.data.message); 
        const token = response.data.token
        AsyncStorage.setItem("authToken",token)
        navigation.navigate("Main")
      })
      .catch((error) => {
        Alert.alert("Login Error")
        console.log(error)
      })
    }
    const clearInput = () => {
      setEmail("");
    };
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    
    return (
      <SafeAreaView style={{ width: "100%", alignItems: "center" ,  paddingTop:30}}>
        <View> 
          <Image
            style={{ width: 60, height: 80, top: 20 }}
            source={require("../assets/shopLogo.png")}
          />
        </View>
        <View style={{ width: "90%", top: 30 }}>
        <Text style={{  paddingBottom: 40, fontSize:30, fontWeight:'bold' , alignSelf:'center' }}>Đăng nhập</Text>

          <KeyboardAvoidingView behavior="padding">
          <Input
            placeholder="example@gmail.com"
            onChangeText={setEmail}
            keyboardType="email-address"
            value={email}
            autoComplete="tel"
            leftIcon={<Feather name="mail" size={24} color="#857E7C" />}
            rightIcon={
                email ? (
                <AntDesign
                  name="close"
                  size={24}
                  color="#857E7C"
                  onPress={clearInput}
                />
              ) : null
            }
          />    
            <Input
              secureTextEntry={!isPasswordVisible}
              placeholder="Mật khẩu"
              onChangeText={(text) => setPassword(text)}
              value={password}
              leftIcon={<SimpleLineIcons name="lock" size={24} color="#857E7C" />}
              rightIcon={
                  <Feather 
                    name="eye-off" 
                    size={24} 
                    color="#857E7C" 
                    onPress={togglePasswordVisibility}
                  />
              }
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={{
              backgroundColor: email.length>0 & password.length> 0 ? "#F1582C" : "lightgray",
              padding: 12,
              alignItems: "center",
            }}
            disabled={email.length === 0}
            onPress={handleLogin}
          >
            <Text style={{ color: email.length > 0 ? "white" : "#857E7C" }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20, alignItems:'flex-end'}}>
            {/* <Text style={{ color:"blue"}}>Đăng nhập bằng SMS</Text> */}
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: 'center', marginVertical: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#D5DBCD" }}></View>
            <Text style={{ color:"#857E7C"}}>Hoặc</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#D5DBCD"}}></View>
          </View>

          <View style={{flexDirection:'row', justifyContent:'center', alignItems:"center", paddingTop:20}}>
            <Text>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color:'blue'}}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
            
        </View>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});
  