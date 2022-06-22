import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native"; 
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import db from "../config";
import firebase from "firebase";

export default class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      type: "",
      modalVisible: false,
      taskName: "",
      taskPerson: "",
      taskDetails: "",
      tasks: [],
      taskDeadline: "",
    };
  }

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
    } else if (response2.docs.length === 1) {
      type = "owner";
    } else {
      type = "none";
    }
    this.setState({ type: type });
  };

  submitTask = () => {
    db.collection("tasks").add({
      taskName: this.state.taskName,
      taskPerson: this.state.taskPerson,
      taskDetails: this.state.taskDetails,
      taskDeadline: this.state.taskDeadline,
      status: "Pending",
      taskAssignedBy: firebase.auth().currentUser.email,
    });
    this.getData();
  };

  updateTask = (id) => {
    db.collection("tasks")
      .doc(id)
      .update({
        status: "Completed",
      })
      .then(() => {
        alert("Task Updated");
        this.getData();
      })
      .catch(() => {
        alert("Something Went Wrong");
      });
  };

  getData = async () => {
    if (this.state.type === "owner") {
      this.setState({ tasks: [] });
      var response = await db
        .collection("tasks")
        .where("taskAssignedBy", "==", firebase.auth().currentUser.email)
        .get();
      response.docs.map((a) => {
        var temp = this.state.tasks;
        var data = a.data();
        data.id = a.id;
        temp.push(data);
        this.setState({ tasks: temp });
      });
    } else {
      this.setState({ tasks: [] });
      var response = await db
        .collection("tasks")
        .where("taskPerson", "==", firebase.auth().currentUser.email)
        .get();
      response.docs.map((a) => {
        var temp = this.state.tasks;
        var data = a.data();
        data.id = a.id;
        temp.push(data);
        this.setState({ tasks: temp });
      });
    }
  };

  componentDidMount = async () => {
    await this.checkType();
    await this.getData();
  };

  deleteData = (id) => {
    db.collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        alert("Task Deleted");
        this.getData();
      })
      .catch((error) => {
        alert("Something Went Wrong! Please try later ");
      });
  };

  render() {
    if (this.state.tasks.length === 0) {
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
                Task Tracker
              </Text>
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                marginTop: "50%",
                alignSelf: "center",
              }}
            >
              Tasks Assigned will appear here
            </Text>
          </ScrollView>

          {this.state.type === "owner" ? (
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
                this.setState({ modalVisible: true });
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
              >
                +
              </Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View
              style={{
                backgroundColor: "#F9F4E4",
                width: "100%",
                height: "90%",
                marginTop: "25%",
                marginBottom: "25%",
              }}
            >
              <ScrollView>
                <TouchableOpacity
                  style={{ marginTop: "5%", marginLeft: "5%" }}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
                <Text
                  style={{ marginTop: 10, marginLeft: "5%", color: "Black" }}
                >
                  Task Name
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
                  placeholder="Task Name"
                  placeholderTextColor="white"
                  onChangeText={(val) => {
                    this.setState({ taskName: val });
                  }}
                />
                <Text
                  style={{ marginTop: 20, marginLeft: "5%", color: "Black" }}
                >
                  Responsible Employee
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
                    this.setState({ taskPerson: val });
                  }}
                />
                <Text
                  style={{ marginTop: 20, marginLeft: "5%", color: "black" }}
                >
                  Details
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
                  placeholder="Details"
                  placeholderTextColor="white"
                  onChangeText={(val) => {
                    this.setState({ taskDetails: val });
                  }}
                />

                <Text
                  style={{ marginTop: 20, marginLeft: "5%", color: "black" }}
                >
                  Deadline
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
                  placeholder="Deadline"
                  placeholderTextColor="white"
                  onChangeText={(val) => {
                    this.setState({ taskDeadline: val });
                  }}
                />

                <TouchableOpacity
                  style={{
                    borderWidth: 3,
                    borderRadius: 10,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "90%",
                    alignSelf: "center",
                    marginTop: 50,
                    backgroundColor: "#F87777",
                  }}
                  onPress={() => {
                    if (
                      this.state.taskName &&
                      this.state.taskPerson &&
                      this.state.taskDeadline &&
                      this.state.taskDetails
                    ) {
                    this.setState({ modalVisible: false });
                    this.submitTask();
                    }
                    else{
                      alert('Please fill all the details')
                    }
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    Add Task
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        </View>
      );
    } else {
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
                Task Tracker
              </Text>
            </View>

            <Text
              style={{ marginTop: 30, color: "white", alignSelf: "center" }}
            >
              View Tasks
            </Text>

              {this.state.tasks.map((b) => {
                var color = "";
                if (b.status === "Pending") {
                  color = "orange";
                } else if (b.status === "Completed") {
                  color = "green";
                }

                return (
                  <View
                  key={b.id}
                    style={{
                      width: "90%",
                      borderRadius: 10,
                      backgroundColor: "#101010",
                      marginTop: 10,
                      alignSelf: "center",
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        {b.taskName}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: "#F87777",
                          padding: 5,
                          borderRadius: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {b.taskDeadline}
                      </Text>
                    </View>
                    <Text style={{ color: "grey" }}>{b.taskPerson}</Text>
                    <Text style={{ fontSize: 15, color: "white" }}>
                      {b.taskDetails}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          alignSelf: "center",
                          backgroundColor: "white",
                          padding: 5,
                          borderRadius: 10,
                          color: color,
                        }}
                      >
                        {b.status}
                      </Text>
                      {this.state.type === "owner" ? (
                        <TouchableOpacity
                          style={{
                            alignItems: "center",
                            marginLeft: 10,
                            backgroundColor: "white",
                            borderRadius: 30,
                            padding: 5,
                          }}
                          onPress={() => {
                            this.deleteData(b.id);
                          }}
                        >
                          <AntDesign name="delete" size={24} color="red" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                        style={{
                          alignItems: "center",
                          marginLeft: 10,
                        }}
                          onPress={() => {
                            this.updateTask(b.id);
                          }}
                        >
                          <AntDesign
                            name="checksquareo"
                            size={24}
                            color={color}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}

            {this.state.type === "owner" ? (
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
                  this.setState({ modalVisible: true });
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
                >
                  +
                </Text>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View
                style={{
                  backgroundColor: "#F9F4E4",
                  width: "100%",
                  height: "90%",
                  marginTop: "25%",
                }}
              >
                <ScrollView>
                  <TouchableOpacity
                    style={{ marginTop: "5%", marginLeft: "5%" }}
                    onPress={() => {
                      this.setState({ modalVisible: false });
                    }}
                  >
                    <AntDesign name="closecircleo" size={24} color="black" />
                  </TouchableOpacity>
                  <Text
                    style={{ marginTop: 10, marginLeft: "5%", color: "Black" }}
                  >
                    Task Name
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
                    placeholder="Task Name"
                    placeholderTextColor="white"
                    onChangeText={(val) => {
                      this.setState({ taskName: val });
                    }}
                  />
                  <Text
                    style={{ marginTop: 20, marginLeft: "5%", color: "Black" }}
                  >
                    Responsible Employee
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
                      this.setState({ taskPerson: val });
                    }}
                  />
                  <Text
                    style={{ marginTop: 20, marginLeft: "5%", color: "black" }}
                  >
                    Details
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
                    placeholder="Details"
                    placeholderTextColor="white"
                    onChangeText={(val) => {
                      this.setState({ taskDetails: val });
                    }}
                  />

                  <Text
                    style={{ marginTop: 20, marginLeft: "5%", color: "black" }}
                  >
                    Deadline
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
                    placeholder="Deadline"
                    placeholderTextColor="white"
                    onChangeText={(val) => {
                      this.setState({ taskDeadline: val });
                    }}
                  />

                  <TouchableOpacity
                    style={{
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
                      if (
                        this.state.taskName &&
                        this.state.taskPerson &&
                        this.state.taskDeadline &&
                        this.state.taskDetails
                      ) {
                        this.setState({ modalVisible: false });
                        this.submitTask();
                      } else {
                        alert("Please fill all the details!");
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 20,
                      }}
                    >
                      Add Task
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </Modal>
          </ScrollView>
        </View>
      );
    }
  }
}
