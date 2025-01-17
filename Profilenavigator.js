import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MoodHistory from './src/screen/MoodTrackerScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import LoginScreen from './src/screen/LoginScreen';
const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator>
      <Stack.Screen initialRouteName="Profile"
          options={{headerShown: false}}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Moodhistory"
          component={MoodHistory}
        />
        
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});