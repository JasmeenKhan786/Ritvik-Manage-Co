import * as React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import db from "../config";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";

export default class Employee extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      type: "",
      companyOwner: "",
    };
  }

  getOwner = async () => {
    var response = await db
      .collection("employees")
      .where("email", "==", firebase.auth().currentUser.email)
      .get();
    response.docs.map((a) => {
      this.setState({ companyOwner: a.data().companyOwner });
    });
  };

  checkType = async () => {
    var response = await db
      .collection("employees")
      .where("email", "==", firebase.auth().currentUser.email)
      .get();
    var response2 = await db
      .collection("owners")
      .where("email", "==", firebase.auth().currentUser.email)
      .get();

    var type = "";
    if (response.docs.length === 1) {
      type = "employee";
     await this.getOwner();
    } else if (response2.docs.length === 1) {
      type = "owner";
    } else {
      type = "none";
    }
    this.setState({ type: type });
    this.getData(type);
  };

  getData = async (type) => {
    this.setState({ employees: [] });

    if (type === "owner") { 
      var response = await db
        .collection("employees")
        .where("companyOwner", "==", firebase.auth().currentUser.email)
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
    } else if (type === "employee") {
      var response = await db
        .collection("employees")
        .where("companyOwner", "==", this.state.companyOwner)
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
    }
  }; 

  componentDidMount = () => {
    this.load = this.props.navigation.addListener("focus", () => {
      this.checkType();
    });
  };

  componentWillUnmount() {
    this.load();
  }

  deleteData = (id) => {
    db.collection("employees")  
      .doc(id)
      .delete()
      .then(() => {
        alert("Employees Deleted!");
        this.checkType();
      }) 
      .catch((error) => {
        alert("Something went wrong"); 
      });
  };

  edit(id) {
    this.props.navigation.navigate("EditEmployee", { id: id });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#292D32" }}>
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
                this.props.navigation.navigate("Home");
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
              Manage Employee
            </Text>
          </View>

          <Text
            style={{
              marginTop: 30,
              color: "white", 
              alignSelf: "center",
            }}
          >
            All Employees
          </Text>

          <ScrollView style={{ marginTop: 20, height: 400 }}>
            {this.state.employees.length === 0 ? (
              <Text style={{ color: "white" , fontWeight:'bold', fontSize:20, alignSelf:'center', marginTop:80}}>Employees will appear here</Text>
            ) : (
              this.state.employees.map((b) => {
                return (
                  <View
                  key={b.id}
                    style={{
                      width: "90%",
                      height: 100,
                      alignSelf: "center",
                      borderRadius: 10,
                      backgroundColor: "#F9F4E5",
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../assets/e.png")}
                        style={{
                          width: "40%",
                          height: "70%",
                          borderRadius: 10,
                          resizeMode: "contain",
                        }}
                      />

                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>{b.name}</Text>
                        <Text>{b.email}</Text>
                        <Text>{b.designation}</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginRight: "4%",
                          }}
                        >
                          <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            onPress={() => {
                              if(b.email === firebase.auth().currentUser.email || this.state.type === "owner"){
                                this.edit(b.id);
                              }else{
                                alert('You can only edit your own details!')
                              }
                            }}
                          >
                            <AntDesign name="edit" size={24} color="black" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              if (this.state.type === "owner") {
                                this.deleteData(b.id);
                              } else {
                                alert("Ask an owner to do this!");
                              }
                            }}
                          >
                            <AntDesign name="delete" size={24} color="black" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>

          <TouchableOpacity
            style={{
              borderRadius: 10,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              width: "20%",
              alignSelf: "center",
              marginTop: 50,
              backgroundColor: "#F87777",
              marginBottom: 40,
            }}
            onPress={() => {
              if (this.state.type === "owner") {
                this.props.navigation.navigate("AddEmployee");
              } else {
                alert("ask an owner to add this employee");
              }
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
              +
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
