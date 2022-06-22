import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import firebase from "firebase";

export default class Welcome extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        this.props.navigation.replace("Home");
        // ...
      } else { 
        //Do nothing
      }
    });
  } 
  render() { 
    return (
      <View style={{ flex: 1, backgroundColor: "#F9F4E4" }}>
          <ImageBackground 
            source={require("../assets/welcome.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={{justifyContent:'flex-end', flex:1, marginVertical:20}}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
                alignSelf: "center",
                marginTop: 550,
                backgroundColor: "white",
              }}
              onPress={() => {
                this.props.navigation.replace("Login");
              }} 
            >
              <Text
                style={{ fontWeight: "bold", color: "maroon", fontSize: 20 }}
              >
                Log In
              </Text>
            </TouchableOpacity> 

            <TouchableOpacity
              style={{
                borderRadius: 10,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
                alignSelf: "center", 
                marginVertical: 10,
                backgroundColor: "white",
              }}
              onPress={() => {
                this.props.navigation.replace("SignUp");
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "maroon", fontSize: 20 }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            </View>
          </ImageBackground>
      </View>
    );
  }
}
