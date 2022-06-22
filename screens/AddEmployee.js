import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";
import db from "../config";
export default class AddEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: null,
      items: [
        { label: "Employee Status", value: "Employee Status" },
        { label: "Active", value: "Active" },
        { label: "Probation", value: "Probation" },
        { label: "Notice Period", value: "Notice Period" },
        { label: "Other", value: "Other" },
      ],
      name: "",
      email: "",
      password: "",
      designation: "",
      salary: "",
      companyOwner: firebase.auth().currentUser.email,
    };
  }

  add() {
    db.collection("employees").add({
      email: this.state.email,
      name: this.state.name,
      type: "employee",
      designation: this.state.designation,
      salary: this.state.salary,
      status: this.state.value,
      companyOwner: this.state.companyOwner,
      performanceScore: 0,
      password: this.state.password,
    });
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
              onPress={() => {
                this.props.navigation.navigate("Employee");
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
              Add Employee
            </Text>
          </View>

          <Text
            style={{
              marginLeft: "5%",
              marginTop: 30,
              color: "white",
              alignSelf: "center",
            }}
          >
            Create an account for a worker
          </Text>
          <Text style={{ marginTop: 40, marginLeft: "5%", color: "white" }}>
            Name
          </Text>
          <TextInput
            style={{
              backgroundColor: "#171717",
              width: "90%",
              height: 60,
              alignSelf: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#621959",
              paddingLeft: 10,
              marginTop: 10,
              color: "white",
            }}
            placeholder="Employee Name"
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({ name: val });
            }}
          />
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
              borderColor: "#621959",
              paddingLeft: 10,
              marginTop: 10,
              color: "white",
            }}
            placeholder="Employee Email"
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
              borderColor: "#621959",
              paddingLeft: 10,
              marginTop: 10,
              color: "white",
            }}
            placeholder="Pick a strong password"
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({ password: val });
            }}
          />
          <Text style={{ marginTop: 40, marginLeft: "5%", color: "white" }}>
            Designation
          </Text>
          <TextInput
            style={{
              backgroundColor: "#171717",
              width: "90%",
              height: 60,
              alignSelf: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#621959",
              paddingLeft: 10,
              marginTop: 10,
              color: "white",
            }}
            placeholder="e.g. manager, COO, CTO, etc."
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({ designation: val });
            }}
          />

          <Text style={{ marginTop: 40, marginLeft: "5%", color: "white" }}>
            Salary
          </Text>
          <TextInput
            style={{
              backgroundColor: "#171717",
              width: "90%",
              height: 60,
              alignSelf: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#621959",
              paddingLeft: 10,
              marginTop: 10,
              color: "white",
            }}
            placeholder="Salary"
            placeholderTextColor="white"
            onChangeText={(val) => {
              this.setState({ salary: val });
            }}
          />
          <Text style={{ marginTop: 40, marginLeft: "5%", color: "white" }}>
            Status
          </Text>
          <DropDownPicker
            items={this.state.items}
            open={this.state.open}
            value={this.state.value}
            setOpen={() => {
              this.setState({ open: !this.state.open });
            }}
            onSelectItem={(val) => {
              this.setState({ value: val.label });
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
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              marginTop: 50,
              backgroundColor: "#F87777",
              marginBottom: 40,
            }}
            onPress={() => {
              if (
                this.state.name &&
                this.state.email &&
                this.state.password &&
                this.state.designation &&
                this.state.salary &&
                this.state.value
              ) {
                this.add();
                this.props.navigation.navigate("Employee");
              } else {
                alert("Please fill all the details!");
              }
            }}
          >
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
              Add
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
