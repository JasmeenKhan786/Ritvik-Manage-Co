import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from 'firebase'

export default class Forgot extends React.Component {
  constructor(){
    super()
    this.state={
      email:''
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#101010" }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "5%",
              marginTop: "15%",
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#212121",
              }}
              onPress={()=>{
              this.props.navigation.replace("Login")
            }}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                marginLeft: "5%",
                fontWeight: "bold",
                color: "white",
              }} 
            >
              Forgot Password 
            </Text>
          </View>

          <Text style={{ marginLeft: "5%", marginTop: 60, color: "white" }}>
            Recover password link will be sent to registered email
          </Text>

          <Text style={{ marginTop: 40, marginLeft: "5%", color: "white" }}>
            Email
          </Text>
          <TextInput
            style={{
              backgroundColor: "#171717",
              width: "90%",
              height: 60,
              alignSelf: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#F87777",
              paddingLeft: 10,
              marginTop: 10,
              color: "white",
            }}
            onChangeText={(val)=>{
              this.setState({email:val})
            }}
            placeholder="Enter your registered email"
            placeholderTextColor="white"
          />

          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderRadius: 10,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              marginTop: 50,
              backgroundColor: "#F87777",
            }}
            onPress={()=>{
              firebase.auth().sendPasswordResetEmail(this.state.email)
              .then(() => {
               alert('Password reset link sent!')
              })
              .catch((error) => { 
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
              });
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
              Recover Password 
            </Text>
          </TouchableOpacity>

        
        </ScrollView>
      </View>
    );
  }
}
