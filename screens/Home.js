import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config'

export default class Home extends React.Component {
  constructor(props) { 
    super(props)
    this.state = {
      types:''
    };
  }

  signout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.replace('Welcome');
        alert('logged out');
      })
      .catch((error) => {
        // An error happened.
      });
  }
  checkType = async () => {
    var response = await db
      .collection('employees')
      .where('email', '==', firebase.auth().currentUser.email)
      .get();
    var response2 = await db
      .collection('owners')
      .where('email', '==', firebase.auth().currentUser.email)
      .get();

    var type = '';
    if (response.docs.length === 1) {
      type = 'employee';
    } else if (response2.docs.length === 1) {
      type = 'owner';
    } else {
      type = 'none';
    }
    this.setState({ types: type });
  };
 
  componentDidMount(){
    this.checkType()
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '15%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: '5%',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaYefzHvhrM1lOTLYEZtv0_x1i7fLcGuyPcg&usqp=CAU',
                }}
                style={{ width: 50, height: 50, borderRadius: 10 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'grey', fontSize: 15 }}>Hello User,</Text>
                <Text style={{ color: 'white', fontSize: 15 }}>
                  Welcome Back!
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.signout();
              }}>
              <MaterialIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#1E1E1E',
              width: '90%',
              height: 120,
              alignSelf: 'center',
              borderRadius: 10,
              marginTop: 30,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FF904A',
                fontWeight: 'bold',
                fontSize: 24,
                marginHorizontal: 20,
              }}>
              Manage. Co
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 10,
                marginHorizontal: 20,
              }}>
              Manage your startup with ease!
            </Text>
          </View>

          <Text
            style={{
              color: 'white',
              fontSize: 20,
              marginLeft: '5%',
              marginTop: 30,
              fontWeight: 'bold',
            }}>
            Actions
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
              marginHorizontal: '5%',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                height: 120,
                width: '48%',
                backgroundColor: '#DCD9F9',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-evenly',
                paddingBottom: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate('Employee');
              }}>
              <Text
                style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
                Manage
              </Text>
              <Image
                source={require('../assets/2.png')}
                style={{ width: '40%', height: '90%', resizeMode: 'contain' }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 10,
                height: 120,
                width: '48%',
                backgroundColor: '#F9F4E5',
                flexDirection: 'row', 
                alignItems: 'flex-end',
                justifyContent: 'space-evenly',
                paddingBottom: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate('Task');
              }}>
              <Text
                style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
                Task
              </Text>
              <Image
                source={require('../assets/3.png')}
                style={{ width: '60%', height: '90%' }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              borderRadius: 10,
              height: 120,
              width: '90%',
              backgroundColor: '#F87777', 
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-evenly',
              paddingBottom: 10,
              marginTop: 30,
            }}
            onPress={() => {
              if(this.state.types==='owner'){
                this.props.navigation.navigate('AssessmentStack');
              }
              else{
                alert("only an owner can do this")
              }
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
              Assessment
            </Text>
            <Image
              source={require('../assets/1.png')}
              style={{ width: '35%', height: '90%', resizeMode: 'contain' }}
            />
          </TouchableOpacity>

          <Image style={{width:'90%',resizeMode:'contain', alignSelf:'center'}} source={require("../assets/Thank.png")}/>
        </ScrollView>
      </View> 
    );
  }
}
