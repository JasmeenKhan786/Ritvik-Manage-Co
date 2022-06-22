import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Login from './screens/Login' 
import SignUp from './screens/SignUp'
import Forgot from './screens/ForgotPass'
import Welcome from './screens/Welcome'   
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native' 
import Home from './screens/Home'  
import firebase from 'firebase'
const Stack = createStackNavigator() 
import LoginStack from './navigation/navigate'    

export default class App extends React.Component { 
  render(){
    return ( 
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
      
    );  
  }
}
