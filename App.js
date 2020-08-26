import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/views/HomeScreen';
import DetailsScreen from './src/views/DetailsScreen';
import ScannerView from './src/views/ScannerScreen';
import HistoryView from './src/views/HistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
  


export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={HomeStack} 
                options={{
                    tabBarLabel: 'Produits',
                    tabBarIcon: () => <Icon name="home" size={24} type="Ionicons" />,
                    }}
                />
            <Tab.Screen 
                name="Details" 
                component={ScannerView} 
                options={{
                    tabBarLabel: 'Scanner',
                    tabBarIcon: () => <Icon name="search" size={24} type="Ionicons"  />,
                    }}
                />
            <Tab.Screen 
                name="History"
                component={HistoryView}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: () => <Icon name="list" size={24} type="Ionicons"  />,
                    }}
                />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
