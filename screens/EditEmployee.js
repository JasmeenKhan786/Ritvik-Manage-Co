import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';
import db from '../config';
export default class AddEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      status: null,
      items: [
        { label: 'Employee Status', value: 'Employee Status' },
        { label: 'Active', value: 'Active' },
        { label: 'Probation', value: 'Probation' },
        { label: 'Notice Period', value: 'Notice Period' },
        { label: 'Other', value: 'Other' },
      ],
      name: '',
      email: '',
      password: '',
      designation: '',
      salary: '',
      companyOwner: firebase.auth().currentUser.email,
      employeeid: props.route.params.id,
    };
  }

  componentDidMount(){
    this.getData()
  }

  getData= async ()=>{
    var response = await db.collection("employees").doc(this.state.employeeid).get()
    this.setState({email:response.data().email})
    this.setState({name:response.data().name})
    this.setState({designation:response.data().designation})
    this.setState({salary:response.data().salary})
    this.setState({status:response.data().status})
  }

  updateData=()=>{
    db.collection("employees").doc(this.state.employeeid).update(
      {
        name:this.state.name,
        status:this.state.status,
        designation:this.state.designation,
        salary:this.state.salary
      }
    ).then(()=>{
      alert("Employee Updated")
      this.props.navigation.navigate("Employee")
    })
    .catch(()=>{
      alert("Something Went Wrong")
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#101010' }}>
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
                this.props.navigation.navigate("Employee")
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
              Edit Employee
            </Text>
          </View>

          <Text
            style={{
              marginLeft: '5%',
              marginTop: 30,
              color: 'white',
              alignSelf: 'center',
            }}>
            Change worker fields:
          </Text>
          <Text style={{ marginTop: 40, marginLeft: '5%', color: 'white' }}>
            Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#171717',
              width: '90%',
              height: 60,
              alignSelf: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#621959',
              paddingLeft: 10,
              marginTop: 10,
              color: 'white',
            }}
            placeholder="Employee Name"
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({name: val});
            }}
            value={this.state.name}
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
              borderColor: '#621959',
              paddingLeft: 10,
              marginTop: 10,
              color: 'white',
            }}
            placeholder="Employee Email"
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({ email: val });
            }}
            value={this.state.email}
            editable={false}
          />
          <Text style={{ marginTop: 40, marginLeft: '5%', color: 'white' }}>
            Designation
          </Text>
          <TextInput
            style={{
              backgroundColor: '#171717',
              width: '90%',
              height: 60,
              alignSelf: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#621959',
              paddingLeft: 10,
              marginTop: 10,
              color: 'white',
            }}
            placeholder="e.g. manager, COO, CTO, etc."
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({ designation: val });
            }}
            value={this.state.designation}
          />

          <Text style={{ marginTop: 40, marginLeft: '5%', color: 'white' }}>
            Salary
          </Text>
          <TextInput
            style={{
              backgroundColor: '#171717',
              width: '90%',
              height: 60,
              alignSelf: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#621959',
              paddingLeft: 10,
              marginTop: 10,
              color: 'white',
            }}
            placeholder="Salary"
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({ salary: val });
            }}
            value={this.state.salary}
          />
          <Text style={{ marginTop: 40, marginLeft: '5%', color: 'white' }}>
            Status
          </Text>
          <DropDownPicker
            items={this.state.items}
            open={this.state.open}
            value={this.state.status}
            setOpen={() => {
              this.setState({ open: !this.state.open });
            }}
            onSelectItem={(val) => {
              this.setState({ status: val.label });
            }}
            style={{
              width: "90%",
              height: 40,
              alignSelf: "center",
              backgroundColor: "white",
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#621959", 
              backgroundColor: "#212121",
              color: "white",
            }}
            textStyle={{ color: "black", alignSelf: "center" }}
            labelStyle={{
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#212121",
            }}
            activeLabelStyle={{ color: "white" }}
          />

          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderRadius: 10,
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',
              marginTop: 50,
              backgroundColor: '#F87777',
              marginBottom: 40,
            }}
            onPress={() => {
              this.updateData();
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
              Update
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
