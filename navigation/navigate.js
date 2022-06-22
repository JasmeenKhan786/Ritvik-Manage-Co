import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Forgot from '../screens/ForgotPass'
import Welcome from '../screens/Welcome'
import Home from '../screens/Home'
import AddEmployee from '../screens/AddEmployee'
import Assessment from '../screens/Assessment'
import EditEmployee from '../screens/EditEmployee'
import Employee from '../screens/Employee'
import Survey from '../screens/Survey'
import Task from '../screens/Task'
const Stack = createStackNavigator()

function EmployeeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Employee" component={Employee} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="EditEmployee" component={EditEmployee} />
    </Stack.Navigator>
  );
}

const Stack2 = createStackNavigator()

function AssessmentStack() {
  return (
    <Stack2.Navigator screenOptions={{headerShown:false}}>
      <Stack2.Screen name="Assessment" component={Assessment} />
      <Stack2.Screen name="Survey" component={Survey} />
    </Stack2.Navigator>
  );
}

const Stack3 = createStackNavigator()

function HomeStack() {
  return (
    <Stack3.Navigator screenOptions={{headerShown:false}}>
      <Stack3.Screen name="Home" component={Home} />
      <Stack3.Screen name="Task" component={Task} />
      <Stack3.Screen name="Employee" component={EmployeeStack} />
      <Stack3.Screen name="AssessmentStack" component={AssessmentStack} />
    </Stack3.Navigator>
  );
}


const Stack4 = createStackNavigator()

function LoginStack() {
  return (
    <Stack4.Navigator screenOptions={{headerShown:false}}>
      <Stack4.Screen name="Welcome" component={Welcome}/>

      <Stack4.Screen name="Login" component={Login}/>

       <Stack4.Screen name="SignUp" component={SignUp}/>
       <Stack4.Screen name="Forgot" component={Forgot}/>
      <Stack4.Screen name="Home" component={HomeStack}/>
    </Stack4.Navigator>
  );
}
export default LoginStack