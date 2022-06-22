import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import db from '../config';
import firebase from 'firebase'

export default class Employee extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
    };
  }

  getData = async () => {
    this.setState({employees:[]})
     var response = await db
        .collection('employees')
        .where('companyOwner', '==', firebase.auth().currentUser.email)
        .get();

      //for loop - map function
      //array - map function

      response.docs.map((a) => {
        var temp = this.state.employees;
        var data = a.data();
        data.id = a.id;
        temp.push(data);
        this.setState({ employees: temp });
      });
  };

  componentDidMount() {
    this.load = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  }

  componentWillUnmount() {
    this.load();
  }

  survey(id) {
    this.props.navigation.push('Survey', { id: id });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#292D32' }}>
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
                backgroundColor: '#212121',
                borderColor: 'white',
              }}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                marginLeft: '5%',
                fontWeight: 'bold',
                color: 'white',
              }}>
              Assessment
            </Text>
          </View>

          <Text
            style={{
              marginTop: 30,
              color: 'white',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            Select an Employee:
          </Text>

          <ScrollView style={{ marginBottom: 20 }}>
            {this.state.employees.map((b) => {
              return (
                <TouchableOpacity
                key={b.id}
                  onPress={() => {
                    this.survey(b.id);
                  }}
                  style={{
                    width: '90%',
                    height: 100,
                    alignSelf: 'center',
                    borderRadius: 10,
                    backgroundColor: '#DCD9F9',
                    marginTop: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}> 
                  <Image
                    source={require('../assets/pg.png')}
                    style={{
                      width: '25%',
                      height: '90%',
                      borderRadius: 10,
                      resizeMode: 'contain',
                    }}
                  />

                  <View
                    style={{
                      width: '40%',
                      height: '100%',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {b.name}
                    </Text> 
                    <Text>{b.email}</Text>
                    <Text style={{ color: '#4B5ACA', fontWeight: 'bold' }}>
                      {b.designation}
                    </Text>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 1,
                      backgroundColor: '#4B5ACA',
                      borderColor: '#4B5ACA',
                      padding: 6,
                      marginHorizontal: 10,
                    }}>
                    <Text style={{ color: 'white' }}>Evaluation</Text>

                    <Text style={{ color: 'white' }}>{b.performanceScore}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}
