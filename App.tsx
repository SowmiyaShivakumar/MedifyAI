/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Main from './screens/Main';
import Details from './screens/Details';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BMI from './screens/BMI';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import RecordKeeper from './screens/RecordKeeper';
import PDFViewer from './screens/PDFViewer';
import DiagnoSense from './screens/DiagnoSense';
import FirstAidSupport from './screens/FirstAidSupport';
import PersonalizedMedicine from './screens/PersonalizedMedicine';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function BottomTabs(){
  return(
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size}) => {
          let icon, icons;
          if(route.name === 'Home'){
            icon = focused ? 'home' : 'home-outline';
            return <Icon name={icon} size={size} color={color} />
          }
          else if(route.name === 'BMI'){
            icon = focused ? 'fitness' : 'fitness-outline';
            return <Icon name={icon} size={size} color={color} />
          }
          else if(route.name === 'Profile'){
            icons = focused ? 'user-edit' : 'user-circle';
            return <Icons name={icons} size={size} color={color} />
          }
        },
        tabBarActiveTintColor: '#38b2b5',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={Main} />
      <Tab.Screen name='BMI' component={BMI} 
        options={{
          headerShown: true,
          headerTitle: 'BMI Calculator',
          headerStyle:{
            backgroundColor: '#ff6b6b',
            
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white'
          }
        }}
      />
      <Tab.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}


const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='HomePg'
          component={Home}
          options = {{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='SignUp'
          component={SignUp}
          options = {{
            headerShown: false
          }}
        /> 
        <Stack.Screen 
          name='Details'
          component={Details}
          options = {{
            headerShown: false
          }}
        />
        {/* <Stack.Screen 
          name="BottomTabs"
          options={{
            headerShown: false,
          }}
          component={BottomTabs}
        /> */}
        <Stack.Screen 
          name='Login'
          component={Login}
          options = {{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="BottomTabs"
          options={{
            headerShown: false,
          }}
          component={BottomTabs}
        />
        <Stack.Screen 
          name='EditProfile'
          options={{
            headerShown: false,
          }}
          component={EditProfile}
        />
        <Stack.Screen 
          name='RecordKeeper'
          options={{
            headerShown: false
          }}
          component={RecordKeeper}
        />
        <Stack.Screen 
          name='PDFViewer'
          options={{
            headerShown: false
          }}
          component={PDFViewer}
        />
        {/* <Stack.Screen 
          name='DiagnoSense'
          options={{
            headerShown: false
          }}
          component={DiagnoSense}
        /> */}
        <Stack.Screen 
          name='FirstAidSupport'
          options={{
            headerShown: false
          }}
          component={FirstAidSupport}
        />
        {/* <Stack.Screen 
          name='PersonalizedMedicine'
          options={{
            headerShown: false
          }}
          component={PersonalizedMedicine}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;