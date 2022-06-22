import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import db from '../config'

export default class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeid:props.route.params.id,
      q1:'',
      q2:'',
      q3:'',
      q4:''
    };
  }

  updateData=(score)=>{
    db.collection("employees").doc(this.state.employeeid).update(
      {
        performanceScore:score
      }
    ).then(()=>{
      alert("Employee Updated")
      this.props.navigation.navigate("Assessment")
    })
    .catch(()=>{
      alert("Something Went Wrong")
    })
  }

  componentDidMount() {
  }

  updatePerformance(){
    var sum = this.state.q1+this.state.q2+this.state.q3+this.state.q4
    var score = sum/4
    this.updateData(score)
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
                this.props.navigation.goBack();
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
              Survey
            </Text>
          </View>

          <Text style={{ marginTop: 30, color: 'white', alignSelf: 'center' }}>
            Rate on scale of 1-5:
          </Text>
          
           <Text style={{ marginTop: 30, color: 'white', alignSelf: 'center' }}>
            Did the employee submit projects on time?
          </Text>
          <View style={{marginLeft:70}}>
            <Slider
              style={{ width: '70%', height: 40 }} //Slider Component with properties
              minimumValue={0}
              maximumValue={5}
              step={1}
              thumbTintColor="white"
              minimumTrackTintColor="red"
              maximumTrackTintColor="grey"
              onValueChange={(val) => {
                this.setState({ q1: val });
              }}
            />
            <Text style={{color:'white', fontSize:20, fontWeight:'bold', marginLeft:'35%'}}>{this.state.q1}</Text>
          </View>

          <Text style={{ marginTop: 30, color: 'white', alignSelf: 'center' }}>
            Was the employee respectful to others?
          </Text>
          <View style={{marginLeft:70}}>
            <Slider
              style={{ width: '70%', height: 40 }} //Slider Component with properties
              minimumValue={0}
              maximumValue={5}
              step={1}
              thumbTintColor="white"
              minimumTrackTintColor="red"
              maximumTrackTintColor="grey"
              onValueChange={(val) => {
                this.setState({ q2: val });
              }}
            />
            <Text style={{color:'white', fontSize:20, fontWeight:'bold', marginLeft:'35%'}}>{this.state.q2}</Text>
          </View>

          <Text style={{ marginTop: 30, color: 'white', alignSelf: 'center' }}>
            Are their projects well made?
          </Text>
          <View style={{marginLeft:70}}>
            <Slider
              style={{ width: '70%', height: 40 }} //Slider Component with properties
              minimumValue={0}
              maximumValue={5}
              step={1}
              thumbTintColor="white"
              minimumTrackTintColor="red"
              maximumTrackTintColor="grey"
              onValueChange={(val) => {
                this.setState({ q3: val });
              }}
            />
            <Text style={{color:'white', fontSize:20, fontWeight:'bold', marginLeft:'35%'}}>{this.state.q3}</Text>
          </View>

          <Text style={{ marginTop: 30, color: 'white', alignSelf: 'center' }}>
            Rate the employee overall.
          </Text>
          <View style={{marginLeft:70}}>
            <Slider
              style={{ width: '70%', height: 40 }} //Slider Component with properties
              minimumValue={0}
              maximumValue={5}
              step={1}
              thumbTintColor="white"
              minimumTrackTintColor="red"
              maximumTrackTintColor="grey"
              onValueChange={(val) => {
                this.setState({ q4: val });
              }}
            />
            <Text style={{color:'white', fontSize:20, fontWeight:'bold', marginLeft:'35%'}}>{this.state.q4}</Text>
          </View>

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
              this.updatePerformance()
            }}
            >
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
