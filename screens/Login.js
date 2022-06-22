import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import firebase from "firebase";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        this.props.navigation.replace("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  render() {
    //JSX - JS+XML/HTML
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
              onPress={() => {
                this.props.navigation.replace("Welcome");
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
              Log In
            </Text>
          </View>

          <Text style={{ marginLeft: "5%", marginTop: 30, color: "white" }}>
            Please enter your credentials
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
            placeholder="Enter your email"
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({ email: val });
            }}
          />

          <Text style={{ marginTop: 40, marginLeft: "5%", color: "white" }}>
            Password
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
            placeholder="Enter your password"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(val) => {
              this.setState({ password: val });
            }}
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
            onPress={() => {
              if (this.state.email && this.state.password) {
                this.login();
              } else {
                alert("Please fill all the details!");
              }
            }}
          >
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
              Log in
            </Text>
          </TouchableOpacity>

          <Text style={{ alignSelf: "center", marginTop: 20, color: "white" }}>
            {" "}
            Don't have an account?{" "}
            <Text
              onPress={() => {
                this.props.navigation.replace("SignUp");
              }}
              style={{ fontWeight: "bold" }}
            >
              {" "}
              Sign up{" "}
            </Text>
          </Text>

          <Text
            style={{ alignSelf: "center", marginTop: 20, color: "white" }}
            onPress={() => {
              this.props.navigation.replace("Forgot");
            }}
          >
            {" "}
            Forgot Password?{" "}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
