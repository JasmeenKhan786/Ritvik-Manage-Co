import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase'
import db from '../config'

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  signUp(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((userCredential) => {
      db.collection('owners').add({email:this.state.email,name:this.state.name,type:"owner"})

      this.props.navigation.replace("Home")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#101010' }}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '5%',
              marginTop: '15%',
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#212121', 
              }}
              onPress={()=>{
              this.props.navigation.replace("Welcome")
            }}
              >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                marginLeft: '5%',
                fontWeight: 'bold',
                color: 'white',
              }}>
              Sign Up
            </Text>
          </View>

          <Text style={{ marginLeft: '5%', marginTop: 30, color: 'white' }}>
            Sign Up with the following options.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 10,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
                borderColor: '#F87777',
              }}
              onPress={()=>{
                alert('Feature coming soon!')
              }}>
              <MaterialCommunityIcons name="google" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{
              alert('Feature coming soon!')
            }}
              style={{
                borderWidth:1,
                borderRadius: 10,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
                borderColor: '#F87777',
              }}>
              <FontAwesome name="apple" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={{ marginTop: 40, marginLeft: '5%', color: 'white' }}>
           Company Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#171717',
              width: '90%',
              height: 60,
              alignSelf: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#F87777',
              paddingLeft: 10,
              marginTop: 10,
              color: 'white',
            }}
            placeholder="Enter your company name"
            placeholderTextColor="white"
            onChangeText={(val)=>{
              this.setState({name:val})
            }}
          />

          <Text style={{ marginTop: 40, marginLeft: '5%', color: 'white' }}>
            Email
          </Text>
          <TextInput
            style={{
              backgroundColor: '#171717',
              width: '90%',
              height: 60,
              alignSelf: 'center',
              borderRadius: 10, 
              borderWidth: 1,
              borderColor: '#F87777',
              paddingLeft: 10, 
              marginTop: 10,
              color: 'white',
            }}
            placeholder="example@gmail.com"
            placeholderTextColor="white" 
            onChangeText={(val)=>{
              this.setState({email:val})
            }}
          />

          <Text style={{ marginTop: 40, marginLeft: '5%', color: 'white' }}>
            Password
          </Text>
          <TextInput
            style={{
              backgroundColor: '#171717',
              width: '90%',
              height: 60,
              alignSelf: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#F87777',
              paddingLeft: 10,
              marginTop: 10,
              color: 'white',
            }}
            placeholder="Pick a strong password"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(val)=>{
              this.setState({password:val})
            }}
          />

          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderRadius: 10,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',
              marginTop: 50,
              backgroundColor: '#F87777',
            }}
            onPress={()=>{
              if(this.state.email && this.state.name && this.state.password){
                this.signUp()

              }
              else{
                alert('Please fill all the details!')

              }
            }}
            >
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text style={{ alignSelf: 'center', marginTop: 20, color: 'white' }}>
            {' '}
            Already have an account?{' '}
            <Text onPress={() => {
              this.props.navigation.replace("Login")
            }} style={{ fontWeight: 'bold' }}>
              {' '}
              Log in{' '}
            </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}
